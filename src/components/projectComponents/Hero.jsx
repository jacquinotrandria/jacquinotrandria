import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import projectsData from "../../data/projects.json";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { title, description, buttonText } = projectsData.hero;
  const navigate = useNavigate();

  return (
    <section className="w-full mx-auto text-center flex flex-col items-center gap-4 px-4 sm:px-6 py-10 sm:py-12">
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#1f3d3d] hover:text-teal-500">
        {title}
      </h1>

      <p className="text-[#1f3d3d]/50 max-w-lg text-sm sm:text-base leading-relaxed tracking-wide">
        {description}
      </p>

      <button
        className="inline-flex bg-[#1f3d3d] hover:bg-teal-500 items-center gap-2 border border-white/30 hover:border-white/60 text-white rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-95"
        onClick={() => navigate("/contact")}
      >
        {buttonText}
        <IoChatbubbleEllipsesOutline size={16} />
      </button>
    </section>
  );
};

export default Hero;
