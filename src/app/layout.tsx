import "./globals.css";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const pathname = (await headers()).get("x-pathname") ?? "";
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-gray-100">
        {isAuthPage ? (
          // 🔐 Auth pages manage their own background
          children
        ) : (
          <>
            {/* Navbar */}

            {session ? (
              <>
                <Navbar session={session} />
                <div className="flex h-[calc(100vh-64px)] overflow-hidden">
                  {/* Sidebar (solid) */}
                  <Sidebar />

                  {/* 🖼️ Main content with background image */}
                  <main className="relative flex-1 overflow-y-auto">
                    {/* 🌄 Fixed background */}
                    <div
                      className="fixed inset-0 -z-10 bg-cover bg-center"
                      style={{ backgroundImage: "url('/header.png')" }}
                    />

                    {/* 🔮 Overlay */}
                    <div className="fixed inset-0 -z-10 bg-black/30 backdrop-blur-[3px]" />

                    {/* 📄 Scrollable content */}
                    <div className="relative z-10 min-h-screen p-8">
                      {children}
                    </div>
                  </main>
                </div>
              </>
            ) : (
              <main>{children}</main>
            )}
          </>
        )}
      </body>
    </html>
  );
}
