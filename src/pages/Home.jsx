import About from "../components/homeComponents/About";
import Hero from "../components/homeComponents/Hero";
import Skills from "../components/homeComponents/Skills";
import Testimonials from "../components/homeComponents/Testimonials";
import TrustedMarquee from "../components/homeComponents/Trustedmarquee";
import SEO from "../components/ui/SEO";

const Home = () => {
  return (
    <div className="w-full">
      <SEO
        title="Ingénieur DevSecOps & Cloud Native"
        description="Portfolio de Jacquinot Randrianomenjanahary, Ingénieur DevSecOps spécialisé en infrastructures cloud-native, automatisation CI/CD, Kubernetes et sécurisation de pipelines."
        path="/"
      />
      <div className="justify-center pt-20">
        <Hero />
      </div>
      <div className="w-full">
        <TrustedMarquee />
        <About />
        <Skills />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
