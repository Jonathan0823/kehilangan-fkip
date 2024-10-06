
"use client"
// import { EdgeStoreProvider } from "@/lib/edgeStore";
import { SessionProvider } from "next-auth/react";


const ClientWrapper = ({ children }: { children: React.ReactNode }) => {

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default ClientWrapper;
