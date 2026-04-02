import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useStore } from "../../store/useStore";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const { mobileMenuOpen, setMobileMenuOpen } = useStore();
  const location = useLocation();

  const NAV_LINKS = [
    { label: t("nav.home"), to: "/" },
    {
      label: t("nav.courses"),
      to: "/courses",
      dropdown: [
        { label: t("nav.allCourses"), to: "/courses" },
        { label: t("categories.culinary"), to: "/categories/culinary" },
        { label: t("categories.foodDrinks"), to: "/categories/food-drinks" },
        { label: t("categories.beauty"), to: "/categories/beauty-makeup" },
        { label: t("categories.fashion"), to: "/categories/fashion" },
        { label: t("categories.computer"), to: "/categories/computer" },
      ],
    },
    { label: t("nav.instructors"), to: "/instructors" },
    { label: t("nav.gallery"), to: "/gallery" },
    { label: t("nav.blog"), to: "/blog" },
    { label: t("nav.about"), to: "/about" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdown(null);
  }, [location.pathname, setMobileMenuOpen]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-prima-ivory/95 dark:bg-prima-charcoal/95 backdrop-blur-sm shadow-sm border-b border-prima-blush dark:border-prima-blush"
          : "bg-transparent"
      }`}
    >
      <div className="container-prima">
        <div className="flex items-center justify-between h-20">
          {/* ── Logo ───────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/images/logos/prima_logo.jpg"
              alt="PRIMA Institute"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span
                className={`font-display font-bold text-2xl tracking-tight transition-colors ${
                  scrolled || !isHome
                    ? "text-prima-charcoal dark:text-prima-cream"
                    : "text-white"
                }`}
              >
                PRIMA
              </span>
              <span
                className={`font-accent text-xs tracking-[0.3em] uppercase transition-colors ${
                  scrolled || !isHome
                    ? "text-prima-gold"
                    : "text-prima-gold-light"
                }`}
              >
                Institute
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
                      scrolled || !isHome
                        ? "text-prima-charcoal dark:text-prima-cream hover:text-prima-gold"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${dropdown === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {dropdown === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                      <div className="bg-prima-ivory border border-prima-blush shadow-lg py-2 w-52">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="block px-5 py-2.5 text-sm text-prima-charcoal hover:bg-prima-cream hover:text-prima-gold transition-colors font-body"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-colors relative
                    ${isActive ? "text-prima-gold" : scrolled || !isHome ? "text-prima-charcoal dark:text-prima-cream hover:text-prima-gold" : "text-white/90 hover:text-white"}
                    ${isActive ? "after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1.5px] after:bg-prima-gold" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* ── CTA Button ─────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${scrolled || !isHome ? "text-prima-charcoal dark:text-prima-cream hover:text-prima-gold" : "text-white/90 hover:text-white"}`}
            >
              {t("nav.contact")}
            </Link>
            <Link to="/enroll" className="btn-primary text-xs py-2.5 px-5">
              {t("nav.enrollNow")}
            </Link>
          </div>

          {/* ── Mobile Menu Toggle ─────────────────────────────── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${scrolled || !isHome ? "text-prima-charcoal dark:text-prima-cream" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-prima-ivory dark:bg-prima-charcoal border-t border-prima-blush dark:border-prima-blush">
          <nav className="container-prima py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `block py-3 px-2 text-base font-medium border-b border-prima-blush/50 dark:border-prima-blush/30 transition-colors ${
                      isActive
                        ? "text-prima-gold"
                        : "text-prima-charcoal dark:text-prima-cream hover:text-prima-gold"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
                {link.dropdown && (
                  <div className="pl-4 mb-1">
                    {link.dropdown.slice(1).map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block py-2 text-sm text-prima-muted dark:text-prima-muted hover:text-prima-gold transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 mt-4">
              <LanguageToggle />
              <ThemeToggle />
              <Link to="/enroll" className="btn-primary flex-1 justify-center">
                {t("nav.enrollNow")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
