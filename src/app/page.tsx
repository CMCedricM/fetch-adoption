import Image from "next/image";
import dogImage from "../srcImages/golden-retriever.jpg";
import largerDogImage from "../srcImages/dog-image-1.jpg";
import smallDogImage from "../srcImages/dog-6289929_960_720.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="md:h-[88vh] flex flex-col items-center">
      <div className="flex justify-center w-full h-full px-3 lg:pb-2 md:p-3">
        <div
          className="z-2 h-[50%] mt-[12vh] ml-[4vw] md:mt-[15vh] md:ml-[11vh] px-3 flex flex-col gap-2 items-start md:items-center
        justify-center absolute w-[50%] text-[#00ff15] md:text-[#40e024] text-center"
        >
          <h1 className="text-[60px] lg:text-[60px] font-bold w-[50%] drop-shadow-lg md:bg-black/40 rounded-md">
            Find Your
          </h1>
          <h1
            className="text-[60px] lg:text-[60px] font-bold font-Rubik 
          w-[50%] text-[#36965] drop-shadow-lg md:bg-black/40 rounded-md"
          >
            Best Friend
          </h1>

          <Link
            href="/home"
            className=" w-[80%] md:w-[30%] backdrop-blur-md  bg-[#40e024]/80 pt-4 pb-3 px-2
              rounded-xl text-black text-lg font-bold font-Rubik  hover:bg-[#40e024]/60 drop-shadow-lg ml-[3vw] md:ml-0 "
          >
            <button>{`Let's Play Fetch!`} </button>
          </Link>
        </div>

        <Image
          src={dogImage}
          alt=""
          className="object-center w-full h-full rounded-md invisible md:visible"
        ></Image>
        <Image
          src={smallDogImage}
          alt=""
          className="absolute w-[100vw] h-[100vh] object-center md:hidden"
          style={{
            zIndex: -1,
          }}
        ></Image>
      </div>
    </main>
  );
}
