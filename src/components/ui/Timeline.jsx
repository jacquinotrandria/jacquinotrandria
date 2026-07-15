import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Composant Timeline réutilisable pour afficher une chronologie de projets/événements
 * @component
 * @example
 * // Timeline simple avec projets
 * const items = [
 *   {
 *     year: 2024,
 *     subtitle: "PNUD - 2024",
 *     title: "Lorem ipsum dolor sit amet, consectetur",
 *     description: "Catégorie Partenaire, CVN Jenkins CMS Lab",
 *     image: "/path/to/image.jpg",
 *     link: "/projects/1",
 *     buttonText: "En savoir plus"
 *   },
 *   // ... more items
 * ];
 * <Timeline items={items} />
 *
 * @example
 * // Timeline avec callback au clic
 * <Timeline 
 *   items={items}
 *   onItemClick={(item) => console.log(item)}
 * />
 */
const Timeline = ({
  items = [],
  onItemClick = null,
  className = "",
  classNameItem = "",
  classNameImage = "",
  classNameContent = "",
  variant = "default",
}) => {
  const variantStyles = {
    default: {
      timelineBar: "bg-randria-gray/20",
      dot: "bg-randria-gray",
      subtitle: "text-randria-gray text-xs font-light",
      title: "text-randria-white font-semibold text-lg",
      description: "text-randria-white/80 text-sm",
      card: "bg-gradient-to-br from-randria-secondary to-randria-secondary/80 rounded-[32px]",
      button: "bg-randria-white text-randria-dark hover:bg-randria-white/90",
    },
    primary: {
      timelineBar: "bg-randria-primary/20",
      dot: "bg-randria-primary",
      subtitle: "text-randria-primary text-xs font-light",
      title: "text-randria-dark font-bold text-lg",
      description: "text-randria-dark/70 text-sm",
      card: "bg-gradient-to-br from-randria-primary/20 to-randria-primary/10 border border-randria-primary/30 rounded-[32px]",
      button: "bg-randria-primary text-white hover:bg-randria-primary/90",
    },
  };

  const styles = variantStyles[variant] || variantStyles.default;

  if (!items || items.length === 0) {
    return <div className={`text-center py-8`}>Aucun élément à afficher</div>;
  }

  return (
    <div className={`w-full  ${className}`}>
      {/* Timeline avec années */}
      <div className="w-full px-6 py-8">
        <div className="relative mb-16">
          {/* Ligne horizontale */}
          <div className={`absolute top-4 left-0 right-0 h-1 ${styles.timelineBar}`}></div>

          {/* Points et années */}
          <div className="relative flex justify-between items-start">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${styles.dot} relative z-10`}></div>
                <span className="text-xs text-randria-gray/60">{item.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Items alternés */}
      <div className="px-6 pb-8 space-y-12">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"} ${classNameItem}`}
            >
              {/* Image */}
              <div className="flex-1 min-w-0">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-auto rounded-2xl object-cover shadow-lg ${classNameImage}`}
                  />
                )}
              </div>

              {/* Contenu */}
              <div
                className={`flex-1 p-8 ${styles.card} flex flex-col gap-4 ${classNameContent}`}
              >
                {item.subtitle && (
                  <p className={styles.subtitle}>{item.subtitle}</p>
                )}

                {item.title && (
                  <h3 className={styles.title}>{item.title}</h3>
                )}

                {item.description && (
                  <p className={styles.description}>{item.description}</p>
                )}

                {(item.link || item.buttonText || item.onClick) && (
                  <div className="mt-4">
                    {item.link ? (
                      <Link
                        to={item.link}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-colors ${styles.button}`}
                      >
                        {item.buttonText || "En savoir plus"}
                        {item.icon && <span>{item.icon}</span>}
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick(item);
                          } else if (onItemClick) {
                            onItemClick(item);
                          }
                        }}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-colors ${styles.button}`}
                      >
                        {item.buttonText || "En savoir plus"}
                        {item.icon && <span>{item.icon}</span>}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Timeline.propTypes = {
  /** Array d'objets représentant les éléments de la timeline */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      subtitle: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      link: PropTypes.string,
      buttonText: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.node,
    })
  ),
  /** Fonction appelée quand on clique sur un bouton (si pas de link) */
  onItemClick: PropTypes.func,
  /** Classes CSS supplémentaires pour le conteneur */
  className: PropTypes.string,
  /** Classes CSS supplémentaires pour chaque item */
  classNameItem: PropTypes.string,
  /** Classes CSS supplémentaires pour les images */
  classNameImage: PropTypes.string,
  /** Classes CSS supplémentaires pour le contenu */
  classNameContent: PropTypes.string,
  /** Variante visuelle : 'default', 'primary' */
  variant: PropTypes.oneOf(["default", "primary"]),
};

export default Timeline;
