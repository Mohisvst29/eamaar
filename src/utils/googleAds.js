export function injectGoogleAdsScript(googleAdsLinkOrId, siteVerificationCode) {
  if (typeof window === 'undefined') return;

  if (googleAdsLinkOrId) {
    let tagId = googleAdsLinkOrId.trim();
    const match = tagId.match(/(AW-[0-9]+|G-[A-Z0-9]+|GTM-[A-Z0-9]+)/i);
    if (match) {
      tagId = match[0];
    }

    if (tagId.startsWith('AW-') || tagId.startsWith('G-')) {
      let script1 = document.getElementById('google-ads-script');
      if (!script1) {
        script1 = document.createElement('script');
        script1.id = 'google-ads-script';
        script1.async = true;
        document.head.appendChild(script1);
      }
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;

      let script2 = document.getElementById('google-ads-init');
      if (!script2) {
        script2 = document.createElement('script');
        script2.id = 'google-ads-init';
        document.head.appendChild(script2);
      }
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${tagId}');
      `;
    }
  }

  if (siteVerificationCode) {
    let existingMeta = document.querySelector('meta[name="google-site-verification"]');
    if (!existingMeta) {
      existingMeta = document.createElement('meta');
      existingMeta.name = 'google-site-verification';
      document.head.appendChild(existingMeta);
    }
    existingMeta.content = siteVerificationCode.trim();
  }
}

export function trackGoogleAdsEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

