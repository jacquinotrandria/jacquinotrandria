import { VscCode, VscTerminal, VscGraph } from "react-icons/vsc";
import { TbWorld } from "react-icons/tb";
import { HiArrowRight } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import homeData from "../../data/home.json";
import { useNavigate } from "react-router-dom";

const skillIcons = [VscCode, VscTerminal, VscGraph, TbWorld];

const Skills = () => {
  const { badge, title, description, skills, buttonText } = homeData.skills;
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #0d2e2e 0%, #071a1a 60%, #040f0f 100%)",
      }}
    >
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#00c9c9] font-semibold border border-[#00c9c9]/30 px-4 py-1.5 rounded-full bg-[#00c9c9]/5">
            <span>&#9432;</span> {badge}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {skills.map(({ title, description }, i) => {
            const Icon = skillIcons[i];
            return (
              <div
                key={i}
                className="group flex flex-col gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#00c9c9]/40 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#00c9c9]/10 border border-[#00c9c9]/20 group-hover:bg-[#00c9c9]/20 transition-colors">
                  <Icon className="text-[#00c9c9]" size={20} />
                </div>

                <h3 className="text-white font-bold text-base leading-snug whitespace-pre-line">
                  {title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                  {description}
                </p>

                <button
                  className="flex items-center gap-2 text-[#00c9c9] text-sm font-medium group-hover:gap-3 transition-all w-fit"
                  onClick={() => navigate("/projects")}
                >
                  Voir plus <HiArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        <button
          className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white rounded-full px-7 py-3.5 text-sm font-medium transition-all hover:bg-white/5 active:scale-95"
          onClick={() => navigate("/contact")}
        >
          {buttonText}
          <IoChatbubbleEllipsesOutline size={16} />
        </button>
      </div>
    </section>
  );
};

export default Skills;
