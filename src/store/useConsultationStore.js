import { useState, useEffect } from 'react';

const INITIAL_REQUESTS = [
  {
    id: "REQ-2025-089",
    clientName: "عبد الله السبيعي",
    phone: "0549789178",
    city: "الخبر - الحزام الذهبي",
    projectType: "ترميم شامل + بديل رخام وتكسيات خشبية",
    area: "350 م²",
    requestedDate: "12 سبتمبر 2025 - 04:30 مساءً",
    status: "جديد",
    notes: "يرغب في معايرة السباكة وإعادة تشطيب المجلس الرئيسي بالبورسلان الإسباني."
  },
  {
    id: "REQ-2025-088",
    clientName: "د. فهد الدوسري",
    phone: "0505123456",
    city: "الظهران - الدوحة",
    projectType: "تشطيبات عصرية + حدائق وشلال جداري",
    area: "480 م²",
    requestedDate: "11 سبتمبر 2025 - 10:00 صباحاً",
    status: "قيد المعاينة",
    notes: "فريق الإشراف قام بالزيارة الأولى وتحديد المخطط الإنشائي."
  },
  {
    id: "REQ-2025-087",
    clientName: "مهندس خالد العتيبي",
    phone: "0556789012",
    city: "الدمام - الشاطئ",
    projectType: "ترميم فيلا سكنية دورين",
    area: "600 م²",
    requestedDate: "10 سبتمبر 2025 - 02:15 مساءً",
    status: "مكتمل",
    notes: "تم الاتفاق وتسليم الجدول الزمني وبدء التكسير واللياسة."
  },
  {
    id: "REQ-2025-086",
    clientName: "أميرة الغامدي",
    phone: "0534567890",
    city: "الخبر - الراكة",
    projectType: "تركيب بورسلان وقص ليزري + دهانات",
    area: "220 م²",
    requestedDate: "09 سبتمبر 2025 - 06:00 مساءً",
    status: "جديد",
    notes: "استفسار عن أسعار البورسلان الهندي والمعالجة بالبرايمر."
  }
];

export function useConsultationStore() {
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('lamsat_consultations');
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lamsat_consultations', JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [requests]);

  const addRequest = (newReq) => {
    const formatted = {
      id: `REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      clientName: newReq.name,
      phone: newReq.phone,
      city: newReq.district ? `الخبر - ${newReq.district}` : "الخبر - الثقبة",
      projectType: newReq.serviceType || "ترميم وديكور عام",
      area: newReq.area ? `${newReq.area} م²` : "غير محدد",
      requestedDate: new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: "جديد",
      notes: newReq.notes || "طلب معايرة مجاني من الموقع"
    };
    setRequests(prev => [formatted, ...prev]);
    return formatted;
  };

  const updateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const deleteRequest = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return {
    requests,
    addRequest,
    updateStatus,
    deleteRequest
  };
}
