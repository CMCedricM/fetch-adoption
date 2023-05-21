import { AxiosInstance } from "axios";
import { useState } from "react";

type DogDataInfo = {
  auth: AxiosInstance;
};

export type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

interface DogSearch {
  breeds?: Array<string>;
  zipCodes?: Array<string>;
  ageMin?: Number;
  ageMax?: Number;
}

export const useDogData = ({ auth }: DogDataInfo) => {
  const getBreeds = async () => {
    const breeds = await auth.get("/dogs/breeds").catch((err) => {
      throw new Error(`Unable to Fetch Breeds ==> ${(err as Error).message} `);
    });

    const { data } = breeds;
    return data as string[];
  };

  const getDogs = async () => {
    const res = await auth.get("/dogs/search").catch((err) => {
      throw new Error(`Unable to Fetch Dogs ==> ${(err as Error).message} `);
    });

    const { data } = res;
    return data;
  };

  const getDogData = async (dogIds: Array<string>) => {
    const res = await auth.post("/dogs", dogIds).catch((err) => {
      throw new Error((err as Error).message);
    });
    const { data } = res;
    return data;
  };

  const findDogs = async (searchParam: DogDataInfo) => {};

  return {
    getBreeds,
    getDogs,
    getDogData,
  };
};
