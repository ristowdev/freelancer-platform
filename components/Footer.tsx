

interface HeaderPropos { 
  includeFooter?: boolean;
};

const Footer = ({
  includeFooter = true, 
}: HeaderPropos) => {

  return (
    <>
    {includeFooter && 
     <footer className='border-t border-[#e4e5e7] mt-[100px]'>
        <div className='container mx-auto flex justfy-center flex-col h-[350px] pt-[50px]'>
RiseUpGram
        </div>
     </footer>}
    </>

  );
};
export default Footer;
