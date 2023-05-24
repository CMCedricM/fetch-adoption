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

  return (
    <div className="flex flex-col items-center">
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

      <button
        title={`${!allowMatch ? "Select Some Dogs To Find Your Match" : ""}`}
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
  );
};

export default MatchMe;
