import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-bl from-yellow-200 to-black flex flex-col">
        <Header />
        <main className="flex items-center flex-1 justify-center ">
          <div className=" bg-yellow-200/70 bg-opacity-80 rounded-lg w-3/4 h-auto flex flex-col items-center py-5 px-8 shadow-lg shadow-gray-400 space-y-5">
            <LoginForm />
          </div>
        </main>
      </div>
    </>
  );
}
