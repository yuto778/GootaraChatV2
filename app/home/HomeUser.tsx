"use client";

// /HomeUser.tsx

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import PhotoModal from "./PhotoModal";
import { tree } from "next/dist/build/templates/app-page";
import { PlusIcon } from "lucide-react";
import FriendAdd from "./FriendAdd";
import FriendModal from "./FriendModal";
import GroopAdd from "./GroopAdd";

interface HomeUserProps {
  data: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    find_id: string;
  } | null;
  allusers:
    | {
        avatar: string | null;
        createdAt: string | null;
        email: string;
        find_id: string;
        id: string;
        name: string;
        updatedAt: string | null;
      }[]
    | undefined;
  friendUser:
    | {
        avatar: string;
        createdAt: string | null;
        email: string;
        find_id: string;
        id: string;
        name: string;
        updatedAt: string | null;
      }[]
    | undefined;
}

const HomeUser: React.FC<HomeUserProps> = ({ data, allusers, friendUser }) => {
  const [isPhotoModal, setIsPhotoModal] = useState<boolean>(false);
  const [isFriendModal, setIsFriendModal] = useState<boolean>(false);

  const [selectedFriend, setSelectedFriend] = useState<
    NonNullable<typeof friendUser>[0] | null
  >(null);

  const openFriendModal = (friend: NonNullable<typeof friendUser>[0]) => {
    setSelectedFriend(friend);
  };

  const closeFriendModal = () => {
    setSelectedFriend(null);
  };

  return (
    <>
      <div className="border-b-2 border-gray-600 flex  items-center container py-5 md:px-24">
        <div className="w-20 h-20 md:w-28 md:h-28 relative overflow-hidden rounded-full cursor-pointer">
          <Image
            src={data?.avatar ? data?.avatar : "/Icon.jpeg"}
            alt="ユーザーアバター"
            layout="fill"
            objectFit="cover"
            onClick={() => setIsPhotoModal(!isPhotoModal)}
          />
        </div>
        <span className="flex-1"></span>
        <h2 className="font-extrabold text-3xl sm:text-4xl truncate max-w-48 ">
          {data?.name}
        </h2>
      </div>
      <div className="flex-1  flex w-full h-full">
        <section className="h-full w-1/3 md:w-1/4 border-r-2 border-gray-600 flex flex-col items-center py-5 gap-5 relative ">
          <h2 className="text-2xl md:text-3xl font-bold self-center ">友達</h2>
          <div className="overflow-y-scroll w-full flex flex-col gap-6  md:gap-2 h-full flex-1 ">
            {friendUser?.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-4 md:gap-10 px-5 mx-1  md:px-10 border-b-2 border-black/30 md:h-14 cursor-pointer  "
                onClick={() => openFriendModal(friend)}
              >
                <div className="h-10 w-10 rounded-full relative overflow-hidden">
                  <Image
                    src={friend.avatar}
                    layout="fill"
                    objectFit="cover"
                    alt="友達の写真"
                  />
                </div>
                <h2 className="md:text-xl text-xs max-w-[50px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] truncate">
                  {" "}
                  {friend.name}
                </h2>
              </div>
            ))}
          </div>
          <FriendAdd allusers={allusers} data={data} />
        </section>
        <section className="h-full flex-1  flex flex-col items-center py-5 relative">
          <h2 className="text-2xl md:text-3xl font-bold">チャット</h2>
          <Button variant={"link"} className="relative">
            チャットへ
            <Link href={"/chat/jfjfj"} className="absolute inset-0"></Link>
          </Button>
          <GroopAdd />
        </section>
      </div>
      {isPhotoModal && (
        <PhotoModal setIsPhotoModal={setIsPhotoModal} data={data} />
      )}
      {selectedFriend && (
        <FriendModal
          setIsFriendModal={closeFriendModal}
          friend={selectedFriend}
          data={data}
        />
      )}
    </>
  );
};

export default HomeUser;
