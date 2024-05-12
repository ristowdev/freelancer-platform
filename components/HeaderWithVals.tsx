"use client"
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";

 
export default function HeaderWithVals() {

  const pathname = usePathname()

  // Check if the current route is '/inbox' or starts with '/inbox/'
  const isInboxPage = pathname.startsWith('/inbox');

  // Set hasCategories based on whether it's the inbox page or not
  const hasCategories = !isInboxPage;

  return (
    <Header 
        hasCategories={hasCategories}
        customContainer={`${isInboxPage ? "pl-[40px] pr-[40px]" : "container mx-auto"}`}
    />      
  );
}
