import { useDogData } from "../hooks/DogData";
import { authConnection } from "../hooks/authentication";
import { type Dog } from "../hooks/DogData";
import { useEffect, useState } from "react";
import { DogImage } from "../modals/DogImages";
import { SetStateAction, Dispatch } from "react";
import { FilterOptionTypes } from "@/pages/adopt";

const dogsPerPage = 15;

type DogAdoptionProps = {
  showNextPage: [boolean, Dispatch<SetStateAction<boolean>>];
  showPreviousPage: [boolean, Dispatch<SetStateAction<boolean>>];
  setPageNumber: [number, Dispatch<SetStateAction<number>>];
  pagNumberCount: [number, Dispatch<SetStateAction<number>>];
  specificPageNumber: [number, Dispatch<SetStateAction<number>>];
  filterOptions: [
    FilterOptionTypes,
    Dispatch<SetStateAction<FilterOptionTypes>>
  ];
  selectedBreedContoller: [string[], Dispatch<SetStateAction<string[]>>];
  arrayOfSelectedDogIds: [string[], Dispatch<SetStateAction<string[]>>];
  zipCodeLocation: [number, Dispatch<SetStateAction<number>>];
};

export const DogAdoptions = ({
  showNextPage,
  showPreviousPage,
  setPageNumber,
  pagNumberCount,
  filterOptions,
  selectedBreedContoller,
  arrayOfSelectedDogIds,
  specificPageNumber,
  zipCodeLocation,
}: DogAdoptionProps) => {
  const { getDogIds, getDogData, getNextPagOfDogsIDs, findDogs, dogsTotal } =
    useDogData({
      auth: authConnection,
    });
  const [dogIds, setDogIds] = useState<string[]>();
  const [DogsInfoStorage, setDogInfo] = useState<Dog[]>();
  const [imageThumbnails, setImageThumbnails] = useState<JSX.Element[]>();
  const [selectedDogs, setSelectedDogs] = arrayOfSelectedDogIds;
  const [aSelect, setASelect] = useState<string>("");

  // Page Controllers
  const [page, setPage] = setPageNumber;
  const [pageNumbers, setPageNumbers] = pagNumberCount;
  const [loadNextPage, setLoadNextPage] = showNextPage;
  const [nextPgPointer, setNextPagePointer] = useState<string>();
  const [specificPage, setSpecificPage] = specificPageNumber;

  const [loadPreviousPage, setLoadPreviousPage] = showPreviousPage;
  const [prevPgPointer, setPreviousPagePointer] = useState<string>();

  const [cursor, setCursor] = useState<string>("");

  // Filter Controller
  const [filterBy, setFilterBy] = filterOptions;
  const [selectedBreed, setSelectedBreed] = selectedBreedContoller;
  const [zipCode, setZipCode] = zipCodeLocation;

  // UseEffect to listen to page changes
  // This gets a certain page of the dog
  useEffect(() => {
    setCursor(page.toString());

    findDogs({
      breeds: !zipCode ? selectedBreed : [],
      zipCodes: zipCode ? [zipCode] : undefined,
      size: 15,
      sort: filterBy,
      from: (specificPage * dogsPerPage - dogsPerPage).toString(),
    })
      .then((data) => {
        // Set our page pointers/URLS
        setPage(specificPage);
        setPreviousPagePointer(data.prev);
        setNextPagePointer(data.next);
        // Map our new data
        const newData = [data.resultIds];
        if (dogIds) {
          setDogIds(newData.flat());
          window.scrollTo(0, 0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [specificPage]);

  //   We can assume we're authenticated here, so just get the Dogs ==> Do this on page load
  useEffect(() => {
    getDogIds().then((data) => {
      setNextPagePointer(data.next);
      setDogIds(data.resultIds);
    });
  }, []);

  // Every Time we send a query we need to check the count of the pages and update page numbers as necessary
  useEffect(() => {
    console.log("Total Changed");
    setPageNumbers(Math.ceil(dogsTotal / 15));
  }, [dogsTotal]);

  // If we  are given a selected breed, filter the results by the current filter, and get the dogs
  useEffect(() => {
    if (selectedBreed && zipCode <= 0) {
      findDogs({ breeds: selectedBreed, size: 15, sort: filterBy }).then(
        (data) => {
          setPage(1);
          setPreviousPagePointer("");
          setNextPagePointer(data.next);
          setDogIds(data.resultIds);
        }
      );
    } else if (zipCode) {
      findDogs({ size: 15, sort: filterBy, zipCodes: [zipCode] }).then(
        (data) => {
          setPage(1);
          setPreviousPagePointer("");
          setNextPagePointer(data.next);
          setDogIds(data.resultIds);
        }
      );
    } else {
      getDogIds(filterBy).then((data) => {
        setPage(1);
        setPreviousPagePointer("");
        setNextPagePointer(data.next);
        setDogIds(data.resultIds);
      });
    }
  }, [selectedBreed, filterBy, zipCode]);

  // This is where we will call to get another page of dogs
  useEffect(() => {
    if (
      (nextPgPointer || prevPgPointer) &&
      (loadNextPage || loadPreviousPage)
    ) {
      getNextPagOfDogsIDs(
        {
          nextPg:
            nextPgPointer && loadNextPage
              ? nextPgPointer
              : prevPgPointer && loadPreviousPage
              ? prevPgPointer
              : "",
        },
        filterBy
      )
        .then((data) => {
          // Set our page pointers/URLS
          setPreviousPagePointer(data.prev);
          setNextPagePointer(data.next);
          // Map our new data
          const newData = [data.resultIds];
          if (dogIds) {
            setDogIds(newData.flat());
            loadPreviousPage ? setPage(page - 1) : setPage(page + 1);
            window.scrollTo(0, 0);
          }
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
      setSelectedDogs([...selectedDogs, aSelect]);
    } else if (aSelect && selectedDogs.indexOf(aSelect) != -1) {
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

  // Handle Filtering
  useEffect(() => {}, [filterBy]);

  // Create my array of thumbnail images
  const createImageThumbnails = (dogObj: Dog[]) => {
    const ImageThumbArr = dogObj.map((val, idx) => {
      return (
        <div
          key={val.id}
          data-test={val.id}
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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 w-full h-full p-2 mx-2">
      {imageThumbnails}
    </div>
  );
};
