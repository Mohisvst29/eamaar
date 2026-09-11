// Utility for updating Page Meta Tags & Title dynamically based on current path for optimal SEO in Dammam & Khobar

const pageSeoData = {
  home: {
    title: 'ديكورات الدمام | لمسة إعمار للترميم والديكور | تركيب بديل خشب ورخام بالدمام والخبر',
    description: 'مؤسسة لمسة إعمار أفضل معلم ديكورات بالدمام والخبر. متخصصون في تركيب بديل الخشب، بديل الرخام، الترميم الإنشائي، الفوم، الاستيل، الدهانات والمظلات بالشرقية. اتصل الآن: 0549789178',
    keywords: 'ديكورات الدمام, بديل خشب الدمام, بديل رخام الدمام, مقاول ترميم الدمام, تركيب بديل الخشب بالدمام, معلم بديل الرخام بالدمام, ديكورات شاشات الدمام, دهانات الدمام, معلم ترميم الدمام, ترميم منازل بالخبر والدمام, لمسة إعمار',
    canonical: 'https://www.lamsetemart.com/'
  },
  services: {
    title: 'خدمات ديكورات الدمام وبديل الخشب والرخام | لمسة إعمار بالشرقية',
    description: 'استعراض خدمات لمسة إعمار بالدمام والخبر: تركيب بديل الخشب WPC، بديل الرخام الحجري، الفوم، الاستيل، دهانات مقاومة للرطوبة، والترميم الإنشائي المتكامل.',
    keywords: 'خدمات ديكورات الدمام, تركيب بديل الخشب بالدمام, تركيب بديل الرخام بالدمام, معلم فوم واستيل بالدمام, دهانات الدمام, شلالات ومظلات بالشرقية',
    canonical: 'https://www.lamsetemart.com/#services'
  },
  portfolio: {
    title: 'معرض أعمال ديكورات الدمام والترميم بالخبر | لمسة إعمار',
    description: 'شاهد بالصور والتحول الإنشائي قبل وبعد لمشاريع تركيب بديل الخشب والرخام والديكورات والترميم التي نفذتها مؤسسة لمسة إعمار بالدمام والخبر.',
    keywords: 'معرض اعمال ديكورات الدمام, صور بديل خشب الدمام, مشاريع ترميم منازل بالخبر, نماذج بديل رخام بالدمام',
    canonical: 'https://www.lamsetemart.com/#portfolio'
  },
  about: {
    title: 'عن لمسة إعمار | أفضل مقاول ديكورات وترميم بالدمام والخبر',
    description: 'تعرف على مؤسسة لمسة إعمار بالخبر والدمام، خبرتنا المعمارية في الترميم الإنشائي وتكسيات بديل الخشب والرخام وحلول الرطوبة بالمنطقة الشرقية.',
    keywords: 'عن لمسة إعمار, مقاول ديكورات بالدمام, مؤسسة ترميم بالخبر, معلم ديكورات الشرقية',
    canonical: 'https://www.lamsetemart.com/#about'
  },
  articles: {
    title: 'مدونة نصائح ديكورات الدمام والترميم | لمسة إعمار',
    description: 'أدلة هندسية ونصائح عملية في تركيب بديل الخشب، اختيار بديل الرخام، عزل الرطوبة بالدمام والخبر، وتنسيق الإضاءة والديكورات الفاخرة.',
    keywords: 'نصائح بديل الخشب الدمام, طريقة تركيب بديل الرخام, عزل رطوبة الجدران بالدمام, مقالات ديكور بالشرقية',
    canonical: 'https://www.lamsetemart.com/#articles'
  },
  contact: {
    title: 'اتصل بنا | طلب معاينة مجانية ديكورات الدمام والخبر - لمسة إعمار',
    description: 'تواصل مع مؤسسة لمسة إعمار لحجز معاينة هندسية ميدانية مجانية بالدمام والخبر والظهران. جوال/واتساب: 0549789178.',
    keywords: 'تواصل مع لمسة إعمار, رقم معلم ديكورات الدمام, معاينة ديكورات بالدمام, رقم بديل خشب الدمام 0549789178',
    canonical: 'https://www.lamsetemart.com/#contact'
  }
};

export function updateSEOForPath(path) {
  const data = pageSeoData[path] || pageSeoData.home;

  // 1. Title
  document.title = data.title;

  // 2. Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', data.description);

  // 3. Meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', data.keywords);

  // 4. OpenGraph Title & Description
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', data.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', data.description);

  // 5. Canonical
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', data.canonical);
}
