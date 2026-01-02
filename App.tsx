
import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  TrendingUp,
  Box,
  Award,
  Zap,
  Shield,
  BriefcaseMedical,
  Wallet,
  Headphones,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Timer,
  BarChart3,
  Layers,
  Search,
  Filter,
  Info,
  ExternalLink,
  Pill,
  Droplets,
  Syringe,
  Microscope
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

type Page = 'home' | 'about' | 'services' | 'products' | 'contact';

const translations = {
  en: {
    dir: 'ltr',
    font: 'font-sans',
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      products: 'Catalog',
      contact: 'Contact Us',
    },
    hero: {
      tag: 'Pharmaceutical Excellence in Sudan',
      title: 'Reliable Medical Supply Nationwide',
      subtitle: 'Argi Medical Company Ltd: Providing high-quality pharmaceuticals and exceptional healthcare services to the Sudanese community since inception.',
      cta: 'Explore Catalog',
      secondaryCta: 'Learn More'
    },
    about: {
      title: 'Who We Are',
      subtitle: 'Our Story & Network',
      intro: 'Argi Medical Company Ltd is a cornerstone of pharmaceutical reliability in Sudan. We specialize in the distribution of essential medications and medical equipment, serving as a vital link between global innovation and local healthcare needs.',
      description: 'Founded with a commitment to health equity, Argi Medical has grown into a nationwide leader. Our operations are built on a foundation of integrity, ensuring that life-saving treatments are accessible across all regions of Sudan.',
      mission: 'Providing high-quality pharmaceuticals and exceptional healthcare services to the Sudanese community through efficient distribution.',
      vision: 'To be the leading pharmaceutical distribution and pharmacy provider in Sudan, setting the gold standard for healthcare logistics.',
      values: [
        { title: 'Trust', icon: ShieldCheck, desc: 'Reliability in every shipment.' },
        { title: 'Quality', icon: Award, desc: 'Adherence to global standards.' },
        { title: 'Professionalism', icon: BriefcaseMedical, desc: 'Expertise in medical supply.' }
      ],
      stats: [
        { label: 'Global Brands', value: '45+' },
        { label: 'States Covered', value: '18' },
        { label: 'Partner Pharmacies', value: '500+' },
        { label: 'Years of Excellence', value: '10+' }
      ],
      networkTitle: 'Our Nationwide Presence',
      branches: [
        { name: 'Omdurman', type: 'Main Hub', lat: '15.6361', lng: '32.4820' },
        { name: 'Al-Managel', type: 'Regional Hub', lat: '14.5167', lng: '32.9667' },
        { name: 'Atbara', type: 'Logistics Hub', lat: '17.6915', lng: '33.9744' },
        { name: 'Kassala', type: 'Branch Office', lat: '15.4507', lng: '36.4042' }
      ]
    },
    services: {
      title: 'Our Services',
      items: [
        { title: 'Pharmaceutical Distribution', desc: 'Comprehensive distribution network covering all regions of Sudan with speed and efficiency.', icon: Truck, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800' },
        { title: 'Pharmacy Operations', desc: 'Modern pharmacies providing specialized medical consultation and high-standard patient care.', icon: Building2, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800' },
        { title: 'Medical Supply Chain', desc: 'Integrated logistics system for precise inventory management and timely delivery.', icon: Package, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },
        { title: 'Quality Assurance', desc: 'Strict adherence to international quality standards for storage, handling, and safety.', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800' }
      ]
    },
    advantages: {
      title: 'Why Choose Us?',
      subtitle: 'Our Competitive Advantages',
      items: [
        { title: 'Reliable Network', desc: 'Comprehensive coverage with fast and secure delivery services.', icon: Globe },
        { title: 'High-Quality Products', desc: 'Approved pharmaceuticals meeting rigorous global standards.', icon: CheckCircle2 },
        { title: 'Professional Team', desc: 'Specialized experts dedicated to the pharmaceutical field.', icon: Users },
        { title: 'Customer Service', desc: 'Dedicated support with continuous follow-up for all partners.', icon: Headphones },
        { title: 'Competitive Pricing', desc: 'Excellent value without compromising on quality standards.', icon: Wallet }
      ]
    }
  },
  ar: {
    dir: 'rtl',
    font: 'arabic-font',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      products: 'المنتجات',
      contact: 'اتصل بنا',
    },
    hero: {
      tag: 'تميز دوائي في السودان',
      title: 'إمداد طبي موثوق في جميع الولايات',
      subtitle: 'شركة أرجي الطبية المحدودة: نلتزم بتوفير أدوية عالية الجودة وخدمات رعاية صحية استثنائية للمجتمع السوداني.',
      cta: 'تصفح الكتالوج',
      secondaryCta: 'عن الشركة'
    },
    about: {
      title: 'من نحن',
      subtitle: 'قصتنا وتواجدنا',
      intro: 'تعتبر شركة أرجي الطبية المحدودة ركيزة أساسية للموثوقية الدوائية في السودان. نحن متخصصون في توزيع الأدوية المنقذة للحياة والمعدات الطبية، ونعمل كحلقة وصل حيوية بين الابتكارات الدوائية العالمية والاحتياجات الصحية المحلية.',
      description: 'تأسست أرجي الطبية بالتزام راسخ تجاه العدالة الصحية، ونمت لتصبح رائدة على مستوى البلاد. تُبنى عملياتنا على أساس من النزاهة، لضمان وصول العلاجات الضرورية إلى كافة ربوع السودان.',
      mission: 'توفير أدوية عالية الجودة وخدمات رعاية صحية استثنائية للمجتمع السوداني من خلال كفاءة التوزيع والخدمات الطبية.',
      vision: 'أن نكون الشركة الرائدة في مجال توزيع الأدوية وتوفير الخدمات الصيدلانية في السودان، واضعين المعيار الذهبي للخدمات اللوجستية الصحية.',
      values: [
        { title: 'الثقة', icon: ShieldCheck, desc: 'موثوقية في كل شحنة.' },
        { title: 'الجودة', icon: Award, desc: 'التزام بالمعايير العالمية.' },
        { title: 'المهنية', icon: BriefcaseMedical, desc: 'خبرة في الإمداد الطبي.' }
      ],
      stats: [
        { label: 'علامة عالمية', value: '45+' },
        { label: 'ولاية مغطاة', value: '18' },
        { label: 'صيدلية شريكة', value: '500+' },
        { label: 'سنوات من التميز', value: '10+' }
      ],
      networkTitle: 'شبكة فروعنا وتواجدنا',
      branches: [
        { name: 'أم درمان', type: 'المركز الرئيسي', lat: '15.6361', lng: '32.4820' },
        { name: 'المناقل', type: 'مركز إقليمي', lat: '14.5167', lng: '32.9667' },
        { name: 'عطبرة', type: 'مركز لوجستي', lat: '17.6915', lng: '33.9744' },
        { name: 'كسلا', type: 'مكتب فرعي', lat: '15.4507', lng: '36.4042' }
      ]
    },
    services: {
      title: 'خدماتنا',
      items: [
        { title: 'توزيع الأدوية', desc: 'شبكة توزيع شاملة تغطي كافة أنحاء السودان بسرعة وكفاءة عالية.', icon: Truck, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800' },
        { title: 'إدارة الصيدليات', desc: 'صيدليات حديثة تقدم خدمات استشارية طبية متخصصة ورعاية مرضى متميزة.', icon: Building2, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800' },
        { title: 'سلسلة الإمداد الطبي', desc: 'نظام لوجستي متكامل لإدارة المخزون بدقة وضمان التوريد في الوقت المناسب.', icon: Package, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },
        { title: 'ضمان الجودة', desc: 'التزام صارم بالمعايير العالمية في التخزين والمناولة السلامة الدوائية.', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800' }
      ]
    },
    advantages: {
      title: 'لماذا تختارنا؟',
      subtitle: 'ميزاتنا التنافسية',
      items: [
        { title: 'شبكة توزيع موثوقة', desc: 'تغطية شاملة مع خدمات توصيل سريعة وآمنة لكافة الولايات.', icon: Globe },
        { title: 'منتجات عالية الجودة', desc: 'أدوية معتمدة ومطابقة لأرقى المعايير العالمية.', icon: CheckCircle2 },
        { title: 'فريق عمل احترافي', desc: 'خبراء متخصصون في المجال الصيدلاني والإمداد الطبي.', icon: Users },
        { title: 'خدمة العملاء', desc: 'دعم مخصص ومتابعة مستمرة لضمان رضا شركائنا.', icon: Headphones },
        { title: 'أسعار تنافسية', desc: 'قيمة ممتازة مع الالتزام التام بأعلى معايير الجودة.', icon: Wallet }
      ]
    }
  }
};

// --- Product Data ---
const productCategories = [
  { id: 'all', ar: 'الكل', en: 'All' },
  { id: 'antibiotics', ar: 'المضادات الحيوية', en: 'Antibiotics', icon: Pill },
  { id: 'chronic', ar: 'الأمراض المزمنة', en: 'Chronic Care', icon: Activity },
  { id: 'vaccines', ar: 'اللقاحات', en: 'Vaccines', icon: Syringe },
  { id: 'equipment', ar: 'المعدات الطبية', en: 'Medical Equipment', icon: Microscope },
  { id: 'supplements', ar: 'المكملات الغذائية', en: 'Supplements', icon: FlaskConical },
];

const mockProducts = [
  { id: 1, nameAr: 'أموكسيسيلين 500 ملجم', nameEn: 'Amoxicillin 500mg', category: 'antibiotics', brand: 'GlaxoSmithKline', descAr: 'مضاد حيوي واسع المدى لعلاج العدوى البكتيرية.', descEn: 'Broad-spectrum antibiotic for bacterial infections.' },
  { id: 2, nameAr: 'إنسولين جلارجين', nameEn: 'Insulin Glargine', category: 'chronic', brand: 'Sanofi', descAr: 'إنسولين طويل المفعول للتحكم في سكر الدم.', descEn: 'Long-acting insulin for blood sugar control.' },
  { id: 3, nameAr: 'لقاح الإنفلونزا الموسمية', nameEn: 'Influenza Vaccine', category: 'vaccines', brand: 'Pfizer', descAr: 'لقاح وقائي ضد فيروسات الإنفلونزا الشائعة.', descEn: 'Preventative vaccine against common flu strains.' },
  { id: 4, nameAr: 'جهاز قياس ضغط الدم الرقمي', nameEn: 'Digital BP Monitor', category: 'equipment', brand: 'Omron', descAr: 'جهاز دقيق وسهل الاستخدام لقياس ضغط الدم.', descEn: 'Accurate and easy-to-use blood pressure monitor.' },
  { id: 5, nameAr: 'فيتامين سي 1000 ملجم', nameEn: 'Vitamin C 1000mg', category: 'supplements', brand: 'Bayer', descAr: 'مكمل غذائي لتعزيز المناعة وصحة الجسم.', descEn: 'Dietary supplement to boost immunity and health.' },
  { id: 6, nameAr: 'أوجمنتين 1 جم', nameEn: 'Augmentin 1g', category: 'antibiotics', brand: 'GSK', descAr: 'مزيج من المضادات الحيوية لعلاج العدوى المقاومة.', descEn: 'Antibiotic combination for resistant infections.' },
  { id: 7, nameAr: 'ميتفورمين 850 ملجم', nameEn: 'Metformin 850mg', category: 'chronic', brand: 'Merck', descAr: 'علاج أساسي لمرض السكري من النوع الثاني.', descEn: 'Primary treatment for type 2 diabetes.' },
  { id: 8, nameAr: 'ميزان حرارة بالأشعة تحت الحمراء', nameEn: 'Infrared Thermometer', category: 'equipment', brand: 'Braun', descAr: 'قياس حرارة فوري وبدون تلامس.', descEn: 'Instant non-contact temperature measurement.' },
  { id: 9, nameAr: 'أوميجا 3 زيت السمك', nameEn: 'Omega-3 Fish Oil', category: 'supplements', brand: 'Seven Seas', descAr: 'دعم صحة القلب والدماغ والمفاصل.', descEn: 'Support heart, brain, and joint health.' },
  { id: 10, nameAr: 'فنتولين بخاخ', nameEn: 'Ventolin Inhaler', category: 'chronic', brand: 'GSK', descAr: 'موسع للشعب الهوائية لعلاج الربو وضيق التنفس.', descEn: 'Bronchodilator for asthma and breathing difficulties.' },
];

const AIChat: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (messages.length === 0) setMessages([{role: 'bot', text: lang === 'ar' ? 'مرحباً بكم في أرجي الطبية. كيف نخدمكم اليوم؟' : 'Welcome to Argi Medical. How can we serve you today?'}]); 
  }, [lang]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) await window.aistudio.openSelectKey();
    }
    const userMsg = input;
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setIsLoading(true);
    try {
      // Create a new instance right before the call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: { systemInstruction: `You are a helpful assistant for Argi Medical Company Ltd. Provide accurate info about their pharmaceutical distribution and healthcare services in Sudan. Phone: +249912326210, +249112205191. Email: info@argimedical.com. Branches: Al-Managel, Atbara, Omdurman, Kassala. Language: ${lang}.` }
      });
      setMessages(prev => [...prev, {role: 'bot', text: response.text || ''}]);
    } catch (err: any) {
      if (err?.message?.includes("Requested entity was not found") && window.aistudio) {
        await window.aistudio.openSelectKey();
      }
      setMessages(prev => [...prev, {role: 'bot', text: lang === 'ar' ? 'عذراً، حدث خطأ في الاتصال.' : 'Sorry, a connection error occurred.'}]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen && (
        <div className="mb-4 w-[360px] md:w-[420px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-10">
          <div className="p-6 bg-[#00a896] text-white flex justify-between items-center">
            <div className="flex items-center gap-3"><Activity size={20} /><p className="font-bold text-sm tracking-tight uppercase">Support AI</p></div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/10 rounded-full"><X size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm ${m.role === 'user' ? 'bg-[#00a896] text-white rounded-tr-none shadow-md' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm border border-slate-100">
                  <Loader2 size={16} className="animate-spin text-[#00a896]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="..." className="flex-1 px-5 py-3 bg-slate-100 rounded-full text-sm outline-none" />
            <button onClick={handleSend} className="p-3 bg-[#00a896] text-white rounded-full hover:scale-105 transition-transform"><Send size={20} /></button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-[#00a896] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
        <MessageSquare size={30} />
      </button>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle?: string; centered?: boolean }> = ({ title, subtitle, centered = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00a896]/10 text-[#00a896] text-[10px] font-black uppercase tracking-widest mb-4 ${centered ? 'mx-auto' : ''}`}>
      <div className="w-1 h-1 rounded-full bg-[#00a896]"></div>
      {title}
    </div>
    {subtitle && <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">{subtitle}</h2>}
  </div>
);

// --- Component: ProductsPage ---
// Added onNavigate to props to fix line 449 error
const ProductsPage: React.FC<{ lang: 'ar' | 'en'; onNavigate: (page: Page) => void }> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(p => {
      const matchesSearch = 
        p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-700 min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <SectionHeader 
            title={isAr ? 'الكتالوج الطبي' : 'Medical Catalog'} 
            subtitle={isAr ? 'تصفح قائمة منتجاتنا المعتمدة' : 'Browse Our Certified Products'} 
            centered 
          />
          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg -mt-6">
            {isAr 
              ? 'نحن نوفر مجموعة واسعة من الأدوية والمستلزمات الطبية من أرقى الشركات العالمية لضمان أعلى معايير الرعاية الصحية في السودان.' 
              : 'We provide a wide range of medications and medical supplies from top global companies to ensure the highest standards of healthcare in Sudan.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-12 space-y-8">
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 flex items-center px-6 pointer-events-none text-slate-400 group-focus-within:text-[#00a896] transition-colors">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder={isAr ? 'ابحث عن منتج، علامة تجارية أو مادة فعالة...' : 'Search for product, brand or active ingredient...'}
              className="w-full py-6 px-16 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/40 outline-none focus:border-[#00a896] focus:ring-4 focus:ring-[#00a896]/5 transition-all text-lg font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {productCategories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all border ${
                  selectedCategory === cat.id 
                    ? 'bg-[#00a896] text-white border-[#00a896] shadow-xl shadow-[#00a896]/20' 
                    : 'bg-white text-slate-500 border-slate-100 hover:border-[#00a896]/40 shadow-sm'
                }`}
              >
                {cat.icon && <cat.icon size={18} />}
                {isAr ? cat.ar : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8 flex items-center justify-between">
           <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
             {isAr ? `تم العثور على ${filteredProducts.length} منتج` : `Found ${filteredProducts.length} products`}
           </p>
           <div className="h-[1px] flex-1 mx-8 bg-slate-100"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <div key={p.id} className="group bg-white rounded-[3.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white transition-all">
                  <Pill size={28} />
                </div>
                <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {p.brand}
                </span>
              </div>
              
              <h4 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-[#00a896] transition-colors">
                {isAr ? p.nameAr : p.nameEn}
              </h4>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                {productCategories.find(c => c.id === p.category)?.[lang === 'ar' ? 'ar' : 'en']}
              </p>
              
              <p className="text-slate-500 leading-relaxed font-medium mb-8">
                {isAr ? p.descAr : p.descEn}
              </p>
              
              <div className="flex gap-4 pt-6 border-t border-slate-50">
                <button className="flex-1 py-4 bg-[#00a896]/10 text-[#00a896] rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#00a896] hover:text-white transition-all">
                  {isAr ? 'التفاصيل' : 'Details'}
                </button>
                <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                  <Info size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[5rem] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 mx-auto mb-8">
               <Search size={40} />
            </div>
            <h4 className="text-3xl font-black text-slate-900 mb-4">{isAr ? 'لم يتم العثور على نتائج' : 'No Results Found'}</h4>
            <p className="text-slate-400 max-w-sm mx-auto">{isAr ? 'جرب البحث بكلمات مختلفة أو تغيير التصنيف.' : 'Try searching with different keywords or change the category.'}</p>
          </div>
        )}

        {/* Catalog Banner */}
        <div className="mt-32 p-12 lg:p-20 bg-slate-900 rounded-[5rem] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full opacity-10"><Globe size={800} className="absolute -right-20 -top-20" /></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left rtl:lg:text-right">
             <div className="space-y-6">
                <h3 className="text-5xl font-black leading-tight">
                  {isAr ? 'هل تبحث عن إمدادات خاصة؟' : 'Looking for Specific Supplies?'}
                </h3>
                <p className="text-xl text-white/60 font-medium">
                  {isAr 
                    ? 'فريق الخبراء لدينا جاهز لمساعدتك في توفير كافة احتياجاتك الطبية والدوائية.' 
                    : 'Our team of experts is ready to help you provide all your medical and pharmaceutical needs.'}
                </p>
             </div>
             <button 
               onClick={() => onNavigate('contact')}
               className="px-12 py-6 bg-[#00a896] text-white rounded-[2rem] font-black text-lg shadow-2xl hover:scale-105 transition-transform flex items-center gap-4"
             >
               {isAr ? 'اتصل بنا الآن' : 'Contact Us Now'} <MessageCircle size={24} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Pages ---

const HomePage = ({ lang, onNavigate }: { lang: 'ar' | 'en', onNavigate: (page: Page) => void }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  
  return (
    <div className="animate-in fade-in duration-1000 overflow-hidden">
      {/* 1. Enhanced Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-28 overflow-hidden bg-[#fafafa]">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#00a896]/10 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-200/50 rounded-full blur-[130px]"></div>
          <div className="absolute top-1/2 left-1/4 w-[2px] h-[300px] bg-gradient-to-b from-transparent via-[#00a896]/20 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white rounded-full shadow-xl shadow-slate-200/40 border border-slate-100 transform hover:scale-105 transition-all">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Partner" />
                  </div>
                ))}
              </div>
              <span className="text-[11px] font-black uppercase text-[#00a896] tracking-[0.2em]">
                {isAr ? 'موثوق من قبل 500+ صيدلية' : 'Trusted by 500+ Pharmacies'}
              </span>
            </div>
            
            <h1 className="text-7xl lg:text-9xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              {isAr ? <>الرعاية <span className="text-[#00a896]">المستدامة</span> للإمداد الطبي</> : <>Sustainable <span className="text-[#00a896]">Medical</span> Care</>}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl border-r-4 rtl:border-r-4 ltr:border-l-4 border-[#00a896] px-6 py-2">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <button onClick={() => onNavigate('products')} className="group px-12 py-6 bg-[#00a896] text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-[#00a896]/30 flex items-center gap-4 hover:scale-105 transition-all">
                {t.hero.cta} <ArrowRight size={24} className="group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
              </button>
              <button onClick={() => onNavigate('about')} className="px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-lg border border-slate-100 shadow-xl hover:bg-slate-50 transition-colors">
                {t.hero.secondaryCta}
              </button>
            </div>
          </div>
          
          <div className="relative group hidden lg:block">
            <div className="relative z-10 rounded-[6rem] overflow-hidden aspect-[4/5] shadow-2xl border-[12px] border-white transform rotate-2 hover:rotate-0 transition-all duration-700">
               <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover" alt="Healthcare Professional" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
               <div className="absolute bottom-10 left-10 right-10 p-8 glass-card rounded-[3rem] animate-float">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#00a896] rounded-2xl flex items-center justify-center text-white"><ShieldCheck size={28} /></div>
                    <div>
                      <p className="text-xs font-black uppercase text-slate-400 tracking-widest">{isAr ? 'الجودة المضمونة' : 'Certified Quality'}</p>
                      <p className="text-lg font-black text-slate-900">GMP & ISO Standard</p>
                    </div>
                  </div>
               </div>
            </div>
            {/* Background Decorative Shapes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00a896] rounded-full -z-10 opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-slate-900 rounded-[4rem] -z-10 opacity-5 rotate-45"></div>
          </div>
        </div>
      </section>

      {/* 2. Partners Marquee */}
      <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-[#00a896]">
            {isAr ? 'شركاء الإمداد العالميين' : 'Global Supply Partners'}
          </p>
        </div>
        <div className="flex gap-20 animate-marquee whitespace-nowrap">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center"><FlaskConical className="text-slate-400" /></div>
                <span className="text-2xl font-black text-slate-300 tracking-tighter uppercase">PHARMA_CORP_{i}</span>
             </div>
           ))}
           {[1,2,3,4,5,6].map(i => (
             <div key={`dup-${i}`} className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center"><FlaskConical className="text-slate-400" /></div>
                <span className="text-2xl font-black text-slate-300 tracking-tighter uppercase">PHARMA_CORP_{i}</span>
             </div>
           ))}
        </div>
      </section>

      {/* 3. Smart Logistics Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="aspect-square bg-[#00a896] rounded-[3.5rem] p-10 text-white flex flex-col justify-end shadow-2xl shadow-[#00a896]/20 group hover:-translate-y-2 transition-transform">
                       <Timer size={40} className="mb-6 opacity-40 group-hover:rotate-12 transition-transform" />
                       <p className="text-4xl font-black mb-2">24h</p>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{isAr ? 'توصيل فائق السرعة' : 'Ultra-Fast Delivery'}</p>
                    </div>
                    <div className="aspect-[4/5] bg-white rounded-[3.5rem] border border-slate-100 shadow-sm p-10 flex flex-col group hover:-translate-y-2 transition-transform">
                       <BarChart3 size={40} className="text-[#00a896] mb-6 opacity-40" />
                       <p className="text-3xl font-black text-slate-900 mb-2">Real-time</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'تتبع المخزون' : 'Stock Tracking'}</p>
                    </div>
                  </div>
                  <div className="space-y-6 pt-12">
                    <div className="aspect-[4/5] bg-white rounded-[3.5rem] border border-slate-100 shadow-sm p-10 flex flex-col group hover:-translate-y-2 transition-transform">
                       <Layers size={40} className="text-[#00a896] mb-6 opacity-40" />
                       <p className="text-3xl font-black text-slate-900 mb-2">Smart</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'سلسلة إمداد ذكية' : 'Supply Chain'}</p>
                    </div>
                    <div className="aspect-square bg-slate-900 rounded-[3.5rem] p-10 text-white flex flex-col justify-end group hover:-translate-y-2 transition-transform">
                       <Globe size={40} className="mb-6 opacity-40 group-hover:rotate-12 transition-transform" />
                       <p className="text-4xl font-black mb-2">Sudan</p>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{isAr ? 'تغطية شاملة' : 'Full Coverage'}</p>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="space-y-10">
               <SectionHeader 
                 title={isAr ? 'قوة اللوجستيات' : 'Logistics Excellence'} 
                 subtitle={isAr ? 'نظام توريد ذكي يواكب احتياجاتكم الطبية' : 'Smart supply systems that match your medical needs'} 
               />
               <p className="text-xl text-slate-500 font-medium leading-relaxed">
                 {isAr 
                   ? 'نحن لا نقوم بتوزيع الأدوية فحسب، بل ندير نظاماً لوجستياً متكاملاً يضمن وصول المنتجات الطبية الحيوية في ظروف مثالية وسرعة قياسية لخدمة المرضى في كافة الولايات.' 
                   : 'We don\'t just distribute medications; we manage an integrated logistics system that ensures vital medical products arrive in ideal conditions and record time to serve patients across all states.'}
               </p>
               <div className="space-y-6">
                  {[
                    { title: isAr ? 'تحكم ذكي في درجات الحرارة' : 'Cold Chain Management', desc: isAr ? 'ضمان سلامة الأدوية الحساسة' : 'Ensuring the safety of sensitive medications' },
                    { title: isAr ? 'أتمتة المخازن' : 'Warehouse Automation', desc: isAr ? 'دقة 100% في إدارة الطلبات' : '100% precision in order fulfillment' }
                  ].map((f, i) => (
                    <div key={i} className="flex gap-6 items-start">
                       <div className="w-10 h-10 rounded-full bg-[#00a896]/10 flex items-center justify-center text-[#00a896] flex-shrink-0 mt-1"><CheckCircle2 size={20} /></div>
                       <div>
                          <p className="text-lg font-black text-slate-900 mb-1">{f.title}</p>
                          <p className="text-slate-500 font-medium">{f.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <button onClick={() => onNavigate('services')} className="flex items-center gap-3 text-slate-900 font-black text-sm uppercase tracking-widest group">
                  {isAr ? 'اكتشف خدماتنا اللوجستية' : 'Explore our logistics'}
                  <div className="w-10 h-10 bg-[#00a896] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"><ChevronRight size={18} /></div>
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Advantages Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title={t.advantages.title} subtitle={t.advantages.subtitle} centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {t.advantages.items.map((item, i) => (
              <div key={i} className="group p-12 bg-white rounded-[4rem] border border-slate-100 hover:border-[#00a896]/30 hover:shadow-2xl hover:shadow-[#00a896]/10 transition-all duration-500">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-[#00a896] mb-10 group-hover:bg-[#00a896] group-hover:text-white transition-all duration-500 shadow-sm">
                  <item.icon size={36} />
                </div>
                <h4 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Metrics & Trust */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00a896] to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {t.about.stats.map((s, i) => (
            <div key={i} className="text-center md:text-left rtl:md:text-right space-y-4">
               <p className="text-6xl font-black text-white tracking-tighter">{s.value}</p>
               <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-6 h-0.5 bg-[#00a896]"></div>
                  <p className="text-[10px] font-black uppercase text-[#00a896] tracking-[0.4em]">{s.label}</p>
               </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CSS Animation for Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        [dir="rtl"] .animate-marquee {
          animation: marquee-rtl 40s linear infinite;
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
      `}</style>
    </div>
  );
};

const AboutPage: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [activeBranch, setActiveBranch] = useState<any>(null);

  return (
    <div className="pt-32 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.about.title} subtitle={t.about.subtitle} centered />
        
        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
             <div className="inline-block px-4 py-1.5 bg-[#00a896]/10 text-[#00a896] text-[10px] font-black uppercase tracking-widest rounded-full">
               {isAr ? 'قصة نجاح' : 'Our Story'}
             </div>
             <p className="text-4xl font-black text-slate-900 leading-tight">{t.about.intro}</p>
             <p className="text-xl text-slate-500 font-medium leading-relaxed">{t.about.description}</p>
          </div>
          <div className="relative rounded-[4rem] overflow-hidden aspect-[4/3] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Healthcare Excellence" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00a896]/30 to-transparent"></div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <div className="p-16 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
             <Target size={120} className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-500" />
             <div className="w-16 h-16 bg-[#00a896] rounded-2xl flex items-center justify-center mb-8"><Target size={32} /></div>
             <h3 className="text-4xl font-black mb-6">{isAr ? 'رسالتنا' : 'Our Mission'}</h3>
             <p className="text-xl opacity-80 leading-relaxed font-medium">{t.about.mission}</p>
          </div>
          <div className="p-16 rounded-[4rem] bg-[#00a896] text-white relative overflow-hidden group shadow-2xl">
             <Eye size={120} className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500" />
             <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8"><Eye size={32} /></div>
             <h3 className="text-4xl font-black mb-6">{isAr ? 'رؤيتنا' : 'Our Vision'}</h3>
             <p className="text-xl opacity-90 leading-relaxed font-medium">{t.about.vision}</p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-32">
           <h3 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-12">{isAr ? 'قيمنا الجوهرية' : 'Core Values'}</h3>
           <div className="grid md:grid-cols-3 gap-8">
              {t.about.values.map((v, i) => (
                <div key={i} className="p-12 bg-white border border-slate-100 rounded-[3rem] text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                   <div className="w-16 h-16 bg-[#00a896]/10 text-[#00a896] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00a896] group-hover:text-white transition-all">
                      <v.icon size={28} />
                   </div>
                   <h4 className="text-2xl font-black text-slate-900 mb-2">{v.title}</h4>
                   <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{v.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Network & Branches (Merged Section) */}
        <div className="p-12 lg:p-20 bg-slate-50 rounded-[5rem] overflow-hidden">
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
              <div>
                <div className="inline-block px-4 py-1.5 bg-[#00a896]/10 text-[#00a896] text-[10px] font-black uppercase tracking-widest rounded-full mb-4">{isAr ? 'التوسع الجغرافي' : 'Geographic Expansion'}</div>
                <h3 className="text-5xl font-black text-slate-900 leading-tight">{t.about.networkTitle}</h3>
              </div>
              <p className="text-xl text-slate-500 font-medium max-w-lg">
                {isAr ? 'نمتلك أسطولاً لوجستياً يضمن وصول الأدوية خلال أقل من 24 ساعة لكافة المناطق السودانية عبر شبكة فروعنا المتكاملة.' : 'Our logistics fleet ensures medication reaches all regions of Sudan within 24 hours through our integrated branch network.'}
              </p>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-4">
                 {t.about.branches.map((b, i) => (
                   <button key={i} onClick={() => setActiveBranch(b)} className="w-full p-8 bg-white border border-slate-100 rounded-[2.5rem] text-right rtl:text-right ltr:text-left hover:border-[#00a896] hover:shadow-xl transition-all group flex items-center justify-between">
                      <div>
                        <span className="px-3 py-1 bg-[#00a896]/10 text-[#00a896] rounded-full text-[9px] font-black uppercase tracking-widest mb-2 inline-block">{b.type}</span>
                        <h4 className="text-2xl font-black text-slate-900">{b.name}</h4>
                      </div>
                      <MapPin size={24} className="text-slate-200 group-hover:text-[#00a896] transition-colors" />
                   </button>
                 ))}
              </div>
              <div className="lg:col-span-2 relative h-[500px] lg:h-auto rounded-[4rem] overflow-hidden shadow-2xl bg-slate-900">
                <div className="absolute inset-0 opacity-10"><Globe size={600} className="absolute -right-20 -top-20 text-[#00a896]" /></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {activeBranch ? (
                    <div className="w-full h-full animate-in fade-in duration-500">
                       <iframe width="100%" height="100%" style={{ border: 0 }} title="Location Map" loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${activeBranch.lat},${activeBranch.lng}&z=14&hl=${lang}&output=embed`}></iframe>
                    </div>
                  ) : (
                    <div className="text-center p-12 text-white">
                       <div className="w-20 h-20 bg-[#00a896] rounded-[2rem] flex items-center justify-center mb-8 mx-auto shadow-2xl"><MapPin size={40} /></div>
                       <h4 className="text-3xl font-black mb-4">{isAr ? 'اختر فرعاً للمشاهدة' : 'Select a branch to view'}</h4>
                       <p className="text-white/40">{isAr ? 'اضغط على أي من الفروع لعرض الموقع الجغرافي' : 'Click on any branch to display the geographic location'}</p>
                    </div>
                  )}
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <div className="pt-32 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title="Expertise" subtitle={t.services.title} centered />
        <div className="grid lg:grid-cols-2 gap-12 mt-20">
          {t.services.items.map((s, i) => (
            <div key={i} className="group bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[21/9] overflow-hidden">
                <img src={s.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={s.title} />
              </div>
              <div className="p-12 flex flex-col md:flex-row gap-8">
                <div className="w-16 h-16 bg-[#00a896] rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-[#00a896]/20"><s.icon size={28} /></div>
                <div>
                  <h4 className="text-3xl font-black text-slate-900 mb-4">{s.title}</h4>
                  <p className="text-lg text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const isAr = lang === 'ar';
  return (
    <div className="pt-32 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-12">
           <SectionHeader title="Connect" subtitle={isAr ? 'تحدث مع خبرائنا' : 'Speak with our experts'} />
           <div className="space-y-8">
               <a href="mailto:info@argimedical.com" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white transition-all"><Mail size={32} /></div>
                  <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</p><p className="text-2xl font-black">info@argimedical.com</p></div>
               </a>
               <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-[#00a896]"><Phone size={32} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'أرقام التواصل' : 'Contact Numbers'}</p>
                    <p className="text-2xl font-black">+249 912 326 210</p>
                    <p className="text-2xl font-black">+249 112 205 191</p>
                  </div>
               </div>
               {/* WhatsApp Support Section */}
               <a href="https://wa.me/249912326210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm"><MessageCircle size={32} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'واتساب' : 'WhatsApp Support'}</p>
                    <p className="text-2xl font-black">+249 912 326 210</p>
                  </div>
               </a>
               <div className="p-10 bg-slate-900 text-white rounded-[4rem] shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-xl font-black mb-2">{isAr ? 'الموقع الإلكتروني' : 'Website'}</h4>
                    <p className="text-3xl font-black text-[#00a896]">www.argimedical.com</p>
                    <p className="mt-4 text-white/50 text-sm">{isAr ? 'نحن هنا لخدمتكم وتقديم أفضل حلول الرعاية الصحية.' : 'We are here to serve you and provide the best healthcare solutions.'}</p>
                  </div>
               </div>
           </div>
        </div>
        <div className="bg-white p-16 rounded-[5rem] border border-slate-100 shadow-2xl">
           <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              <div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الاسم' : 'Name'}</label><input type="text" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-[#00a896] transition-all" /></div>
              <div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'البريد الإلكتروني' : 'Email'}</label><input type="email" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-[#00a896] transition-all" /></div>
              <div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الرسالة' : 'Message'}</label><textarea rows={4} className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-[#00a896] transition-all resize-none"></textarea></div>
              <button className="w-full py-6 bg-[#00a896] text-white rounded-3xl font-black text-lg shadow-xl shadow-[#00a896]/20 hover:scale-[1.02] transition-transform">{isAr ? 'إرسال الرسالة' : 'Send Message'}</button>
           </form>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('ar');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, t.dir]);

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage lang={lang} onNavigate={setCurrentPage} />;
      case 'about': return <AboutPage lang={lang} />;
      case 'services': return <ServicesPage lang={lang} />;
      // Added setCurrentPage to fix ProductsPage internal navigation
      case 'products': return <ProductsPage lang={lang} onNavigate={setCurrentPage} />;
      case 'contact': return <ContactPage lang={lang} />;
      default: return <HomePage lang={lang} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen bg-white ${t.font} text-slate-900`}>
      <AIChat lang={lang} />
      
      {/* Header - Professionally Upgraded with Higher Visual Hierarchy */}
      <nav className={`fixed w-full z-50 transition-all duration-500 py-4 ${isScrolled || currentPage !== 'home' ? 'bg-white/90 backdrop-blur-2xl shadow-2xl shadow-slate-200/40 border-b border-slate-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-[#00a896] rounded-[1rem] flex items-center justify-center text-white shadow-xl shadow-[#00a896]/30 group-hover:scale-110 transition-transform duration-500">
                <Activity size={28} />
              </div>
              <div className="absolute -inset-1 bg-[#00a896]/20 rounded-[1.2rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-2xl tracking-tighter uppercase leading-none ${isScrolled || currentPage !== 'home' ? 'text-slate-900' : 'text-slate-900'}`}>ARGI <span className="text-[#00a896]">MEDICAL</span></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00a896]/60 mt-1.5">{lang === 'ar' ? 'للخدمات الطبية المحدودة' : 'MEDICAL SERVICES LTD'}</span>
            </div>
          </button>

          {/* Navigation Links with Advanced Indicators */}
          <div className="hidden lg:flex items-center space-x-12 rtl:space-x-reverse">
            {(Object.entries(t.nav) as [Page, string][]).map(([key, label]) => (
              <button 
                key={key} 
                onClick={() => setCurrentPage(key)} 
                className={`text-[12px] font-black uppercase tracking-[0.2em] transition-all relative group flex items-center gap-3 ${currentPage === key ? 'text-[#00a896]' : 'text-slate-500 hover:text-[#00a896]'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full bg-[#00a896] transition-all duration-500 ${currentPage === key ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-50'}`}></span>
                {label}
                <span className={`absolute -bottom-3 left-0 h-0.5 bg-[#00a896] transition-all duration-500 rounded-full ${currentPage === key ? 'w-full' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-50'}`}></span>
              </button>
            ))}
            
            {/* Language Switcher with Glass Effect */}
            <button 
              onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')} 
              className="flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase hover:bg-[#00a896] shadow-2xl hover:shadow-[#00a896]/40 transition-all transform active:scale-95 group"
            >
              <Globe size={16} className="group-hover:rotate-180 transition-transform duration-700" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-4 bg-slate-100 rounded-2xl text-slate-900 hover:bg-[#00a896] hover:text-white transition-all shadow-sm">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Professional Mobile Overlay */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-3xl border-b border-slate-100 overflow-hidden transition-all duration-500 shadow-2xl ${isMenuOpen ? 'max-h-[600px] opacity-100 py-10' : 'max-h-0 opacity-0 py-0'}`}>
          <div className="px-8 space-y-5">
            {(Object.entries(t.nav) as [Page, string][]).map(([key, label]) => (
              <button 
                key={key} 
                onClick={() => { setCurrentPage(key); setIsMenuOpen(false); }} 
                className={`block w-full text-right rtl:text-right ltr:text-left py-5 px-8 rounded-3xl font-black text-xl transition-all ${currentPage === key ? 'bg-[#00a896] text-white shadow-xl shadow-[#00a896]/20' : 'text-slate-900 hover:bg-slate-50'}`}
              >
                {label}
              </button>
            ))}
            <button 
              onClick={() => { setLang(prev => prev === 'en' ? 'ar' : 'en'); setIsMenuOpen(false); }} 
              className="w-full flex items-center justify-center gap-4 py-5 mt-6 bg-slate-900 text-white rounded-3xl font-black uppercase text-base shadow-xl"
            >
              <Globe size={20} />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </nav>

      <main>{renderPage()}</main>

      {/* Footer - Professionally Redesigned 4-Column Layout */}
      <footer className="relative bg-[#0b0f1a] pt-32 pb-16 overflow-hidden border-t border-white/5">
        {/* Advanced Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00a896]/40 to-transparent"></div>
        <div className="absolute -top-24 right-[-5%] w-[40%] h-[40%] bg-[#00a896]/5 rounded-full blur-[150px]"></div>
        <div className="absolute -bottom-24 left-[-5%] w-[30%] h-[30%] bg-[#00a896]/5 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
            
            {/* Column 1: Brand & Philosophy */}
            <div className="space-y-10">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-14 h-14 bg-[#00a896] rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-[#00a896]/20 group-hover:rotate-12 transition-transform duration-500">
                  <Activity size={32} />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter uppercase text-white">ARGI <span className="text-[#00a896]">Medical</span></span>
                  <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#00a896]/60">{lang === 'ar' ? 'التميز الدوائي' : 'PHARMA EXCELLENCE'}</span>
                </div>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                {lang === 'ar' 
                  ? 'رؤيتنا تتجاوز حدود التوزيع التقليدي؛ نحن نصنع المعيار الذهبي للرعاية الصحية والخدمات اللوجستية الطبية في السودان.' 
                  : 'Our vision transcends traditional distribution; we set the gold standard for healthcare and medical logistics in Sudan.'}
              </p>
              <div className="flex gap-4">
                {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#00a896] hover:border-[#00a896] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00a896]/20 transition-all duration-500 group">
                    <Icon size={22} className="group-hover:scale-110 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Discovery */}
            <div className="space-y-10">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-10 h-0.5 bg-[#00a896] rounded-full"></span>
                {lang === 'ar' ? 'استكشف المزيد' : 'Quick Navigation'}
              </h4>
              <ul className="space-y-6">
                {(Object.entries(t.nav) as [Page, string][]).map(([key, label]) => (
                  <li key={key}>
                    <button onClick={() => setCurrentPage(key)} className="text-slate-400 hover:text-[#00a896] font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-4 group">
                      <ArrowRight size={14} className="text-[#00a896] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Communication Center */}
            <div className="space-y-10">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-10 h-0.5 bg-[#00a896] rounded-full"></span>
                {lang === 'ar' ? 'مركز التواصل' : 'Direct Support'}
              </h4>
              <ul className="space-y-8">
                <li className="flex items-start gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#00a896] flex-shrink-0 group-hover:bg-[#00a896] group-hover:text-white transition-all duration-500 shadow-lg"><Mail size={22} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{lang === 'ar' ? 'المراسلات' : 'Official Correspondence'}</p>
                    <a href="mailto:info@argimedical.com" className="text-white font-black text-sm hover:text-[#00a896] transition-colors tracking-wide">info@argimedical.com</a>
                  </div>
                </li>
                {/* Footer WhatsApp Link */}
                <li className="flex items-start gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-green-500 flex-shrink-0 group-hover:bg-green-500 group-hover:text-white transition-all duration-500 shadow-lg"><MessageCircle size={22} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{lang === 'ar' ? 'واتساب' : 'WhatsApp Support'}</p>
                    <a href="https://wa.me/249912326210" target="_blank" rel="noopener noreferrer" className="text-white font-black text-sm hover:text-green-500 transition-colors tracking-wide">+249 912 326 210</a>
                  </div>
                </li>
                <li className="flex items-start gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#00a896] flex-shrink-0 group-hover:bg-[#00a896] group-hover:text-white transition-all duration-500 shadow-lg"><Phone size={22} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{lang === 'ar' ? 'الخط المباشر' : 'Emergency Hotline'}</p>
                    <div className="space-y-1">
                      <p className="text-white font-black text-sm tracking-[0.1em]">+249 912 326 210</p>
                      <p className="text-white font-black text-sm tracking-[0.1em]">+249 112 205 191</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 4: Operational Hub */}
            <div className="space-y-10">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-10 h-0.5 bg-[#00a896] rounded-full"></span>
                {lang === 'ar' ? 'الموقع التشغيلي' : 'Operational Hub'}
              </h4>
              <div className="relative group overflow-hidden p-8 bg-white/5 border border-white/10 rounded-[2.5rem] transition-all duration-500 hover:bg-white/[0.08] hover:border-[#00a896]/30">
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center gap-4 text-white">
                    <div className="p-2 bg-[#00a896]/20 rounded-lg text-[#00a896]"><MapPin size={20} /></div>
                    <span className="font-black text-sm uppercase tracking-widest">{lang === 'ar' ? 'السودان - أم درمان' : 'Sudan - Omdurman'}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {lang === 'ar' 
                      ? 'المنطقة الصناعية، المجمع الطبي اللوجستي المتكامل.' 
                      : 'Industrial Area, Integrated Medical Logistics Complex.'}
                  </p>
                  <button onClick={() => setCurrentPage('about')} className="flex items-center gap-3 text-[#00a896] font-black text-[10px] uppercase tracking-widest group/btn hover:gap-5 transition-all">
                    {lang === 'ar' ? 'عرض على الخريطة' : 'View on Map'}
                    <ChevronRight size={14} />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a896]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar with Health Status Indicator */}
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.3em]">
                &copy; {new Date().getFullYear()} ARGI MEDICAL COMPANY LTD. SUDAN. ALL RIGHTS RESERVED.
              </p>
            </div>
            
            {/* Professional Status Indicator */}
            <div className="flex items-center gap-4 px-8 py-3 bg-white/5 rounded-full border border-white/5 group hover:border-[#00a896]/30 transition-all duration-500">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                {lang === 'ar' ? 'نظام الإمداد الطبي نشط' : 'Medical Logistics Secure'}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
