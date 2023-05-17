import "./globals.css";
import { Inter } from "next/font/google";
import MyHeader from "@/components/myHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fetch Adoption",
  description: "An adoption site created by Cedric Men",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#E0E1BC] gap-2 ">
        <div>
          <MyHeader></MyHeader>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
