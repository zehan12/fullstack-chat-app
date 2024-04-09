"use client";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

export const SignInButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div>
        <Link href={"/api/auth/signout"}>
          <Button>Logout</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex ml-auto items-center">
      <Link href={"/api/auth/signin"}>
        <Button>Sign In</Button>
      </Link>
      <Link href={"/signup"}>
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
};
