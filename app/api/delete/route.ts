import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, postId } = await request.json();
    await prisma.coment.deleteMany({
      where: {
        postId: postId,
      },
    });


    const post = await prisma.post.delete({
      where: {
        id: postId,
        userId: userId, 
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error deleting user or post:", error);
    return NextResponse.json({ status: 500 });
  }
}
