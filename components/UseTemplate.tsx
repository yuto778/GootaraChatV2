"use client";

import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";
import UseTemplateModal from "./UseTemplateModal";
import { UseFormSetValue } from "react-hook-form";

interface UseTemplateProps {
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
}

const UseTemplate: React.FC<UseTemplateProps> = ({
  TemplateData,
  setvalue,
}) => {
  const [isUseTemplateModal, setIsUseTemplateModal] = useState<boolean>(false);
  return (
    <>
      <div
        className="w-10 hover:scale-110 cursor-pointer transition"
        onClick={() => setIsUseTemplateModal(!isUseTemplateModal)}
      >
        <PlusCircleIcon className="" />
      </div>
      {isUseTemplateModal && (
        <UseTemplateModal
          TemplateData={TemplateData}
          setvalue={setvalue}
          setIsUseTemplateModal={setIsUseTemplateModal}
        />
      )}
    </>
  );
};

export default UseTemplate;
