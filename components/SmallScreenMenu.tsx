import {cn} from "@/lib/utils";
import {Children} from "react";
import {Cross1Icon} from "@radix-ui/react-icons";

type Props ={
    children: React.ReactNode,
    isOpen: boolean,
    toggle: () => void,
}
export const SmallScreenMenu = ({children, isOpen, toggle} : Props) => {
    return (
        <aside className={cn("fixed z-[100] size-full bg-background dark:bg-darkBackground"+
        "grid items-center top-0 left-0 transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100" :"opacity-0",
            isOpen ? "top-0" : "top-[-100%]"
        )}>
            <div className="absolute top-[1.2rem] right-[1.2rem] bg-transparent cursor-pointer
            text-[2rem] outline-none">
                <Cross1Icon onClick={toggle}/>
            </div>
            <div>
                <div className={cn("mt-[2.5rem] flex flex-col justify-center items-center gap-y-3")}>
                    {children}
                </div>
            </div>
        </aside>
    );
};
