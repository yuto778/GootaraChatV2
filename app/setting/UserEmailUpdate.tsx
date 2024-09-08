"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import UserEmailUpdateModal from "./UserEmailUpdateModal";

interface UserEmailUpdataProps {
  Userdata: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    find_id: string;
  };
}

const UserEmailUpdata: React.FC<UserEmailUpdataProps> = ({ Userdata }) => {
  const [isUserEmailUpdateModal, setIsUserEmailUpdateModal] =
    useState<boolean>(false);
  return (
    <>
      <Input
        type="text"
        value={Userdata?.email}
        className="cursor-pointer"
        onClick={() => setIsUserEmailUpdateModal(true)}
      />
      {isUserEmailUpdateModal && (
        <UserEmailUpdateModal
          Userdata={Userdata}
          setIsUserEmailUpdateModal={setIsUserEmailUpdateModal}
        />
      )}
    </>
  );
};

export default UserEmailUpdata;
