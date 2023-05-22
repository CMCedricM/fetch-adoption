"use client";
import LoginModal from "./modals/loginModal";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import useAuth from "./hooks/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FetchModal from "./modals/FetchModal";
const MyHeader = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [user, setUser] = useState("");
  const { signOut, checkConnection } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const userNameLocal = localStorage.getItem("user_info");
    if (userNameLocal) {
      setUser(userNameLocal);
      setOpenLogin(false);
    }
  }, []);

  const [showLogOutPrompt, setShowLogoutPrompt] = useState<boolean>(false);

  return (
    <div className="w-full flex  flex-row items-center justify-center px-10 py-2 border-b border-b-black bg-[#E0E1BC]">
      <LoginModal
        openState={[openLogin, setOpenLogin]}
        userNameHandler={[user, setUser]}
      ></LoginModal>
      <div className="grow text-[48px] text-[#2f922e] font-Rubik font-semibold">
        <h1>
          <Link href="/">Fetch</Link>
        </h1>
      </div>

      <FetchModal
        openState={[showLogOutPrompt, setShowLogoutPrompt]}
        colorScheme="bg-[#E0E1BC]"
      >
        <div className="flex flex-col gap-3 font-Rubik w-full items-center pb-2 ">
          <h1 className="font-bold text-2xl text-center">Logout</h1>
          <h2 className="font-semibold">Would You Like To Logout?</h2>
          <div className="flex flex-row items-center gap-3 w-full justify-center">
            <button
              className="items-center  bg-[#2f922e]/70 w-[20%] rounded-md p-2 font-semibold"
              onClick={async () => {
                try {
                  await signOut().then(() => {
                    setShowLogoutPrompt(false);
                    router.refresh();
                  });
                } catch (err) {
                  localStorage.removeItem("user_info");
                  console.log((err as Error).message);
                }
              }}
            >
              Yes
            </button>
            <button
              className="items-center  bg-[#2f922e]/70 w-[20%] rounded-md p-2 font-semibold"
              onClick={() => setShowLogoutPrompt(false)}
            >
              No
            </button>
          </div>
        </div>
      </FetchModal>

      {!user && (
        <button
          className="text-lg text-black font-Rubik font-semibold px-8 py-2 rounded-md bg-[#2f922e]/70 hover:bg-[#2f922e]/90"
          onClick={() => setOpenLogin(true)}
        >
          Login
        </button>
      )}
      {user && (
        <div
          className="text-lg text-black font-Rubik font-semibold px-8 py-2 rounded-md  bg-[#2f922e]/70 hover:bg-[#2f922e]/90"
          onClick={async () => {
            setShowLogoutPrompt(true);
            // try {
            //   await signOut();
            //   router.refresh();
            // } catch (err) {
            //   console.log((err as Error).message);
            // }
            // console.log("sign out");
            // setUser("");
          }}
        >
          {`Hello, ${user}`}
        </div>
      )}
    </div>
  );
};

export default MyHeader;
