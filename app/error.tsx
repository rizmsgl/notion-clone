"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'


const Error = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image src="/illustrations/error.png" height="300" width="300" alt="Error" className='dark:hidden'/>
      <Image src="/illustrations/error-dark.png" height="300" width="300" alt="Error" className='hidden dark:block'/>
      <h2 className='font-medium text-xl'>Something Went Wrong</h2>
      <Button asChild>
        <Link href="/">Go Back to Oclap Note</Link>
      </Button>
    </div>
  )
}

export default Error