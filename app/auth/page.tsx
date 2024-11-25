"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import googleIcon from "@/assets/google.svg";
import { signIn } from "next-auth/react";

const auth = () => {
  return (
    <div className="w-full h-screen flex  bg-background  ">
      <div className="w-7/12 bg-pattern h-screen  hidden sm:block" />
      <div className="w-96 h-fit bg-card rounded-md      py-5 px-8 mx-3 self-center relative bottom-16">
        <Link href={"/"}>
          <p className="flex gap-1 items-center text-3xl font-bold">
            Jam<span className="text-primary -ml-1">Spot</span>
          </p>
        </Link>
        <p className="mt-1 mb-5">
          Get started with Jamspot by signing in with your account.
        </p>
        <div className="w-full ">
          <Button
            className="w-full"
            onClick={() => {
              signIn();
            }}
          >
            <Image
              src={googleIcon}
              fill={false}
              width={16}
              height={16}
              className=" font-medium"
              alt="google-ico"
            />
            Sign In with Google{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default auth;
