"use client";

import { ToDirectChat } from "@/actions/ToDirectChat";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface FriendModalProps {
  setIsFriendModal: React.Dispatch<React.SetStateAction<boolean>>;
  friend: {
    avatar: string;
    createdAt: string | null;
    email: string;
    find_id: string;
    id: string;
    name: string;
    updatedAt: string | null;
  };
  data: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    find_id: string;
  } | null;
}

const FriendModal: React.FC<FriendModalProps> = ({
  setIsFriendModal,
  friend,
  data,
}) => {
  const router = useRouter();

  const DirectChat = async () => {
    try {
      const result = await ToDirectChat(data!.id, friend.id);

      if (result) {
        router.push(`/chat/${result}`);
      }
    } catch (error) {}
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black/85 flex items-center justify-center z-50"
        onClick={() => setIsFriendModal(false)}
      >
        <div
          className="bg-white p-8 rounded-lg w-3/4 md:w-1/3 h-1/2 md:h-2/3  overflow-auto relative flex flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => setIsFriendModal(false)}
            className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
          >
            <X />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center w-full gap-5">
            <div className="w-52 h-52 relative overflow-hidden rounded-full">
              <Image
                src={friend.avatar}
                alt="ユーザーアバター"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-xl font-bold">{friend.name}</h2>
            <h2 className="text-sm font-extralight whitespace-nowrap">
              {friend.find_id}
            </h2>
          </div>
          <Button
            className="self-center"
            variant={"outline"}
            onClick={DirectChat}
          >
            ダイレクトメッセージへ
          </Button>
        </div>
      </div>
    </>
  );
};

export default FriendModal;
