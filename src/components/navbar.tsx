"use client";

import Link from "next/link";
import type { Session } from "next-auth";
import AccountMenu from "./AccountMenu";

type Props = {
  session: Session | null;
};

export default function Navbar({ session }: Props) {
  return (
    <header
      className="sticky top-0 z-50 border-b shadow-sm backdrop-blur-md"
      style={{
        backgroundImage: "url('header.png')",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 mx-20">
        {/* Brand */}
        <Link href="/" className="font-bold text-3xl text-gray-300">
          🏋️ MicroWorkout
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {session ? (
            <AccountMenu email={session.user?.email ?? ""} />
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded bg-gray-300 text-black"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
