import { useDogData } from "../hooks/DogData";
import { authConnection } from "../hooks/authentication";
import { type Dog } from "../hooks/DogData";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

export const DogAdoptions = () => {
  const { getDogs, getDogData } = useDogData({ auth: authConnection });
  const [dogIds, setDogIds] = useState<Array<string>>();

  //   We can assume we're authenticated here, so just get the Dogs
  useEffect(() => {
    getDogs().then((data) => {
      setDogIds(data.resultIds);
      console.log(data);
    });
  }, []);

  // Once we have retrieved all the dog ids, now we need to get their actual info
  useEffect(() => {
    if (dogIds) {
      getDogData(dogIds);
    }
  }, [dogIds]);

  return (
    <div>
      <div></div>
    </div>
  );
};
