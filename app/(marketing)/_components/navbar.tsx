"use client";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "@/app/(marketing)/_components/logo";
import {
  HamburgerMenuIcon,
  PersonIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/theme-selector";
import Link from "next/link";
import { SmallScreenMenu } from "@/components/small-screen-menu";
import { useState } from "react";
import { ChevronRightIcon, Loader } from "lucide-react";

export const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const scrolled = useScrollTop();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className={cn(
          "w-full flex align-center justify-center sticky top-0 z-50 bg-background dark:bg-darkBackground p-6",
          scrolled && "border-b shadow-sm"
        )}
      >
        <div className="w-[85%] max-sm:w-ful flex items-center py-1">
          <Logo />
          {/* Big screens */}
          <div className="max-sm:hidden w-1/2 justify-end flex items-center gap-x-2">
            {!isLoaded && (
              <>
               <Loader className="mr-2 h-4 w-4 animate-spin"/>
              </>
            )}
            {!isSignedIn && isLoaded && (
              <>
                <SignInButton mode="modal">
                  <Button size="sm">
                    Login
                    <ChevronRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </SignInButton>
              </>
            )}
            {isSignedIn && isLoaded && (
              <>
                <p className="text-primary text-xs font-medium">
                  Welcome {user?.firstName}
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/documents">Enter Oclap Note</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
            <ThemeSelector />
          </div>
          {/* Small Screens */}
          <div className="sm:hidden w-1/2 justify-end flex items-center gap-x-2">
            <ThemeSelector />
            <Button size="icon" variant="outline">
              <HamburgerMenuIcon
                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
                onClick={toggle}
              />
            </Button>
          </div>
        </div>
      </div>
      <SmallScreenMenu isOpen={isOpen} toggle={toggle}>
        {!isLoaded && (
          <li
            key={1}
            className="px-4 size-full flex items-start decoration-0
                        list-none cursor-pointer border-b pb-2"
          >
            <Button disabled variant="link">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          </li>
        )}
        {!isSignedIn && isLoaded && (
          <li
            key={2}
            className="px-4 size-full flex items-start decoration-0 list-none
                    cursor-pointer border-b pb-2"
          >
            <SignInButton mode="modal">
              <Button variant="link">
                <PersonIcon className="mr-2 h-4 w-4" /> Login
              </Button>
            </SignInButton>
          </li>
        )}
        {isSignedIn && isLoaded && (
          <li
            key={3}
            className="px-4 size-full flex items-start decoration-0 list-none
                    cursor-pointer border-b pb-2"
          >
            <p className="ml-3 text-primary text-sm font-medium">
              Welcome {user?.firstName}
            </p>
          </li>
        )}
        {isSignedIn && isLoaded && (
          <li
            key={4}
            className="px-4 size-full flex items-start decoration-0 list-none
                    cursor-pointer border-b pb-2"
          >
            <Button variant="link" asChild>
              <Link href="/documents">Enter Oclap Note</Link>
            </Button>
          </li>
        )}
        {isSignedIn && isLoaded && (
          <li
            key={5}
            className="px-4 size-full flex items-start decoration-0 list-none
                    cursor-pointer border-b pb-2"
          >
            <div className="flex items-center">
              <UserButton afterSignOutUrl="/" />
              <span className="ml-2 text-primary text-sm font-medium">
                Your Account
              </span>
            </div>
          </li>
        )}
      </SmallScreenMenu>
    </>
  );
};
