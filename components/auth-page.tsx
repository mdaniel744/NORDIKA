"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@base44/sdk";
import { LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { SITE } from "@/lib/site";

type Mode = "login" | "register" | "forgotPassword" | "resetPassword";
type AuthCopy = { login: string; register: string; forgot: string; email: string; password: string; confirm: string; submitLogin: string; submitRegister: string; submitForgot: string; noAccount: string; haveAccount: string; forgotLink: string; mismatch: string; verify: string; code: string; verifyButton: string; sent: string; google: string; or: string; error: string };

const copy: Record<Locale, AuthCopy> = {
  de: { login: "Anmelden", register: "Konto erstellen", forgot: "Passwort zurücksetzen", email: "E-Mail", password: "Passwort", confirm: "Passwort bestätigen", submitLogin: "Anmelden", submitRegister: "Registrieren", submitForgot: "Link senden", noAccount: "Noch kein Konto?", haveAccount: "Bereits registriert?", forgotLink: "Passwort vergessen?", mismatch: "Die Passwörter stimmen nicht überein.", verify: "E-Mail bestätigen", code: "Bestätigungscode", verifyButton: "Code bestätigen", sent: "Falls ein Konto besteht, erhalten Sie in Kürze eine E-Mail.", google: "Mit Google fortfahren", or: "oder", error: "Die Anfrage konnte nicht abgeschlossen werden." },
  en: { login: "Log in", register: "Create account", forgot: "Reset password", email: "Email", password: "Password", confirm: "Confirm password", submitLogin: "Log in", submitRegister: "Register", submitForgot: "Send link", noAccount: "No account yet?", haveAccount: "Already registered?", forgotLink: "Forgot password?", mismatch: "Passwords do not match.", verify: "Verify your email", code: "Verification code", verifyButton: "Verify code", sent: "If an account exists, you will receive an email shortly.", google: "Continue with Google", or: "or", error: "The request could not be completed." },
  nl: { login: "Inloggen", register: "Account maken", forgot: "Wachtwoord resetten", email: "E-mail", password: "Wachtwoord", confirm: "Wachtwoord bevestigen", submitLogin: "Inloggen", submitRegister: "Registreren", submitForgot: "Link verzenden", noAccount: "Nog geen account?", haveAccount: "Al geregistreerd?", forgotLink: "Wachtwoord vergeten?", mismatch: "De wachtwoorden komen niet overeen.", verify: "E-mail bevestigen", code: "Bevestigingscode", verifyButton: "Code bevestigen", sent: "Als er een account bestaat, ontvangt u binnenkort een e-mail.", google: "Doorgaan met Google", or: "of", error: "De aanvraag kon niet worden voltooid." },
  it: { login: "Accedi", register: "Crea account", forgot: "Reimposta password", email: "Email", password: "Password", confirm: "Conferma password", submitLogin: "Accedi", submitRegister: "Registrati", submitForgot: "Invia link", noAccount: "Non hai un account?", haveAccount: "Già registrato?", forgotLink: "Password dimenticata?", mismatch: "Le password non coincidono.", verify: "Verifica l'email", code: "Codice di verifica", verifyButton: "Verifica codice", sent: "Se esiste un account, riceverai presto un'email.", google: "Continua con Google", or: "oppure", error: "Impossibile completare la richiesta." },
  cs: { login: "Přihlásit se", register: "Vytvořit účet", forgot: "Obnovit heslo", email: "E-mail", password: "Heslo", confirm: "Potvrdit heslo", submitLogin: "Přihlásit se", submitRegister: "Registrovat", submitForgot: "Odeslat odkaz", noAccount: "Nemáte účet?", haveAccount: "Již jste registrováni?", forgotLink: "Zapomenuté heslo?", mismatch: "Hesla se neshodují.", verify: "Ověřit e-mail", code: "Ověřovací kód", verifyButton: "Ověřit kód", sent: "Pokud účet existuje, brzy obdržíte e-mail.", google: "Pokračovat přes Google", or: "nebo", error: "Požadavek se nepodařilo dokončit." },
  es: { login: "Iniciar sesión", register: "Crear cuenta", forgot: "Restablecer contraseña", email: "Correo electrónico", password: "Contraseña", confirm: "Confirmar contraseña", submitLogin: "Iniciar sesión", submitRegister: "Registrarse", submitForgot: "Enviar enlace", noAccount: "¿Aún no tienes cuenta?", haveAccount: "¿Ya estás registrado?", forgotLink: "¿Olvidaste la contraseña?", mismatch: "Las contraseñas no coinciden.", verify: "Verificar correo", code: "Código de verificación", verifyButton: "Verificar código", sent: "Si existe una cuenta, recibirás un correo en breve.", google: "Continuar con Google", or: "o", error: "No se pudo completar la solicitud." },
};

const base44 = createClient({ appId: SITE.appId, requiresAuth: false });

export function AuthPage({ locale, mode }: { locale: Locale; mode: Mode }) {
  const searchParams = useSearchParams();
  const labels = copy[locale];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const title = mode === "login" ? labels.login : mode === "register" ? labels.register : labels.forgot;
  const resetToken = searchParams?.get("token") || "";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    const form = new FormData(event.currentTarget); const email = String(form.get("email") || ""); const password = String(form.get("password") || "");
    try {
      if (verifyEmail) { const result = await base44.auth.verifyOtp({ email: verifyEmail, otpCode: String(form.get("code") || "") }); if (result?.access_token) base44.auth.setToken(result.access_token); window.location.href = href(locale, "home"); return; }
      if (mode === "login") { await base44.auth.loginViaEmailPassword(email, password); window.location.href = href(locale, "home"); return; }
      if (mode === "register") { if (password !== String(form.get("confirm") || "")) throw new Error(labels.mismatch); await base44.auth.register({ email, password }); setVerifyEmail(email); }
      else if (mode === "resetPassword") { if (!resetToken) throw new Error(labels.error); if (password !== String(form.get("confirm") || "")) throw new Error(labels.mismatch); await base44.auth.resetPassword({ resetToken, newPassword: password }); window.location.href = href(locale, "login"); }
      else { await base44.auth.resetPasswordRequest(email); setSent(true); }
    } catch (cause) { setError(cause instanceof Error && cause.message ? cause.message : labels.error); }
    finally { setLoading(false); }
  }
  if (sent) return <main className="grid min-h-[65vh] place-items-center bg-zinc-100 p-5"><div className="surface-card max-w-md p-8 text-center"><Mail className="mx-auto h-10 w-10 text-primary" /><h1 className="mt-5 text-3xl font-extrabold">{title}</h1><p className="mt-4 text-zinc-600">{labels.sent}</p></div></main>;
  return <main className="grid min-h-[65vh] place-items-center bg-zinc-100 p-5"><div className="surface-card w-full max-w-md p-7 sm:p-9"><LockKeyhole className="h-9 w-9 text-primary" /><h1 className="mt-5 text-3xl font-extrabold">{verifyEmail ? labels.verify : title}</h1>{error && <p role="alert" className="mt-5 bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}<form onSubmit={submit} className="mt-7 grid gap-5">{verifyEmail ? <Field name="code" label={labels.code} inputMode="numeric" required /> : mode === "resetPassword" ? <><Field name="password" label={labels.password} type="password" required /><Field name="confirm" label={labels.confirm} type="password" required /></> : <><Field name="email" label={labels.email} type="email" required />{mode !== "forgotPassword" && <Field name="password" label={labels.password} type="password" required />}{mode === "register" && <Field name="confirm" label={labels.confirm} type="password" required />}</>}<button disabled={loading} className="button-primary w-full">{loading && <LoaderCircle className="h-4 w-4 animate-spin" />}{verifyEmail ? labels.verifyButton : mode === "login" ? labels.submitLogin : mode === "register" ? labels.submitRegister : mode === "resetPassword" ? labels.forgot : labels.submitForgot}</button></form>{!verifyEmail && mode !== "forgotPassword" && mode !== "resetPassword" && <><div className="my-6 flex items-center gap-3 text-xs text-zinc-400"><span className="h-px flex-1 bg-zinc-200" />{labels.or}<span className="h-px flex-1 bg-zinc-200" /></div><button type="button" onClick={() => base44.auth.loginWithProvider("google", href(locale, "home"))} className="button-outline w-full">{labels.google}</button></>}<div className="mt-6 grid gap-2 text-center text-sm">{mode === "login" && <><Link className="font-bold text-primary" href={href(locale, "forgotPassword")}>{labels.forgotLink}</Link><p>{labels.noAccount} <Link className="font-bold text-primary" href={href(locale, "register")}>{labels.register}</Link></p></>}{mode === "register" && <p>{labels.haveAccount} <Link className="font-bold text-primary" href={href(locale, "login")}>{labels.login}</Link></p>}{(mode === "forgotPassword" || mode === "resetPassword") && <Link className="font-bold text-primary" href={href(locale, "login")}>{labels.login}</Link>}</div></div></main>;
}

function Field({ name, label, type = "text", inputMode, required = false }: { name: string; label: string; type?: string; inputMode?: "numeric"; required?: boolean }) { return <label className="grid gap-2 text-sm font-bold">{label}<input name={name} type={type} inputMode={inputMode} required={required} minLength={type === "password" ? 8 : undefined} className="h-12 border border-zinc-300 px-3 font-normal" /></label>; }
