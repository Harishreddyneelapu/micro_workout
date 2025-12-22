"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    setLoading(false);
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden flex items-center justify-center bg-linear-to-br from-neutral-900 via-black to-neutral-900"
      style={{
        backgroundImage: "url('/header.png')",
      }}
    >
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[0.5px]" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 -mt-44"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-black">Welcome back</h1>
          <p className="text-sm text-gray-500">
            Sign in to continue your workouts
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-400 text-black"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-400 text-black"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black py-3 text-white font-semibold hover:bg-neutral-800 transition disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
