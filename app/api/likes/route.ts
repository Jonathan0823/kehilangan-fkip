import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET() {
    try{
        const likes = await prisma.like.findMany();
        return NextResponse.json(likes);
    }catch(error){
        console.error("Error fetching data:", error);
        return NextResponse.json({ status: 500 });
    }
}