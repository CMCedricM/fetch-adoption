"use client";
import LoginModal from "./modals/loginModal";
import { useEffect, useState } from "react";
import useAuth from "./hooks/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
            try {
              await signOut();
              router.refresh();
            } catch (err) {
              console.log((err as Error).message);
            }
            console.log("sign out");
            setUser("");
          }}
        >
          {`Hello, ${user}`}
        </div>
      )}
      {/* <button
        className="flex p-3 ml-3 bg-white rounded-md"
        onClick={async () =>
          await checkConnection().catch((err) =>
            console.log((err as Error).message)
          )
        }
      >
        test endpoint
      </button> */}
    </div>
  );
};

export default MyHeader;
