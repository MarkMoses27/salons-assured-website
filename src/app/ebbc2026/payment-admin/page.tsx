"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  LockKeyhole,
  LogIn,
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  TicketCheck,
  Users,
  WalletCards,
  XCircle,
} from "lucide-react";
import {
  FormEvent,
  useEffect,
  useMemo,
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

type PaymentFilter =
  | "all"
  | "paid"
  | "partial"
  | "unpaid";

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

type DashboardSummary = {
  totalOrders: number;
  paidOrders: number;
  partialOrders: number;
  unpaidOrders: number;
  totalTickets: number;
  activeTickets: number;
  checkedInTickets: number;
  grossRegisteredKes: number;
  receivedKes: number;
  outstandingKes: number;
};

type RegistrationRow = {
  orderId: string;
  orderNumber: string;
  orderCreatedAt: string | null;

  buyerFullName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCountry: string | null;
  buyerOrganisation: string | null;

  orderStatus: string | null;
  storedPaymentStatus: string | null;
  currency: string;

  ticketId: string;
  ticketNumber: string;

  attendeeFullName: string;
  attendeeEmail: string;
  attendeePhone: string | null;

  participantCategory: string | null;
  attendeeOrganisation: string | null;
  attendeeCountry: string | null;

  eventDate: string | null;
  ticketStatus: string | null;
  qrStatus: string;
  issuedAt: string | null;

  totalAmountKes: number;
  amountPaidKes: number;
  balanceKes: number;

  paymentState:
    | "paid"
    | "partial"
    | "unpaid";

  paymentMethod: string;
  paymentCount: number;

  lastPaymentReference:
    | string
    | null;

  lastPaymentAt:
    | string
    | null;

  checkInStatus:
    | "checked_in"
    | "not_checked_in";

  lastCheckInAt:
    | string
    | null;

  lastCheckInGate:
    | string
    | null;

  lastScanResult:
    | string
    | null;
};

type DashboardResponse = {
  ok?: boolean;
  message?: string;
  generatedAt?: string;

  staff?: {
    displayName?: string;
    role?: string;
  };

  summary?: DashboardSummary;

  registrations?:
    RegistrationRow[];

  totalResults?: number;
};

const emptySummary:
  DashboardSummary = {
    totalOrders: 0,
    paidOrders: 0,
    partialOrders: 0,
    unpaidOrders: 0,
    totalTickets: 0,
    activeTickets: 0,
    checkedInTickets: 0,
    grossRegisteredKes: 0,
    receivedKes: 0,
    outstandingKes: 0,
  };

function formatMoney(
  amount:
    | number
    | null
    | undefined,
) {
  return new Intl.NumberFormat(
    "en-KE",
    {
      maximumFractionDigits: 0,
    },
  ).format(
    Number(amount || 0),
  );
}

function formatDate(
  value:
    | string
    | null
    | undefined,
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return date.toLocaleDateString(
    "en-KE",
    {
      timeZone:
        "Africa/Nairobi",
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}

function formatDateTime(
  value:
    | string
    | null
    | undefined,
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return date.toLocaleString(
    "en-KE",
    {
      timeZone:
        "Africa/Nairobi",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
}

function formatEventDate(
  value:
    | string
    | null
    | undefined,
) {
  if (
    value ===
    "2026-11-17"
  ) {
    return "17 Nov 2026";
  }

  if (
    value ===
    "2026-11-18"
  ) {
    return "18 Nov 2026";
  }

  return "—";
}

function normaliseSearchText(
  value: unknown,
) {
  return String(
    value ?? "",
  )
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      " ",
    )
    .trim()
    .replace(
      /\s+/g,
      " ",
    );
}

function isWithinOneEdit(
  first: string,
  second: string,
) {
  if (
    first === second
  ) {
    return true;
  }

  if (
    Math.abs(
      first.length -
        second.length,
    ) > 1
  ) {
    return false;
  }

  let firstIndex = 0;
  let secondIndex = 0;
  let edits = 0;

  while (
    firstIndex <
      first.length &&
    secondIndex <
      second.length
  ) {
    if (
      first[firstIndex] ===
      second[secondIndex]
    ) {
      firstIndex += 1;
      secondIndex += 1;
      continue;
    }

    edits += 1;

    if (edits > 1) {
      return false;
    }

    if (
      first.length ===
      second.length
    ) {
      firstIndex += 1;
      secondIndex += 1;
      continue;
    }

    if (
      first.length >
      second.length
    ) {
      firstIndex += 1;
      continue;
    }

    secondIndex += 1;
  }

  if (
    firstIndex <
      first.length ||
    secondIndex <
      second.length
  ) {
    edits += 1;
  }

  return edits <= 1;
}

function nameTermMatches(
  term: string,
  names: Array<
    string | null | undefined
  >,
) {
  if (!term) {
    return true;
  }

  const nameTokens =
    names
      .flatMap(
        (name) =>
          normaliseSearchText(
            name,
          ).split(" "),
      )
      .filter(Boolean);

  return nameTokens.some(
    (token) => {
      if (
        token.includes(term) ||
        term.includes(token)
      ) {
        return true;
      }

      if (
        term.length >= 4 &&
        token.length >= 4
      ) {
        return isWithinOneEdit(
          term,
          token,
        );
      }

      return false;
    },
  );
}

function PaymentBadge({
  state,
}: {
  state:
    | "paid"
    | "partial"
    | "unpaid";
}) {
  if (
    state === "paid"
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Paid
      </span>
    );
  }

  if (
    state === "partial"
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-amber-700">
        <WalletCards className="h-3.5 w-3.5" />
        Partial
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-red-700">
      <XCircle className="h-3.5 w-3.5" />
      Unpaid
    </span>
  );
}

function QrBadge({
  status,
}: {
  status: string;
}) {
  const cleanStatus =
    status.toLowerCase();

  if (
    cleanStatus ===
    "active"
  ) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-emerald-700">
        <ShieldCheck className="h-3.5 w-3.5" />
        Active
      </span>
    );
  }

  if (
    cleanStatus ===
      "cancelled" ||
    cleanStatus ===
      "blocked"
  ) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-red-700">
        <XCircle className="h-3.5 w-3.5" />
        {cleanStatus}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-slate-600">
      <LockKeyhole className="h-3.5 w-3.5" />
      Locked
    </span>
  );
}

