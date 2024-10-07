import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      userId,
      userName,
      userImage,
      title,
      description,
      image,
      type,
      date,
    } = await request.json();

    const timeAgo = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      hour12: false,
    });

    const newPost = await prisma.post.create({
      data: {
        userId,
        userName,
        userImage: userImage,
        title,
        description,
        image,
        type,
        date,
        timeAgo,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    
    return NextResponse.json(

      { status: 500 }
    );
  }
}
