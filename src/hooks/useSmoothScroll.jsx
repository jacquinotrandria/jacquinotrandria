const useSmoothScroll = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return scrollToSection;
};

export default useSmoothScroll;
