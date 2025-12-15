"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-24 space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <h1 className="text-xl font-bold text-black">Login</h1>

      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn w-full">Sign In</button>
      <p className="text-sm text-black flex justify-center">
        No account? <Link href="/signup" className="underline ml-10">Sign up</Link>
      </p>
    </form>
  );
}
