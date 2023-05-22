import { Dog } from "../hooks/DogData";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as FilledInStar } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";

interface DogImageProps extends Dog {
  selectImage: [string, Dispatch<SetStateAction<string>>];

  starred?: boolean;
}

export const DogImage = ({
  id,
  img,
  name,
  age,
  zip_code,
  breed,
  selectImage,
  starred,
}: DogImageProps) => {
  const [aSelectedDog, setASelectedDogs] = selectImage;
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <div className="grid grid-rows-4 h-full w-full font-Rubik rounded-md gap-2">
      <div
        className="rounded-md flex flex-col row-span-3"
        style={{ position: "relative" }}
      >
        <Image
          src={img}
          alt=""
          fill
          sizes="(max-width: 700px) 100vw"
          className="object-contain rounded-md mt-2 p-1"
        />
      </div>

      <div className="flex w-full flex-row items-center gap-2 backdrop-blur-md bg-black/40 text-niceWhite font-bold p-2 rounded-md text-sm">
        <div className="flex flex-col items-center  text-niceWhite rounded-md">
          <button
            onClick={() => {
              setASelectedDogs(id);
              setIsSelected(!isSelected);
            }}
          >
            {starred ? (
              <FilledInStar width={40} height={40} />
            ) : (
              <StarIcon width={40} height={40} className="p-2"></StarIcon>
            )}
          </button>
        </div>
        <div className="flex-col items-center">
          <div className="flex flex-row gap-2 text-center">
            <ul className="list-disc list-inside flex flex-row gap-2 items-center justify-center">
              <li className="list-none">{name}</li>
              <li>{`${age} ${age > 1 ? "years" : "year"} `}</li>
            </ul>
          </div>
          <div className="flex flex-row gap-2">
            <ul className="list-disc list-inside flex flex-row gap-2 items-center justify-center">
              <li className="list-none">{breed}</li>
              <li>{zip_code}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
