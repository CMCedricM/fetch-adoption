import { authConnection } from "../hooks/authentication";
import { useState, Dispatch, SetStateAction } from "react";

type MatchMeProps = {
  selectedDogs: [string[], Dispatch<SetStateAction<string[]>>];
};

const MatchMe = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default MatchMe;
