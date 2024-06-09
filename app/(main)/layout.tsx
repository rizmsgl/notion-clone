"use client";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Navigation } from "@/app/(main)/_components/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Spinner } from "@/components/spinner";
import SearchCommand from "@/components/search-command";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="size-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!isSignedIn) {
    return redirect("/");
  }
  return (
    <div className="h-full flex dark:bg-darkBackground">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        {children}
        <SearchCommand />
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
