import ExperienceSection from "../components/experComponents/ExperienceSection";
import Hero from "../components/experComponents/Hero";
import SEO from "../components/ui/SEO";

const Experiences = () => {
  return (
    <>
      <SEO
        title="Expériences Professionnelles DevSecOps"
        description="Parcours professionnel de Jacquinot R. : missions DevSecOps chez PNUD, ITDCMADA, EMIT et Ilafitany. Expertise Kubernetes, Jenkins, Docker et supervision Prometheus/Grafana."
        path="/experience"
      />
      <div className="w-full">
        <div className="justify-center pt-20">
          <Hero />
        </div>
        <div className="w-full">
          <ExperienceSection />
        </div>
      </div>
    </>
  );
};

export default Experiences;
