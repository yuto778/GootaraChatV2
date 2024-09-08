"use client";

import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import FriendAddModal from "./FriendAddModal";

interface FriendAddProps {
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
  data: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    find_id: string;
  } | null;
}

const FriendAdd: React.FC<FriendAddProps> = ({ allusers, data }) => {
  const [isFriendAddModal, setIsFriendAddModal] = useState<boolean>(false);

  return (
    <>
      <PlusIcon
        className="absolute top-3 right-2 cursor-pointer hover:scale-110"
        onClick={() => setIsFriendAddModal(true)}
      />
      {isFriendAddModal && (
        <FriendAddModal
          setIsFriendAddModal={setIsFriendAddModal}
          allusers={allusers}
          data={data}
        />
      )}
    </>
  );
};

export default FriendAdd;
