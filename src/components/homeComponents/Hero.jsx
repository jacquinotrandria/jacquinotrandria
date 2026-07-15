import { Button } from "@components/ui";
import homeData from "../../data/home.json";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { titleParts, description, cta } = homeData.hero;
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto text-center flex flex-col items-center gap-4 px-4 sm:px-6 py-6 sm:py-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
        <span className="text-gray-400 font-medium">{titleParts.lead} </span>
        <br className="hidden sm:block" />
        <span className="text-[#1f3d3d] hover:text-teal-500 font-bold">
          {titleParts.accent1}{" "}
          <span className="text-gray-400 font-medium">
            {titleParts.connector}{" "}
          </span>
        </span>
        <br className="hidden sm:block" />
        <span className="text-[#1f3d3d] hover:text-teal-500 font-bold">
          {titleParts.accent2}
        </span>
      </h1>

      {/* Description */}
      <p className="text-gray-400 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed px-1">
        {description}
      </p>

      {/* CTA */}
      <Button
        className="mt-4 bg-[#1f3d3d] hover:bg-teal-500 active:scale-95 text-white rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 transition-all"
        onClick={() => navigate("/projects")}
      >
        {cta}
      </Button>
    </div>
  );
};

export default Hero;
