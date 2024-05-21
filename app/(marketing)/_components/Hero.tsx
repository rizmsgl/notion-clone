"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import Link from "next/link";

export const Hero = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [hovered, setHovered] = useState(false);
  const onHover = () => {
    setHovered(!hovered);
  };
  return (
    <div className="bg-background dark:bg-darkBackground max-md:py-[100px]">
      <div
        className="grid z-10 h-[860px] w-full max-w-[1100px]
            mx-auto py-0 px-[24px]justify-center"
      >
        <div className="grid grid-cols-2 max-md:grid-cols-1 items-center">
          <div className="mb-[15px] py-0 px-[15px]">
            <div className="max-w-[540px] pt-0 pb-[60px]">
              <p
                className="text-4xl max-lg:text-3xl leading-[34px] font-normal uppercase mb-[16px]
                            tracking-wide font-crimson"
              >
                Welcome to{" "}
                <span className="font-luckiestGuy text-brand">Note Niche</span>,
                where your ideas, documents and plans come together.
              </p>
              <h1 className="mb-[24px] text-5xl max-lg:text-4xl leading-[46px] font-light font-luckiestGuy">
                Note Niche is the connected workspace where better, faster work
                happens.
              </h1>
              <p
                className="max-w-[440px] mb-[35px] text-2xl font-normal
                            leading-[24px] font-crimson"
              >
                Dive into your integrated workspace designed to elevate
                efficiency and productivity.
              </p>
              <div className="flex flex-start">
                {!isLoaded && (
                  <Button variant="link">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                )}
                {isLoaded && !isSignedIn && (
                  <SignInButton mode="modal">
                    <Button
                      size="sm"
                      onMouseEnter={onHover}
                      onMouseLeave={onHover}
                    >
                      Get Note Niche{" "}
                      {!hovered ? (
                        <ChevronRightIcon className="h-4 w-4 ml-2" />
                      ) : (
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                      )}
                    </Button>
                  </SignInButton>
                )}
                {isLoaded && isSignedIn && (
                  <Button asChild onMouseEnter={onHover} onMouseLeave={onHover}>
                    <Link href="/documents">
                      Start Now{" "}
                      {!hovered ? (
                        <ChevronRightIcon className="h-4 w-4 ml-2" />
                      ) : (
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                      )}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div
            className="mb-[15px] px-[15px] h-[600px] max-md:h-[450px] bg-stone-100
                    rounded-xl py-5 max-md:ml-3 max-lg:mr-3 shadow-sm drop-shadow-sm max-w-[540px] flex
                    items-center justify-center"
          >
            <Image
              src="/illustrations/hero.png"
              alt="Hero"
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
