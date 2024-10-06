import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const url = process.env.MAIL_URL;
    if (user) {
      const token = nanoid(32);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to reset it.</p>
        <a href="${url}/reset/reset-password/${token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p style="color: #888;">Thank you,<br/>Othinus</p>
      </div>
      `;
      const info = await transporter.sendMail({
        from: process.env.FROM,
        to: email,
        subject: "Password Reset Request",
        text: "Click the link to reset your password.",
        html: htmlBody,
      });

      console.log("Message sent: %s", info.messageId);

      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          veriftToken: token,
          kadaluarsa: new Date(Date.now() + 5 * 60 * 1000),
        },
      });

      console.log("Verification token updated for user:", email);
      return NextResponse.json({ message: "Password reset email sent." });
    } else {
      console.log("User not found");
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
