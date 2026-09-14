import { useState, useEffect } from 'react';

const INITIAL_HERO_BACKGROUNDS = [
  '/images/portfolio_villa_facade_1789062292409.jpg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAdOTLaev21wbptzAH_YdykQa4AeGS-R1w30L0EQL1emJ5Kv2Stf_PsMtUkxTbLJarKNg3tzg8eu-4qZ3XqsQ6GnQVhgYgJxlDJ7vKnXBuTPN7ROn1yWm_TX25DnaXr7-enR_hcrPCXKqW7ao3YYSLUFWP2QPPz8deMMKEfO1h07uQnWiBCpPzP6DSkT7KzspoCwHRHQnaICszr3A0mwwwx4cdjhS9O0wbnfiuU1oiLtHWvFYyim7_E',
  '/images/portfolio_majlis_decor_1789062311661.jpg'
];

const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    title: 'كيف تتجنب أخطاء عزل الرطوبة وتشطيب الجدران في مناخ الخبر الساحلي؟',
    category: 'العزل ومقاومة الرطوبة',
    readTime: '6 دقائق',
    issue: 'العدد 14 • الخبر',
    summary: 'نظرة هندسية معمقة على تأثير الرطوبة الملحية في المنطقة الشرقية على الدهانات والتكسيات الخشبية، ولماذا يُعد فحص التمديدات المائية واختيار بدائل WPC المعالجة والتأسيس بمادة البرايمر الإيبوكسي حجر الزاوية في أي ترميم ناجح يستمر لسنوات.',
    content: 'مناخ الخبر والمنطقة الشرقية يتطلب معايير هندسية خاصة لعزل الرطوبة... يوصى دائماً بتطبيق البرايمر الإيبوكسي وفحص خطوط السباكة بالضغط قبل تركيب أية تكسيات جدارية.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdOTLaev21wbptzAH_YdykQa4AeGS-R1w30L0EQL1emJ5Kv2Stf_PsMtUkxTbLJarKNg3tzg8eu-4qZ3XqsQ6GnQVhgYgJxlDJ7vKnXBuTPN7ROn1yWm_TX25DnaXr7-enR_hcrPCXKqW7ao3YYSLUFWP2QPPz8deMMKEfO1h07uQnWiBCpPzP6DSkT7KzspoCwHRHQnaICszr3A0mwwwx4cdjhS9O0wbnfiuU1oiLtHWvFYyim7_E'
  },
  {
    id: 'art-2',
    title: 'دليل اختيار البورسلان الإسباني والهندي للمساحات الكبيرة',
    category: 'أدلة الترميم الإنشائي',
    readTime: '4 دقائق',
    issue: 'دليل ميداني',
    summary: 'فروقات الجودة المعيارية، أهمية التثبيت بالمادة اللاصقة المعتمدة بدلاً من الخلطة التقليدية، وكيف تضمن عدم تقبع البلاط في المستقبل.',
    content: 'تركيب البورسلان القياسي 120×60 سم يتطلب تسوية الأرضيات بالخلطة الميزانية والقص بالليزر لإغلاق الفواصل بدقة.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSl8U1HgsDaiX8UBhvMqMF_aM3c-QqT5NXqDOW36gQIUb7nqA_Y1QtgaWkLSn4SStxovKITJGXe_uNqOsHJ9M8WEJ6rueqUoEu8ouyp-l46uJsyAELS92or1_B9usS3aEti24rP9MgKSzx4ZYoguAW5d6DC-F-o7RMs_5sbzMHHTY7udNjJ5NMliUb37asCjfFxTebPTZppLjSIiCHB-yg6nIbgJX_C-nluRBAvdjZlWHHTnyNTqQU'
  },
  {
    id: 'art-3',
    title: 'بديل الخشب مقابل الخشب الطبيعي: أيهما الأنسب لمجالس الشرقية؟',
    category: 'بدائل الرخام والخشب',
    readTime: '5 دقائق',
    issue: 'دليل الديكورات',
    summary: 'مقارنة شاملة بين متانة WPC ومقاومته للتسوس والماء مقابل التكلفة الدورية لصيانة الخشب الطبيعي تحت أشعة الشمس.',
    content: 'تكسيات بديل الخشب WPC المضلع توفر متانة فائقة ضد التمدد الحراري ومظهر فندقي رائع خلف الشاشات والمداخل.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrwzLLKofFGIw7T90cJoi4tsYQ8ZgiximxcIzgQy5hIPXJof_F-erNta6p16Ra1kJUfqdiYM_092-YhfKv5IWbD1BYhjytcv_9_RX_4qRxKep2v42WZ9YEm_JMozNKI0aOiNmZrTG54IisXq3QiEW_zve0hdRUcQYOCUzuhxbzaSTUX-42GJFD2LB-hUz48XprvMlq93xcnTr8JzdKWBURfNfnC_3oc_29dJhPeqHy0_9Bcwjs-WBk'
  },
  {
    id: 'art-4',
    title: 'توزيع الإضاءة المخفية COB 2700K في الصالات ذات الأسقف المنخفضة',
    category: 'تنسيق الإضاءة والديكور',
    readTime: '3 دقائق',
    issue: 'دليل الإضاءة',
    summary: 'طرق حساب الشدة الضوئية المناسبة لإبراز عروق بديل الرخام دون إحداث وهج مزعج أو ارتفاع في درجات الحرارة.',
    content: 'استخدام أشرطة الإضاءة المخفية COB 2700K Warm White تمنح المجالس شعوراً بالفخامة والاتساع.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdOTLaev21wbptzAH_YdykQa4AeGS-R1w30L0EQL1emJ5Kv2Stf_PsMtUkxTbLJarKNg3tzg8eu-4qZ3XqsQ6GnQVhgYgJxlDJ7vKnXBuTPN7ROn1yWm_TX25DnaXr7-enR_hcrPCXKqW7ao3YYSLUFWP2QPPz8deMMKEfO1h07uQnWiBCpPzP6DSkT7KzspoCwHRHQnaICszr3A0mwwwx4cdjhS9O0wbnfiuU1oiLtHWvFYyim7_E'
  }
];

