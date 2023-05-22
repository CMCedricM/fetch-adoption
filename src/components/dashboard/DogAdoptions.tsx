import { useDogData } from "../hooks/DogData";
import { authConnection } from "../hooks/authentication";
import { type Dog } from "../hooks/DogData";
import { useEffect, useState } from "react";
import { DogImage } from "../modals/DogImages";
import { SetStateAction, Dispatch } from "react";

type DogAdoptionProps = {
  showNextPage: [boolean, Dispatch<SetStateAction<boolean>>];
  showPreviousPage: [boolean, Dispatch<SetStateAction<boolean>>];
  setPageNumber: [number, Dispatch<SetStateAction<number>>];
};

export const DogAdoptions = ({
  showNextPage,
  showPreviousPage,
  setPageNumber,
}: DogAdoptionProps) => {
  const { getDogIds, getDogData, getNextPagOfDogsIDs } = useDogData({
    auth: authConnection,
  });
  const [dogIds, setDogIds] = useState<string[]>();
  const [DogsInfoStorage, setDogInfo] = useState<Dog[]>();
  const [imageThumbnails, setImageThumbnails] = useState<JSX.Element[]>();
  const [selectedDogs, setSelectedDogs] = useState<Array<string>>([]);
  const [aSelect, setASelect] = useState<string>("");

  // Page Controllers
  const [page, setPage] = setPageNumber;
  const [loadNextPage, setLoadNextPage] = showNextPage;
  const [nextPgPointer, setNextPagePointer] = useState<string>();

  const [loadPreviousPage, setLoadPreviousPage] = showPreviousPage;
  const [prevPgPointer, setPreviousPagePointer] = useState<string>();

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
    if (
      (nextPgPointer || prevPgPointer) &&
      (loadNextPage || loadPreviousPage)
    ) {
      getNextPagOfDogsIDs({
        nextPg:
          nextPgPointer && loadNextPage
            ? nextPgPointer
            : prevPgPointer && loadPreviousPage
            ? prevPgPointer
            : "",
      })
        .then((data) => {
          // Set our page pointers/URLS
          setPreviousPagePointer(data.prev);
          setNextPagePointer(data.next);
          // Map our new data
          const newData = [data.resultIds];
          if (dogIds) {
            setDogIds(newData.flat());
            loadPreviousPage ? setPage(page - 1) : setPage(page + 1);
          }

          // console.log("herehehreh");
          // console.log(newData.flat());
        })
        .catch((error) => {
          console.log(error);
        });
      // Reset the state
      setLoadNextPage(false);
      setLoadPreviousPage(false);
    }
  }, [loadNextPage, loadPreviousPage]);

  useEffect(() => {
    if (aSelect && selectedDogs.indexOf(aSelect) == -1) {
      console.log("apended");
      setSelectedDogs([...selectedDogs, aSelect]);
    } else if (aSelect && selectedDogs.indexOf(aSelect) != -1) {
      console.log(aSelect);
      const temp: string[] = [];
      selectedDogs.forEach((val, idx) => {
        if (val != aSelect) {
          temp.push(val);
        }
      });
      setSelectedDogs(temp);
    }
    setASelect("");
  }, [aSelect]);

  useEffect(() => {
    if (DogsInfoStorage) {
      createImageThumbnails(DogsInfoStorage);
    }
  }, [selectedDogs]);

  // Once we have retrieved all the dog ids, now we need to get their actual info
  useEffect(() => {
    if (dogIds) {
      getDogData(dogIds)
        .then((data) => {
          createImageThumbnails(data);
          setDogInfo(data);
        })
        .catch((err) => {
          console.log(`There was an error ${err}`);
        });
    }
  }, [dogIds]);

  // Create my array of thumbnail images
  const createImageThumbnails = (dogObj: Dog[]) => {
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
            selectImage={[aSelect, setASelect]}
            starred={selectedDogs.indexOf(val.id) != -1}
          ></DogImage>
        </div>
      );
    });
    setImageThumbnails(ImageThumbArr);
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-2 w-full h-full p-2 mx-2">
      {imageThumbnails}
    </div>
  );
};
