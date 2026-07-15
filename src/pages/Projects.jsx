import Hero from "../components/projectComponents/Hero";
import ListProject from "../components/projectComponents/ListProject";
import SEO from "../components/ui/SEO";

const Projects = () => {
  return (
    <div className="w-full">
      <SEO
        title="Projets DevSecOps & Infrastructures Cloud"
        description="Découvrez les projets de Jacquinot R. : pipelines CI/CD Jenkins, sécurisation DevSecOps, migration Cloud Native avec Docker et Kubernetes, et architectures microservices."
        path="/projects"
      />
      <div className="justify-center pt-20">
        <Hero />
      </div>
      <div className="w-full">
        <ListProject />
      </div>
    </div>
  );
};

export default Projects;
