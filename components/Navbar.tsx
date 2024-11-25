"use client";

import { User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className="flex py-5 px-10 justify-between items-center w-full fixed top-0">
      <Logo />
      <div className="flex items-center gap-2">
        {session.status !== "authenticated" ? (
          <Button
            onClick={() => {
              router.push("/auth");
            }}
          >
            Sign up
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                signOut();
              }}
            >
              Log out
            </Button>
            <Link href="/u">
              <Button type="button" variant={"outline"} className="">
                <User className="text-primary" />
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
