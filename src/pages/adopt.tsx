import { NextPage } from "next";
import { useEffect, useState } from "react";
import FilterSideBar from "@/components/dashboard/filterSideBar";
import LoginModal from "@/components/modals/loginModal";
import { useRouter } from "next/navigation";
import { authConnection } from "@/components/hooks/authentication";
import useAuth from "@/components/hooks/authentication";
import { useDogData } from "@/components/hooks/DogData";

const AdoptionPage = () => {
  const [filterBy, setFilterBy] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [reload, setReload] = useState(false);

  const { checkConnection, isLoggedIn } = useAuth();
  const { getBreeds, breeds } = useDogData({ auth: authConnection });

  const [breedData, setBreedData] = useState<Array<string>>([]);

  // Do this on page startup
  useEffect(() => {
    const user = localStorage.getItem("user_info");
    try {
      if (!checkConnection || !user) {
        setBreedData([]);
        setShowLoginModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // This should be done once the user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      getBreeds().catch((err) => {
        console.log(`There was an error ${err}`);
      });
    } else {
      setBreedData([]);
    }
  }, [isLoggedIn]);

  // Once the user has logged in and the breeds have been fetched we will need to save the breeds
  useEffect(() => {
    if (breeds) {
      setBreedData(breeds);
    }
    console.log(breeds);
  }, [breeds]);
  const router = useRouter();

  useEffect(() => {
    if (reload) {
      router.refresh();
      setReload(false);
    }
  }, [reload, router]);

  return (
    <div className="flex flex-col w-full h-full">
      <LoginModal
        openState={[showLoginModal, setShowLoginModal]}
        title="Login To Continue"
        preventClosing={true}
        reload={[reload, setReload]}
      ></LoginModal>
      <div section-label={"adoption-area"} className="flex flex-row">
        <FilterSideBar
          filterSetting={[filterBy, setFilterBy]}
          className="w-[10%] h-[80vh] bg-[#659B78] ml-2 rounded-md font-Rubik"
          breedsData={[breedData, setBreedData]}
        />
      </div>
      <div section-label={"button-area"}></div>
    </div>
  );
};

export default AdoptionPage;
