"use client";

import React, { useState } from "react";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import EditTemplateModal from "./EditTemplateModal";
import DeleteTemplateModal from "./DeleteTemplateModal";

interface SettingTemplateProps {
  template: {
    category: string | null;
    content: string;
    id: string;
    userId: string;
  };
}

const SettingTemplate: React.FC<SettingTemplateProps> = ({ template }) => {
  const [isEditTemplateModal, setIsEditTemplateModal] =
    useState<boolean>(false);
  const [isDeleteTemplateModal, setIsDeleteTemplateModal] =
    useState<boolean>(false);
  return (
    <>
      <div className="flex items-center mt-1 h-10 space-x-1" key={template.id}>
        <h2 className="truncate max-w-[180px]">{template.content}</h2>
        <div className="h-auto flex space-x-2 cursor-pointer">
          <div
            className="p-2 bg-slate-200/25 rounded-full"
            onClick={() => setIsEditTemplateModal(true)}
          >
            <Edit2Icon className="size-4" />
          </div>
          <div
            className="p-2 bg-red-700/25 rounded-full cursor-pointer"
            onClick={() => setIsDeleteTemplateModal(true)}
          >
            <Trash2Icon className="size-4" />
          </div>
        </div>
      </div>
      {isEditTemplateModal && (
        <EditTemplateModal
          setIsEditTemplateModal={setIsEditTemplateModal}
          template={template}
        />
      )}
      {isDeleteTemplateModal && (
        <DeleteTemplateModal
          setIsDeleteTemplateModal={setIsDeleteTemplateModal}
          template={template}
        />
      )}
    </>
  );
};
export default SettingTemplate;
