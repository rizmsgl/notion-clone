import Link from "next/link";
import {EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon} from "@radix-ui/react-icons";

export const Footer = () => {
    return (
        <div className="relative bg-background dark:bg-darkBackground border-t">
            <div className="py-[28px] px-[20px] flex flex-col items-center justify-center
            max-w-[1100px] my-0 mx-auto">
                <div className="max-w-[1000px] w-full">
                    <div className="flex justify-between items-center my-auto mr-[40px]
                    ml-0 max-md:flex-col">
                        <Link href="/" className="justify-self-start cursor-pointer
                        decoration-0 font-luckiestGuy text-2xl mb-[16px] flex items-center font-medium">
                            Oclap Note
                        </Link>
                        <p className="font-crimson text-xl mb-[16px]">
                            Oclap Note &trade; {new Date().getFullYear()} TradeMark.
                        </p>
                        <div className="flex justify-around items-center w-[220px] mb-[16px]">
                            <Link href="https://github.com/Mlika-Gaith" target="_blank">
                                <GitHubLogoIcon className="h-6 w-6"/>
                            </Link>
                            <Link href="https://www.linkedin.com/in/ghaith-mlika-305797214/"
                            target="_blank">
                                <LinkedInLogoIcon className="h-6 w-6"/>
                            </Link>
                            <Link href="mailto:ghaith.mlika@polytechnicien.tn">
                                <EnvelopeClosedIcon className="h-6 w-6"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
