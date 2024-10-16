"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { MicVocal, Music, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const session = useSession();
  const navigate = useRouter();
  return (
    <nav className="flex py-5 px-10 justify-between items-center w-full">
      <p className="flex gap-1 items-center text-2xl font-bold">
        Jam<span className="text-primary -ml-1">Spot</span>
      </p>
      <div className="flex items-center gap-2">
        {session.status === "unauthenticated" ? (
          <Button
            onClick={() => {
              signIn();
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
