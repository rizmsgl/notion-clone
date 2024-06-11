"use client"
import React, { useState } from 'react'
import Image from "next/image";
import { SignInButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, Loader, MoveRight } from 'lucide-react';
import Link from 'next/link';
type Props = {}

const Hero = (props: Props) => {
    const { isLoaded, isSignedIn } = useUser();
  const [hovered, setHovered] = useState(false);
  const onHover = () => {
    setHovered(!hovered);
  };
  return (
    <div className='bg-background dark:bg-darkBackground'>
        <div className='size-full min-h-[80vh] py-4 mx-auto gap-x-2 flex items-center 
        justify-center max-w-[1100px] max-sm:flex-col max-sm:px-4 max-sm:pb-4
        '>
            <div className='max-sm:gap-y-2'>
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
              <div className="flex flex-start max-sm:mb-4">
                {!isLoaded && (
                  <Button variant="link">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
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
                        <MoveRight className="h-4 w-4 ml-2" />
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
                        <MoveRight className="h-4 w-4 ml-2" />
                      )}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className='rounded-xl 
            py-5 px-3 flex items-center 
            justify-center bg-stone-100 drop-shadow-lg'>
            <Image
              src="/illustrations/hero.png"
              alt="Hero"
              width={700}
              height={700}
              className='min-w-[500px] max-sm:min-w-[300px]'
            />
            </div>
        </div>
    </div>
  )
}

export default Hero

