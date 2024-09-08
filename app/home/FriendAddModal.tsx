"use client";

import { useLockBodyScroll } from "@uidotdev/usehooks";
import { X } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Friendrequest } from "@/actions/Friendrequest";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FriendrequestformSchema = z.object({
  findid: z.string().min(1),
});

interface FriendAddModalProps {
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
  setIsFriendAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    find_id: string;
  } | null;
}

export type FriendrequestType = z.infer<typeof FriendrequestformSchema>;

const FriendAddModal: React.FC<FriendAddModalProps> = ({
  setIsFriendAddModal,
  allusers,
  data,
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const Friendrequestform = useForm<FriendrequestType>({
    resolver: zodResolver(FriendrequestformSchema),
    defaultValues: {
      findid: "",
    },
  });
  useLockBodyScroll();

  const FriendrequestonSubmit = async (value: FriendrequestType) => {
    try {
      const requestpromise = Friendrequest(value, data!.id);

      await toast.promise(requestpromise, {
        loading: "少々お待ちください",
        success: "リクエストの送信に成功した",
        error: "リクエスト送信時にエラーが発生した",
      });

      const result = await requestpromise;
      if (!result.success) return;

      Friendrequestform.reset();
      setIsFriendAddModal(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserClick = (findId: string) => {
    Friendrequestform.setValue("findid", findId);
    setSearchTerm(findId);
  };

  const filteredUsers = allusers?.filter(
    (user) =>
      user.find_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
      onClick={() => setIsFriendAddModal(false)}
    >
      <div
        className="bg-white p-5 rounded-lg w-3/4 md:w-1/2 h-auto overflow-auto relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center font-bold md:text-xl">友達を追加</h2>
        <div
          onClick={() => setIsFriendAddModal(false)}
          className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
        >
          <X />
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <Form {...Friendrequestform}>
            <form
              onSubmit={Friendrequestform.handleSubmit(FriendrequestonSubmit)}
              className="pt-10 flex flex-col space-y-5 md:w-full md:px-20"
            >
              <FormField
                control={Friendrequestform.control}
                name="findid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">ユーザーID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ユーザーID"
                        {...field}
                        autoComplete="off"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="max-h-40 overflow-y-auto">
                {filteredUsers?.map((user) => (
                  <div
                    key={user.id}
                    className="cursor-pointer hover:bg-gray-100 p-2"
                    onClick={() => handleUserClick(user.find_id)}
                  >
                    <p>
                      <strong>{user.name}</strong> ( {user.find_id} )
                    </p>
                  </div>
                ))}
              </div>
              <Button type="submit" className="self-center">
                リクエストを送信
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FriendAddModal;
