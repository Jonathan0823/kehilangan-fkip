import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, postId, comment, userName, userImage } = await request.json();

    const timeAgo = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      hour12: false,
    });

    const newComment = await prisma.coment.create({
      data: {
        userId: userId,
        userName: userName,
        postId: postId,
        timeAgo,
        userimage: userImage,
        content: comment,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ status: 500 });
  }
}
