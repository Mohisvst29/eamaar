export function getCleanWhatsAppNumber(rawNum) {
  let clean = (rawNum || '966549789178').replace(/[^0-9]/g, '');
  if (clean.startsWith('05')) {
    clean = '966' + clean.slice(1);
  }
  return clean || '966549789178';
}

export function formatWhatsAppUrl(customText, overrideNum) {
  let rawNum = overrideNum;
  if (!rawNum) {
    try {
      const saved = localStorage.getItem('lamsat_admin_social');
      if (saved) {
        const parsed = JSON.parse(saved);
        rawNum = parsed.whatsapp;
      }
    } catch {
      // fallback to default
    }
  }
  const num = getCleanWhatsAppNumber(rawNum || '966549789178');
  const message = customText || 'مرحباً لمسة إعمار، أرغب في حجز معاينة هندسية ميدانية لمشروعي بالشرقية';
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(customText, overrideNum) {
  const url = formatWhatsAppUrl(customText, overrideNum);
  window.open(url, '_blank', 'noopener,noreferrer');
}
