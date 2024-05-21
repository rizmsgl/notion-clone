"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const DocumentsPage = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUser();
  const onHover = () => {
    setIsHovered(!isHovered);
  };
  // create document
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/illustrations/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/illustrations/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium text-center pt-5">
        Welcome to {user?.firstName}&apos;s{" "}
        <span className="text-brand font-luckiestGuy">Note Niche</span>
      </h2>
      <h2 className="text-md font-medium text-center mb-3">
        Wow, such empty !
      </h2>
      <Button size="sm" onMouseEnter={onHover} onMouseLeave={onHover}>
        <Pencil
          className={cn(
            "h-4 w-4 mr-2 transform transition-transform duration-200",
            isHovered && "rotate-[360deg]"
          )}
        />{" "}
        Create a Note
      </Button>
    </div>
  );
};

export default DocumentsPage;
