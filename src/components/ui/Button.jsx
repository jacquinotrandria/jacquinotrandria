import PropTypes from "prop-types";

/**
 * Composant de bouton réutilisable avec support d'icônes.
 * * @component
 * @example
 * // Bouton standard avec texte et icône
 * <Button icon={<Icon />} onClick={() => console.log('clic')}>Contactez-moi</Button>
 * * @example
 * // Bouton icône uniquement (circulaire/carré)
 * <Button icon={<Icon />} iconOnly />
 */
const Button = ({
  children,
  onClick,
  className = "",
  icon = null,
  classNameIcon = "",
  iconOnly = false,
  noOffset = false,
}) => {
  const baseClasses = iconOnly
    ? "w-14 h-14 inline-flex items-center justify-center p-4 rounded-[24px] border"
    : noOffset
    ? "h-14 inline-flex items-center justify-between gap-4 pl-6 pr-4 py-4 rounded-[25px]"
    : "relative top-5 left-5  h-14 inline-flex items-center justify-between gap-4 pl-6 pr-4 py-4 rounded-[25px]";

  const iconSize = iconOnly ? "w-6 h-6" : "w-5 h-5";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} bg-randria-primary text-randria-white font-semibold ${className}`}
    >
      {!iconOnly && children && <span className="truncate">{children}</span>}
      {icon && (
        <span
          className={`flex items-center justify-center ${iconSize} ${classNameIcon}`}
        >
          {icon}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  /** Contenu du bouton (texte ou éléments React) */
  children: PropTypes.node,
  /** Fonction appelée lors du clic */
  onClick: PropTypes.func,
  /** Classes CSS supplémentaires pour le conteneur du bouton */
  className: PropTypes.string,
  /** L'élément icône (SVG, Lucide, LordIcon, etc.) */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Classes CSS supplémentaires pour le conteneur de l'icône */
  classNameIcon: PropTypes.string,
  /** Si true, affiche uniquement l'icône et ajuste le padding/format */
  iconOnly: PropTypes.bool,
  /** Si true, désactive le positionnement relatif (top-5, left-5) du bouton */
  noOffset: PropTypes.bool,
};

export default Button;
