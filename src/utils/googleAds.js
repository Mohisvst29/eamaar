export function injectGoogleAdsScript(googleAdsLinkOrId, siteVerificationCode) {
  if (typeof window === 'undefined') return;

  if (googleAdsLinkOrId) {
    const existingScript = document.getElementById('google-ads-script');
    if (!existingScript) {
      let tagId = googleAdsLinkOrId.trim();
      const match = tagId.match(/(AW-[0-9]+|G-[A-Z0-9]+|GTM-[A-Z0-9]+)/i);
      if (match) {
        tagId = match[0];
      }

      if (tagId.startsWith('AW-') || tagId.startsWith('G-')) {
        const script1 = document.createElement('script');
        script1.id = 'google-ads-script';
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.id = 'google-ads-init';
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${tagId}');
        `;
        document.head.appendChild(script2);
      }
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
