
import React, { useState, useEffect, useRef } from 'react';
import { 
  Truck, MapPin, ShieldCheck, Phone, Mail, Globe, Heart, Users, CheckCircle2, Building2, 
  Menu, X, Package, ArrowRight, MessageSquare, Send, Loader2, Activity, Target, Eye, 
  Star, ChevronRight, Stethoscope, FlaskConical, Thermometer, ShieldPlus, Key, 
  MessageCircle, TrendingUp, Box, Award, Zap, Shield, BriefcaseMedical, Wallet, 
  Headphones, Facebook, Linkedin, Twitter, Instagram, Timer, BarChart3, Layers, 
  Search, Filter, Info, ExternalLink, Pill, Droplets, Syringe, Microscope, 
  ShoppingCart, Plus, Minus, Trash2, Check, LogIn, UserPlus, Lock, User, 
  EyeOff, ArrowLeft, History, Rocket, Compass, Calendar, Share2, Clock, 
  ArrowUpRight, Database, Network, ChevronDown, Tag, LayoutDashboard, Settings, 
  LogOut, Pencil, PlusCircle, FileText, Home, Save, Camera, Bell, Languages, 
  Monitor, EyeIcon, EyeOffIcon, Briefcase, ToggleLeft, ToggleRight, UploadCloud, 
  ImageIcon, Link as LinkIcon, ThumbsUp, Share, MoreHorizontal, AlertCircle,
  UserCheck, ShieldAlert, UserCog, ShieldX, Youtube, Globe2, Smartphone, Laptop,
  Inbox, Reply, Archive, Star as StarIcon, Trash, FileEdit, Layout, BellRing, 
  Info as InfoIcon, Music2, Send as TelegramIcon
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types & Interfaces ---
type Page = 'home' | 'products' | 'news' | 'about' | 'contact' | 'jobs' | 'auth' | 'admin';

interface SocialLink {
  id: string;
  url: string;
}

interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  mainCategory: 'pharma' | 'equipment';
  price: string;
  descAr: string;
  descEn: string;
  image?: string;
  stock: number;
}

interface NewsArticle {
  id: number;
  titleAr: string;
  titleEn: string;
  date: string;
  category: string;
  image: string;
  descAr: string;
  descEn: string;
  externalLink?: string; 
  socialLinks?: SocialLink[];
}

interface ContactMessage {
  id: number;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  time: string;
}

interface PageVisibility {
  home: boolean;
  products: boolean;
  news: boolean;
  jobs: boolean;
  about: boolean;
  contact: boolean;
}

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  role: 'Super Admin' | 'Editor' | 'Manager' | 'Regular User';
  status: 'Active' | 'Inactive';
  blockedPages: Page[];
}

