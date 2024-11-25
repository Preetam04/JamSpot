"use client";

import Logo from "@/components/Logo";
import { useSession } from "next-auth/react";

const Page = () => {
  return (
    <div className="">
      <nav className="flex py-5 px-10 justify-between items-center w-full fixed top-0">
        <Logo />
      </nav>
    </div>
  );
};

export default Page;
