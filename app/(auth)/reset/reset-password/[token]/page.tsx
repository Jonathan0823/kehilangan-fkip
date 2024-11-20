"use client";
import { usePathname } from "next/navigation";
import Reset from "@/app/components/reset-password";

export default function ResetPasswordPage() {
    const pathname = usePathname();
    const lastSegment = pathname.split("/").pop() || "";
    console.log(lastSegment);
    
    return (
        <div className="min-h-dvh">
            <Reset params={lastSegment} />
        </div>
    );
}
