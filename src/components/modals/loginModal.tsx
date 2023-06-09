import FetchModal from "./FetchModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/authentication";

type LoginModalProps = {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  userNameHandler?: [string, Dispatch<SetStateAction<string>>];
  title?: string;
  preventClosing?: boolean;
  reload?: [boolean, Dispatch<SetStateAction<boolean>>];
};

const LoginModal = ({
  openState,
  userNameHandler,
  title,
  preventClosing,
  reload,
}: LoginModalProps) => {
  const [openLogin, setOpenLogin] = openState;
  const [errorMsg, setErrorMsg] = useState("");
  const [userHandler, setUserHanlder] = userNameHandler || [null, null];
  const [reloadSet, setReload] = reload || [null, null];

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

  const { login, checkConnection, isLoggedIn, userName } = useAuth();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const userName = data.userName;
    if (userName.trim() == "") {
      setErrorMsg("Your Name is Required");
    }
    const emailAddress = data.email;
    try {
      login(userName, emailAddress);
    } catch (err) {
      console.log(`There was an error ${err}`);
    }
  };

  useEffect(() => {
    clearErrors();
    reset();
  }, [openLogin, clearErrors]);

  useEffect(() => {
    if (isLoggedIn) {
      setOpenLogin(false);
      setUserHanlder ? setUserHanlder(userName) : "";
      setReload ? setReload(true) : "";
    }
  }, [isLoggedIn, setOpenLogin, userName, setUserHanlder]);
  return (
    <FetchModal
      openState={[openLogin, setOpenLogin]}
      colorScheme="bg-[#E0E1BC]"
      extraOnClose={() => clearErrors()}
      preventClosing={preventClosing}
    >
      <div className="flex flex-col gap-2 font-Rubik w-full items-center pb-2">
        <p className="text-center text-red backdrop-blur-md bg-niceWhite/60 rounded-md px-2 ">
          Note: You Must Allow Third-Party Cookies to Login
        </p>
        <h1 className="font-bold text-3xl text-center">{`${
          title ? title : "Login"
        }`}</h1>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className=" w-full flex flex-col px-2 pb-5 gap-3">
            <p className="font-medium text-lg">Your Name:</p>
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md px-2 py-1"
              data-test="username_input"
              {...register("userName", {
                required: true,
              })}
            ></input>
            {errors.userName && (
              <div className="text-red pl-1">{`You Must Enter Your Name`}</div>
            )}
            <p className="font-medium text-lg">Your Email:</p>
            <input
              type="text"
              data-test="email_input"
              className="border-2 border-gray-400 rounded-md px-2 py-1"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
            ></input>
            {errors.email && (
              <div className="text-red pl-1">{`Invalid Email`}</div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button
              data-test="login_submit"
              type="submit"
              className="items-center  bg-[#2f922e]/70 w-[20%] rounded-md p-2 font-semibold"
            >
              Login
            </button>
          </div>
        </form>
        {/* <button
          className="p-2 bg-white rounded-md"
          onClick={async () => {
            try {
              await checkConnection();
            } catch (err) {
              console.log((err as Error).message);
            }
          }}
        >
          Test Endpoint
        </button> */}
      </div>
    </FetchModal>
  );
};

export default LoginModal;
