
import React, { useState, useEffect, useRef } from 'react';
import { 
  Truck, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Globe, 
  Heart, 
  Users, 
  CheckCircle2, 
  Building2, 
  Menu, 
  X,
  Package,
  ArrowRight,
  MessageSquare,
  Send,
  Loader2,
  Activity,
  Target,
  Eye,
  Star,
  ChevronRight,
  Stethoscope,
  FlaskConical,
  Thermometer,
  ShieldPlus,
  Key,
  MessageCircle,
  LayoutDashboard,
  LogOut,
  TrendingUp,
  Clock,
  Box,
  Lock,
  User,
  AlertCircle,
  UserPlus
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Fix TS errors
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

const translations = {
  en: {
    dir: 'ltr',
    font: 'font-sans',
    nav: {
      about: 'About Us',
      services: 'Services',
      products: 'Products',
      network: 'Network',
      contact: 'Contact',
    },
    hero: {
      tag: 'Certified Medical Excellence',
      title: 'The Future of Medical Supply in Sudan',
      subtitle: 'Argi Medical Company Ltd: Empowering healthcare providers with high-quality pharmaceuticals and logistics.',
      cta: 'Our Portfolio',
    },
    about: {
      title: 'Our Identity',
      subtitle: 'Who We Are',
      description: 'Argi Medical is a pillar of pharmaceutical reliability in Sudan, specializing in the distribution of life-saving medications and medical supplies with a focus on WHO-standard cold chain logistics.',
      mission: { title: 'Our Mission', text: 'To deliver quality healthcare solutions through efficient distribution and professional pharmacy services.' },
      vision: { title: 'Our Vision', text: 'To become the gold standard for pharmaceutical distribution across the African continent.' },
      values: ['Integrity', 'Reliability', 'Patient-First']
    },
    services: {
      title: 'Strategic Solutions',
      items: [
        { title: 'Cold Chain Logistics', desc: 'Temperature-controlled distribution ensuring medicine potency from warehouse to patient.', icon: Thermometer },
        { title: 'Pharmacy Franchising', desc: 'A network of modern retail pharmacies providing expert consultation.', icon: Building2 },
        { title: 'Hospital Supply', desc: 'Strategic sourcing for public and private medical institutions nationwide.', icon: ShieldPlus },
        { title: 'Medical Consulting', desc: 'Professional advice on inventory management and pharmaceutical compliance.', icon: Stethoscope }
      ]
    },
    products: {
      title: 'Our Portfolio',
      subtitle: 'Product Categories',
      items: [
        { name: 'Chronic Disease Meds', desc: 'High-quality treatments for Diabetes, Hypertension, and Cardiac care.', icon: Heart },
        { name: 'Critical Care', desc: 'Essential antibiotics and life-saving injectable solutions.', icon: FlaskConical },
        { name: 'Medical Equipment', desc: 'Diagnostic tools and patient care monitoring systems.', icon: Activity },
        { name: 'Surgical Supplies', desc: 'Sterile tools and consumable items for operative care.', icon: Package }
      ]
    },
    contact: {
      title: 'Connect With Us',
      subtitle: 'Reach out to our professional team for inquiries and partnerships.',
      form: { name: 'Name', email: 'Email', message: 'Message', btn: 'Send Inquiry' }
    },
    chat: {
      welcome: 'Welcome to Argi Medical. How can our team help you today?',
      placeholder: 'Type your message...',
      online: 'Professional Support',
      keyRequired: 'Please connect your secure API key to start the conversation.'
    },
    network: {
      branches: [
        { name: 'Al-Managel', lat: '14.5167', lng: '32.9667' },
        { name: 'Atbara', lat: '17.6915', lng: '33.9744' },
        { name: 'Omdurman', lat: '15.6333', lng: '32.4833' },
        { name: 'Kassala', lat: '15.4507', lng: '36.4042' }
      ]
    }
  },
  ar: {
    dir: 'rtl',
    font: 'arabic-font',
    nav: {
      about: 'عن الشركة',
      services: 'خدماتنا',
      products: 'منتجاتنا',
      network: 'شبكتنا',
      contact: 'اتصل بنا',
    },
    hero: {
      tag: 'تميز طبي معتمد',
      title: 'مستقبل الإمداد الطبي في السودان',
      subtitle: 'شركة أرجي الطبية المحدودة: تمكين مقدمي الرعاية الصحية بأدوية عالية الجودة وحلول لوجستية ذكية.',
      cta: 'محفظة منتجاتنا',
    },
    about: {
      title: 'هويتنا',
      subtitle: 'من نحن',
      description: 'تعتبر شركة أرجي الطبية ركيزة أساسية للموثوقية الدوائية في السودان، متخصصة في توزيع الأدوية المنقذة للحياة والمستلزمات الطبية مع التركيز على معايير منظمة الصحة العالمية.',
      mission: { title: 'رسالتنا', text: 'تقديم حلول رعاية صحية عالية الجودة من خلال التوزيع الفعال والخدمات الصيدلانية المحترفة.' },
      vision: { title: 'رؤيتنا', text: 'أن نكون المعيار الذهبي لتوزيع الأدوية وإدارة الصيدليات في القارة الأفريقية.' },
      values: ['النزاهة', 'الموثوقية', 'المريض أولاً']
    },
    services: {
      title: 'حلولنا الاستراتيجية',
      items: [
        { title: 'لوجستيات السلسلة الباردة', desc: 'توزيع محكوم بدرجات الحرارة لضمان فعالية الدواء من المستودع حتى المريض.', icon: Thermometer },
        { title: 'إدارة الصيدليات', desc: 'شبكة من الصيدليات الحديثة التي تقدم استشارات طبية خبيرة ورعاية متميزة.', icon: Building2 },
        { title: 'توريد المستشفيات', desc: 'تأمين المصادر الاستراتيجية للمؤسسات الطبية العامة والخاصة في جميع الولايات.', icon: ShieldPlus },
        { title: 'الاستشارات الطبية', desc: 'نصائح احترافية حول إدارة المخزون والامتثال للمعايير الدوائية العالمية.', icon: Stethoscope }
      ]
    },
    products: {
      title: 'محفظة المنتجات',
      subtitle: 'تصنيفاتنا الدوائية',
      items: [
        { name: 'أدوية الأمراض المزمنة', desc: 'علاجات عالية الجودة لمرضى السكري والضغط والقلب.', icon: Heart },
        { name: 'العناية الحرجة', desc: 'المضادات الحيوية الأساسية والمحاليل الوريدية المنقذة للحياة.', icon: FlaskConical },
        { name: 'المعدات الطبية', desc: 'أدوات التشخيص وأنظمة مراقبة حالة المرضى المتطورة.', icon: Activity },
        { name: 'المستلزمات الجراحية', desc: 'أدوات معقمة ومستهلكات طبية للعمليات الجراحية.', icon: Package }
      ]
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'تحدث مع فريقنا المتخصص للاستفسارات والشراكات الاستراتيجية.',
      form: { name: 'الاسم', email: 'البريد الإلكتروني', message: 'الرسالة', btn: 'إرسال الاستفسار' }
    },
    chat: {
      welcome: 'مرحباً بكم في أرجي الطبية. كيف يمكن لفريقنا مساعدتكم اليوم؟',
      placeholder: 'اكتب رسالتك هنا...',
      online: 'الدعم الاحترافي',
      keyRequired: 'يرجى تفعيل مفتاح الأمان لبدء المحادثة.'
    },
    network: {
      branches: [
        { name: 'المناقل', lat: '14.5167', lng: '32.9667' },
        { name: 'عطبرة', lat: '17.6915', lng: '33.9744' },
        { name: 'أم درمان', lat: '15.6333', lng: '32.4833' },
        { name: 'كسلا', lat: '15.4507', lng: '36.4042' }
      ]
    }
  }
};

const AIChat = ({ lang }: { lang: 'ar' | 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const t = translations[lang].chat;
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  useEffect(() => { 
    if (messages.length === 0) setMessages([{role: 'bot', text: t.welcome}]); 
  }, [lang, t.welcome, messages.length]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleConnectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !hasKey) return;
    const userMsg = input;
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are Argi Medical AI assistant. Respond professionally. Language: ${lang}.`,
        }
      });
      const botText = response.text || (lang === 'ar' ? 'عذراً، لم أتمكن من الرد.' : 'Sorry, I could not respond.');
      setMessages(prev => [...prev, {role: 'bot', text: botText}]);
    } catch (err: any) {
      if (err?.message?.includes("Requested entity was not found.")) {
        setHasKey(false);
        if (window.aistudio) {
          await window.aistudio.openSelectKey();
          setHasKey(true);
        }
      }
      setMessages(prev => [...prev, {role: 'bot', text: lang === 'ar' ? 'حدث خطأ في الاتصال.' : 'Connection error.'}]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen && (
        <div className="mb-4 w-[360px] md:w-[420px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-10">
          <div className="p-6 bg-[#00a896] text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
               <Activity size={20} />
               <p className="font-bold text-sm tracking-tight">{t.online}</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/10 rounded-full"><X size={20}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {!hasKey ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 bg-[#00a896]/10 text-[#00a896] rounded-full flex items-center justify-center">
                  <Key size={30} />
                </div>
                <p className="text-slate-600 font-medium">{t.keyRequired}</p>
                <button 
                  onClick={handleConnectKey}
                  className="px-6 py-2 bg-[#00a896] text-white rounded-full font-bold text-sm hover:scale-105 transition-transform"
                >
                  {lang === 'ar' ? 'توصيل المفتاح' : 'Connect Key'}
                </button>
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-3xl text-sm ${m.role === 'user' ? 'bg-[#00a896] text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isLoading && <Loader2 className="w-5 h-5 animate-spin text-[#00a896] mx-auto" />}
              </>
            )}
            <div ref={chatEndRef} />
          </div>

          {hasKey && (
            <div className="p-4 bg-white border-t flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t.placeholder} className="flex-1 px-5 py-3 bg-slate-100 rounded-full text-sm outline-none" />
              <button onClick={handleSend} className="p-3 bg-[#00a896] text-white rounded-full"><Send size={20} /></button>
            </div>
          )}
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-[#00a896] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
        <MessageSquare size={30} />
      </button>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00a896]/10 text-[#00a896] text-[10px] font-black uppercase tracking-widest mb-4 ${centered ? 'mx-auto' : ''}`}>
      <div className="w-1 h-1 rounded-full bg-[#00a896]"></div>
      {title}
    </div>
    {subtitle && <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">{subtitle}</h2>}
  </div>
);

const Dashboard = ({ lang, onLogout }: { lang: 'ar' | 'en', onLogout: () => void }) => {
  const isAr = lang === 'ar';
  
  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex overflow-hidden animate-in fade-in duration-300">
      <div className="w-80 bg-slate-900 text-white flex flex-col p-8 space-y-12">
        <div className="flex items-center gap-3">
          <Activity className="text-[#00a896] w-8 h-8" />
          <span className="text-xl font-black tracking-tighter uppercase">ARGI <span className="text-[#00a896]">ADMIN</span></span>
        </div>
        
        <nav className="flex-1 space-y-4">
          {[
            { icon: LayoutDashboard, label: isAr ? 'لوحة التحكم' : 'Dashboard' },
            { icon: Truck, label: isAr ? 'إدارة الشحنات' : 'Logistics' },
            { icon: Package, label: isAr ? 'المخزون الطبي' : 'Medical Inventory' },
            { icon: Users, label: isAr ? 'العملاء والفروع' : 'Clients & Branches' },
            { icon: Thermometer, label: isAr ? 'السلسلة الباردة' : 'Cold Chain' }
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${i === 0 ? 'bg-[#00a896] text-white shadow-lg shadow-[#00a896]/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl font-bold transition-all">
          <LogOut size={20} />
          {isAr ? 'تسجيل الخروج' : 'Logout'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">{isAr ? 'مرحباً، محمد مزمل' : 'Welcome, Mohemad Muzamil'}</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{isAr ? 'إدارة العمليات الاستراتيجية' : 'Strategic Operations Manager'}</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3">
                <Clock size={16} className="text-[#00a896]" />
                <span className="text-xs font-black text-slate-600">{new Date().toLocaleTimeString('en-US', { hour12: true })}</span>
             </div>
             <div className="w-12 h-12 bg-[#00a896] rounded-2xl flex items-center justify-center text-white font-black">MM</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
           {[
             { label: isAr ? 'إجمالي الشحنات' : 'Total Shipments', value: '1,248', icon: Truck, color: 'bg-blue-500' },
             { label: isAr ? 'المخزون الحرج' : 'Critical Stock', value: '42 SKU', icon: AlertCircle, color: 'bg-red-500' },
             { label: isAr ? 'الفروع النشطة' : 'Active Branches', value: '18', icon: Building2, color: 'bg-[#00a896]' },
             { label: isAr ? 'معدل التسليم' : 'Delivery Rate', value: '98.5%', icon: TrendingUp, color: 'bg-indigo-500' }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-6`}>
                   <stat.icon size={24} />
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
             </div>
           ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-8">{isAr ? 'تتبع سلسلة التبريد' : 'Cold Chain Monitor'}</h3>
              <div className="space-y-6">
                 {[
                   { name: isAr ? 'مستودع أم درمان المركز' : 'Omdurman Hub', temp: '4.2°C', status: 'Optimal' },
                   { name: isAr ? 'مستودع عطبرة' : 'Atbara Hub', temp: '5.1°C', status: 'Optimal' },
                   { name: isAr ? 'مستودع المناقل' : 'Managel Hub', temp: '3.8°C', status: 'Optimal' }
                 ].map((hub, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-4">
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <span className="font-bold text-slate-700">{hub.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                         <span className="font-black text-slate-900">{hub.temp}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-100 px-3 py-1 rounded-full">{hub.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl text-white">
              <h3 className="text-2xl font-black mb-8">{isAr ? 'آخر التوزيعات' : 'Recent Distribution'}</h3>
              <div className="space-y-6">
                 {[
                   { id: '#49102', target: isAr ? 'مستشفى الضمان' : 'Damman Hospital', date: '10:30 AM', amount: '45 Boxes' },
                   { id: '#49103', target: isAr ? 'صيدلية أرجي - المناقل' : 'Argi Pharmacy - Managel', date: '08:45 AM', amount: '12 Boxes' },
                   { id: '#49104', target: isAr ? 'مركز صحي Atbara' : 'Atbara Medical Center', date: 'Yesterday', amount: '80 Boxes' }
                 ].map((order, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10">
                      <div className="space-y-1">
                         <span className="text-[10px] font-black text-[#00a896] uppercase tracking-widest">{order.id}</span>
                         <p className="font-bold text-sm">{order.target}</p>
                      </div>
                      <div className="text-right">
                         <p className="font-black text-xs">{order.amount}</p>
                         <p className="text-[10px] text-white/40">{order.date}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const LoginPortal = ({ lang, onLogin }: { lang: 'ar' | 'en', onLogin: () => void }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const isAr = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    setTimeout(() => {
      if (mode === 'login') {
        if (email === 'mohemadmuzamil@gmail.com' && password === 'admin@123') {
          onLogin();
        } else {
          setError(isAr ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
        }
      } else {
        // Mock signup success
        alert(isAr ? 'تم إنشاء الحساب بنجاح! يمكنك الدخول الآن.' : 'Account created successfully! You can login now.');
        setMode('login');
      }
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-white/20">
        <div className="p-10 bg-[#00a896] text-white text-center relative overflow-hidden transition-all duration-500">
           <Activity className="absolute -top-10 -right-10 w-40 h-40 opacity-10" />
           <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
             {mode === 'login' ? <Lock size={28} /> : <UserPlus size={28} />}
           </div>
           <h2 className="text-2xl font-black mb-1">
             {mode === 'login' ? (isAr ? 'تسجيل الدخول' : 'Login') : (isAr ? 'تسجيل جديد' : 'New Registration')}
           </h2>
           <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">
             {mode === 'login' ? (isAr ? 'سجل الدخول للمتابعة' : 'Login to Continue') : (isAr ? 'انضم إلى شبكة أرجي الطبية' : 'Join Argi Medical Network')}
           </p>
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#00a896] transition-all text-sm" placeholder={isAr ? 'الاسم الثلاثي' : 'John Doe'} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#00a896] transition-all text-sm" placeholder="+249..." />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#00a896] transition-all text-sm" placeholder="user@argimedical.com" />
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'كلمة المرور' : 'Password'}</label>
               <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#00a896] transition-all text-sm" placeholder="••••••••" />
               </div>
            </div>

            {error && <p className="text-red-500 text-[10px] font-bold text-center animate-pulse">{error}</p>}

            <button disabled={isProcessing} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-900/20 hover:bg-[#00a896] transition-all flex items-center justify-center gap-3 group">
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === 'login' ? (isAr ? 'دخول النظام' : 'Enter System') : (isAr ? 'إنشاء حساب' : 'Create Account'))}
              {!isProcessing && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>

            <div className="text-center pt-2 space-y-4">
               <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-[10px] font-black text-[#00a896] uppercase tracking-widest hover:underline decoration-2">
                 {mode === 'login' ? (isAr ? 'تسجيل جديد؟' : 'New Registration?') : (isAr ? 'لديك حساب؟ سجل دخولك' : 'Have account? Login')}
               </button>
               <button type="button" onClick={() => (window as any).closeLogin()} className="block w-full text-slate-300 text-[9px] font-black uppercase tracking-widest hover:text-slate-500 transition-colors">
                 {isAr ? 'إلغاء' : 'Cancel'}
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('ar');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState<{name: string, lat: string, lng: string} | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, t.dir]);

  (window as any).closeLogin = () => setShowLogin(false);

  return (
    <div className={`min-h-screen bg-white ${t.font} text-slate-900`}>
      <AIChat lang={lang} />
      
      {isLoggedIn && <Dashboard lang={lang} onLogout={() => setIsLoggedIn(false)} />}
      {showLogin && !isLoggedIn && <LoginPortal lang={lang} onLogin={() => { setIsLoggedIn(true); setShowLogin(false); }} />}

      {activeBranch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20">
            <button onClick={() => setActiveBranch(null)} className="absolute top-6 right-6 z-10 p-3 bg-white/90 backdrop-blur-md text-slate-900 rounded-full shadow-lg hover:bg-[#00a896] hover:text-white transition-all"><X size={24} /></button>
            <div className="p-8 bg-[#00a896] text-white flex items-center gap-4">
              <MapPin size={32} />
              <div>
                <h3 className="text-2xl font-black">{activeBranch.name}</h3>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest">{lang === 'ar' ? 'موقع الفرع المعتمد' : 'Certified Branch Location'}</p>
              </div>
            </div>
            <div className="aspect-video w-full bg-slate-100">
               <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${activeBranch.lat},${activeBranch.lng}&z=14&hl=${lang}&output=embed`}></iframe>
            </div>
            <div className="p-8 bg-slate-50 flex justify-between items-center">
               <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest"><Activity size={16} className="text-[#00a896]" /><span>Real-time logistics monitoring enabled</span></div>
               <button onClick={() => setActiveBranch(null)} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-[#00a896] transition-all">{lang === 'ar' ? 'إغلاق الخريطة' : 'Close Map'}</button>
            </div>
          </div>
        </div>
      )}

      <nav className={`fixed w-full z-50 transition-all duration-300 py-4 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#00a896] rounded-xl flex items-center justify-center text-white"><Activity size={22} /></div>
            <span className="font-black text-xl tracking-tighter uppercase">ARGI <span className="text-[#00a896]">MEDICAL</span></span>
          </a>

          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {Object.entries(t.nav).map(([key, label]) => (<a key={key} href={`#${key}`} className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-[#00a896] transition-colors">{label}</a>))}
            
            <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-[#00a896] hover:text-[#00a896] transition-all">
              <Lock size={12} />
              {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </button>

            <button onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')} className="px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase hover:bg-[#00a896] transition-all">{lang === 'en' ? 'العربية' : 'English'}</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-900"><Menu /></button>
        </div>
      </nav>

      <section className="relative pt-40 pb-20 lg:pt-64 lg:pb-40 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00a896]/5 rounded-bl-[30rem] -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm border border-slate-100"><span className="w-2 h-2 rounded-full bg-[#00a896] animate-pulse"></span><span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.hero.tag}</span></div>
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter">{t.hero.title}</h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">{t.hero.subtitle}</p>
            <div className="flex gap-4"><a href="#products" className="px-10 py-5 bg-[#00a896] text-white rounded-2xl font-black shadow-xl shadow-[#00a896]/30 flex items-center gap-2 hover:scale-105 transition-transform">{t.hero.cta} <ArrowRight size={20} /></a></div>
          </div>
          <div className="relative group animate-float">
             <div className="relative aspect-square bg-white rounded-[5rem] p-16 shadow-2xl border-[20px] border-[#00a896]/5 flex flex-col items-center justify-center">
                <Heart size={140} className="text-[#00a896] mb-6 drop-shadow-xl" fill="#00a896" />
                <p className="text-5xl font-black tracking-tighter text-slate-900 uppercase">ARGI <span className="text-[#00a896]">MED</span></p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00a896] rounded-3xl -m-6 flex items-center justify-center text-white shadow-xl"><ShieldCheck size={40} /></div>
             </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <SectionHeader title={t.about.title} subtitle={t.about.subtitle} />
              <p className="text-2xl font-medium text-slate-600 leading-relaxed italic border-l-8 border-[#00a896] pl-8">{t.about.description}</p>
              <div className="flex flex-wrap gap-4">{t.about.values.map(v => (<div key={v} className="px-6 py-3 bg-slate-50 rounded-2xl font-black text-xs text-[#00a896] flex items-center gap-2 border border-slate-100"><CheckCircle2 size={16} /> {v}</div>))}</div>
            </div>
            <div className="grid grid-cols-1 gap-8">
               <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl space-y-6"><div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#00a896]"><Target size={28} /></div><h3 className="text-3xl font-black">{t.about.mission.title}</h3><p className="text-slate-400 leading-relaxed text-lg">{t.about.mission.text}</p></div>
               <div className="bg-[#00a896] text-white p-12 rounded-[4rem] shadow-2xl space-y-6"><div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center"><Eye size={28} /></div><h3 className="text-3xl font-black">{t.about.vision.title}</h3><p className="text-white/80 leading-relaxed text-lg">{t.about.vision.text}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Expertise" subtitle={t.services.title} centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">{t.services.items.map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 group hover:border-[#00a896] transition-all duration-500 shadow-sm hover:shadow-2xl">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#00a896] group-hover:text-white transition-all"><s.icon size={28} className="text-[#00a896] group-hover:text-white" /></div>
                <h4 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-[#00a896] transition-colors">{s.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}</div>
        </div>
      </section>

      <section id="products" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
              <SectionHeader title={t.products.title} subtitle={t.products.subtitle} />
              <div className="pb-16 flex gap-3"><div className="px-6 py-3 bg-slate-100 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-500">1200+ SKU</div><div className="px-6 py-3 bg-[#00a896]/10 rounded-full font-black text-[10px] uppercase tracking-widest text-[#00a896]">Global Suppliers</div></div>
           </div>
           <div className="grid md:grid-cols-2 gap-10">{t.products.items.map((p, i) => (
                <div key={i} className="flex gap-8 p-12 bg-slate-50 rounded-[4rem] group hover:bg-slate-900 transition-all duration-700">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg group-hover:bg-[#00a896] transition-all"><p.icon size={36} className="text-[#00a896] group-hover:text-white" /></div>
                  <div className="space-y-3"><h4 className="text-3xl font-black text-slate-900 group-hover:text-white transition-colors">{p.name}</h4><p className="text-slate-500 group-hover:text-slate-400 font-medium leading-relaxed">{p.desc}</p></div>
                </div>
              ))}</div>
        </div>
      </section>

      <section id="network" className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none"><Globe size={600} className="absolute -right-40 top-0 text-[#00a896] animate-[spin_60s_linear_infinite]" /></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <div><p className="text-[#00a896] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Strategic Presence</p><h2 className="text-5xl md:text-7xl font-black tracking-tighter">Connected Across The Nation</h2><p className="text-white/50 mt-4 font-bold uppercase tracking-widest text-xs">{lang === 'ar' ? 'انقر على الفرع لعرض موقعه المعتمد' : 'Click on a branch to view its certified location'}</p></div>
              <div className="grid grid-cols-2 gap-6">{t.network.branches.map((b, i) => (<button key={i} onClick={() => setActiveBranch(b)} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-md text-right rtl:text-right ltr:text-left hover:bg-[#00a896] hover:border-[#00a896] hover:scale-105 transition-all group"><div className="flex justify-between items-start mb-4"><p className="text-sm opacity-50 uppercase tracking-widest">Hub {i+1}</p><MapPin size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" /></div><p className="text-3xl font-black">{b.name}</p></button>))}</div>
           </div>
           <div className="bg-[#00a896] p-16 rounded-[5rem] shadow-2xl flex items-center justify-center text-center"><div className="space-y-6"><MapPin size={80} className="mx-auto" /><h3 className="text-4xl font-black leading-tight">Fast Reliable Delivery to 18 States</h3><p className="text-white/80 font-medium">Covering 95% of Sudan's healthcare infrastructure with local distribution points.</p></div></div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <SectionHeader title="Contact" subtitle={t.contact.title} />
            <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">{t.contact.subtitle}</p>
            <div className="space-y-8">
               <a href="mailto:info@argimedical.com" className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300"><div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white transition-all"><Mail size={32} /></div><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Corporate Email</p><p className="text-2xl font-black">info@argimedical.com</p></div></a>
               <a href="tel:+249912326210" className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300"><div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white transition-all"><Phone size={32} /></div><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Direct Hotline</p><p className="text-2xl font-black">+249 912 326 210</p></div></a>
               <a href="https://wa.me/249912326210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300"><div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-[#00a896] group-hover:bg-[#25D366] group-hover:text-white transition-all"><MessageCircle size={32} /></div><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp Business</p><p className="text-2xl font-black">+249 912 326 210</p></div></a>
            </div>
          </div>
          <div className="bg-slate-50 p-16 rounded-[5rem] border border-slate-100">
             <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                <div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contact.form.name}</label><input type="text" className="w-full p-4 bg-white rounded-2xl border border-slate-200 outline-none focus:border-[#00a896] transition-all" /></div>
                <div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contact.form.email}</label><input type="email" className="w-full p-4 bg-white rounded-2xl border border-slate-200 outline-none focus:border-[#00a896] transition-all" /></div>
                <div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contact.form.message}</label><textarea rows={4} className="w-full p-4 bg-white rounded-2xl border border-slate-200 outline-none focus:border-[#00a896] transition-all resize-none"></textarea></div>
                <button className="w-full py-6 bg-[#00a896] text-white rounded-3xl font-black text-lg shadow-xl shadow-[#00a896]/20 hover:scale-[1.02] transition-transform">{t.contact.form.btn}</button>
             </form>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
           <div className="flex items-center justify-center gap-3"><Activity className="text-[#00a896] w-8 h-8" /><span className="text-3xl font-black tracking-tighter uppercase">ARGI <span className="text-[#00a896]">Medical</span></span></div>
           
           <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 mx-auto px-6 py-3 bg-slate-50 text-[#00a896] hover:bg-[#00a896] hover:text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all group shadow-sm">
             <Lock size={12} className="group-hover:rotate-12 transition-transform" />
             {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
           </button>

           <div className="space-y-4 pt-4">
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
               &copy; {new Date().getFullYear()} Argi Medical Company Ltd. Sudan. All Rights Reserved.
             </p>
             <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
               {lang === 'ar' ? 'تم الانشأ بواسطة' : 'Created by'} 
               <a href="http://m7m4dm0z4m1.info/" target="_blank" rel="noopener noreferrer" className="text-[#00a896] hover:underline decoration-2 underline-offset-4">
                 Eng.Mohamed Muzamil
               </a>
             </p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
