import { NextPage } from "next";
import { useEffect, useState } from "react";
import FilterSideBar from "@/components/dashboard/filterSideBar";
import LoginModal from "@/components/modals/loginModal";
import { useRouter } from "next/navigation";
import { authConnection } from "@/components/hooks/authentication";
import useAuth from "@/components/hooks/authentication";
import { useDogData } from "@/components/hooks/DogData";
import { DogAdoptions } from "@/components/dashboard/adoptionSection";

const AdoptionPage = () => {
  // Main states
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [reload, setReload] = useState(false);

  const { checkConnection } = useAuth();
  const { getBreeds } = useDogData({ auth: authConnection });
  // Dog Data States
  const [breedData, setBreedData] = useState<Array<string>>([]);
  const [getNextPage, setGetNextPage] = useState<boolean>(false);

  // Filtering
  const [filterBy, setFilterBy] = useState<string>("");

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
    <div className="flex flex-col w-full h-full p-5">
      <LoginModal
        openState={[showLoginModal, setShowLoginModal]}
        title="Login To Continue"
        preventClosing={true}
        reload={[reload, setReload]}
      ></LoginModal>
      <div section-label={"adoption-area"} className="flex flex-row">
        <FilterSideBar
          filterSetting={[filterBy, setFilterBy]}
          className="w-[10%] h-[80vh] bg-[#659B78] ml-2 rounded-md font-Rubik sticky top-[11vh] p-2"
          breedsData={[breedData, setBreedData]}
        />

        {isConnected && (
          <DogAdoptions
            showNextPage={[getNextPage, setGetNextPage]}
          ></DogAdoptions>
        )}
      </div>
      <div
        section-label={"button-area"}
      className="flex flex-row items-center mx-2 p-2"
      >
        {isConnected && (
          <div className=" w-full flex flex-row items-center justify-center">
            <button
              className="p-2 px-3 bg-[#2f922e] rounded-md"
              onClick={() => {
                setGetNextPage(true);
              }}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionPage;
