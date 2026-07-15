import PropTypes from "prop-types";

/**
 * Composant Badge pour afficher des étiquettes de statut ou de catégorie.
 * * @component
 * @example
 * // 1. Variante Primary avec icône (Fond blanc sur icône)
 * <Badge
 * variant="primary"
 * icon={<BsStars />}
 * classNameIcon="bg-randria-white rounded-full text-randria-primary w-4 h-3.25"
 * >
 * FAQS
 * </Badge>
 * * @example
 * // 2. Variante Outline (Icône avec fond primaire)
 * <Badge
 * variant="outline"
 * icon={<BsStars />}
 * classNameIcon="bg-randria-primary rounded-full text-randria-white w-4 h-3.25"
 * >
 * FAQS
 * </Badge>
 * * @example
 * // 3. Variante Secondary (Icône avec fond blanc et texte secondaire)
 * <Badge
 * variant="secondary"
 * icon={<BsStars />}
 * classNameIcon="bg-randria-white rounded-full text-randria-secondary w-4 h-3.25"
 * >
 * FAQS
 * </Badge>
 */
const Badge = ({
  children,
  icon = null,
  variant = "secondary",
  className = "",
  classNameIcon = "",
}) => {
  const baseClasses =
    "inline-flex items-center gap-1 w-[58px] h-[16px] pt-[2px] pb-[2px] pr-2 pl-[2px] rounded-[25px] text-xs font-medium";

  const variants = {
    primary: "bg-randria-primary text-randria-white",
    secondary: "bg-randria-secondary text-randria-white",
    outline: "bg-transparent text-randria-primary",
    dark: "bg-randria-black text-randria-white",
  };

  const variantClass = variants[variant] || variants.secondary;

  return (
    <div className={`${baseClasses} ${variantClass} ${className}`}>
      {icon && (
        <span className={`flex items-center justify-center ${classNameIcon}`}>
          {icon}
        </span>
      )}
      <span className="leading-none">{children}</span>
    </div>
  );
};

Badge.propTypes = {
  /** Contenu textuel du badge */
  children: PropTypes.node.isRequired,
  /** Élément icône (ex: <BsStars />) */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Style visuel prédéfini */
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "dark"]),
  /** Classes CSS pour le conteneur global */
  className: PropTypes.string,
  /** Classes CSS pour le conteneur de l'icône (couleur de fond, arrondi, taille) */
  classNameIcon: PropTypes.string,
};

export default Badge;
