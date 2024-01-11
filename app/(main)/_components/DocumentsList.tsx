import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import {Item} from "./Item";
import {cn} from "@/lib/utils";

type Props = {
    parentDocumentId?: string,
    level?: number,
    data?: string,
}
export const DocumentsList = ({parentDocumentId, level = 0, data}:Props) => {
    const params= useParams()
    const router = useRouter();
    const [expanded, setExpanded] = useState()
    const documents = ["test"];
    if (documents === undefined){
        return(
            <>
                <Item.Skeleton level={level}/>
                {level === 0 &&(
                    <>
                        <Item.Skeleton level={level}/>
                        <Item.Skeleton level={level}/>
                    </>
                )}
            </>
        )
    }
    return (
        <>
            <p style={{paddingLeft: level ? `${(level * 12)+25}px` : undefined}}
               className={cn("hidden text-sm font-medium text-muted-foreground/80",
                   expanded && "last:block",
                   level === 0 && "hidden")}>
                No pages Inside
            </p>
            {documents.map((document)=>{
                <div key={1}>

                </div>
            })}
        </>
    );
};
