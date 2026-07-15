import { Link } from "react-router-dom";
import routes from "../../routes/routes";

const Footer = () => {
  const navLinks = ["Acceuil", "Portfolio", "EXP", "Contact"];

  return (
    <footer className="bg-[#0b1f1e] text-white font-sans w-full">
      {/* Top divider */}
      <div className="border-t border-white/10 mx-6" />

      {/* Main footer content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-8 gap-6">
        {/* Left: Brand + subtitle */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-extrabold text-lg tracking-tight">
              Jacquinot R.
            </span>
            <span className="bg-white text-black text-xs font-black px-2 py-0.5 rounded-sm tracking-widest">
              JR.
            </span>
          </div>
          <p className="text-white/70 text-sm">
            DevOps Engineer — Cloud &amp; CI/CD
          </p>
          <p className="text-white/50 text-sm">
            Madagascar · Disponible en remote / international
          </p>
        </div>

        {/* Right: Nav links */}
        <nav className="flex gap-8">
          {routes.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="text-white/70 hover:text-white text-sm transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center px-8 pb-6 gap-4">
        {/* Copyright */}
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} Jacquinot R. Tous droit réserver.
        </p>

        {/* Social login icons */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:randrianomenjanaharyjacquinot@gmail.com"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200"
          >
            <span className="bg-red-500 p-1.5 rounded-md flex items-center justify-center hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-white"
              >
                <path d="M12 13.065 1.5 6.75V18A2.25 2.25 0 0 0 3.75 20.25h16.5A2.25 2.25 0 0 0 22.5 18V6.75L12 13.065Z" />
                <path d="M12 10.935 22.5 4.5A2.25 2.25 0 0 0 20.25 2.25H3.75A2.25 2.25 0 0 0 1.5 4.5L12 10.935Z" />
              </svg>
            </span>
          </a>

          <a
            href="https://www.facebook.com/jacquinotrandrianomenjanahary"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200"
          >
            <span className="bg-[#1877F2] p-1.5 rounded-md flex items-center justify-center hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-white"
              >
                <path d="M22 12a10 10 0 10-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v6.99A10 10 0 0022 12z" />
              </svg>
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/jacquinot-randrianomenjanahary"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200"
          >
            <span className="bg-[#0A66C2] p-1.5 rounded-md flex items-center justify-center hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-white"
              >
                <path d="M20.45 20.45h-3.55v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7H9.32V9h3.41v1.56h.05c.48-.91 1.66-1.87 3.42-1.87 3.66 0 4.34 2.41 4.34 5.54v6.22zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
