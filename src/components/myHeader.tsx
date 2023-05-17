"use client";
import LoginModal from "./loginModal";
import { useState } from "react";
const MyHeader = () => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="w-full flex flex-auto flex-row items-center justify-center px-10 py-2 border-b border-b-black">
      <LoginModal openState={[openLogin, setOpenLogin]}></LoginModal>
      <div className="grow text-[48px] text-[#2f922e] font-Rubik font-semibold">
        <h1>Fetch</h1>
      </div>

      <button
        className="text-lg text-black font-Rubik font-semibold px-8 py-2 rounded-md bg-[#2f922e]/70 hover:bg-[#2f922e]/90"
        onClick={() => setOpenLogin(true)}
      >
        Login
      </button>
    </div>
  );
};

export default MyHeader;
