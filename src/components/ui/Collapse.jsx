import PropTypes from "prop-types";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import useSmoothCollapse from "../../hooks/useSmoothCollapse";

const Collapse = ({
  title,
  children,
  isOpen = false,
  onChange = null,
  className = "",
  classNameHeader = "",
  classNameTitle = "",
  classNameIcon = "",
  classNameContent = "",
  variant = "default",
}) => {
  const { open, toggle, contentRef, height } = useSmoothCollapse(isOpen);

  const handleToggle = () => {
    toggle();
    if (onChange) onChange(!open);
  };

  const variantStyles = {
    default: {
      wrapper:
        "bg-randria-white rounded-xl shadow-sm border border-randria-gray/10",
      header:
        "hover:bg-randria-gray/5 cursor-pointer transition-colors rounded-xl",
      title: "text-randria-dark font-semibold",
      content: "text-randria-dark/80",
      iconWrapper: "bg-randria-dark text-randria-white",
    },
    primary: {
      wrapper:
        "bg-randria-white rounded-xl shadow-sm border border-randria-gray/10",
      header:
        "hover:bg-randria-primary/5 cursor-pointer transition-colors rounded-xl",
      title: "text-randria-primary font-semibold",
      content: "text-randria-white",
      iconWrapper: "bg-randria-primary text-randria-white",
    },
    secondary: {
      wrapper:
        "bg-randria-white rounded-xl shadow-sm border border-randria-gray/10",
      header:
        "hover:bg-randria-secondary/5 cursor-pointer transition-colors rounded-xl",
      title: "text-randria-secondary font-semibold",
      content: "text-randria-dark/80",
      iconWrapper: "bg-randria-secondary text-randria-white",
    },
    dark: {
      wrapper: "bg-randria-dark rounded-xl",
      header:
        "hover:bg-randria-dark/90 cursor-pointer transition-colors rounded-xl",
      title: "text-randria-white font-semibold",
      content: "text-randria-white/80",
      iconWrapper: "bg-randria-white/20 text-randria-white",
    },
    card: {
      wrapper:
        "bg-randria-white rounded-xl shadow border border-randria-gray/20",
      header:
        "hover:bg-randria-gray/5 cursor-pointer transition-colors rounded-xl",
      title: "text-randria-dark font-semibold",
      content: "text-randria-dark/80",
      iconWrapper: "bg-randria-dark text-randria-white",
    },
  };

  const styles = variantStyles[variant] || variantStyles.default;

  return (
    <div
      className={`w-full ${open && variant === "primary" ? "bg-randria-primary" : styles.wrapper} ${className}`}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full px-6 py-5 flex items-center justify-between ${styles.header} ${classNameHeader}`}
        aria-expanded={open}
        aria-label={`${title} - ${open ? "Développé" : "Réduit"}`}
      >
        <h3
          className={`text-left text-base ${open && variant === "primary" ? "text-randria-white" : styles.title} ${classNameTitle}`}
        >
          {title}
        </h3>
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-md text-xl font-light leading-none flex-shrink-0 ${styles.iconWrapper} ${classNameIcon}`}
          aria-hidden="true"
        >
          {open ? <CiSquareMinus /> : <CiSquarePlus />}
        </span>
      </button>

      {/* ✅ Animation smooth avec height transition */}
      <div
        ref={contentRef}
        style={{ height, overflow: "hidden", transition: "height 300ms ease" }}
      >
        <div
          className={`px-6 pb-5 ${open && variant === "primary" ? "text-randria-white" : styles.content} ${classNameContent}`}
          role="region"
          aria-labelledby={title}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  classNameHeader: PropTypes.string,
  classNameTitle: PropTypes.string,
  classNameIcon: PropTypes.string,
  classNameContent: PropTypes.string,
  variant: PropTypes.oneOf(["default", "primary", "secondary", "dark", "card"]),
};

export default Collapse;
