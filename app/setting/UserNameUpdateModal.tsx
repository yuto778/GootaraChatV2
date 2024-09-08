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
import { UserNameUpdate } from "@/actions/UserNameUpdate";

const UsernameUpdateformSchema = z.object({
  username: z.string().min(1),
});

interface UsernameUpdateModalProps {
  Userdata: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
  };
  setIsUsernameUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UsernameUpdateType = z.infer<typeof UsernameUpdateformSchema>;

const UserNameUpdateModal: React.FC<UsernameUpdateModalProps> = ({
  Userdata,
  setIsUsernameUpdateModal,
}) => {
  const router = useRouter();
  const UsernameUpdateform = useForm<UsernameUpdateType>({
    resolver: zodResolver(UsernameUpdateformSchema),
    defaultValues: {
      username: Userdata.name,
    },
  });

  useLockBodyScroll();

  const UsernameUpdateonSubmit = async (value: UsernameUpdateType) => {
    try {
      const updatepromise = UserNameUpdate(value, Userdata.id);

      await toast.promise(updatepromise, {
        loading: "少々お待ちください",
        success: "名前の変更に成功しました",
        error: "名前の編集に失敗しました",
      });

      const result = await updatepromise;

      if (!result?.success) {
      }

      UsernameUpdateform.reset();
      setIsUsernameUpdateModal(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="fixed  inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 "
        onClick={() => setIsUsernameUpdateModal(false)}
      >
        <div
          className="bg-white p-5 rounded-lg w-3/4 md:w-1/2 h-auto  overflow-auto relative flex flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center  font-bold md:text-xl">名前を編集する</h2>
          <div
            onClick={() => setIsUsernameUpdateModal(false)}
            className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
          >
            <X />
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <Form {...UsernameUpdateform}>
              <form
                onSubmit={UsernameUpdateform.handleSubmit(
                  UsernameUpdateonSubmit
                )}
                className="pt-10 flex flex-col space-y-5 md:w-full md:px-20 "
              >
                <FormField
                  control={UsernameUpdateform.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Username"
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

export default UserNameUpdateModal;
