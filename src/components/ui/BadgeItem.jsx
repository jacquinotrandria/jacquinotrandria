import PropTypes from "prop-types";

/**
 * Composant BadgeItem pour afficher des informations avec icônes (ex: Diplômes, Compétences).
 * Gère un mode compact (icône seule) ou détaillé (titre + description).
 * * @component
 * @example
 * // 1. Utilisation complète (ex: Éducation / Expérience)
 * <BadgeItem
 * icon={<IoFingerPrintOutline size={36} />}
 * title="Master 1"
 * description="Modélisation et ingénierie informatique"
 * />
 * * @example
 * // 2. Utilisation en mode icône seule (iconOnly)
 * <BadgeItem
 * icon={<IoFingerPrintOutline size={36} />}
 * title="Master 1"
 * iconOnly
 * />
 */
const BadgeItem = ({
  icon = null,
  title,
  description,
  className = "",
  classNameIcon = "",
  iconOnly = false,
}) => {
  const baseClasses = iconOnly
    ? "flex items-center justify-center rounded-[16px] border border-gray-200 p-4"
    : "flex items-start gap-4 rounded-2xl border border-gray-200 p-4";

  return (
    <div className={`${baseClasses} ${className}`}>
      {icon && (
        <div
          className={`shrink-0 relative text-randria-secondary ${classNameIcon}`}
        >
          {icon}
        </div>
      )}

      {!iconOnly && (
        <div className="flex flex-col gap-1">
          {title && (
            <h4 className="font-bold text-sm text-randria-secondary">
              {title}
            </h4>
          )}

          {description && (
            <p className="text-xs text-randria-secondary leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

BadgeItem.propTypes = {
  /** L'icône à afficher (généralement un composant d'icône type React-Icons) */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Le titre de l'élément (obligatoire pour l'accessibilité, même si iconOnly est vrai) */
  title: PropTypes.string.isRequired,
  /** Texte complémentaire sous le titre */
  description: PropTypes.string,
  /** Classes CSS supplémentaires pour le conteneur principal */
  className: PropTypes.string,
  /** Classes CSS pour le conteneur de l'icône (ex: couleurs, marges) */
  classNameIcon: PropTypes.string,
  /** Si vrai, masque le titre et la description pour ne garder que l'icône dans un cadre carré */
  iconOnly: PropTypes.bool,
};

export default BadgeItem;
