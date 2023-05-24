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

  const [getTheMatch, setGetTheMatch] = useState<boolean>(false);
  const [match, setMatch] = useState<Dog>();
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);
  const { findMatch, getDogData } = useDogData({ auth: authConnection });

  useEffect(() => {
    if (getTheMatch) {
      findMatch(arrayOfSelected)
        .then((data) =>
          getDogData([data.match]).then((dogObj) => {
            setMatch(dogObj[0]);
            setShowMatchModal(true);
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
          {`Here is your match: ${match?.name}`}
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
      <div
        className="rounded-md bg-button_green p-2"
        onClick={() => setGetTheMatch(true)}
      >
        Match Me
      </div>
    </div>
  );
};

export default MatchMe;
