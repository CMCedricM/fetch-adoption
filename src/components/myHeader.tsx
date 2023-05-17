"use client";
import LoginModal from "./loginModal";
import { useEffect, useState } from "react";
import useAuth from "./functions/endpoints";
const MyHeader = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [user, setUser] = useState("");

  return (
    <div className="w-full flex flex-auto flex-row items-center justify-center px-10 py-2 border-b border-b-black">
      <LoginModal
        openState={[openLogin, setOpenLogin]}
        userNameHandler={[user, setUser]}
      ></LoginModal>
      <div className="grow text-[48px] text-[#2f922e] font-Rubik font-semibold">
        <h1>Fetch</h1>
      </div>

      {!user && (
        <button
          className="text-lg text-black font-Rubik font-semibold px-8 py-2 rounded-md bg-[#2f922e]/70 hover:bg-[#2f922e]/90"
          onClick={() => setOpenLogin(true)}
        >
          Login
        </button>
      )}
      {user && (
        <div className="text-lg text-black font-Rubik font-semibold px-8 py-2 rounded-md  bg-[#2f922e]/70 hover:bg-[#2f922e]/90">
          {`Hello, ${user}`}
        </div>
      )}
    </div>
  );
};

export default MyHeader;
