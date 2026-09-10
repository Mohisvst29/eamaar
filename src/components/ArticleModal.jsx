import React from 'react';
import { X, BookOpen, Clock, ShieldCheck, Share2 } from 'lucide-react';

export default function ArticleModal({ article, onClose, onBookConsultation }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-margin animate-fadeIn overflow-y-auto">
      <div className="bg-surface border border-stone-border max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 bg-primary text-on-primary flex items-center justify-center hover:bg-secondary transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Article Masthead */}
        <div className="p-space-lg md:p-space-xl border-b border-stone-border bg-surface-container-lowest">
          <div className="flex items-center gap-space-xs text-secondary text-xs font-mono mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{article.category || 'دليل هندسي ميداني'}</span>
            <span>•</span>
            <Clock className="w-3.5 h-3.5" />
            <span>قراءة {article.readTime || '6 دقائق'}</span>
          </div>

          <h1 className="font-heading font-bold text-2xl md:text-3xl text-primary leading-snug mb-space-sm">
            {article.title}
          </h1>

          <p className="text-sm text-on-surface-variant leading-relaxed font-light">
            {article.summary}
          </p>
        </div>

        {/* Media */}
        {article.image && (
          <div className="w-full h-64 md:h-80 bg-surface-container-high overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Body Content */}
        <div className="p-space-lg md:p-space-xl flex flex-col gap-space-md text-sm text-on-surface leading-relaxed">
          <p>
            تتعرض المباني السكنية والفلل في مدن الخبر والدمام والظهران لظروف مناخية استثنائية تتطلب معالجة هندسية دقيقة. ارتفاع نسبة الرطوبة الملحية القادمة من الخليج العربي يؤدي لتشقق الدهانات العادية وتآكل التكسيات الخشبية المستوردة غير المعالجة.
          </p>

          <div className="bg-surface-container p-space-md border-r-4 border-secondary my-2">
            <h4 className="font-heading font-semibold text-secondary text-sm mb-1">
              قاعدة لمسة إعمار الهندسية:
            </h4>
            <p className="text-xs text-on-surface-variant">
              "العزل المائي والتأسيس بالبرايمر الإيبوكسي هو الخطوة التي تضمن بقاء الدهانات والبورسلان لأكثر من 15 عاماً دون أدنى تفكك أو رطوبة."
            </p>
          </div>

          <h3 className="font-heading font-bold text-base text-primary mt-2">
            1. اختبار التسريبات والتمديدات قبل أي تشطيب
          </h3>
          <p>
            قبل البدء بتركيب بديل الخشب أو البورسلان، يُلزم فريقنا بإجراء ضغط هيدروليكي لجميع خطوط السباكة الداخلية والتغذية. تسريب بسيط بقوة نقطة واحدة يومياً كفيل بإتلاف أفضل ألواح الديكور خلال أشهر معدودة.
          </p>

          <h3 className="font-heading font-bold text-base text-primary mt-2">
            2. اختيار خامات WPC بدلاً من الخشب الطبيعي المباشر
          </h3>
          <p>
            في المناطق الساحلية بالشرقية، يُوصى باستخدام بديل الخشب (WPC - Wood Plastic Composite) المصنوع من ألياف البامبو والمواد البلاستيكية المقاومة للماء، حيث يمنح ملمس الخشب الطبيعي الدافئ دون أن يتأثر برطوبة الصيف.
          </p>

          {/* Blueprint Takeaway Box */}
          <div className="bg-primary text-on-primary p-space-md mt-space-md border border-stone-border">
            <span className="text-xs font-mono text-secondary uppercase tracking-wider block mb-2">
              الاستنتاج التنفيذي للخبر والشرقية:
            </span>
            <ul className="flex flex-col gap-1.5 text-xs text-primary-fixed-dim">
              <li>• عدم الاعتماد على الدهانات المباشرة فوق اللياسة دون برايمر.</li>
              <li>• التأكد من ميزان الليزر في تركيب البورسلان لتجنب التقبّع.</li>
              <li>• استشارة مهندس موقع متخصص قبل التكسير الهيكلي.</li>
            </ul>
          </div>

          {/* Action CTA */}
          <div className="mt-space-lg pt-space-md border-t border-stone-border flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <span className="text-xs text-on-surface-variant">
              هل لديك استفسار حول مشروعك بالخبر؟
            </span>
            <button
              onClick={() => { onClose(); onBookConsultation(); }}
              className="px-space-lg py-2.5 bg-secondary text-on-secondary text-xs font-semibold hover:bg-secondary-dark transition-colors"
            >
              اطلب استشارة هندسية مجانية
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
