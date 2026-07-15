import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full flex items-center justify-center px-4 overflow-hidden">

      {/* Watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{
            fontSize: "clamp(120px, 30vw, 380px)",
            fontFamily: "'Georgia', serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            WebkitTextStroke: "1.5px rgba(31,61,61,0.07)",
            color: "transparent",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          404
        </span>
      </div>

      {/* Vignette edges */}
      <div className="absolute inset-y-0 left-0 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-md">

        {/* Badge */}
        <span className="w-fit text-[11px] tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#1f3d3d]/30 bg-[#e8f0ef] text-[#1f3d3d] font-semibold">
          Erreur 404
        </span>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-bold text-[#1f3d3d] leading-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Page introuvable
        </h1>

        {/* Divider */}
        <div className="w-12 h-px bg-[#1f3d3d]/30" />

        {/* Description */}
        <p className="text-gray-500 text-base leading-relaxed">
          La page que vous cherchez n'existe pas ou a été déplacée.
          Revenez à l'accueil pour continuer.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 bg-[#1f3d3d] hover:bg-[#162e2e] active:scale-95 text-white rounded-2xl px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200"
            style={{ boxShadow: "0 4px 20px rgba(31,61,61,0.25)" }}
          >
            <HiArrowLeft size={16} />
            Retour à l'accueil
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 border border-[#1f3d3d]/30 hover:border-[#1f3d3d]/60 text-[#1f3d3d] rounded-2xl px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-[#1f3d3d]/5"
          >
            Contactez-moi
            <IoChatbubbleEllipsesOutline size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default NotFound;