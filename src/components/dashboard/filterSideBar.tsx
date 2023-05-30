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
  allowBreedSelection: [boolean, Dispatch<SetStateAction<boolean>>];
  controlAlphaOrder: [boolean, Dispatch<SetStateAction<boolean>>];
  zipCodeController: [number, Dispatch<SetStateAction<number>>];
};

const FilterSideBar = ({
  className,
  height,
  width,
  breedsData,
  filterSetting,
  breedSelection,
  controlAlphaOrder,
  zipCodeController,
  allowBreedSelection,
}: filterSideProps) => {
  const [alphaSelected, setAlphaSelected] = useState<string | boolean | null>(
    null
  );

  const router = useRouter();
  const [filterBy, setFilterBy] = filterSetting;

  const [breedInfo, setBreedInfo] = breedsData;
  const [breedSelected, setBreedSelected] = breedSelection;
  const [zipCode, setZipCode] = zipCodeController;

  const [allowAlphaOrder, setAllowAlphaOrder] = controlAlphaOrder;

  const [disableAlpha, setDisableAlpha] = useState<boolean>(false);
  const [disableSearch, setDisableSearch] = useState<boolean>(true);
  const [enableBreedSelection, setEnableBreedSelection] = allowBreedSelection;
  console.log(`Allowed Selection ${enableBreedSelection}`);

  // Form Handler
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ZipEntry>();

  const onSubmit: SubmitHandler<ZipEntry> = async (data) => {
    const zip = data.zipCode;
    setZipCode(data.zipCode);
    console.log(`zip ${data.zipCode}`);
  };

  useEffect(() => {
    setAlphaSelected("a_z");
    if (allowAlphaOrder) {
      setDisableAlpha(false);
    } else {
      setDisableAlpha(true);
    }
    allowAlphaOrder ? setDisableAlpha(false) : setDisableAlpha(true);
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

  useEffect(() => {
    isValid ? setDisableSearch(false) : setDisableSearch(true);
  }, [isValid]);
  return (
    <div className={className ? className : ""} data-test="filter_bar">
      <div className="flex flex-col w-full items-center gap-2 tracking-wide">
        <h1 className="p-2 border-b border-b-black w-full text-center font-bold text-xl overflow-x-hidden">
          Filter
        </h1>

        <form
          className="w-full flex flex-col items-center justify-center gap-3"
          onSubmit={handleSubmit(onSubmit, console.log)}
        >
          <p className="bg-[#B9C9A1] text-center font-semibold font-Rubik py-1 rounded-md w-full">
            Zip Code
          </p>
          <input
            type="text"
            className="lg:w-full flex items-center px-2 rounded-md py-1 w-[50%]"
            {...register("zipCode", {})}
          ></input>
          <button
            className="bg-niceWhite rounded-md px-2 disabled:bg-gray"
            disabled={disableSearch}
          >
            Search
          </button>
          {zipCode > 0 && (
            <button
              className="bg-niceWhite rounded-md px-2"
              onClick={() => {
                setZipCode(0);
                reset();
              }}
            >
              Clear
            </button>
          )}
        </form>
        <div className="flex flex-col w-full py-2 gap-2">
          <div className="bg-[#B9C9A1] text-center font-semibold font-Rubik py-1 rounded-md">
            Breed
          </div>

          <div className="flex flex-col w-full overflow-y-auto p-2">
            <FetchComboBox
              selectedItem={[breedSelected, setBreedSelected]}
              itemsList={breedInfo}
              className="w-full"
              isDisabled={enableBreedSelection ? false : true}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <span
              title="Arrange by Breed"
              className="bg-[#B9C9A1] text-center w-full py-1 font-semibold invisible lg:visible rounded-md cursor-default"
            >
              <div className=" hidden lg:flex items-center justify-center">
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
