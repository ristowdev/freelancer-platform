"use client"
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";

 
export default function HeaderWithVals() {

  const pathname = usePathname()

  // Check if the current route is '/inbox' or starts with '/inbox/'
  const isInboxPage = pathname.startsWith('/inbox');
  const isDashboard = pathname.startsWith('/dashboard');
  
  // const hasCategories = !isInboxPage;
  const hasCategories = !(isInboxPage || isDashboard);
  const container = isInboxPage || isDashboard;


  return (
    <Header 
        hasCategories={hasCategories}
        customContainer={`${container ? "pl-[40px] pr-[40px]" : "container mx-auto"}`}
        fixed={isDashboard}
    />      
  );
}
