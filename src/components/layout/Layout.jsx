import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Gradient zone: Header + Main share the same background */}
      <div
        className="flex flex-col flex-1"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(180, 220, 210, 0.6) 0%, transparent 60%),
            radial-gradient(ellipse at 0% 50%, rgba(160, 210, 195, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 50%, rgba(160, 210, 195, 0.3) 0%, transparent 50%),
            linear-gradient(160deg, #d4ece6 0%, #e8f4f0 30%, #f0f8f5 55%, #daeee8 100%)
          `,
        }}
      >
        {/* Header: full-width, sticky, semi-transparent over the gradient */}
        <header className="w-full sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Header />
          </div>
        </header>

        {/* Main: constrained content, inherits gradient */}
        <main className="flex-1 w-full py-8">
          {children}
        </main>
      </div>

      {/* Footer: full-width, owns its own dark background */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
