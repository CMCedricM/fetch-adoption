import { useDogData } from "../hooks/DogData";
import { authConnection } from "../hooks/authentication";
import { type Dog } from "../hooks/DogData";
import { useEffect, useState } from "react";
import { DogImage } from "../modals/dogImages";

export const DogAdoptions = () => {
  const { getDogIds, getDogData } = useDogData({ auth: authConnection });
  const [dogIds, setDogIds] = useState<Array<string>>();

  const [dogs, setDogs] = useState<Array<Dog>>();

  const [imageThumbnails, setImageThumbnails] = useState<JSX.Element[]>();

  //   We can assume we're authenticated here, so just get the Dogs
  useEffect(() => {
    getDogIds().then((data) => {
      setDogIds(data.resultIds);
    });
  }, []);

  // Once we have retrieved all the dog ids, now we need to get their actual info
  useEffect(() => {
    if (dogIds) {
      getDogData(dogIds)
        .then((data) => {
          createImageThumbnails(data);
        })
        .catch((err) => {
          console.log(`There was an error ${err}`);
        });
    }
  }, [dogIds]);

  // Create my array of thumbnail images
  const createImageThumbnails = (dogObj: Dog[]) => {
    console.log(dogObj);
    const ImageThumbArr = dogObj.map((val, idx) => {
      return (
        <div
          key={idx}
          className="grid-row-2 w-full rounded-md backgrop-blur-md bg-black/40 relative "
        >
          <DogImage
            id={val.id}
            img={val.img}
            zip_code={val.zip_code}
            name={val.name}
            age={val.age}
            breed={val.breed}
          ></DogImage>
        </div>
      );
    });
    console.log(ImageThumbArr);
    setImageThumbnails(ImageThumbArr);
  };

  return (
    <div className="grid grid-cols-5 gap-2 w-full h-full p-2 mx-2 border-2">
      {imageThumbnails}
    </div>
  );
};