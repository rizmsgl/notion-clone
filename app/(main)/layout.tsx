"use client"
import {useUser} from "@clerk/nextjs";
import {ClipLoader} from "react-spinners";
import {redirect} from "next/navigation";
import {Navigation} from "@/app/(main)/_components/Navigation";
import {Toaster} from "@/components/ui/toaster";


const MainLayout = ({children}:{children: React.ReactNode}) =>{
    const {isLoaded, isSignedIn} = useUser();

    if (!isLoaded){
        return <div className="size-full flex items-center justify-center">
            <ClipLoader color={"rgb(245,245,244)"}/>
        </div>
    }
    if (!isSignedIn){
        return redirect("/");
    }
    return (
        <div className="h-full flex dark:bg-darkBackground">
            <Navigation/>
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
            <Toaster />
        </div>
    )
}

export default MainLayout;