import { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import logoPnud from "../../assets/logos/pnud-logo-blue.svg";
import experiencesData from "../../data/experiences.json";

const { years, experiences } = experiencesData.experienceSection;

// Années présentes dans les données (union des annee + fallback depuis organisation)
const getAnnee = (p) =>
  p.annee ?? (p.organisation.match(/\d{4}/)?.[0] || null);

const YEARS = years;

const ExperienceSection = () => {
  const [filtre, setFiltre] = useState("TOUS");
  const [recherche] = useState("");

  // Années qui ont au moins une expérience
  const anneesActives = new Set(experiences.map(getAnnee).filter(Boolean));

  const experienceAffiche = experiences.filter((p) => {
    const matchFiltre = filtre === "TOUS" || getAnnee(p) === filtre;
    const matchRecherche =
      recherche === "" ||
      p.organisation.toLowerCase().includes(recherche.toLowerCase()) ||
      p.description.toLowerCase().includes(recherche.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(recherche.toLowerCase()));
    return matchFiltre && matchRecherche;
  });

  return (
    <section
      className="w-full mt-10 min-h-screen px-4 sm:px-6 lg:px-10 py-12 sm:py-16"
      style={{
        background: `
          radial-gradient(ellipse at 80% 20%, rgba(13,90,75,0.3) 0%, transparent 55%),
          radial-gradient(ellipse at 10% 80%, rgba(10,60,55,0.35) 0%, transparent 50%),
          linear-gradient(135deg, #0a1f1c 0%, #0d2e29 45%, #0b2420 70%, #071a17 100%)
        `,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8 sm:gap-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/80 tracking-tight">
          Quelques clients pour lesquels j'ai travaillé
        </h2>

        {/* ── Timeline ── */}
        <div className="relative w-full py-10">
          {/* Ligne pointillée */}
          <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-white/20 -translate-y-1/2" />

          <div className="relative flex justify-between items-center">
            {/* Point "TOUS" sur la gauche */}
            <div
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setFiltre("TOUS")}
            >
              <span
                className={`absolute -top-6 text-xs font-bold tracking-widest transition ${
                  filtre === "TOUS"
                    ? "text-white"
                    : "text-white/40 group-hover:text-white"
                }`}
              >
                TOUS
              </span>
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  filtre === "TOUS"
                    ? "bg-white border-white/30 scale-150"
                    : "bg-white/40 border-white/30 group-hover:border-white"
                }`}
              />
              {filtre === "TOUS" && (
                <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#4ecdc4]/20 blur-md" />
              )}
            </div>

            {YEARS.map((year, i) => {
              const active = filtre === year;
              const hasData = anneesActives.has(year);

              return (
                <div
                  key={i}
                  className={`flex flex-col items-center group ${
                    hasData ? "cursor-pointer" : "cursor-default opacity-40"
                  }`}
                  onClick={() => hasData && setFiltre(year)}
                  title={!hasData ? "Aucune expérience pour cette année" : ""}
                >
                  <span
                    className={`absolute -top-6 text-xs font-bold tracking-widest transition ${
                      active
                        ? "text-white"
                        : hasData
                        ? "text-white/40 group-hover:text-white"
                        : "text-white/20"
                    }`}
                  >
                    {year}
                  </span>

                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all ${
                      active
                        ? "bg-white border-white/30 scale-150"
                        : hasData
                        ? "bg-[#4ecdc4]/60 border-[#4ecdc4]/40 group-hover:border-white"
                        : "bg-white/20 border-white/20"
                    }`}
                  />

                  {/* Badge compteur sur les années avec data */}
                  {hasData && !active && (
                    <span className="absolute -bottom-6 text-[10px] text-[#4ecdc4]/60 font-bold">
                      {experiences.filter((p) => getAnnee(p) === year).length}
                    </span>
                  )}

                  {active && (
                    <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#4ecdc4]/20 blur-md" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Résumé filtre actif ── */}
        <div className="flex items-center gap-3 -mt-2">
          <span className="text-white/40 text-xs">
            {filtre === "TOUS"
              ? `${experiences.length} expérience${experiences.length > 1 ? "s" : ""} au total`
              : `${experienceAffiche.length} expérience${experienceAffiche.length > 1 ? "s" : ""} en ${filtre}`}
          </span>
          {filtre !== "TOUS" && (
            <button
              onClick={() => setFiltre("TOUS")}
              className="text-[10px] text-[#4ecdc4]/60 hover:text-[#4ecdc4] border border-[#4ecdc4]/20 hover:border-[#4ecdc4]/40 rounded-full px-2.5 py-0.5 transition-all"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* ── Cards ── */}
        <div className="flex flex-col gap-5">
          {experienceAffiche.length === 0 && (
            <p className="text-white/30 text-sm text-center py-16">
              Aucune expérience trouvée pour {filtre}.
            </p>
          )}

          {experienceAffiche.map((projet, i) => {
            const imageAGauche = i % 2 === 0;

            const ImageBlock = (
              <div
                className="flex items-center justify-center min-h-56 md:min-h-0 p-6"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(31,61,61,0.45) 0%, rgba(10,31,28,0.85) 100%)",
                }}
              >
                {projet.image ? (
                  <img
                    src={logoPnud}
                    alt={projet.sousTitre}
                    className="h-120 grayscale hover:grayscale-0 object-contain transition-all duration-500"
                  />
                ) : (
                  <div className="relative flex items-end justify-center w-full h-full px-8 py-8">
                    <div
                      className="w-full max-w-xs rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <div className="h-4 bg-white/10 flex items-center gap-1 px-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      </div>
                      <div className="h-32 flex items-center justify-center">
                        <span className="text-white/15 text-xs tracking-widest uppercase">
                          Aperçu
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );

            const TextBlock = (
              <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
                <div>
                  <p className="text-[#4ecdc4] text-[13px] font-bold tracking-widest uppercase mb-1">
                    {projet.categorie}
                  </p>
                  <p className="text-white font-bold text-sm sm:text-base">
                    {projet.organisation}
                  </p>
                  <p className="text-white/70 text-sm">{projet.sousTitre}</p>
                </div>

                <p className="text-white/60 text-sm leading-relaxed">
                  {projet.description}
                </p>

                {projet.responsabilites && (
                  <ul className="text-white/60 text-sm space-y-1.5 list-disc pl-4">
                    {projet.responsabilites.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}

                {projet.resultats && (
                  <div className="flex flex-wrap gap-2">
                    {projet.resultats.map((res, j) => (
                      <span
                        key={j}
                        className="text-xs bg-[#4ecdc4]/10 text-[#4ecdc4] px-3 py-1 rounded-full border border-[#4ecdc4]/20"
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-white/35 text-xs">{projet.tags?.join(" · ")}</p>

                <button className="mt-1 inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 active:scale-95 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-all w-fit">
                  En savoir plus
                  <IoChatbubbleEllipsesOutline size={15} />
                </button>
              </div>
            );

            return (
              <div
                key={i}
                className="group grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
                style={{ minHeight: "320px" }}
              >
                {imageAGauche ? (
                  <>
                    {ImageBlock}
                    {TextBlock}
                  </>
                ) : (
                  <>
                    {TextBlock}
                    {ImageBlock}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
