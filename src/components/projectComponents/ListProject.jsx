import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import projectsData from "../../data/projects.json";

const { categories, projets } = projectsData.listProject;

const ListProject = () => {
  const [filtre, setFiltre] = useState("TOUS");
  const [recherche, setRecherche] = useState("");

  const projectAffiches = projets.filter((p) => {
    const matchFiltre = filtre === "TOUS" || p.categorie === filtre;
    const matchRecherche =
      recherche === "" ||
      p.organisation.toLowerCase().includes(recherche.toLowerCase()) ||
      p.description.toLowerCase().includes(recherche.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(recherche.toLowerCase()));
    return matchFiltre && matchRecherche;
  });

  return (
    <section
      className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-12 sm:py-16"
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
          Organisations &amp; projets réalisés
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltre(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${
                  filtre === cat
                    ? "bg-[#1f3d3d] text-white border border-[#1f3d3d]"
                    : "bg-transparent text-white/60 border border-white/20 hover:border-white/40 hover:text-white/90"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 border border-white/20 rounded-full px-4 py-2.5 bg-white/5 backdrop-blur-sm w-full sm:w-72">
            <input
              type="text"
              placeholder="Rechercher"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="bg-transparent text-white/80 placeholder-white/30 text-sm outline-none flex-1"
            />
            <HiSearch className="text-white/40 shrink-0" size={18} />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {projectAffiches.length === 0 && (
            <p className="text-white/30 text-sm text-center py-16">
              Aucun projet trouvé.
            </p>
          )}

          {projectAffiches.map((projet, i) => {
            const imageAGauche = i % 2 === 0;

            const ImageBlock = (
              <div
                className="flex items-center justify-center min-h-56 md:min-h-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(31,61,61,0.45) 0%, rgba(10,31,28,0.85) 100%)",
                }}
              >
                {projet.image ? (
                  <img
                    src={projet.image}
                    alt={projet.sousTitre}
                    className="w-full h-full object-cover"
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
              <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
                <div>
                  <p className="text-[#4ecdc4] text-[17px] font-bold tracking-widest uppercase mb-1">
                    {projet.organisation}
                  </p>
                  <p className="text-white font-bold text-sm sm:text-base leading-snug">
                    {projet.sousTitre}
                  </p>
                </div>

                {Array.isArray(projet.description) ? (
                  <ul className="text-white/60 text-sm leading-relaxed space-y-1.5 list-disc list-outside pl-4">
                    {projet.description.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {projet.description}
                  </p>
                )}

                <p className="text-white/35 text-xs">
                  {projet.tags.join(" · ")}
                </p>

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

export default ListProject;
