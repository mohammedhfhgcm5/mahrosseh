"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "تعذر تسجيل الدخول");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full flex-col justify-center px-6 py-10 md:w-1/2 md:px-16">
        <div className="mx-auto w-full max-w-md">
          <Image
            src="/logo.png"
            alt="Fragola Gelato"
            width={180}
            height={70}
            className="mx-auto h-16 w-auto"
            priority
          />
          <h1 className="mt-8 text-center text-3xl font-extrabold text-brand">
            تسجيل الدخول للمديرين
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-500">
            مرحباً بعودتك! يرجى إدخال بيانات الاعتماد الخاصة بك.
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-semibold text-zinc-700">
              البريد الإلكتروني
              <div className="relative mt-2">
                <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@fragolagelato.com"
                  className="w-full rounded-xl border border-pink-100 bg-zinc-50 py-3 pr-10 pl-3 text-sm outline-none focus:border-brand"
                  required
                />
              </div>
            </label>
            <label className="block text-sm font-semibold text-zinc-700">
              كلمة المرور
              <div className="relative mt-2">
                <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-pink-100 bg-zinc-50 py-3 pr-10 pl-10 text-sm outline-none focus:border-brand"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  aria-label="إظهار كلمة المرور"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-zinc-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="accent-brand"
                />
                تذكرني
              </label>
              <span className="text-zinc-400">نسيت كلمة المرور؟</span>
            </div>
            {error ? (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {loading ? "جاري الدخول..." : "تسجيل الدخول"}
              <span aria-hidden>←</span>
            </button>
          </form>
        </div>
      </div>
      <div
        className="relative hidden md:block md:w-1/2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-x-8 bottom-10 rounded-2xl bg-black/45 p-6 text-white backdrop-blur-sm">
          <h2 className="text-2xl font-extrabold">إدارة نظام فراجولا</h2>
          <p className="mt-2 text-sm text-white/90">
            بوابة الإدارة الآمنة الخاصة بك للتحكم في المنيو وإدارة المتجر
          </p>
        </div>
      </div>
    </div>
  );
}
