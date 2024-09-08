"use client";

import { TemplateCreateAction } from "@/actions/TemplateCreate";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

interface TemplateCreateProps {
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
  };
}

const TemplateCreateformSchema = z.object({
  template: z.string().min(1),
});

export type TemplateCreateType = z.infer<typeof TemplateCreateformSchema>;

const TemplateCreate: React.FC<TemplateCreateProps> = ({ user }) => {
  const router = useRouter();
  const TemplateCreateform = useForm<TemplateCreateType>({
    resolver: zodResolver(TemplateCreateformSchema),
    defaultValues: {
      template: "",
    },
  });

  const templatecreateonSubmit = async (value: TemplateCreateType) => {
    try {
      const templatePromise = TemplateCreateAction(value, user.id);

      await toast.promise(templatePromise, {
        loading: "少々お待ちください",
        success: "定型文の作成に成功しました",
        error: "エラーが発生しました",
      });

      const result = await templatePromise;
      TemplateCreateform.reset();
      router.refresh();
    } catch (error) {}
  };
  return (
    <>
      <Toaster />
      <div>
        <Form {...TemplateCreateform}>
          <form
            onSubmit={TemplateCreateform.handleSubmit(templatecreateonSubmit)}
            className="flex items-center gap-5"
          >
            <FormField
              control={TemplateCreateform.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ご飯いらない！！"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="self-end">
              追加する
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default TemplateCreate;
