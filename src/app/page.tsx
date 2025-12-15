import LogoutButton from "@/components/logout-button";
import UserMenu from "@/components/user-menu";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex justify-between"><p>Logged in as {session.user?.email}</p>
      <LogoutButton /></div>
      
    </div>
  );
}
