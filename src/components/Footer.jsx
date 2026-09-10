import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, ArrowUpLeft, Lock } from 'lucide-react';
import { useAdminStore } from '../store/useAdminStore';

export default function Footer({ onNavigate }) {
  const { socialLinks } = useAdminStore();

  return (
    <footer className="w-full bg-primary text-on-primary pt-space-xl pb-space-lg border-t border-stone-border">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-xl border-b border-primary-container">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <img 
                src="/logo.png" 
                alt="شعار لمسة إعمار للترميم والديكور" 
                className="h-20 w-auto object-contain drop-shadow-xl"
              />
            </div>

            <p className="text-sm text-primary-fixed-dim leading-relaxed max-w-md font-light">
              مكتب هندسي وتنفيذي متخصص في أعمال الترميم الإنشائي وتجديد الفلل والمباني السكنية والتشطيبات الفاخرة بالخبر والمنطقة الشرقية. تنفيذ دقيق تحت إشراف فني متفرغ وضمـان معتمد.
            </p>

            <div className="flex items-center gap-space-sm pt-space-xs text-xs text-secondary font-medium">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>ضمان شامل على جودة المواد والتنفيذ الإنشائي</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary border-b border-primary-container pb-2 mb-2">
              أقسام الموقع
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-primary-fixed-dim">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-secondary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-secondary" /> الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-secondary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-secondary" /> من نحن
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-secondary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-secondary" /> دليل الخدمات والهندسة
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-secondary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-secondary" /> معرض المشاريع المنفذة
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('articles')} className="hover:text-secondary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-secondary" /> مدونة العمارة والتشطيب
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-secondary transition-colors flex items-center gap-1.5 text-xs text-on-surface-variant font-mono mt-1">
                  <Lock className="w-3 h-3 text-secondary" /> لوحة التحكم المقفلة (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Specs */}
          <div className="lg:col-span-4 flex flex-col gap-space-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary border-b border-primary-container pb-2 mb-2">
              معلومات الاتصال والزيارات
            </span>
            <ul className="flex flex-col gap-3 text-sm text-primary-fixed-dim">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>{socialLinks.location}</span>
              </li>
              <li className="flex items-center gap-2" dir="ltr">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <a href={`tel:${socialLinks.phone}`} className="hover:text-secondary transition-colors font-mono font-medium dir-ltr text-white">
                  +966 {socialLinks.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                <span>السبت – الخميس: 8:00 صباحاً – 10:00 مساءً</span>
              </li>
            </ul>

            <div className="mt-space-sm p-space-sm bg-primary-container border border-stone-border/20 flex items-center justify-between">
              <span className="text-xs text-primary-fixed-dim">المعاينة الميدانية:</span>
              <span className="text-xs font-medium text-secondary">الخبر • الدمام • الظهران</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md text-xs text-on-primary-container">
          <span>
            جميع الحقوق محفوظة © {new Date().getFullYear()} شركة لمسة إعمار مقاولات ترميم وديكور.
          </span>
          <div className="flex items-center gap-space-md font-mono">
            <span>الخبر – المنطقة الشرقية</span>
            <span>•</span>
            <span>حلول متكاملة للبناء والجمال</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
