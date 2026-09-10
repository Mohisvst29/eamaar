import React, { useState } from 'react';
import { Building2, Grid, Paintbrush, Layers, Trees, Wrench, CheckCircle2, ArrowLeft, ShieldCheck, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminStore } from '../store/useAdminStore';
import { openWhatsApp } from '../utils/whatsapp';

export default function ServicesPage({ onNavigate }) {
  const { services } = useAdminStore();
  const [selectedServiceTab, setSelectedServiceTab] = useState('all');
  const [activeImageMap, setActiveImageMap] = useState({});
  const [zoomImage, setZoomImage] = useState(null);

  const filteredServices = selectedServiceTab === 'all'
    ? services
    : services.filter(s => s.id === selectedServiceTab || s.category.includes(selectedServiceTab));

  const getActiveImgIndex = (srvId) => activeImageMap[srvId] || 0;

  const setActiveImgIndex = (srvId, index) => {
    setActiveImageMap(prev => ({ ...prev, [srvId]: index }));
  };

  return (
    <div className="w-full flex flex-col pt-20 bg-surface">
      
      {/* 1. TOP HEADER & STATEMENT */}
      <section className="w-full bg-surface-bright border-b border-stone-border py-space-xl">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
            
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-2 text-secondary text-xs font-mono">
                <span className="w-8 h-[2px] bg-secondary inline-block"></span>
                <span>معايير التنفيذ والإنشاء المعماري</span>
              </div>
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight">
                دليل الخدمات الهندسية ومعرض صور التنفيذ
              </h1>
              <p className="text-base text-on-surface-variant leading-relaxed font-light mt-2">
                نقدم في <strong className="text-primary font-semibold">لمسة إعمار</strong> حلولاً إنشائية وتجميلية ترتكز على الضبط الهندسي الدقيق والمواد الفاخرة بالخبر والشرقية، مع معرض صور تفاعلي لكل خدمة.
              </p>
            </div>

            <div className="bg-surface-container p-space-md border border-stone-border flex flex-col gap-1 self-start md:self-auto">
              <span className="text-xs text-on-surface-variant font-mono">فريق الإشراف:</span>
              <span className="font-semibold text-sm text-secondary flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-secondary" /> استجابة وزيارة خلال 24 ساعة
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID & TABS WITH INTERACTIVE GALLERIES */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop flex flex-col gap-space-xl">
          
          {/* Tabs Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-stone-border">
            <button
              onClick={() => setSelectedServiceTab('all')}
              className={`px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                selectedServiceTab === 'all' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              كافة التخصصات ({services.length} خدمة)
            </button>
            <button
              onClick={() => setSelectedServiceTab('renovation')}
              className={`px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                selectedServiceTab === 'renovation' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              الترميم الإنشائي
            </button>
            <button
              onClick={() => setSelectedServiceTab('tiling')}
              className={`px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                selectedServiceTab === 'tiling' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              تركيب البورسلان
            </button>
            <button
              onClick={() => setSelectedServiceTab('cladding')}
              className={`px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                selectedServiceTab === 'cladding' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              بديل الخشب والرخام
            </button>
            <button
              onClick={() => setSelectedServiceTab('waterfalls')}
              className={`px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                selectedServiceTab === 'waterfalls' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              الشلالات والحدائق
            </button>
          </div>

          {/* Cards Grid with Photo Galleries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredServices.map((srv) => {
              const gallery = srv.gallery && srv.gallery.length > 0
                ? srv.gallery
                : (srv.image ? [{ url: srv.image, title: srv.title }] : [{ url: '/images/porcelain_tiling_photo_1789061848541.jpg', title: srv.title }]);
              
              const activeIdx = getActiveImgIndex(srv.id);
              const activeImg = gallery[activeIdx] || gallery[0];

              return (
                <div
                  key={srv.id}
                  className="bg-surface-container-lowest border border-stone-border p-space-lg flex flex-col justify-between hover:border-secondary transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col gap-space-sm">
                    
                    {/* Header Specs */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-secondary uppercase tracking-widest">
                        {srv.code}
                      </span>
                      <span className="text-[10px] bg-surface-container px-2 py-0.5 text-on-surface-variant font-mono">
                        {srv.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-primary group-hover:text-secondary transition-colors">
                      {srv.title}
                    </h3>

                    {/* MAIN GALLERY PHOTO DISPLAY */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-container border border-stone-border my-1 group/img">
                      <motion.img
                        key={activeImg.url}
                        initial={{ opacity: 0.8, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        src={activeImg.url}
                        alt={activeImg.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Photo Title Overlay & Zoom Button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3">
                        <span className="text-xs text-white font-medium truncate max-w-[80%]">
                          {activeImg.title}
                        </span>
                        <button
                          onClick={() => setZoomImage(activeImg)}
                          className="p-1.5 bg-primary/80 text-white hover:bg-secondary transition-colors"
                          title="تكبير الصورة"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* GALLERY THUMBNAILS STRIP */}
                    {gallery.length > 1 && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono text-on-surface-variant shrink-0">معرض الصور:</span>
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                          {gallery.map((gImg, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImgIndex(srv.id, idx)}
                              className={`w-12 h-9 shrink-0 border overflow-hidden transition-all ${
                                activeIdx === idx ? 'border-secondary ring-2 ring-secondary/30 scale-105' : 'border-stone-border opacity-70 hover:opacity-100'
                              }`}
                            >
                              <img src={gImg.url} alt={gImg.title} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                      {srv.description}
                    </p>

                    <div className="pt-2 border-t border-stone-border flex flex-col gap-1.5">
                      <span className="text-[11px] font-mono font-semibold text-primary">المواصفات الفنية:</span>
                      {srv.details && srv.details.map((dt, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-on-surface-variant">
                          <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                          <span>{dt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-space-md pt-space-sm border-t border-stone-border flex items-center justify-between">
                    <span className="text-[11px] font-mono text-on-surface-variant">
                      {srv.scope}
                    </span>
                    <button
                      onClick={() => openWhatsApp(`مرحباً لمسة إعمار، أرغب في حجز معاينة هندسية ميدانية لخدمة: ${srv.title}`)}
                      className="text-xs font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 cursor-pointer"
                    >
                      <span>طلب الخدمة عبر الواتساب</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FULLSCREEN IMAGE ZOOM MODAL */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-margin animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-surface border border-stone-border p-space-md flex flex-col gap-space-md shadow-2xl">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 left-4 z-20 w-8 h-8 bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full h-[65vh] bg-black overflow-hidden flex items-center justify-center">
              <img src={zoomImage.url} alt={zoomImage.title} className="max-w-full max-h-full object-contain" />
            </div>

            <div className="flex items-center justify-between border-t border-stone-border pt-2 text-xs">
              <span className="font-heading font-semibold text-primary">{zoomImage.title}</span>
              <button
                onClick={() => { setZoomImage(null); openWhatsApp(`مرحباً لمسة إعمار، أرغب في الاستفسار وحجز معاينة لتنفيذ تصميم مماثل لـ: ${zoomImage.title}`); }}
                className="px-4 py-2 bg-secondary text-on-secondary font-bold hover:bg-secondary-dark transition-colors cursor-pointer"
              >
                طلب معاينة وتصميم مماثل عبر الواتساب
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
