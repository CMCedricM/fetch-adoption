"use client";
import FetchModal from "./modals/FetchModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type LoginModalProps = {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
};

const LoginModal = ({ openState }: LoginModalProps) => {
  const [openLogin, setOpenLogin] = openState;
  const [errorMsg, setErrorMsg] = useState("");

  type LoginForm = {
    userName: string;
    email: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const userName = data.userName;
    if (userName.trim() == "") {
      setErrorMsg("Your Name is Required");
    }
    const emailAddress = data.email;
  };

  useEffect(() => {
    clearErrors();
  }, [openLogin, clearErrors]);

  return (
    <FetchModal
      openState={[openLogin, setOpenLogin]}
      colorScheme="bg-[#E0E1BC]"
      extraOnClose={() => clearErrors()}
    >
      <div className="flex flex-col gap-2 font-Rubik w-full items-center pb-2">
        <h1 className="font-bold text-3xl text-center">Login</h1>
        <form className="w-full" onSubmit={handleSubmit(onSubmit, console.log)}>
          <div className=" w-full flex flex-col px-2 pb-5 gap-3">
            <p className="font-medium text-lg">Your Name:</p>
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md px-2 py-1"
              {...register("userName", {
                required: true,
              })}
            ></input>
            {errors.userName && (
              <div className="text-red-400 pl-1">{`You Must Enter Your Name`}</div>
            )}
            <p className="font-medium text-lg">Your Email:</p>
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md px-2 py-1"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
            ></input>
            {errors.email && (
              <div className="text-red-400 pl-1">{`Invalid Email`}</div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="items-center bg-[#2f922e]/70 w-[20%] rounded-md p-2 font-semibold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </FetchModal>
  );
};

export default LoginModal;
