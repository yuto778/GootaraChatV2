import BackIcon from "@/components/BackIcon";
import ChatInput from "@/components/ChatInput";
import Header from "@/components/Header";
import { getChatfrienddata } from "@/data/getChatdata";
import { createClient } from "@/lib/supabase/server";
import React from "react";

const page = async ({ params: { roomid } }: { params: { roomid: string } }) => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return;

  const chatFriendData = await getChatfrienddata(roomid, user.id);

  const { data: TemplateData, error: TemplateError } = await supabase
    .from("TemplateMessage")
    .select("*")
    .eq("userId", user.id);

  console.log(TemplateData);
  return (
    <>
      <div className="h-screen w-screen flex flex-col bg-gradient-to-bl from-yellow-200 to-black overflow-hidden">
        <Header menu />
        <header className="border-b-2 border-gray-600 h-14 flex items-center container ">
          <BackIcon />
          <span className="flex-1"></span>
          <h2 className="text-2xl font-bold "> {chatFriendData?.name}</h2>
          <span className="flex-1"></span>
          <div className="">icon</div>
        </header>
        <main className=" flex-1 w-full px-5 py-5 overflow-hidden flex flex-col space-y-8 ">
          <div className="flex-1 border overflow-y-scroll"> </div>
          <ChatInput TemplateData={TemplateData} />
        </main>
      </div>
    </>
  );
};

export default page;
