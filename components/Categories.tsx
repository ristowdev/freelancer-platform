// Categories.tsx
"use client";

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import queryString from "query-string";
import { Loading } from './auth/loading';

const Categories = () => {
  const categories = useQuery(api.categories.get);
   
  const router = useRouter();
  const handleClick = (slug: string) => { 
    router.push(`/category/${slug}`);
}; 

if (categories === undefined) {
  return <Loading />;
}
  return (
    <nav className='border-t border-b border-[#e4e5e7] h-11 flex items-center'>
      <div className='container mx-auto h-20 flex items-center justify-between'>
        {categories.map((category, index) => (
          <Button 
            key={index}
            className='text-base text-[#62646a] font-normal pl-0 pr-0' 
            variant="link"
            onClick={() => handleClick(category.slug)}
          >
            {category.name}
          </Button>
        ))} 
      </div> 
    </nav>
  );
};

export default Categories;
