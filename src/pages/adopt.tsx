import { NextPage } from "next";
import { useEffect, useState } from "react";
import FilterSideBar from "@/components/dashboard/filterSideBar";
import LoginModal from "@/components/modals/loginModal";
import { useRouter } from "next/navigation";

const AdoptionPage = () => {
  const [filterBy, setFilterBy] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user_info");
    !user ? setShowLoginModal(true) : "";
  }, []);

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
        />
      </div>
      <div section-label={"button-area"}></div>
    </div>
  );
};

export default AdoptionPage;
