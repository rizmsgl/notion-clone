import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image src="/illustrations/not-found.png" height="300" width="300" alt="Not Found" className='dark:hidden'/>
      <Image src="/illustrations/not-found-dark.png" height="300" width="300" alt="Not Found" className='hidden dark:block'/>
      <h2 className='font-medium text-xl'>Nothing Here</h2>
      <Button asChild>
        <Link href="/">Go Back to Oclap Note</Link>
      </Button>
    </div>
  )
}

export default NotFound