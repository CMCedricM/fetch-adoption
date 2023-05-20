import axios, { Axios, AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { UUID, randomUUID } from "crypto";
import { error } from "console";

export type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

export const authConnection = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  withCredentials: true,
  validateStatus: (status) => {
    return status < 500;
  },
});

const useAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const login = async (user: string, email: string) => {
    let res;
    try {
      res = await authConnection.post("/auth/login", {
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

  const checkConnection = async () => {
    const res = await authConnection.get("/dogs/breeds").catch((err) => {
      throw new Error(`There was an error ===> ${err}`);
    });
    const { data, status } = res;
    if (status == 401) {
      return false;
    } else if (status == 200) {
      setLoggedIn(true);
      return true;
    } else {
      throw new Error(`There was an error with status ${status}`);
    }
  };

  const signOut = async () => {
    const res = await authConnection.post("/auth/logout").catch((err) => {
      localStorage.removeItem("user_info");
      throw new Error(
        `There was an error logging out ${(err as Error).message}`
      );
    });

    localStorage.removeItem("user_info");
  };

  return {
    login,
    checkConnection,
    isLoggedIn,
    userName,
    signOut,
    authConnection,
  };
};

export default useAuth;
