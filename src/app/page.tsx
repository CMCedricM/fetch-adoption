import Image from "next/image";
import dogImage from "../srcImages/dog-image.jpg";

export default function Home() {
  return (
    <main className="flex flex-col items-center font-Rubik">
      <div>
        <h1>Find Your Best Friend</h1>
      </div>
      <div className="z-[-1] fixed w-[97vw] h-[92vh]">
        <Image
          fill={true}
          src={dogImage}
          alt=""
          className="w-full h-full rounded-md"
        ></Image>
      </div>
    </main>
  );
}
