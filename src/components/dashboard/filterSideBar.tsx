import { useForm, type SubmitHandler } from "react-hook-form";
import { SetStateAction, Dispatch, useState } from "react";

type ZipEntry = {
  zipCode: number;
};

type filterSideProps = {
  filterSetting: [string, Dispatch<SetStateAction<string>>];
  className?: string;
  height?: string;
  width?: string;
  breedsData: [Array<string>, Dispatch<SetStateAction<Array<string>>>];
};

const FilterSideBar = ({
  className,
  height,
  width,
  breedsData,
}: filterSideProps) => {
  const [alphaSelected, setAlphaSelected] = useState<string | null>(null);
  const [breedInfo, setBreedInfo] = breedsData;

  const filterAlphaOptions: Record<"label" | "value", string>[] = [
    { label: "A - Z", value: "a_z" },
    { label: "Z - A", value: "z_a" },
  ];

  return (
    <div className={className ? className : ""}>
      <div className="flex flex-col w-full items-center gap-2 tracking-wide">
        <h1 className="p-2 border-b border-b-black w-full text-center font-bold text-xl overflow-x-hidden">
          Filter
        </h1>
        <div className="flex flex-col items-center w-full">
          <div className="bg-[#B9C9A1] text-center w-full py-1 font-semibold invisible lg:visible">
            Alphabetical
          </div>
          <div className="bg-[#B9C9A1] text-center w-full py-1 font-semibold visible lg:hidden">
            Alpha
          </div>
          <ul className="flex flex-col  items-center w-full pt-2">
            {filterAlphaOptions.map((val, idx) => {
              return (
                <li
                  key={idx}
                  className="flex flex-row gap-2 text-lg font-Rubik"
                >
                  <input
                    type="radio"
                    onChange={() => {}}
                    onClick={() => {
                      val.value === alphaSelected
                        ? setAlphaSelected(null)
                        : setAlphaSelected(val.value);
                    }}
                    checked={alphaSelected === val.value}
                  ></input>
                  <p>{val.label}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col items-center font-Rubik w-full py-2">
          <div className="w-full bg-[#B9C9A1] text-center py-1 font-semibold">
            Zip Code
          </div>
          <form className="flex flex-col items-center mt-3 gap-2">
            <input
              type="text"
              className="w-[80%] rounded-md text-center px-2 font-Rubik"
              placeholder="12345"
            ></input>
            <button className="text-center bg-niceWhite rounded-md px-2">
              Search
            </button>
          </form>
        </div>
        <div className="flex flex-col w-full py-2">
          <div className="bg-[#B9C9A1] text-center font-semibold font-Rubik py-1 ">
            Breed
          </div>
          <div className="flex flex-col w-full h-[42vh] overflow-y-auto p-2">
            {breedInfo &&
              breedInfo.map((val, idx) => {
                return <div key={idx}>{val}</div>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
