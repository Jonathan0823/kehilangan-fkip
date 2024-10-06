import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { newPassword, token } = await request.json();
    console.log(newPassword, token);
    
    const user = await prisma.user.findFirst({
      where: {
        veriftToken: token,
      },
    });

    if (user) {
      const salt = await bcrypt.genSalt(12);
      const passwordHashed = await bcrypt.hash(newPassword, salt);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: passwordHashed,
          veriftToken: null,
          kadaluarsa: null,
        },
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ success: false, error: "Failed to update password" }, { status: 500 });
  }
}
