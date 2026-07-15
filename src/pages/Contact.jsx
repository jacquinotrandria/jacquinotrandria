import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import Testimonials from "../components/homeComponents/Testimonials";
import contactData from "../data/contact.json";
import SEO from "../components/ui/SEO";

const Contact = () => {
  const {
    title,
    description,
    form,
    confidentialite,
    buttonText,
    map,
    testimonials,
  } = contactData;

  return (
    <>
      <SEO
        title="Contactez Jacquinot R. — Ingénieur DevSecOps"
        description="Prenez contact avec Jacquinot Randrianomenjanahary pour vos projets DevSecOps, CI/CD, Kubernetes ou infrastructure Cloud Native. Réponse rapide garantie."
        path="/contact"
      />
      <section
        id="contact"
        className="w-full mx-auto rounded-3xl px-30 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
      >
        {/* ── Left: Form ── */}
        <div className="flex flex-col">
          <h2
            className="text-3xl font-extrabold leading-tight mb-3"
            style={{ color: "#1a3535", fontFamily: "'Syne', sans-serif" }}
          >
            {title}
          </h2>

          <p
            className="text-sm leading-relaxed mb-7"
            style={{ color: "#1a353599" }}
          >
            {description}
          </p>

          {/* Name */}
          <div className="mb-4">
            <label
              className="block text-xs font-semibold mb-1"
              style={{ color: "#2a5555" }}
            >
              {form.nom.label}
            </label>
            <div className="relative flex items-center">
              <HiOutlineUser
                size={16}
                className="absolute left-3 pointer-events-none"
                style={{ color: "#5a9090" }}
              />
              <input
                type="text"
                placeholder={form.nom.placeholder}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white text-sm outline-none transition-all"
                style={{
                  border: "1.5px solid transparent",
                  color: "#1a3535",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#5ab5a5")}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-xs font-semibold mb-1"
              style={{ color: "#2a5555" }}
            >
              {form.email.label}
            </label>
            <div className="relative flex items-center">
              <HiOutlineMail
                size={16}
                className="absolute left-3 pointer-events-none"
                style={{ color: "#5a9090" }}
              />
              <input
                type="email"
                placeholder={form.email.placeholder}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white text-sm outline-none transition-all"
                style={{
                  border: "1.5px solid transparent",
                  color: "#1a3535",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#5ab5a5")}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-3">
            <label
              className="block text-xs font-semibold mb-1"
              style={{ color: "#2a5555" }}
            >
              {form.message.label}
            </label>
            <textarea
              rows={5}
              placeholder={form.message.placeholder}
              className="w-full px-3 py-2.5 rounded-xl bg-white text-sm outline-none resize-none transition-all"
              style={{
                border: "1.5px solid transparent",
                color: "#1a3535",
                fontFamily: "inherit",
                lineHeight: 1.6,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#5ab5a5")}
              onBlur={(e) => (e.target.style.borderColor = "transparent")}
            />
          </div>

          <p
            className="text-xs mb-5 leading-relaxed"
            style={{ color: "#1a353588" }}
          >
            {confidentialite}
          </p>

          <button
            className="inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-sm font-semibold text-white transition-all active:scale-95"
            style={{ background: "#1a3535" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2fa89a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1a3535")}
          >
            {buttonText}
            <IoChatbubbleEllipsesOutline size={16} />
          </button>
        </div>

        {/* ── Right: Map ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ minHeight: "400px", height: "100%" }}
        >
          <iframe
            src={map.src}
            title={map.title}
            width="100%"
            height="100%"
            style={{ border: "none", display: "block", minHeight: "400px" }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>
      <Testimonials background={testimonials.background} isContact={true} />
    </>
  );
};

export default Contact;
