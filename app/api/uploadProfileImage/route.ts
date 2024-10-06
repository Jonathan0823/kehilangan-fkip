import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {
  try {
    const { id,image } = await request.json();
    console.log(id, image);
    const result = await prisma.user.update({
      where:{id:String(id)},
    data:{
        image: image
    }
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);

    return NextResponse.json({ status: 500 });
  }
}
