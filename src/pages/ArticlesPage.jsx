import React, { useState } from 'react';
import { BookOpen, Clock, ArrowLeft, Eye, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { useAdminStore } from '../store/useAdminStore';

export default function ArticlesPage({ onNavigate }) {
  const { articles } = useAdminStore();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const leadArticle = articles[0] || {
    id: 'lead-1',
    title: 'كيف تتجنب أخطاء عزل الرطوبة وتشطيب الجدران في مناخ الخبر الساحلي؟',
    category: 'العزل ومقاومة الرطوبة',
    readTime: '6 دقائق',
    issue: 'العدد 14 • الخبر',
    summary: 'نظرة هندسية معمقة على تأثير الرطوبة الملحية في المنطقة الشرقية...',
    image: '/images/portfolio_villa_facade_1789062292409.jpg'
  };

  const articlesGrid = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="w-full flex flex-col pt-20 bg-surface">
      
      {/* 1. EDITORIAL MASTHEAD */}
      <section className="w-full bg-surface-bright border-b border-stone-border py-space-xl">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
          <div className="flex flex-col max-w-4xl">
            <div className="flex items-center gap-2 text-secondary text-xs font-mono mb-2">
              <span className="w-2.5 h-2.5 bg-secondary inline-block"></span>
              <span>مدونة العمارة والتجديد • استشارات وخبرات الخبر والشرقية</span>
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight leading-snug">
              مقالات وأفكار لإعادة إحياء مساحتك السكنية
            </h1>
            <p className="text-base text-on-surface-variant leading-relaxed font-light mt-3">
              أدلة هندسية ونصائح عملية في الترميم الدقيق، اختيار المواد المقاومة لرطوبة الشرقية، وتنسيق الإضاءة والديكورات العصرية من واقع تجاربنا الميدانية بالخبر والدمام والظهران.
            </p>

            {/* Metadata Bar */}
            <div className="w-full mt-space-lg pt-space-md flex flex-wrap items-center justify-between gap-space-md bg-surface-container px-space-md py-space-sm border border-stone-border text-xs">
              <div className="flex items-center gap-space-lg text-on-surface font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-secondary" />
                  <span>إشراف هندسي معتمد</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-secondary" />
                  <span>حلول مخصصة لمناخ الساحل الشرقي</span>
                </span>
              </div>
              <span className="font-mono text-on-surface-variant">إصدار دوري • 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED LEAD ARTICLE */}
      <section className="w-full max-w-7xl mx-auto px-margin md:px-margin-desktop my-space-xl">
        <article className="bg-surface-container-lowest border border-stone-border grid grid-cols-1 lg:grid-cols-12 overflow-hidden group">
          
          <div className="lg:col-span-7 relative h-80 sm:h-96 lg:h-auto min-h-[380px] bg-surface-container-high overflow-hidden">
            <img
              src={leadArticle.image}
              alt={leadArticle.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-secondary text-on-secondary px-3 py-1 text-xs font-semibold">
              دليل هندسي حصري
            </div>
          </div>

          <div className="lg:col-span-5 p-space-md md:p-space-xl flex flex-col justify-between">
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
                <span className="text-secondary font-semibold">قراءة {leadArticle.readTime}</span>
                <span>{leadArticle.issue}</span>
              </div>

              <h2 className="font-heading font-bold text-2xl text-primary group-hover:text-secondary transition-colors">
                {leadArticle.title}
              </h2>

              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                {leadArticle.summary}
              </p>

              <div className="bg-surface-container p-space-md border border-stone-border my-2 text-xs">
                <span className="font-mono text-secondary font-semibold block mb-1">
                  أبرز النقاط الفنية بالدليل:
                </span>
                <ul className="flex flex-col gap-1 text-on-surface-variant">
                  <li>• المعالجة بمادة البرايمر الإيبوكسي لمنع النزوح الملحي.</li>
                  <li>• اختبار السباكة بالضغط قبل تركيب تكسيات WPC.</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setSelectedArticle(leadArticle)}
              className="w-full mt-space-md py-3 bg-primary text-on-primary font-semibold text-xs hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              <span>قراءة الدليل الهندسي الكامل</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

        </article>
      </section>

      {/* 3. ARTICLES GRID */}
      <section className="w-full py-space-xl bg-surface-container-low border-t border-stone-border">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop flex flex-col gap-space-lg">
          
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-2xl text-primary">
              كافة المقالات والأدلة الهندسية
            </h3>
            <span className="text-xs text-on-surface-variant font-mono">3 مقالات إضافية</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {articlesGrid.map((art) => (
              <div
                key={art.id}
                className="bg-surface-container-lowest border border-stone-border p-space-md flex flex-col justify-between hover:border-secondary transition-all group"
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="aspect-[16/10] overflow-hidden bg-surface-container-high mb-2">
                    <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                    <span className="text-secondary font-semibold">{art.category}</span>
                    <span>قراءة {art.readTime}</span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-primary group-hover:text-secondary transition-colors">
                    {art.title}
                  </h4>

                  <p className="text-xs text-on-surface-variant leading-relaxed font-light line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArticle(art)}
                  className="mt-space-md pt-2 border-t border-stone-border text-xs font-semibold text-secondary hover:text-secondary-dark flex items-center justify-between"
                >
                  <span>اقرأ التفاصيل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onBookConsultation={() => onNavigate('contact')}
        />
      )}

    </div>
  );
}
