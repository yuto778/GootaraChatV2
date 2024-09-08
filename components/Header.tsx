"use client";

// /Header.tsx

import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import Slidemenu from "./Slidemenu";
import { BellIcon, HomeIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  className?: string;
  menu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ className, menu }) => {
  const [menuvariant, setMenuvariant] = useState<boolean>(false);
  const router = useRouter();

  const supabase = createClient();

  const SignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <>
      <div
        className={cn(
          "h-20 border-b-2  border-gray-600 flex items-center px-10 container",
          className
        )}
      >
        <h1 className="text-xl font-extrabold ">グータラチャット</h1>
        <span className="flex-1"></span>
        {menu && (
          <>
            <div className="sm:flex  md:gap-7 lg:gap-10 sm:gap-3 hidden">
              <Button variant={"outline"} className="bg-yello200/40 relative ">
                <HomeIcon />
                <Link href={"/home"} className="absolute inset-0"></Link>
              </Button>
              <Button variant={"outline"} className="bg-yellow-200/40 relative">
                <BellIcon />
                <Link
                  href={"/notification"}
                  className="absolute inset-0"
                ></Link>
              </Button>
              <Button variant={"outline"} className="bg-yellow-200/40 relative">
                <SettingsIcon />
                <Link href={"/setting"} className="absolute inset-0"></Link>
              </Button>
              <Button
                variant={"outline"}
                className="bg-gray-800 "
                size={"sm"}
                onClick={SignOut}
              >
                <LogOutIcon className="text-yellow-300" />
              </Button>
            </div>
            <Button
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "text-black flex flex-col gap-1 sm:hidden"
              )}
              onClick={() => setMenuvariant(!menuvariant)}
            >
              <span className="h-1 w-6 bg-black"></span>
              <span className="h-1 w-6 bg-black"></span>
              <span className="h-1 w-6 bg-black"></span>
            </Button>
            {menuvariant && (
              <Slidemenu setMenuvariant={setMenuvariant} SignOut={SignOut} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Header;
