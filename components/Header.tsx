'use client'; 
import { Button } from './ui/button';
import { usePathname } from 'next/navigation'; 
import { Input } from './ui/input';
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation'; 
import Categories from './Categories';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import { Heart } from 'lucide-react';
import Notifications from './header-realtime/notifications';
import InboxNotifications from './header-realtime/inbox';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';


interface HeaderPropos { 
  hasCategories?: boolean;
  customContainer?: string;
};

const Header = ({
    hasCategories = true,
    customContainer
}: HeaderPropos) => {
  const router = useRouter();
  console.log("containre - "+customContainer)
  return ( 
    <>
     <header 
        className={
          cn(
            'h-20 flex items-center justify-center',
            customContainer,
            !hasCategories && 'border-b border-[#e4e5e7]'
          )
        }
     >
        <div className='flex flex-1 items-center'>
          <div className='px-1'> 
            <span className='text-2xl'>RiseUpGram</span>
          </div>
          <div 
            className={
              cn(
                "flex  items-center space-x-2 relative ml-12",
                !hasCategories ? "w-full mr-[100px]" : "w-[500px]"
              )}
          
          >
            <Input 
              className='h-11 text-base'
              type="email" 
              placeholder="What project are you looking for today?" 
            />
            <Button type="submit" className='bg-black h-11 absolute right-0 rounded-l-none'><CiSearch color='white' size={20}/></Button>
          </div>
        </div>

        {/* if loged in */}
        
        {/*  */}

        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className='mr-[5px]'>
            <Notifications />
          </div>
          <div className='mr-[3px]'>
            <InboxNotifications />
          </div>
          <div className='mr-[30px]'>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={()=>{router.push('/favorites')}}><Heart size={20} color='#74767e'/></Button>
          </div>
          <div className='mr-[30px]'>
            <Link href="/proposals" className='text-base text-[#74767e] hover:text-[#1dbf73] font-semibold hover:underline'>Proposals</Link>
          </div>
          <UserButton />
        </SignedIn>

        
     </header>
     {hasCategories && <Categories /> }
    </>

  );
};
export default Header;
