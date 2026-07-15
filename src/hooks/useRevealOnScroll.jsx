import { useRef, useEffect, useState } from "react";

const useRevealOnScroll = ({
  children,
  className = "",
  delay = 0,
  direction = "bottom",
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const directionClasses = {
    bottom: "translate-y-8",
    top: "-translate-y-8",
    left: "-translate-x-8",
    right: "translate-x-8",
  };

  const initialTranslate =
    directionClasses[direction] || directionClasses.bottom;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`
                transition-all duration-700 ease-out transform
                ${isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${initialTranslate}`}
                ${className}
            `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default useRevealOnScroll;
