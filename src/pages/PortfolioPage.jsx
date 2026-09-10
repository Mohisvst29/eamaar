import React, { useState } from 'react';
import { Eye, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminStore } from '../store/useAdminStore';
import { openWhatsApp } from '../utils/whatsapp';

export default function PortfolioPage({ onNavigate }) {
  const { portfolio } = useAdminStore();

  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const uniqueCategories = Array.from(new Set(portfolio.map(item => item.category).filter(Boolean)));

  const filteredItems = activeCategory === 'all'
    ? portfolio
    : portfolio.filter(item => item.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  return (
    <div className="w-full flex flex-col pt-20 bg-surface">
      
      {/* 1. HEADER TITLE */}
      <section className="w-full bg-surface-bright border-b border-stone-border py-space-md">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-secondary uppercase tracking-widest">
              معرض الصور المعمارية
            </span>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-primary mt-1">
              معرض مشاريع لمسة إعمار
            </h1>
          </div>

          {/* Category Tabs Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap border ${
                activeCategory === 'all' ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container text-on-surface border-stone-border hover:bg-surface-container-high'
              }`}
            >
              كافة الصور ({portfolio.length})
            </button>
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap border ${
                  activeCategory === cat ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container text-on-surface border-stone-border hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PURE PHOTO GALLERY GRID (صور وبس) */}
      <section className="w-full py-space-lg bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
          
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md"
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="relative aspect-[4/3] bg-surface-container-high border border-stone-border overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay with Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                  <div className="self-end">
                    <span className="p-2 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 3. LIGHTBOX FULLSCREEN GALLERY MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 left-6 z-50 p-2.5 bg-white/10 text-white hover:bg-secondary transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Image */}
            <button
              onClick={prevImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 text-white hover:bg-secondary transition-colors"
              aria-label="السابق"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Next Image */}
            <button
              onClick={nextImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 text-white hover:bg-secondary transition-colors"
              aria-label="التالي"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox View */}
            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center gap-3">
              <motion.img
                key={filteredItems[lightboxIndex].image}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain border border-stone-border/40 shadow-2xl"
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full text-white px-4">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-secondary">
                    {filteredItems[lightboxIndex].category} • صورة {lightboxIndex + 1} من {filteredItems.length}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    const title = filteredItems[lightboxIndex]?.title || 'معرض الأعمال';
                    closeLightbox();
                    openWhatsApp(`مرحباً لمسة إعمار، أرغب في طلب معايرة هندسية وتنفيذ تصميم مماثل لمشروع: ${title}`);
                  }}
                  className="px-6 py-2.5 bg-secondary text-on-secondary text-xs font-bold hover:bg-secondary-dark transition-colors cursor-pointer"
                >
                  طلب معايرة وتنفيذ تصميم مماثل عبر الواتساب
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
