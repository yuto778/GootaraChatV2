import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import { redirect } from "next/navigation";
import React from "react";
import Request from "./Request";
import { Toaster } from "react-hot-toast";

type TypedSupabaseClient = ReturnType<typeof createClient>;

type User = Database["public"]["Tables"]["User"]["Row"];
type Friend = Database["public"]["Tables"]["Friends"]["Row"];

interface FriendRequestwithUser extends Omit<Friend, "friendId"> {
  friendId: string;
  User: User;
}

const page = async () => {
  const supabase = createClient() as TypedSupabaseClient;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data, error: usererror } = await supabase
    .from("User")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: requests, error: requesterror } = await supabase
    .from("Friends")
    .select(`*,User!userId(*)`)
    .eq("friendId", data!.id)
    .is("request", null)
    .returns<FriendRequestwithUser[]>();

  console.log(requests?.map((rq) => rq.User.id));

  return (
    <>
      <Toaster />
      <div className="flex flex-col h-screen w-screen bg-gradient-to-bl  from-yellow-200 to-black">
        <Header menu />
        <div className="flex-1 flex items-center justify-center  ">
          <div className="w-1/2 h-2/3 bg-green-300 rounded-xl">
            {requests?.map((request) => (
              <Request request={request} key={request.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
