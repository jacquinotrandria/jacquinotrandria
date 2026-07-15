import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserName = ({
  firstName,
  lastName,
  suffix = "JR.",
  variant = "default",
  className = "",
  link = null,
}) => {
  const variantStyles = {
    default: {
      wrapper: "",
      name: "text-randria-gray/50 font-light",
      badge: "bg-randria-dark text-randria-white",
    },
    primary: {
      wrapper: "",
      name: "text-randria-primary font-light",
      badge: "bg-randria-primary text-randria-white",
    },
    dark: {
      wrapper: "bg-randria-dark px-3 py-2 rounded-lg",
      name: "text-randria-white font-semibold",
      badge: "bg-randria-white text-randria-dark",
    },
    darker: {
      wrapper: "bg-randria-dark/90 px-3 py-2 rounded-lg",
      name: "text-randria-white font-bold",
      badge: "bg-randria-white text-randria-dark",
    },
  };

  const styles = variantStyles[variant] || variantStyles.default;

  // Abbreviate last name to initial + "."
  const lastInitial = lastName ? `${lastName.charAt(0)}.` : "";

  const content = (
    <div
      className={`inline-flex items-center gap-2 ${styles.wrapper} ${className}`}
    >
      <span className={`text-base tracking-wide ${styles.name}`}>
        {firstName} {lastInitial}
      </span>
      {suffix && (
        <span
          className={`text-xs font-bold px-1.5 py-0.5 rounded ${styles.badge}`}
        >
          {suffix}
        </span>
      )}
    </div>
  );

  if (link) {
    return (
      <Link
        to={link}
        className="focus:outline-none focus:ring-2 focus:ring-randria-primary/50 rounded"
      >
        {content}
      </Link>
    );
  }
  return content;
};

UserName.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  suffix: PropTypes.string,
  variant: PropTypes.oneOf(["default", "primary", "dark", "darker"]),
  className: PropTypes.string,
};

export default UserName;
