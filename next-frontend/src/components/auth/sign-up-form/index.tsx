"use client";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import { signUpSchema } from "@/schema";
import { PasswordStrength } from "../password-strength";
import PasswordChecklist from "react-password-checklist";

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

export const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="my-1 text-xs" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="my-1 text-xs" htmlFor="email">
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              placeholder="***********"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <PasswordStrength password={password} />
          <div className="grid gap-1">
            <Label className="my-1 text-xs" htmlFor="email">
              Confirm Password
            </Label>
            <Input
              {...register("confirm")}
              id="confirm"
              placeholder="***********"
              type="password"
              name="confirm"
              onChange={(e) => setConfirm(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={password}
            valueAgain={confirm}
            onChange={(isValid) => {}}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
};
