import Image from "next/image";
import {useTheme} from "next-themes";

export const Logo = () =>{
    const {resolvedTheme} = useTheme();
    let source;
    if (resolvedTheme === 'dark')
        source = "/illustrations/logo-dark.png";
    else
        source = "/illustrations/logo.png";

    return (
        <div className="flex items-center gap-x-2 w-1/2">
            <Image src={source} alt="Logo" width={180} height={180}/>
        </div>
    )
}