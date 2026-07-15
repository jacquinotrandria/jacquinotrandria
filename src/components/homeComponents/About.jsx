import { IoFingerPrintOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SiKubernetes, SiTerraform, SiDocker } from "react-icons/si";
import img1 from "../../assets/icons/about4.jpeg";
import img2 from "../../assets/icons/about2.jpg";
import img3 from "../../assets/icons/about3.png";
import homeData from "../../data/home.json";
import { useNavigate } from "react-router-dom";

const Button = ({ children, className, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
);

const techIconMap = {
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
};

const About = () => {
  const { badge, title, diplomes, techIcons, buttonText } = homeData.about;

  const navigate = useNavigate();
  return (
    <section className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-7">
          {/* Badge */}
          <span className="w-fit text-[11px] tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#1f3d3d]/30 bg-[#e8f0ef] text-[#1f3d3d] font-semibold">
            {badge}
          </span>

          {/* Title */}
          <h2 className="text-xl md:text-[2rem] leading-relaxed text-gray-500">
            {title}
          </h2>

          {/* Diplômes */}
          <div className="flex flex-wrap gap-3 pt-2">
            {diplomes.map((dip, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <IoFingerPrintOutline
                  className="text-[#1f3d3d] shrink-0"
                  size={22}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {dip.titre}
                  </p>
                  <p className="text-xs text-gray-400 leading-snug">
                    {dip.description.split("\n").map((line, j, arr) => (
                      <span key={j}>
                        {line}
                        {j < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Small Tech Icons */}
          <div className="flex gap-3 pt-1">
            {techIcons.map((name, i) => {
              const Icon = techIconMap[name];
              return (
                <div
                  key={i}
                  title={name}
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#1f3d3d]/40 transition-all"
                >
                  <Icon className="text-[#1f3d3d]" size={20} />
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <Button
              className="inline-flex items-center gap-2 bg-[#1f3d3d] hover:bg-[#162e2e] text-white rounded-full px-7 py-3.5 text-sm font-medium transition-colors cursor-pointer active:scale-95"
              onClick={() => navigate("/projects")}
            >
              {buttonText}
              <IoChatbubbleEllipsesOutline size={16} />
            </Button>
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-4 h-[520px]">
          <div className="row-span-2">
            <img
              src={img3}
              alt="img3"
              className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-[0.2] transition"
            />
          </div>
          <div className="row-span-1">
            <img
              src={img1}
              alt="img1"
              className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-[0.2] transition"
            />
          </div>
          <div className="row-span-1">
            <img
              src={img2}
              alt="img2"
              className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-[0.2] transition"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 lg:hidden h-40 sm:h-52">
          <img
            src={img3}
            alt="img3"
            className="w-full h-full object-cover rounded-2xl grayscale"
          />
          <img
            src={img1}
            alt="img1"
            className="w-full h-full object-cover rounded-2xl grayscale"
          />
          <img
            src={img2}
            alt="img2"
            className="w-full h-full object-cover rounded-2xl grayscale"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
