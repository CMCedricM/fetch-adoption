import { useState, Dispatch, SetStateAction } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

type FetchBoxProps = {
  selectedItem: [string, Dispatch<SetStateAction<string>>];
  itemsList: string[];
  className?: string;
};

const FetchComboBox = ({
  selectedItem,
  itemsList,
  className,
}: FetchBoxProps) => {
  const [selectItem, setSelectedItem] = selectedItem;
  const [query, setQuery] = useState<string>("");

  return (
    <div>
      <Combobox value={selectItem} onChange={setSelectedItem}>
        <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md ">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 text-sm "
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <div className="bg-niceWhite ">
          <Combobox.Options
            className={`absolute mt-1 h-[20vh] w-[7vw] overflow-auto bg-niceWhite p-2 rounded-md cursor-default`}
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
