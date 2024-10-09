import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: { params: { id: string } }) {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ status: 401, message: "Unauthorized" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: String(id),
            }
        });
    
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error getting users:", error);
        return NextResponse.json({ status: 500 });
    }
    }
