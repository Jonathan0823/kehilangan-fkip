import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, postId } = await req.json();
  try {
    const unlike = await prisma.like.deleteMany({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    return NextResponse.json(unlike, { status: 201 });
  } catch (error) {
    console.error("Error creating like:", error);
    return NextResponse.json({ status: 500 });
  }
}