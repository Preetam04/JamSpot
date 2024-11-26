"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import googleIcon from "@/assets/google.svg";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { authSchema } from "@/schema/credentials-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type UserForm = z.infer<typeof authSchema>;

const Auth = () => {
  const form = useForm<UserForm>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: UserForm) {
    console.log(values);

    try {
      signIn("credentials", {
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
    }
  }

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
        <div className=" my-4">
          <Form {...form}>
            <form
              action="submit"
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="kdot@gnx.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">Sign In</Button>
            </form>
          </Form>
        </div>
        <Separator className="text-primary my-4" />

        <div className="w-full ">
          <Button
            className="w-full"
            onClick={() => {
              signIn("google");
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

export default Auth;
