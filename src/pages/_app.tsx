import { type AppType } from "next/dist/shared/lib/utils";
import MyHeader from "@/components/myHeader";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#E0E1BC] md:gap-3">
      <div>
        <MyHeader/>
      </div>
      <Component {...pageProps} />;
    </div>
  );
};

export default MyApp;
