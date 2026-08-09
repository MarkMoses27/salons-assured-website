"use client";

import type { Html5Qrcode as Html5QrcodeType } from "html5-qrcode";

import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  CheckCircle2,
  CircleX,
  Loader2,
  LogOut,
  QrCode,
  RefreshCcw,
  ShieldCheck,
  TicketCheck,
  UserRound,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type Staff = {
  id: string;
  email: string | null;
  displayName: string;
  role: string;
};

type ScanResultType =
  | "accepted"
  | "already_used"
  | "rejected"
  | "cancelled"
  | "invalid";

type ScanResponse = {
  ok?: boolean;
  scanResult?: ScanResultType;
  eventDate?: string;
  eventOpen?: boolean;
  message?: string;

  ticket?: {
    ticketNumber?: string;
    attendeeName?: string;
    attendeeEmail?: string;
    participantCategory?: string;
    organisation?: string;
    country?: string;
  };

  previousEntry?: {
    scannedAt?: string;
    gateName?: string;
  };
};

type PageState =
  | "loading"
  | "ready"
  | "processing"
  | "result"
  | "error";

const IS_DEVELOPMENT =
  process.env.NODE_ENV !== "production";

function formatEventDate(
  value?: string,
) {
  if (value === "2026-11-17") {
    return "17 November 2026";
  }

  if (value === "2026-11-18") {
    return "18 November 2026";
  }

  return value || "Event Day";
}

function formatScanTime(
  value?: string,
) {
  if (!value) {
    return null;
  }

  try {
    return new Intl.DateTimeFormat(
      "en-KE",
      {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Africa/Nairobi",
      },
    ).format(new Date(value));
  } catch {
    return value;
  }
}

