import { type AppType } from "next/dist/shared/lib/utils";
import MyHeader from "@/components/myHeader";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#E0E1BC] md:gap-3 z-2">
      <div className="sticky top-0" style={{ zIndex: 1 }}>
        <MyHeader />
      </div>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
