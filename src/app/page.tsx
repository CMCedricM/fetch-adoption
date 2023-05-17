import Image from "next/image";
import dogImage from "../srcImages/golden-retriever.jpg";
import largerDogImage from "../srcImages/dog-image-1.jpg";
import smallDogImage from "../srcImages/dog-6289929_960_720.jpg";

export default function Home() {
  return (
    <main className="md:h-[88vh] flex flex-col items-center">
      <div className="flex justify-center w-full h-full px-3 lg:pb-0 pb-3">
        <div className="mt-[10vh] px-3 flex flex-col items-start justify-center absolute  w-[50%] text-[#038900]">
          <h1 className="text-[64px] lg:text-[72px] font-bold w-[50%] lg:w-full">
            Find Your
          </h1>
          <h1 className="text-[64px] lg:text-[72px] lg:ml-[12vh] font-bold font-Rubik w-[50%] lg:w-full ">
            Best Friend
          </h1>
          <div className="items-center w-full text-center mt-5  ">
            <div>
              <button
                className=" w-[50%] lg:w-[25%] backdrop-blur-md  bg-[#36965C]/30 p-4 
              rounded-xl text-[#7AE868] text-lg font-bold font-Rubik hover:text-[#174b0f] hover:bg-[#038900]/30"
              >
                {`Let's Play Fetch!`}
              </button>
            </div>
          </div>
        </div>
        <Image
          src={dogImage}
          alt=""
          className="z-1 object-center w-full h-full rounded-md"
        ></Image>
      </div>
    </main>
  );
}
