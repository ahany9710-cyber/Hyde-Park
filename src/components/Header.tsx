import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { trackChannelConversion } from '../utils/gtag';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { href: '#project-highlights', label: 'Overview' },
  { href: '#new-launch', label: 'New Launch' },
  { href: '#project-zones', label: 'Lifestyle' },
  { href: '#master-plan', label: 'Master Plan' },
  { href: '#lead-form', label: 'Get Prices' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/88 backdrop-blur-md shadow-sm opacity-100 pointer-events-auto'
          : 'bg-transparent opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:bg-hyde-forest/15 lg:backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4 md:gap-6">
            <BrandLogo light={!scrolled} />
          </div>
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hyde-forest transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${config.phoneNumber}`}
              onClick={() => trackChannelConversion('call')}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hyde-forest transition-colors"
            >
              اتصل بنا
            </a>
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackChannelConversion('whatsapp')}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hyde-forest transition-colors"
            >
              واتساب
            </a>
            <a
              href="#lead-form"
              onClick={(e) => scrollToSection(e, '#lead-form')}
              className="px-5 py-2 bg-hyde-forest text-white rounded-xl hover:bg-hyde-sage hover:text-hyde-forest transition-all duration-200 hover:scale-105 font-medium shadow-md"
            >
              تحميل البروشور
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