function CheckInBadge({
  status,
}: {
  status: string;
}) {
  if (
    status ===
    "checked_in"
  ) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-blue-700">
        <TicketCheck className="h-3.5 w-3.5" />
        Checked In
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
      Not Checked In
    </span>
  );
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
    dashboardLoading,
    setDashboardLoading,
  ] =
    useState(false);

  const [
    dashboardError,
    setDashboardError,
  ] =
    useState("");

  const [
    summary,
    setSummary,
  ] =
    useState<DashboardSummary>(
      emptySummary,
    );

  const [
    registrations,
    setRegistrations,
  ] =
    useState<
      RegistrationRow[]
    >([]);

  const [
    generatedAt,
    setGeneratedAt,
  ] =
    useState("");

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    paymentFilter,
    setPaymentFilter,
  ] =
    useState<PaymentFilter>(
      "all",
    );

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

  async function getAccessToken() {
    const supabase =
      getSupabaseBrowserClient();

    const {
      data:
        sessionData,
    } =
      await supabase.auth
        .getSession();

    return (
      sessionData.session
        ?.access_token ||
      null
    );
  }

  async function loadDashboard() {
    setDashboardLoading(
      true,
    );

    setDashboardError("");

    try {
      const accessToken =
        await getAccessToken();

      if (!accessToken) {
        setAuthState(
          "signed_out",
        );

        return;
      }

      const response =
        await fetch(
          "/api/ebbc2026/manual-payment",
          {
            method: "GET",

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
          DashboardResponse;

      if (
        response.status ===
        401
      ) {
        const supabase =
          getSupabaseBrowserClient();

        await supabase.auth
          .signOut();

        setAuthState(
          "signed_out",
        );

        return;
      }

      if (
        !response.ok ||
        !data.ok
      ) {
        setDashboardError(
          data.message ||
            "The dashboard could not be loaded.",
        );

        return;
      }

      setSummary(
        data.summary ||
          emptySummary,
      );

      setRegistrations(
        data.registrations ||
          [],
      );

      setGeneratedAt(
        data.generatedAt ||
          "",
      );

      if (
        data.staff
          ?.displayName
      ) {
        setStaffName(
          data.staff
            .displayName,
        );
      }
    } catch (error) {
      console.error(
        "EBBC2026 dashboard loading error:",
        error,
      );

      setDashboardError(
        "The dashboard could not be loaded.",
      );
    } finally {
      setDashboardLoading(
        false,
      );
    }
  }

  async function verifySession() {
    setAuthState(
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

        return;
      }

      const response =
        await fetch(
          "/api/ebbc2026/scanner/session",
          {
            method: "GET",

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
        data.staff
          ?.role !==
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

      setTimeout(
        () => {
          void loadDashboard();
        },
        0,
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
          .signInWithPassword(
            {
              email:
                cleanEmail,

              password,
            },
          );

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
            method: "GET",

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
          ?.role !==
        "admin"
      ) {
        await supabase.auth
          .signOut();

        setLoginError(
          "Only an EBBC2026 administrator can access payments.",
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

      setTimeout(
        () => {
          void loadDashboard();
        },
        0,
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

    setRegistrations([]);

    setSummary(
      emptySummary,
    );

    setSearch("");

    setPaymentFilter(
      "all",
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
          "VERIFY EBBC2026 EQUITY PAYMENT",
          "",
          `Order: ${cleanOrderNumber}`,
          `M-Pesa Code: ${cleanMpesaCode}`,
          `Payment received: KES ${formatMoney(
            amountKes,
          )}`,
          "",
          "Only continue after confirming this transaction in the official Equity/M-Pesa records.",
          "",
          "If a balance remains, the QR stays locked.",
          "The QR activates only when the balance reaches KES 0.",
        ].join("\n"),
      );

    if (!confirmed) {
      return;
    }

    setVerifyState(
      "loading",
    );

    try {
      const accessToken =
        await getAccessToken();

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
              JSON.stringify(
                {
                  orderNumber:
                    cleanOrderNumber,

                  mpesaCode:
                    cleanMpesaCode,

                  amountKes,
                },
              ),

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

      await loadDashboard();
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

  const filteredRows =
    useMemo(
      () => {
        const rawSearchTerms =
          search
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        const searchTerms =
          rawSearchTerms
            .map(
              (term) => ({
                raw:
                  term.toLowerCase(),

                normalised:
                  normaliseSearchText(
                    term,
                  ),
              }),
            )
            .filter(
              (term) =>
                Boolean(
                  term.normalised,
                ),
            );

        return registrations.filter(
          (row) => {
            if (
              paymentFilter !==
                "all" &&
              row.paymentState !==
                paymentFilter
            ) {
              return false;
            }

            if (
              searchTerms.length ===
              0
            ) {
              return true;
            }

            const names = [
              row.buyerFullName,
              row.attendeeFullName,
            ];

            const nonEmailSearchText =
              normaliseSearchText(
                [
                  row.orderNumber,
                  row.buyerFullName,
                  row.buyerPhone,
                  row.buyerOrganisation,
                  row.ticketNumber,
                  row.attendeeFullName,
                  row.attendeePhone,
                  row.participantCategory,
                  row.attendeeOrganisation,
                  row.attendeeCountry,
                  row.eventDate,
                  row.paymentMethod,
                  row.lastPaymentReference,
                  row.qrStatus,
                  row.checkInStatus,
                ]
                  .filter(Boolean)
                  .join(" "),
              );

            const fullSearchText =
              normaliseSearchText(
                [
                  nonEmailSearchText,
                  row.buyerEmail,
                  row.attendeeEmail,
                ]
                  .filter(Boolean)
                  .join(" "),
              );

            return searchTerms.every(
              ({
                raw,
                normalised,
              }) => {
                const isPlainNameWord =
                  /^[a-z]+$/i.test(
                    raw,
                  );

                if (
                  isPlainNameWord
                ) {
                  if (
                    nameTermMatches(
                      normalised,
                      names,
                    )
                  ) {
                    return true;
                  }

                  return (
                    nonEmailSearchText.includes(
                      normalised,
                    )
                  );
                }

                return (
                  fullSearchText.includes(
                    normalised,
                  )
                );
              },
            );
          },
        );
      },
      [
        registrations,
        search,
        paymentFilter,
      ],
    );

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
              EBBC2026 administrator can
              access payment and registration
              records.
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
      <main className="min-h-screen bg-[#F7F5F5] px-5 pb-20 pt-28 text-[#0D1D34] sm:px-8">
        <section className="mx-auto max-w-[620px]">
          <Link
            href="/ebbc2026"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/50 transition hover:text-[#CC8591]"
          >
            <ArrowLeft className="h-4 w-4" />
            EBBC2026
          </Link>

          <div className="mt-7 rounded-[30px] border border-[#0D1D34]/8 bg-white p-7 shadow-[0_30px_80px_rgba(13,29,52,0.10)] sm:p-10">
            <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-[#0D1D34] text-white">
              <LockKeyhole className="h-6 w-6" />
            </div>

            <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#CC8591]">
              SAK / Elevate Administration
            </p>

            <h1 className="mt-3 [font-family:var(--font-display)] text-[38px] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-[46px]">
              Payments &
              Registration
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#0D1D34]/55">
              Secure EBBC2026 administration
              for registrations, payments,
              Equity installments, QR status
              and event check-in.
            </p>

            <form
              onSubmit={
                handleLogin
              }
              className="mt-8 space-y-4"
            >
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-xs font-black uppercase tracking-[0.08em] text-[#0D1D34]/55"
                >
                  Admin Email
                </label>

                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(
                    event,
                  ) =>
                    setEmail(
                      event.target
                        .value,
                    )
                  }
                  autoComplete="email"
                  className="h-13 w-full rounded-2xl border border-[#0D1D34]/10 bg-[#F7F5F5] px-4 text-sm font-semibold outline-none transition focus:border-[#CC8591]"
                  placeholder="Admin email"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-2 block text-xs font-black uppercase tracking-[0.08em] text-[#0D1D34]/55"
                >
                  Password
                </label>

                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(
                    event,
                  ) =>
                    setPassword(
                      event.target
                        .value,
                    )
                  }
                  autoComplete="current-password"
                  className="h-13 w-full rounded-2xl border border-[#0D1D34]/10 bg-[#F7F5F5] px-4 text-sm font-semibold outline-none transition focus:border-[#CC8591]"
                  placeholder="Password"
                />
              </div>

              {loginError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {loginError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={
                  loginLoading
                }
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#0D1D34] px-6 text-sm font-black text-white transition hover:bg-[#172c4c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loginLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}

                Sign In
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F5] pb-24 pt-24 text-[#0D1D34]">
      <section className="mx-auto max-w-[1580px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/ebbc2026"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/45 transition hover:text-[#CC8591]"
            >
              <ArrowLeft className="h-4 w-4" />
              EBBC2026
            </Link>

            <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
              SAK / Elevate Administration
            </p>

            <h1 className="mt-2 [font-family:var(--font-display)] text-[38px] font-semibold leading-none tracking-[-0.04em] sm:text-[50px]">
              Payments &
              Registration
            </h1>

            <p className="mt-3 text-sm text-[#0D1D34]/50">
              Signed in as{" "}
              <span className="font-extrabold text-[#0D1D34]">
                {staffName}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                void loadDashboard()
              }
              disabled={
                dashboardLoading
              }
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#0D1D34]/10 bg-white px-5 text-xs font-black shadow-sm transition hover:border-[#CC8591]/60 disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  dashboardLoading
                    ? "animate-spin"
                    : ""
                }`}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={() =>
                void handleLogout()
              }
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0D1D34] px-5 text-xs font-black text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {dashboardError ? (
          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            {dashboardError}
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[24px] border border-[#0D1D34]/7 bg-white p-5 shadow-[0_16px_45px_rgba(13,29,52,0.05)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#0D1D34]/40">
                Registrations
              </span>

              <Users className="h-5 w-5 text-[#CC8591]" />
            </div>

            <div className="mt-3 text-3xl font-black">
              {summary.totalOrders}
            </div>

            <div className="mt-2 text-xs font-semibold text-[#0D1D34]/45">
              {summary.totalTickets}{" "}
              individual ticket
              {summary.totalTickets ===
              1
                ? ""
                : "s"}
            </div>
          </div>

          <div className="rounded-[24px] border border-[#0D1D34]/7 bg-white p-5 shadow-[0_16px_45px_rgba(13,29,52,0.05)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#0D1D34]/40">
                Money Received
              </span>

              <CreditCard className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="mt-3 text-3xl font-black">
              <span className="text-sm text-[#0D1D34]/40">
                KES{" "}
              </span>
              {formatMoney(
                summary.receivedKes,
              )}
            </div>

            <div className="mt-2 text-xs font-semibold text-[#0D1D34]/45">
              {summary.paidOrders}{" "}
              fully paid order
              {summary.paidOrders ===
              1
                ? ""
                : "s"}
            </div>
          </div>

          <div className="rounded-[24px] border border-[#0D1D34]/7 bg-white p-5 shadow-[0_16px_45px_rgba(13,29,52,0.05)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#0D1D34]/40">
                Outstanding
              </span>

              <WalletCards className="h-5 w-5 text-amber-600" />
            </div>

            <div className="mt-3 text-3xl font-black">
              <span className="text-sm text-[#0D1D34]/40">
                KES{" "}
              </span>
              {formatMoney(
                summary.outstandingKes,
              )}
            </div>

            <div className="mt-2 text-xs font-semibold text-[#0D1D34]/45">
              {summary.partialOrders}{" "}
              partial ·{" "}
              {summary.unpaidOrders}{" "}
              unpaid
            </div>
          </div>

          <div className="rounded-[24px] border border-[#0D1D34]/7 bg-white p-5 shadow-[0_16px_45px_rgba(13,29,52,0.05)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#0D1D34]/40">
                Event Access
              </span>

              <TicketCheck className="h-5 w-5 text-blue-600" />
            </div>

            <div className="mt-3 text-3xl font-black">
              {summary.activeTickets}
            </div>

            <div className="mt-2 text-xs font-semibold text-[#0D1D34]/45">
              active QR ·{" "}
              {summary.checkedInTickets}{" "}
              checked in
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <button
            type="button"
            onClick={() =>
              setPaymentFilter(
                "paid",
              )
            }
            className={`rounded-[20px] border p-4 text-left transition ${
              paymentFilter ===
              "paid"
                ? "border-emerald-300 bg-emerald-50"
                : "border-[#0D1D34]/7 bg-white hover:border-emerald-200"
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
              Paid
            </div>

            <div className="mt-1 text-2xl font-black">
              {summary.paidOrders}
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              setPaymentFilter(
                "partial",
              )
            }
            className={`rounded-[20px] border p-4 text-left transition ${
              paymentFilter ===
              "partial"
                ? "border-amber-300 bg-amber-50"
                : "border-[#0D1D34]/7 bg-white hover:border-amber-200"
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-[0.12em] text-amber-700">
              Partial
            </div>

            <div className="mt-1 text-2xl font-black">
              {summary.partialOrders}
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              setPaymentFilter(
                "unpaid",
              )
            }
            className={`rounded-[20px] border p-4 text-left transition ${
              paymentFilter ===
              "unpaid"
                ? "border-red-300 bg-red-50"
                : "border-[#0D1D34]/7 bg-white hover:border-red-200"
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-[0.12em] text-red-700">
              Unpaid
            </div>

            <div className="mt-1 text-2xl font-black">
              {summary.unpaidOrders}
            </div>
          </button>
        </div>

        <section className="mt-8 rounded-[28px] border border-[#0D1D34]/7 bg-white shadow-[0_20px_60px_rgba(13,29,52,0.06)]">
          <div className="flex flex-col gap-4 border-b border-[#0D1D34]/7 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black">
                Registration Records
              </h2>

              <p className="mt-1 text-xs font-semibold text-[#0D1D34]/40">
                {filteredRows.length}{" "}
                ticket
                {filteredRows.length ===
                1
                  ? ""
                  : "s"}{" "}
                shown
                {generatedAt
                  ? ` · updated ${formatDateTime(
                      generatedAt,
                    )}`
                  : ""}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:w-[360px]">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0D1D34]/35" />

                <input
                  type="search"
                  value={search}
                  onChange={(
                    event,
                  ) =>
                    setSearch(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Search name, phone, order, ticket, reference..."
                  className="h-11 w-full rounded-full border border-[#0D1D34]/10 bg-[#F7F5F5] pl-11 pr-4 text-xs font-semibold outline-none transition focus:border-[#CC8591]"
                />
              </div>

              <select
                value={
                  paymentFilter
                }
                onChange={(
                  event,
                ) =>
                  setPaymentFilter(
                    event.target
                      .value as
                      PaymentFilter,
                  )
                }
                className="h-11 rounded-full border border-[#0D1D34]/10 bg-[#F7F5F5] px-4 text-xs font-black outline-none"
              >
                <option value="all">
                  All Payments
                </option>

                <option value="paid">
                  Paid
                </option>

                <option value="partial">
                  Partial
                </option>

                <option value="unpaid">
                  Unpaid
                </option>
              </select>
            </div>
          </div>

          {dashboardLoading &&
          registrations.length ===
            0 ? (
            <div className="grid min-h-[340px] place-items-center">
              <div className="text-center">
                <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#CC8591]" />

                <p className="mt-3 text-xs font-black text-[#0D1D34]/50">
                  Loading registrations...
                </p>
              </div>
            </div>
          ) : filteredRows.length ===
            0 ? (
            <div className="grid min-h-[300px] place-items-center p-6 text-center">
              <div>
                <Search className="mx-auto h-8 w-8 text-[#0D1D34]/25" />

                <p className="mt-4 text-sm font-black">
                  No matching registrations
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");

                    setPaymentFilter(
                      "all",
                    );
                  }}
                  className="mt-4 text-xs font-black text-[#CC8591]"
                >
                  Clear filters
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto xl:block">
                <table className="min-w-[1750px] w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#F8F7F7] text-[9px] font-black uppercase tracking-[0.12em] text-[#0D1D34]/40">
                      <th className="px-5 py-4">
                        Customer
                      </th>

                      <th className="px-5 py-4">
                        Order
                      </th>

                      <th className="px-5 py-4">
                        Ticket / Attendee
                      </th>

                      <th className="px-5 py-4">
                        Event Day
                      </th>

                      <th className="px-5 py-4">
                        Payment
                      </th>

                      <th className="px-5 py-4">
                        Paid
                      </th>

                      <th className="px-5 py-4">
                        Balance
                      </th>

                      <th className="px-5 py-4">
                        Method
                      </th>

                      <th className="px-5 py-4">
                        QR
                      </th>

                      <th className="px-5 py-4">
                        Check-In
                      </th>

                      <th className="px-5 py-4">
                        Last Payment
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRows.map(
                      (row) => (
                        <tr
                          key={
                            row.ticketId
                          }
                          className="border-t border-[#0D1D34]/6 align-top transition hover:bg-[#FCFBFB]"
                        >
                          <td className="px-5 py-5">
                            <div className="max-w-[210px]">
                              <div className="text-xs font-black">
                                {row.buyerFullName}
                              </div>

                              <div className="mt-1 text-[11px] font-semibold text-[#0D1D34]/50">
                                {row.buyerPhone}
                              </div>

                              <div className="mt-0.5 break-all text-[10px] text-[#0D1D34]/40">
                                {row.buyerEmail}
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <div className="text-xs font-black">
                              {row.orderNumber}
                            </div>

                            <div className="mt-1 text-[10px] text-[#0D1D34]/40">
                              {formatDate(
                                row.orderCreatedAt,
                              )}
                            </div>

                            <div className="mt-1 text-[10px] font-bold text-[#0D1D34]/45">
                              KES{" "}
                              {formatMoney(
                                row.totalAmountKes,
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <div className="max-w-[220px]">
                              <div className="text-[10px] font-black uppercase tracking-[0.06em] text-[#CC8591]">
                                {row.ticketNumber}
                              </div>

                              <div className="mt-1 text-xs font-black">
                                {row.attendeeFullName}
                              </div>

                              {row.participantCategory ? (
                                <div className="mt-1 text-[10px] text-[#0D1D34]/45">
                                  {row.participantCategory}
                                </div>
                              ) : null}
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <div className="inline-flex items-center gap-1.5 text-xs font-black">
                              <CalendarDays className="h-4 w-4 text-[#CC8591]" />

                              {formatEventDate(
                                row.eventDate,
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <PaymentBadge
                              state={
                                row.paymentState
                              }
                            />
                          </td>

                          <td className="px-5 py-5">
                            <div className="text-xs font-black text-emerald-700">
                              KES{" "}
                              {formatMoney(
                                row.amountPaidKes,
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <div
                              className={`text-xs font-black ${
                                row.balanceKes >
                                0
                                  ? "text-amber-700"
                                  : "text-[#0D1D34]/35"
                              }`}
                            >
                              KES{" "}
                              {formatMoney(
                                row.balanceKes,
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <div className="text-xs font-black">
                              {row.paymentMethod}
                            </div>

                            {row.paymentCount >
                            1 ? (
                              <div className="mt-1 text-[10px] font-bold text-[#0D1D34]/40">
                                {row.paymentCount}{" "}
                                payments
                              </div>
                            ) : null}
                          </td>

                          <td className="px-5 py-5">
                            <QrBadge
                              status={
                                row.qrStatus
                              }
                            />
                          </td>

                          <td className="px-5 py-5">
                            <CheckInBadge
                              status={
                                row.checkInStatus
                              }
                            />

                            {row.lastCheckInAt ? (
                              <div className="mt-2 text-[10px] leading-4 text-[#0D1D34]/45">
                                {formatDateTime(
                                  row.lastCheckInAt,
                                )}

                                {row.lastCheckInGate
                                  ? ` · ${row.lastCheckInGate}`
                                  : ""}
                              </div>
                            ) : null}
                          </td>

                          <td className="px-5 py-5">
                            <div className="max-w-[170px]">
                              <div className="break-all text-[10px] font-black">
                                {row.lastPaymentReference ||
                                  "—"}
                              </div>

                              <div className="mt-1 text-[10px] text-[#0D1D34]/40">
                                {formatDateTime(
                                  row.lastPaymentAt,
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-[#0D1D34]/7 xl:hidden">
                {filteredRows.map(
                  (row) => (
                    <article
                      key={
                        row.ticketId
                      }
                      className="p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.08em] text-[#CC8591]">
                            {row.ticketNumber}
                          </div>

                          <h3 className="mt-1 text-sm font-black">
                            {row.attendeeFullName}
                          </h3>

                          <p className="mt-1 text-xs font-semibold text-[#0D1D34]/45">
                            {row.orderNumber}
                          </p>
                        </div>

                        <PaymentBadge
                          state={
                            row.paymentState
                          }
                        />
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[0.1em] text-[#0D1D34]/35">
                            Buyer
                          </div>

                          <div className="mt-1 text-xs font-black">
                            {row.buyerFullName}
                          </div>

                          <div className="mt-1 text-[11px] text-[#0D1D34]/45">
                            {row.buyerPhone}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[0.1em] text-[#0D1D34]/35">
                            Event Day
                          </div>

                          <div className="mt-1 text-xs font-black">
                            {formatEventDate(
                              row.eventDate,
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[0.1em] text-[#0D1D34]/35">
                            Amount Paid
                          </div>

                          <div className="mt-1 text-xs font-black text-emerald-700">
                            KES{" "}
                            {formatMoney(
                              row.amountPaidKes,
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[0.1em] text-[#0D1D34]/35">
                            Balance
                          </div>

                          <div className="mt-1 text-xs font-black">
                            KES{" "}
                            {formatMoney(
                              row.balanceKes,
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[0.1em] text-[#0D1D34]/35">
                            Payment Method
                          </div>

                          <div className="mt-1 text-xs font-black">
                            {row.paymentMethod}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[0.1em] text-[#0D1D34]/35">
                            QR / Check-In
                          </div>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <QrBadge
                              status={
                                row.qrStatus
                              }
                            />

                            <CheckInBadge
                              status={
                                row.checkInStatus
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </>
          )}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[28px] border border-[#0D1D34]/7 bg-[#0D1D34] p-6 text-white shadow-[0_24px_65px_rgba(13,29,52,0.15)] sm:p-8">
            <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#E8A6B2]">
              Equity Installments
            </p>

            <h2 className="mt-3 [font-family:var(--font-display)] text-[34px] font-semibold leading-none tracking-[-0.03em]">
              Verify Payment
            </h2>

            <p className="mt-4 max-w-[600px] text-sm leading-7 text-white/55">
              Paybill 247247 · Account
              100831. Verify only against
              official Equity/M-PESA records.
              Partial payments keep the QR
              locked until the balance reaches
              KES 0.
            </p>

            <form
              onSubmit={
                handleVerify
              }
              className="mt-7 grid gap-4 sm:grid-cols-3"
            >
              <div>
                <label
                  htmlFor="order-number"
                  className="mb-2 block text-[9px] font-black uppercase tracking-[0.12em] text-white/45"
                >
                  Order Number
                </label>

                <input
                  id="order-number"
                  value={
                    orderNumber
                  }
                  onChange={(
                    event,
                  ) =>
                    setOrderNumber(
                      event.target
                        .value,
                    )
                  }
                  placeholder="EBBC..."
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/8 px-4 text-sm font-bold text-white outline-none placeholder:text-white/25 focus:border-[#E8A6B2]"
                />
              </div>

              <div>
                <label
                  htmlFor="mpesa-code"
                  className="mb-2 block text-[9px] font-black uppercase tracking-[0.12em] text-white/45"
                >
                  M-PESA Code
                </label>

                <input
                  id="mpesa-code"
                  value={
                    mpesaCode
                  }
                  onChange={(
                    event,
                  ) =>
                    setMpesaCode(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Transaction code"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/8 px-4 text-sm font-bold uppercase text-white outline-none placeholder:normal-case placeholder:text-white/25 focus:border-[#E8A6B2]"
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="mb-2 block text-[9px] font-black uppercase tracking-[0.12em] text-white/45"
                >
                  Amount Received
                </label>

                <input
                  id="amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(
                    event,
                  ) =>
                    setAmount(
                      event.target
                        .value,
                    )
                  }
                  placeholder="KES"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/8 px-4 text-sm font-bold text-white outline-none placeholder:text-white/25 focus:border-[#E8A6B2]"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  disabled={
                    verifyState ===
                    "loading"
                  }
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#E8A6B2] px-7 text-xs font-black text-[#0D1D34] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {verifyState ===
                  "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}

                  Verify Equity Payment
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-[28px] border border-[#0D1D34]/7 bg-white p-6 shadow-[0_20px_60px_rgba(13,29,52,0.06)] sm:p-8">
            <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CC8591]">
              Verification Result
            </p>

            {!result ? (
              <div className="mt-8 rounded-[22px] bg-[#F7F5F5] p-6">
                <ShieldCheck className="h-7 w-7 text-[#0D1D34]/25" />

                <p className="mt-4 text-sm font-black">
                  No payment verified yet
                </p>

                <p className="mt-2 text-xs leading-6 text-[#0D1D34]/45">
                  The latest verification
                  result will appear here.
                </p>
              </div>
            ) : (
              <div
                className={`mt-6 rounded-[22px] border p-5 ${
                  verifyState ===
                  "success"
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {verifyState ===
                  "success" ? (
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
                  )}

                  <div>
                    <p
                      className={`text-sm font-black ${
                        verifyState ===
                        "success"
                          ? "text-emerald-800"
                          : "text-red-800"
                      }`}
                    >
                      {result.message ||
                        "Payment verification completed."}
                    </p>

                    {result.orderNumber ? (
                      <div className="mt-5 grid gap-3 text-xs sm:grid-cols-2">
                        <div>
                          <span className="block text-[9px] font-black uppercase tracking-[0.1em] opacity-50">
                            Order
                          </span>

                          <span className="mt-1 block font-black">
                            {result.orderNumber}
                          </span>
                        </div>

                        <div>
                          <span className="block text-[9px] font-black uppercase tracking-[0.1em] opacity-50">
                            Customer
                          </span>

                          <span className="mt-1 block font-black">
                            {result.buyerName ||
                              "—"}
                          </span>
                        </div>

                        <div>
                          <span className="block text-[9px] font-black uppercase tracking-[0.1em] opacity-50">
                            This Payment
                          </span>

                          <span className="mt-1 block font-black">
                            KES{" "}
                            {formatMoney(
                              result.paymentAmountKes,
                            )}
                          </span>
                        </div>

                        <div>
                          <span className="block text-[9px] font-black uppercase tracking-[0.1em] opacity-50">
                            Total Paid
                          </span>

                          <span className="mt-1 block font-black">
                            KES{" "}
                            {formatMoney(
                              result.totalPaidKes,
                            )}
                          </span>
                        </div>

                        <div>
                          <span className="block text-[9px] font-black uppercase tracking-[0.1em] opacity-50">
                            Balance
                          </span>

                          <span className="mt-1 block font-black">
                            KES{" "}
                            {formatMoney(
                              result.balanceKes,
                            )}
                          </span>
                        </div>

                        <div>
                          <span className="block text-[9px] font-black uppercase tracking-[0.1em] opacity-50">
                            QR
                          </span>

                          <span className="mt-1 block font-black">
                            {result.ticketActivated
                              ? "ACTIVE"
                              : "LOCKED"}
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="mt-7 rounded-[22px] border border-[#0D1D34]/7 bg-white px-5 py-4">
          <p className="text-[11px] leading-6 text-[#0D1D34]/45">
            <strong className="text-[#0D1D34]">
              EBBC2026 ticket rule:
            </strong>{" "}
            each ticket belongs to one
            attendee and one selected event
            day. A 17 November ticket is
            valid only on 17 November 2026;
            an 18 November ticket is valid
            only on 18 November 2026.
          </p>
        </div>
      </section>
    </main>
  );
}