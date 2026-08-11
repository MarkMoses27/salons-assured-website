"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type PageState =
  | "checking"
  | "ready"
  | "saving"
  | "success"
  | "error";

export default function EbbcScannerResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [state, setState] =
    useState<PageState>("checking");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function verifyRecoveryLink() {
      try {
        const params =
          new URLSearchParams(
            window.location.search,
          );

        const tokenHash =
          params.get("token_hash");

        const type =
          params.get("type");

        if (
          !tokenHash ||
          type !== "recovery"
        ) {
          if (!cancelled) {
            setState("error");

            setMessage(
              "This password reset link is invalid. Request a new reset email.",
            );
          }

          return;
        }

        const supabase =
          getSupabaseBrowserClient();

        /*
         * Remove any previous scanner
         * session before establishing
         * the recovery session.
         */
        await supabase.auth.signOut();

        const {
          data,
          error,
        } =
          await supabase.auth.verifyOtp({
            token_hash:
              tokenHash,

            type:
              "recovery",
          });

        if (
          error ||
          !data.session
        ) {
          console.error(
            "EBBC2026 recovery token verification error:",
            error,
          );

          if (!cancelled) {
            setState("error");

            setMessage(
              "This password reset link is invalid or has expired. Request a new reset email.",
            );
          }

          return;
        }

        /*
         * Remove the recovery token from
         * the visible browser URL after
         * successful verification.
         */
        window.history.replaceState(
          {},
          document.title,
          "/ebbc2026/scanner/reset-password",
        );

        if (!cancelled) {
          setState("ready");
          setMessage("");
        }
      } catch (error) {
        console.error(
          "EBBC2026 recovery verification error:",
          error,
        );

        if (!cancelled) {
          setState("error");

          setMessage(
            "The password reset link could not be verified.",
          );
        }
      }
    }

    void verifyRecoveryLink();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      state !== "ready"
    ) {
      return;
    }

    if (
      password.length < 12
    ) {
      setMessage(
        "Use a password with at least 12 characters.",
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setMessage(
        "The passwords do not match.",
      );

      return;
    }

    setState("saving");
    setMessage("");

    try {
      const supabase =
        getSupabaseBrowserClient();

      const {
        data: sessionData,
      } =
        await supabase.auth.getSession();

      if (
        !sessionData.session
      ) {
        setState("error");

        setMessage(
          "Your password reset session has expired. Request a new reset email.",
        );

        return;
      }

      const {
        error,
      } =
        await supabase.auth.updateUser(
          {
            password,
          },
        );

      if (error) {
        console.error(
          "EBBC2026 password update error:",
          error,
        );

        setState("ready");

        setMessage(
          error.message ||
            "The password could not be updated.",
        );

        return;
      }

      /*
       * Sign out the temporary recovery
       * session after the password has
       * successfully changed.
       */
      await supabase.auth.signOut();

      setPassword("");
      setConfirmPassword("");

      setState("success");

      setMessage(
        "Your scanner password has been changed successfully.",
      );

      window.setTimeout(() => {
        router.replace(
          "/ebbc2026/scanner/login",
        );
      }, 1800);
    } catch (error) {
      console.error(
        "EBBC2026 password reset error:",
        error,
      );

      setState("ready");

      setMessage(
        "The password could not be updated. Please try again.",
      );
    }
  }

  const isSaving =
    state === "saving";

  return (
    <main className="min-h-screen bg-[#F6F4F4] px-5 pb-16 pt-28 text-[#0D1D34] sm:px-8">
      <section className="mx-auto max-w-[520px]">
        <Link
          href="/ebbc2026/scanner/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0D1D34]/45 transition hover:text-[#CC8591]"
        >
          <ArrowLeft className="h-4 w-4" />
          Staff Sign In
        </Link>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-[#0D1D34]/8 bg-white shadow-[0_28px_80px_rgba(13,29,52,0.10)]">
          <div className="bg-[#0D1D34] px-7 py-8 text-white sm:px-9">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#CC8591]/15 text-[#CC8591]">
              <KeyRound className="h-5 w-5" />
            </div>

            <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#CC8591]">
              EBBC2026
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">
              Reset password
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Create a new password for your
              scanner account.
            </p>
          </div>

          <div className="p-7 sm:p-9">
            {state ===
            "checking" ? (
              <div className="py-12 text-center">
                <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#CC8591]" />

                <p className="mt-4 text-xs font-bold text-[#0D1D34]/45">
                  Verifying secure reset link...
                </p>
              </div>
            ) : state ===
              "success" ? (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-xl font-black">
                  Password updated
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#0D1D34]/50">
                  Your scanner password has
                  been changed successfully.
                </p>

                <p className="mt-5 text-xs font-bold text-[#0D1D34]/35">
                  Returning to staff sign in...
                </p>
              </div>
            ) : state ===
              "error" ? (
              <div className="py-8 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-600">
                  <TriangleAlert className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-xl font-black">
                  Reset link unavailable
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#0D1D34]/50">
                  {message}
                </p>

                <Link
                  href="/ebbc2026/scanner/login"
                  className="mt-7 inline-flex h-12 items-center justify-center rounded-[14px] bg-[#0D1D34] px-6 text-xs font-extrabold text-white transition hover:bg-[#172D4B]"
                >
                  Request New Reset Link
                </Link>
              </div>
            ) : (
              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="new-password"
                    className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#0D1D34]/45"
                  >
                    New Password
                  </label>

                  <div className="relative mt-2">
                    <input
                      id="new-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      value={password}
                      disabled={
                        isSaving
                      }
                      onChange={(event) => {
                        setPassword(
                          event.target
                            .value,
                        );

                        if (message) {
                          setMessage("");
                        }
                      }}
                      placeholder="Minimum 12 characters"
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
                      className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-[10px] text-[#0D1D34]/35 transition hover:bg-[#0D1D34]/5"
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

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#0D1D34]/45"
                  >
                    Confirm Password
                  </label>

                  <div className="relative mt-2">
                    <input
                      id="confirm-password"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      value={
                        confirmPassword
                      }
                      disabled={
                        isSaving
                      }
                      onChange={(event) => {
                        setConfirmPassword(
                          event.target
                            .value,
                        );

                        if (message) {
                          setMessage("");
                        }
                      }}
                      placeholder="Repeat new password"
                      className="h-14 w-full rounded-[15px] border border-[#0D1D34]/10 bg-[#FAFAFA] px-4 pr-14 text-sm font-semibold outline-none transition placeholder:text-[#0D1D34]/25 focus:border-[#CC8591] focus:bg-white focus:ring-4 focus:ring-[#CC8591]/10 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) =>
                            !current,
                        )
                      }
                      className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-[10px] text-[#0D1D34]/35 transition hover:bg-[#0D1D34]/5"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {message ? (
                  <div className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold leading-5 text-red-800">
                    {message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={
                    isSaving
                  }
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-[15px] bg-[#0D1D34] text-sm font-extrabold text-white transition hover:bg-[#172D4B] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <KeyRound className="h-4 w-4" />
                      Set New Password
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}