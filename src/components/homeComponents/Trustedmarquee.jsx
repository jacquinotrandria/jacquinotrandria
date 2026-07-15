import logoEmit from "../../assets/logos/logo-emit.png";
import logoPnud from "../../assets/logos/logo-pnud.png";
import logoUf from "../../assets/logos/logo-uf.png";
import logoItdcmada from "../../assets/logos/logo-itdc.png";
import logoAdminGoSmart from "../../assets/logos/logo-admingosmart.png";
import homeData from "../../data/home.json";

const TrustedMarquee = () => {
  const { title1, title2, duration, logos } = homeData.trustedMarquee;

  const logoMap = {
    EMIT: logoEmit,
    PNUD: logoPnud,
    UF: logoUf,
    ITDCMADA: logoItdcmada,
    AdminGoSmart: logoAdminGoSmart,
  };

  return (
    <section
      className="w-full mt-10 py-12 sm:py-16 overflow-hidden relative"
      style={{
        background: `
          radial-gradient(ellipse at 80% 50%, rgba(13, 90, 75, 0.35) 0%, transparent 60%),
          radial-gradient(ellipse at 20% 80%, rgba(10, 60, 55, 0.4) 0%, transparent 50%),
          linear-gradient(135deg, #0b2622 0%, #0d2e29 40%, #102e28 70%, #0a1f1c 100%)
        `,
      }}
    >
      {/* Keyframes injected via <style> */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll ${duration}s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 px-4 sm:px-8">
        {/* Title */}
        <div className="mb-8 sm:mb-10">
          <p className="text-white/50 text-lg sm:text-xl font-light tracking-wide">
            {title1}
          </p>
          <p className="text-white text-xl sm:text-2xl font-bold tracking-tight">
            {title2}
          </p>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 h-full w-16 sm:w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #0b2622 0%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 h-full w-16 sm:w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #0b2622 0%, transparent 100%)",
          }}
        />

        <div className="marquee-track">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className="flex items-center gap-12 sm:gap-20 px-6 sm:px-10 shrink-0"
            >
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="shrink-0 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 group"
                  style={{ minWidth: "120px" }}
                >
                  <img
                    src={logoMap[logo.alt]}
                    alt={logo.alt}
                    className="h-10 sm:h-14 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedMarquee;
