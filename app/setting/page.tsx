import BackIcon from "@/components/BackIcon";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import TemplateCreate from "./TemplateCreate";
import SettingTemplate from "./SettingTemplate";
import UsernameUpdate from "./UsernameUpdate";
import UserIdUpdate from "./UserIdUpdate";
import UserEmailUpdate from "./UserEmailUpdate";
import UserAvatarUpdate from "./UserAvatarUpdate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "設定",
  description:
    "ログインしているユーザーの各種設定画面です。定型文の追加、削除も行えます",
};

const page = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: Userdata, error: Userfetcherror } = await supabase
    .from("User")
    .select("id,email,name,avatar,find_id")
    .eq("id", user.id)
    .single();

  if (!Userdata) {
    redirect("/login");
  }

  const { data: TemplateData, error: TemplateError } = await supabase
    .from("TemplateMessage")
    .select("*")
    .eq("userId", user.id);

  console.log(TemplateData);

  return (
    <>
      <Toaster />
      <div className="flex flex-col h-screen w-screen bg-gradient-to-bl  from-yellow-200 to-green-800">
        <Header menu />
        <main className="flex-1  flex flex-col overflow-hidden">
          <header className="border-b-2 border-gray-600 h-14 flex z-0 items-center justify-center container relative">
            <BackIcon className="absolute left-8 z-10" />
            <h2 className="text-xl font-bold">設定</h2>
          </header>
          <div className="flex-1 flex flex-col md:flex-row">
            <section className="border-b-2 border-gray-600 gap-4 flex pt-3 pb-5 flex-col items-center container md:w-1/2 md:pt-8 md:gap-7 ">
              <h2 className="text-xl font-semibold self-start">各種変更</h2>
              <UserAvatarUpdate Userdata={Userdata} />

              <UsernameUpdate Userdata={Userdata} />
              <UserIdUpdate Userdata={Userdata} />
              <UserEmailUpdate Userdata={Userdata} />
              <Input type="text" value="パスワード" className="" disabled />
            </section>
            <section className="flex-1 flex flex-col items-center container py-3 space-y-3 md:pt-8 md:gap-7 md:border-l-2 md:space-y-5 ">
              <h2 className="self-start text-xl font-bold"> 定型文</h2>
              <div className="py-2 flex items-center space-x-3 ">
                <TemplateCreate user={Userdata} />
              </div>
              <div className="border border-black bg-neutral-300/80 w-80 h-60 md:h-72 overflow-y-hidden rounded-xl flex flex-col">
                <header
                  className="text-center border-b-2 border-black py-2 font-semibold
              "
                >
                  すでに設定されている定型文
                </header>
                <div
                  className={`flex flex-col py-2  flex-1  ${
                    TemplateData && TemplateData.length > 0
                      ? "pl-8 overflow-y-scroll"
                      : "items-center justify-center"
                  }`}
                >
                  {TemplateData?.length === 0 && (
                    <h2 className="">まだデータがありません</h2>
                  )}
                  {TemplateData &&
                    TemplateData?.map((template, index) => (
                      <SettingTemplate template={template} key={template.id} />
                    ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default page;