// --- Initial Data ---
const initialProducts: Product[] = [
  { id: 1, nameAr: 'أموكسيسيلين 500 ملجم', nameEn: 'Amoxicillin 500mg', mainCategory: 'pharma', price: '4,500 SDG', descAr: 'مضاد حيوي واسع المدى.', descEn: 'Broad-spectrum antibiotic.', stock: 500, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
  { id: 2, nameAr: 'جهاز ضغط أومرون', nameEn: 'Omron BP Monitor', mainCategory: 'equipment', price: '25,000 SDG', descAr: 'دقة عالية في القياس.', descEn: 'High precision measurement.', stock: 45, image: 'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?auto=format&fit=crop&q=80&w=400' },
];

const initialNews: NewsArticle[] = [
  { 
    id: 1, 
    titleAr: 'تحديث أسطول النقل المبرد', 
    titleEn: 'Cold Chain Fleet Update', 
    date: '2024-05-20', 
    category: 'Logistics', 
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600', 
    descAr: 'إضافة شاحنات جديدة بتقنيات تبريد متطورة.', 
    descEn: 'New trucks with advanced cooling tech added.', 
    externalLink: 'https://argi.com/fleet-update',
    socialLinks: [
      { id: '1', url: 'https://facebook.com/argi/posts/1' }
    ]
  },
];

const initialMessages: ContactMessage[] = [
  { 
    id: 1, 
    senderName: 'Ahmed Mustafa', 
    senderEmail: 'ahmed.m@hospital.sd', 
    subject: 'طلب توريد أدوية طوارئ', 
    message: 'نود الاستفسار عن توفر أدوية الطوارئ والكميات المتاحة لدينا في مستشفى الخرطوم التعليمي. يرجى تزويدنا بقائمة الأسعار المحدثة.', 
    date: '2024-05-24 10:30 AM', 
    isRead: false, 
    isStarred: true 
  },
  { 
    id: 2, 
    senderName: 'Sara Khalid', 
    senderEmail: 'sara.k@pharmacy.sd', 
    subject: 'استفسار عن وكالة توزيع', 
    message: 'مرحباً، أملك صيدلية في مدينة بورتسودان وأرغب في الانضمام لشبكة الموزعين المعتمدين لشركة أرجي. ما هي المتطلبات اللازمة؟', 
    date: '2024-05-23 03:15 PM', 
    isRead: true, 
    isStarred: false 
  },
];

const initialUsers: AdminProfile[] = [
  { id: 1, name: 'Mohamed Ahmed', email: 'mohamed@argi.com', password: 'password123', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', role: 'Super Admin', status: 'Active', blockedPages: [] },
  { id: 2, name: 'Sara Omer', email: 'sara@argi.com', password: 'editorpassword', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Editor', status: 'Active', blockedPages: ['jobs'] },
  { id: 3, name: 'Ahmed Ali', email: 'ahmed.ali@argi.com', password: 'userpassword', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200', role: 'Regular User', status: 'Active', blockedPages: ['admin', 'inventory', 'pages'] as any },
];

const translations = {
  ar: {
    dashboard: "لوحة القيادة الإدارية",
    contentManager: "إدارة محتوى الصفحة",
    newsManager: "الأخبار والفعاليات",
    inboxManager: "صندوق الوارد",
    pageManager: "إدارة الصفحات",
    settings: "إدارة المستخدمين",
    totalProducts: "إجمالي المنتجات",
    activePages: "الصفحات النشطة",
    pendingNews: "أخبار منشورة",
    add: "إضافة جديد",
    save: "حفظ التغييرات",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    search: "بحث في النظام...",
    language: "اللغة",
    status: "الحالة",
    role: "الدور الوظيفي",
    email: "البريد الإلكتروني",
    actions: "الإجراءات",
    userName: "اسم المستخدم",
    userRole: "صلاحية المستخدم",
    active: "نشط",
    inactive: "غير نشط",
    adminEntrance: "مدخل المسؤولين",
    authorize: "تخويل الدخول",
    returnHome: "العودة للرئيسية",
    roleRegular: "مستخدم عادي",
    roleEditor: "محرر",
    roleManager: "مدير",
    roleSuper: "مدير عام",
    password: "كلمة المرور",
    blockedPages: "الصفحات المحظورة",
    permissions: "أذونات الوصول",
    noAccess: "ليس لديك صلاحية للوصول لهذه الصفحة",
    loginError: "بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى",
    accountDisabled: "هذا الحساب معطل حالياً، يرجى التواصل مع المدير العام",
    readMore: "رابط قراءة المزيد",
    socialLink: "روابط التواصل للخبر",
    addSocial: "إضافة منصة جديدة",
    urlPlaceholder: "أدخل الرابط كاملاً هنا...",
    livePreview: "معاينة الموقع",
    previewDesc: "مشاهدة النسخة الحالية للموقع",
    sender: "المرسل",
    subject: "الموضوع",
    messageContent: "محتوى الرسالة",
    date: "التاريخ",
    reply: "رد",
    markRead: "تحديد كمقروء",
    noMessages: "لا توجد رسائل جديدة حالياً",
    editHome: "تعديل الصفحة الرئيسية",
    editAbout: "تعديل صفحة من نحن",
    newNotification: "إشعار جديد",
    unreadAlert: "لديك رسائل غير مقروءة في الصندوق",
    inboxClean: "صندوق الوارد نظيف تماماً"
  },
  en: {
    dashboard: "Admin Command Center",
    contentManager: "Page Content Manager",
    newsManager: "News & Events",
    inboxManager: "Messages Inbox",
    pageManager: "Page Control",
    settings: "User Management",
    totalProducts: "Total Products",
    activePages: "Active Pages",
    pendingNews: "Published News",
    add: "Add New",
    save: "Save Changes",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    search: "Search system...",
    language: "Language",
    status: "Status",
    role: "User Role",
    email: "Email Address",
    actions: "Actions",
    userName: "Full Name",
    userRole: "Access Role",
    active: "Active",
    inactive: "Inactive",
    adminEntrance: "Admin Entrance",
    authorize: "Authorize Access",
    returnHome: "Cancel & Return Home",
    roleRegular: "Regular User",
    roleEditor: "Editor",
    roleManager: "Manager",
    roleSuper: "Super Admin",
    password: "Access Password",
    blockedPages: "Restricted Pages",
    permissions: "Access Permissions",
    noAccess: "You do not have permission to access this page",
    loginError: "Invalid login credentials, please try again",
    accountDisabled: "This account is currently disabled, please contact support",
    readMore: "Read More Link",
    socialLink: "News Social Links",
    addSocial: "Add New Platform",
    urlPlaceholder: "Enter full URL here...",
    livePreview: "Live Preview",
    previewDesc: "View public version of site",
    sender: "Sender",
    subject: "Subject",
    messageContent: "Message Content",
    date: "Date",
    reply: "Reply",
    markRead: "Mark Read",
    noMessages: "No new messages in inbox",
    editHome: "Edit Home Page",
    editAbout: "Edit About Us",
    newNotification: "New Notification",
    unreadAlert: "You have unread messages in inbox",
    inboxClean: "Inbox is perfectly clean"
  }
};

// --- Helper: File to Base64 ---
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// --- Helper: Get Social Icon based on URL ---
const getSocialIcon = (url: string) => {
  const lowUrl = url.toLowerCase();
  if (lowUrl.includes('facebook.com') || lowUrl.includes('fb.com')) return <Facebook size={18} className="text-blue-600" />;
  if (lowUrl.includes('twitter.com') || lowUrl.includes('x.com')) return <Twitter size={18} className="text-sky-400" />;
  if (lowUrl.includes('instagram.com')) return <Instagram size={18} className="text-pink-500" />;
  if (lowUrl.includes('linkedin.com')) return <Linkedin size={18} className="text-blue-700" />;
  if (lowUrl.includes('youtube.com')) return <Youtube size={18} className="text-red-600" />;
  if (lowUrl.includes('t.me') || lowUrl.includes('telegram')) return <TelegramIcon size={18} className="text-sky-500" />;
  if (lowUrl.includes('tiktok.com')) return <Music2 size={18} className="text-pink-600" />;
  return <LinkIcon size={18} className="text-slate-500" />;
};

// --- Component: Admin Layout ---
const AdminLayout: React.FC<{ 
  children: React.ReactNode, 
  lang: 'ar' | 'en', 
  activeTab: string, 
  setActiveTab: (tab: any) => void,
  onLogout: () => void,
  adminProfile: AdminProfile,
  toggleLang: () => void,
  onOpenPreview: () => void,
  unreadCount: number,
  searchQuery: string,
  setSearchQuery: (q: string) => void
}> = ({ children, lang, activeTab, setActiveTab, onLogout, adminProfile, toggleLang, onOpenPreview, unreadCount, searchQuery, setSearchQuery }) => {
  const isAr = lang === 'ar';
  const t = translations[lang];

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: t.dashboard, pageRef: 'home' },
    { id: 'content', icon: Layout, label: t.contentManager, pageRef: 'products' },
    { id: 'news', icon: FileText, label: t.newsManager, pageRef: 'news' },
    { id: 'inbox', icon: Inbox, label: t.inboxManager, pageRef: 'contact', badge: unreadCount },
    { id: 'pages', icon: Layers, label: t.pageManager, pageRef: 'pages' },
    { id: 'settings', icon: UserCog, label: t.settings, pageRef: 'settings' },
  ];

  const visibleTabs = tabs.filter(tab => !adminProfile.blockedPages.includes(tab.pageRef as any));

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-300 font-sans selection:bg-[#00a896]/30 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={`w-80 bg-[#1e293b] border-slate-800 flex flex-col z-50 ${isAr ? 'border-l' : 'border-r'}`}>
        <div className="p-8 flex items-center gap-4 border-b border-slate-800/50 mb-6">
          <div className="w-12 h-12 bg-[#00a896] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#00a896]/20">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter">ARGI ADMIN</h1>
            <p className="text-[10px] font-bold text-[#00a896] uppercase tracking-[0.2em]">Management Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {visibleTabs.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSearchQuery(''); }}
              className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 relative ${activeTab === item.id ? 'bg-[#00a896] text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              <item.icon size={20} />
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className={`absolute ${isAr ? 'left-4' : 'right-4'} px-2 py-0.5 bg-red-500 text-white text-[10px] font-black rounded-full`}>
                   {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-800">
          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-3xl mb-4">
            <img src={adminProfile.avatar} className="w-10 h-10 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white truncate">{adminProfile.name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase truncate">{adminProfile.role}</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3">
            <LogOut size={18} />
            <span className="font-bold text-xs uppercase tracking-widest">{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col bg-[#0f172a] overflow-hidden">
        {/* Top Header */}
        <header className="h-24 border-b border-slate-800 flex items-center justify-between px-12 bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-6 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} size={18} />
              <input 
                type="text" 
                placeholder={t.search} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3 ${isAr ? 'pr-12 pl-6' : 'pl-12 pr-6'} outline-none focus:border-[#00a896] text-sm transition-all`}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenPreview}
              className="flex items-center gap-3 px-6 py-3 bg-[#00a896]/10 text-[#00a896] rounded-2xl hover:bg-[#00a896] hover:text-white transition-all group font-black uppercase text-[10px] tracking-widest"
            >
              <Eye size={16} className="group-hover:scale-110 transition-transform" />
              {t.livePreview}
            </button>
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 p-1.5 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <div className="p-2 bg-[#00a896] rounded-lg text-white"><Globe size={18} /></div>
              <span className="px-3 text-xs font-black uppercase text-white">{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            <button className="p-3 bg-slate-800 rounded-xl relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0f172a] text-[8px] flex items-center justify-center font-black text-white">{unreadCount}</span>
              )}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-12 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- Page: Dashboard Overview ---
const DashboardOverview: React.FC<{ productsCount: number, newsCount: number, messagesCount: number, lang: 'ar' | 'en' }> = ({ productsCount, newsCount, messagesCount, lang }) => {
  const t = translations[lang];
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: t.totalProducts, val: productsCount, icon: Box, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: t.pendingNews, val: newsCount, icon: FileText, color: 'text-[#00a896]', bg: 'bg-[#00a896]/10' },
          { label: t.inboxManager, val: messagesCount, icon: Inbox, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        ].map((s, i) => (
          <div key={i} className="bg-[#1e293b] p-10 rounded-[3rem] border border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-4xl font-black text-white mb-2">{s.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.label}</p>
            </div>
            <div className={`w-16 h-16 ${s.bg} ${s.color} rounded-[1.5rem] flex items-center justify-center`}>
              <s.icon size={32} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-[#1e293b] p-12 rounded-[4rem] border border-slate-800">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-white">Recent Logs</h3>
            <button className="p-3 bg-slate-800 rounded-2xl"><MoreHorizontal size={20} /></button>
          </div>
          <div className="space-y-8">
            {[
              { type: 'Message', msg: 'New inquiry from Khartoum Hospital', time: '2m ago', icon: MessageSquare, color: 'text-purple-400' },
              { type: 'Update', msg: 'News article updated', time: '1h ago', icon: Pencil, color: 'text-yellow-400' },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-6 p-4 hover:bg-slate-800/30 rounded-3xl transition-all">
                <div className={`w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center ${log.color}`}><log.icon size={20} /></div>
                <div className="flex-1">
                  <p className="text-sm font-black text-white">{log.msg}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{log.type} • {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [adminTab, setAdminTab] = useState<'overview' | 'content' | 'news' | 'inbox' | 'pages' | 'settings'>('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // States for CMS
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [news, setNews] = useState<NewsArticle[]>(initialNews);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [users, setUsers] = useState<AdminProfile[]>(initialUsers);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visibility, setVisibility] = useState<PageVisibility>({
    home: true, products: true, news: true, jobs: true, about: true, contact: true
  });
  const [activeAdmin, setActiveAdmin] = useState<AdminProfile>(initialUsers[0]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  const t = translations[lang];
  const isAr = lang === 'ar';

  const unreadCount = messages.filter(m => !m.isRead).length;

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const newNotif: Notification = {
      id: Date.now(),
      title,
      message,
      type,
      time: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
    }, 5000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
    setSearchQuery('');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const fd = new FormData(e.target as HTMLFormElement);
    const email = fd.get('email');
    const password = fd.get('password');

    const foundUser = users.find(u => u.email === email && (u.password === password || (!u.password && password === '123456')));
    
    if (foundUser) {
      if (foundUser.status === 'Inactive') {
        setLoginError(t.accountDisabled);
        return;
      }
      setActiveAdmin(foundUser);
      setIsLoggedIn(true);
      setCurrentPage('admin');
      addNotification('Welcome Back', `Logged in as ${foundUser.name}`, 'success');
    } else {
      setLoginError(t.loginError);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setEditingItem((prev: any) => ({ ...prev, image: base64 || prev.image || prev.avatar }));
    }
  };

  const handleSocialLinkChange = (id: string, url: string) => {
    setEditingItem((prev: any) => ({
      ...prev,
      socialLinks: prev.socialLinks?.map((l: any) => l.id === id ? { ...l, url } : l) || []
    }));
  };

  const addSocialLinkField = () => {
    setEditingItem((prev: any) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), { id: Date.now().toString(), url: '' }]
    }));
  };

  const removeSocialLinkField = (id: string) => {
    setEditingItem((prev: any) => ({
      ...prev,
      socialLinks: prev.socialLinks?.filter((l: any) => l.id !== id) || []
    }));
  };

  const saveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const data: any = {};
    fd.forEach((v, k) => {
      if (k === 'blockedPages') {
        if (!data[k]) data[k] = [];
        data[k].push(v);
      } else {
        data[k] = v;
      }
    });

    if (adminTab === 'settings') {
      const checkboxes = (e.target as HTMLFormElement).querySelectorAll('input[type="checkbox"][name="blockedPages"]:checked');
      data.blockedPages = Array.from(checkboxes).map((cb: any) => cb.value);
    }

    if (adminTab === 'news') {
      data.socialLinks = editingItem?.socialLinks || [];
    }
    
    if (adminTab === 'content') {
       addNotification('Updated', 'Page content saved successfully', 'success');
    } else if (adminTab === 'news') {
      const newN = { ...editingItem, ...data, id: editingItem?.id || Date.now(), date: new Date().toISOString().split('T')[0] };
      setNews(prev => editingItem ? prev.map(n => n.id === editingItem.id ? newN : n) : [...prev, newN]);
      addNotification('News Saved', 'Article published to the site', 'success');
    } else if (adminTab === 'settings') {
      const newU = { 
        ...editingItem, 
        ...data, 
        id: editingItem?.id || Date.now(), 
        avatar: editingItem?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
      };
      setUsers(prev => editingItem ? prev.map(u => u.id === editingItem.id ? newU : u) : [...prev, newU]);
      addNotification('User Updated', 'Administrative profile changed', 'info');
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const toggleMessageRead = (id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: !m.isRead } : m));
  };

  const toggleMessageStar = (id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isStarred: !m.isStarred } : m));
  };

  const deleteMessage = (id: number) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (viewingMessage?.id === id) setViewingMessage(null);
    addNotification('Deleted', 'Message removed from inbox', 'warning');
  };

  const renderAdminContent = () => {
    const q = searchQuery.toLowerCase();

    switch (adminTab) {
      case 'overview': return <DashboardOverview productsCount={products.length} newsCount={news.length} messagesCount={messages.length} lang={lang} />;
      case 'pages': return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(Object.entries(visibility)).map(([key, val]) => (
            <div key={key} className="bg-[#1e293b] p-10 rounded-[3rem] border border-slate-800 flex items-center justify-between group hover:border-[#00a896] transition-all">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${val ? 'bg-[#00a896]/10 text-[#00a896]' : 'bg-slate-800 text-slate-500'}`}>
                  {key === 'jobs' ? <Briefcase size={24} /> : <Layers size={24} />}
                </div>
                <div>
                  <h4 className="text-lg font-black text-white capitalize">{key} Page</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{val ? (isAr ? 'مرئي للعامة' : 'Visible to Public') : (isAr ? 'مخفي' : 'Hidden')}</p>
                </div>
              </div>
              <button onClick={() => setVisibility({...visibility, [key as any]: !val})} className={`w-16 h-9 rounded-full px-1 transition-all flex items-center ${val ? 'bg-[#00a896]' : 'bg-slate-700'}`}>
                <div className={`w-7 h-7 bg-white rounded-full shadow-lg transform transition-transform ${val ? (isAr ? 'translate-x-0' : 'translate-x-7') : (isAr ? '-translate-x-7' : 'translate-x-0')}`}></div>
              </button>
            </div>
          ))}
        </div>
      );
      case 'content': return (
        <div className="space-y-12 animate-in fade-in">
           <div className="bg-[#1e293b] p-10 rounded-[3rem] border border-slate-800 flex items-center gap-6 shadow-sm">
              <div className="w-16 h-16 bg-[#00a896]/10 text-[#00a896] rounded-2xl flex items-center justify-center"><Layout size={32} /></div>
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight">{t.contentManager}</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Select page to customize visuals and text</p>
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-10">
              <button 
                onClick={() => { setEditingItem({ type: 'home' }); setIsModalOpen(true); }}
                className="group relative bg-[#1e293b] p-12 rounded-[4rem] border border-slate-800 overflow-hidden transition-all hover:border-[#00a896] text-right rtl:text-right ltr:text-left"
              >
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Home size={120} />
                 </div>
                 <div className="relative z-10 space-y-4">
                    <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6"><Home size={28} /></div>
                    <h4 className="text-2xl font-black text-white">{t.editHome}</h4>
                    <p className="text-sm text-slate-500 font-medium max-w-xs">تعديل النصوص والصور والروابط في الصفحة الرئيسية لشركة أرجي الطبية.</p>
                    <div className="pt-4 flex items-center gap-2 text-[#00a896] font-black uppercase text-[10px] tracking-widest">
                       {t.edit} <ChevronRight size={14} />
                    </div>
                 </div>
              </button>

              <button 
                onClick={() => { setEditingItem({ type: 'about' }); setIsModalOpen(true); }}
                className="group relative bg-[#1e293b] p-12 rounded-[4rem] border border-slate-800 overflow-hidden transition-all hover:border-[#00a896] text-right rtl:text-right ltr:text-left"
              >
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Info size={120} />
                 </div>
                 <div className="relative z-10 space-y-4">
                    <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6"><Info size={28} /></div>
                    <h4 className="text-2xl font-black text-white">{t.editAbout}</h4>
                    <p className="text-sm text-slate-500 font-medium max-w-xs">تخصيص محتوى صفحة "من نحن" بما يشمل رؤية ورسالة وأهداف الشركة.</p>
                    <div className="pt-4 flex items-center gap-2 text-[#00a896] font-black uppercase text-[10px] tracking-widest">
                       {t.edit} <ChevronRight size={14} />
                    </div>
                 </div>
              </button>
           </div>
        </div>
      );
      case 'inbox': 
        const filteredMessages = messages.filter(m => 
           m.senderName.toLowerCase().includes(q) || 
           m.senderEmail.toLowerCase().includes(q) || 
           m.subject.toLowerCase().includes(q) ||
           m.message.toLowerCase().includes(q)
        );
        return (
          <div className="space-y-8 animate-in fade-in">
           {unreadCount > 0 ? (
             <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-[2rem] flex items-center justify-between group animate-pulse">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                      <BellRing size={20} />
                   </div>
                   <div>
                      <h4 className="font-black text-white text-sm">{t.newNotification}</h4>
                      <p className="text-xs text-purple-300 font-bold uppercase tracking-widest">{t.unreadAlert} ({unreadCount})</p>
                   </div>
                </div>
                <button onClick={() => addNotification('Info', 'Focus on unread messages first.', 'info')} className="p-3 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500 hover:text-white transition-all">
                   <InfoIcon size={18} />
                </button>
             </div>
           ) : (
             <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-[2rem] flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center">
                   <CheckCircle2 size={20} />
                </div>
                <div>
                   <h4 className="font-black text-white text-sm">{isAr ? 'الصندوق مكتمل' : 'Inbox Complete'}</h4>
                   <p className="text-xs text-green-300 font-bold uppercase tracking-widest">{t.inboxClean}</p>
                </div>
             </div>
           )}

           <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center"><Inbox size={20} /></div>
                <h3 className="text-2xl font-black text-white tracking-tight">{t.inboxManager}</h3>
              </div>
              <div className="flex gap-4">
                 <span className="px-6 py-3 bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                   {unreadCount} Unread
                 </span>
              </div>
           </div>

           <div className="grid lg:grid-cols-12 gap-8 h-[600px]">
              <div className="lg:col-span-5 bg-[#1e293b] rounded-[3rem] border border-slate-800 overflow-hidden flex flex-col">
                 <div className="p-6 border-b border-slate-800 bg-[#1e293b]/50">
                    <div className="relative">
                       <Search className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} size={16} />
                       <input 
                         type="text" 
                         placeholder="Filter messages..." 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className={`w-full bg-slate-900 border border-slate-800 rounded-xl py-3 ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-xs outline-none focus:border-purple-500 transition-all`} 
                       />
                    </div>
                 </div>
                 <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50 scrollbar-hide">
                    {filteredMessages.length > 0 ? filteredMessages.map(msg => (
                       <button 
                        key={msg.id} 
                        onClick={() => { setViewingMessage(msg); if(!msg.isRead) toggleMessageRead(msg.id); }}
                        className={`w-full p-6 flex flex-col gap-2 transition-all hover:bg-slate-800/40 text-right rtl:text-right ltr:text-left relative ${viewingMessage?.id === msg.id ? 'bg-purple-500/5 border-l-4 border-purple-500' : ''}`}
                       >
                          {!msg.isRead && <span className="absolute top-6 left-6 w-2.5 h-2.5 bg-purple-500 rounded-full border-2 border-[#1e293b] shadow-xl animate-pulse"></span>}
                          <div className="flex justify-between items-start">
                             <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">{msg.date}</span>
                             <button onClick={(e) => { e.stopPropagation(); toggleMessageStar(msg.id); }} className={`${msg.isStarred ? 'text-yellow-500' : 'text-slate-700'} hover:scale-110 transition-all`}>
                                <StarIcon size={14} fill={msg.isStarred ? 'currentColor' : 'none'} />
                             </button>
                          </div>
                          <h4 className={`text-sm ${msg.isRead ? 'font-bold text-slate-400' : 'font-black text-white'}`}>{msg.senderName}</h4>
                          <p className="text-xs font-bold text-purple-400 truncate w-full">{msg.subject}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{msg.message}</p>
                       </button>
                    )) : (
                       <div className="h-full flex flex-col items-center justify-center p-12 text-slate-600 opacity-30">
                          <Inbox size={48} className="mb-4" />
                          <p className="font-black uppercase text-xs tracking-widest">{t.noMessages}</p>
                       </div>
                    )}
                 </div>
              </div>

              <div className="lg:col-span-7 bg-[#1e293b] rounded-[3rem] border border-slate-800 overflow-hidden flex flex-col">
                 {viewingMessage ? (
                    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                       <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-[#1e293b]/50">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                                {viewingMessage.senderName.charAt(0)}
                             </div>
                             <div>
                                <h3 className="text-lg font-black text-white leading-none">{viewingMessage.senderName}</h3>
                                <p className="text-xs text-slate-500 font-bold">{viewingMessage.senderEmail}</p>
                             </div>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:text-white transition-all"><Reply size={18} /></button>
                             <button className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:text-white transition-all"><Archive size={18} /></button>
                             <button onClick={() => deleteMessage(viewingMessage.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash size={18} /></button>
                          </div>
                       </div>
                       <div className="flex-1 p-10 overflow-y-auto space-y-8">
                          <div className="space-y-2">
                             <p className="text-[10px] font-black uppercase text-purple-500 tracking-[0.2em]">{t.subject}</p>
                             <h2 className="text-2xl font-black text-white leading-tight">{viewingMessage.subject}</h2>
                          </div>
                          <div className="space-y-4">
                             <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{t.messageContent}</p>
                             <div className="text-slate-300 leading-relaxed font-medium bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800">
                                {viewingMessage.message}
                             </div>
                          </div>
                       </div>
                       <div className="p-8 border-t border-slate-800 bg-[#1e293b]/30">
                          <div className="flex items-center gap-4">
                             <input type="text" placeholder="Write a quick reply..." className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm outline-none focus:border-purple-500 transition-all" />
                             <button className="p-5 bg-purple-500 text-white rounded-2xl shadow-xl shadow-purple-500/20"><Send size={20} /></button>
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="h-full flex flex-col items-center justify-center p-20 text-slate-600 opacity-20">
                       <MessageCircle size={80} className="mb-6" />
                       <p className="font-black uppercase text-sm tracking-[0.3em]">Select a message to read</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      );
      case 'news':
      case 'settings':
        const rawData = adminTab === 'news' ? news : users;
        const currentData = rawData.filter((item: any) => {
           const name = (item.titleAr || item.titleEn || item.name || '').toLowerCase();
           const email = (item.email || '').toLowerCase();
           return name.includes(q) || email.includes(q);
        });
        return (
          <div className="space-y-10 animate-in fade-in">
            <div className="flex justify-between items-center bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-[#00a896]/10 text-[#00a896] rounded-xl flex items-center justify-center"><Tag size={20} /></div>
                <h3 className="text-2xl font-black text-white tracking-tight">{t[(adminTab + 'Manager') as keyof typeof t] || t.settings}</h3>
              </div>
              <button onClick={() => { setEditingItem({ socialLinks: [] }); setIsModalOpen(true); }} className="px-10 py-5 bg-[#00a896] text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest flex items-center gap-3 shadow-xl shadow-[#00a896]/20">
                <Plus size={20} /> {t.add}
              </button>
            </div>
            
            <div className="bg-[#1e293b] rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl">
              <table className="w-full text-right rtl:text-right ltr:text-left">
                <thead className="bg-[#1e293b] border-b border-slate-800">
                  <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <th className="p-8">{adminTab === 'settings' ? t.userName : (isAr ? 'المعاينة' : 'Preview')}</th>
                    <th className="p-8">{adminTab === 'settings' ? t.email : (isAr ? 'التفاصيل' : 'Details')}</th>
                    <th className="p-8">{adminTab === 'settings' ? t.role : t.status}</th>
                    <th className="p-8">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {currentData.map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                            <img src={item.image || item.avatar} className="w-full h-full object-cover" />
                          </div>
                          {adminTab === 'settings' && <span className="font-black text-white">{item.name}</span>}
                        </div>
                      </td>
                      <td className="p-8">
                        {adminTab === 'settings' ? (
                          <span className="text-slate-400 font-medium">{item.email}</span>
                        ) : (
                          <>
                            <p className="font-black text-white text-lg">{isAr ? (item.nameAr || item.titleAr) : (item.nameEn || item.titleEn)}</p>
                            <div className="flex items-center gap-2 mt-1">
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.date || 'Asset Entry'}</p>
                               {item.externalLink && <ExternalLink size={10} className="text-[#00a896]" />}
                               {item.socialLinks?.length > 0 && <Share2 size={10} className="text-purple-400" />}
                            </div>
                          </>
                        )}
                      </td>
                      <td className="p-8">
                        {adminTab === 'settings' ? (
                          <span className="px-5 py-2 bg-slate-800 text-slate-300 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {item.role === 'Super Admin' ? t.roleSuper : item.role === 'Manager' ? t.roleManager : item.role === 'Editor' ? t.roleEditor : t.roleRegular}
                          </span>
                        ) : (
                          <span className="px-5 py-2 bg-[#00a896]/10 text-[#00a896] rounded-full text-[10px] font-black uppercase tracking-widest">{isAr ? 'نشط' : 'Active'}</span>
                        )}
                      </td>
                      <td className="p-8">
                        <div className="flex gap-3">
                          <button onClick={() => { setEditingItem({ ...item, socialLinks: item.socialLinks || [] }); setIsModalOpen(true); }} className="p-4 bg-slate-800 rounded-2xl text-white hover:bg-[#00a896] transition-all"><Pencil size={18} /></button>
                          <button className="p-4 bg-slate-800 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen bg-[#fafafa] text-slate-900 ${isAr ? 'arabic-font' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      {isLoggedIn && currentPage === 'admin' ? (
        <AdminLayout 
          lang={lang} 
          activeTab={adminTab} 
          setActiveTab={setAdminTab} 
          onLogout={handleLogout} 
          adminProfile={activeAdmin}
          toggleLang={toggleLanguage}
          onOpenPreview={() => setIsPreviewVisible(true)}
          unreadCount={unreadCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        >
          {/* Notifications Overlays (Toasts) */}
          <div className="fixed top-8 right-8 z-[3000] flex flex-col gap-4 max-w-sm w-full">
             {notifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={`p-6 rounded-3xl shadow-2xl border flex items-start gap-4 animate-in slide-in-from-right duration-500 ${
                    notif.type === 'success' ? 'bg-green-500/90 border-green-400 text-white' :
                    notif.type === 'warning' ? 'bg-red-500/90 border-red-400 text-white' :
                    'bg-slate-900/90 border-slate-700 text-white'
                  }`}
                >
                   <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                      {notif.type === 'success' ? <CheckCircle2 size={18} /> : 
                       notif.type === 'warning' ? <Trash2 size={18} /> : 
                       <InfoIcon size={18} />}
                   </div>
                   <div className="flex-1">
                      <h5 className="font-black text-sm mb-1">{notif.title}</h5>
                      <p className="text-xs font-medium opacity-90">{notif.message}</p>
                   </div>
                   <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))} className="text-white/50 hover:text-white transition-colors">
                      <X size={16} />
                   </button>
                </div>
             ))}
          </div>

          {renderAdminContent()}

          {/* Live Preview Modal */}
          {isPreviewVisible && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 bg-[#0f172a]/90 backdrop-blur-xl animate-in zoom-in duration-300">
              <div className="relative w-full h-full max-w-7xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
                <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                       <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                       <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="h-10 px-6 bg-slate-200/50 rounded-xl flex items-center gap-3 text-slate-500 min-w-[300px]">
                       <Globe size={14} />
                       <span className="text-xs font-bold tracking-tight truncate">https://argi-medical.sd/preview</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button className="p-2.5 bg-slate-200 rounded-xl text-slate-600 hover:bg-[#00a896] hover:text-white transition-all"><Smartphone size={18} /></button>
                     <button className="p-2.5 bg-[#00a896] rounded-xl text-white transition-all"><Laptop size={18} /></button>
                     <div className="w-px h-8 bg-slate-300 mx-2"></div>
                     <button onClick={() => setIsPreviewVisible(false)} className="p-2.5 bg-red-500 text-white rounded-xl shadow-lg hover:rotate-90 transition-all"><X size={20} /></button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto bg-[#fafafa] scroll-smooth">
                   <div className="p-12 md:p-24 space-y-24">
                      {/* Landing Preview Content */}
                      <div className="max-w-4xl mx-auto text-center space-y-12">
                         <div className="w-24 h-24 bg-[#00a896] rounded-[2rem] mx-auto flex items-center justify-center text-white shadow-2xl"><Activity size={40} /></div>
                         <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Argi Medical Preview</h1>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* CMS Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#0f172a]/80 backdrop-blur-md animate-in fade-in">
              <div className="bg-[#1e293b] w-full max-w-4xl rounded-[4rem] border border-slate-700 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-10 border-b border-slate-800 flex justify-between items-center">
                  <h3 className="text-3xl font-black text-white">
                     {adminTab === 'content' ? (editingItem.type === 'home' ? t.editHome : t.editAbout) : (editingItem?.id ? t.edit : t.add)}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-800 text-slate-400 rounded-2xl"><X size={24} /></button>
                </div>
                <form onSubmit={saveEntry} className="p-12 space-y-8 overflow-y-auto">
                   {/* CMS Fields */}
                   {adminTab === 'content' ? (
                     <div className="space-y-10">
                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-500 px-2">Main Heading (AR)</label>
                              <input className="w-full p-5 bg-slate-900 rounded-2xl border border-slate-700 text-white outline-none focus:border-[#00a896]" defaultValue={editingItem.type === 'home' ? 'شركة أرجي الطبية المحدودة' : 'عن شركة أرجي'} />
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-500 px-2">Main Heading (EN)</label>
                              <input className="w-full p-5 bg-slate-900 rounded-2xl border border-slate-700 text-white outline-none focus:border-[#00a896]" defaultValue={editingItem.type === 'home' ? 'Argi Medical Co. Ltd' : 'About Argi Medical'} />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-500 px-2">Description / Text Content</label>
                           <textarea className="w-full p-6 bg-slate-900 rounded-[2rem] border border-slate-700 text-white outline-none focus:border-[#00a896] min-h-[150px]" defaultValue={editingItem.type === 'home' ? 'نحن متخصصون في توزيع الأدوية...' : 'تأسست الشركة لخدمة القطاع الصحي...'} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-10 items-center bg-slate-900/40 p-10 rounded-[3rem] border border-slate-800">
                           <div className="w-48 h-48 bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-700 flex items-center justify-center relative group overflow-hidden shrink-0">
                              <ImageIcon size={40} className="text-slate-700" />
                              <label className="absolute inset-0 bg-[#00a896]/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                                 <UploadCloud size={32} /><input type="file" onChange={handleImageUpload} className="hidden" />
                              </label>
                           </div>
                           <div className="space-y-2">
                              <h5 className="font-black text-white text-lg">Banner / Hero Image</h5>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">تغيير الصورة الرئيسية للقسم المختار. يفضل استخدام صور عالية الجودة بأبعاد مناسبة للموقع.</p>
                           </div>
                        </div>
                     </div>
                   ) : adminTab === 'news' ? (
                     <div className="space-y-8">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                           <div className="w-48 h-48 bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-700 flex items-center justify-center relative group overflow-hidden shrink-0">
                           {editingItem?.image ? <img src={editingItem.image} className="w-full h-full object-cover" /> : <ImageIcon size={40} className="text-slate-700" />}
                           <label className="absolute inset-0 bg-[#00a896]/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                              <UploadCloud size={32} /><input type="file" onChange={handleImageUpload} className="hidden" />
                           </label>
                           </div>
                           <div className="space-y-4">
                              <p className="text-sm font-black text-white uppercase tracking-widest">Asset Management</p>
                              <p className="text-xs text-slate-500 font-medium">Select a high-quality visual for this news post.</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500 px-2">Label (Arabic)</label><input name="titleAr" defaultValue={editingItem?.titleAr} className="w-full p-5 bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-white" /></div>
                           <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500 px-2">Label (English)</label><input name="titleEn" defaultValue={editingItem?.titleEn} className="w-full p-5 bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-white" /></div>
                        </div>

                        <div className="space-y-6 bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800">
                           <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                              <LinkIcon size={18} className="text-[#00a896]" /> Links & Social Distribution
                           </h4>
                           
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-500 px-2">{t.readMore}</label>
                              <div className="relative">
                                 <ExternalLink size={16} className={`absolute ${isAr ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-slate-600`} />
                                 <input name="externalLink" defaultValue={editingItem?.externalLink} className={`w-full p-5 ${isAr ? 'pr-12' : 'pl-12'} bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-white`} placeholder={t.urlPlaceholder} />
                              </div>
                           </div>

                           <div className="space-y-4">
                              <div className="flex justify-between items-center px-2">
                                 <label className="text-[10px] font-black uppercase text-slate-500">{t.socialLink}</label>
                                 <button type="button" onClick={addSocialLinkField} className="flex items-center gap-2 px-4 py-2 bg-[#00a896]/10 text-[#00a896] hover:bg-[#00a896] hover:text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
                                    <Plus size={14} /> {t.addSocial}
                                 </button>
                              </div>
                              <div className="space-y-3">
                                 {editingItem?.socialLinks?.map((link: SocialLink) => (
                                    <div key={link.id} className="flex gap-3 group animate-in slide-in-from-left-2">
                                       <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-700 shadow-xl group-focus-within:border-[#00a896] transition-colors">
                                          {getSocialIcon(link.url)}
                                       </div>
                                       <input 
                                          value={link.url}
                                          onChange={(e) => handleSocialLinkChange(link.id, e.target.value)}
                                          className="flex-1 p-5 bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-sm text-white" 
                                          placeholder={t.urlPlaceholder} 
                                       />
                                       <button type="button" onClick={() => removeSocialLinkField(link.id)} className="p-5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all">
                                          <Trash2 size={18} />
                                       </button>
                                    </div>
                                 ))}
                                 {(!editingItem?.socialLinks || editingItem.socialLinks.length === 0) && (
                                    <div className="py-8 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                                       <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest italic">No social platforms linked to this news</p>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>

                        <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500 px-2">Description / Bio (AR)</label><textarea name="descAr" defaultValue={editingItem?.descAr} className="w-full p-5 bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-white min-h-[100px]" /></div>
                        <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500 px-2">Description / Bio (EN)</label><textarea name="descEn" defaultValue={editingItem?.descEn} className="w-full p-5 bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-white min-h-[100px]" /></div>
                     </div>
                   ) : adminTab === 'settings' ? (
                     <div className="space-y-8">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                           <div className="w-32 h-32 bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-700 flex items-center justify-center relative group overflow-hidden shrink-0">
                           {editingItem?.avatar ? <img src={editingItem.avatar} className="w-full h-full object-cover" /> : <User size={40} className="text-slate-700" />}
                           <label className="absolute inset-0 bg-[#00a896]/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                              <UploadCloud size={24} /><input type="file" onChange={handleImageUpload} className="hidden" />
                           </label>
                           </div>
                           <div className="flex-1 grid md:grid-cols-2 gap-8">
                           <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500 px-2">{t.userName}</label><input name="name" defaultValue={editingItem?.name} className="w-full p-5 bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-white" required /></div>
                           <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-500 px-2">{t.email}</label><input type="email" name="email" defaultValue={editingItem?.email} className="w-full p-5 bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-white" required /></div>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-500 px-2">{t.password}</label>
                           <div className="relative">
                              <Lock size={18} className={`absolute ${isAr ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-slate-600`} />
                              <input type="text" name="password" defaultValue={editingItem?.password} className={`w-full p-5 ${isAr ? 'pr-12' : 'pl-12'} bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-white`} />
                           </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-500 px-2">{t.userRole}</label>
                              <select name="role" defaultValue={editingItem?.role} className="w-full p-5 bg-slate-900 rounded-2xl border border-slate-700 outline-none focus:border-[#00a896] text-white">
                                 <option value="Super Admin">{t.roleSuper}</option>
                                 <option value="Manager">{t.roleManager}</option>
                                 <option value="Editor">{t.roleEditor}</option>
                                 <option value="Regular User">{t.roleRegular}</option>
                              </select>
                           </div>
                        </div>
                     </div>
                   ) : (
                     <div className="space-y-8">
                        <p className="text-white">Form structure not defined for this section.</p>
                     </div>
                   )}
                  <div className="flex gap-4 pt-6">
                    <button type="submit" className="flex-1 py-6 bg-[#00a896] text-white rounded-[2rem] font-black text-lg shadow-xl shadow-[#00a896]/20 transition-all hover:scale-105">{t.save}</button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-6 bg-slate-800 text-slate-400 rounded-[2rem] font-black text-lg transition-all">{t.cancel}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </AdminLayout>
      ) : (
        <div className="pt-28 bg-[#fafafa] min-h-screen overflow-x-hidden">
           {currentPage === 'auth' ? (
             <div className="min-h-[80vh] flex items-center justify-center px-6">
                <div className="w-full max-w-xl bg-white p-16 rounded-[4rem] shadow-2xl border border-slate-100 animate-in fade-in">
                   <div className="flex items-center gap-4 mb-12">
                     <div className="w-16 h-16 bg-[#00a896] rounded-2xl flex items-center justify-center text-white"><ShieldCheck size={36} /></div>
                     <h2 className="text-5xl font-black text-slate-900 tracking-tighter">{t.adminEntrance}</h2>
                   </div>
                   
                   {loginError && (
                     <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-[2rem] flex items-center gap-4 text-red-600 animate-in fade-in slide-in-from-top-4 duration-300">
                       <div className="shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                         <ShieldAlert size={24} />
                       </div>
                       <p className="text-sm font-black leading-snug">{loginError}</p>
                     </div>
                   )}

                   <form onSubmit={handleAdminLogin} className="space-y-8">
                      <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400">{t.email}</label><input name="email" className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-[#00a896] transition-all" defaultValue="mohamed@argi.com" /></div>
                      <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400">{t.password}</label><input name="password" type="password" className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-[#00a896] transition-all" defaultValue="password123" /></div>
                      <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl hover:bg-[#00a896] transition-all uppercase tracking-widest text-xs">{t.authorize}</button>
                      <button type="button" onClick={() => { setCurrentPage('home'); setLoginError(null); }} className="w-full text-xs font-black text-slate-400 uppercase tracking-widest">{t.returnHome}</button>
                   </form>
                </div>
             </div>
           ) : (
             <div className="p-20 text-center space-y-16 animate-in fade-in max-w-full">
                <div className="w-32 h-32 bg-[#00a896] rounded-[3rem] mx-auto flex items-center justify-center text-white shadow-2xl animate-float"><Activity size={64} /></div>
                <div className="space-y-6">
                  <h1 className="text-8xl font-black text-slate-900 tracking-tighter leading-none">Argi Medical Co.</h1>
                  <p className="text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                    {lang === 'ar' ? 'منصة أرجي الطبية: الريادة في توزيع الأدوية والمستلزمات الطبية في السودان بمعايير عالمية.' : 'Argi Medical: Pioneering pharmaceutical and medical supply distribution in Sudan with global standards.'}
                  </p>
                </div>
                <div className="flex justify-center gap-8">
                   <button onClick={() => setCurrentPage('auth')} className="px-14 py-7 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase text-sm tracking-widest hover:bg-[#00a896] transition-all shadow-2xl hover:scale-105">{t.adminEntrance}</button>
                   <button onClick={toggleLanguage} className="px-14 py-7 bg-white border border-slate-200 text-slate-900 rounded-[2.5rem] font-black uppercase text-sm tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3 shadow-lg"><Globe size={20} className="text-[#00a896]" /> {lang === 'ar' ? 'English' : 'العربية'}</button>
                </div>
                
                <div className="pt-20 max-w-4xl mx-auto" id="contact">
                   <div className="bg-white p-20 rounded-[4rem] shadow-2xl border border-slate-100 text-right rtl:text-right ltr:text-left">
                      <h2 className="text-4xl font-black text-slate-900 mb-12 flex items-center gap-4">
                         <MessageCircle size={36} className="text-[#00a896]" />
                         {isAr ? 'أرسل لنا رسالة' : 'Send us a message'}
                      </h2>
                      <form className="space-y-8" onSubmit={(e) => {
                         e.preventDefault();
                         const fd = new FormData(e.target as HTMLFormElement);
                         const name = fd.get('name') as string;
                         const newMsg: ContactMessage = {
                            id: Date.now(),
                            senderName: name,
                            senderEmail: fd.get('email') as string,
                            subject: fd.get('subject') as string,
                            message: fd.get('message') as string,
                            date: new Date().toLocaleString(),
                            isRead: false,
                            isStarred: false
                         };
                         setMessages([newMsg, ...messages]);
                         (e.target as HTMLFormElement).reset();
                         alert(isAr ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!');
                         if (isLoggedIn) addNotification('New Message', `From: ${name}`, 'info');
                      }}>
                         <div className="grid md:grid-cols-2 gap-8">
                            <input name="name" required placeholder={isAr ? 'الاسم بالكامل' : 'Full Name'} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-[#00a896]" />
                            <input name="email" required type="email" placeholder={isAr ? 'البريد الإلكتروني' : 'Email Address'} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-[#00a896]" />
                         </div>
                         <input name="subject" required placeholder={isAr ? 'الموضوع' : 'Subject'} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-[#00a896]" />
                         <textarea name="message" required placeholder={isAr ? 'رسالتك هنا...' : 'Your message here...'} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-[#00a896] min-h-[200px]" />
                         <button className="px-16 py-7 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase text-sm tracking-widest hover:bg-[#00a896] transition-all shadow-xl">
                            {isAr ? 'إرسال الرسالة' : 'Send Message'}
                         </button>
                      </form>
                   </div>
                </div>

                <div className="pt-20 grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                  {[
                    { icon: Truck, title: isAr ? 'توزيع وطني' : 'National Distribution', desc: isAr ? 'تغطية شاملة لكل ولايات السودان.' : 'Complete coverage across all Sudan states.' },
                    { icon: ShieldPlus, title: isAr ? 'جودة مضمونة' : 'Quality Guaranteed', desc: isAr ? 'أدوية مطابقة للمواصفات العالمية.' : 'Pharmaceuticals matching global specs.' },
                    { icon: Headphones, title: isAr ? 'دعم مستمر' : 'Constant Support', desc: isAr ? 'خدمة عملاء على مدار الساعة.' : '24/7 customer service support.' }
                  ].map((feature, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                      <div className="w-16 h-16 bg-[#00a896]/10 text-[#00a896] rounded-2xl flex items-center justify-center mx-auto mb-6"><feature.icon size={32} /></div>
                      <h4 className="text-xl font-black mb-3">{feature.title}</h4>
                      <p className="text-slate-400 font-medium text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default App;
