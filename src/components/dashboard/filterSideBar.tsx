import { useForm, type SubmitHandler } from "react-hook-form";
import { SetStateAction, Dispatch, useState, useEffect } from "react";
import FetchComboBox from "../combobox/fetchComboBox";
import { FilterOptionTypes } from "@/pages/adopt";
import { useRouter } from "next/navigation";
import { all } from "axios";

type ZipEntry = {
  zipCode: number;
};

type filterSideProps = {
  filterSetting: [
    FilterOptionTypes,
    Dispatch<SetStateAction<FilterOptionTypes>>
  ];
  className?: string;
  height?: string;
  width?: string;
  breedsData: [Array<string>, Dispatch<SetStateAction<Array<string>>>];
  breedSelection: [string[], Dispatch<SetStateAction<string[]>>];
  controlAlphaOrder: [boolean, Dispatch<SetStateAction<boolean>>];
};

const FilterSideBar = ({
  className,
  height,
  width,
  breedsData,
  filterSetting,
  breedSelection,
  controlAlphaOrder,
}: filterSideProps) => {
  const [alphaSelected, setAlphaSelected] = useState<string | boolean | null>(
    null
  );

  const router = useRouter();
  const [filterBy, setFilterBy] = filterSetting;

  const [breedInfo, setBreedInfo] = breedsData;
  const [breedSelected, setBreedSelected] = breedSelection;

  const [allowAlphaOrder, setAllowAlphaOrder] = controlAlphaOrder;

  const [disableAlpha, setDisableAlpha] = useState<boolean>(false);

  useEffect(() => {
    setAlphaSelected("a_z");
    if (allowAlphaOrder) {
      setDisableAlpha(false);
    } else {
      setDisableAlpha(true);
    }
    allowAlphaOrder ? setDisableAlpha(false) : setDisableAlpha(true);
    console.log("alpha order modified");
  }, [allowAlphaOrder]);

  const filterAlphaOptions: Record<
    "label" | "value" | "checkedByDefault",
    string | boolean
  >[] = [
    {
      label: "A - Z",
      value: "a_z",
      checkedByDefault: true,
    },
    {
      label: "Z - A",
      value: "z_a",
      checkedByDefault: false,
    },
  ];

  useEffect(() => {
    if (alphaSelected == "a_z") {
      setFilterBy(FilterOptionTypes.breedAZ);
    } else if (alphaSelected == "z_a") {
      setFilterBy(FilterOptionTypes.breedZA);
    }
  }, [alphaSelected]);

  return (
    <div className={className ? className : ""}>
      <div className="flex flex-col w-full items-center gap-2 tracking-wide">
        <h1 className="p-2 border-b border-b-black w-full text-center font-bold text-xl overflow-x-hidden">
          Filter
        </h1>

        <div className="flex flex-col items-center font-Rubik w-full py-2">
          <div className="w-full bg-[#B9C9A1] text-center py-1 font-semibold rounded-md">
            Zip Code
          </div>
          <form className="flex flex-col items-center mt-3 gap-2">
            <input
              type="text"
              className="w-[90%] rounded-md text-left py-1 px-2 font-Rubik"
              placeholder="12345"
            ></input>
            <button className="text-center bg-niceWhite rounded-md px-2">
              Search
            </button>
          </form>
        </div>
        <div className="flex flex-col w-full py-2 gap-2">
          <div className="bg-[#B9C9A1] text-center font-semibold font-Rubik py-1 rounded-md">
            Breed
          </div>

          <div className="flex flex-col w-full overflow-y-auto p-2">
            <FetchComboBox
              selectedItem={[breedSelected, setBreedSelected]}
              itemsList={breedInfo}
              className="text-center px-2 w-full"
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <span
              title="Arrange by Breed"
              className="bg-[#B9C9A1] text-center w-full py-1 font-semibold invisible lg:visible rounded-md cursor-default"
            >
              <div className=" hidden md:flex items-center justify-center">
                Arrange Breeds:
              </div>
            </span>
            <ul className="flex flex-col md:pt-2 items-center w-full">
              {filterAlphaOptions.map((val, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex flex-row gap-2 text-lg font-Rubik"
                  >
                    <input
                      disabled={disableAlpha}
                      type="radio"
                      onChange={() => {}}
                      onClick={() => {
                        val.value === alphaSelected
                          ? setAlphaSelected(null)
                          : setAlphaSelected(val.value);
                      }}
                      checked={
                        alphaSelected != "" && alphaSelected === val.value
                          ? true
                          : !alphaSelected && val.checkedByDefault
                          ? true
                          : false
                      }
                    ></input>
                    <p title={`Arrange breed from ${val.label}`}>{val.label}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
