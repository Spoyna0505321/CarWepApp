import { useTranslation } from "react-i18next";
export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const footerLinks = [ "privacy", "contact", "careers", "news", "locations", ];
  return (
    <footer className="w-full bg-black border-t border-white/[0.05] py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-light">
          NEXUS © {currentYear}
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => ( <a key={link} href="#" className="text-[10px] tracking-[0.15em] text-gray-400 hover:text-white uppercase transition-colors duration-200 font-light" > {t(`footer.${link}`)} </a> ))}
        </div>
        <div className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer uppercase font-medium">
          {t("footer.country")}
        </div>
      </div>
    </footer>
  );
}
