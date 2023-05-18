import { NextPage } from "next";
import { useEffect, useState } from "react";
import FilterSideBar from "@/components/dashboard/filter";

const DashBoard = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div section-label={"adoption-area"} className="flex flex-row">
        <FilterSideBar className="w-[10%] h-[80vh] bg-[#659B78] ml-2 rounded-md font-Rubik" />
      </div>
      <div section-label={"button-area"}></div>
    </div>
  );
};

export default DashBoard;
