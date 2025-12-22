"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAVBAR_HEIGHT = "4rem"; // 64px

const links = [
  { href: "/", label: "Dashboard", icon: "🏠" },
  { href: "/spin", label: "Spin", icon: "🎰" },
  { href: "/workouts", label: "Workouts", icon: "📋" },
  { href: "/preferences", label: "Preferences", icon: "⚙️" },
  { href: "/summary", label: "Summary", icon: "📊" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 border-r sticky bg-black/70 backdrop-blur-md"
      style={{
        top: NAVBAR_HEIGHT,
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        backgroundImage: "url('/header.png')",
      }}
    >
      <div className="h-full overflow-y-auto p-4 space-y-1">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-200 hover:bg-gray-300 hover:text-black"
                  }`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
