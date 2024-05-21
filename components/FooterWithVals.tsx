"use client"
import { usePathname } from "next/navigation";
import Footer from "./Footer";

 
export default function FooterWithVals() {

  const pathname = usePathname()

  // Check if the current route is '/inbox' or starts with '/inbox/'
  const isInboxPage = pathname.startsWith('/inbox');
  const isDashboard = pathname.startsWith('/dashboard');
  const isClientDashboard = pathname.startsWith('/client-dashboard');
  
  // const hasCategories = !isInboxPage;
  const includeFooter = !(isInboxPage || isDashboard || isClientDashboard);



  return (
    <Footer 
        includeFooter={includeFooter}
    />      
  );
}
