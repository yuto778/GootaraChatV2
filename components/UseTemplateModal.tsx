"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

interface UseTemplateModalProps {
  TemplateData:
    | {
        category: string | null;
        content: string;
        id: string;
        userId: string;
      }[]
    | null;
  setvalue: UseFormSetValue<{
    message: string;
  }>;
  setIsUseTemplateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UseTemplateModal: React.FC<UseTemplateModalProps> = ({
  TemplateData,
  setvalue,
  setIsUseTemplateModal,
}) => {
  const usetemplate = (message: string) => {
    return () => {
      setvalue("message", message);
      setIsUseTemplateModal(false);
    };
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
        onClick={() => setIsUseTemplateModal(false)}
      >
        <div
          className="bg-white p-8 rounded-lg w-3/4 md:w-1/3 h-1/2 md:h-2/3  overflow-auto relative flex flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => setIsUseTemplateModal(false)}
            className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
          >
            <X />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center w-full gap-5">
            {TemplateData?.map((template, index) => (
              <div
                key={index}
                onDoubleClick={usetemplate(template.content)}
                className="cursor-pointer"
              >
                <h2>{template.content}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UseTemplateModal;
