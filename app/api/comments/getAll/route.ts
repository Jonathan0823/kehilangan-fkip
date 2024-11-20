import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const comment = await prisma.coment.findMany({include:{author: true}});
    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error getting users:", error);
    return NextResponse.json({ status: 500 });
  }
}
