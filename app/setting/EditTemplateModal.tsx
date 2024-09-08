"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
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
import { TemplateUpdate } from "@/actions/TemplateUpdate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TemplateUpdateformSchema = z.object({
  template: z.string(),
});

interface EditTemplateModalProps {
  setIsEditTemplateModal: React.Dispatch<React.SetStateAction<boolean>>;
  template: {
    category: string | null;
    content: string;
    id: string;
    userId: string;
  };
}

export type TemplateUpdateType = z.infer<typeof TemplateUpdateformSchema>;

const EditTemplateModal: React.FC<EditTemplateModalProps> = ({
  setIsEditTemplateModal,
  template,
}) => {
  const router = useRouter();
  const TemplateUpdateform = useForm<TemplateUpdateType>({
    resolver: zodResolver(TemplateUpdateformSchema),
    defaultValues: {
      template: template.content,
    },
  });

  const TemplateUpdateonSubmit = async (value: TemplateUpdateType) => {
    try {
      const updatepromise = TemplateUpdate(value, template.id);

      await toast.promise(updatepromise, {
        loading: "少々お待ちください",
        success: "定型文の編集に成功しました",
        error: "定型文の編集に失敗！",
      });

      const result = await updatepromise;

      if (!result.success) {
      }

      TemplateUpdateform.reset();
      setIsEditTemplateModal(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
        onClick={() => setIsEditTemplateModal(false)}
      >
        <div
          className="bg-white p-5 rounded-lg w-3/4 h-auto  overflow-auto relative flex flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center text-xl font-bold">定型文を編集する</h2>
          <div
            onClick={() => setIsEditTemplateModal(false)}
            className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
          >
            <X />
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <Form {...TemplateUpdateform}>
              <form
                onSubmit={TemplateUpdateform.handleSubmit(
                  TemplateUpdateonSubmit
                )}
                className="pt-10 flex flex-col space-y-5 "
              >
                <FormField
                  control={TemplateUpdateform.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="template"
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

export default EditTemplateModal;
