"use client"
import { usePathname } from "next/navigation";
import Footer from "./Footer";

 
export default function FooterWithVals() {

  const pathname = usePathname()

  // Check if the current route is '/inbox' or starts with '/inbox/'
  const isInboxPage = pathname.startsWith('/inbox');

  // Set hasCategories based on whether it's the inbox page or not
  const includeFooter = !isInboxPage;

  return (
    <Footer 
        includeFooter={includeFooter}
    />      
  );
}
