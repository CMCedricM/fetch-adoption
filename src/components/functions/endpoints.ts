import axios, { Axios, AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { UUID, randomUUID } from "crypto";

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

  const login = async (user: string, email: string) => {
    let res;
    try {
      res = await axiosInstance.post("/auth/login", {
        name: user,
        email: email,
      });
    } catch (err) {
      throw new Error(`There was an error: ${err}`);
    }

    if (res) {
      const { data, status } = res;
      if (status != 200) {
        throw new Error(
          `Did not recieve status 200 instead recieved status ${status}`
        );
      } else {
        setUserName(user);
        setLoggedIn(true);
      }
    }
    setLoggedIn(true);
    setUserName(user);
    // Create a local item that identifies the user, so we can access the user name accross the pages
    localStorage.setItem("user_info", user);
  };

  const testConnection = async () => {
    const res = await axiosInstance.get("/dogs/breeds").catch((err) => {
      throw new Error(`There was an error => ${(err as Error).message}`);
    });

    const { data } = res;
    console.log(data);
    return data;
  };

  const signOut = async () => {
    const res = await axiosInstance.post("/auth/logout").catch((err) => {
      localStorage.removeItem("user_info");
      throw new Error(
        `There was an error logging out ${(err as Error).message}`
      );
    });

    localStorage.removeItem("user_info");
  };

  return {
    login,
    testConnection,
    isLoggedIn,
    userName,
    signOut,
  };
};

export default useAuth;