export default function EbbcScannerPage() {
  const router = useRouter();

  const scannerRef =
    useRef<Html5QrcodeType | null>(
      null,
    );

  const processingRef =
    useRef(false);

  const [staff, setStaff] =
    useState<Staff | null>(null);

  const [pageState, setPageState] =
    useState<PageState>("loading");

  const [
    cameraActive,
    setCameraActive,
  ] = useState(false);

  const [
    cameraStarting,
    setCameraStarting,
  ] = useState(false);

  const [
    cameraError,
    setCameraError,
  ] = useState("");

  const [
    manualValue,
    setManualValue,
  ] = useState("");

  const [
    scanResult,
    setScanResult,
  ] = useState<ScanResponse | null>(
    null,
  );

  const [
    testEventDate,
    setTestEventDate,
  ] = useState<
    "2026-11-17" | "2026-11-18"
  >("2026-11-17");

  const stopCamera =
    useCallback(async () => {
      const scanner =
        scannerRef.current;

      if (!scanner) {
        setCameraActive(false);
        return;
      }

      try {
        await scanner.stop();
      } catch {
        // Scanner may already be stopped.
      }

      try {
        scanner.clear();
      } catch {
        // Scanner may already be cleared.
      }

      scannerRef.current =
        null;

      setCameraActive(false);
    }, []);

  const processScan =
    useCallback(
      async (
        scannedValue: string,
      ) => {
        const cleanValue =
          scannedValue.trim();

        if (
          !cleanValue ||
          processingRef.current
        ) {
          return;
        }

        processingRef.current =
          true;

        setPageState(
          "processing",
        );

        try {
          await stopCamera();

          const supabase =
            getSupabaseBrowserClient();

          const {
            data:
              sessionData,
          } =
            await supabase.auth.getSession();

          const accessToken =
            sessionData.session
              ?.access_token;

          if (!accessToken) {
            router.replace(
              "/ebbc2026/scanner/login",
            );
            return;
          }

          const requestBody: {
            scannedValue: string;
            testEventDate?: string;
          } = {
            scannedValue:
              cleanValue,
          };

          if (
            IS_DEVELOPMENT
          ) {
            requestBody.testEventDate =
              testEventDate;
          }

          const response =
            await fetch(
              "/api/ebbc2026/scanner/check-in",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",

                  Authorization:
                    `Bearer ${accessToken}`,
                },

                body:
                  JSON.stringify(
                    requestBody,
                  ),

                cache:
                  "no-store",
              },
            );

          const result =
            (await response.json()) as
              ScanResponse;

          if (
            response.status ===
              401 ||
            response.status ===
              403
          ) {
            await supabase.auth.signOut();

            router.replace(
              "/ebbc2026/scanner/login",
            );

            return;
          }

          setScanResult(
            result,
          );

          if (
            response.ok &&
            result.scanResult
          ) {
            setPageState(
              "result",
            );
          } else {
            setPageState(
              "error",
            );
          }
        } catch (error) {
          console.error(
            "EBBC2026 scan processing error:",
            error,
          );

          setScanResult({
            message:
              "Ticket verification could not be completed.",
          });

          setPageState(
            "error",
          );
        } finally {
          processingRef.current =
            false;
        }
      },
      [
        router,
        stopCamera,
        testEventDate,
      ],
    );

  const startCamera =
    useCallback(async () => {
      if (
        cameraStarting ||
        cameraActive
      ) {
        return;
      }

      setCameraStarting(
        true,
      );

      setCameraError("");

      setScanResult(null);

      setPageState(
        "ready",
      );

      try {
        await stopCamera();

        const qrModule =
          await import(
            "html5-qrcode"
          );

        const scanner =
          new qrModule.Html5Qrcode(
            "ebbc2026-qr-reader",
            {
              formatsToSupport: [
                qrModule
                  .Html5QrcodeSupportedFormats
                  .QR_CODE,
              ],
              verbose: false,
            },
          );

        scannerRef.current =
          scanner;

        await scanner.start(
          {
            facingMode:
              "environment",
          },
          {
            fps: 10,

            qrbox: (
              viewfinderWidth,
              viewfinderHeight,
            ) => {
              const minimumEdge =
                Math.min(
                  viewfinderWidth,
                  viewfinderHeight,
                );

              const size =
                Math.min(
                  320,
                  Math.floor(
                    minimumEdge *
                      0.72,
                  ),
                );

              return {
                width: size,
                height: size,
              };
            },
          },
          (decodedText) => {
            void processScan(
              decodedText,
            );
          },
          () => {
            // Ignore frames without QR codes.
          },
        );

        setCameraActive(
          true,
        );
      } catch (error) {
        console.error(
          "EBBC2026 camera start error:",
          error,
        );

        scannerRef.current =
          null;

        setCameraActive(
          false,
        );

        setCameraError(
          "Camera access could not be started. Check browser camera permission or use manual verification.",
        );
      } finally {
        setCameraStarting(
          false,
        );
      }
    }, [
      cameraActive,
      cameraStarting,
      processScan,
      stopCamera,
    ]);

  useEffect(() => {
    let cancelled =
      false;

    async function verifySession() {
      try {
        const supabase =
          getSupabaseBrowserClient();

        const {
          data:
            sessionData,
        } =
          await supabase.auth.getSession();

        const accessToken =
          sessionData.session
            ?.access_token;

        if (!accessToken) {
          router.replace(
            "/ebbc2026/scanner/login",
          );
          return;
        }

        const response =
          await fetch(
            "/api/ebbc2026/scanner/session",
            {
              headers: {
                Authorization:
                  `Bearer ${accessToken}`,
              },

              cache:
                "no-store",
            },
          );

        const result =
          (await response.json()) as {
            ok?: boolean;
            authorized?: boolean;
            staff?: Staff;
          };

        if (
          !response.ok ||
          !result.ok ||
          !result.authorized ||
          !result.staff
        ) {
          await supabase.auth.signOut();

          router.replace(
            "/ebbc2026/scanner/login",
          );

          return;
        }

        if (cancelled) {
          return;
        }

        setStaff(
          result.staff,
        );

        setPageState(
          "ready",
        );
      } catch (error) {
        console.error(
          "EBBC2026 scanner session verification error:",
          error,
        );

        if (
          !cancelled
        ) {
          setScanResult({
            message:
              "Scanner access could not be verified.",
          });

          setPageState(
            "error",
          );
        }
      }
    }

    void verifySession();

    return () => {
      cancelled =
        true;

      void stopCamera();
    };
  }, [
    router,
    stopCamera,
  ]);

  async function handleSignOut() {
    await stopCamera();

    const supabase =
      getSupabaseBrowserClient();

    await supabase.auth.signOut();

    router.replace(
      "/ebbc2026/scanner/login",
    );
  }

  function handleManualSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    void processScan(
      manualValue,
    );
  }

  async function handleNextScan() {
    setManualValue("");

    setScanResult(null);

    setCameraError("");

    setPageState(
      "ready",
    );

    await startCamera();
  }

  const resultType =
    scanResult?.scanResult;

  const resultTheme =
    resultType ===
    "accepted"
      ? {
          background:
            "bg-emerald-50",
          border:
            "border-emerald-200",
          text:
            "text-emerald-900",
          accent:
            "text-emerald-600",
          icon:
            CheckCircle2,
          title:
            "Entry Approved",
        }
      : resultType ===
          "already_used"
        ? {
            background:
              "bg-amber-50",
            border:
              "border-amber-200",
            text:
              "text-amber-950",
            accent:
              "text-amber-600",
            icon:
              AlertTriangle,
            title:
              "Already Checked In",
          }
        : {
            background:
              "bg-red-50",
            border:
              "border-red-200",
            text:
              "text-red-950",
            accent:
              "text-red-600",
            icon:
              CircleX,
            title:
              resultType ===
              "cancelled"
                ? "Ticket Cancelled"
                : resultType ===
                    "invalid"
                  ? "Invalid Ticket"
                  : "Entry Rejected",
          };

  const ResultIcon =
    resultTheme.icon;

  if (
    pageState ===
    "loading"
  ) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F6F4F4] px-5 text-[#0D1D34]">
        <div className="text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#CC8591]" />

          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0D1D34]/45">
            Opening Scanner
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F4F4] px-4 pb-16 pt-28 text-[#0D1D34] sm:px-7">
      <section className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/ebbc2026"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0D1D34]/45 transition hover:text-[#CC8591]"
          >
            <ArrowLeft className="h-4 w-4" />
            EBBC2026
          </Link>

          <div className="flex items-center gap-3">
            {staff ? (
              <div className="hidden text-right sm:block">
                <p className="text-xs font-extrabold">
                  {
                    staff.displayName
                  }
                </p>

                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#0D1D34]/35">
                  {staff.role}
                </p>
              </div>
            ) : null}

            <button
              type="button"
              onClick={
                handleSignOut
              }
              className="flex h-10 items-center gap-2 rounded-full border border-[#0D1D34]/10 bg-white px-4 text-xs font-bold transition hover:border-[#CC8591]/40 hover:text-[#CC8591]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[30px] border border-[#0D1D34]/8 bg-white shadow-[0_24px_70px_rgba(13,29,52,0.09)]">
          <div className="flex flex-col gap-5 bg-[#0D1D34] px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#CC8591]">
                EBBC2026 Check-In
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                Ticket Scanner
              </h1>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-white/65">
              <ShieldCheck className="h-4 w-4 text-[#CC8591]" />
              Secure Staff Session
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-[#0D1D34]/8 p-5 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-extrabold">
                    Scan attendee QR
                  </h2>

                  <p className="mt-1 text-xs text-[#0D1D34]/45">
                    Point the camera at the EBBC2026 ticket QR code.
                  </p>
                </div>

                <QrCode className="h-6 w-6 text-[#CC8591]" />
              </div>

              <div className="overflow-hidden rounded-[24px] bg-[#071526] p-3">
                <div
                  id="ebbc2026-qr-reader"
                  className="min-h-[300px] overflow-hidden rounded-[18px] bg-black sm:min-h-[420px]"
                />

                {!cameraActive &&
                pageState !==
                  "processing" ? (
                  <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center sm:min-h-[420px]">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-white/8 text-[#CC8591]">
                      <Camera className="h-7 w-7" />
                    </div>

                    <p className="mt-5 text-sm font-extrabold text-white">
                      Camera ready
                    </p>

                    <p className="mt-2 max-w-xs text-xs leading-5 text-white/40">
                      Start the scanner and allow camera access when prompted.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        void startCamera()
                      }
                      disabled={
                        cameraStarting
                      }
                      className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-[#CC8591] px-6 text-xs font-extrabold text-white transition hover:bg-[#B96F7C] disabled:opacity-60"
                    >
                      {cameraStarting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Starting...
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 w-4" />
                          Start Camera
                        </>
                      )}
                    </button>
                  </div>
                ) : null}
              </div>

              {cameraError ? (
                <div className="mt-4 rounded-[15px] border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold leading-5 text-amber-900">
                  {cameraError}
                </div>
              ) : null}

              {IS_DEVELOPMENT ? (
                <div className="mt-5 rounded-[18px] border border-[#CC8591]/20 bg-[#CC8591]/5 p-4">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#CC8591]">
                    Local Testing Only
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setTestEventDate(
                          "2026-11-17",
                        )
                      }
                      className={`rounded-[12px] px-3 py-3 text-xs font-extrabold ${
                        testEventDate ===
                        "2026-11-17"
                          ? "bg-[#0D1D34] text-white"
                          : "border border-[#0D1D34]/8 bg-white text-[#0D1D34]/55"
                      }`}
                    >
                      Test Day 1
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setTestEventDate(
                          "2026-11-18",
                        )
                      }
                      className={`rounded-[12px] px-3 py-3 text-xs font-extrabold ${
                        testEventDate ===
                        "2026-11-18"
                          ? "bg-[#0D1D34] text-white"
                          : "border border-[#0D1D34]/8 bg-white text-[#0D1D34]/55"
                      }`}
                    >
                      Test Day 2
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 border-t border-[#0D1D34]/8 pt-6">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0D1D34]/35">
                  Manual Verification
                </p>

                <form
                  onSubmit={
                    handleManualSubmit
                  }
                  className="mt-3 flex flex-col gap-2 sm:flex-row"
                >
                  <input
                    value={
                      manualValue
                    }
                    onChange={(
                      event,
                    ) =>
                      setManualValue(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Paste ticket link or token"
                    className="h-12 flex-1 rounded-[14px] border border-[#0D1D34]/10 bg-[#FAFAFA] px-4 text-xs font-semibold outline-none transition focus:border-[#CC8591] focus:bg-white focus:ring-4 focus:ring-[#CC8591]/10"
                  />

                  <button
                    type="submit"
                    disabled={
                      !manualValue.trim() ||
                      pageState ===
                        "processing"
                    }
                    className="h-12 rounded-[14px] bg-[#0D1D34] px-5 text-xs font-extrabold text-white transition hover:bg-[#172D4B] disabled:opacity-50"
                  >
                    Verify
                  </button>
                </form>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              {pageState ===
              "processing" ? (
                <div className="grid min-h-[460px] place-items-center">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-9 w-9 animate-spin text-[#CC8591]" />

                    <h2 className="mt-5 text-lg font-black">
                      Verifying ticket
                    </h2>

                    <p className="mt-2 text-xs text-[#0D1D34]/45">
                      Checking ticket, payment and entry status.
                    </p>
                  </div>
                </div>
              ) : scanResult ? (
                <div
                  className={`rounded-[24px] border p-6 ${resultTheme.background} ${resultTheme.border} ${resultTheme.text}`}
                >
                  <ResultIcon
                    className={`h-11 w-11 ${resultTheme.accent}`}
                  />

                  <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.18em] opacity-50">
                    {scanResult.eventDate
                      ? formatEventDate(
                          scanResult.eventDate,
                        )
                      : "EBBC2026"}
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                    {resultTheme.title}
                  </h2>

                  <p className="mt-3 text-sm font-semibold leading-6 opacity-75">
                    {
                      scanResult.message
                    }
                  </p>

                  {scanResult.ticket ? (
                    <div className="mt-7 overflow-hidden rounded-[18px] border border-current/10 bg-white/60">
                      <div className="border-b border-current/10 p-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-[12px] bg-white">
                            <UserRound className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-45">
                              Attendee
                            </p>

                            <p className="mt-1 text-sm font-black">
                              {scanResult
                                .ticket
                                .attendeeName ||
                                "Not available"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 p-4 sm:grid-cols-2">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-45">
                            Ticket
                          </p>

                          <p className="mt-1 text-xs font-extrabold">
                            {scanResult
                              .ticket
                              .ticketNumber ||
                              "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-45">
                            Category
                          </p>

                          <p className="mt-1 text-xs font-extrabold">
                            {scanResult
                              .ticket
                              .participantCategory ||
                              "Attendee"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-45">
                            Organisation
                          </p>

                          <p className="mt-1 text-xs font-extrabold">
                            {scanResult
                              .ticket
                              .organisation ||
                              "Not provided"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-45">
                            Country
                          </p>

                          <p className="mt-1 text-xs font-extrabold">
                            {scanResult
                              .ticket
                              .country ||
                              "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {scanResult
                    .previousEntry
                    ?.scannedAt ? (
                    <div className="mt-4 rounded-[15px] bg-white/55 p-4 text-xs font-semibold leading-5">
                      Previous entry:{" "}
                      {formatScanTime(
                        scanResult
                          .previousEntry
                          .scannedAt,
                      )}

                      {scanResult
                        .previousEntry
                        .gateName
                        ? ` · ${scanResult.previousEntry.gateName}`
                        : ""}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() =>
                      void handleNextScan()
                    }
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-[15px] bg-[#0D1D34] px-5 text-xs font-extrabold text-white transition hover:bg-[#172D4B]"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Scan Next Ticket
                  </button>
                </div>
              ) : (
                <div className="grid min-h-[460px] place-items-center">
                  <div className="max-w-xs text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#CC8591]/12 text-[#CC8591]">
                      <TicketCheck className="h-7 w-7" />
                    </div>

                    <h2 className="mt-5 text-lg font-black">
                      Ready for check-in
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-[#0D1D34]/45">
                      Scan an attendee ticket to verify entry status.
                    </p>

                    {IS_DEVELOPMENT ? (
                      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#CC8591]">
                        Testing{" "}
                        {formatEventDate(
                          testEventDate,
                        )}
                      </p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}