"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Signup failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-24 space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <h1 className="text-xl font-bold text-black">Signup</h1>

      <input
        className="input border-black bg-blue-100 text-black"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      

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

      <button className="btn w-full">Create Account</button>
      <p className="text-sm text-black flex justify-center">
        Already had account? <Link href="/login" className="underline ml-10">Login</Link>
      </p>
    </form>
  );
}
