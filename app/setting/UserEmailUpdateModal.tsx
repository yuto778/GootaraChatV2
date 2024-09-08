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
import { UserEmailUpdate } from "@/actions/UserEmailUpdate";

const UserEmailUpdateformSchema = z.object({
  email: z.string().email(),
});

interface UserEmailUpdateModalProps {
  Userdata: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    find_id: string;
  };
  setIsUserEmailUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UserEmailUpdateType = z.infer<typeof UserEmailUpdateformSchema>;

const UserEmailUpdateModal: React.FC<UserEmailUpdateModalProps> = ({
  Userdata,
  setIsUserEmailUpdateModal,
}) => {
  const router = useRouter();
  const UserEmailUpdateform = useForm<UserEmailUpdateType>({
    resolver: zodResolver(UserEmailUpdateformSchema),
    defaultValues: {
      email: Userdata.email,
    },
  });

  useLockBodyScroll();

  const UserEmailUpdateonSubmit = async (value: UserEmailUpdateType) => {
    try {
      const updatepromise = UserEmailUpdate(value, Userdata.id);

      await toast.promise(updatepromise, {
        loading: "少々お待ちください",
        success: "メールアドレスの編集に成功しました",
        error: "メールアドレスの編集に失敗したよ",
      });

      const result = await updatepromise;

      if (!result.success) {
      }

      UserEmailUpdateform.reset();
      setIsUserEmailUpdateModal(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="fixed  inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 "
        onClick={() => setIsUserEmailUpdateModal(false)}
      >
        <div
          className="bg-white p-5 rounded-lg w-3/4 md:w-1/2 h-auto  overflow-auto relative flex flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center  font-bold md:text-xl">
            メールアドレスを編集する
          </h2>
          <div
            onClick={() => setIsUserEmailUpdateModal(false)}
            className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
          >
            <X />
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <Form {...UserEmailUpdateform}>
              <form
                onSubmit={UserEmailUpdateform.handleSubmit(
                  UserEmailUpdateonSubmit
                )}
                className="pt-10 flex flex-col space-y-5 md:w-full md:px-20 "
              >
                <FormField
                  control={UserEmailUpdateform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
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

export default UserEmailUpdateModal;
