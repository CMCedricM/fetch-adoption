import { AxiosInstance } from "axios";
import { useState } from "react";

type DogDataInfo = {
  auth: AxiosInstance;
};

export const useDogData = ({ auth }: DogDataInfo) => {
  const [breeds, setBreeds] = useState<Array<string>>();

  const getBreeds = async () => {
    const breeds = await auth.get("/dogs/breeds").catch((err) => {
      throw new Error(`Unable to Fetch Breeds ==> ${(err as Error).message} `);
    });

    const { data } = breeds;
    setBreeds(data);
  };

  return {
    getBreeds,
    breeds,
  };
};
