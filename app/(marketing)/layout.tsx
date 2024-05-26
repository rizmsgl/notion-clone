import { Navbar } from "@/app/(marketing)/_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-darkBackground">
      <Navbar />
      <main className="h-full pt-1">{children}</main>
    </div>
  );
};

export default MarketingLayout;
