import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ぐーたらちゃっと",
  description: "ぐーたらちゃっとの説明画面です",
};

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-bl from-yellow-200 to-black flex flex-col items-center justify-center">
        <Button className="relative">
          ログインへ
          <Link href={"/login"} className="absolute inset-0"></Link>
        </Button>
      </div>
    </>
  );
}
