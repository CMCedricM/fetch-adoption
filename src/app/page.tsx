import Image from "next/image";
import dogImage from "../srcImages/golden-retriever.jpg";
import largerDogImage from "../srcImages/dog-image-1.jpg";
import smallDogImage from "../srcImages/dog-6289929_960_720.jpg";

export default function Home() {
  return (
    <main className="md:h-[88vh] flex flex-col items-center">
      <div className="flex justify-center w-full h-full px-3 lg:pb-0 pb-3">
        <div className="z-2 mt-[8vh] ml-[2vh] md:mt-[11vh] md:ml-[11vh] px-3 flex flex-col items-start justify-center absolute  w-[50%] text-[#00ff15] md:text-[#40e024]">
          <h1 className="text-[60px] lg:text-[72px] font-bold w-[50%] lg:w-full drop-shadow-lg">
            Find Your
          </h1>
          <h1 className="text-[60px] lg:text-[72px] lg:ml-[12vh] font-bold font-Rubik w-[50%] lg:w-full text-[#36965] drop-shadow-lg">
            Best Friend
          </h1>
          <div className="items-center w-full text-center mt-5 ">
            <div>
              <button
                className=" w-[80%] lg:w-[25%] backdrop-blur-md  bg-[#40e024]/80 pt-4 pb-3 px-2
              rounded-xl text-black text-lg font-bold font-Rubik  hover:bg-[#40e024]/60 drop-shadow-lg"
              >
                {`Let's Play Fetch!`}
              </button>
            </div>
          </div>
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
