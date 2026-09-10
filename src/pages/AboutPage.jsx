import React from 'react';
import { Building2, ShieldCheck, MapPin, CheckCircle2, Award, Clock, ArrowLeft } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="w-full flex flex-col pt-20 bg-surface">
      
      {/* 1. TOP ARCHITECTURAL STATEMENT */}
      <section className="w-full bg-surface-bright border-b border-stone-border py-space-xl">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
            
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-2 text-secondary text-xs font-mono">
                <span className="w-2.5 h-2.5 bg-secondary inline-block"></span>
                <span>من نحن — استوديو العمارة والتنفيذ المتخصص</span>
              </div>
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight">
                فريق هندسي وتنفيذي سعودي يعيد صياغة المساحات
              </h1>
              <p className="text-base text-on-surface-variant leading-relaxed font-light mt-2">
                نعتمد على الضبط الميداني الحازم، الخامات المعالجة لرطوبة الشرقية، والالتزام الصارم بمواعيد التسليم بالخبر والدمام والظهران.
              </p>
            </div>

            {/* Location Card Badge */}
            <div className="bg-surface-container p-space-md border border-stone-border flex items-center gap-space-md self-start md:self-auto shadow-sm">
              <div className="w-10 h-10 bg-primary text-secondary flex items-center justify-center border border-stone-border">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-on-surface-variant uppercase">المقر الرئيسي</span>
                <span className="font-heading font-semibold text-sm text-primary">الخبر – الثقبة، المملكة العربية السعودية</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE VALUES & PHILOSOPHY */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
            
            <div className="p-space-lg bg-surface-container-lowest border border-stone-border flex flex-col gap-space-sm hover:border-secondary transition-colors">
              <div className="w-12 h-12 bg-surface-container text-secondary flex items-center justify-center border border-stone-border font-bold">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">
                الواقعية الهندسية
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                لا نقدّم وعوداً زرقاء غير قابلة للتطبيق. كل المخططات التي نضعها تعكس واقع المبنى الإنشائي والميزانية المحددة دون مفاجآت في التكلفة.
              </p>
            </div>

            <div className="p-space-lg bg-surface-container-lowest border border-stone-border flex flex-col gap-space-sm hover:border-secondary transition-colors">
              <div className="w-12 h-12 bg-surface-container text-secondary flex items-center justify-center border border-stone-border font-bold">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">
                مقاومة مناخ الساحل
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                نستخدم حصرياً المواد المقاومة للأملال والرطوبة، مثل برايمر الإيبوكسي العازل وألواح بديل الخشب WPC المعالجة ضد التمدد.
              </p>
            </div>

            <div className="p-space-lg bg-surface-container-lowest border border-stone-border flex flex-col gap-space-sm hover:border-secondary transition-colors">
              <div className="w-12 h-12 bg-surface-container text-secondary flex items-center justify-center border border-stone-border font-bold">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">
                إشراف ميداني متفرغ
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                مهندس الموقع حاضر في كل مرحلة: تكسير، سباكة، لياسة، تركيب بورسلان، وتشطيب أخير. لا نترك العمل للعمالة دون توجيه دقيق.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. STEP-BY-STEP WORKFLOW */}
      <section className="w-full py-space-xl bg-surface-container-low border-y border-stone-border">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop flex flex-col gap-space-xl">
          
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-mono text-secondary uppercase tracking-widest">
              منظومة العمل المعتمدة
            </span>
            <h2 className="font-heading font-bold text-3xl text-primary">
              خطوات تنفيذ المشروع من الفحص حتى التسليم
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            
            <div className="p-space-md bg-surface-container-lowest border border-stone-border flex flex-col gap-2 relative">
              <span className="text-xs font-mono text-secondary font-bold">المرحلة الأولى</span>
              <h4 className="font-heading font-bold text-base text-primary">1. المعايرة والفحص</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                زيارة ميدانية بالخبر، فحص خطوط السباكة، اختبار الرطوبة، وأخذ المقاسات الدقيقة ليزرياً.
              </p>
            </div>

            <div className="p-space-md bg-surface-container-lowest border border-stone-border flex flex-col gap-2 relative">
              <span className="text-xs font-mono text-secondary font-bold">المرحلة الثانية</span>
              <h4 className="font-heading font-bold text-base text-primary">2. المخطط والعينات</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                تحديد جدول المواد (بديل خشب، بورسلان، دهانات)، اعتماد العينات مع المالك، وتوثيق العقد.
              </p>
            </div>

            <div className="p-space-md bg-surface-container-lowest border border-stone-border flex flex-col gap-2 relative">
              <span className="text-xs font-mono text-secondary font-bold">المرحلة الثالثة</span>
              <h4 className="font-heading font-bold text-base text-primary">3. التنفيذ والإشراف</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                بدء التكسير والتأسيس الإنشائي، تركيب العزل، السيراميك والإنارة تحت إشراف هندسي مستمر.
              </p>
            </div>

            <div className="p-space-md bg-surface-container-lowest border border-stone-border flex flex-col gap-2 relative">
              <span className="text-xs font-mono text-secondary font-bold">المرحلة الرابعة</span>
              <h4 className="font-heading font-bold text-base text-primary">4. المعايرة والتسليم</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                فحص جودة الفواصل والزوايا، تنظيف كامل، وتسليم مفاتيح الموقع مع شهادة الضمان.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FOOTPRINT & LOCAL OFFICE */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop bg-primary text-on-primary p-space-lg md:p-space-xl border border-stone-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                النطاق الجغرافي والخدمة الميدانية
              </span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-surface-bright">
                نغطي كافة أحياء الخبر والشرقية بكفاءة وسرعة استجابة
              </h2>
              <p className="text-sm text-primary-fixed-dim leading-relaxed font-light">
                يمتلك فريقنا معرفة عميقة بطبيعة التربة والمباني السكنية بالثقبة، الحزام الذهبي، الدوحة، العزيزية، الشاطئ، وكافة الأحياء المجاورة.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-space-sm justify-center">
              <button
                onClick={() => openWhatsApp('مرحباً لمسة إعمار، أود الاستفسار وحجز معاينة ميدانية عبر مكتب الخبر')}
                className="w-full py-3.5 bg-secondary text-on-secondary font-bold text-sm hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>طلب معاينة عبر الواتساب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
