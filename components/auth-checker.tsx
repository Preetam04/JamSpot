"use client";

import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Checker = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  const router = useRouter();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace("/");
    }
  }, [session.status, router]);

  if (session.status === "loading" || session.status === "unauthenticated") {
    return (
      <div className="w-full flex justify-center mt-20">
        {/* <Loader size={56} className="text-primary  animate-spin" /> */}
        Loading
      </div>
    ); // or a loading spinner if you prefer
  }

  return <>{children}</>;
};

export default Checker;
