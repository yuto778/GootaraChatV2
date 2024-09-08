"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BackIconProps {
  className?: string;
}

const BackIcon: React.FC<BackIconProps> = ({ className }) => {
  const router = useRouter();

  const onback = () => {
    router.back();
  };
  return (
    <div
      className={cn(
        "bg-slate-400 bg-opacity-85 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer",
        className
      )}
    >
      <ArrowLeft onClick={onback} />
    </div>
  );
};

export default BackIcon;
