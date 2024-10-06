import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const{id}= await request.json();
    const result =await prisma.user.findUnique({
        where:{id}
    })
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);
    
    return NextResponse.json(
      { status: 500 }
    );
  }
}
