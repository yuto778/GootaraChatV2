"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import UserIdUpdateModal from "./UserIdUpdateModal";

interface UserIdUpdateProps {
  Userdata: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    find_id: string;
  };
}

const UserIdUpdate: React.FC<UserIdUpdateProps> = ({ Userdata }) => {
  const [isUserIdUpdateModal, setIsUserIdUpdateModal] =
    useState<boolean>(false);
  return (
    <>
      <Input
        type="text"
        value={Userdata?.find_id}
        className="cursor-pointer"
        onClick={() => setIsUserIdUpdateModal(true)}
      />
      {isUserIdUpdateModal && (
        <UserIdUpdateModal
          Userdata={Userdata}
          setIsUserIdUpdateModal={setIsUserIdUpdateModal}
        />
      )}
    </>
  );
};

export default UserIdUpdate;
