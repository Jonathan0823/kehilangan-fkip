import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, postId } = await req.json();
  try {
    const like = await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    console.error("Error creating like:", error);
    return NextResponse.json({ status: 500 });
  }
}
