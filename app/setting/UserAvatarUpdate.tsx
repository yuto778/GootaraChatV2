"use client";

import Image from "next/image";
import React, { useState } from "react";
import UserAvatarUpdateModal from "./UserAvatarUpdateModal";

interface UserAvatarProps {
  Userdata: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    find_id: string;
  };
}

const UserAvatarUpdate: React.FC<UserAvatarProps> = ({ Userdata }) => {
  const [isUserAvatarUpdateModal, setIsUserAvatarUpdateModal] =
    useState<boolean>(false);
  return (
    <>
      <div className="h-28 w-28 relative overflow-hidden rounded-full ">
        <Image
          src={Userdata?.avatar ? Userdata.avatar : "/Icon.jpeg"}
          alt="ユーザーアバター"
          layout="fill"
          className="cursor-pointer"
          objectFit="cover"
          onClick={() => setIsUserAvatarUpdateModal(true)}
        />
      </div>
      {isUserAvatarUpdateModal && (
        <UserAvatarUpdateModal
          Userdata={Userdata}
          setIsUserAvatarUpdateModal={setIsUserAvatarUpdateModal}
        />
      )}
    </>
  );
};

export default UserAvatarUpdate;
