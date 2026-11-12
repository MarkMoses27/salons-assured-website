"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Download,
  Eye,
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
  X,
  XCircle,
} from "lucide-react";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

import { EBBC2026, getEBBCCheckInOpening, getEBBCOrderPricing, getEBBCTicketPriceKes } from "@/lib/ebbc2026/config";

function usesDayTwoRate(category: string) {
  return getEBBCTicketPriceKes(undefined, EBBC2026.dates.end, category) < EBBC2026.ticket.standardPriceKes;
}

const staffParticipantCategories = [...EBBC2026.participantCategories.filter(item => item !== "Other"), "Sponsor", "Other"];
const defaultPaymentChoice = "already_paid";

const attendanceOptions = [
  { value: "2026-11-17", label: "Day 1 · 17 November" },
  { value: "2026-11-18", label: "Day 2 · 18 November" },
  { value: "both", label: "Both days · 17 and 18 November" },
];

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

type PaymentState =
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

  paymentState: PaymentState;

  paymentMethod: string;
  paymentCount: number;

  lastPaymentReference: string | null;
  paymentReferences?: string[];
  lastPaymentAt: string | null;

  checkInStatus:
    | "checked_in"
    | "not_checked_in";

  lastCheckInAt: string | null;
  lastCheckInGate: string | null;
  lastScanResult: string | null;
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
  registrations?: RegistrationRow[];
  totalResults?: number;
};

type DetailPayment = {
  id: string;
  provider: string | null;
  paymentMethod: string;
  transactionReference: string | null;
  providerTransactionId: string | null;
  amountKes: number;
  currency: string;
  paymentStatus: string | null;
  paidAt: string | null;
  verifiedAt: string | null;
  createdAt: string | null;
};

type DetailCheckIn = {
  id: string;
  scanResult: string | null;
  gateName: string | null;
  eventDate: string | null;
  scannedAt: string | null;
};

type DetailTicket = {
  id: string;
  ticketNumber: string;
  attendeeFullName: string;
  attendeeEmail: string;
  attendeePhone: string | null;
  participantCategory: string | null;
  organisation: string | null;
  country: string | null;
  eventDate: string | null;
  ticketStatus: string | null;
  qrStatus: string;
  issuedAt: string | null;
  createdAt: string | null;
  checkInCount: number;
  checkIns: DetailCheckIn[];
};

type DetailOrder = {
  id: string;
  orderNumber: string;
  buyerFullName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCountry: string | null;
  buyerOrganisation: string | null;
  ticketQuantity: number;
  totalAmountKes: number;
  totalPaidKes: number;
  balanceKes: number;
  paymentState: PaymentState;
  currency: string;
  orderStatus: string | null;
  storedPaymentStatus: string | null;
  createdAt: string | null;
  paidAt: string | null;
};

type DetailsResponse = {
  ok?: boolean;
  message?: string;
  generatedAt?: string;
  order?: DetailOrder;
  payments?: DetailPayment[];
  tickets?: DetailTicket[];
};

