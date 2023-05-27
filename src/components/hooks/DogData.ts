import { AxiosInstance } from "axios";
import { useState } from "react";
import { DogAdoptions } from "../dashboard/DogAdoptions";
import next from "next/types";

const maxDogsToGet = 15;
type DogDataInfo = {
  auth: AxiosInstance;
};

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogSearch {
  breeds?: string[];
  zipCodes?: Array<string>;
  ageMin?: Number;
  ageMax?: Number;
  size: Number;
  sort: string;
  from?: string;
}

interface DogSearchRetTypes {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

interface DogSearchTypes {
  nextPg?: string;
  prevPg?: string;
}

interface Match {
  match: string;
}

export const useDogData = ({ auth }: DogDataInfo) => {
  const [dogsTotal, setDogsTotal] = useState<number>(0);

  const getBreeds = async () => {
    const breeds = await auth.get("/dogs/breeds").catch((err) => {
      throw new Error(`Unable to Fetch Breeds ==> ${(err as Error).message} `);
    });

    const { data } = breeds;
    return data as string[];
  };

  const getDogIds = async (filter?: string, searchSettings?: DogSearch) => {
    const res = await auth
      .get("/dogs/search", {
        params: {
          size: 15,
          sort: !filter ? "breed:asc" : filter,
        },
      })
      .catch((err) => {
        throw new Error(`Unable to Fetch Dogs ==> ${(err as Error).message} `);
      });

    const { data } = res;
    console.log(data);
    // Always set the current dog count for every dogs search query
    setDogsTotal((data as DogSearchRetTypes).total);
    return data as DogSearchRetTypes;
  };

  const getDogData = async (dogIds: Array<string>) => {
    const res = await auth.post("/dogs", dogIds).catch((err) => {
      throw new Error(err.message);
    });
    const { data } = res;
    return data as Dog[];
  };

  const getNextPagOfDogsIDs = async (
    { nextPg, prevPg }: DogSearchTypes,
    filter?: string
  ) => {
    let getPage: string = "";
    if (prevPg) {
      getPage = prevPg;
    } else if (nextPg) {
      getPage = nextPg;
    } else {
      throw new Error(`Error ==> No next or previous page pointer!`);
    }
    const res = await auth
      .get(getPage, {
        params: {
          size: 15,
        },
      })
      .catch((err) => {
        throw new Error(`There was an error ==> ${err}`);
      });

    const { data } = res;
    // console.log("Data For Next Page");
    console.log(data);
    return data as DogSearchRetTypes;
  };

  const findDogs = async (searchParam: DogSearch) => {
    const res = await auth
      .get("/dogs/search", { params: searchParam })
      .catch((err) => {
        throw new Error(`There was an error ${err.message}`);
      });

    const { data } = res;
    console.log(data);
    setDogsTotal((data as DogSearchRetTypes).total);
    return data as DogSearchRetTypes;
  };

  const findMatch = async (dogIds: Array<string>) => {
    const match = await auth.post("/dogs/match", dogIds).catch((err) => {
      throw new Error(`There was an error ${err.message}`);
    });

    const { data } = match;

    return data as Match;
  };

  return {
    getBreeds,
    getDogIds,
    getNextPagOfDogsIDs,
    findDogs,
    findMatch,
    getDogData,
    dogsTotal,
  };
};
