"use client";

import { UserAvatarUpdate } from "@/actions/UserAvatarUpdate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UserAvatarUpdateModalProps {
  Userdata: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    find_id: string;
  };
  setIsUserAvatarUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserAvatarUpdateModal: React.FC<UserAvatarUpdateModalProps> = ({
  Userdata,
  setIsUserAvatarUpdateModal,
}) => {
  useLockBodyScroll();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const UserAvataronSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    //サーバーアクション
    try {
      const uploadpromise = UserAvatarUpdate(formData, Userdata.id);
      await toast.promise(uploadpromise, {
        loading: "少々お待ちください",
        success: "アバターのアップロードに成功した",
        error: "アバターの更新に失敗した",
      });

      const result = await uploadpromise;
      if (!result?.success) return;

      setIsUserAvatarUpdateModal(false);
      router.refresh();
    } catch (error) {}
  };
  return (
    <>
      <div
        className="fixed  inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 "
        onClick={() => setIsUserAvatarUpdateModal(false)}
      >
        <div
          className="bg-white p-5 rounded-lg w-3/4 md:w-1/2 h-auto  overflow-auto relative flex flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center  font-bold md:text-xl">
            アバターを編集する
          </h2>
          <div
            onClick={() => setIsUserAvatarUpdateModal(false)}
            className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
          >
            <X />
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <form
              onSubmit={UserAvataronSubmit}
              className="flex flex-col pt-10 space-y-5 md:w-full md:px-20"
            >
              <Input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Button type="submit" className="self-center">
                更新する
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAvatarUpdateModal;
