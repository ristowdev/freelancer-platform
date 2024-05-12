import SubmitProposalCard from "./_components/submit-proposal-card";

interface PageProps {
    params: {
        slug: string
    }
}

const SubmitProposalPage = ({
    params
}: PageProps) => {

  return (
    <>
       <SubmitProposalCard 
            query={params}
       />
    </> 
  );
} 

export default SubmitProposalPage