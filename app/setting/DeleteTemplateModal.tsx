"use client";

import { DeleteTemplate } from "@/actions/DeleteTemplate";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface DeleteTemplateModalProps {
  setIsDeleteTemplateModal: React.Dispatch<React.SetStateAction<boolean>>;
  template: {
    category: string | null;
    content: string;
    id: string;
    userId: string;
  };
}

const DeleteTemplateModal: React.FC<DeleteTemplateModalProps> = ({
  setIsDeleteTemplateModal,
  template,
}) => {
  const router = useRouter();
  const DeleteTemplateonsubmit = async () => {
    try {
      const Deletepromise = DeleteTemplate(template.id);

      await toast.promise(Deletepromise, {
        loading: "少々お待ちください",
        success: "定型文の削除に成功",
        error: "定型文の削除に失敗",
      });

      const result = await Deletepromise;
      if (!result.success) {
        toast.error(result.message);
      }

      setIsDeleteTemplateModal(false);
      router.refresh();
    } catch (error) {}
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
        onClick={() => setIsDeleteTemplateModal(false)}
      >
        <div
          className="bg-white p-5 rounded-lg w-3/4 h-auto  overflow-auto relative flex flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center text-xl font-bold">定型文を削除する</h2>
          <div
            onClick={() => setIsDeleteTemplateModal(false)}
            className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
          >
            <X />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center w-full pt-10 space-y-10">
            <h2 className="font-extrabold">{template.content}</h2>
            <Button variant={"destructive"} onClick={DeleteTemplateonsubmit}>
              削除する
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteTemplateModal;
