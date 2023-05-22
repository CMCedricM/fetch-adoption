import { useDogData } from "../hooks/DogData";
import { authConnection } from "../hooks/authentication";
import { type Dog } from "../hooks/DogData";
import { useEffect, useState } from "react";
import { DogImage } from "../modals/DogImages";
import { SetStateAction, Dispatch } from "react";

type DogAdoptionProps = {
  showNextPage: [boolean, Dispatch<SetStateAction<boolean>>];
};

export const DogAdoptions = ({ showNextPage }: DogAdoptionProps) => {
  const { getDogIds, getDogData, getNextPagOfDogsIDs } = useDogData({
    auth: authConnection,
  });
  const [dogIds, setDogIds] = useState<string[]>();
  const [imageThumbnails, setImageThumbnails] = useState<JSX.Element[]>();

  const [loadNextPage, setLoadNextPage] = showNextPage;
  const [nextPgPointer, setNextPagePointer] = useState<string>();

  //   We can assume we're authenticated here, so just get the Dogs
  useEffect(() => {
    getDogIds().then((data) => {
      setNextPagePointer(data.next);
      setDogIds(data.resultIds);
    });
  }, []);

  // This is where we will call to get another page of dogs
  // TODO: Bad request because array is over the length of 100
  useEffect(() => {
    if (nextPgPointer && loadNextPage) {
      getNextPagOfDogsIDs({ nextPg: nextPgPointer })
        .then((data) => {
          setNextPagePointer(data.next);
          const newData = [data.resultIds];
          if (dogIds) setDogIds(newData.flat());
          console.log("herehehreh");
          console.log(newData.flat());
        })
        .catch((error) => {
          console.log(error);
        });
      setLoadNextPage(false);
    }
  }, [loadNextPage]);

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
    <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-2 w-full h-full p-2 mx-2">
      {imageThumbnails}
    </div>
  );
};
