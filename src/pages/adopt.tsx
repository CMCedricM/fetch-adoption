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
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Filtering
  const [filterBy, setFilterBy] = useState<FilterOptionTypes>(
    FilterOptionTypes.breedAZ
  );
  const [selectedBreeds, setSelectBreeds] = useState<string[]>([]);
  const [displayAlphaOrder, setDisplayAlphaOrder] = useState<boolean>(false);

  // Dogs to find a match from
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);

  useEffect(() => {
    console.log(`Updated Selected Dogs ===>`);
    console.log(selectedDogs);
  }, [selectedDogs]);

  useEffect(() => {
    console.log(`Selected breeds changed to ${selectedBreeds}`);
    if (selectedBreeds.length == 0) {
      setDisplayAlphaOrder(true);

      console.log("disabled alpha");
    } else {
      setDisplayAlphaOrder(false);
      console.log("enabled alpha");
    }
  }, [selectedBreeds]);

  const router = useRouter();
  useEffect(() => {
    console.log("Filter was update");
  }, [filterBy]);

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
        <div section-label={"adoption-area"} className="flex flex-row">
          {isConnected && (
            <div className="md:flex flex-col gap-3 p-2 hidden">
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
              showNextPage={[getNextPage, setGetNextPage]}
              showPreviousPage={[getPreviousPage, setGetPreviousPage]}
              setPageNumber={[pageNumber, setPageNumber]}
              filterOptions={[filterBy, setFilterBy]}
              selectedBreedContoller={[selectedBreeds, setSelectBreeds]}
              arrayOfSelectedDogIds={[selectedDogs, setSelectedDogs]}
            ></DogAdoptions>
          )}
        </div>
      </div>
      <div
        section-label={"button-area"}
        className="flex flex-row items-center mx-2 p-2"
      >
        {isConnected && (
          <div className=" w-full flex flex-row items-center justify-center gap-5">
            {pageNumber > 1 && (
              <button
                className="p-2 px-3 bg-[#2f922e] rounded-md"
                onClick={() => {
                  setGetPreviousPage(true);
                }}
              >
                Previous
              </button>
            )}
            <button
              className="p-2 px-7 bg-[#2f922e] rounded-md"
              onClick={() => {
                setGetNextPage(true);
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionPage;
