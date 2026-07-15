import { useState, useEffect } from "react";
import { MdDownload } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Button } from "../ui";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes/routes";
import resume from "@assets/CV_Jacquinot_RANDRIANOMENJANAHARY_DevSecOps.pdf";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Download CV
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.download = "CV_Jacquinot_Randrianomenjanahary.pdf";
    link.href = resume;
    link.click();
  };

  return (
    <>
      <header className="w-full flex justify-center sticky top-5 mt-5 z-50 px-4">
        <div
          className={`w-full max-w-6xl flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-md shadow-md"
              : "bg-[#f3f4f6] shadow-sm"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="font-semibold text-gray-800 text-sm">
              Jacquinot R.
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-[#1f3d3d] text-white font-bold tracking-wide">
              JR.
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {routes.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm transition-colors font-medium ${
                  location.pathname === path
                    ? "text-[#1f3d3d]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button
              icon={<MdDownload size={16} />}
              className="bg-[#1f3d3d] hover:bg-[#162e2e] active:scale-95 text-white rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 transition-all"
              noOffset
              onClick={handleDownloadCV}
            >
              Télécharger mon CV
            </Button>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[#1f3d3d]/10 text-[#1f3d3d] hover:bg-[#1f3d3d]/20 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-white md:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "-8px 0 40px rgba(0,0,0,0.12)" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 text-sm">
              Jacquinot R.
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-[#1f3d3d] text-white font-bold tracking-wide">
              JR.
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <HiX size={16} />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
          {routes.map(({ path, label }, i) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === path
                  ? "bg-[#1f3d3d]/10 text-[#1f3d3d]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-6 py-6 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-2 bg-[#1f3d3d] active:scale-95 text-white rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all">
            <MdDownload size={17} />
            Télécharger mon CV
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
