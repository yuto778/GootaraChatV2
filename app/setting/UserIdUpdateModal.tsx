"use client";

import React from "react";
import { X } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TemplateUpdate } from "@/actions/TemplateUpdate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { Userfind_idUpdate } from "@/actions/Userfind_IdUpdate";

const UserIdUpdateformSchema = z.object({
  userid: z.string(),
});

interface UserIdUpdateModalProps {
  Userdata: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    find_id: string;
  };
  setIsUserIdUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UserIdUpdateType = z.infer<typeof UserIdUpdateformSchema>;

const UserIdUpdateModal: React.FC<UserIdUpdateModalProps> = ({
  Userdata,
  setIsUserIdUpdateModal,
}) => {
  const router = useRouter();
  const UserIdUpdateform = useForm<UserIdUpdateType>({
    resolver: zodResolver(UserIdUpdateformSchema),
    defaultValues: {
      userid: Userdata.find_id,
    },
  });

  useLockBodyScroll();

  const UserIdUpdateonSubmit = async (value: UserIdUpdateType) => {
    try {
      const updatepromise = Userfind_idUpdate(value, Userdata.id);
      await toast.promise(updatepromise, {
        loading: "少々お待ちください",
        success: "find_idの更新に成功",
        error: "エラーが発生したよ",
      });

      const result = await updatepromise;
      if (!result?.success) return;

      UserIdUpdateform.reset();
      setIsUserIdUpdateModal(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="fixed  inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 "
        onClick={() => setIsUserIdUpdateModal(false)}
      >
        <div
          className="bg-white p-5 rounded-lg w-3/4 md:w-1/2 h-auto  overflow-auto relative flex flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center  font-bold md:text-xl">IDを編集する</h2>
          <div
            onClick={() => setIsUserIdUpdateModal(false)}
            className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
          >
            <X />
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <Form {...UserIdUpdateform}>
              <form
                onSubmit={UserIdUpdateform.handleSubmit(UserIdUpdateonSubmit)}
                className="pt-10 flex flex-col space-y-5 md:w-full md:px-20 "
              >
                <FormField
                  control={UserIdUpdateform.control}
                  name="userid"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl className="">
                        <Input
                          placeholder="Userid"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="self-center">
                  更新する
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserIdUpdateModal;
