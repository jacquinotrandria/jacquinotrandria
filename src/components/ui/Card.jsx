import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Composant Card pour présenter des services, des fonctionnalités ou des liens.
 * Utilise 'react-router-dom' pour la navigation interne.
 * * @component
 * @example
 * // 1. Exemple spécifique avec personnalisation des styles de texte
 * <Card
 * icon={<BsFillChatSquareTextFill />}
 * title="CI/CD & Automatisation"
 * description="Pipelines CI/CD sécurisés avec Jenkins, GitHub Ac..."
 * link={{ href: "/about", label: "Learn more" }}
 * variant="secondary"
 * classNameTitle="text-randria-white"
 * classNameDescription="text-randria-gray"
 * />
 * * @example
 * // 2. Variante Dark pour un contraste fort
 * <Card
 * variant="dark"
 * icon={<FiCpu />}
 * title="Architecture IT"
 * description="Solutions robustes pour vos infrastructures."
 * />
 * * @example
 * // 3. Variante White avec icône colorée
 * <Card
 * variant="white"
 * icon={<FiDatabase />}
 * title="Base de données"
 * description="Optimisation et gestion de vos données critiques."
 * classNameIcon="text-randria-primary"
 * />
 */
const Card = ({
  children,
  icon = null,
  title,
  description,
  link = null,
  variant = "secondary",
  className = "",
  classNameIcon = "",
  classNameTitle = "",
  classNameDescription = "",
}) => {
  const variants = {
    primary:
      "bg-transparent border border-randria-primary text-randria-primary",
    secondary:
      "bg-transparent border border-randria-secondary text-randria-secondary",
    white: "bg-randria-white border border-gray-200",
    dark: "bg-randria-black border border-randria-black text-randria-white",
  };

  const variantClass = variants[variant] || variants.secondary;

  return (
    <div
      className={`w-62 rounded-2xl border p-8 gap-4 flex flex-col justify-between items-center ${variantClass} ${className}`}
    >
      {icon && (
        <div
          className={`flex items-center justify-center w-7 h-7 ${classNameIcon}`}
        >
          {icon}
        </div>
      )}

      {title && (
        <h3 className={`font-bold text-center text-lg ${classNameTitle}`}>
          {title}
        </h3>
      )}

      {description && (
        <p
          className={`text-sm text-center leading-relaxed ${classNameDescription}`}
        >
          {description}
        </p>
      )}

      {link && (
        <Link
          to={link.href}
          className="text-xs font-medium text-center hover:underline"
        >
          {link.label} →
        </Link>
      )}

      {children}
    </div>
  );
};

Card.propTypes = {
  /** Contenu personnalisé optionnel en bas de carte */
  children: PropTypes.node,
  /** Icône ou composant graphique (ex: Lucide, React Icons, Bootstrap Icons) */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Titre principal de la carte */
  title: PropTypes.string,
  /** Texte descriptif court */
  description: PropTypes.string,
  /** Objet contenant l'URL (href) et le texte (label) pour le composant Link */
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  /** Thème visuel prédéfini gérant les bordures et couleurs par défaut */
  variant: PropTypes.oneOf(["primary", "secondary", "white", "dark"]),
  /** Classes CSS additionnelles pour le conteneur principal */
  className: PropTypes.string,
  /** Classes CSS pour le conteneur de l'icône */
  classNameIcon: PropTypes.string,
  /** Classes CSS pour surcharger le style du titre */
  classNameTitle: PropTypes.string,
  /** Classes CSS pour surcharger le style de la description */
  classNameDescription: PropTypes.string,
};

export default Card;
