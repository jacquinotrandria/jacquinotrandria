import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import routes from "./routes/routes";
import NotFound from "./errors/404";

const pageModules = import.meta.glob("./pages/**/*.jsx");

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router basename="/portfolio-with-dk">
      <ScrollToTop />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-gray-500">Chargement...</div>}>
        <Routes>
          {routes.map((r) => {
            const key = `./pages/${r.component}.jsx`;
            const loader = pageModules[key];

            if (!loader) {
              console.warn(`Page introuvable: ${key}`);
              return null;
            }

            const Component = lazy(loader);

            return (
              <Route
                key={r.path}
                path={r.path}
                element={<Layout><Component /></Layout>}
              />
            );
          })}

          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
