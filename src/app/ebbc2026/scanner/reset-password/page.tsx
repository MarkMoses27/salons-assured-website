"use client";

import Link from "next/link";
import {
  FormEvent,
  useState,
} from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type LoginState =
  | "idle"
  | "loading"
  | "success"
  | "error";

type RecoveryState =
  | "idle"
  | "sending"
  | "sent"
  | "error";

export default function EbbcScannerLoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [status, setStatus] =
    useState<LoginState>("idle");

  const [message, setMessage] =
    useState("");

  const [
    recoveryState,
    setRecoveryState,
  ] =
    useState<RecoveryState>("idle");

  const [
    recoveryMessage,
    setRecoveryMessage,
  ] = useState("");

  async function handleLogin(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setStatus("error");

      setMessage(
        "Enter your email and password.",
      );

      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const supabase =
        getSupabaseBrowserClient();

      const {
        data,
        error,
      } =
        await supabase.auth.signInWithPassword(
          {
            email: cleanEmail,
            password,
          },
        );

      if (
        error ||
        !data.session?.access_token
      ) {
        setStatus("error");

        setMessage(
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

            cache: "no-store",
          },
        );

      const result =
        (await response.json()) as {
          ok?: boolean;
          authorized?: boolean;
          message?: string;

          staff?: {
            displayName?: string;
            role?: string;
          };
        };

      if (
        !response.ok ||
        !result.ok ||
        !result.authorized
      ) {
        await supabase.auth.signOut();

        setStatus("error");

        setMessage(
          result.message ||
            "This account is not authorized.",
        );

        return;
      }

      setStatus("success");

      setMessage(
        `Access verified. Welcome ${
          result.staff?.displayName ||
          "EBBC2026 Staff"
        }.`,
      );

      window.setTimeout(() => {
        router.replace(
          "/ebbc2026/scanner",
        );
      }, 700);
    } catch (error) {
      console.error(
        "EBBC2026 scanner login error:",
        error,
      );

      setStatus("error");

      setMessage(
        "Unable to sign in. Please try again.",
      );
    }
  }

  async function handleForgotPassword() {
    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail) {
      setRecoveryState(
        "error",
      );

      setRecoveryMessage(
        "Enter your scanner email first.",
      );

      return;
    }

    setRecoveryState(
      "sending",
    );

    setRecoveryMessage("");

    try {
      const supabase =
        getSupabaseBrowserClient();

      const redirectTo =
        `${window.location.origin}/ebbc2026/scanner/reset-password`;

      const {
        error,
      } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo,
          },
        );

      if (error) {
        setRecoveryState(
          "error",
        );

        setRecoveryMessage(
          error.message ||
            "The reset email could not be sent.",
        );

        return;
      }

      setRecoveryState(
        "sent",
      );

      setRecoveryMessage(
        "Password reset email sent. Check your inbox.",
      );
    } catch (error) {
      console.error(
        "EBBC2026 password recovery error:",
        error,
      );

      setRecoveryState(
        "error",
      );

      setRecoveryMessage(
        "The reset email could not be sent.",
      );
    }
  }

  const isLoading =
    status === "loading";

  const isSendingRecovery =
    recoveryState ===
    "sending";

  return (
    <main className="min-h-screen bg-[#F6F4F4] px-5 pb-16 pt-32 text-[#0D1D34] sm:px-8">
      <section className="mx-auto max-w-[920px]">
        <Link
          href="/ebbc2026"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0D1D34]/45 transition hover:text-[#CC8591]"
        >
          <ArrowLeft className="h-4 w-4" />
          EBBC2026
        </Link>

        <div className="mt-7 overflow-hidden rounded-[30px] border border-[#0D1D34]/8 bg-white shadow-[0_28px_80px_rgba(13,29,52,0.10)]">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-[#0D1D34] p-8 text-white sm:p-10">
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#CC8591]/15 blur-3xl" />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#CC8591]/15 text-[#CC8591]">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <p className="mt-10 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#CC8591]">
                  EBBC2026
                </p>

                <h1 className="mt-4 [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.96] tracking-[-0.04em] sm:text-[54px]">
                  Event
                  <br />
                  Check-In
                </h1>

                <p className="mt-6 max-w-xs text-[13px] leading-6 text-white/55">
                  Secure ticket verification
                  for authorized event staff.
                </p>
              </div>

              <div className="relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
                <LockKeyhole className="h-3.5 w-3.5" />
                Staff Access
              </div>
            </div>

            <div className="flex items-center px-7 py-10 sm:px-12 sm:py-14">
              <div className="mx-auto w-full max-w-[390px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#CC8591]/12 text-[#CC8591]">
                  <LogIn className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-[28px] font-black tracking-[-0.04em]">
                  Staff sign in
                </h2>

                <p className="mt-2 text-sm text-[#0D1D34]/45">
                  Use your approved scanner
                  account.
                </p>

                <form
                  onSubmit={handleLogin}
                  className="mt-8 space-y-5"
                >
                  <div>
                    <label
                      htmlFor="scanner-email"
                      className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/45"
                    >
                      Email
                    </label>

                    <input
                      id="scanner-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      disabled={
                        isLoading
                      }
                      onChange={(event) => {
                        setEmail(
                          event.target.value,
                        );

                        if (
                          recoveryState !==
                          "idle"
                        ) {
                          setRecoveryState(
                            "idle",
                          );

                          setRecoveryMessage(
                            "",
                          );
                        }
                      }}
                      placeholder="name@email.com"
                      className="mt-2 h-14 w-full rounded-[15px] border border-[#0D1D34]/10 bg-[#FAFAFA] px-4 text-sm font-semibold outline-none transition placeholder:text-[#0D1D34]/25 focus:border-[#CC8591] focus:bg-white focus:ring-4 focus:ring-[#CC8591]/10 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <label
                        htmlFor="scanner-password"
                        className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/45"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          void handleForgotPassword()
                        }
                        disabled={
                          isSendingRecovery
                        }
                        className="text-[10px] font-extrabold text-[#CC8591] transition hover:text-[#B96F7C] disabled:opacity-50"
                      >
                        {isSendingRecovery
                          ? "Sending..."
                          : "Forgot Password?"}
                      </button>
                    </div>

                    <div className="relative mt-2">
                      <input
                        id="scanner-password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="current-password"
                        value={password}
                        disabled={
                          isLoading
                        }
                        onChange={(event) =>
                          setPassword(
                            event.target.value,
                          )
                        }
                        placeholder="Enter password"
                        className="h-14 w-full rounded-[15px] border border-[#0D1D34]/10 bg-[#FAFAFA] px-4 pr-14 text-sm font-semibold outline-none transition placeholder:text-[#0D1D34]/25 focus:border-[#CC8591] focus:bg-white focus:ring-4 focus:ring-[#CC8591]/10 disabled:opacity-60"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) =>
                              !current,
                          )
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[10px] text-[#0D1D34]/35 transition hover:bg-[#0D1D34]/5 hover:text-[#0D1D34]"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {recoveryMessage ? (
                    <div
                      className={`flex items-start gap-2 rounded-[14px] border px-4 py-3 text-xs font-semibold leading-5 ${
                        recoveryState ===
                        "sent"
                          ? "border-blue-200 bg-blue-50 text-blue-800"
                          : "border-red-200 bg-red-50 text-red-800"
                      }`}
                    >
                      <Mail className="mt-0.5 h-4 w-4 shrink-0" />

                      <span>
                        {
                          recoveryMessage
                        }
                      </span>
                    </div>
                  ) : null}

                  {message ? (
                    <div
                      className={`rounded-[14px] border px-4 py-3 text-xs font-semibold ${
                        status ===
                        "success"
                          ? "border-green-200 bg-green-50 text-green-800"
                          : "border-red-200 bg-red-50 text-red-800"
                      }`}
                    >
                      {message}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      status ===
                        "success"
                    }
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-[15px] bg-[#0D1D34] text-sm font-extrabold text-white transition hover:bg-[#172D4B] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : status ===
                      "success" ? (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        Opening Scanner...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-7 text-center text-[10px] text-[#0D1D34]/30">
                  Salons Assured Kenya Ltd
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}