"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import UserNameUpdateModal from "./UserNameUpdateModal";

interface UsernameUpdateProps {
  Userdata: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
  };
}

const UsernameUpdate: React.FC<UsernameUpdateProps> = ({ Userdata }) => {
  const [isUsernameUpdateModal, setIsUsernameUpdateModal] =
    useState<boolean>(false);

  return (
    <>
      <Input
        type="text"
        value={Userdata?.name}
        className="cursor-pointer "
        onClick={() => setIsUsernameUpdateModal(true)}
      />
      {isUsernameUpdateModal && (
        <UserNameUpdateModal
          Userdata={Userdata}
          setIsUsernameUpdateModal={setIsUsernameUpdateModal}
        />
      )}
    </>
  );
};

export default UsernameUpdate;
