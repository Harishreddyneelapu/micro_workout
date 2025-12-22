"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  session: Session | null;
};

export default function Navbar({ session }: Props) {
  return (
    <header
      className="sticky top-0 z-50 border-b shadow-sm backdrop-blur-md"
      style={{
        backgroundImage: "url('/header.png')",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 mx-20">
        {/* Brand */}
        <Link href="/" className="font-bold text-3xl text-gray-300">
          💪 MicroWorkout
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

/* ---------- Account Dropdown ---------- */

function AccountMenu({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = email?.split("@")[0]?.slice(0, 2).toUpperCase() || "U";

  return (
    <div className="relative" ref={ref}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-400 text-black font-semibold"
        aria-label="Account menu"
      >
        {initials}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-56 rounded-xl bg-white shadow-lg border z-50"
          >
            {/* Account info */}
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium text-black">Signed in as</p>
              <p className="text-sm text-gray-600 truncate">{email}</p>
            </div>

            {/* Links */}
            <div className="py-2">
              <DropdownLink href="/preferences">⚙️ Preferences</DropdownLink>
              <DropdownLink href="/summary">📊 Summary</DropdownLink>
            </div>

            {/* Logout */}
            <div className="border-t">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                🚪 Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Helper ---------- */

function DropdownLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
    >
      {children}
    </Link>
  );
}
