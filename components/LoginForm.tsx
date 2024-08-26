"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SignUpform from "./SignUpform";

const LoginformSchema = z.object({
  Email: z.string().email(),
  Password: z.string().min(6),
});

type VariantType = "Login" | "SignUp";

export type LoginFormType = z.infer<typeof LoginformSchema>;

const LoginForm = () => {
  const [variant, setVariant] = useState<VariantType>("Login");
  const Loginform = useForm<LoginFormType>({
    resolver: zodResolver(LoginformSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const changeVariant = () => {
    if (variant === "Login") {
      setVariant("SignUp");
    } else {
      setVariant("Login");
    }
  };

  const LoginonSubmit = async (values: LoginFormType) => {};
  return (
    <>
      {variant === "Login" && (
        <>
          <Form {...Loginform}>
            <h2 className="font-bold text-3xl">ログイン</h2>

            <form
              onSubmit={Loginform.handleSubmit(LoginonSubmit)}
              className="space-y-3 w-full flex flex-col"
            >
              <FormField
                control={Loginform.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold">
                      メールアドレス
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="@gmail.com" className="" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={Loginform.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold">
                      パスワード
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="6文字以上"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="self-center ">
                ログイン
              </Button>
            </form>
            <h2
              className="underline underline-offset-4 text-muted-foreground cursor-pointer"
              onClick={changeVariant}
            >
              アカウントがありませんか
            </h2>
          </Form>
        </>
      )}
      {variant === "SignUp" && <SignUpform changeVariant={changeVariant} />}
    </>
  );
};

export default LoginForm;