const INITIAL_SERVICES = [
  {
    id: 'renovation',
    code: '01 / البناء والإصلاح',
    title: 'ترميم وتجديد الفلل والمنازل',
    category: 'إنشائي',
    description: 'إعادة هيكلة شاملة للمنازل القديمة، تدعيم الخرسانة والأعمدة، معالجة الرطوبة والنزوح الملحي المعتاد في أجواء الشرقية الساحلية.',
    details: ['إزالة الديكورات المتضررة والخرسانة الهشة', 'تدعيم الجدران وتأسيس عزل مائي وحراري معتمد', 'معالجة النزوح الملحي بالبرايمر الإيبوكسي'],
    scope: 'الخبر – الثقبة – العزيزية – الظهران',
    gallery: [
      { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSl8U1HgsDaiX8UBhvMqMF_aM3c-QqT5NXqDOW36gQIUb7nqA_Y1QtgaWkLSn4SStxovKITJGXe_uNqOsHJ9M8WEJ6rueqUoEu8ouyp-l46uJsyAELS92or1_B9usS3aEti24rP9MgKSzx4ZYoguAW5d6DC-F-o7RMs_5sbzMHHTY7udNjJ5NMliUb37asCjfFxTebPTZppLjSIiCHB-yg6nIbgJX_C-nluRBAvdjZlWHHTnyNTqQU', title: 'ترميم حمام ماستر وتأسيس إنشائي' },
      { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdOTLaev21wbptzAH_YdykQa4AeGS-R1w30L0EQL1emJ5Kv2Stf_PsMtUkxTbLJarKNg3tzg8eu-4qZ3XqsQ6GnQVhgYgJxlDJ7vKnXBuTPN7ROn1yWm_TX25DnaXr7-enR_hcrPCXKqW7ao3YYSLUFWP2QPPz8deMMKEfO1h07uQnWiBCpPzP6DSkT7KzspoCwHRHQnaICszr3A0mwwwx4cdjhS9O0wbnfiuU1oiLtHWvFYyim7_E', title: 'إعادة هيكلة فناء الفيلا الخارجي' }
    ]
  },
  {
    id: 'tiling',
    code: '02 / التبليط والأرضيات',
    title: 'تركيب السيراميك والبورسلان',
    category: 'أرضيات وجدران',
    description: 'قص ليزري وميزان ليزر لضبط الفواصل بدقة متناهية للألواح الكبيرة 120×60 سم، أرضيات الصالات، الأحواش، والحوائط.',
    details: ['تركيب البورسلان الإسباني والهندي عالي المقاومة', 'تسوية الأرضية بخلطة الميزانية وشبك الفواصل', 'تركيب البورسلان على الجدران بالمادة اللاصقة المعتمدة'],
    scope: 'صالات، مجالس، أحواش، حمامات ماستر',
    gallery: [
      { url: '/images/porcelain_tiling_photo_1789061848541.jpg', title: 'تركيب بورسلان ليزري 120×60 سم بالصالات' }
    ]
  },
  {
    id: 'painting',
    code: '03 / الطلاء والتشطيب',
    title: 'الدهانات الداخلية والخارجية',
    category: 'دهانات معالجة',
    description: 'تطبيق دهانات الجزيرة وجوتن بألوان هادئة مطفية ولامعة، معالجة التشققات بالمعجون الخاص وطلاء البروفايل الخارجي المقاوم للشمس.',
    details: ['معالجة التشققات بسيلانت مطاطي خاص', 'طلاء وجه برايمر + 2 وجه معجون + 2 وجه دهان', 'دهانات بروفايل وغرافيت واجهات منازل'],
    scope: 'دهانات تدوم ومقاومة ل humidity الشرقية',
    gallery: [
      { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdOTLaev21wbptzAH_YdykQa4AeGS-R1w30L0EQL1emJ5Kv2Stf_PsMtUkxTbLJarKNg3tzg8eu-4qZ3XqsQ6GnQVhgYgJxlDJ7vKnXBuTPN7ROn1yWm_TX25DnaXr7-enR_hcrPCXKqW7ao3YYSLUFWP2QPPz8deMMKEfO1h07uQnWiBCpPzP6DSkT7KzspoCwHRHQnaICszr3A0mwwwx4cdjhS9O0wbnfiuU1oiLtHWvFYyim7_E', title: 'دهانات بروفايل واجهات مقاوِمة للشمس' }
    ]
  },
  {
    id: 'cladding',
    code: '04 / التكسيات والديكور',
    title: 'بديل الخشب وبديل الرخام',
    category: 'ديكورات عصرية',
    description: 'تركيب ألواح بديل الخشب WPC المضلع وبديل الرخام الناشف واللامع خلف الشاشات والمداخل مع توزيع سبوتلايت وإضاءة مخفية COB 2700K.',
    details: ['أكسسوارات زوايا ستانلس ستيل ذهبي وأسود', 'ألواح شيبورد جدارية مع أرفف مخفية', 'تكسيات مداخل واستقبال فندقي'],
    scope: 'مجالس، صالات، مداخل فلل، مكاتب',
    gallery: [
      { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrwzLLKofFGIw7T90cJoi4tsYQ8ZgiximxcIzgQy5hIPXJof_F-erNta6p16Ra1kJUfqdiYM_092-YhfKv5IWbD1BYhjytcv_9_RX_4qRxKep2v42WZ9YEm_JMozNKI0aOiNmZrTG54IisXq3QiEW_zve0hdRUcQYOCUzuhxbzaSTUX-42GJFD2LB-hUz48XprvMlq93xcnTr8JzdKWBURfNfnC_3oc_29dJhPeqHy0_9Bcwjs-WBk', title: 'بديل خشب WPC مضلع' }
    ]
  },
  {
    id: 'waterfalls',
    code: '05 / الحدائق والمساحات',
    title: 'الشلالات والحدائق المنزلية',
    category: 'خارجي ولاندسكيب',
    description: 'تصميم وتنفيذ شلالات جدارية مع إضاءات مائية، عشب صناعي عالي الكثافة، وتكسيات خشبية مقاومة لأحواض الحدائق الخارجية.',
    details: ['مضخات مائية صامتة مع فلاتر تنقية', 'إضاءات ضد الماء IP68 دافئة 3000K', 'تكسيات WPC خارجية مقاومة للشمس المباشرة'],
    scope: 'حدائق خلفية، ارتدادات، أحواش فيلا',
    gallery: [
      { url: '/images/waterfall_garden_photo_1789061878611.jpg', title: 'شلال جداري مائي مع إضاءة IP68' }
    ]
  },
  {
    id: 'plumbing',
    code: '06 / التأسيس والتحديث',
    title: 'تجديد السباكة والكهرباء',
    category: 'بنية تحتية',
    description: 'إحلال خطوط التغذية والحراري الألماني، تركيب كراسي معلقة ومخفية، وتأسيس طبلونات كهرباء وتأريض مطابق للمواصفات السعودية.',
    details: ['ضغط هيدروليكي 12 بار للتأكد من عدم وجود تسريبات', 'تأسيس شبكات إضاءة مخفية ومفاتيح سمارت', 'تركيب صفاية ستانلس ستيل مانعة للروائح'],
    scope: 'حمامات، مطابخ، تمديدات عامة',
    gallery: [
      { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSl8U1HgsDaiX8UBhvMqMF_aM3c-QqT5NXqDOW36gQIUb7nqA_Y1QtgaWkLSn4SStxovKITJGXe_uNqOsHJ9M8WEJ6rueqUoEu8ouyp-l46uJsyAELS92or1_B9usS3aEti24rP9MgKSzx4ZYoguAW5d6DC-F-o7RMs_5sbzMHHTY7udNjJ5NMliUb37asCjfFxTebPTZppLjSIiCHB-yg6nIbgJX_C-nluRBAvdjZlWHHTnyNTqQU', title: 'تأسيس سباكة مخفية وكراسي معلقة' }
    ]
  }
];

const INITIAL_PORTFOLIO = [
  {
    id: 1,
    title: 'تشطيب واجهة فيلا مودرن - الخبر',
    category: 'فيلل مودرن',
    image: '/images/portfolio_villa_facade_1789062292409.jpg'
  },
  {
    id: 2,
    title: 'ديكور مجلس ماستر بديل خشب ورخام - الظهران',
    category: 'صالات ومجالس',
    image: '/images/portfolio_majlis_decor_1789062311661.jpg'
  },
  {
    id: 3,
    title: 'شلال جداري مائي وإضاءة IP68 - الراكة',
    category: 'حدائق وشلالات',
    image: '/images/waterfall_garden_photo_1789061878611.jpg'
  },
  {
    id: 4,
    title: 'تركيب بورسلان ليزري 120×60 - الحزام الذهبي',
    category: 'ترميم إنشائي',
    image: '/images/porcelain_tiling_photo_1789061848541.jpg'
  },
  {
    id: 5,
    title: 'ترميم حمام ماستر ورخام كلكتا - الثقبة',
    category: 'ترميم إنشائي',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSl8U1HgsDaiX8UBhvMqMF_aM3c-QqT5NXqDOW36gQIUb7nqA_Y1QtgaWkLSn4SStxovKITJGXe_uNqOsHJ9M8WEJ6rueqUoEu8ouyp-l46uJsyAELS92or1_B9usS3aEti24rP9MgKSzx4ZYoguAW5d6DC-F-o7RMs_5sbzMHHTY7udNjJ5NMliUb37asCjfFxTebPTZppLjSIiCHB-yg6nIbgJX_C-nluRBAvdjZlWHHTnyNTqQU'
  },
  {
    id: 6,
    title: 'تكسيات جدارية WPC وستانلس ذهبي - الدمام',
    category: 'صالات ومجالس',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrwzLLKofFGIw7T90cJoi4tsYQ8ZgiximxcIzgQy5hIPXJof_F-erNta6p16Ra1kJUfqdiYM_092-YhfKv5IWbD1BYhjytcv_9_RX_4qRxKep2v42WZ9YEm_JMozNKI0aOiNmZrTG54IisXq3QiEW_zve0hdRUcQYOCUzuhxbzaSTUX-42GJFD2LB-hUz48XprvMlq93xcnTr8JzdKWBURfNfnC_3oc_29dJhPeqHy0_9Bcwjs-WBk'
  },
  {
    id: 7,
    title: 'إعادة هيكلة فناء لاندسكيب خارجي - الخبر',
    category: 'حدائق وشلالات',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdOTLaev21wbptzAH_YdykQa4AeGS-R1w30L0EQL1emJ5Kv2Stf_PsMtUkxTbLJarKNg3tzg8eu-4qZ3XqsQ6GnQVhgYgJxlDJ7vKnXBuTPN7ROn1yWm_TX25DnaXr7-enR_hcrPCXKqW7ao3YYSLUFWP2QPPz8deMMKEfO1h07uQnWiBCpPzP6DSkT7KzspoCwHRHQnaICszr3A0mwwwx4cdjhS9O0wbnfiuU1oiLtHWvFYyim7_E'
  }
];

import { injectGoogleAdsScript } from '../utils/googleAds';

const INITIAL_SOCIAL = {
  phone: '0549789178',
  whatsapp: '966549789178',
  instagram: 'https://instagram.com',
  twitter: 'https://twitter.com',
  tiktok: 'https://tiktok.com',
  snapchat: 'https://snapchat.com',
  location: 'الخبر - الثقبة، شارع مكة المكرمة',
  mongodbUri: 'mongodb+srv://<db_username>:Tj8wCWWcpUDGRz8x@cluster0.qmgt7kg.mongodb.net/?appName=Cluster0',
  googleAdsLink: 'AW-18444819668',
  googleSiteVerification: 'google-site-verification-lamsat-emaar'
};

const INITIAL_CREDS = {
  username: 'admin',
  password: 'admin215'
};

// Global Store State
let globalCreds = (() => {
  try {
    const saved = localStorage.getItem('lamsat_admin_creds');
    return saved ? JSON.parse(saved) : INITIAL_CREDS;
  } catch {
    return INITIAL_CREDS;
  }
})();

let globalIsAuthenticated = (() => {
  return sessionStorage.getItem('lamsat_admin_logged') === 'true';
})();

let globalHeroBackgrounds = (() => {
  try {
    const saved = localStorage.getItem('lamsat_admin_hero_bgs');
    return saved ? JSON.parse(saved) : INITIAL_HERO_BACKGROUNDS;
  } catch {
    return INITIAL_HERO_BACKGROUNDS;
  }
})();

let globalArticles = (() => {
  try {
    const saved = localStorage.getItem('lamsat_admin_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  } catch {
    return INITIAL_ARTICLES;
  }
})();

let globalServices = (() => {
  try {
    const saved = localStorage.getItem('lamsat_admin_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  } catch {
    return INITIAL_SERVICES;
  }
})();

let globalPortfolio = (() => {
  try {
    const saved = localStorage.getItem('lamsat_admin_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  } catch {
    return INITIAL_PORTFOLIO;
  }
})();

let globalSocialLinks = (() => {
  try {
    const saved = localStorage.getItem('lamsat_admin_social');
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL;
  } catch {
    return INITIAL_SOCIAL;
  }
})();

const listeners = new Set();

function notifyListeners() {
  listeners.forEach(listener => listener());
}

export function useAdminStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  const login = (username, password) => {
    const u = (username || '').trim();
    const p = (password || '').trim();
    if (u === globalCreds.username && p === globalCreds.password) {
      globalIsAuthenticated = true;
      sessionStorage.setItem('lamsat_admin_logged', 'true');
      notifyListeners();
      return true;
    }
    return false;
  };

  const logout = () => {
    globalIsAuthenticated = false;
    sessionStorage.removeItem('lamsat_admin_logged');
    notifyListeners();
  };

  const updateCredentials = (newUsername, newPassword) => {
    globalCreds = { username: newUsername, password: newPassword };
    localStorage.setItem('lamsat_admin_creds', JSON.stringify(globalCreds));
    notifyListeners();
  };

  const addHeroBackground = (imgUrl) => {
    if (!imgUrl) return;
    globalHeroBackgrounds = [imgUrl, ...globalHeroBackgrounds];
    localStorage.setItem('lamsat_admin_hero_bgs', JSON.stringify(globalHeroBackgrounds));
    notifyListeners();
  };

  const deleteHeroBackground = (index) => {
    globalHeroBackgrounds = globalHeroBackgrounds.filter((_, idx) => idx !== index);
    if (globalHeroBackgrounds.length === 0) {
      globalHeroBackgrounds = INITIAL_HERO_BACKGROUNDS;
    }
    localStorage.setItem('lamsat_admin_hero_bgs', JSON.stringify(globalHeroBackgrounds));
    notifyListeners();
  };

  const addArticle = (newArt) => {
    const artWithId = {
      ...newArt,
      id: `art-${Date.now()}`,
      readTime: newArt.readTime || '4 دقائق',
      issue: newArt.issue || 'دليل لمسة إعمار'
    };
    globalArticles = [artWithId, ...globalArticles];
    localStorage.setItem('lamsat_admin_articles', JSON.stringify(globalArticles));
    notifyListeners();
  };

  const deleteArticle = (id) => {
    globalArticles = globalArticles.filter(a => a.id !== id);
    localStorage.setItem('lamsat_admin_articles', JSON.stringify(globalArticles));
    notifyListeners();
  };

  const addService = (newSrv) => {
    const srvWithId = {
      ...newSrv,
      id: `srv-${Date.now()}`,
      gallery: newSrv.image ? [{ url: newSrv.image, title: newSrv.title }] : []
    };
    globalServices = [srvWithId, ...globalServices];
    localStorage.setItem('lamsat_admin_services', JSON.stringify(globalServices));
    notifyListeners();
  };

  const deleteService = (id) => {
    globalServices = globalServices.filter(s => s.id !== id);
    localStorage.setItem('lamsat_admin_services', JSON.stringify(globalServices));
    notifyListeners();
  };

  const addPortfolioPhoto = (newItem) => {
    const photoWithId = {
      ...newItem,
      id: Date.now()
    };
    globalPortfolio = [photoWithId, ...globalPortfolio];
    localStorage.setItem('lamsat_admin_portfolio', JSON.stringify(globalPortfolio));
    notifyListeners();
  };

  const deletePortfolioPhoto = (id) => {
    globalPortfolio = globalPortfolio.filter(p => p.id !== id);
    localStorage.setItem('lamsat_admin_portfolio', JSON.stringify(globalPortfolio));
    notifyListeners();
  };

  useEffect(() => {
    if (globalSocialLinks?.googleAdsLink || globalSocialLinks?.googleSiteVerification) {
      injectGoogleAdsScript(globalSocialLinks.googleAdsLink, globalSocialLinks.googleSiteVerification);
    }
  }, []);

  const updateSocialLinks = (newLinks) => {
    globalSocialLinks = { ...globalSocialLinks, ...newLinks };
    localStorage.setItem('lamsat_admin_social', JSON.stringify(globalSocialLinks));
    if (globalSocialLinks.googleAdsLink || globalSocialLinks.googleSiteVerification) {
      injectGoogleAdsScript(globalSocialLinks.googleAdsLink, globalSocialLinks.googleSiteVerification);
    }
    notifyListeners();
  };

  return {
    creds: globalCreds,
    isAuthenticated: globalIsAuthenticated,
    heroBackgrounds: globalHeroBackgrounds,
    articles: globalArticles,
    services: globalServices,
    portfolio: globalPortfolio,
    socialLinks: globalSocialLinks,
    login,
    logout,
    updateCredentials,
    addHeroBackground,
    deleteHeroBackground,
    addArticle,
    deleteArticle,
    addService,
    deleteService,
    addPortfolioPhoto,
    deletePortfolioPhoto,
    updateSocialLinks
  };
}
