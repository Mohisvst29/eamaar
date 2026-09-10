import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminStore } from '../store/useAdminStore';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export default function Navbar({ currentPath, onNavigate }) {
  const { socialLinks } = useAdminStore();
  const whatsappUrl = formatWhatsAppUrl('مرحباً لمسة إعمار، أرغب في حجز معاينة هندسية ميدانية لمشروعي بالشرقية');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Public Navigation Links
  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'portfolio', label: 'أعمالنا' },
    { id: 'articles', label: 'المقالات' },
    { id: 'contact', label: 'اتصل بنا' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-stone-border shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-margin md:px-margin-desktop flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-space-sm cursor-pointer group"
        >
          <div className="h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/logo.png" 
              alt="شعار لمسة إعمار للترميم والديكور" 
              className="h-14 md:h-16 w-auto object-contain drop-shadow-md"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-space-lg">
          {navItems.map((item) => {
            const isActive = currentPath === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm tracking-wide transition-all relative py-1 font-medium ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-secondary" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Actions / Phone & WhatsApp CTA */}
        <div className="flex items-center gap-space-sm md:gap-space-md">
          <a
            href={`tel:${socialLinks.phone || '0549789178'}`}
            className="hidden sm:flex items-center gap-space-xs px-space-md py-space-sm text-sm text-on-surface bg-surface-container hover:bg-surface-container-high border border-stone-border transition-colors font-mono font-medium"
            dir="ltr"
          >
            <Phone className="w-4 h-4 text-secondary" />
            <span>{socialLinks.phone || '054 978 9178'}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-space-lg py-space-sm bg-secondary text-on-secondary text-sm font-semibold hover:bg-secondary-dark transition-all tracking-wide shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
          >
            اطلب معاينة
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-on-surface hover:bg-surface-container transition-colors"
            aria-label="قائمة التنقل"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="xl:hidden bg-surface-bright border-b border-stone-border px-margin py-space-md"
        >
          <div className="flex flex-col gap-space-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-right py-2.5 px-4 text-base border-r-2 transition-colors ${
                  currentPath === item.id
                    ? 'border-secondary text-primary font-bold bg-surface-container'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-space-md mt-space-sm border-t border-stone-border flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-secondary text-on-secondary font-bold text-sm"
              >
                اطلب معاينة عبر الواتساب
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