const emptySummary: DashboardSummary = {
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

  const date = new Date(value);

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

  const date = new Date(value);

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

function csvCell(
  value: unknown,
) {
  let text =
    String(value ?? "");

  /*
   * Prevent spreadsheet formula execution
   * when CSV values are opened in Excel.
   */
  if (
    /^[=+\-@]/.test(text)
  ) {
    text = `'${text}`;
  }

  return `"${text.replace(
    /"/g,
    '""',
  )}"`;
}

function PaymentBadge({
  state,
}: {
  state: PaymentState;
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

function DetailValue({
  label,
  value,
}: {
  label: string;
  value:
    | string
    | number
    | null
    | undefined;
}) {
  const displayValue =
    value === null ||
    value === undefined ||
    value === ""
      ? "—"
      : value;

  return (
    <div>
      <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#0D1D34]/35">
        {label}
      </div>

      <div className="mt-1 break-words text-xs font-black text-[#0D1D34]">
        {displayValue}
      </div>
    </div>
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

  const [
    detailsOpen,
    setDetailsOpen,
  ] =
    useState(false);

  const [
    detailsLoading,
    setDetailsLoading,
  ] =
    useState(false);

  const [
    detailsError,
    setDetailsError,
  ] =
    useState("");

  const [
    details,
    setDetails,
  ] =
    useState<DetailsResponse | null>(
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

  const [addingAttendee, setAddingAttendee] = useState(false);
  const [onsiteBusy, setOnsiteBusy] = useState(false);
  const onsiteLock = useRef(false);
  const [onsiteNotice, setOnsiteNotice] = useState("");
  const [checkInNotice, setCheckInNotice] = useState<{ orderId: string; message: string } | null>(null);
  const [attendance, setAttendance] = useState("");
  const [category, setCategory] = useState("");
  const [paymentChoice, setPaymentChoice] = useState<string>(defaultPaymentChoice);

  const [checkInTime, setCheckInTime] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCheckInTime(Math.floor(Date.now() / 60_000) * 60_000);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const eventDay = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Nairobi", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date(checkInTime));
  const dayTwoOnly = usesDayTwoRate(category);
  const alreadyPaid = paymentChoice === "already_paid";
  const dates = attendance === "both" ? [EBBC2026.dates.start, EBBC2026.dates.end] : [attendance];
  const onsitePrice = getEBBCOrderPricing(dates.map(eventDate => ({ eventDate, category }))).totalAmountKes;

  async function checkInFromResult(row: RegistrationRow) {
    if (onsiteLock.current) return;
    onsiteLock.current = true;
    setOnsiteBusy(true);
    setCheckInNotice(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Sign in again to check in an attendee.");
      const response = await fetch("/api/ebbc2026/scanner/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ticketId: row.ticketId, gateName: "Main Entrance" }),
      });
      const result = await response.json();
      setCheckInNotice({ orderId: row.orderId, message: result.message || "Check-in could not be completed." });
      if (result.scanResult === "accepted" || result.scanResult === "already_used") {
        setRegistrations(current => current.map(ticket =>
          ticket.ticketId === row.ticketId ? { ...ticket, checkInStatus: "checked_in" } : ticket
        ));
        await loadDashboard();
      }
    } catch (error) {
      setCheckInNotice({ orderId: row.orderId, message: error instanceof Error ? error.message : "Check-in could not be completed." });
    } finally {
      onsiteLock.current = false;
      setOnsiteBusy(false);
    }
  }

  async function addAttendee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onsiteLock.current || verifyState === "loading" || !attendance || !category) return;
    if (dayTwoOnly && attendance !== EBBC2026.dates.end) return;
    onsiteLock.current = true;
    setOnsiteBusy(true);
    setOnsiteNotice("");
    const fields = new FormData(event.currentTarget);
    const fullName = String(fields.get("fullName") || "").trim();
    const phone = String(fields.get("phone") || "").trim();
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Sign in again to add an attendee.");
      const response = await fetch("/api/ebbc2026/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          staffBooking: true,
          buyerFullName: fullName,
          buyerPhone: phone,
          country: "Kenya",
          attendees: dates.map(eventDate => ({ fullName, phone, category, eventDate })),
        }),
      });
      const result = await response.json();
      const reference = result.order?.orderNumber;
      if (!response.ok || !reference) throw new Error(result.message || "Could not add attendee.");
      setSearch(reference);
      setPaymentFilter("all");
      setAddingAttendee(false);
      setAttendance("");
      setCategory("");
      setPaymentChoice(defaultPaymentChoice);
      setOnsiteNotice(alreadyPaid
        ? `Added ${fullName}. Verify their existing Paybill payment against booking ${reference}.`
        : `Saved booking ${reference} for ${fullName}. Use Verify payment once the payment appears in the Paybill records.`);
      await loadDashboard();
      if (alreadyPaid) startPaymentVerification(reference);
    } catch (error) {
      setOnsiteNotice(error instanceof Error ? error.message : "Could not add attendee.");
    } finally {
      onsiteLock.current = false;
      setOnsiteBusy(false);
    }
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

  useEffect(() => {
    if (!detailsOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setDetailsOpen(
          false,
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [detailsOpen]);

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

    setDetailsOpen(
      false,
    );

    setDetails(null);
    setDetailsError("");
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

  async function openDetails(
    orderId: string,
  ) {
    setDetailsOpen(
      true,
    );

    setDetailsLoading(
      true,
    );

    setDetailsError("");
    setDetails(null);

    try {
      const accessToken =
        await getAccessToken();

      if (!accessToken) {
        setDetailsOpen(
          false,
        );

        setAuthState(
          "signed_out",
        );

        return;
      }

      const response =
        await fetch(
          `/api/ebbc2026/manual-payment/details?orderId=${encodeURIComponent(
            orderId,
          )}`,
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
          DetailsResponse;

      if (
        response.status ===
        401
      ) {
        const supabase =
          getSupabaseBrowserClient();

        await supabase.auth
          .signOut();

        setDetailsOpen(
          false,
        );

        setAuthState(
          "signed_out",
        );

        return;
      }

      if (
        !response.ok ||
        !data.ok ||
        !data.order
      ) {
        setDetailsError(
          data.message ||
            "The registration details could not be loaded.",
        );

        return;
      }

      setDetails(data);
    } catch (error) {
      console.error(
        "EBBC2026 registration details loading error:",
        error,
      );

      setDetailsError(
        "The registration details could not be loaded.",
      );
    } finally {
      setDetailsLoading(
        false,
      );
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
                  ...(row.paymentReferences ?? []),
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

  const bookings = useMemo(() => {
    const groups = new Map<string, RegistrationRow[]>();
    for (const row of filteredRows) {
      const tickets = groups.get(row.orderId);
      if (tickets) tickets.push(row);
      else groups.set(row.orderId, [row]);
    }
    return Array.from(groups.values());
  }, [filteredRows]);

  const attendanceByDay = useMemo(() => attendanceOptions.slice(0, 2).map(day => {
    const tickets = registrations.filter(row => row.eventDate === day.value && row.ticketId);
    return {
      ...day,
      total: tickets.length,
      paid: tickets.filter(row => row.paymentState === "paid").length,
      checkedIn: tickets.filter(row => row.checkInStatus === "checked_in").length,
    };
  }), [registrations]);

  function startPaymentVerification(reference: string) {
    setOrderNumber(reference);
    setMpesaCode("");
    setAmount("");
    setVerifyState("idle");
    setResult(null);
    document.getElementById("payment-verification")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("mpesa-code")?.focus({ preventScroll: true });
  }

  function handleExportCsv() {
    if (
      filteredRows.length ===
      0
    ) {
      return;
    }

    /*
     * One CSV row per ORDER rather than per ticket.
     * This prevents order money being duplicated
     * when one order contains multiple attendees.
     */
    const orders =
      new Map<
        string,
        {
          first:
            RegistrationRow;
          rows:
            RegistrationRow[];
        }
      >();

    for (
      const row
      of filteredRows
    ) {
      const existing =
        orders.get(
          row.orderId,
        );

      if (existing) {
        existing.rows.push(
          row,
        );
      } else {
        orders.set(
          row.orderId,
          {
            first: row,
            rows: [row],
          },
        );
      }
    }

    const headers = [
      "Order Number",
      "Registration Date",
      "Buyer Name",
      "Buyer Phone",
      "Buyer Email",
      "Buyer Organisation",
      "Buyer Country",
      "Payment Status",
      "Order Total KES",
      "Total Paid KES",
      "Balance KES",
      "Payment Method",
      "Payment Count",
      "Last Payment Reference",
      "Last Payment Date",
      "Ticket Count",
      "Ticket Numbers",
      "Attendee Names",
      "Event Days",
      "Participant Categories",
      "QR Status",
      "Check-In Status",
      "Last Check-In",
      "Last Check-In Gate",
    ];

    const csvRows =
      Array.from(
        orders.values(),
      ).map(
        ({
          first,
          rows,
        }) => {
          const unique =
            (
              values: Array<
                string | null
              >,
            ) =>
              Array.from(
                new Set(
                  values.filter(
                    (
                      value,
                    ): value is string =>
                      Boolean(value),
                  ),
                ),
              ).join(" | ");

          const qrStatus =
            unique(
              rows.map(
                (row) =>
                  row.qrStatus,
              ),
            );

          const checkInStatus =
            unique(
              rows.map(
                (row) =>
                  row.checkInStatus ===
                  "checked_in"
                    ? "Checked In"
                    : "Not Checked In",
              ),
            );

          const attendeeNames =
            unique(
              rows.map(
                (row) =>
                  row.attendeeFullName,
              ),
            );

          const ticketNumbers =
            unique(
              rows.map(
                (row) =>
                  row.ticketNumber,
              ),
            );

          const eventDays =
            unique(
              rows.map(
                (row) =>
                  formatEventDate(
                    row.eventDate,
                  ),
              ),
            );

          const categories =
            unique(
              rows.map(
                (row) =>
                  row.participantCategory,
              ),
            );

          return [
            first.orderNumber,
            formatDateTime(
              first.orderCreatedAt,
            ),
            first.buyerFullName,
            `‌${first.buyerPhone}`,
            first.buyerEmail,
            first.buyerOrganisation,
            first.buyerCountry,
            first.paymentState.toUpperCase(),
            first.totalAmountKes,
            first.amountPaidKes,
            first.balanceKes,
            first.paymentMethod,
            first.paymentCount,
            first.lastPaymentReference,
            formatDateTime(
              first.lastPaymentAt,
            ),
            rows.length,
            ticketNumbers,
            attendeeNames,
            eventDays,
            categories,
            qrStatus,
            checkInStatus,
            formatDateTime(
              first.lastCheckInAt,
            ),
            first.lastCheckInGate,
          ];
        },
      );

    const csv =
      [
        headers
          .map(csvCell)
          .join(","),

        ...csvRows.map(
          (row) =>
            row
              .map(csvCell)
              .join(","),
        ),
      ].join("\r\n");

    const blob =
      new Blob(
        [
          "\uFEFF",
          csv,
        ],
        {
          type:
            "text/csv;charset=utf-8",
        },
      );

    const downloadUrl =
      URL.createObjectURL(
        blob,
      );

    const link =
      document.createElement(
        "a",
      );

    const dateStamp =
      new Date()
        .toLocaleDateString(
          "en-CA",
          {
            timeZone:
              "Africa/Nairobi",
          },
        )
        .replace(
          /\//g,
          "-",
        );

    link.href =
      downloadUrl;

    link.download =
      `EBBC2026-registrations-${dateStamp}.csv`;

    document.body.appendChild(
      link,
    );

    link.click();

    document.body.removeChild(
      link,
    );

    URL.revokeObjectURL(
      downloadUrl,
    );
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
    <>
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
                onClick={
                  handleExportCsv
                }
                disabled={
                  filteredRows.length ===
                  0
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#0D1D34]/10 bg-white px-5 text-xs font-black shadow-sm transition hover:border-[#CC8591] hover:text-[#CC8591] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download className="h-4 w-4" />
                Export CSV
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

          <section aria-labelledby="overview-heading" aria-busy={dashboardLoading}
            className="mt-8 rounded-[30px] border border-[#26364E] bg-[#101C30] bg-[radial-gradient(ellipse_at_top_right,#3C3047,transparent_55%)] p-5 text-white shadow-[0_24px_60px_rgba(13,29,52,0.22)] sm:p-8">
            <div className="relative isolate flex min-h-44 flex-col justify-end overflow-hidden rounded-2xl border border-white/15 bg-[#141F35] p-5 sm:min-h-52 sm:justify-center sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[url('/ebbc2026/admin-beauty-overview.webp')] bg-cover bg-[position:80%_44%] sm:bg-[position:center_44%]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,#101C30_0%,#101C30C9_38%,#101C3033_100%)] sm:bg-[linear-gradient(90deg,#101C30_0%,#101C30ED_26%,#101C30A6_45%,#101C301A_82%)]" />
              <h2 id="overview-heading" className="text-3xl font-black tracking-tight sm:text-4xl">Event overview</h2>
              <nav aria-label="Dashboard shortcuts" className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                <a className="rounded-full bg-[#F0B6C2] px-4 py-2 text-[#151C30] hover:bg-[#FFD1DA]" href="#registration-records">Find a booking</a>
                <a className="rounded-full border border-white/35 bg-[#101C30]/80 px-4 py-2 hover:bg-[#26364E]" href="#payment-verification">Verify Paybill payment</a>
              </nav>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
              {[
                { label: "Bookings", value: summary.totalOrders, detail: `${summary.totalTickets} tickets`, icon: Users },
                { label: "Money received", value: `KES ${formatMoney(summary.receivedKes)}`, detail: `${summary.paidOrders} fully paid`, icon: CreditCard },
                { label: "Outstanding", value: `KES ${formatMoney(summary.outstandingKes)}`, detail: `${summary.partialOrders} partial · ${summary.unpaidOrders} unpaid`, icon: WalletCards },
                { label: "Checked in", value: summary.checkedInTickets, detail: `${summary.activeTickets} active tickets`, icon: TicketCheck },
              ].map(({ label, value, detail, icon: Icon }) => (
                <div key={label} className="min-w-0 rounded-2xl border border-white/15 bg-white/5 p-3 transition-colors hover:bg-white/10 sm:p-5">
                  <div className="flex items-center justify-between gap-1 text-xs font-semibold text-slate-200">
                    {label}<Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-[#F0B6C2]" />
                  </div>
                  <p className="mt-3 break-words text-lg font-black tracking-tight tabular-nums sm:text-2xl">{value}</p>
                  <p className="mt-1 text-xs text-slate-300">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-white/15 bg-[#10192A]/70 p-4 sm:p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold"><CalendarDays aria-hidden="true" className="h-4 w-4 text-[#F0B6C2]" /> Attendance by day</h3>
              <div className="mt-4 grid gap-5 md:grid-cols-2 md:gap-8">
                {attendanceByDay.map(day => (
                  <div key={day.value}>
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-1 text-xs">
                      <span className="font-bold">{day.label}</span>
                      <span className="text-slate-300">{day.total} tickets</span>
                    </div>
                    <div aria-hidden="true" className="h-2.5 overflow-hidden rounded-full bg-white/15">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#B775A4] to-[#F0B6C2] motion-safe:transition-[width] motion-safe:duration-500" style={{ width: `${day.total ? day.paid / day.total * 100 : 0}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-slate-300">{day.paid} tickets on paid bookings · {day.checkedIn} checked in</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

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

          <section className="mt-6 overflow-hidden rounded-3xl border border-[#0D1D34]/10 bg-white shadow-sm" aria-labelledby="onsite-heading">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0D1D34] px-5 py-5 text-white sm:px-7">
              <div>
                <h2 id="onsite-heading" className="text-xl font-bold">{addingAttendee ? "Add attendee" : "On-site attendance"}</h2>
                {!addingAttendee && <p className="mt-1 text-sm text-white/75">Search existing bookings below or add an attendee.</p>}
              </div>
              <button type="button" disabled={onsiteBusy} aria-expanded={addingAttendee} aria-controls={addingAttendee ? "onsite-form" : undefined}
                onClick={() => { setAddingAttendee(!addingAttendee); setOnsiteNotice(""); }}
                className="min-h-11 rounded-full border border-white/25 bg-white/10 px-5 text-sm font-bold text-white hover:bg-white/20 disabled:opacity-50">
                {addingAttendee ? "Close form" : "Add attendee"}
              </button>
            </div>
            {onsiteNotice && <p role="status" className="mx-5 mt-4 rounded-xl bg-[#F7F5F5] p-3 text-sm font-semibold">{onsiteNotice}</p>}
            {addingAttendee && (
              <form id="onsite-form" onSubmit={addAttendee} className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_280px] sm:p-7">
                <fieldset disabled={onsiteBusy} className="min-w-0 space-y-5">
                  <legend className="sr-only">Attendee details</legend>
                  <div className="grid gap-4 sm:grid-cols-2 [&_input]:mt-2 [&_input]:min-h-12 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-[#0D1D34]/20 [&_input]:bg-[#F7F5F5] [&_input]:px-3 [&_input]:font-normal">
                    <label className="text-sm font-semibold">Full name<input name="fullName" autoComplete="name" placeholder="Enter full name" required minLength={2} /></label>
                    <label className="text-sm font-semibold">Booking phone<input name="phone" type="tel" autoComplete="tel" placeholder="e.g. 0712 345 678" required /></label>
                  </div>
                  <label className="block text-sm font-semibold">Participant category
                    <select required value={category} onChange={event => {
                      const nextCategory = event.target.value;
                      setCategory(nextCategory);
                      if (usesDayTwoRate(nextCategory)) setAttendance(EBBC2026.dates.end);
                      else if (!nextCategory || dayTwoOnly) setAttendance("");
                    }} className="mt-2 min-h-12 w-full rounded-xl border border-[#0D1D34]/20 bg-[#F7F5F5] px-3 font-normal">
                      <option value="">Choose category</option>
                      {staffParticipantCategories.map(item => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <fieldset disabled={!category}>
                    <legend className="text-sm font-semibold">Attendance dates</legend>
                    {!category && <p className="mt-1 text-xs text-slate-600">Choose a participant category to select dates.</p>}
                    {dayTwoOnly && <p className="mt-1 text-xs text-slate-600">This category attends Day 2 only.</p>}
                    <div className={`mt-2 grid gap-2 ${dayTwoOnly ? "" : "sm:grid-cols-3"}`}>
                      {attendanceOptions.filter(option => !dayTwoOnly || option.value === EBBC2026.dates.end).map(option => (
                        <label key={option.value} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-[#0D1D34]/15 px-3 py-2 text-sm font-medium has-[:checked]:border-[#A65D6A] has-[:checked]:bg-[#FAEEF0] has-[:disabled]:cursor-default has-[:disabled]:opacity-50">
                          <input type="radio" name="attendance" required value={option.value} checked={attendance === option.value} onChange={() => setAttendance(option.value)} className="size-4 shrink-0 accent-[#0D1D34]" />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-sm font-semibold">Payment</legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {[["paying_now", "Paying now"], ["already_paid", "Already paid via Paybill"]].map(([value, label]) => (
                        <label key={value} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-[#0D1D34]/15 px-3 py-2 text-sm font-medium has-[:checked]:border-[#A65D6A] has-[:checked]:bg-[#FAEEF0]">
                          <input type="radio" name="paymentChoice" value={value} checked={paymentChoice === value} onChange={() => setPaymentChoice(value)} className="size-4 shrink-0 accent-[#0D1D34]" />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </fieldset>
                <aside className="self-start rounded-2xl border border-[#0D1D34]/10 bg-[#F7F5F5] p-5">
                  <div aria-live="polite">
                    <p className="text-sm font-semibold">Booking total</p>
                    <p className="mt-2 text-3xl font-bold tabular-nums">{attendance && category ? `KES ${formatMoney(onsitePrice)}` : "—"}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#0D1D34]/75">
                    {alreadyPaid ? "Have the original M-Pesa code ready to verify." : "Save the booking, then verify once the payment appears in the Paybill records."}
                  </p>
                  <button type="submit" disabled={onsiteBusy || verifyState === "loading" || !category || !attendance} className="mt-5 min-h-12 w-full rounded-full bg-[#0D1D34] px-4 py-3 text-sm font-bold text-white hover:bg-[#233957] disabled:opacity-50">
                    {onsiteBusy ? "Saving…" : alreadyPaid ? "Save and open verification" : "Save booking"}
                  </button>
                </aside>
              </form>
            )}
          </section>

          <section id="registration-records" className="mt-8 scroll-mt-28 overflow-hidden rounded-[28px] border border-[#0D1D34]/7 bg-[#F4F1F4] shadow-[0_20px_60px_rgba(13,29,52,0.08)]">
            <div className="flex flex-col gap-4 border-b border-white/10 bg-[#101C30] bg-[radial-gradient(ellipse_at_top_right,#40334C,transparent_70%)] p-5 text-white sm:px-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Booking activity
                </h2>

                <p className="mt-1 text-xs font-semibold text-slate-300">
                  {bookings.length} {bookings.length === 1 ? "booking" : "bookings"} shown
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
                    aria-label="Search bookings"
                    placeholder="Name, booking phone or M-Pesa code"
                    className="h-11 w-full rounded-full border border-[#0D1D34]/10 bg-white pl-11 text-[#0D1D34] pr-4 text-xs font-semibold outline-none transition focus:border-[#CC8591]"
                  />
                </div>

                <button
                  type="button"
                  onClick={
                    handleExportCsv
                  }
                  disabled={
                    filteredRows.length ===
                    0
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#F0B6C2] px-5 text-xs font-black text-[#151C30] transition hover:bg-[#FFD1DA] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="border-b border-[#E4DCE6] bg-[#F7F3F8] px-4 py-3 sm:px-6">
              <div role="group" aria-labelledby="booking-payment-status" className="flex flex-wrap items-center gap-2">
                <span id="booking-payment-status" className="w-full text-sm font-bold text-[#0D1D34] sm:mr-2 sm:w-auto">Payment status</span>
                {([
                  ["all", "All payments", summary.totalOrders],
                  ["paid", "Paid", summary.paidOrders],
                  ["partial", "Partial", summary.partialOrders],
                  ["unpaid", "Unpaid", summary.unpaidOrders],
                ] as const).map(([value, label, count]) => (
                  <button key={value} type="button" aria-pressed={paymentFilter === value} onClick={() => setPaymentFilter(value)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#542B3D] ${paymentFilter === value ? "border-[#0D1D34] bg-[#0D1D34] text-white" : "border-[#A99AAC] bg-white text-[#0D1D34] hover:border-[#A65D6A] hover:bg-[#FAEEF0]"}`}>
                    {label}
                    <span className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${paymentFilter === value ? "bg-white/20 text-white" : "bg-[#F0EAF2] text-[#542B3D]"}`}>{count}</span>
                  </button>
                ))}
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
              <table role="table" aria-label="Booking payments" className="block w-full bg-white text-left text-sm lg:table">
                <thead role="rowgroup" className="sr-only bg-[#F7F5F8] text-xs font-bold text-slate-600 lg:not-sr-only">
                  <tr role="row">
                    <th scope="col" className="px-4 py-3 sm:pl-6">Booking</th>
                    <th scope="col" className="px-3 py-3">Status</th>
                    <th scope="col" className="px-3 py-3 text-right">Received</th>
                    <th scope="col" className="px-3 py-3 text-right">Balance</th>
                    <th scope="col" className="px-3 py-3">Tickets</th>
                    <th scope="col" className="px-4 py-3 sm:pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody role="rowgroup" className="block divide-y divide-slate-200 lg:table-row-group">
                  {bookings.map(tickets => {
                    const booking = tickets[0];
                    const issuedTickets = tickets.filter(ticket => ticket.ticketId);
                    const paidTickets = booking.paymentState === "paid" ? issuedTickets : [];
                    return (
                      <tr role="row" key={booking.orderId} className="grid grid-cols-2 gap-3 px-4 py-4 transition-colors hover:bg-[#FCFAFC] sm:px-6 lg:table-row lg:p-0">
                        <th scope="row" className="col-span-2 min-w-0 break-words text-left font-normal lg:max-w-64 lg:py-4 lg:pl-6 lg:pr-3">
                          <span className="block font-black">{booking.buyerFullName}</span>
                          <span className="mt-1 block text-xs text-slate-600">{booking.orderNumber} · {formatDate(booking.orderCreatedAt)}</span>
                          {booking.buyerPhone && <span className="mt-0.5 block text-xs text-slate-600">{booking.buyerPhone}</span>}
                          {booking.lastPaymentReference && <span className="mt-0.5 block break-all text-xs text-slate-600">Ref. {booking.lastPaymentReference}</span>}
                        </th>
                        <td role="cell" className="col-span-2 lg:px-3 lg:py-4"><PaymentBadge state={booking.paymentState} /></td>
                        <td role="cell" className="tabular-nums lg:px-3 lg:py-4 lg:text-right">
                          <span aria-hidden="true" className="block text-xs text-slate-600 lg:hidden">Received</span>
                          <span className="whitespace-nowrap font-bold text-emerald-800">KES {formatMoney(booking.amountPaidKes)}</span>
                        </td>
                        <td role="cell" className="tabular-nums lg:px-3 lg:py-4 lg:text-right">
                          <span aria-hidden="true" className="block text-xs text-slate-600 lg:hidden">Balance</span>
                          <span className={`whitespace-nowrap font-bold ${booking.balanceKes > 0 ? "text-amber-800" : "text-slate-600"}`}>KES {formatMoney(booking.balanceKes)}</span>
                        </td>
                        <td role="cell" className="col-span-2 lg:max-w-64 lg:px-3 lg:py-4">
                          {issuedTickets.length ? (
                            <details className="group">
                              <summary className="flex min-h-9 w-fit cursor-pointer list-none items-center gap-1.5 rounded-lg bg-[#F5F1F6] px-2.5 text-xs font-bold text-[#542B3D] hover:bg-[#F6DFE5] [&::-webkit-details-marker]:hidden">
                                <TicketCheck aria-hidden="true" className="h-3.5 w-3.5" />
                                {issuedTickets.length} {issuedTickets.length === 1 ? "ticket" : "tickets"}
                                <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 group-open:rotate-180" />
                              </summary>
                              <ul className="mt-2 space-y-2">
                                {issuedTickets.map(ticket => (
                                  <li key={ticket.ticketId} className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs">
                                    <p className="font-bold">{ticket.attendeeFullName}</p>
                                    <p className="mt-1 text-slate-600">{formatEventDate(ticket.eventDate)} · {ticket.ticketNumber}</p>
                                    {ticket.participantCategory && <p className="mt-0.5 text-slate-600">{ticket.participantCategory}</p>}
                                    <div className="mt-1 flex flex-wrap items-center gap-1">
                                      <CheckInBadge status={ticket.checkInStatus} />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : <span className="text-xs text-slate-600">No tickets</span>}
                        </td>
                        <td role="cell" className="col-span-2 lg:py-4 lg:pl-3 lg:pr-6">
                          <div className="flex flex-wrap gap-2 lg:min-w-36">
                            {booking.paymentState !== "paid" && (
                              <button type="button" disabled={verifyState === "loading" || onsiteBusy} onClick={() => startPaymentVerification(booking.orderNumber)}
                                className="min-h-9 rounded-lg bg-[#F6DFE5] px-3 text-xs font-bold text-[#542B3D] hover:bg-[#F0B6C2] disabled:opacity-50">
                                Verify payment
                              </button>
                            )}
                            <button type="button" onClick={() => void openDetails(booking.orderId)}
                              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-bold hover:border-[#CC8591]">
                              <Eye aria-hidden="true" className="h-4 w-4" /> View booking
                            </button>
                          </div>
                          {paidTickets.length > 0 && (
                            <ul className="mt-2 grid gap-2">
                              {paidTickets.map(ticket => {
                                const showName = paidTickets.length > 1 || ticket.attendeeFullName !== booking.buyerFullName;
                                const opening = getEBBCCheckInOpening(ticket.eventDate);
                                const canCheckIn = ticket.eventDate === eventDay && opening !== null && checkInTime >= opening.timestamp;
                                const dateLabel = formatEventDate(ticket.eventDate);
                                return (
                                  <li key={ticket.ticketId} className="flex flex-wrap items-center gap-2">
                                    {ticket.checkInStatus === "checked_in" ? (
                                      <>
                                        <CheckInBadge status={ticket.checkInStatus} />
                                        {showName && <span className="text-xs font-semibold">{ticket.attendeeFullName}</span>}
                                      </>
                                    ) : (
                                      <div>
                                        <button type="button" disabled={onsiteBusy || !canCheckIn} onClick={() => void checkInFromResult(ticket)}
                                          aria-label={`Check in ${ticket.attendeeFullName} · ${dateLabel} (${ticket.ticketNumber})`}
                                          className="min-h-11 rounded-lg border border-transparent bg-[#0D1D34] px-3 text-xs font-bold text-white hover:bg-[#26364E] disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-600">
                                          {showName ? `Check in · ${ticket.attendeeFullName}` : "Check in"}
                                        </button>
                                        {(!canCheckIn || paidTickets.length > 1) && (
                                          <p className="mt-1 text-xs text-slate-600">
                                            {canCheckIn ? dateLabel : opening && checkInTime < opening.timestamp
                                              ? `Check-in opens ${dateLabel} at ${opening.label} Kenya time`
                                              : `Check-in closed · ${dateLabel}`}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                          {checkInNotice?.orderId === booking.orderId && (
                            <p role="status" className="mt-2 max-w-56 text-xs font-semibold text-slate-700">{checkInNotice.message}</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>

          <section id="payment-verification" className="mt-8 scroll-mt-28 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
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
                          <DetailValue
                            label="Order"
                            value={
                              result.orderNumber
                            }
                          />

                          <DetailValue
                            label="Customer"
                            value={
                              result.buyerName
                            }
                          />

                          <DetailValue
                            label="This Payment"
                            value={`KES ${formatMoney(
                              result.paymentAmountKes,
                            )}`}
                          />

                          <DetailValue
                            label="Total Paid"
                            value={`KES ${formatMoney(
                              result.totalPaidKes,
                            )}`}
                          />

                          <DetailValue
                            label="Balance"
                            value={`KES ${formatMoney(
                              result.balanceKes,
                            )}`}
                          />

                          <DetailValue
                            label="QR"
                            value={
                              result.ticketActivated
                                ? "ACTIVE"
                                : "LOCKED"
                            }
                          />
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

      {detailsOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-[#07111F]/70 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label="EBBC2026 registration details"
          onMouseDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setDetailsOpen(
                false,
              );
            }
          }}
        >
          <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-[30px] bg-[#F7F5F5] shadow-[0_35px_120px_rgba(0,0,0,0.35)] sm:max-w-[1050px] sm:rounded-[30px]">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#0D1D34]/8 bg-white/95 px-5 py-5 backdrop-blur-md sm:px-7">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CC8591]">
                  Registration Details
                </p>

                <h2 className="mt-2 text-xl font-black sm:text-2xl">
                  {details?.order
                    ?.orderNumber ||
                    "EBBC2026 Order"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDetailsOpen(
                    false,
                  )
                }
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#0D1D34]/10 bg-[#F7F5F5] transition hover:bg-[#0D1D34] hover:text-white"
                aria-label="Close registration details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {detailsLoading ? (
              <div className="grid min-h-[420px] place-items-center p-8">
                <div className="text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#CC8591]" />

                  <p className="mt-4 text-sm font-black">
                    Loading full registration...
                  </p>
                </div>
              </div>
            ) : detailsError ? (
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-3 rounded-[22px] border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  {detailsError}
                </div>
              </div>
            ) : details?.order ? (
              <div className="space-y-6 p-5 sm:p-7">
                <section className="rounded-[26px] border border-[#0D1D34]/7 bg-white p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#0D1D34]/35">
                        Customer
                      </p>

                      <h3 className="mt-2 text-xl font-black">
                        {
                          details.order
                            .buyerFullName
                        }
                      </h3>

                      <p className="mt-2 break-all text-xs font-semibold text-[#0D1D34]/50">
                        {
                          details.order
                            .buyerEmail
                        }
                      </p>

                      <p className="mt-1 text-xs font-semibold text-[#0D1D34]/50">
                        {
                          details.order
                            .buyerPhone
                        }
                      </p>
                    </div>

                    <PaymentBadge
                      state={
                        details.order
                          .paymentState
                      }
                    />
                  </div>

                  <div className="mt-6 grid gap-5 border-t border-[#0D1D34]/7 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                    <DetailValue
                      label="Organisation"
                      value={
                        details.order
                          .buyerOrganisation
                      }
                    />

                    <DetailValue
                      label="Country"
                      value={
                        details.order
                          .buyerCountry
                      }
                    />

                    <DetailValue
                      label="Registered"
                      value={formatDateTime(
                        details.order
                          .createdAt,
                      )}
                    />

                    <DetailValue
                      label="Paid At"
                      value={formatDateTime(
                        details.order
                          .paidAt,
                      )}
                    />
                  </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[22px] bg-[#0D1D34] p-5 text-white">
                    <div className="text-[9px] font-black uppercase tracking-[0.13em] text-white/45">
                      Order Total
                    </div>

                    <div className="mt-2 text-2xl font-black">
                      KES{" "}
                      {formatMoney(
                        details.order
                          .totalAmountKes,
                      )}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-5">
                    <div className="text-[9px] font-black uppercase tracking-[0.13em] text-emerald-700/60">
                      Total Paid
                    </div>

                    <div className="mt-2 text-2xl font-black text-emerald-800">
                      KES{" "}
                      {formatMoney(
                        details.order
                          .totalPaidKes,
                      )}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-5">
                    <div className="text-[9px] font-black uppercase tracking-[0.13em] text-amber-700/60">
                      Balance
                    </div>

                    <div className="mt-2 text-2xl font-black text-amber-800">
                      KES{" "}
                      {formatMoney(
                        details.order
                          .balanceKes,
                      )}
                    </div>
                  </div>
                </section>

                <section className="rounded-[26px] border border-[#0D1D34]/7 bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CC8591]">
                        Payment History
                      </p>

                      <h3 className="mt-2 text-lg font-black">
                        {
                          details.payments
                            ?.length || 0
                        }{" "}
                        payment
                        {(details.payments
                          ?.length ||
                          0) === 1
                          ? ""
                          : "s"}
                      </h3>
                    </div>

                    <WalletCards className="h-5 w-5 text-[#CC8591]" />
                  </div>

                  {!details.payments ||
                  details.payments
                    .length === 0 ? (
                    <div className="mt-5 rounded-2xl bg-[#F7F5F5] p-5 text-xs font-semibold text-[#0D1D34]/45">
                      No successful payments
                      recorded for this order.
                    </div>
                  ) : (
                    <div className="mt-5 space-y-3">
                      {details.payments.map(
                        (
                          payment,
                          index,
                        ) => (
                          <div
                            key={
                              payment.id
                            }
                            className="rounded-[20px] border border-[#0D1D34]/7 bg-[#FAFAFA] p-4"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#0D1D34]/35">
                                  Payment{" "}
                                  {index +
                                    1}
                                </p>

                                <p className="mt-1 text-lg font-black text-emerald-700">
                                  KES{" "}
                                  {formatMoney(
                                    payment.amountKes,
                                  )}
                                </p>
                              </div>

                              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black">
                                {
                                  payment.paymentMethod
                                }
                              </span>
                            </div>

                            <div className="mt-4 grid gap-4 border-t border-[#0D1D34]/7 pt-4 sm:grid-cols-2 lg:grid-cols-4">
                              <DetailValue
                                label="Reference"
                                value={
                                  payment.transactionReference
                                }
                              />

                              <DetailValue
                                label="Provider ID"
                                value={
                                  payment.providerTransactionId
                                }
                              />

                              <DetailValue
                                label="Paid"
                                value={formatDateTime(
                                  payment.paidAt,
                                )}
                              />

                              <DetailValue
                                label="Verified"
                                value={formatDateTime(
                                  payment.verifiedAt,
                                )}
                              />
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </section>

                <section className="rounded-[26px] border border-[#0D1D34]/7 bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CC8591]">
                        Tickets & Event Access
                      </p>

                      <h3 className="mt-2 text-lg font-black">
                        {
                          details.tickets
                            ?.length || 0
                        }{" "}
                        ticket
                        {(details.tickets
                          ?.length ||
                          0) === 1
                          ? ""
                          : "s"}
                      </h3>
                    </div>

                    <TicketCheck className="h-5 w-5 text-[#CC8591]" />
                  </div>

                  <div className="mt-5 space-y-4">
                    {details.tickets?.map(
                      (ticket) => (
                        <div
                          key={
                            ticket.id
                          }
                          className="rounded-[22px] border border-[#0D1D34]/7 bg-[#FAFAFA] p-5"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-[0.08em] text-[#CC8591]">
                                {
                                  ticket.ticketNumber
                                }
                              </p>

                              <h4 className="mt-2 text-base font-black">
                                {
                                  ticket.attendeeFullName
                                }
                              </h4>

                              <p className="mt-1 text-xs font-semibold text-[#0D1D34]/45">
                                {
                                  ticket.participantCategory ||
                                  "Participant"
                                }
                              </p>
                            </div>

                            <QrBadge
                              status={
                                ticket.qrStatus
                              }
                            />
                          </div>

                          <div className="mt-5 grid gap-4 border-t border-[#0D1D34]/7 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                            <DetailValue
                              label="Event Day"
                              value={formatEventDate(
                                ticket.eventDate,
                              )}
                            />

                            <DetailValue
                              label="Email"
                              value={
                                ticket.attendeeEmail
                              }
                            />

                            <DetailValue
                              label="Phone"
                              value={
                                ticket.attendeePhone
                              }
                            />

                            <DetailValue
                              label="Check-Ins"
                              value={
                                ticket.checkInCount
                              }
                            />
                          </div>

                          {ticket.checkIns
                            .length >
                          0 ? (
                            <div className="mt-5">
                              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#0D1D34]/35">
                                Check-In
                                History
                              </p>

                              <div className="mt-3 space-y-2">
                                {ticket.checkIns.map(
                                  (
                                    checkIn,
                                  ) => (
                                    <div
                                      key={
                                        checkIn.id
                                      }
                                      className="flex flex-col gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between"
                                    >
                                      <div className="font-black text-blue-800">
                                        {checkIn.scanResult ||
                                          "scan"}
                                      </div>

                                      <div className="text-blue-700/70">
                                        {formatDateTime(
                                          checkIn.scannedAt,
                                        )}

                                        {checkIn.gateName
                                          ? ` · ${checkIn.gateName}`
                                          : ""}
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="mt-5 rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-[#0D1D34]/40">
                              No event
                              check-in
                              recorded yet.
                            </div>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </section>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}