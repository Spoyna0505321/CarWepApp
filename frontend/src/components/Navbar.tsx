import{ useState } from 'react';
import { useTranslation } from "react-i18next";
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-md border-b border-white/[0.05] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/home" className="text-xl font-bold tracking-[0.4em] text-white uppercase font-mono">
            NEXUS
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {['Model S', 'Model 3', 'Model X', 'Model Y', 'Cyber'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-xs font-medium tracking-[0.15em] text-gray-300 hover:text-white uppercase transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="qr-scan" className="text-xs font-medium tracking-[0.15em] text-gray-300 hover:text-white uppercase transition-colors duration-200">
            {t("navbar.qrScan")}
          </a>
          <a 
            href="/profile" 
            className="text-xs font-medium tracking-[0.15em] text-black bg-white px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-200"
          >
           {t("navbar.account")}
          </a>
        </div>
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white text-xs tracking-widest uppercase font-semibold focus:outline-none"
          >
            {isMobileMenuOpen ? 'KAPAT' : 'MENÜ'}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col space-y-6 animate-fadeIn">
          {['Model S', 'Model 3', 'Model X', 'Model Y', 'Cyber', 'Mağaza', 'Hesap'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-sm font-medium tracking-widest text-gray-300 hover:text-white uppercase transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
