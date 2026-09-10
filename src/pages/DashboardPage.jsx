import React, { useState } from 'react';
import { 
  LayoutDashboard, Construction, ClipboardList, Users, Phone, ArrowRight, Plus, 
  Search, Filter, CheckCircle2, Clock, AlertCircle, Trash2, ShieldCheck, MapPin, 
  Settings, Key, Share2, Layers, Image as ImageIcon, LogOut, Check, Save, Upload, BookOpen,
  Database, Download, Globe
} from 'lucide-react';

import { useConsultationStore } from '../store/useConsultationStore';
import { useAdminStore } from '../store/useAdminStore';
import { testMongoConnection } from '../services/db';
import { generateDynamicSitemapXml, downloadSitemapXml } from '../utils/sitemap';

// Helper to resize and convert uploaded image files to compressed Data URLs
const processImageFile = (file, callback) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const MAX_SIZE = 1200;

      if (width > height) {
        if (width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      callback(dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

export default function DashboardPage({ onNavigate, onLogout }) {
  const { requests, updateStatus, deleteRequest } = useConsultationStore();
  const { 
    creds, services, portfolio, socialLinks, heroBackgrounds, articles,
    updateCredentials, addService, deleteService, 
    addPortfolioPhoto, deletePortfolioPhoto, updateSocialLinks,
    addHeroBackground, deleteHeroBackground, addArticle, deleteArticle
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'hero_bgs', 'services', 'portfolio', 'articles', 'social', 'security'

  // Requests Table Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Form State for Hero Background Photo
  const [newHeroBg, setNewHeroBg] = useState('');
  const [heroBgSuccess, setHeroBgSuccess] = useState(false);

  // Form State for New Service
  const [newSrv, setNewSrv] = useState({
    title: '',
    code: '07 / التخصص الجديد',
    category: 'ديكورات عصرية',
    description: '',
    scope: 'الخبر والشرقية',
    image: '',
    detailsText: ''
  });
  const [srvSuccess, setSrvSuccess] = useState(false);

  // Form State for New Portfolio Photo
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'فيلل مودرن',
    image: ''
  });
  const [customCategoryMode, setCustomCategoryMode] = useState(false);
  const [photoSuccess, setPhotoSuccess] = useState(false);

  // Form State for New Article
  const [newArt, setNewArt] = useState({
    title: '',
    category: 'أدلة الترميم الإنشائي',
    readTime: '5 دقائق',
    summary: '',
    content: '',
    image: ''
  });
  const [articleSuccess, setArticleSuccess] = useState(false);

  // Form State for Security Credentials
  const [securityForm, setSecurityForm] = useState({
    username: creds.username,
    password: creds.password,
    confirmPassword: creds.password
  });
  const [credSuccess, setCredSuccess] = useState(false);
  const [credError, setCredError] = useState('');

  // Form State for Social Links & Integrations
  const [socialForm, setSocialForm] = useState({ ...socialLinks });
  const [socialSuccess, setSocialSuccess] = useState(false);
  const [dbTestResult, setDbTestResult] = useState(null);

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.clientName.includes(searchTerm) || r.phone.includes(searchTerm) || r.id.includes(searchTerm) || r.city.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = requests.filter(r => r.status === 'جديد').length;

  // Submit Handlers
  const handleAddHeroBgSubmit = (e) => {
    e.preventDefault();
    if (!newHeroBg) return;
    addHeroBackground(newHeroBg);
    setHeroBgSuccess(true);
    setTimeout(() => setHeroBgSuccess(false), 3000);
    setNewHeroBg('');
  };

  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    if (!newSrv.title || !newSrv.description) return;

    const details = newSrv.detailsText
      ? newSrv.detailsText.split('\n').filter(Boolean)
      : ['مواصفات دقيقة تحت الإشراف المباشر'];

    addService({
      code: newSrv.code,
      title: newSrv.title,
      category: newSrv.category,
      description: newSrv.description,
      scope: newSrv.scope,
      details,
      image: newSrv.image
    });

    setSrvSuccess(true);
    setTimeout(() => setSrvSuccess(false), 3000);
    setNewSrv({ title: '', code: '07 / التخصص الجديد', category: 'ديكورات عصرية', description: '', scope: 'الخبر والشرقية', image: '', detailsText: '' });
  };

  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.image || !newPhoto.category) return;

    addPortfolioPhoto(newPhoto);
    setPhotoSuccess(true);
    setTimeout(() => setPhotoSuccess(false), 3000);
    setNewPhoto({ title: '', category: 'فيلل مودرن', image: '' });
    setCustomCategoryMode(false);
  };

  const handleAddArticleSubmit = (e) => {
    e.preventDefault();
    if (!newArt.title || !newArt.summary) return;

    addArticle(newArt);
    setArticleSuccess(true);
    setTimeout(() => setArticleSuccess(false), 3000);
    setNewArt({ title: '', category: 'أدلة الترميم الإنشائي', readTime: '5 دقائق', summary: '', content: '', image: '' });
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    setCredError('');
    if (securityForm.password !== securityForm.confirmPassword) {
      setCredError('كلمة السر غير متطابقة مع تأكيد كلمة السر.');
      return;
    }
    updateCredentials(securityForm.username.trim(), securityForm.password.trim());
    setCredSuccess(true);
    setTimeout(() => setCredSuccess(false), 3000);
  };

  const handleSocialSubmit = (e) => {
    e.preventDefault();
    updateSocialLinks(socialForm);
    setSocialSuccess(true);
    setTimeout(() => setSocialSuccess(false), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-surface flex pt-20">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-surface-container border-l border-stone-border hidden lg:flex flex-col justify-between p-space-md shrink-0 sticky top-20 h-[calc(100vh-5rem)]">
        <div className="flex flex-col gap-space-md">
          
          <div className="flex items-center gap-space-sm pb-space-sm border-b border-stone-border">
            <img src="/logo.png" alt="لمسة إعمار" className="h-12 w-auto object-contain drop-shadow-md" />
          </div>

          <nav className="flex flex-col gap-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex items-center justify-between px-3 py-2.5 transition-colors text-right ${
                activeTab === 'requests' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-secondary" />
                <span>طلبات المعايرة الميدانية</span>
              </div>
              <span className="px-1.5 py-0.5 text-[10px] bg-secondary text-on-secondary rounded-full">
                {pendingCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('hero_bgs')}
              className={`flex items-center gap-2 px-3 py-2.5 transition-colors text-right ${
                activeTab === 'hero_bgs' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-secondary" />
              <span>خلفيات الواجهة (Hero)</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2 px-3 py-2.5 transition-colors text-right ${
                activeTab === 'services' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Layers className="w-4 h-4 text-secondary" />
              <span>إدارة وإضافة الخدمات</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-3 py-2.5 transition-colors text-right ${
                activeTab === 'portfolio' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-secondary" />
              <span>إدارة صور أعمالنا وفئاتها</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-3 py-2.5 transition-colors text-right ${
                activeTab === 'articles' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <BookOpen className="w-4 h-4 text-secondary" />
              <span>إدارة مقالات المدونة</span>
            </button>

            <button
              onClick={() => setActiveTab('social')}
              className={`flex items-center gap-2 px-3 py-2.5 transition-colors text-right ${
                activeTab === 'social' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Share2 className="w-4 h-4 text-secondary" />
              <span>روابط التواصل والموقع</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 px-3 py-2.5 transition-colors text-right ${
                activeTab === 'security' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Key className="w-4 h-4 text-secondary" />
              <span>إعدادات الحساب وكلمة السر</span>
            </button>
          </nav>

        </div>

        <div className="flex flex-col gap-2 pt-space-md border-t border-stone-border text-xs">
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 py-2 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors py-1 text-xs font-semibold"
          >
            <span>العودة للموقع العام</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT */}
      <main className="flex-1 p-space-md md:p-space-xl overflow-x-hidden">
        
        {/* Mobile Tab Selector */}
        <div className="lg:hidden mb-space-md flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3 py-2 text-xs font-semibold ${activeTab === 'requests' ? 'bg-primary text-white' : 'bg-surface-container'}`}
          >
            الطلبات ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('hero_bgs')}
            className={`px-3 py-2 text-xs font-semibold ${activeTab === 'hero_bgs' ? 'bg-primary text-white' : 'bg-surface-container'}`}
          >
            الخلفيات
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-2 text-xs font-semibold ${activeTab === 'services' ? 'bg-primary text-white' : 'bg-surface-container'}`}
          >
            الخدمات
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3 py-2 text-xs font-semibold ${activeTab === 'portfolio' ? 'bg-primary text-white' : 'bg-surface-container'}`}
          >
            الأعمال
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-2 text-xs font-semibold ${activeTab === 'articles' ? 'bg-primary text-white' : 'bg-surface-container'}`}
          >
            المقالات
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-3 py-2 text-xs font-semibold ${activeTab === 'social' ? 'bg-primary text-white' : 'bg-surface-container'}`}
          >
            التواصل
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-2 text-xs font-semibold ${activeTab === 'security' ? 'bg-primary text-white' : 'bg-surface-container'}`}
          >
            الحساب
          </button>
        </div>

        {/* TAB 1: CONSULTATION REQUESTS */}
        {activeTab === 'requests' && (
          <div className="flex flex-col gap-space-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-border pb-space-md">
              <div>
                <span className="text-xs font-mono text-secondary uppercase">إدارة طلبات العملاء</span>
                <h1 className="font-heading font-bold text-2xl text-primary mt-1">طلبات المعاينة المعمارية بالشرقية</h1>
              </div>
            </div>

            {/* Table Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-lowest border border-stone-border p-space-md shadow-sm">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="بحث باسم العملاء أو رقم الجوال..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-container-low pr-9 pl-3 py-2 text-xs border border-stone-border focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="w-4 h-4 text-secondary shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-surface-container-low px-3 py-2 text-xs border border-stone-border focus:outline-none cursor-pointer"
                >
                  <option value="all">كافة الحالات</option>
                  <option value="جديد">جديد</option>
                  <option value="قيد المعاينة">قيد المعاينة</option>
                  <option value="مكتمل">مكتمل</option>
                </select>
              </div>
            </div>

            {/* Requests Table */}
            <div className="bg-surface-container-lowest border border-stone-border shadow-sm overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-surface-container text-xs text-primary font-mono border-b border-stone-border">
                    <th className="p-3">رقم الطلب</th>
                    <th className="p-3">اسم العميل</th>
                    <th className="p-3">الجوال</th>
                    <th className="p-3">الحي / المنطقة</th>
                    <th className="p-3">الخدمة المطلوبة</th>
                    <th className="p-3">حالة الطلب</th>
                    <th className="p-3">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-stone-border/40">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-on-surface-variant font-mono">
                        لا توجد طلبات معايرة مطابقة لخيارات البحث.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-primary">{req.id}</td>
                        <td className="p-3 font-semibold">{req.clientName}</td>
                        <td className="p-3 font-mono text-secondary" dir="ltr">{req.phone}</td>
                        <td className="p-3">{req.city}</td>
                        <td className="p-3">{req.projectType}</td>
                        <td className="p-3">
                          <select
                            value={req.status}
                            onChange={(e) => updateStatus(req.id, e.target.value)}
                            className="bg-surface-container px-2 py-1 border border-stone-border font-mono text-[11px] rounded cursor-pointer"
                          >
                            <option value="جديد">جديد</option>
                            <option value="قيد المعاينة">قيد المعاينة</option>
                            <option value="مكتمل">مكتمل</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => deleteRequest(req.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 border border-stone-border transition-colors rounded"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE HERO BACKGROUNDS */}
        {activeTab === 'hero_bgs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <div className="lg:col-span-5 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
              <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2">
                إضافة صورة لخلفية الصفحة الرئيسية (Hero)
              </h3>

              {heroBgSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-mono">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>تم إضافة صورة الخلفية بنجاح وتفعيلها بالبانر الرئيسي!</span>
                </div>
              )}

              <form onSubmit={handleAddHeroBgSubmit} className="flex flex-col gap-space-sm text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-primary">صورة الخلفية *</label>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="herobg-file-input"
                      className="flex-1 px-4 py-3 bg-surface-container hover:bg-surface-container-high border border-dashed border-stone-border cursor-pointer flex items-center justify-center gap-2 text-xs font-bold text-primary transition-colors shadow-sm"
                    >
                      <Upload className="w-4 h-4 text-secondary animate-bounce" />
                      <span>اختيار صورة من جهازك (رفع ملف)</span>
                    </label>
                    <input
                      id="herobg-file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          processImageFile(file, (dataUrl) => setNewHeroBg(dataUrl));
                        }
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="أو ضع رابط صورة مباشر: https://..."
                    value={newHeroBg.startsWith('data:') ? 'تم اختيار صورة من الجهاز ✓' : newHeroBg}
                    onChange={(e) => setNewHeroBg(e.target.value)}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono focus:outline-none"
                  />

                  {newHeroBg && (
                    <div className="relative aspect-[16/9] w-full bg-black/90 border border-stone-border overflow-hidden mt-1 group">
                      <img src={newHeroBg} alt="معاينة خلفية الهيرو" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewHeroBg('')}
                        className="absolute top-2 left-2 p-1.5 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition-colors"
                      >
                        إلغاء الصورة
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>حفظ وتفعيل الصورة في خلفية الهيرو المباشر</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
              <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2 flex items-center justify-between">
                <span>صور خلفية الهيرو الحالية بالموقع ({heroBackgrounds.length})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md max-h-[500px] overflow-y-auto pr-1">
                {heroBackgrounds.map((bgUrl, idx) => (
                  <div key={idx} className="relative aspect-[16/9] bg-surface-container border border-stone-border group overflow-hidden shadow-sm">
                    <img src={bgUrl} alt={`خلفية الهيرو ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white text-xs">
                      <span className="font-mono text-secondary">صورة خلفية #{idx + 1}</span>
                      <button
                        onClick={() => deleteHeroBackground(idx)}
                        className="p-1.5 bg-red-600 text-white rounded self-end hover:bg-red-700 transition-colors flex items-center gap-1 text-[11px]"
                        title="حذف الصورة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف من السلايدر</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE & ADD SERVICES */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            
            <div className="lg:col-span-6 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
              <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2">
                إضافة خدمة جديدة
              </h3>

              {srvSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-mono">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>تم إضافة الخدمة ونشرها فوراً بالموقع!</span>
                </div>
              )}

              <form onSubmit={handleAddServiceSubmit} className="flex flex-col gap-space-sm text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">عنوان الخدمة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: تركيب بديل الخشب والمرايا"
                    value={newSrv.title}
                    onChange={(e) => setNewSrv({ ...newSrv, title: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-primary">الكود المعماري</label>
                    <input
                      type="text"
                      value={newSrv.code}
                      onChange={(e) => setNewSrv({ ...newSrv, code: e.target.value })}
                      className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-primary">فئة الخدمة</label>
                    <input
                      type="text"
                      value={newSrv.category}
                      onChange={(e) => setNewSrv({ ...newSrv, category: e.target.value })}
                      className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">وصف الخدمة *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="شرح مختصر للخدمة والمواصفات المعمارية..."
                    value={newSrv.description}
                    onChange={(e) => setNewSrv({ ...newSrv, description: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-primary flex items-center justify-between">
                    <span>صورة الخدمة (اختياري)</span>
                    <span className="text-[10px] text-secondary font-mono">اختيار من الجهاز أو رابط</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="srv-file-input"
                      className="flex-1 px-4 py-2.5 bg-surface-container hover:bg-surface-container-high border border-dashed border-stone-border cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold text-primary transition-colors"
                    >
                      <Upload className="w-4 h-4 text-secondary" />
                      <span>اختيار صورة من جهازك (ملف)</span>
                    </label>
                    <input
                      id="srv-file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          processImageFile(file, (dataUrl) => {
                            setNewSrv(prev => ({ ...prev, image: dataUrl }));
                          });
                        }
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="أو ضع رابط صورة مباشر: https://..."
                    value={newSrv.image.startsWith('data:') ? 'تم اختيار صورة من الجهاز ✓' : newSrv.image}
                    onChange={(e) => setNewSrv({ ...newSrv, image: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono focus:outline-none"
                  />

                  {newSrv.image && (
                    <div className="relative aspect-[16/9] w-full bg-black/90 border border-stone-border overflow-hidden mt-1 group">
                      <img src={newSrv.image} alt="معاينة صورة الخدمة" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setNewSrv({ ...newSrv, image: '' })}
                        className="absolute top-2 left-2 p-1 bg-red-600 text-white rounded text-[10px] hover:bg-red-700 transition-colors"
                      >
                        إلغاء الصورة
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">المواصفات الفنية (سطر لكل نقطة)</label>
                  <textarea
                    rows={3}
                    placeholder="تثبيت بمادة لاصقة معتمدة&#10;ضمان ضد التمدد الحراري..."
                    value={newSrv.detailsText}
                    onChange={(e) => setNewSrv({ ...newSrv, detailsText: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة الخدمة ونشرها فوراً بالموقع</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
              <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2 flex items-center justify-between">
                <span>الخدمات الحالية بالموقع ({services.length})</span>
              </h3>

              <div className="flex flex-col gap-space-sm max-h-[500px] overflow-y-auto pr-1">
                {services.map((srv) => (
                  <div key={srv.id} className="p-3 bg-surface-container border border-stone-border flex items-center justify-between text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] text-secondary">{srv.code}</span>
                      <span className="font-bold text-primary">{srv.title}</span>
                      <span className="text-[11px] text-on-surface-variant">{srv.category}</span>
                    </div>
                    <button
                      onClick={() => deleteService(srv.id)}
                      className="p-2 text-red-600 hover:bg-red-50 border border-stone-border transition-colors"
                      title="حذف الخدمة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: MANAGE & ADD PORTFOLIO PHOTOS WITH CUSTOM CATEGORY */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            
            <div className="lg:col-span-5 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
              <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2">
                إضافة صورة مشروع جديدة لأعمالنا
              </h3>

              {photoSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-mono">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>تم إضافة الصورة بنجاح وتحديث معرض أعمالنا المباشر!</span>
                </div>
              )}

              <form onSubmit={handleAddPhotoSubmit} className="flex flex-col gap-space-sm text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">عنوان أو اسم المشروع *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: تشطيب مدخل فيلا مودرن - الخبر"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary flex items-center justify-between">
                    <span>فئة المشروع *</span>
                    <span className="text-[10px] text-secondary font-mono">اختر أو اكتب فئة جديدة</span>
                  </label>
                  <select
                    value={customCategoryMode ? 'custom' : newPhoto.category}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setCustomCategoryMode(true);
                      } else {
                        setCustomCategoryMode(false);
                        setNewPhoto({ ...newPhoto, category: e.target.value });
                      }
                    }}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none cursor-pointer font-medium"
                  >
                    {Array.from(new Set(portfolio.map(p => p.category))).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="custom">✏️ + إضافة فئة جديدة يدويًا...</option>
                  </select>

                  {customCategoryMode && (
                    <input
                      type="text"
                      required
                      placeholder="اكتب اسم الفئة الجديدة يدويًا..."
                      value={newPhoto.category}
                      onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                      className="p-2.5 bg-surface-container-low border border-secondary text-xs focus:outline-none font-semibold mt-1"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-primary flex items-center justify-between">
                    <span>صورة المشروع *</span>
                    <span className="text-[10px] text-secondary font-mono">اختيار من الجهاز أو رابط</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="photo-file-input"
                      className="flex-1 px-4 py-3 bg-surface-container hover:bg-surface-container-high border border-dashed border-stone-border cursor-pointer flex items-center justify-center gap-2 text-xs font-bold text-primary transition-colors shadow-sm"
                    >
                      <Upload className="w-4 h-4 text-secondary animate-bounce" />
                      <span>اختيار صورة من جهازك (رفع ملف)</span>
                    </label>
                    <input
                      id="photo-file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          processImageFile(file, (dataUrl) => {
                            setNewPhoto(prev => ({ ...prev, image: dataUrl }));
                          });
                        }
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="أو ضع رابط صورة مباشر: https://..."
                    value={newPhoto.image.startsWith('data:') ? 'تم اختيار صورة من الجهاز ✓' : newPhoto.image}
                    onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono focus:outline-none"
                  />

                  {newPhoto.image && (
                    <div className="relative aspect-[16/9] w-full bg-black/90 border border-stone-border overflow-hidden mt-1 group">
                      <img src={newPhoto.image} alt="معاينة صورة المشروع" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setNewPhoto({ ...newPhoto, image: '' })}
                        className="absolute top-2 left-2 p-1.5 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition-colors"
                      >
                        إلغاء الصورة
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة الصورة ونشرها فوراً بمعرض أعمالنا</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
              <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2 flex items-center justify-between">
                <span>صور معرض أعمالنا المعتمدة ({portfolio.length})</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm max-h-[500px] overflow-y-auto pr-1">
                {portfolio.map((item) => (
                  <div key={item.id} className="relative aspect-[4/3] bg-surface-container border border-stone-border group overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-[10px]">
                      <span className="font-bold text-secondary">{item.category}</span>
                      <button
                        onClick={() => deletePortfolioPhoto(item.id)}
                        className="p-1 bg-red-600 text-white rounded self-end hover:bg-red-700 transition-colors"
                        title="حذف الصورة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: MANAGE ARTICLES */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <div className="lg:col-span-5 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
              <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2">
                إضافة مقال أو دليل هندسي جديد
              </h3>

              {articleSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-mono">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>تم نشر المقال الجديد بنجاح في قسم المقالات بالموقع!</span>
                </div>
              )}

              <form onSubmit={handleAddArticleSubmit} className="flex flex-col gap-space-sm text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">عنوان المقال *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: دليل معالجة التشققات قبل الدهانات..."
                    value={newArt.title}
                    onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-primary">فئة المقال</label>
                    <input
                      type="text"
                      value={newArt.category}
                      onChange={(e) => setNewArt({ ...newArt, category: e.target.value })}
                      className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-primary">زمن القراءة</label>
                    <input
                      type="text"
                      value={newArt.readTime}
                      onChange={(e) => setNewArt({ ...newArt, readTime: e.target.value })}
                      className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">ملخص المقال (يظهر في القائمة) *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="شرح موجز لأهمية المقال والنقاط الرئيسية..."
                    value={newArt.summary}
                    onChange={(e) => setNewArt({ ...newArt, summary: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">محتوى المقال التفصيلي *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="تفاصيل المقال والنصائح الهندسية الكاملة..."
                    value={newArt.content}
                    onChange={(e) => setNewArt({ ...newArt, content: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none resize-none font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-primary">صورة غلاف المقال *</label>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="art-file-input"
                      className="flex-1 px-4 py-2.5 bg-surface-container hover:bg-surface-container-high border border-dashed border-stone-border cursor-pointer flex items-center justify-center gap-2 text-xs font-bold text-primary transition-colors shadow-sm"
                    >
                      <Upload className="w-4 h-4 text-secondary" />
                      <span>اختيار صورة المقال من جهازك</span>
                    </label>
                    <input
                      id="art-file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          processImageFile(file, (dataUrl) => setNewArt(prev => ({ ...prev, image: dataUrl })));
                        }
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="أو ضع رابط صورة: https://..."
                    value={newArt.image.startsWith('data:') ? 'تم اختيار صورة من الجهاز ✓' : newArt.image}
                    onChange={(e) => setNewArt({ ...newArt, image: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono focus:outline-none"
                  />

                  {newArt.image && (
                    <div className="relative aspect-[16/9] w-full bg-black/90 border border-stone-border overflow-hidden mt-1 group">
                      <img src={newArt.image} alt="معاينة صورة المقال" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setNewArt({ ...newArt, image: '' })}
                        className="absolute top-2 left-2 p-1 bg-red-600 text-white rounded text-[10px] hover:bg-red-700 transition-colors"
                      >
                        إلغاء الصورة
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>نشر المقال فوراً بالموقع</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
              <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2 flex items-center justify-between">
                <span>مقالات المدونة الحالية ({articles.length})</span>
              </h3>

              <div className="flex flex-col gap-space-md max-h-[550px] overflow-y-auto pr-1">
                {articles.map((art) => (
                  <div key={art.id} className="p-3 bg-surface-container border border-stone-border flex items-start justify-between gap-3 text-xs">
                    <div className="flex items-start gap-3">
                      {art.image && (
                        <img src={art.image} alt={art.title} className="w-16 h-12 object-cover border border-stone-border shrink-0" />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[10px] text-secondary">{art.category} • {art.readTime}</span>
                        <span className="font-bold text-primary text-sm">{art.title}</span>
                        <span className="text-xs text-on-surface-variant line-clamp-1">{art.summary}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteArticle(art.id)}
                      className="p-2 text-red-600 hover:bg-red-50 border border-stone-border transition-colors shrink-0"
                      title="حذف المقال"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SOCIAL MEDIA, GOOGLE ADS & MONGODB INTEGRATION */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            
            {/* Contact & Social Links Form */}
            <div className="lg:col-span-6 bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
              <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2">
                روابط التواصل الاجتماعي والتراسل بالموقع
              </h3>

              {socialSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-mono">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>تم تحديث كافة بيانات التواصل، الإعلانات، وقاعدة البيانات بنجاح!</span>
                </div>
              )}

              <form onSubmit={handleSocialSubmit} className="flex flex-col gap-space-sm text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">رقم الواتساب الرسمي (صيغة دولية بدون +)</label>
                  <input
                    type="text"
                    value={socialForm.whatsapp || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, whatsapp: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono text-left focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">رقم الاتصال المباشر</label>
                  <input
                    type="text"
                    value={socialForm.phone || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, phone: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono text-left focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">رابط انستغرام (Instagram)</label>
                  <input
                    type="text"
                    value={socialForm.instagram || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono text-left focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-primary">عنوان المقر الميداني بالخبر</label>
                  <input
                    type="text"
                    value={socialForm.location || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, location: e.target.value })}
                    className="p-2.5 bg-surface-container-low border border-stone-border text-xs focus:outline-none"
                  />
                </div>

                {/* Google Ads Account Link & Verification */}
                <div className="p-3 bg-amber-50/70 border border-amber-300 flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                    <Globe className="w-4 h-4 text-secondary" />
                    <span>ربط الحساب الإعلاني على جوجل (Google Ads Tag & Site Verification)</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-primary">رابط / معرّف الربط مع Google Ads (Tag ID / AW-ID)</label>
                    <input
                      type="text"
                      placeholder="مثال: AW-1092837465 أو رابط السكريبت..."
                      value={socialForm.googleAdsLink || ''}
                      onChange={(e) => setSocialForm({ ...socialForm, googleAdsLink: e.target.value })}
                      className="p-2.5 bg-white border border-stone-border text-xs font-mono text-left focus:outline-none"
                      dir="ltr"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-primary">كود التحقق من ملكية الموقع (Google Search Console Verification)</label>
                    <input
                      type="text"
                      placeholder="مثال: google-site-verification=..."
                      value={socialForm.googleSiteVerification || ''}
                      onChange={(e) => setSocialForm({ ...socialForm, googleSiteVerification: e.target.value })}
                      className="p-2.5 bg-white border border-stone-border text-xs font-mono text-left focus:outline-none"
                      dir="ltr"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات وتفعيل إعلانات جوجل بالموقع</span>
                </button>
              </form>
            </div>

            {/* MongoDB Atlas Integration & Sitemap.xml Controls */}
            <div className="lg:col-span-6 flex flex-col gap-space-lg">
              
              {/* MongoDB Box */}
              <div className="bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
                <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-600" />
                    <span>ربط قاعدة البيانات (MongoDB Atlas Cluster0)</span>
                  </span>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 font-mono">Cluster0</span>
                </h3>

                <div className="flex flex-col gap-space-sm text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-primary">رابط الاتصال بقاعدة البيانات (MongoDB Connection String)</label>
                    <input
                      type="text"
                      value={socialForm.mongodbUri || ''}
                      onChange={(e) => setSocialForm({ ...socialForm, mongodbUri: e.target.value })}
                      className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono text-left focus:outline-none"
                      dir="ltr"
                    />
                    <span className="text-[10px] text-on-surface-variant font-mono">
                      ملاحظة: استبدل &lt;db_username&gt; باسم مستخدم الداتابيز لتكتمل التصلية المباشرة.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const res = testMongoConnection(socialForm.mongodbUri);
                      setDbTestResult(res);
                    }}
                    className="w-full py-2.5 bg-surface-container text-primary font-bold text-xs hover:bg-surface-container-high border border-stone-border transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span>فحص واختبار حالة الاتصال بالداتابيز</span>
                  </button>

                  {dbTestResult && (
                    <div className={`p-3 border text-xs flex items-center gap-2 font-mono ${
                      dbTestResult.success ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-amber-50 border-amber-300 text-amber-900'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{dbTestResult.message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sitemap.xml Box */}
              <div className="bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
                <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-secondary" />
                    <span>خريطة الموقع (Sitemap.xml) لمحركات البحث</span>
                  </span>
                </h3>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  خريطة الموقع جاهزة وتتضمن كافة أقسام الموقع (الرئيسية، من نحن، خدماتنا، أعمالنا، المقالات، اتصل بنا). يمكنك معاينتها أو تحميل الملف ونشره لـ Google Search Console.
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => downloadSitemapXml(generateDynamicSitemapXml())}
                    className="flex-1 py-3 bg-primary text-on-primary font-bold text-xs hover:bg-secondary transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل ملف sitemap.xml للجهاز</span>
                  </button>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-surface-container border border-stone-border text-xs font-semibold text-primary hover:bg-surface-container-high transition-colors text-center"
                  >
                    عرض الملف المباشر
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 7: ACCOUNT SECURITY */}
        {activeTab === 'security' && (
          <div className="max-w-md bg-surface-container-lowest border border-stone-border p-space-md md:p-space-lg flex flex-col gap-space-md shadow-sm">
            <h3 className="font-heading font-bold text-lg text-primary border-b border-stone-border pb-2">
              تغيير كلمة السر واسم المستخدم
            </h3>

            {credSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-mono">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>تم تغيير اسم المستخدم وكلمة السر بنجاح!</span>
              </div>
            )}

            {credError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{credError}</span>
              </div>
            )}

            <form onSubmit={handleSecuritySubmit} className="flex flex-col gap-space-sm text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-primary">اسم المستخدم الجديد</label>
                <input
                  type="text"
                  required
                  value={securityForm.username}
                  onChange={(e) => setSecurityForm({ ...securityForm, username: e.target.value })}
                  className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-primary">كلمة السر الجديدة</label>
                <input
                  type="password"
                  required
                  value={securityForm.password}
                  onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                  className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-primary">تأكيد كلمة السر الجديدة</label>
                <input
                  type="password"
                  required
                  value={securityForm.confirmPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                  className="p-2.5 bg-surface-container-low border border-stone-border text-xs font-mono focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-on-primary font-bold text-xs hover:bg-secondary transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <Save className="w-4 h-4 text-secondary" />
                <span>تحديث بيانات الدخول</span>
              </button>
            </form>
          </div>
        )}

      </main>

    </div>
  );
}
