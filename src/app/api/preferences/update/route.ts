import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { difficulty, targetMuscle, equipment } = body;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const upserted = await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: { difficulty, targetMuscle, equipment },
    create: { userId: user.id, difficulty, targetMuscle, equipment },
  });
  return NextResponse.json(upserted);
}
