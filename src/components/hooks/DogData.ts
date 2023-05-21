import { AxiosInstance } from "axios";
import { useState } from "react";
import { DogAdoptions } from "../dashboard/adoptionSection";

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
  size: Number;
  sort: string;
}

interface DogSearchRetTypes {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

export const useDogData = ({ auth }: DogDataInfo) => {
  const getBreeds = async () => {
    const breeds = await auth.get("/dogs/breeds").catch((err) => {
      throw new Error(`Unable to Fetch Breeds ==> ${(err as Error).message} `);
    });

    const { data } = breeds;
    return data as string[];
  };

  const getDogIds = async () => {
    const res = await auth
      .get("/dogs/search", {
        params: {
          size: 15,
        },
      })
      .catch((err) => {
        throw new Error(`Unable to Fetch Dogs ==> ${(err as Error).message} `);
      });

    const { data } = res;
    return data;
  };

  const getDogData = async (dogIds: Array<string>) => {
    const res = await auth.post("/dogs", dogIds).catch((err) => {
      throw new Error(err.message);
    });
    const { data } = res;
    return data as Dog[];
  };

  const findDogs = async (
    searchParam: DogSearch,
    nextPg?: string,
    prevPg?: string
  ) => {
    const res = await auth
      .get("/dogs/search", { params: searchParam })
      .catch((err) => {
        throw new Error(`There was an error ${err.message}`);
      });

    const { data } = res;
    return data as DogSearchRetTypes;
  };

  return {
    getBreeds,
    getDogIds,
    findDogs,
    getDogData,
  };
};
