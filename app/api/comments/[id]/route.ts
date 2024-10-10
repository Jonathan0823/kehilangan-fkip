import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: { params: { id: string } }) {
    try{
        const {id} = params;
        if (!id) {
            return NextResponse.json({ status: 401, message: "Post not found" });
        }
        const comment = await prisma.coment.findMany({
            where: {
                postId: String(id),
            },
            include: {author: true},
        });
        return NextResponse.json(comment);
    } catch (error) {
        console.error("Error getting users:", error);
        return NextResponse.json({ status: 500 });
    }
}