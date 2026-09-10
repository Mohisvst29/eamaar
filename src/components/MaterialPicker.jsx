import React, { useState } from 'react';
import { Check, Layers } from 'lucide-react';

const MATERIALS = {
  wood: [
    { id: 'wpc-oak', name: 'بديل خشب WPC (بلوط دافئ)', code: 'MAT-W01', color: '#8b5a2b', texture: 'مقاوم للماء والحرارة' },
    { id: 'wpc-walnut', name: 'خشب جوز دكن (Smoked Walnut)', code: 'MAT-W02', color: '#4a2c11', texture: 'مظهر فندقي فخم' },
    { id: 'wpc-charcoal', name: 'بديل خشب فحم (Charcoal Black)', code: 'MAT-W03', color: '#252525', texture: 'تصميم عصري جريء' },
    { id: 'wpc-cream', name: 'بديل خشب عاجي ناعم', code: 'MAT-W04', color: '#c5a075', texture: 'مشرق للمساحات الصغرى' }
  ],
  marble: [
    { id: 'm-calacatta', name: 'بديل رخام كلكتا ذهبي', code: 'MAT-M01', color: '#f5f5f0', textDark: true, texture: 'عروق دافئة لامعة' },
    { id: 'm-marquina', name: 'بديل رخام ماركينا أسود', code: 'MAT-M02', color: '#1a1a1a', texture: 'عروق بيضاء كلاسيكية' },
    { id: 'm-travertine', name: 'حجر الترافرتين الصحراوي', code: 'MAT-M03', color: '#d9c5b2', textDark: true, texture: 'ملمس بارز محفور' },
    { id: 'm-grey-slabs', name: 'ألواح رمادي رماد البركان', code: 'MAT-M04', color: '#686665', texture: 'مطفي ضد البصمات' }
  ],
  paints: [
    { id: 'p-jotun-linen', name: 'جوتن كتان دافئ (Linen)', code: 'PNT-01', color: '#e8e2d5', textDark: true, texture: 'دهان مطفي ناعم' },
    { id: 'p-jazeera-sand', name: 'الجزيرة رمل الثقبة', code: 'PNT-02', color: '#d6c6b0', textDark: true, texture: 'مقاوم للرطوبة الملحية' },
    { id: 'p-greige-stone', name: 'غريج حجر الرياض', code: 'PNT-03', color: '#b5a999', textDark: true, texture: 'دهان هادئ للصالات' },
    { id: 'p-pure-white', name: 'أبيض مرمر نص لمعة', code: 'PNT-04', color: '#f8f8f6', textDark: true, texture: 'سهل التنظيف والمسح' }
  ]
};

export default function MaterialPicker() {
  const [category, setCategory] = useState('wood');
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS.wood[0]);

  const currentList = MATERIALS[category];

  return (
    <div className="w-full bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm border-b border-stone-border pb-space-md">
        <div className="flex items-center gap-space-xs">
          <Layers className="w-5 h-5 text-secondary" />
          <h3 className="font-heading font-semibold text-lg text-on-surface">
            معاين المواد والتشطيبات الفاخرة
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setCategory('wood'); setSelectedMaterial(MATERIALS.wood[0]); }}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              category === 'wood' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            بديل الخشب (WPC)
          </button>
          <button
            onClick={() => { setCategory('marble'); setSelectedMaterial(MATERIALS.marble[0]); }}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              category === 'marble' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            بديل الرخام والحجر
          </button>
          <button
            onClick={() => { setCategory('paints'); setSelectedMaterial(MATERIALS.paints[0]); }}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              category === 'paints' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            دهانات الجزيرة وجوتن
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center">
        
        {/* Swatches Grid */}
        <div className="md:col-span-7 grid grid-cols-2 gap-space-sm">
          {currentList.map((mat) => {
            const isSelected = selectedMaterial.id === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterial(mat)}
                className={`p-space-sm flex items-center gap-space-sm border text-right transition-all ${
                  isSelected ? 'border-secondary bg-surface-container-low shadow-sm' : 'border-stone-border bg-surface hover:border-outline'
                }`}
              >
                <div
                  className="w-10 h-10 border border-black/10 shrink-0 flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: mat.color }}
                >
                  {isSelected && <Check className={`w-4 h-4 ${mat.textDark ? 'text-black' : 'text-white'}`} />}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-medium text-on-surface truncate">
                    {mat.name}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-mono">
                    {mat.code}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Finish Preview Card */}
        <div className="md:col-span-5 bg-surface-container p-space-md border border-stone-border flex flex-col justify-between h-full min-h-[200px]">
          <div className="flex flex-col gap-space-xs">
            <span className="text-[11px] font-mono text-secondary uppercase tracking-wider">
              المواصفات الفنية المعتمدة
            </span>
            <span className="font-heading font-bold text-base text-on-surface">
              {selectedMaterial.name}
            </span>
            <span className="text-xs text-on-surface-variant">
              كود المادة: <strong className="text-primary font-mono">{selectedMaterial.code}</strong>
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
              تطبيق مخصص للبيئة الساحلية بالخبر. {selectedMaterial.texture}. يتضمن الطبقة الواقية والمادة اللاصقة المقاومة للرطوبة.
            </p>
          </div>

          <div
            className="w-full h-12 mt-space-md border border-stone-border flex items-center justify-between px-3 text-xs shadow-inner"
            style={{ backgroundColor: selectedMaterial.color, color: selectedMaterial.textDark ? '#1a1c1b' : '#ffffff' }}
          >
            <span>عينة بصرية حية</span>
            <span className="font-mono text-[10px] uppercase">{selectedMaterial.color}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
