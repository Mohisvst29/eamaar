import React, { useState } from 'react';
import { Phone, MapPin, Clock, ShieldCheck, CheckCircle2, ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { useConsultationStore } from '../store/useConsultationStore';
import { openWhatsApp, formatWhatsAppUrl } from '../utils/whatsapp';

export default function ContactPage({ onNavigate }) {
  const { addRequest } = useConsultationStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    serviceType: 'ترميم وتجديد شامل للفيلا',
    area: '',
    notes: ''
  });

  const [submittedRequest, setSubmittedRequest] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const req = addRequest(formData);
    setSubmittedRequest(req);

    // Build structured WhatsApp message and open WhatsApp
    const message = `مرحباً لمسة إعمار، أرغب في حجز معاينة هندسية ميدانية لمشروعي:\n\n` +
      `• الاسم: ${formData.name}\n` +
      `• الجوال: ${formData.phone}\n` +
      `• الحي/المنطقة: ${formData.district || 'الخبر/الشرقية'}\n` +
      `• الخدمة المطلوبة: ${formData.serviceType}\n` +
      (formData.area ? `• المساحة التقريبية: ${formData.area} م²\n` : '') +
      (formData.notes ? `• تفاصيل إضافية: ${formData.notes}\n` : '') +
      `\nرقم الطلب المرجعي: #${req.id}`;

    openWhatsApp(message);
  };

  return (
    <div className="w-full flex flex-col pt-20 bg-surface">
      
      {/* 1. HERO SECTION */}
      <section className="w-full bg-surface-bright border-b border-stone-border py-space-xl">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
            
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2 text-secondary text-xs font-mono">
                <span className="w-2 h-2 bg-secondary inline-block"></span>
                <span>استشارة ومعاينة هندسية ميدانية</span>
              </div>
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight">
                خلنا نبدأ التغيير لمساحتك
              </h1>
              <p className="text-base text-on-surface-variant leading-relaxed font-light mt-1">
                عندك منزل يحتاج ترميم أو مساحة تحتاج لمسة جديدة؟ تواصل معنا وسيقوم فريقنا المعماري بالمعاينة والتخطيط.
              </p>
            </div>

            {/* Response Time Badge */}
            <div className="bg-surface-container p-space-md border border-stone-border flex flex-col gap-1 self-start md:self-auto shadow-sm">
              <span className="text-[11px] font-mono text-secondary uppercase">زمن الاستجابة المعتمد</span>
              <span className="font-heading font-bold text-xl text-primary">خلال 3 ساعات</span>
              <span className="text-xs text-on-surface-variant">زيارات مجانية لكافة أحياء الخبر والظهران</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FORM & INFO GRID */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-xl shadow-md">
              <div className="flex items-center justify-between pb-space-md mb-space-lg border-b border-stone-border bg-surface-container px-space-md py-space-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-mono text-xs text-primary font-semibold">نموذج طلب المعاينة الميدانية</span>
                </div>
                <span className="text-xs text-on-surface-variant">الخبر والمنطقة الشرقية</span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-on-surface font-semibold" htmlFor="name">
                      الاسم الكامل *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="مثال: عبد الله السبيعي"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-surface-container-low px-space-md py-3 text-sm text-on-surface border border-stone-border focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-on-surface font-semibold" htmlFor="phone">
                      رقم الجوال *
                    </label>
                    <div className="flex items-center bg-surface-container-low border border-stone-border" dir="ltr">
                      <span className="px-3 text-xs font-mono text-on-surface-variant bg-surface-container-high py-3 border-r border-stone-border">
                        +966
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="054 978 9178"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent px-3 py-3 text-sm text-on-surface focus:outline-none text-left font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-on-surface font-semibold" htmlFor="district">
                      الحي أو المدينة بالشرقية
                    </label>
                    <input
                      id="district"
                      type="text"
                      placeholder="مثال: الخبر - الحزام الذهبي"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full bg-surface-container-low px-space-md py-3 text-sm text-on-surface border border-stone-border focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-on-surface font-semibold" htmlFor="area">
                      المساحة التقريبية (متر مربع)
                    </label>
                    <input
                      id="area"
                      type="text"
                      placeholder="مثال: 350 م²"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-surface-container-low px-space-md py-3 text-sm text-on-surface border border-stone-border focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono text-on-surface font-semibold" htmlFor="service">
                    نوع الخدمة المطلوبة
                  </label>
                  <select
                    id="service"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-surface-container-low px-space-md py-3 text-sm text-on-surface border border-stone-border focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                  >
                    <option value="ترميم وتجديد شامل للفيلا">ترميم وتجديد شامل للفيلا (إنشائي + تشطيب)</option>
                    <option value="تركيب سيراميك وبورسلان">تركيب سيراميك وبورسلان ليزري</option>
                    <option value="تكسيات بديل الخشب والرخام">تكسيات بديل الخشب (WPC) وبديل الرخام</option>
                    <option value="دهانات وتأهيل الجدران">دهانات داخلية وخارجية (معالجة الرطوبة)</option>
                    <option value="شلالات وحدائق منزلية">شلالات مائية وحدائق خارجية</option>
                    <option value="سباكة وتحديث تمديدات">تحديث شبكة السباكة والكهرباء</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono text-on-surface font-semibold" htmlFor="notes">
                    ملاحظات أو تفاصيل إضافية عن المشروع
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    placeholder="اذكر أي تفاصيل إضافية مثل: يرغب في فحص السباكة قبل تركيب بديل الرخام..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-surface-container-low px-space-md py-3 text-sm text-on-surface border border-stone-border focus:outline-none focus:border-secondary transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-secondary text-on-secondary font-bold text-sm hover:bg-secondary-dark transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال طلب المعايرة الميدانية</span>
                </button>

                <p className="text-[11px] text-on-surface-variant text-center font-mono mt-1">
                  سيتم إدراج طلبك تلقائياً في لوحة تحكم عمليات لمسة إعمار للتواصل معك فوراً.
                </p>

              </form>
            </div>

            {/* Info & Map Column */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              
              {/* Contact Card */}
              <div className="bg-primary text-on-primary p-space-lg border border-stone-border flex flex-col gap-space-md">
                <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                  التواصل المباشر والمقر
                </span>
                
                <h3 className="font-heading font-bold text-xl text-surface-bright">
                  مكتب لمسة إعمار بالخبر
                </h3>

                <ul className="flex flex-col gap-space-md text-xs text-primary-fixed-dim border-t border-primary-container pt-space-md">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>الخبر - الثقبة، شارع مكة المكرمة، تقاطع 15، المنطقة الشرقية</span>
                  </li>
                  <li className="flex items-center gap-2" dir="ltr">
                    <Phone className="w-4 h-4 text-secondary shrink-0" />
                    <a href="tel:0549789178" className="hover:text-secondary transition-colors font-mono text-sm text-white">
                      054 978 9178
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary shrink-0" />
                    <span>السبت - الخميس: 8:00 ص – 10:00 م</span>
                  </li>
                </ul>

                <div className="p-space-sm bg-primary-container border border-stone-border/20 text-xs text-secondary flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>نظام إدارة الطلبات متصل ومتاح 24/7</span>
                </div>
              </div>

              {/* Fully Interactive Google Map */}
              <div className="bg-surface-container border border-stone-border p-space-md flex flex-col gap-3 relative overflow-hidden shadow-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-primary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-secondary animate-pulse" />
                    <span>خريطة المقر الميداني التفاعلية</span>
                  </span>
                  <span className="text-secondary font-mono">الخبر - الثقبة</span>
                </div>
                
                <div className="w-full h-64 relative border border-stone-border overflow-hidden">
                  <iframe
                    title="موقع لمسة إعمار بالخبر - الثقبة"
                    src="https://maps.google.com/maps?q=26.2736,50.1983&hl=ar&z=15&output=embed"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-on-surface-variant font-mono">شارع مكة المكرمة، تقاطع 15</span>
                  <a
                    href="https://maps.google.com/?q=26.2736,50.1983"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-secondary text-on-secondary text-[11px] font-bold hover:bg-secondary-dark transition-colors flex items-center gap-1"
                  >
                    <span>فتح الاتجاهات بـ Google Maps</span>
                    <ArrowLeft className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Submission Success Modal */}
      {submittedRequest && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-margin animate-fadeIn">
          <div className="bg-surface border border-stone-border max-w-md w-full p-space-lg flex flex-col items-center text-center gap-space-md shadow-2xl">
            <div className="w-12 h-12 bg-secondary text-on-secondary rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-heading font-bold text-2xl text-primary">
              تم تسجيل طلبك بنجاح!
            </h3>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              تم إدراج طلب المعاينة الخاص بك بكود مرجعي: <strong className="text-primary font-mono">{submittedRequest.id}</strong>. سيتواصل معك مهندس الموقع بالخبر خلال 3 ساعات.
            </p>

            <div className="w-full bg-surface-container p-space-sm border border-stone-border text-xs text-right font-mono flex flex-col gap-1">
              <span>الاسم: {submittedRequest.clientName}</span>
              <span>رقم الجوال: {submittedRequest.phone}</span>
              <span>نوع الخدمة: {submittedRequest.projectType}</span>
            </div>

            <div className="flex flex-col gap-2 w-full pt-2">
              <button
                onClick={() => {
                  const msg = `مرحباً لمسة إعمار، أود التنسيق لمتابعة طلب المعايرة الهندسية برقم مرجعي #${submittedRequest.id}`;
                  openWhatsApp(msg);
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>متابعة المحادثة عبر الواتساب فوراً</span>
              </button>
              <button
                onClick={() => { setSubmittedRequest(null); onNavigate('dashboard'); }}
                className="w-full py-2.5 bg-primary text-on-primary text-xs font-semibold hover:bg-secondary transition-colors"
              >
                الانتقال للوحة تحكم العمليات ومتابعة الطلب
              </button>
              <button
                onClick={() => { setSubmittedRequest(null); onNavigate('home'); }}
                className="w-full py-2 bg-surface-container text-on-surface border border-stone-border text-xs font-medium hover:bg-surface-container-high transition-colors"
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
