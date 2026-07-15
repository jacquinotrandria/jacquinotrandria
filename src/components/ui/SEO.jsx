import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const BASE_URL = "https://jacquinot.dev";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = "Jacquinot R. Portfolio";
const DEFAULT_TITLE = "Jacquinot R. | Ingénieur DevSecOps & Cloud Native";
const DEFAULT_DESCRIPTION =
  "Portfolio de Jacquinot Randrianomenjanahary, Ingénieur DevSecOps spécialisé en infrastructures cloud-native, automatisation CI/CD, Kubernetes et sécurisation de pipelines.";

/**
 * SEO component — inject per-page <title>, meta description, Open Graph & Twitter tags.
 *
 * @param {string}  title       - Page title (appended with site name)
 * @param {string}  description - Meta description for the page
 * @param {string}  path        - URL path (e.g. "/projects")
 * @param {string}  image       - Absolute URL of the OG image
 * @param {string}  type        - OG type ("website" | "article")
 */
const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonical = `${BASE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
};

export default SEO;
