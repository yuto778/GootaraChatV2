"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [menuvariant, setMenuvariant] = useState<boolean>(false);
  return (
    <>
      <div className="h-16 border-b-2  border-gray-600 flex items-center px-10 container">
        <h1 className="text-xl font-extrabold"> グータラチャットv2</h1>
        <span className="flex-1"></span>
        <Button variant={"ghost"} className="bg-yellow-100 hidden md:block">
          ログアウト
        </Button>
        <Button
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "text-black"
          )}
          onClick={() => setMenuvariant(!menuvariant)}
        >
          メニュー
        </Button>
        {menuvariant && (
          <div className="w-12 h-12 animate-in slide-in-from-bottom-80 fixed top-16 right-16">
            <h2>メニューです</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
