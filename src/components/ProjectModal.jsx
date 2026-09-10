import React from 'react';
import { X, MapPin, Calendar, CheckCircle2, Phone } from 'lucide-react';

export default function ProjectModal({ project, onClose, onBookConsultation }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-margin animate-fadeIn overflow-y-auto">
      <div className="bg-surface border border-stone-border max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 bg-primary text-on-primary flex items-center justify-center hover:bg-secondary transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Image */}
        <div className="relative w-full h-72 md:h-96 bg-surface-container-high overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 right-6 left-6 text-white flex flex-col gap-1">
            <span className="text-xs font-mono text-secondary uppercase tracking-widest">
              {project.category} • {project.location || 'الخبر - الحزام الذهبي'}
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-space-lg md:p-space-xl flex flex-col gap-space-lg">
          
          {/* Metadata Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm bg-surface-container p-space-md border border-stone-border text-xs">
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-mono">مدة التنفيذ:</span>
              <span className="font-semibold text-primary mt-1">{project.duration || '45 يوم عمل'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-mono">المساحة الإجمالية:</span>
              <span className="font-semibold text-primary mt-1">{project.area || '420 م²'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-mono">نوع التشطيب:</span>
              <span className="font-semibold text-secondary mt-1">{project.finishType || 'بديل خشب ورخام WPC'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-mono">مقر المشروع:</span>
              <span className="font-semibold text-primary mt-1">{project.location || 'الخبر'}</span>
            </div>
          </div>

          {/* Description & Engineering Highlights */}
          <div className="flex flex-col gap-space-md">
            <h3 className="font-heading font-bold text-lg text-on-surface">
              تفاصيل المشروع والدراسة الهندسية
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {project.description || `تم تنفيذ هذا المشروع وفق معايير لمسة إعمار الخاصة بالشرقية. تضمن العمل إزالة التكسيات القديمة، تدعيم الخرسانة، معالجة التملح والنزوح المائي، وتطبيق تكسيات بديل الخشب المضلع مع بديل الرخام اللامع وتوزيع إضاءة مخفية 2700K.`}
            </p>

            <h4 className="font-heading font-semibold text-sm text-on-surface mt-2">
              أبرز الأعمال المنجزة في هذا المشروع:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-on-surface-variant">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>تركيب بورسلان ليزري 120×60 سم ميزان ليزر</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>معالجة جدران بالبرايمر الإيبوكسي ضد الرطوبة</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>تأسيس شبكة كهرباء مخفية وإضاءة COB</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>تركيب ألواح الشيبورد الجدارية وديكور الشاشات</span>
              </li>
            </ul>
          </div>

          {/* Action Footer */}
          <div className="pt-space-md border-t border-stone-border flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Phone className="w-4 h-4 text-secondary" />
              <span>ترغب في تنفيذ تشطيب مماثل لمساحتك؟</span>
            </div>
            <div className="flex items-center gap-space-sm w-full sm:w-auto">
              <button
                onClick={() => { onClose(); onBookConsultation(); }}
                className="w-full sm:w-auto px-space-lg py-2.5 bg-secondary text-on-secondary text-xs font-semibold hover:bg-secondary-dark transition-colors"
              >
                طلب معايرة لمشروع مماثل
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
