import React, { useState } from 'react';
import { Calculator, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RenovationCalculator({ onBookConsultation }) {
  const [area, setArea] = useState(150);
  const [scope, setScope] = useState('full'); // 'full', 'interior', 'structural'
  const [tier, setTier] = useState('luxury'); // 'premium', 'luxury', 'ultra'

  // Pricing constants (SAR per m²)
  const scopeRates = {
    full: { premium: 350, luxury: 550, ultra: 850, label: 'ترميم شامل مفتاحي (إنشائي + تشطيبات)' },
    interior: { premium: 250, luxury: 420, ultra: 680, label: 'تشطيب وديكور داخلي (بديل خشب ورخام ودهانات)' },
    structural: { premium: 200, luxury: 320, ultra: 490, label: 'إصلاح إنشائي وتأسيس سباكة وكهرباء وعزل' }
  };

  const ratePerMeter = scopeRates[scope][tier];
  const estimatedTotal = area * ratePerMeter;
  const estimatedDays = Math.ceil(area * 0.15) + (scope === 'full' ? 14 : 7);

  return (
    <div className="w-full bg-surface-container-low border border-stone-border p-space-md md:p-space-xl flex flex-col gap-space-lg">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm border-b border-stone-border pb-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-secondary text-xs font-mono mb-1">
            <Calculator className="w-4 h-4" />
            <span>حاسبة التقدير الأولي للترميم والتشطيب</span>
          </div>
          <h3 className="font-heading font-bold text-xl text-on-surface">
            احسب التكلفة التقريبية لترميم مساحتك بالخبر
          </h3>
        </div>
        <span className="text-xs text-on-surface-variant bg-surface px-3 py-1 border border-stone-border">
          تقدير مبني على أسعار السوق بالمنطقة الشرقية 2025
        </span>
      </div>

      {/* Input Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        
        {/* Controls */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          
          {/* 1. Area Slider */}
          <div className="flex flex-col gap-space-xs bg-surface p-space-md border border-stone-border">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-on-surface">
                1. المساحة الكلية للمشروع (متر مربع):
              </label>
              <span className="font-mono font-bold text-lg text-secondary dir-ltr">
                {area} م²
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-on-surface-variant font-mono">
              <span>50 م² (شقة صغيرة)</span>
              <span>300 م² (دور فيلا)</span>
              <span>1000 م² (فيلا كاملة)</span>
            </div>
          </div>

          {/* 2. Renovation Scope */}
          <div className="flex flex-col gap-space-xs bg-surface p-space-md border border-stone-border">
            <label className="text-sm font-medium text-on-surface mb-1">
              2. نطاق الأعمال المطلوب:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setScope('full')}
                className={`p-3 text-right text-xs flex flex-col gap-1 border transition-all ${
                  scope === 'full' ? 'border-secondary bg-secondary/10 text-primary font-semibold' : 'border-stone-border bg-surface text-on-surface-variant'
                }`}
              >
                <span>ترميم شامل مفتاحي</span>
                <span className="text-[10px] text-on-surface-variant font-normal">إنشائي + سباكة + تشطيب</span>
              </button>
              <button
                type="button"
                onClick={() => setScope('interior')}
                className={`p-3 text-right text-xs flex flex-col gap-1 border transition-all ${
                  scope === 'interior' ? 'border-secondary bg-secondary/10 text-primary font-semibold' : 'border-stone-border bg-surface text-on-surface-variant'
                }`}
              >
                <span>تشطيبات وديكور</span>
                <span className="text-[10px] text-on-surface-variant font-normal">بديل خشب ورخام وبورسلان</span>
              </button>
              <button
                type="button"
                onClick={() => setScope('structural')}
                className={`p-3 text-right text-xs flex flex-col gap-1 border transition-all ${
                  scope === 'structural' ? 'border-secondary bg-secondary/10 text-primary font-semibold' : 'border-stone-border bg-surface text-on-surface-variant'
                }`}
              >
                <span>تأسيس وإصلاح إنشائي</span>
                <span className="text-[10px] text-on-surface-variant font-normal">معالجة رطوبة وتكسير</span>
              </button>
            </div>
          </div>

          {/* 3. Finishing Tier */}
          <div className="flex flex-col gap-space-xs bg-surface p-space-md border border-stone-border">
            <label className="text-sm font-medium text-on-surface mb-1">
              3. مستوى التشطيب والمواد:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTier('premium')}
                className={`p-2.5 text-center text-xs border transition-all ${
                  tier === 'premium' ? 'border-secondary bg-primary text-on-primary font-semibold' : 'border-stone-border text-on-surface-variant'
                }`}
              >
                ممتاز (Premium)
              </button>
              <button
                type="button"
                onClick={() => setTier('luxury')}
                className={`p-2.5 text-center text-xs border transition-all ${
                  tier === 'luxury' ? 'border-secondary bg-primary text-on-primary font-semibold' : 'border-stone-border text-on-surface-variant'
                }`}
              >
                فاخر (Luxury)
              </button>
              <button
                type="button"
                onClick={() => setTier('ultra')}
                className={`p-2.5 text-center text-xs border transition-all ${
                  tier === 'ultra' ? 'border-secondary bg-primary text-on-primary font-semibold' : 'border-stone-border text-on-surface-variant'
                }`}
              >
                VIP (Ultra Luxury)
              </button>
            </div>
          </div>

        </div>

        {/* Output Estimation Box */}
        <div className="lg:col-span-5 bg-primary text-on-primary p-space-lg flex flex-col justify-between border border-stone-border shadow-md h-full min-h-[360px]">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between border-b border-primary-container pb-space-sm">
              <span className="text-xs text-secondary font-mono">النتيجة التقديرية</span>
              <span className="text-[11px] text-primary-fixed-dim font-mono">شاملة المواد والإشراف</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-primary-fixed-dim">التكلفة التقديرية الإجمالية:</span>
              <span className="font-heading font-bold text-3xl text-secondary dir-ltr">
                {estimatedTotal.toLocaleString()} <span className="text-lg font-sans">ر.س</span>
              </span>
              <span className="text-[11px] text-primary-fixed-dim mt-1">
                (معدل المتر: {ratePerMeter} ر.س / م²)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-space-sm py-space-sm border-y border-primary-container text-xs">
              <div className="flex flex-col">
                <span className="text-primary-fixed-dim">المدة الزمنية المتوقعة:</span>
                <span className="font-semibold text-surface-bright mt-1">{estimatedDays} يوم عمل</span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary-fixed-dim">تغطية الإشراف:</span>
                <span className="font-semibold text-secondary mt-1">الخبر والشرقية</span>
              </div>
            </div>

            <ul className="flex flex-col gap-1.5 text-xs text-primary-fixed-dim">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>خصم خاص للمساحات الكبيرة فوق 400 م²</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>معاينة هندسية ميدانية مجانية لتأكيد المخطط</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onBookConsultation(area, scopeRates[scope].label)}
            className="w-full mt-space-md py-3 bg-secondary text-on-secondary font-semibold text-sm hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2"
          >
            <span>احجز معاينة ميدانية لتأكيد التكلفة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
