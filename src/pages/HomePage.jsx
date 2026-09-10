import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, MapPin, Phone, Award, Layers, Sparkles, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useAdminStore } from '../store/useAdminStore';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export default function HomePage({ onNavigate }) {
  const { socialLinks, heroBackgrounds: storeHeroBgs } = useAdminStore();
  const heroBackgrounds = (storeHeroBgs && storeHeroBgs.length > 0)
    ? storeHeroBgs
    : ['/images/portfolio_villa_facade_1789062292409.jpg'];

  const [heroBgIndex, setHeroBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroBgIndex(prev => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  const sampleBefore = "https://lh3.googleusercontent.com/aida-public/AB6AXuDSl8U1HgsDaiX8UBhvMqMF_aM3c-QqT5NXqDOW36gQIUb7nqA_Y1QtgaWkLSn4SStxovKITJGXe_uNqOsHJ9M8WEJ6rueqUoEu8ouyp-l46uJsyAELS92or1_B9usS3aEti24rP9MgKSzx4ZYoguAW5d6DC-F-o7RMs_5sbzMHHTY7udNjJ5NMliUb37asCjfFxTebPTZppLjSIiCHB-yg6nIbgJX_C-nluRBAvdjZlWHHTnyNTqQU";
  const sampleAfter = "https://lh3.googleusercontent.com/aida-public/AB6AXuDrwzLLKofFGIw7T90cJoi4tsYQ8ZgiximxcIzgQy5hIPXJof_F-erNta6p16Ra1kJUfqdiYM_092-YhfKv5IWbD1BYhjytcv_9_RX_4qRxKep2v42WZ9YEm_JMozNKI0aOiNmZrTG54IisXq3QiEW_zve0hdRUcQYOCUzuhxbzaSTUX-42GJFD2LB-hUz48XprvMlq93xcnTr8JzdKWBURfNfnC_3oc_29dJhPeqHy0_9Bcwjs-WBk";

  const whatsappConsultationUrl = formatWhatsAppUrl('مرحباً لمسة إعمار، أرغب في حجز معاينة هندسية ميدانية لمشروعي بالشرقية');

  return (
    <div className="w-full flex flex-col pt-20 bg-surface">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center border-b border-stone-border py-space-xl overflow-hidden bg-surface-bright">
        
        {/* Animated Background Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroBgIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={heroBackgrounds[heroBgIndex]}
              alt="خلفية استوديو لمسة إعمار المعماري"
              className="w-full h-full object-cover opacity-100 filter brightness-100 saturate-100"
            />
          </motion.div>
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop relative z-10 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            
            {/* Hero Copy Card */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 flex flex-col items-start gap-space-md bg-primary/90 text-on-primary p-space-lg md:p-space-xl border-2 border-secondary shadow-2xl"
            >
              {/* Logo Header */}
              <div className="flex items-center gap-3 pb-2 border-b border-stone-border/40 w-full">
                <img 
                  src="/logo.png" 
                  alt="لمسة إعمار للترميم والديكور" 
                  className="h-20 md:h-24 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300" 
                />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-secondary text-on-secondary text-xs font-mono font-bold">
                <span className="w-2 h-2 bg-primary inline-block rounded-full animate-pulse"></span>
                <span>المكتب الهندسي لإشراف الترميم والديكور • الخبر والشرقية</span>
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
                نعيد بناء مساحتك <br />
                <span className="text-secondary">بحرفية معمارية تدوم</span>
              </h1>

              <p className="text-base text-stone-200 leading-relaxed font-light">
                فريق فني معتمد متفرغ لإحياء الفلل والمباني السكنية بالخبر والدمام والظهران. ترميم إنشائي دقيق وتكسيات عصرية فاخرة بضمان وجودة ملموسة.
              </p>

              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                {/* WHATSAPP DIRECT REDIRECT BUTTON */}
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href={whatsappConsultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-space-xl py-3.5 bg-secondary text-on-secondary text-sm font-bold hover:bg-secondary-dark transition-all shadow-xl flex items-center gap-2 group cursor-pointer"
                >
                  <span>طلب معاينة هندسية ميدانية</span>
                  <ArrowLeft className="w-4.5 h-4.5 transition-transform group-hover:-translate-x-1" />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('portfolio')}
                  className="px-space-lg py-3.5 bg-surface-container text-on-surface text-sm font-semibold hover:bg-surface-container-high border border-stone-border transition-colors shadow-md"
                >
                  استعراض سجل المشاريع
                </motion.button>
              </div>

              {/* Local Footprint Badges */}
              <div className="w-full mt-space-md pt-space-md border-t border-stone-border/30 grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl font-sans">100%</span>
                  <span className="text-stone-300">إشراف ميداني مباشر</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary font-bold text-xl font-sans">الخبر</span>
                  <span className="text-stone-300">مقرنا الرئيسي بالثقبة</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl font-sans">3 ساعات</span>
                  <span className="text-stone-300">معدل سرعة الاستجابة</span>
                </div>
              </div>

            </motion.div>

            {/* Hero Side Preview Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative bg-primary/90 p-space-sm border-2 border-secondary shadow-2xl group overflow-hidden">
                <img
                  src={sampleAfter}
                  alt="ترميم فيلا فاخرة بالخبر"
                  className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute -bottom-4 -right-4 bg-secondary text-on-secondary p-space-md border border-white/20 shadow-2xl max-w-[240px] hidden sm:flex flex-col">
                  <span className="text-xs font-mono text-primary font-bold">الضمان الحقيقي</span>
                  <span className="font-heading font-semibold text-sm mt-1 text-primary">معايرة دقيقة بالموقع</span>
                  <span className="text-xs text-primary/80 mt-1">لا نغادر حتى ترضى عن كل زاوية وخط.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-primary/80 px-3 py-1.5 border border-stone-border">
          {heroBackgrounds.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroBgIndex(idx)}
              className={`h-2 transition-all rounded-full ${
                heroBgIndex === idx ? 'w-8 bg-secondary' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`شريحة ${idx + 1}`}
            />
          ))}
        </div>

      </section>

      {/* 2. STUDIO NARRATIVE */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 flex flex-col gap-space-md"
            >
              <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                رؤيتنا الهندسية بالشرقية
              </span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary leading-tight">
                نهجنا: دقة التنفيذ الإنشائي والاهتمام بالتفاصيل المجهرية
              </h2>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                في <strong className="text-primary font-semibold">لمسة إعمار</strong>، لا نكتفي بالحلول الظاهرية. نحن نعالج الأسباب الجذرية لتداعي المباني في البيئة الساحلية، من تملح اللياسة وتآكل السباكة، ثم نكسو الفراغ بأرقى بدائل الخشب والرخام المتوافقة مع أسلوب الحياة العصري.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:text-secondary-dark transition-colors group"
                >
                  <span>تعرف أكثر على لمسة إعمار</span>
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-6 grid grid-cols-2 gap-space-md"
            >
              <div className="p-space-md bg-surface-container border border-stone-border flex flex-col gap-2 hover:border-secondary transition-colors">
                <ShieldCheck className="w-6 h-6 text-secondary" />
                <span className="font-heading font-bold text-sm text-primary">حلول مناخية مخصصة</span>
                <span className="text-xs text-on-surface-variant">معالجة بالبرايمر ضد رطوبة الساحل الملحية.</span>
              </div>
              <div className="p-space-md bg-surface-container border border-stone-border flex flex-col gap-2 hover:border-secondary transition-colors">
                <Building2 className="w-6 h-6 text-secondary" />
                <span className="font-heading font-bold text-sm text-primary">تسليم مفتاحي دقيق</span>
                <span className="text-xs text-on-surface-variant">من التكسير حتى تنظيف آخر زاوية بالفيلا.</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. TWO MAIN SERVICE PILLARS WITH MOTION */}
      <section className="w-full py-space-xl bg-surface-container-low border-y border-stone-border">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
          <div className="flex flex-col items-center text-center gap-2 mb-space-xl">
            <span className="text-xs font-mono text-secondary uppercase tracking-widest">
              منظومة خدماتنا المتكاملة
            </span>
            <h2 className="font-heading font-bold text-3xl text-primary">
              ركيزتان لتجديد متكامل
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop">
            
            {/* Pillar 1 */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-container-lowest border border-stone-border flex flex-col justify-between hover:border-secondary transition-all shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                <img src={sampleBefore} alt="ترميم المنازل" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute top-4 right-4 bg-primary/90 text-on-primary px-3 py-1 text-xs font-semibold">
                  القسم الأول
                </div>
              </div>
              <div className="p-space-lg flex flex-col gap-space-md flex-grow justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-primary mb-2">
                    ترميم وتجديد المنازل والفلل
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                    التأسيس المعماري السليم والتحديث الإنشائي للمباني السكنية. معالجة التصدعات، إحلال خطوط السباكة والكهرباء، واللياسة الموزونة.
                  </p>
                  <ul className="flex flex-wrap gap-2 text-xs">
                    <li className="px-3 py-1 bg-surface-container border border-stone-border">السيراميك والبورسلان</li>
                    <li className="px-3 py-1 bg-surface-container border border-stone-border">الدهانات الداخلية والخارجية</li>
                    <li className="px-3 py-1 bg-surface-container border border-stone-border">تجديد السباكة والكهرباء</li>
                    <li className="px-3 py-1 bg-surface-container border border-stone-border">معالجة التشققات</li>
                  </ul>
                </div>
                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:text-secondary-dark transition-colors pt-2 border-t border-stone-border"
                >
                  <span>اكتشف خدمات الترميم</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-container-lowest border border-stone-border flex flex-col justify-between hover:border-secondary transition-all shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                <img src={sampleAfter} alt="التشطيبات والديكور" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute top-4 right-4 bg-secondary text-on-secondary px-3 py-1 text-xs font-semibold">
                  القسم الثاني
                </div>
              </div>
              <div className="p-space-lg flex flex-col gap-space-md flex-grow justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-primary mb-2">
                    التشطيبات والديكورات العصرية
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                    إضفاء الطابع الجمالي الفخم والمظهر العصري للصالات والمجالس، مع توزيع الإضاءة المخفية والملمس الخشبي والرخامي الراقي.
                  </p>
                  <ul className="flex flex-wrap gap-2 text-xs">
                    <li className="px-3 py-1 bg-surface-container border border-stone-border">بديل الخشب WPC</li>
                    <li className="px-3 py-1 bg-surface-container border border-stone-border">بديل الرخام الحجري</li>
                    <li className="px-3 py-1 bg-surface-container border border-stone-border">ألواح الشيبورد والأرفف</li>
                    <li className="px-3 py-1 bg-surface-container border border-stone-border">الشلالات والحدائق المنزلية</li>
                  </ul>
                </div>
                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:text-secondary-dark transition-colors pt-2 border-t border-stone-border"
                >
                  <span>اكتشف باقات الديكور</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. BEFORE / AFTER COMPARISON SLIDER SHOWCASE */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                التوثيق البصري الميداني
              </span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mt-1">
                شاهد التحول الإنشائي قبل وبعد
              </h2>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-space-md py-2 bg-surface-container border border-stone-border text-xs font-medium hover:bg-surface-container-high transition-colors self-start md:self-auto"
            >
              عرض كافة المشاريع والتحولات
            </button>
          </div>

          <BeforeAfterSlider
            beforeImage={sampleBefore}
            afterImage={sampleAfter}
            beforeLabel="قبل الترميم والتكسير"
            afterLabel="بعد تشطيب بديل الخشب والرخام"
            title="فيلا سكنية - حي الحزام الذهبي بالخبر"
          />
        </div>
      </section>

      {/* 5. CONTACT QUICK CTA WITH DIRECT WHATSAPP */}
      <section className="w-full py-space-xl bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="flex flex-col gap-2 max-w-2xl text-right">
            <span className="text-xs font-mono text-secondary uppercase tracking-wider">
              جاهز لإعادة إحياء مساحتك؟
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-surface-bright">
              احجز معاينة ميدانية مجانية بالخبر والشرقية
            </h2>
            <p className="text-sm text-primary-fixed-dim font-light">
              سيقوم مهندس الموقع بزيارة المساحة، أخذ المقاسات الدقيقة، وتقديم تقرير إنشائي وتكلفة تقديرية.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={whatsappConsultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-space-xl py-4 bg-secondary text-on-secondary font-bold text-sm hover:bg-secondary-dark transition-all shrink-0 shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>طلب المعاينة عبر الواتساب</span>
            <ArrowLeft className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

    </div>
  );
}
