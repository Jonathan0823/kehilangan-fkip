import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id, name, prodi, angkatan } = await request.json();
    console.log(id, name, prodi, angkatan);
    const result = await prisma.user.update({
    where: { id },
    data: { name, prodi, angkatan },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error creating post:", error);

    return NextResponse.json({ status: 500 });
  }
}
