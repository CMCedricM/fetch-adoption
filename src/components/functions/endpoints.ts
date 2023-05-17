import axios, { Axios, AxiosResponse } from "axios";
import { useState, useEffect } from "react";

export type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

const useAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const axiosInstance = axios.create({
    baseURL: "https://frontend-take-home-service.fetch.com",
    withCredentials: true,
  });

  const login = async (username: string, email: string) => {
    let res;
    // try {
    //   res = await axiosInstance.post("/auth/login", {
    //     name: username,
    //     email: email,
    //   });
    // } catch (err) {
    //   throw new Error(`There was an error: ${err}`);
    // }

    // if (res) {
    //   const { data, status } = res;
    //   if (status != 200) {
    //     throw new Error(
    //       `Did not recieve status 200 instead recieved status ${status}`
    //     );
    //   } else {
    //     setUserName(username);
    //     setLoggedIn(true);
    //   }
    // }
    setLoggedIn(true);
    setUserName(username);
  };

  const testConnection = async () => {
    const res = await axiosInstance.get("/dogs/breeds").catch((err) => {
      throw new Error(`There was an error => ${(err as Error).message}`);
    });

    const { data } = res;
    console.log(data);
    return data;
  };

  return {
    login,
    testConnection,
    isLoggedIn,
    userName,
  };
};

export default useAuth;
