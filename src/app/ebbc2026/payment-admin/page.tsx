"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  LockKeyhole,
  LogIn,
  LogOut,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type AuthState =
  | "loading"
  | "signed_out"
  | "authorized"
  | "forbidden";

type VerifyState =
  | "idle"
  | "loading"
  | "success"
  | "error";

type SessionResponse = {
  ok?: boolean;
  authorized?: boolean;
  message?: string;
  staff?: {
    displayName?: string;
    role?: string;
  };
};

type VerifyResponse = {
  ok?: boolean;
  alreadyVerified?: boolean;
  fullyPaid?: boolean;
  ticketActivated?: boolean;
  message?: string;
  orderNumber?: string;
  buyerName?: string;
  paymentAmountKes?: number;
  totalAmountKes?: number;
  totalPaidKes?: number;
  balanceKes?: number;
  mpesaCode?: string;
  ticketQuantity?: number;
  verifiedBy?: string;
};

function formatMoney(
  amount: number,
) {
  return new Intl.NumberFormat(
    "en-KE",
  ).format(amount);
}

export default function EBBC2026PaymentAdminPage() {
  const [
    authState,
    setAuthState,
  ] =
    useState<AuthState>(
      "loading",
    );

  const [
    staffName,
    setStaffName,
  ] =
    useState("");

  const [
    email,
    setEmail,
  ] =
    useState("");

  const [
    password,
    setPassword,
  ] =
    useState("");

  const [
    loginLoading,
    setLoginLoading,
  ] =
    useState(false);

  const [
    loginError,
    setLoginError,
  ] =
    useState("");

  const [
    orderNumber,
    setOrderNumber,
  ] =
    useState("");

  const [
    mpesaCode,
    setMpesaCode,
  ] =
    useState("");

  const [
    amount,
    setAmount,
  ] =
    useState("");

  const [
    verifyState,
    setVerifyState,
  ] =
    useState<VerifyState>(
      "idle",
    );

  const [
    result,
    setResult,
  ] =
    useState<VerifyResponse | null>(
      null,
    );

  async function verifySession() {
    setAuthState(
      "loading",
    );

    try {
      const supabase =
        getSupabaseBrowserClient();

      const {
        data: sessionData,
      } =
        await supabase.auth
          .getSession();

      const accessToken =
        sessionData.session
          ?.access_token;

      if (!accessToken) {
        setAuthState(
          "signed_out",
        );
        return;
      }

      const response =
        await fetch(
          "/api/ebbc2026/scanner/session",
          {
            method:
              "GET",
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
            cache:
              "no-store",
          },
        );

      const data =
        (await response.json()) as
          SessionResponse;

      if (
        !response.ok ||
        !data.ok ||
        !data.authorized
      ) {
        await supabase.auth
          .signOut();

        setAuthState(
          "signed_out",
        );

        return;
      }

      if (
        data.staff?.role !==
        "admin"
      ) {
        setStaffName(
          data.staff
            ?.displayName ||
            "",
        );

        setAuthState(
          "forbidden",
        );

        return;
      }

      setStaffName(
        data.staff
          ?.displayName ||
          "EBBC2026 Admin",
      );

      setAuthState(
        "authorized",
      );
    } catch (error) {
      console.error(
        "EBBC2026 payment admin session error:",
        error,
      );

      setAuthState(
        "signed_out",
      );
    }
  }

  useEffect(() => {
    void verifySession();
  }, []);

  async function handleLogin(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    if (
      !cleanEmail ||
      !password
    ) {
      setLoginError(
        "Enter your admin email and password.",
      );

      return;
    }

    setLoginLoading(
      true,
    );
    setLoginError("");

    try {
      const supabase =
        getSupabaseBrowserClient();

      const {
        data,
        error,
      } =
        await supabase.auth
          .signInWithPassword({
            email:
              cleanEmail,
            password,
          });

      if (
        error ||
        !data.session
          ?.access_token
      ) {
        setLoginError(
          "Incorrect email or password.",
        );

        return;
      }

      const response =
        await fetch(
          "/api/ebbc2026/scanner/session",
          {
            method:
              "GET",
            headers: {
              Authorization:
                `Bearer ${data.session.access_token}`,
            },
            cache:
              "no-store",
          },
        );

      const sessionResult =
        (await response.json()) as
          SessionResponse;

      if (
        !response.ok ||
        !sessionResult.ok ||
        !sessionResult.authorized
      ) {
        await supabase.auth
          .signOut();

        setLoginError(
          sessionResult.message ||
            "This account is not authorized.",
        );

        return;
      }

      if (
        sessionResult.staff
          ?.role !== "admin"
      ) {
        await supabase.auth
          .signOut();

        setLoginError(
          "Only an EBBC2026 administrator can verify payments.",
        );

        return;
      }

      setStaffName(
        sessionResult.staff
          ?.displayName ||
          "EBBC2026 Admin",
      );

      setPassword("");

      setAuthState(
        "authorized",
      );
    } catch (error) {
      console.error(
        "EBBC2026 payment admin login error:",
        error,
      );

      setLoginError(
        "Unable to sign in. Please try again.",
      );
    } finally {
      setLoginLoading(
        false,
      );
    }
  }

  async function handleLogout() {
    const supabase =
      getSupabaseBrowserClient();

    await supabase.auth
      .signOut();

    setStaffName("");
    setAuthState(
      "signed_out",
    );

    setOrderNumber("");
    setMpesaCode("");
    setAmount("");
    setResult(null);
    setVerifyState(
      "idle",
    );
  }

  async function handleVerify(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanOrderNumber =
      orderNumber
        .trim()
        .toUpperCase();

    const cleanMpesaCode =
      mpesaCode
        .trim()
        .replace(
          /\s+/g,
          "",
        )
        .toUpperCase();

    const amountKes =
      Number(amount);

    setResult(null);

    if (
      !cleanOrderNumber
    ) {
      setVerifyState(
        "error",
      );

      setResult({
        ok: false,
        message:
          "Enter the EBBC2026 order number.",
      });

      return;
    }

    if (
      !/^[A-Z0-9]{10,12}$/.test(
        cleanMpesaCode,
      )
    ) {
      setVerifyState(
        "error",
      );

      setResult({
        ok: false,
        message:
          "Enter a valid M-Pesa transaction code.",
      });

      return;
    }

    if (
      !Number.isFinite(
        amountKes,
      ) ||
      amountKes <= 0
    ) {
      setVerifyState(
        "error",
      );

      setResult({
        ok: false,
        message:
          "Enter the amount received.",
      });

      return;
    }

    const confirmed =
      window.confirm(
        [
          "VERIFY EBBC2026 PAYMENT",
          "",
          `Order: ${cleanOrderNumber}`,
          `M-Pesa Code: ${cleanMpesaCode}`,
          `Payment received: KES ${formatMoney(
            amountKes,
          )}`,
          "",
          "Only continue if you have confirmed this transaction in the official Equity/M-Pesa records.",
          "",
          "This payment will be added to the customer's order.",
          "If a balance remains, the QR ticket will stay inactive.",
          "The QR ticket activates only after the order is fully paid.",
        ].join("\n"),
      );

    if (!confirmed) {
      return;
    }

    setVerifyState(
      "loading",
    );

    try {
      const supabase =
        getSupabaseBrowserClient();

      const {
        data:
          sessionData,
      } =
        await supabase.auth
          .getSession();

      const accessToken =
        sessionData.session
          ?.access_token;

      if (!accessToken) {
        setAuthState(
          "signed_out",
        );

        setVerifyState(
          "error",
        );

        setResult({
          ok: false,
          message:
            "Your admin session has expired. Sign in again.",
        });

        return;
      }

      const response =
        await fetch(
          "/api/ebbc2026/manual-payment/verify",
          {
            method:
              "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${accessToken}`,
            },
            body:
              JSON.stringify({
                orderNumber:
                  cleanOrderNumber,
                mpesaCode:
                  cleanMpesaCode,
                amountKes,
              }),
            cache:
              "no-store",
          },
        );

      const responseData =
        (await response.json()) as
          VerifyResponse;

      setResult(
        responseData,
      );

      if (
        !response.ok ||
        !responseData.ok
      ) {
        setVerifyState(
          "error",
        );

        return;
      }

      setVerifyState(
        "success",
      );

      setMpesaCode("");
      setAmount("");
    } catch (error) {
      console.error(
        "EBBC2026 payment verification error:",
        error,
      );

      setVerifyState(
        "error",
      );

      setResult({
        ok: false,
        message:
          "The payment could not be verified. Do not retry until the first result has been checked.",
      });
    }
  }

  if (
    authState ===
    "loading"
  ) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F7F5F5] px-5 text-[#0D1D34]">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#CC8591]" />

          <p className="mt-4 text-sm font-extrabold">
            Checking admin access...
          </p>
        </div>
      </main>
    );
  }

  if (
    authState ===
    "forbidden"
  ) {
    return (
      <main className="min-h-screen bg-[#F7F5F5] px-5 pb-20 pt-32 text-[#0D1D34]">
        <section className="mx-auto max-w-[620px]">
          <div className="rounded-[30px] border border-red-200 bg-white p-8 text-center shadow-[0_25px_70px_rgba(13,29,52,0.08)]">
            <AlertCircle className="mx-auto h-10 w-10 text-red-500" />

            <h1 className="mt-5 text-2xl font-black">
              Admin Access Required
            </h1>

            <p className="mt-3 text-sm leading-7 text-[#0D1D34]/60">
              {staffName ||
                "This account"}{" "}
              is signed in, but only an
              EBBC2026 administrator
              can verify payments.
            </p>

            <button
              type="button"
              onClick={() =>
                void handleLogout()
              }
              className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0D1D34] px-7 text-sm font-extrabold text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (
    authState ===
    "signed_out"
  ) {
    return (
      <main className="min-h-screen bg-[#F7F5F5] px-5 pb-20 pt-32 text-[#0D1D34] sm:px-8">
        <section className="mx-auto max-w-[620px]">
          <Link
            href="/ebbc2026"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/50 hover:text-[#CC8591]"
          >
            <ArrowLeft className="h-4 w-4" />
            EBBC2026
          </Link>

          <div className="mt-7 rounded-[30px] border border-[#0D1D34]/8 bg-white p-7 shadow-[0_30px_80px_rgba(13,29,52,0.10)] sm:p-10">
            <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-[#0D1D34] text-white">
              <LockKeyhole className="h-6 w-6" />
            </div>

            <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#CC8591]">
              EBBC2026 Administration
            </p>

            <h1 className="mt-3 [font-family:var(--font-display)] text-[42px] font-semibold leading-none tracking-[-0.04em]">
              Payment Verification
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#0D1D34]/55">
              Sign in with an approved
              EBBC2026 administrator
              account.
            </p>

            <form
              onSubmit={
                handleLogin
              }
              className="mt-8 space-y-5"
            >
              <label className="block">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0D1D34]/45">
                  Admin Email
                </span>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(
                    event,
                  ) =>
                    setEmail(
                      event
                        .target
                        .value,
                    )
                  }
                  className="mt-2 h-14 w-full rounded-[15px] border border-[#0D1D34]/10 bg-[#FAFAFA] px-4 text-sm font-semibold outline-none focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                  placeholder="admin@email.com"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0D1D34]/45">
                  Password
                </span>

                <input
                  type="password"
                  required
                  value={
                    password
                  }
                  onChange={(
                    event,
                  ) =>
                    setPassword(
                      event
                        .target
                        .value,
                    )
                  }
                  className="mt-2 h-14 w-full rounded-[15px] border border-[#0D1D34]/10 bg-[#FAFAFA] px-4 text-sm font-semibold outline-none focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                  placeholder="Enter password"
                />
              </label>

              {loginError ? (
                <div className="flex items-start gap-3 rounded-[15px] border border-red-200 bg-red-50 p-4 text-xs font-semibold leading-5 text-red-800">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {loginError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={
                  loginLoading
                }
                className="flex h-14 w-full items-center justify-center gap-2 rounded-[15px] bg-[#0D1D34] text-sm font-extrabold text-white transition hover:bg-[#CC8591] disabled:opacity-60"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Admin Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F5] px-5 pb-24 pt-32 text-[#0D1D34] sm:px-8">
      <section className="mx-auto max-w-[760px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/ebbc2026/scanner"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/50 transition hover:text-[#CC8591]"
          >
            <ArrowLeft className="h-4 w-4" />
            Scanner
          </Link>

          <button
            type="button"
            onClick={() =>
              void handleLogout()
            }
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/45 transition hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        <div className="mt-7 overflow-hidden rounded-[32px] border border-[#0D1D34]/8 bg-white shadow-[0_30px_90px_rgba(13,29,52,0.10)]">
          <div className="bg-[#0D1D34] px-7 py-9 text-white sm:px-10">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#CC8591]">
                  EBBC2026 Admin
                </p>

                <h1 className="mt-3 [font-family:var(--font-display)] text-[40px] font-semibold leading-none tracking-[-0.04em]">
                  Verify Payment
                </h1>

                <p className="mt-4 text-xs leading-6 text-white/55">
                  Full or installment
                  payments are supported.
                  Signed in as{" "}
                  <strong className="text-white">
                    {staffName}
                  </strong>
                </p>
              </div>

              <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-[#CC8591] sm:grid">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-7 flex items-start gap-3 rounded-[18px] border border-amber-200 bg-amber-50 p-5 text-amber-950">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />

              <p className="text-xs leading-6">
                Confirm every transaction
                in the official Equity or
                M-Pesa records. Each
                installment must have its
                own genuine M-Pesa code.
                The QR ticket activates
                only after the full order
                balance reaches KES 0.
              </p>
            </div>

            <form
              onSubmit={
                handleVerify
              }
              className="space-y-6"
            >
              <label className="block">
                <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0D1D34]/45">
                  <ReceiptText className="h-4 w-4" />
                  Order Number
                </span>

                <input
                  type="text"
                  required
                  value={
                    orderNumber
                  }
                  onChange={(
                    event,
                  ) =>
                    setOrderNumber(
                      event
                        .target
                        .value
                        .toUpperCase(),
                    )
                  }
                  placeholder="EBBC26-ORD-000010"
                  className="mt-2 h-14 w-full rounded-[15px] border border-[#0D1D34]/10 bg-[#FAFAFA] px-4 text-sm font-black uppercase outline-none focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                />
              </label>

              <label className="block">
                <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0D1D34]/45">
                  <CreditCard className="h-4 w-4" />
                  M-Pesa Transaction Code
                </span>

                <input
                  type="text"
                  required
                  value={
                    mpesaCode
                  }
                  onChange={(
                    event,
                  ) =>
                    setMpesaCode(
                      event
                        .target
                        .value
                        .toUpperCase(),
                    )
                  }
                  placeholder="e.g. TGH4ABC123"
                  className="mt-2 h-14 w-full rounded-[15px] border border-[#0D1D34]/10 bg-[#FAFAFA] px-4 text-sm font-black uppercase tracking-[0.08em] outline-none focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0D1D34]/45">
                  This Payment Amount
                  (KES)
                </span>

                <input
                  type="number"
                  required
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(
                    event,
                  ) =>
                    setAmount(
                      event
                        .target
                        .value,
                    )
                  }
                  placeholder="e.g. 1000"
                  className="mt-2 h-14 w-full rounded-[15px] border border-[#0D1D34]/10 bg-[#FAFAFA] px-4 text-sm font-black outline-none focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                />

                <p className="mt-2 text-[10px] leading-5 text-[#0D1D34]/45">
                  Enter the exact amount
                  received for this
                  transaction. It can be a
                  partial installment or
                  the full remaining
                  balance.
                </p>
              </label>

              {result ? (
                <div
                  className={`rounded-[19px] border p-5 ${
                    verifyState ===
                    "success"
                      ? result
                          .fullyPaid
                        ? "border-green-200 bg-green-50 text-green-900"
                        : "border-blue-200 bg-blue-50 text-blue-900"
                      : "border-red-200 bg-red-50 text-red-900"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {verifyState ===
                    "success" ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    )}

                    <div className="w-full">
                      <p className="text-sm font-extrabold">
                        {result.message ||
                          (verifyState ===
                          "success"
                            ? "Payment verified."
                            : "Verification failed.")}
                      </p>

                      {result.orderNumber ? (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-xl bg-white/70 p-3">
                            <p className="text-[9px] font-bold uppercase opacity-60">
                              Order
                            </p>
                            <p className="mt-1 text-xs font-black">
                              {
                                result.orderNumber
                              }
                            </p>
                          </div>

                          {result.paymentAmountKes !==
                          undefined ? (
                            <div className="rounded-xl bg-white/70 p-3">
                              <p className="text-[9px] font-bold uppercase opacity-60">
                                This Payment
                              </p>
                              <p className="mt-1 text-xs font-black">
                                KES{" "}
                                {formatMoney(
                                  result.paymentAmountKes,
                                )}
                              </p>
                            </div>
                          ) : null}

                          {result.totalAmountKes !==
                          undefined ? (
                            <div className="rounded-xl bg-white/70 p-3">
                              <p className="text-[9px] font-bold uppercase opacity-60">
                                Order Total
                              </p>
                              <p className="mt-1 text-xs font-black">
                                KES{" "}
                                {formatMoney(
                                  result.totalAmountKes,
                                )}
                              </p>
                            </div>
                          ) : null}

                          {result.totalPaidKes !==
                          undefined ? (
                            <div className="rounded-xl bg-white/70 p-3">
                              <p className="text-[9px] font-bold uppercase opacity-60">
                                Total Paid
                              </p>
                              <p className="mt-1 text-xs font-black">
                                KES{" "}
                                {formatMoney(
                                  result.totalPaidKes,
                                )}
                              </p>
                            </div>
                          ) : null}

                          {result.balanceKes !==
                          undefined ? (
                            <div className="rounded-xl bg-white/70 p-3">
                              <p className="text-[9px] font-bold uppercase opacity-60">
                                Balance
                              </p>
                              <p className="mt-1 text-xs font-black">
                                KES{" "}
                                {formatMoney(
                                  result.balanceKes,
                                )}
                              </p>
                            </div>
                          ) : null}

                          <div className="rounded-xl bg-white/70 p-3">
                            <p className="text-[9px] font-bold uppercase opacity-60">
                              QR Status
                            </p>
                            <p className="mt-1 text-xs font-black">
                              {result.ticketActivated
                                ? "ACTIVE"
                                : "LOCKED — BALANCE REMAINS"}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {result.buyerName ? (
                        <p className="mt-3 text-xs">
                          Buyer:{" "}
                          <strong>
                            {
                              result.buyerName
                            }
                          </strong>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={
                  verifyState ===
                  "loading"
                }
                className="flex h-[58px] w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(204,133,145,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {verifyState ===
                "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Verifying Payment...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    Verify Payment
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-[10px] leading-5 text-[#0D1D34]/40">
              Partial payments are
              saved against the same
              order. QR activation and
              ticket email happen only
              after verified payments
              equal the full order
              amount.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}