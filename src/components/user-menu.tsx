"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">
        {session.user?.email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-sm text-red-600 underline"
      >
        Logout
      </button>
    </div>
  );
}
