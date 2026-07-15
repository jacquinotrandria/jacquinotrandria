import { useState, useEffect, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import homeData from "../../data/home.json";
import { useNavigate } from "react-router-dom";

const temoignages = homeData.testimonials.temoignages;
const buttonText = homeData.testimonials.buttonText;

/**
 * Heuristic: detect if a background colour is "dark".
 * Accepts any CSS colour that can be parsed via a hidden canvas.
 */
function isDarkColor(color) {
  if (!color) return false;

  // Keyword shortcuts
  const dark = [
    "#1f3d3d",
    "#1a3535",
    "#162e2e",
    "#0f2020",
    "#000",
    "#000000",
    "black",
  ];
  const light = ["white", "#fff", "#ffffff", "#eaf5f2", "#f0faf7", "#e8f4f1"];
  if (dark.some((c) => color.toLowerCase().startsWith(c))) return true;
  if (light.some((c) => color.toLowerCase().startsWith(c))) return false;

  // Fallback: paint to canvas and read luminance
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  } catch {
    return false;
  }
}

const Testimonials = ({ background, isContact = false }) => {
  const [actuel, setActuel] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const dark = isDarkColor(background);

  const navigate = useNavigate();

  // ── Derived palette ──────────────────────────────────────────────
  const colors = dark
    ? {
        // On dark background → light text
        watermark: "rgba(255,255,255,0.06)",
        openQuote: "rgba(255,255,255,0.85)",
        arrowIdle: "rgba(255,255,255,0.35)",
        arrowHover: "#ffffff",
        quoteBody: "rgba(255,255,255,0.75)",
        quoteStrong: "#ffffff",
        authorName: "rgba(255,255,255,0.90)",
        authorRole: "rgba(255,255,255,0.45)",
        dotActive: "#ffffff",
        dotIdle: "rgba(255,255,255,0.25)",
        avatarBg: "rgba(255,255,255,0.15)",
        avatarText: "#ffffff",
        btnBg: "#ffffff",
        btnText: "#1a3535",
        btnHoverBg: "#d4efea",
        btnBorder: "transparent",
      }
    : {
        // On light background → dark text
        watermark: "rgba(31,61,61,0.07)",
        openQuote: "#1f3d3d",
        arrowIdle: "#9ca3af",
        arrowHover: "#1f3d3d",
        quoteBody: "#4b5563",
        quoteStrong: "#1f2937",
        authorName: "#1f2937",
        authorRole: "#9ca3af",
        dotActive: "#1f3d3d",
        dotIdle: "#d1d5db",
        avatarBg: "linear-gradient(135deg, #1f3d3d, #2d5a5a)",
        avatarText: "#ffffff",
        btnBg: "#1f3d3d",
        btnText: "#ffffff",
        btnHoverBg: "#2d5a5a",
        btnBorder: "transparent",
      };

  // ── Navigation ───────────────────────────────────────────────────
  const aller = (idx, dir) => {
    if (animation) return;
    setDirection(dir);
    setAnimation(true);
    setTimeout(() => {
      setActuel(idx);
      setAnimation(false);
    }, 300);
  };

  const precedent = () =>
    aller((actuel - 1 + temoignages.length) % temoignages.length, -1);
  const suivant = () => aller((actuel + 1) % temoignages.length, 1);

  useEffect(() => {
    timerRef.current = setTimeout(suivant, 5000);
    return () => clearTimeout(timerRef.current);
  }, [actuel]);

  const t = temoignages[actuel];

  const handleButtonClickContactOrScrollToTop = () => {
    if (isContact) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/contact");
    }
  };

  return (
    <section
      className="w-full py-16 sm:py-20 px-4 overflow-hidden relative"
      style={{ background }}
    >
      {/* ── Watermark ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-black uppercase tracking-tight leading-none"
          style={{
            fontSize: "clamp(50px, 14vw, 180px)",
            color: "transparent",
            WebkitTextStroke: `2px ${colors.watermark}`,
            whiteSpace: "nowrap",
          }}
        >
          JACQUINOT R.
        </span>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
        {/* Opening quote */}
        <span
          className="text-6xl sm:text-7xl font-black leading-none select-none"
          style={{ fontFamily: "Georgia, serif", color: colors.openQuote }}
        >
          &ldquo;
        </span>

        {/* Slide */}
        <div
          className="w-full flex items-center gap-2 sm:gap-4 transition-all duration-300"
          style={{
            opacity: animation ? 0 : 1,
            transform: animation
              ? `translateX(${direction * 20}px)`
              : "translateX(0)",
          }}
        >
          <button
            onClick={precedent}
            className="shrink-0 w-8 h-8 flex items-center justify-center transition-colors"
            style={{ color: colors.arrowIdle }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = colors.arrowHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = colors.arrowIdle)
            }
          >
            <HiChevronLeft size={22} />
          </button>

          <p
            className="text-center text-base sm:text-lg md:text-xl leading-relaxed flex-1"
            style={{ fontFamily: "Georgia, serif", color: colors.quoteBody }}
          >
            &ldquo;{t.citation}{" "}
            <strong style={{ color: colors.quoteStrong, fontWeight: 700 }}>
              {t.gras}
            </strong>
            {t.suite}&rdquo;
          </p>

          <button
            onClick={suivant}
            className="shrink-0 w-8 h-8 flex items-center justify-center transition-colors"
            style={{ color: colors.arrowIdle }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = colors.arrowHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = colors.arrowIdle)
            }
          >
            <HiChevronRight size={22} />
          </button>
        </div>

        {/* Author */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: colors.avatarBg,
              color: colors.avatarText,
            }}
          >
            {t.initiales}
          </div>
          <p
            className="font-semibold text-sm sm:text-base"
            style={{ color: colors.authorName }}
          >
            {t.nom}
          </p>
          <p
            className="text-xs sm:text-sm"
            style={{ color: colors.authorRole }}
          >
            {t.role}
          </p>
        </div>

        {/* Dots */}
        <div className="flex gap-2 items-center">
          {temoignages.map((_, i) => (
            <button
              key={i}
              onClick={() => aller(i, i > actuel ? 1 : -1)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === actuel ? "24px" : "6px",
                height: "6px",
                background: i === actuel ? colors.dotActive : colors.dotIdle,
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          className="inline-flex items-center gap-2 active:scale-95 rounded-xl px-7 py-3.5 text-sm font-medium transition-all mt-2"
          style={{
            background: colors.btnBg,
            color: colors.btnText,
            border: `1px solid ${colors.btnBorder}`,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = colors.btnHoverBg)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = colors.btnBg)
          }
          onClick={handleButtonClickContactOrScrollToTop}
        >
          {buttonText}
          <IoChatbubbleEllipsesOutline size={16} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
