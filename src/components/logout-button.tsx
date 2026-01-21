"use client";

import { signOut as realSignOut } from "next-auth/react";

export default function LogoutButton() {
  const signOut =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (typeof window !== "undefined" &&
      (window as any).__NEXTAUTH_SIGNOUT__) ||
    realSignOut;

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}
