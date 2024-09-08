"use client";

import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/database.types";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { BellIcon, HomeIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface SlidemenuProps {
  setMenuvariant: React.Dispatch<React.SetStateAction<boolean>>;
  SignOut: () => Promise<void>;
}

const Slidemenu: React.FC<SlidemenuProps> = ({ setMenuvariant, SignOut }) => {
  useLockBodyScroll();
  const [isClosing, setIsClosing] = useState(false);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuvariant(false);
    }, 500); // アニメーションの持続時間と同じにする
  };
  return (
    <div className="fixed inset-0 bg-black/80 z-30" onClick={closeMenu}>
      <div
        className={`absolute right-0 w-1/3 h-full bg-slate-100 z-50 rounded-lg py-5 px-5 flex flex-col items-center  gap-5
          ${
            isClosing
              ? "animate-out slide-out-to-right duration-500"
              : "animate-in slide-in-from-right duration-500"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">メニュー</h2>
        <div className="w-full h-full flex flex-col items-center gap-10 py-12">
          <Button className="relative bg-gray-300 hover:bg-gray-400">
            <HomeIcon className="text-black " />
            <Link href={"/home"} className="absolute inset-0"></Link>
          </Button>
          <Button className="relative bg-gray-300 hover:bg-gray-400">
            <SettingsIcon className="text-black" />
            <Link href={"/setting"} className="absolute inset-0"></Link>
          </Button>
          <Button className="relative bg-gray-300 hover:bg-gray-400">
            <BellIcon className="text-black" />
            <Link href={"/notification"} className="absolute inset-0"></Link>
          </Button>

          <span className="flex-1"></span>
          <Button onClick={SignOut}>ログアウト</Button>
        </div>
      </div>
    </div>
  );
};

export default Slidemenu;
