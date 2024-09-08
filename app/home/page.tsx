// /app/home/page.tsx

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import HomeUser from "./HomeUser";
import { Toaster } from "react-hot-toast";
import { getAllUser } from "@/data/getAllUser";
import { Metadata } from "next";
import { getFriendData } from "@/data/getFriendData";

export const metadata: Metadata = {
  title: "ホーム",
  description: "ログイン後のホーム画面です。友達やチャットの履歴が残ります",
};

const page = async () => {
  const supabase = createClient();
  const {
    data: { user: getuser },
  } = await supabase.auth.getUser();

  if (!getuser) {
    redirect("/login");
  }

  const allusers = await getAllUser(getuser.id);

  const friendUser = await getFriendData(getuser.id);

  const { data } = await supabase
    .from("User")
    .select("name , email , avatar,find_id , id")
    .eq("id", getuser.id)
    .single();

  console.log(data);

  return (
    <>
      <Toaster />
      <div className="flex flex-col h-screen w-screen bg-gradient-to-bl  from-yellow-200 to-black  ">
        <Header menu />
        <main className="flex-1 flex flex-col overflow-hidden">
          <HomeUser data={data} allusers={allusers} friendUser={friendUser} />
        </main>
      </div>
    </>
  );
};

export default page;
