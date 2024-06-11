import { Navbar } from "@/app/(marketing)/_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full dark:bg-darkBackground">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MarketingLayout;
