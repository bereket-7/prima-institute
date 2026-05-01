import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Users,
  BookOpen,
  TrendingUp,
  Target,
  Heart,
  Lightbulb,
  Globe,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/ui/SectionHeader";

export default function AboutPage() {
  const { t } = useTranslation();

  const STATS = [
    { value: "2018", label: "Founded", icon: Users },
    { value: "4", label: "Training Categories", icon: BookOpen },
    { value: "6+", label: "Yrs Avg. Instructor Exp.", icon: Award },
    { value: "100%", label: "Hands-On Training", icon: TrendingUp },
  ];

  const VALUES = [
    {
      title: t("about.value1Title"),
      desc: t("about.value1Desc"),
      icon: Target,
    },
    {
      title: t("about.value2Title"),
      desc: t("about.value2Desc"),
      icon: Lightbulb,
    },
    {
      title: t("about.value3Title"),
      desc: t("about.value3Desc"),
      icon: Globe,
    },
    {
      title: t("about.value4Title"),
      desc: t("about.value4Desc"),
      icon: Heart,
    },
  ];

  const MILESTONES = [
    { year: "2018", event: t("about.milestone1") },
    { year: "2020", event: t("about.milestone2") },
    { year: "2021", event: t("about.milestone3") },
    { year: "2022", event: t("about.milestone4") },
    { year: "2023", event: t("about.milestone5") },
    { year: "2024", event: t("about.milestone6") },
    { year: "2025", event: t("about.milestone7") },
  ];
  return (
    <>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-prima-charcoal via-prima-charcoal to-prima-charcoal-soft dark:from-black dark:via-prima-charcoal dark:to-prima-charcoal-soft pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/assets/images/about/photo_2026-04-06_11-14-57.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-prima-charcoal via-prima-charcoal/80 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_50%)]" />
        </div>
        <div className="relative z-10 container-prima max-w-4xl">
          <span className="font-accent text-prima-gold text-sm tracking-[0.3em] uppercase mb-4 block animate-fade-in">
            {t("about.eyebrow")}
          </span>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 leading-none animate-fade-up">
            {t("about.heroTitle")}
            <br />
            <em className="font-accent not-italic text-prima-gold-light">
              {t("about.heroTitleAccent")}
            </em>
          </h1>
          <p
            className="text-white/70 text-lg font-body leading-relaxed max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {t("about.heroSubtitle")}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="bg-prima-ivory dark:bg-prima-ivory py-16">
        <div className="container-prima">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div
                key={label}
                className="text-center group animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-prima-gold/10 dark:bg-prima-gold/20 mb-4 group-hover:bg-prima-gold group-hover:scale-110 transition-all duration-300">
                  <Icon
                    className="text-prima-gold group-hover:text-prima-charcoal transition-colors"
                    size={28}
                  />
                </div>
                <div className="font-display text-4xl lg:text-5xl font-bold text-prima-charcoal dark:text-prima-charcoal mb-2">
                  {value}
                </div>
                <div className="text-prima-muted dark:text-prima-muted text-sm tracking-wider uppercase font-body">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-prima-cream dark:bg-prima-cream">
        <div className="container-prima grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block w-16 h-1 bg-prima-gold mb-8" />
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-prima-charcoal dark:text-prima-charcoal mb-6">
              {t("about.missionTitle")}
            </h2>
            <p className="text-prima-muted dark:text-prima-muted font-body leading-relaxed mb-5 text-lg">
              {t("about.missionPara1")}
            </p>
            <p className="text-prima-muted dark:text-prima-muted font-body leading-relaxed mb-5">
              {t("about.missionPara2")}
            </p>
            <p className="text-prima-muted dark:text-prima-muted font-body leading-relaxed mb-8">
              {t("about.missionPara3")}
            </p>
            <Link to="/courses" className="btn-primary inline-flex">
              {t("about.exploreCourses")} <ArrowRight size={16} />
            </Link>
          </div>
          {/* Image grid — 2x2 uniform with hover effects */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { src: "/assets/images/gallery/culinary/photo_2026-04-08_05-03-03.jpg", label: "Professional Kitchen Training" },
              { src: "/assets/images/gallery/culinary/photo_2026-05-01_07-36-01.jpg", label: "Culinary Masterclass" },
              { src: "/assets/images/gallery/culinary/photo_2026-05-01_07-36-31.jpg", label: "Plating Techniques" },
              { src: "/assets/images/about/photo_2026-04-06_11-13-15.jpg",             label: "Training Session" },
            ].map(({ src, label }) => (
              <div key={src} className="group relative overflow-hidden rounded-xl shadow-md aspect-square">
                <img
                  src={src}
                  alt={label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {/* Label */}
                <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-body font-semibold tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  {label}
                </span>
                {/* Gold corner accent */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-prima-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-prima-ivory dark:bg-prima-ivory">
        <div className="container-prima">
          <SectionHeader
            eyebrow={t("about.valuesEyebrow")}
            title={t("about.valuesTitle")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white dark:bg-prima-charcoal-soft border border-prima-blush dark:border-white/10 p-8 rounded-lg group hover:shadow-2xl hover:border-prima-gold dark:hover:border-prima-gold transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-prima-gold/10 dark:bg-prima-gold/20 flex items-center justify-center shrink-0 group-hover:bg-prima-gold group-hover:scale-110 transition-all duration-300">
                      <Icon
                        className="text-prima-gold group-hover:text-prima-charcoal transition-colors"
                        size={24}
                      />
                    </div>
                    <div>
                      <span className="font-accent text-prima-gold text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-prima-charcoal dark:text-prima-cream mt-1 mb-3 group-hover:text-prima-gold transition-colors">
                        {v.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-prima-muted dark:text-prima-muted font-body text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-br from-prima-charcoal via-prima-charcoal to-prima-charcoal-soft dark:from-black dark:via-prima-charcoal dark:to-prima-charcoal-soft relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_50%)]" />
        </div>
        <div className="container-prima relative z-10">
          <SectionHeader
            eyebrow={t("about.timelineEyebrow")}
            title={t("about.timelineTitle")}
            light
          />
          <div className="max-w-4xl mx-auto">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className="flex gap-8 pb-12 relative group animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {i < MILESTONES.length - 1 && (
                  <div className="w-px bg-prima-charcoal-soft absolute top-0 bottom-0 left-[3.25rem]" />
                )}
                <div className="flex flex-col items-start">
                  <span className="font-display text-prima-gold font-bold text-xl w-24 shrink-0 z-10 group-hover:scale-110 transition-transform">
                    {m.year}
                  </span>
                </div>
                <div className="pb-2 flex-1">
                  <div className="w-3 h-3 bg-prima-gold rounded-full mt-2 mb-4 group-hover:scale-150 transition-transform shadow-lg shadow-prima-gold/50" />
                  <p className="text-white/80 font-body leading-relaxed group-hover:text-white transition-colors">
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-prima-ivory dark:bg-prima-ivory">
        <div className="container-prima grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 bg-white dark:bg-prima-charcoal-soft border border-prima-blush dark:border-white/10 rounded-lg p-8 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-prima-gold/10 flex items-center justify-center shrink-0">
                <Globe className="text-prima-gold" size={24} />
              </div>
              <div>
                <span className="font-accent text-prima-gold text-sm tracking-widest uppercase">
                  {t("about.locationEyebrow")}
                </span>
                <h3 className="font-display text-2xl font-bold text-prima-charcoal dark:text-prima-cream mt-1">
                  {t("about.locationTitle")}
                </h3>
              </div>
            </div>
            <p className="text-prima-muted font-body leading-relaxed mb-6">
              {t("about.locationDesc")}
            </p>
            <div className="flex items-center gap-3 bg-prima-gold/10 rounded-lg px-4 py-3">
              <div className="w-2 h-2 rounded-full bg-prima-gold animate-pulse" />
              <span className="text-prima-charcoal dark:text-prima-cream font-body text-sm font-medium">
                {t("about.locationOnline")}
              </span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block w-16 h-1 bg-prima-gold mb-8" />
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-prima-charcoal dark:text-prima-charcoal mb-6">
              {t("about.locationTitle")}
            </h2>
            <p className="text-prima-muted font-body leading-relaxed text-lg mb-4">
              Bole Sub-city, Gerji Roba area
            </p>
            <p className="text-prima-muted font-body leading-relaxed mb-2">
              Seada Building, 3rd Floor
            </p>
            <p className="text-prima-muted font-body leading-relaxed">
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-prima-cream dark:bg-prima-cream">
        <div className="container-prima text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-prima-charcoal dark:text-prima-charcoal mb-6">
            {t("about.ctaTitle")}{" "}
            <span className="text-prima-gold">{t("about.ctaTitleAccent")}</span>
          </h2>
          <p className="text-prima-muted dark:text-prima-muted font-body text-lg leading-relaxed mb-10">
            {t("about.ctaSubtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/enroll" className="btn-primary py-4 px-8">
              {t("about.ctaApply")} <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-outline py-4 px-8">
              {t("about.ctaContact")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
