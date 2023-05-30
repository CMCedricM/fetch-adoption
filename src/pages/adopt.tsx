import { NextPage } from "next";
import { useEffect, useState } from "react";
import FilterSideBar from "@/components/dashboard/filterSideBar";
import LoginModal from "@/components/modals/loginModal";
import { useRouter } from "next/navigation";
import { authConnection } from "@/components/hooks/authentication";
import useAuth from "@/components/hooks/authentication";
import { useDogData } from "@/components/hooks/DogData";
import { DogAdoptions } from "@/components/dashboard/DogAdoptions";
import MatchMe from "@/components/dashboard/MatchMe";
import { CurrencyEuroIcon } from "@heroicons/react/24/outline";

export enum FilterOptionTypes {
  breedAZ = "breed:asc",
  breedZA = "breed:desc",
  ageAsc = "age:asc",
  ageDsc = "age:desc",
  none = "",
}

const AdoptionPage = () => {
  // Main states
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [reload, setReload] = useState(false);

  const { checkConnection } = useAuth();
  const { getBreeds } = useDogData({ auth: authConnection });
  // Dog Data States
  const [breedData, setBreedData] = useState<Array<string>>([]);

  // Dog Pages
  const [getNextPage, setGetNextPage] = useState<boolean>(false);
  const [getPreviousPage, setGetPreviousPage] = useState<boolean>(false);
  const [currentPageNumber, setcurrentPageNumber] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [pagesCountShown, setPagesCountShown] = useState<JSX.Element[]>([]);
  const [goToSpecificPage, setSpecificPage] = useState<number>(0);

  const [showNextButton, setShowNextButton] = useState<boolean>(true);

  // Filtering
  const [filterBy, setFilterBy] = useState<FilterOptionTypes>(
    FilterOptionTypes.breedAZ
  );
  const [selectedBreeds, setSelectBreeds] = useState<string[]>([]);
  const [displayAlphaOrder, setDisplayAlphaOrder] = useState<boolean>(false);

  // Dogs to find a match from
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);

  //  Generate Pages Count at bottom
  useEffect(() => {
    const maxBehind = 3;
    const jsxArray: JSX.Element[] = [];
    let numberArr: number[] = [currentPageNumber];
    for (let i = currentPageNumber; i < maxBehind + currentPageNumber; i++) {
      const lastNumber = numberArr.at(numberArr.length - 1);
      const frontNumber = numberArr.at(0);
      numberArr = [
        frontNumber ? Number(frontNumber - 1) : 0,
        ...numberArr,
        lastNumber ? Number(lastNumber + 1) : 0,
      ];
    }

    if (currentPageNumber != Math.ceil(pagesCount)) {
      const lastNumber = numberArr.at(numberArr.length - 1);
      numberArr = [...numberArr, lastNumber ? lastNumber + 1 : 0];
    } else if (currentPageNumber == Math.ceil(pagesCount)) {
      numberArr = numberArr.filter((val) => val <= pagesCount);
    }

    // Remove Duplicates and Zeros
    numberArr = numberArr.sort((a, b) => {
      if (Number(a) > Number(b)) {
        return 1;
      } else if (Number(a) < Number(b)) {
        return 0;
      } else {
        return -1;
      }
    });
    numberArr = numberArr.filter((val, idx) => {
      return (
        val != 0 &&
        numberArr.indexOf(val) == idx &&
        val <= Math.ceil(pagesCount)
      );
    });
    // Pre Append the elipses if necessary
    if (numberArr.indexOf(1) == -1) {
      jsxArray.push(<div key={0}>...</div>);
    }
    // Now Push to the Array
    numberArr.forEach((val, idx) => {
      jsxArray.push(
        <div
          key={idx + 1}
          className={`${
            currentPageNumber == val ? "border-2 rounded-md px-2" : ""
          } cursor-pointer`}
          onClick={() => setSpecificPage(val)}
        >
          {val}
        </div>
      );
    });

    // Add Ellipses at end if necessary
    if (numberArr.indexOf(Math.ceil(pagesCount)) == -1) {
      jsxArray.push(<div key={pagesCount + 1}>...</div>);
    }

    setPagesCountShown(jsxArray);
  }, [pagesCount, currentPageNumber]);

  // If a Specific Breed Is Selected From the filter, then disable the alpha sort
  useEffect(() => {
    if (selectedBreeds.length == 0) {
      setDisplayAlphaOrder(true);

      console.log("disabled alpha");
    } else {
      setDisplayAlphaOrder(false);
      console.log("enabled alpha");
    }
  }, [selectedBreeds]);

  const router = useRouter();

  // On page load, check if the user is logged in
  useEffect(() => {
    checkConnection()
      .then((loggedInStatus) => {
        const user = localStorage.getItem("user_info");
        if (user && loggedInStatus) {
          setIsConnected(true);
        } else {
          setShowLoginModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Trigger reload if user logged in
  useEffect(() => {
    if (reload) {
      router.refresh();
      setReload(false);
    }
  }, [reload, router]);

  // Once Auth is Checked, query breeds and dogs
  useEffect(() => {
    if (isConnected) {
      getBreeds()
        .then((data) => {
          setBreedData(data.sort());
        })
        .catch((err) => console.log(err));
    }
  }, [isConnected]);

  return (
    <div className="flex flex-col w-full h-full p-5 font-Rubik">
      <LoginModal
        openState={[showLoginModal, setShowLoginModal]}
        title="Login To Continue"
        preventClosing={true}
        reload={[reload, setReload]}
      ></LoginModal>
      <div className="flex flex-col w-full">
        <div
          section-label={"adoption-area"}
          className="flex flex-col md:flex-row"
        >
          {isConnected && (
            <div className="md:flex flex-col gap-3 p-2">
              <div className="flex flex-col items-center gap-4 sticky top-[11vh] ">
                <FilterSideBar
                  filterSetting={[filterBy, setFilterBy]}
                  className="w-full h-max bg-[#659B78] ml-2 rounded-md font-Rubik p-2"
                  breedsData={[breedData, setBreedData]}
                  breedSelection={[selectedBreeds, setSelectBreeds]}
                  controlAlphaOrder={[displayAlphaOrder, setDisplayAlphaOrder]}
                />
                <MatchMe
                  selectedDogs={[selectedDogs, setSelectedDogs]}
                ></MatchMe>
              </div>
            </div>
          )}

          {isConnected && (
            <DogAdoptions
              pagNumberCount={[pagesCount, setPagesCount]}
              specificPageNumber={[goToSpecificPage, setSpecificPage]}
              showNextPage={[getNextPage, setGetNextPage]}
              showPreviousPage={[getPreviousPage, setGetPreviousPage]}
              setPageNumber={[currentPageNumber, setcurrentPageNumber]}
              filterOptions={[filterBy, setFilterBy]}
              selectedBreedContoller={[selectedBreeds, setSelectBreeds]}
              arrayOfSelectedDogIds={[selectedDogs, setSelectedDogs]}
            ></DogAdoptions>
          )}
        </div>
      </div>
      <div
        section-label={"button-area"}
        className="flex flex-row items-center mx-2 p-2 w-full "
      >
        {isConnected && (
          <div className="w-full flex flex-row items-center justify-center gap-5">
            {currentPageNumber > 1 && (
              <button
                className="p-2 px-3 bg-[#2f922e] rounded-md"
                data-test="previous_page"
                onClick={() => {
                  setGetPreviousPage(true);
                }}
              >
                Previous
              </button>
            )}
            {/* Show Pages Numebrs Here */}
            <div className="flex flex-row  gap-2 p-2  overflow-hidden ">
              {pagesCountShown && pagesCountShown}
            </div>
            {showNextButton && currentPageNumber != pagesCount && (
              <button
                className="p-2 px-7 bg-[#2f922e] rounded-md"
                onClick={() => {
                  setGetNextPage(true);
                }}
                data-test="next_page"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionPage;
