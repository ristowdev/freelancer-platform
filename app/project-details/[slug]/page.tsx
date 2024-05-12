import ProjectDetailsCard from "./_components/project-details-card";

interface PageProps {
    params: {
        slug: string
    }
}

const ProjectDetailsPage = ({
    params
}: PageProps) => {

  return (
    <>
       <ProjectDetailsCard 
            query={params}
       />
    </> 
  );
} 

export default ProjectDetailsPage