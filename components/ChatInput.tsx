"use client";

import React from "react";
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
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, SendIcon } from "lucide-react";
import UseTemplate from "./UseTemplate";

interface ChatInputProps {
  TemplateData:
    | {
        category: string | null;
        content: string;
        id: string;
        userId: string;
      }[]
    | null;
}

const ChatformSchema = z.object({
  message: z.string().max(60),
});

type chatformType = z.infer<typeof ChatformSchema>;

const ChatInput: React.FC<ChatInputProps> = ({ TemplateData }) => {
  const Chatform = useForm<chatformType>({
    resolver: zodResolver(ChatformSchema),
    defaultValues: {
      message: "",
    },
  });

  const ChatonSubmit = async (value: chatformType) => {
    try {
    } catch (error) {}
  };
  return (
    <>
      <div className="w-full h-20 ">
        <Form {...Chatform}>
          <form
            onSubmit={Chatform.handleSubmit(ChatonSubmit)}
            className=" md:py-5 md:px-40  flex flex-col gap-2  sm:flex-row border items-center"
          >
            <FormField
              control={Chatform.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1 ">
                  <div className=" flex items-center gap-4 bg-white rounded-xl overflow-auto">
                    <FormControl className="flex-1">
                      <Input
                        placeholder="shadcn"
                        {...field}
                        className="pr-20 text-xl"
                      />
                    </FormControl>
                    <UseTemplate
                      TemplateData={TemplateData}
                      setvalue={Chatform.setValue}
                    />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-between sm:justify-normal w-full md:w-16 gap-5 container">
              <Button type="submit">
                <SendIcon />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ChatInput;
