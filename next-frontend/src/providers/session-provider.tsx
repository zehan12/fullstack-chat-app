"use client";
import { SessionProvider as NextSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  return <NextSessionProvider>{children}</NextSessionProvider>;
};
