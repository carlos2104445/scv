"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Build base URL without embedded credentials (tunnel URLs include user:pass@)
      const base = `${window.location.protocol}//${window.location.host}`;

      // Fetch CSRF token first
      const csrfRes = await fetch(`${base}/api/auth/csrf`, {
        credentials: "include",
      });
      const { csrfToken } = await csrfRes.json();

      // Call the credentials callback directly with CSRF token
      const res = await fetch(`${base}/api/auth/callback/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          password,
          csrfToken,
          redirect: "false",
          json: "true",
        }),
        credentials: "include",
        redirect: "manual",
      });

      // redirect: "manual" makes 302 appear as opaqueredirect (status=0)
      if (res.type === "opaqueredirect" || res.status === 302) {
        router.push("/");
        router.refresh();
      } else if (res.ok) {
        try {
          const data = await res.json();
          if (data.url && !data.url.includes("/login")) {
            router.push("/");
            router.refresh();
          } else {
            setError("Invalid email or password");
          }
        } catch {
          router.push("/");
          router.refresh();
        }
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sidebar via-sidebar to-brand-dark p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center shadow-lg shadow-brand-orange/25 mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white">SCV Admin</h1>
          <p className="text-neutral-400 text-sm mt-1">Selam Children&apos;s Village CMS</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="label">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="admin@selamchildrenvillage.org"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-neutral-500 text-xs mt-6">
          © {new Date().getFullYear()} Selam Children&apos;s Village
        </p>
      </div>
    </div>
  );
}
