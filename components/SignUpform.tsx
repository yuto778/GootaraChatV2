"use client";

import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUp } from "@/actions/Signup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUpformSchema = z.object({
  Username: z.string(),
  Email: z.string().email(),
  FirstPassword: z.string().min(6),
  SecondPassword: z.string().min(6),
});

interface SignupProps {
  changeVariant: () => void;
}

export type SignUpFormType = z.infer<typeof SignUpformSchema>;

const SignUpform: React.FC<SignupProps> = ({ changeVariant }) => {
  const router = useRouter();
  const SignUpform = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpformSchema),
    defaultValues: {
      Username: "",
      Email: "",
      FirstPassword: "",
      SecondPassword: "",
    },
  });

  const SignUponSubmit = async (value: SignUpFormType) => {
    try {
      if (value.FirstPassword === value.SecondPassword) {
        const result = await SignUp(value);
        if (!result.success) {
          toast.error(result.message);
        }
        toast.success(result.message);
        router.push("/home");
        // changeVariant();
      }
    } catch (error) {
      toast.error("新規登録に失敗");
    }
  };
  return (
    <>
      <Form {...SignUpform}>
        <h2 className="text-3xl font-bold ">新規登録</h2>
        <form
          onSubmit={SignUpform.handleSubmit(SignUponSubmit)}
          className="space-y-4 flex flex-col w-full"
        >
          <FormField
            control={SignUpform.control}
            name="Username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold">
                  ユーザーネーム
                </FormLabel>
                <FormControl>
                  <Input placeholder="ゆうと" {...field} autoComplete="off" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={SignUpform.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold">
                  メールアドレス
                </FormLabel>
                <FormControl>
                  <Input placeholder="@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={SignUpform.control}
            name="FirstPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold">パスワード</FormLabel>
                <FormControl>
                  <Input placeholder="6文字以上" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={SignUpform.control}
            name="SecondPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold">
                  パスワード2回目
                </FormLabel>
                <FormControl>
                  <Input placeholder="6文字以上" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="self-center">
            登録
          </Button>
        </form>
        <h2
          className="underline underline-offset-4 text-muted-foreground cursor-pointer"
          onClick={changeVariant}
        >
          ログインへ
        </h2>
      </Form>
    </>
  );
};

export default SignUpform;
