import { NextPage } from "next";
import { useEffect, useState } from "react";
import FilterSideBar from "@/components/dashboard/filterSideBar";
import LoginModal from "@/components/modals/loginModal";

const AdoptionPage = () => {
  const [filterBy, setFilterBy] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user_info");
    !user ? setShowLoginModal(true) : "";
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <LoginModal
        openState={[showLoginModal, setShowLoginModal]}
        title="Login To Continue"
        preventClosing={true}
      ></LoginModal>
      <div section-label={"adoption-area"} className="flex flex-row">
        <FilterSideBar
          filterSetting={[filterBy, setFilterBy]}
          className="w-[10%] h-[80vh] bg-[#659B78] ml-2 rounded-md font-Rubik"
        />
      </div>
      <div section-label={"button-area"}></div>
    </div>
  );
};

export default AdoptionPage;
