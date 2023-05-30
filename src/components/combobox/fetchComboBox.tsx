import { useState, Dispatch, SetStateAction } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type FetchBoxProps = {
  selectedItem: [string[], Dispatch<SetStateAction<string[]>>];
  itemsList: string[];
  className?: string;
  isDisabled?: boolean;
};

const FetchComboBox = ({
  selectedItem,
  itemsList,
  className,
  isDisabled,
}: FetchBoxProps) => {
  const [selectItem, setSelectedItem] = selectedItem;
  const [query, setQuery] = useState<string>("");

  return (
    <div className={className}>
      <Combobox
        value={selectItem}
        onChange={setSelectedItem}
        disabled={isDisabled ? true : false}
      >
        <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md ">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 text-sm overflow-hidden z-0 disabled:bg-gray/60"
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className=" bg-niceWhite disabled:bg-gray/20 absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDownIcon
              className="h-5 w-5"
              aria-hidden="true"
              color={`${isDisabled ? "gray" : ""}`}
            />
          </Combobox.Button>
        </div>
        <div className="bg-niceWhite w-full">
          <Combobox.Options
            className={`absolute mt-1 h-[20vh] w-full overflow-auto bg-niceWhite p-2 rounded-md cursor-default`}
            style={{ scrollbarWidth: "none" }}
          >
            <Combobox.Option
              value=""
              className="hover:bg-[#89CFF0] w-full h-8 rounded-md px-2 py-1 overflow-clip"
            ></Combobox.Option>
            {itemsList
              .filter((val) => val.toLowerCase().includes(query.toLowerCase()))
              .map((val, idx) => (
                <Combobox.Option
                  key={idx}
                  value={val}
                  className="hover:bg-[#89CFF0] w-full rounded-md px-2 py-1 overflow-clip"
                >
                  {val}
                </Combobox.Option>
              ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
};

export default FetchComboBox;
