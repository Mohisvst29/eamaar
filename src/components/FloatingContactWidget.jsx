import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminStore } from '../store/useAdminStore';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export default function FloatingContactWidget() {
  const { socialLinks } = useAdminStore();

  const phoneNum = socialLinks.phone || '0549789178';
  const whatsappUrl = formatWhatsAppUrl('مرحباً لمسة إعمار، أراغب في الاستفسار عن معاينة مشروع بالشرقية');

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col sm:flex-row items-center gap-3">
      
      {/* 1. INDEPENDENT FLOATING WHATSAPP BUTTON */}
      <motion.a
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl relative border-2 border-white group"
        aria-label="تواصل عبر الواتساب"
        title="تواصل عبر الواتساب مباشرة"
      >
        {/* Pulsating green ring */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>

        <MessageSquare className="w-6 h-6 fill-current" />
        
        {/* Tooltip on hover */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-3 py-1.5 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-stone-border">
          واتساب مباشر
        </span>
      </motion.a>

      {/* 2. INDEPENDENT FLOATING PHONE CALL BUTTON */}
      <motion.a
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        href={`tel:${phoneNum}`}
        className="w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-2xl relative border-2 border-white group"
        aria-label="اتصال هاتف مباشر"
        title="اتصال مباشر 0549789178"
      >
        <Phone className="w-6 h-6 transition-transform group-hover:rotate-12" />

        {/* Tooltip on hover */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-3 py-1.5 text-xs font-semibold font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-stone-border dir-ltr">
          {phoneNum}
        </span>
      </motion.a>

    </div>
  );
}
