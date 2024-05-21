"use client"
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";

 
export default function HeaderWithVals() {

  const pathname = usePathname()

  const isInboxPage = pathname.startsWith('/inbox');
  const isDashboard = pathname.startsWith('/dashboard');
  const isClientDashboard = pathname.startsWith('/client-dashboard');
  
  const hasCategories = !(isInboxPage || isDashboard || isClientDashboard);
  const container = isInboxPage || isDashboard || isClientDashboard;


  return (
    <Header 
        hasCategories={hasCategories}
        customContainer={`${container ? "pl-[40px] pr-[40px]" : "container mx-auto"}`}
        fixed={isDashboard || isClientDashboard}
    />      
  );
}
