"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/");
    } else {
      alert("Signup failed");
    }
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
        className=" relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 -mt-44"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-black">Create account</h1>
          <p className="text-sm text-gray-500">
            Start your micro-workout journey
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-400 text-black"
          />
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
          {loading ? "Creating account…" : "Create Account"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
