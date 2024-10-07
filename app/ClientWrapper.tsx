
"use client"
import { EdgeStoreProvider } from "@/app/lib/edgeStore";
import { SessionProvider } from "next-auth/react";


const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <EdgeStoreProvider>
        {children}
      </EdgeStoreProvider>
    </SessionProvider>
  );
};

export default ClientWrapper;
