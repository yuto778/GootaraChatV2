"use client";

import { Circle, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { AllowRequest } from "./AllowRequest";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Reject } from "./Reject";

export interface RequestProps {
  request: {
    id: string;
    userId: string;
    friendId: string;
    request: boolean | null;
    User: {
      avatar: string;
      createdAt: string | null;
      email: string;
      find_id: string;
      id: string;
      name: string;
      updatedAt: string | null;
    };
  };
}

const Request: React.FC<RequestProps> = ({ request }) => {
  const router = useRouter();
  const Allow = async () => {
    try {
      const allowpromise = AllowRequest(
        request.id,
        request.userId,
        request.friendId
      );

      await toast.promise(allowpromise, {
        loading: "少々お待ちください",
        success: "リクエストを承認しました",
        error: "エラーが発生しました",
      });

      const result = await allowpromise;

      if (!result.success) return;

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const reject = async () => {
    try {
      const rejectpromise = Reject(request.id);

      await toast.promise(rejectpromise, {
        loading: "少々お待ちください",
        success: "リクエストを却下しました",
        error: "リクエストの削除エラー",
      });

      const result = await rejectpromise;

      if (!result.success) return;

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex px-5 h-16 items-center border-b-2 gap-3 ">
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <Image
            src={request.User.avatar}
            layout="fill"
            objectFit="cover"
            alt="リクエストユーザーでーた"
          />
        </div>
        <h2 className="text-xl">
          {request.User.name}からリクエストが来ています
        </h2>
        <div
          className="h-8 w-8 bg-gray-800 flex items-center justify-center rounded-full p-1 cursor-pointer "
          onClick={Allow}
        >
          <Circle className="text-white " />
        </div>
        <div
          className="h-8 w-8 bg-red-700 flex items-center justify-center rounded-full cursor-pointer "
          onClick={reject}
        >
          <X className="text-white " />
        </div>
      </div>
    </>
  );
};

export default Request;
