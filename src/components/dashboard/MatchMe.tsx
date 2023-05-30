import { authConnection } from "../hooks/authentication";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useDogData } from "../hooks/DogData";
import { Dog } from "../hooks/DogData";
import FetchModal from "../modals/FetchModal";
import { DogImage } from "../modals/DogImages";
type MatchMeProps = {
  selectedDogs: [string[], Dispatch<SetStateAction<string[]>>];
};

const MatchMe = ({ selectedDogs }: MatchMeProps) => {
  const [arrayOfSelected, setArrayOfSelected] = selectedDogs;

  const [selectedImage, setSelectedImage] = useState<string>("");

  const [allowMatch, setAllowMatch] = useState(false);

  const [getTheMatch, setGetTheMatch] = useState<boolean>(false);
  const [match, setMatch] = useState<Dog>();
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);
  const { findMatch, getDogData } = useDogData({ auth: authConnection });

  useEffect(() => {
    arrayOfSelected.length > 0 ? setAllowMatch(true) : setAllowMatch(false);
  }, [arrayOfSelected]);

  useEffect(() => {
    if (getTheMatch) {
      findMatch(arrayOfSelected)
        .then((data) =>
          getDogData([data.match]).then((dogObj) => {
            setMatch(dogObj[0]);
            setShowMatchModal(true);
            setGetTheMatch(false);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getTheMatch]);

  const [showQuestion, setShowQuestion] = useState(false);
  return (
    <div
      className="flex flex-col items-center gap-2 font-Rubik"
      data-test="match_button"
    >
      <FetchModal
        openState={[showQuestion, setShowQuestion]}
        colorScheme="bg-[#E0E1BC]"
        dialogTitle={"How Does This Work?"}
      >
        <div className="py-2 mt-4 w-full flex flex-col font-Rubik border-2 rounded-md">
          <ul className=" font-semibold w-full px-3">
            <li>{`1. Select the Star Button`}</li>
            <li>{`2. Select the 'Match Me' Button`}</li>
            <li>{`3. Now you can see your match!`}</li>
          </ul>
        </div>
      </FetchModal>
      <FetchModal
        openState={[showMatchModal, setShowMatchModal]}
        colorScheme="bg-[#E0E1BC]"
        dialogTitle={"Your Match!"}
      >
        <div className="flex flex-col items-center gap-2">
          <DogImage
            id={match?.id ?? ""}
            name={match?.name ?? ""}
            breed={match?.breed ?? ""}
            age={match?.age ?? 0}
            img={match?.img ?? ""}
            zip_code={match?.zip_code ?? ""}
            selectImage={[selectedImage, setSelectedImage]}
            starred={true}
          ></DogImage>
          <button
            className="rounded-md bg-button_green p-2 px-4 font-Rubik"
            onClick={() => setShowMatchModal(false)}
          >
            Ok
          </button>
        </div>
      </FetchModal>
      <div className="flex flex-row md:grid md:grid-rows-2 items-center gap-2 p-4">
        <button
          onClick={() => setShowQuestion(true)}
          className="bg-button_green cursor-pointer px-3 py-2 rounded-full"
        >
          ?
        </button>
        <div className="flex flex-row gap-2">
          <button
            title={`${
              !allowMatch ? "Select Some Dogs To Find Your Match" : ""
            }`}
            className={` rounded-md ${
              allowMatch
                ? "bg-button_green cursor-pointer"
                : "bg-gray cursor-not-allowed "
            } p-2 `}
            onClick={() => (allowMatch ? setGetTheMatch(true) : "")}
          >
            Match Me
          </button>
        </div>
        <button
          className={` rounded-md ${
            allowMatch ? "bg-button_green cursor-pointer" : "hidden"
          } p-2 `}
          onClick={() => (allowMatch ? setArrayOfSelected([]) : "")}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default MatchMe;
