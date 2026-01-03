
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
  Microscope,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Check,
  LogIn,
  UserPlus,
  Lock,
  User,
  EyeOff,
  ArrowLeft,
  History,
  Rocket,
  Compass,
  Calendar,
  Share2,
  Clock,
  ArrowUpRight,
  Database,
  Network,
  ChevronDown,
  Tag
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

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'auth' | 'news';

const translations = {
  en: {
    dir: 'ltr',
    font: 'font-sans',
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      news: 'News',
      products: 'Catalog',
      contact: 'Contact Us',
    },
    auth: {
      login: 'Login',
      signup: 'Register',
      welcomeBack: 'Welcome Back',
      joinUs: 'Join Argi Medical',
      email: 'Email Address',
      password: 'Password',
      fullName: 'Full Name',
      pharmacyName: 'Pharmacy Name',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember Me',
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      createAccount: 'Create Account',
      signIn: 'Sign In',
      agreement: 'I agree to the terms and privacy policy',
      switchLogin: 'Back to Login',
      switchSignup: 'Create new account'
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
      subtitle: 'Legacy of Excellence',
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
      title: 'Strategic Services',
      subtitle: 'Empowering Sudan\'s Healthcare Ecosystem',
      items: [
        { 
          title: 'Nationwide Distribution', 
          desc: 'Our expansive logistics network bridges the gap between pharmaceutical manufacturers and every pharmacy across Sudan, ensuring timely access to life-saving treatments.', 
          icon: Truck, 
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
          features: ['GPS Fleet Tracking', '18-State Coverage', '24h Delivery Cycles']
        },
        { 
          title: 'Cold Chain Excellence', 
          desc: 'Specialized end-to-end temperature management for biologicals and vaccines, maintaining strict potency and efficacy throughout the transit process.', 
          icon: Thermometer, 
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
          features: ['WHO Standards', 'Backup Cooling Systems', 'Real-time Telemetry']
        },
        { 
          title: 'Pharmacy Solutions', 
          desc: 'We operate modern pharmacy outlets providing expert consultation and high-standard patient care, backed by our professional medical team.', 
          icon: Building2, 
          image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800',
          features: ['Qualified Pharmacists', 'Digital Records', 'Health Counseling']
        },
        { 
          title: 'Inventory Analytics', 
          desc: 'Advanced inventory management systems that predict demand and optimize stock levels for our partners, minimizing shortages and expiration risks.', 
          icon: BarChart3, 
          image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800',
          features: ['AI Forecasting', 'FIFO Protocols', 'Cloud Inventory']
        }
      ]
    },
    news: {
      title: 'Argi Insight',
      subtitle: 'Updates & Medical Advancements',
      readMore: 'Read Full Article',
      categories: ['All', 'Corporate', 'Health', 'Supply Chain']
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
      news: 'الأخبار',
      products: 'المنتجات',
      contact: 'اتصل بنا',
    },
    auth: {
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      welcomeBack: 'مرحباً بعودتك',
      joinUs: 'انضم إلى أرجي الطبية',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      fullName: 'الاسم الكامل',
      pharmacyName: 'اسم الصيدلية / المركز',
      forgotPassword: 'نسيت كلمة المرور؟',
      rememberMe: 'تذكرني',
      noAccount: 'ليس لديك حساب؟',
      hasAccount: 'لديك حساب بالفعل؟',
      createAccount: 'إنشاء الحساب',
      signIn: 'دخول',
      agreement: 'أوافق على الشروط وسياسة الخصوصية',
      switchLogin: 'العودة لتسجيل الدخول',
      switchSignup: 'إنشاء حساب جديد'
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
      subtitle: 'إرث من التميز الطبي',
      intro: 'تعتبر شركة أرجي الطبية المحدودة ركيزة أساسية للموثوقية الدوائية في السودان. نحن متخصصون في توزيع الأدوية المنقذة للحياة والمعدات الطبية، ونعمل كحلقة وصل حيوية بين الابتكارات الدوائية العالمية والاحتياجات الصحية المحلية.',
      description: 'تأسست أرجي الطبية بالتزام راسخ تجاه العدالة الصحية، ونمت لتصبح رائدة على مستوى البلاد. تُبنى عملياتنا على أساس من النزاهة، لضمان وصول العلاجات الضرورية إلى كافة ربوع السودان.',
      mission: 'توفير أدوية عالية الجودة وخدمات رعاية صحية استثنائية للمجتمع السوداني من خلال كفاءة التوزيع والخدمات الطبية.',
      vision: 'أن نكون الشركة الرائدة في مجال توزيع الأدوية وتوفير الخدمات الصيدلانية في السودان، واضعين المعيار الذهبي للخدمات اللوجستية الصحية.',
      values: [
        { title: 'الثقة المطلقة', icon: ShieldCheck, desc: 'موثوقية في كل شحنة.' },
        { title: 'جودة المعايير', icon: Award, desc: 'التزام بالمعايير العالمية.' },
        { title: 'المهنية الفائقة', icon: BriefcaseMedical, desc: 'خبرة في الإمداد الطبي.' }
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
      title: 'الخدمات الاستراتيجية',
      subtitle: 'تمكين منظومة الرعاية الصحية في السودان',
      items: [
        { 
          title: 'توزيع الأدوية الشامل', 
          desc: 'شبكة لوجستية ضخمة تربط المصنعين بكافة الصيدليات في السودان، لضمان توفير الأدوية المنقذة للحياة في الوقت المناسب.', 
          icon: Truck, 
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
          features: ['تتبع الأسطول بالـ GPS', 'تغطية 18 ولاية', 'دورات توصيل خلال 24 ساعة']
        },
        { 
          title: 'سلسلة التبريد المتقدمة', 
          desc: 'إدارة متخصصة لدرجات الحرارة من البداية للنهاية للأدوية الحيوية واللقاحات، للحفاظ على فعاليتها المطلقة.', 
          icon: Thermometer, 
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
          features: ['معايير الصحة العالمية', 'أنظمة تبريد احتياطية', 'مراقبة فورية للمناخ']
        },
        { 
          title: 'إدارة الصيدليات والخدمات الطبية', 
          desc: 'ندير صيدليات حديثة تقدم استشارات طبية متخصصة ورعاية فائقة للمرضى، مدعومة بفريق طبي محترف.', 
          icon: Building2, 
          image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800',
          features: ['صيادلة مؤهلون', 'سجلات رقمية', 'استشارات صحية مجانية']
        },
        { 
          title: 'تحليل وإدارة المخزون', 
          desc: 'أنظمة ذكية للتنبؤ بالطلب وتحسين مستويات المخزون للشركاء، لتقليل مخاطر النقص أو انتهاء الصلاحية.', 
          icon: BarChart3, 
          image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800',
          features: ['تنبؤ بالذكاء الاصطناعي', 'بروتوكولات FIFO', 'إدارة سحابية']
        }
      ]
    },
    news: {
      title: 'رؤى أرجي',
      subtitle: 'آخر التطورات والمستجدات الطبية',
      readMore: 'اقرأ المقال بالكامل',
      categories: ['الكل', 'أخبار الشركة', 'الصحة العامة', 'سلسلة التوريد']
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

// --- News Data ---
const newsArticles = [
  {
    id: 1,
    titleAr: 'توسيع أسطول النقل المبرد في ولاية الجزيرة',
    titleEn: 'Expanding the Cold-Chain Fleet in Gezira State',
    date: '2024-05-15',
    categoryAr: 'أخبار الشركة',
    categoryEn: 'Corporate',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    descAr: 'أعلنت أرجي الطبية عن إضافة 10 شاحنات مجهزة بأحدث تقنيات التبريد لخدمة المراكز الطبية في ولاية الجزيرة.',
    descEn: 'Argi Medical announced the addition of 10 trucks equipped with the latest cooling technologies to serve medical centers in Gezira.'
  },
  {
    id: 2,
    titleAr: 'ندوة عن الابتكار في سلاسل الإمداد الدوائي',
    titleEn: 'Seminar on Innovation in Pharmaceutical Supply Chains',
    date: '2024-05-10',
    categoryAr: 'سلسلة التوريد',
    categoryEn: 'Supply Chain',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    descAr: 'شاركت الشركة في المنتدى الوطني للصيدلة لعرض حلولها الرقمية الجديدة في إدارة المخزون وتتبع الشحنات.',
    descEn: 'The company participated in the National Pharmacy Forum to showcase its new digital solutions in inventory management.'
  },
  {
    id: 3,
    titleAr: 'أهمية التطعيمات الموسمية وكيفية الحفاظ عليها',
    titleEn: 'Importance of Seasonal Vaccinations and Maintenance',
    date: '2024-05-05',
    categoryAr: 'الصحة العامة',
    categoryEn: 'Health',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    descAr: 'مقال توعوي حول دور سلسلة التبريد في الحفاظ على فعالية اللقاحات الموسمية لضمان أقصى حماية للمجتمع.',
    descEn: 'An awareness article about the role of the cold chain in maintaining the effectiveness of seasonal vaccines.'
  },
  {
    id: 4,
    titleAr: 'شراكة جديدة مع شركات أدوية عالمية لتعزيز المخزون',
    titleEn: 'New Partnership with Global Pharma Companies',
    date: '2024-04-28',
    categoryAr: 'أخبار الشركة',
    categoryEn: 'Corporate',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800',
    descAr: 'وقعت أرجي الطبية اتفاقية توزيع حصرية مع 3 علامات تجارية عالمية لتوفير أدوية الأمراض المزمنة في السودان.',
    descEn: 'Argi Medical signed an exclusive distribution agreement with 3 global brands to provide chronic disease medications.'
  }
];

// --- Product Taxonomy ---
const productMainCategories = [
  { id: 'pharma', ar: 'الأدوية والمستحضرات', en: 'Pharmaceuticals', icon: Pill },
  { id: 'equipment', ar: 'المعدات والأجهزة الطبية', en: 'Medical Equipment', icon: Microscope },
];

const subCategories: Record<string, { id: string; ar: string; en: string; icon: any }[]> = {
  pharma: [
    { id: 'antibiotics', ar: 'المضادات الحيوية', en: 'Antibiotics', icon: Pill },
    { id: 'chronic', ar: 'أدوية الأمراض المزمنة', en: 'Chronic Care', icon: Activity },
    { id: 'vaccines', ar: 'اللقاحات والأمصال', en: 'Vaccines', icon: Syringe },
    { id: 'supplements', ar: 'المكملات الغذائية', en: 'Supplements', icon: FlaskConical },
  ],
  equipment: [
    { id: 'diagnostic', ar: 'أجهزة التشخيص', en: 'Diagnostic Tools', icon: Activity },
    { id: 'surgical', ar: 'أدوات جراحية', en: 'Surgical Instruments', icon: BriefcaseMedical },
    { id: 'personal_care', ar: 'أجهزة الرعاية الشخصية', en: 'Personal Care', icon: Heart },
  ]
};

interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  mainCategory: 'pharma' | 'equipment';
  subCategory: string;
  brand: string;
  price: string;
  descAr: string;
  descEn: string;
  detailsAr?: string;
  detailsEn?: string;
  dosage?: string;
}

const mockProducts: Product[] = [
  // Pharma
  { 
    id: 1, nameAr: 'أموكسيسيلين 500 ملجم', nameEn: 'Amoxicillin 500mg', mainCategory: 'pharma', subCategory: 'antibiotics', brand: 'GSK', price: '4,500 SDG',
    descAr: 'مضاد حيوي واسع المدى لعلاج العدوى البكتيرية.', descEn: 'Broad-spectrum antibiotic for bacterial infections.',
    detailsAr: 'يستخدم لعلاج مجموعة متنوعة من الالتهابات البكتيرية مثل التهاب الأذن والأنف والحنجرة والتعابات المسالك البولية. يعتبر من الأدوية الأساسية في الصيدليات.',
    dosage: '500mg - 3 times daily'
  },
  { id: 2, nameAr: 'إنسولين جلارجين', nameEn: 'Insulin Glargine', mainCategory: 'pharma', subCategory: 'chronic', brand: 'Sanofi', price: '12,000 SDG', descAr: 'إنسولين طويل المفعول للتحكم في سكر الدم.', descEn: 'Long-acting insulin for blood sugar control.', detailsAr: 'حقن إنسولين تحت الجلد لمرضى السكري من النوع الأول والثاني.' },
  { id: 3, nameAr: 'لقاح الإنفلونزا الموسمية', nameEn: 'Influenza Vaccine', mainCategory: 'pharma', subCategory: 'vaccines', brand: 'Pfizer', price: '8,500 SDG', descAr: 'لقاح وقائي ضد فيروسات الإنفلونزا الشائعة.', descEn: 'Preventative vaccine against common flu strains.' },
  { id: 6, nameAr: 'أوجمنتين 1 جم', nameEn: 'Augmentin 1g', mainCategory: 'pharma', subCategory: 'antibiotics', brand: 'GSK', price: '6,200 SDG', descAr: 'مزيج من المضادات الحيوية لعلاج العدوى المقاومة.', descEn: 'Antibiotic combination for resistant infections.' },
  { id: 7, nameAr: 'ميتفورمين 850 ملجم', nameEn: 'Metformin 850mg', mainCategory: 'pharma', subCategory: 'chronic', brand: 'Merck', price: '3,800 SDG', descAr: 'علاج أساسي لمرض السكري من النوع الثاني.', descEn: 'Primary treatment for type 2 diabetes.' },
  { id: 10, nameAr: 'فنتولين بخاخ', nameEn: 'Ventolin Inhaler', mainCategory: 'pharma', subCategory: 'chronic', brand: 'GSK', price: '5,500 SDG', descAr: 'موسع للشعب الهوائية لعلاج الربو وضيق التنفس.', descEn: 'Bronchodilator for asthma and breathing difficulties.' },
  
  // Equipment
  { id: 4, nameAr: 'جهاز قياس ضغط الدم الرقمي', nameEn: 'Digital BP Monitor', mainCategory: 'equipment', subCategory: 'diagnostic', brand: 'Omron', price: '25,000 SDG', descAr: 'جهاز دقيق وسهل الاستخدام لقياس ضغط الدم.', descEn: 'Accurate and easy-to-use blood pressure monitor.' },
  { id: 8, nameAr: 'ميزان حرارة بالأشعة تحت الحمراء', nameEn: 'Infrared Thermometer', mainCategory: 'equipment', subCategory: 'diagnostic', brand: 'Braun', price: '18,500 SDG', descAr: 'قياس حرارة فوري وبدون تلامس.', descEn: 'Instant non-contact temperature measurement.' },
  { id: 11, nameAr: 'جهاز قياس نبضات القلب السحابي', nameEn: 'Pulse Oximeter Pro', mainCategory: 'equipment', subCategory: 'diagnostic', brand: 'Beurer', price: '14,000 SDG', descAr: 'قياس مستوى الأكسجين في الدم بدقة عالية.', descEn: 'High-precision oxygen level monitoring.' },
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
            {isLoading && (<div className="flex justify-start"><div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm border border-slate-100"><Loader2 size={16} className="animate-spin text-[#00a896]" /></div></div>)}
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

// --- Component: AuthPage ---
const AuthPage: React.FC<{ lang: 'ar' | 'en', initialMode?: 'login' | 'signup', onNavigate: (page: Page) => void }> = ({ lang, initialMode = 'login', onNavigate }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6 relative overflow-hidden bg-slate-50/50">
      <div className={`absolute top-0 right-0 w-[60%] h-[60%] transition-colors duration-1000 rounded-full blur-[120px] -z-10 ${mode === 'login' ? 'bg-[#00a896]/5' : 'bg-slate-900/5'}`}></div>
      <div className={`absolute bottom-0 left-0 w-[50%] h-[50%] transition-colors duration-1000 rounded-full blur-[100px] -z-10 ${mode === 'login' ? 'bg-slate-200/50' : 'bg-[#00a896]/10'}`}></div>
      <div className={`w-full max-w-6xl bg-white rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden flex flex-col md:flex-row transition-all duration-700 ${mode === 'signup' ? 'md:flex-row-reverse' : ''}`}>
        <div className={`md:w-[45%] p-16 text-white flex flex-col justify-between relative overflow-hidden transition-colors duration-700 ${mode === 'login' ? 'bg-[#00a896]' : 'bg-slate-900'}`}>
           <div className="absolute top-0 left-0 w-full h-full opacity-10"><Globe size={600} className="absolute -left-20 -top-20 animate-pulse" /></div>
           <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl transition-all duration-700 ${mode === 'login' ? 'bg-white/20' : 'bg-[#00a896]'}`}>
                 {mode === 'login' ? <ShieldCheck size={32} /> : <UserPlus size={32} />}
              </div>
              <h2 className="text-5xl font-black mb-6 tracking-tighter leading-none animate-in slide-in-from-bottom-5">{mode === 'login' ? t.auth.welcomeBack : t.auth.joinUs}</h2>
              <p className="text-xl text-white/70 font-medium leading-relaxed max-w-xs">{mode === 'login' ? (isAr ? 'قم بتسجيل الدخول للوصول إلى طلباتك وإدارة مخزونك الطبي بكل سهولة.' : 'Log in to access your orders and manage your medical inventory with ease.') : (isAr ? 'انضم إلى شبكة موردينا المعتمدين وابدأ في تأمين احتياجاتك الدوائية بأفضل المعايير.' : 'Join our certified supplier network and start securing your pharmaceutical needs.')}</p>
           </div>
           <div className="relative z-10 pt-12 space-y-6">
              <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md"><div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"><CheckCircle2 size={24} className="text-white" /></div><div><p className="text-sm font-black uppercase tracking-widest">{isAr ? 'موثوقية كاملة' : 'Full Reliability'}</p><p className="text-xs text-white/50">{isAr ? 'نظام توريد آمن ومعتمد' : 'Secure and certified system'}</p></div></div>
           </div>
        </div>
        <div className="md:w-[55%] p-12 lg:p-20 bg-white relative">
           <div className="mb-12 flex justify-between items-start"><div><h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">{mode === 'login' ? t.auth.login : t.auth.signup}</h3><p className="text-slate-400 font-medium">{mode === 'login' ? t.auth.noAccount : t.auth.hasAccount}<button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="mx-2 text-[#00a896] font-black border-b-2 border-[#00a896]/20 hover:border-[#00a896] transition-all">{mode === 'login' ? t.auth.signup : t.auth.login}</button></p></div><button onClick={() => onNavigate('home')} className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all group"><ArrowLeft size={20} className="rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" /></button></div>
           <form className="space-y-6 animate-in fade-in duration-700" onSubmit={e => e.preventDefault()}>{mode === 'signup' && (<div className="grid md:grid-cols-2 gap-6"><div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{t.auth.fullName}</label><div className="relative"><User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} /><input type="text" placeholder="..." className="w-full py-5 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-[#00a896] focus:ring-4 focus:ring-[#00a896]/5 transition-all font-medium" /></div></div><div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{t.auth.pharmacyName}</label><div className="relative"><Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} /><input type="text" placeholder="..." className="w-full py-5 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-[#00a896] focus:ring-4 focus:ring-[#00a896]/5 transition-all font-medium" /></div></div></div>)}<div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{t.auth.email}</label><div className="relative"><Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} /><input type="email" placeholder="example@mail.com" className="w-full py-5 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-[#00a896] focus:ring-4 focus:ring-[#00a896]/5 transition-all font-medium" /></div></div><div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{t.auth.password}</label><div className="relative"><Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} /><input type="password" placeholder="••••••••" className="w-full py-5 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-[#00a896] focus:ring-4 focus:ring-[#00a896]/5 transition-all font-medium" /></div></div><div className="flex items-center justify-between py-2">{mode === 'login' ? (<label className="flex items-center gap-3 cursor-pointer group"><div className="w-6 h-6 border-2 border-slate-200 rounded-lg flex items-center justify-center group-hover:border-[#00a896] transition-all"><input type="checkbox" className="hidden peer" /><Check size={14} className="text-[#00a896] opacity-0 peer-checked:opacity-100" /></div><span className="text-sm font-bold text-slate-500">{t.auth.rememberMe}</span></label>) : (<label className="flex items-center gap-3 cursor-pointer group"><div className="w-6 h-6 border-2 border-slate-200 rounded-lg flex items-center justify-center group-hover:border-[#00a896] transition-all flex-shrink-0"><input type="checkbox" className="hidden peer" /><Check size={14} className="text-[#00a896] opacity-0 peer-checked:opacity-100" /></div><span className="text-xs font-bold text-slate-400 leading-relaxed">{t.auth.agreement}</span></label>)}{mode === 'login' && <button className="text-sm font-black text-[#00a896] hover:underline">{t.auth.forgotPassword}</button>}</div><button className={`w-full py-6 rounded-[2rem] font-black text-lg shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group mt-4 ${mode === 'login' ? 'bg-slate-900 text-white shadow-slate-900/20' : 'bg-[#00a896] text-white shadow-[#00a896]/20'}`}>{mode === 'login' ? t.auth.signIn : t.auth.createAccount}<ArrowRight size={22} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" /></button></form>
        </div>
      </div>
    </div>
  );
};

// --- Component: ProductsPage (Redesigned) ---
const ProductsPage: React.FC<{ lang: 'ar' | 'en'; onNavigate: (page: Page) => void }> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [mainCategory, setMainCategory] = useState<'pharma' | 'equipment'>('pharma');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQty, setModalQty] = useState(1);
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const activeSubCategories = subCategories[mainCategory];

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(p => {
      const matchesSearch = p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMain = p.mainCategory === mainCategory;
      const matchesSub = selectedSubCategory === 'all' || p.subCategory === selectedSubCategory;
      return matchesSearch && matchesMain && matchesSub;
    });
  }, [searchQuery, mainCategory, selectedSubCategory]);

  const addToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      return [...prev, { product, quantity: qty }];
    });
    setNotification(isAr ? `تمت إضافة ${product.nameAr} للسلة` : `Added ${product.nameEn} to basket`);
    setTimeout(() => setNotification(null), 3000);
    setSelectedProduct(null);
    setModalQty(1);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const updateCartQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => 
      item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#fafafa]">
      {/* Floating Cart */}
      <button onClick={() => setIsCartOpen(true)} className="fixed bottom-28 right-6 z-50 w-16 h-16 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border border-white/10">
        <ShoppingCart size={28} />
        {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-[#00a896] text-white text-[10px] font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">{cart.reduce((s, i) => s + i.quantity, 0)}</span>}
      </button>

      {/* Toast Notification */}
      {notification && <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 bg-[#00a896] text-white rounded-3xl shadow-2xl font-black text-sm flex items-center gap-3 animate-in slide-in-from-top-10"><Check size={20} />{notification}</div>}

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionHeader title={isAr ? 'الكتالوج الطبي' : 'Medical Catalog'} subtitle={isAr ? 'تصفح قائمة منتجاتنا المعتمدة' : 'Browse Our Certified Products'} centered />
        </div>

        <div className="flex justify-center mb-16">
           <div className="bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100 flex gap-2">
              {productMainCategories.map((cat) => (
                <button key={cat.id} onClick={() => { setMainCategory(cat.id as any); setSelectedSubCategory('all'); }} className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all ${mainCategory === cat.id ? 'bg-[#00a896] text-white shadow-xl shadow-[#00a896]/20' : 'text-slate-400 hover:text-slate-600'}`}><cat.icon size={22} />{isAr ? cat.ar : cat.en}</button>
              ))}
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <aside className="w-full lg:w-80 space-y-8 sticky top-32">
             <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00a896] transition-colors" size={20} />
                <input type="text" placeholder={isAr ? 'بحث سريع...' : 'Quick search...'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full py-5 pl-16 pr-6 bg-white border border-slate-100 rounded-3xl shadow-sm outline-none focus:border-[#00a896] transition-all font-medium" />
             </div>
             <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-6"><h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">{isAr ? 'تصنيفات فرعية' : 'Categories'}</h4><div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center"><Filter size={14} className="text-slate-300" /></div></div>
                <div className="space-y-2">
                   <button onClick={() => setSelectedSubCategory('all')} className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all group ${selectedSubCategory === 'all' ? 'bg-[#00a896] text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600'}`}><span className="font-black text-sm">{isAr ? 'كل الفئات' : 'All Categories'}</span><ChevronRight size={16} className={selectedSubCategory === 'all' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} /></button>
                   {activeSubCategories.map((sub) => (<button key={sub.id} onClick={() => setSelectedSubCategory(sub.id)} className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all group ${selectedSubCategory === sub.id ? 'bg-[#00a896] text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600'}`}><div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${selectedSubCategory === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-[#00a896]/10 group-hover:text-[#00a896]'}`}><sub.icon size={16} /></div><span className="font-black text-sm flex-1 text-right rtl:text-right ltr:text-left">{isAr ? sub.ar : sub.en}</span></button>))}
                </div>
             </div>
          </aside>

          <div className="flex-1">
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <div key={p.id} onClick={() => setSelectedProduct(p)} className="group bg-white rounded-[4rem] border border-slate-100 p-10 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col relative cursor-pointer">
                     <div className="absolute top-10 right-10 flex gap-2"><span className="px-4 py-2 bg-slate-50 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest group-hover:bg-[#00a896]/10 group-hover:text-[#00a896] transition-colors">{p.brand}</span></div>
                     <div className="w-20 h-20 bg-[#fafafa] rounded-[2.5rem] flex items-center justify-center text-[#00a896] mb-10 group-hover:bg-[#00a896] group-hover:text-white transition-all duration-700 shadow-sm">{p.mainCategory === 'pharma' ? <Pill size={40} /> : <Microscope size={40} />}</div>
                     <div className="flex-1 space-y-4">
                        <h4 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-[#00a896] transition-colors">{isAr ? p.nameAr : p.nameEn}</h4>
                        <p className="text-slate-500 font-medium leading-relaxed line-clamp-2">{isAr ? p.descAr : p.descEn}</p>
                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                           <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'السعر المقترح' : 'Retail Price'}</p><p className="text-2xl font-black text-slate-900 tracking-tighter">{p.price}</p></div>
                           <div className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-[9px] font-black flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>{isAr ? 'متوفر' : 'In Stock'}</div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal with Quantity */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
           <div className="bg-white w-full max-w-4xl rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in slide-in-from-bottom-10">
              <button onClick={() => { setSelectedProduct(null); setModalQty(1); }} className="absolute top-8 right-8 z-10 p-3 bg-slate-100 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"><X size={24} /></button>
              <div className="md:w-2/5 bg-slate-50 p-12 flex flex-col items-center justify-center">
                 <div className="w-40 h-40 bg-white rounded-[3.5rem] shadow-xl flex items-center justify-center text-[#00a896] mb-8">{selectedProduct.mainCategory === 'pharma' ? <Pill size={80} /> : <Microscope size={80} />}</div>
                 <span className="px-6 py-2 bg-[#00a896]/10 text-[#00a896] rounded-full text-[10px] font-black uppercase tracking-widest">{selectedProduct.brand}</span>
              </div>
              <div className="md:w-3/5 p-12 lg:p-16 space-y-8">
                 <h3 className="text-4xl font-black text-slate-900 leading-tight">{isAr ? selectedProduct.nameAr : selectedProduct.nameEn}</h3>
                 <p className="text-lg text-slate-500 leading-relaxed font-medium">{isAr ? (selectedProduct.detailsAr || selectedProduct.descAr) : (selectedProduct.detailsEn || selectedProduct.descEn)}</p>
                 <div className="flex items-center justify-between p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'السعر الإجمالي' : 'Total Price'}</p><p className="text-3xl font-black text-slate-900">{selectedProduct.price}</p></div>
                    <div className="flex items-center bg-white rounded-2xl p-2 border border-slate-100 shadow-sm">
                       <button onClick={() => setModalQty(m => Math.max(1, m - 1))} className="p-3 text-slate-400 hover:text-[#00a896] transition-colors"><Minus size={18} /></button>
                       <span className="px-6 text-xl font-black text-slate-900">{modalQty}</span>
                       <button onClick={() => setModalQty(m => m + 1)} className="p-3 text-slate-400 hover:text-[#00a896] transition-colors"><Plus size={18} /></button>
                    </div>
                 </div>
                 <button onClick={() => addToCart(selectedProduct, modalQty)} className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-lg shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 hover:bg-[#00a896] transition-all"><ShoppingCart size={24} />{isAr ? 'إضافة للطلب' : 'Add to Order'}</button>
              </div>
           </div>
        </div>
      )}

      {/* Professional Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[130] flex justify-end animate-in fade-in">
           <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
           <div className="w-full max-w-md bg-white h-full relative z-10 shadow-2xl flex flex-col animate-in slide-in-from-left rtl:slide-in-from-right duration-500">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-[#fafafa]">
                 <div className="flex items-center gap-4"><div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg"><ShoppingCart size={24} /></div><h3 className="text-2xl font-black text-slate-900">{isAr ? 'سلة المشتريات' : 'Your Basket'}</h3></div>
                 <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                 {cart.length === 0 ? (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40 grayscale"><Package size={80} /><p className="text-xl font-black text-slate-900">{isAr ? 'السلة فارغة' : 'Empty Basket'}</p></div>
                 ) : (
                   cart.map((item) => (
                     <div key={item.product.id} className="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all space-y-4">
                        <div className="flex gap-4 items-start">
                           <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#00a896] shadow-inner shrink-0">{item.product.mainCategory === 'pharma' ? <Pill size={24} /> : <Microscope size={24} />}</div>
                           <div className="flex-1"><p className="font-black text-slate-900 mb-1">{isAr ? item.product.nameAr : item.product.nameEn}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.product.brand}</p></div>
                           <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                           <p className="text-lg font-black text-slate-900">{item.product.price}</p>
                           <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                              <button onClick={() => updateCartQty(item.product.id, -1)} className="p-2 hover:bg-[#00a896] hover:text-white transition-all"><Minus size={14} /></button>
                              <span className="px-4 font-black text-sm">{item.quantity}</span>
                              <button onClick={() => updateCartQty(item.product.id, 1)} className="p-2 hover:bg-[#00a896] hover:text-white transition-all"><Plus size={14} /></button>
                           </div>
                        </div>
                     </div>
                   ))
                 )}
              </div>
              {cart.length > 0 && (
                <div className="p-10 bg-slate-50 border-t border-slate-100 space-y-6">
                   <div className="flex justify-between items-center text-slate-500 font-bold tracking-widest uppercase text-xs"><span>{isAr ? 'عدد المنتجات' : 'Items'}</span><span className="text-slate-900 font-black text-xl">{cart.reduce((s, i) => s + i.quantity, 0)}</span></div>
                   <button className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-lg shadow-2xl hover:bg-[#00a896] transition-all active:scale-95">{isAr ? 'تأكيد الطلب' : 'Confirm Order'}</button>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

// --- NewsPage ---
const NewsPage: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const isAr = lang === 'ar';
  const t = translations[lang];
  const [selectedCat, setSelectedCat] = useState('All');
  const filteredNews = newsArticles.filter(n => selectedCat === 'All' || n.categoryEn === selectedCat || n.categoryAr === selectedCat);
  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-1000 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.news.title} subtitle={t.news.subtitle} centered />
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {t.news.categories.map((cat, i) => (<button key={i} onClick={() => setSelectedCat(cat)} className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${selectedCat === cat ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>{cat}</button>))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map((n, i) => (
            <div key={n.id} className={`group relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white transition-all duration-500 hover:shadow-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <div className="aspect-video w-full overflow-hidden relative">
                <img src={n.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={n.titleEn} />
                <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6"><span className="px-4 py-2 bg-white/90 backdrop-blur shadow-sm rounded-full text-[9px] font-black uppercase tracking-widest text-[#00a896]">{isAr ? n.categoryAr : n.categoryEn}</span></div>
              </div>
              <div className="p-10 space-y-4">
                <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest"><Calendar size={14} />{n.date}</div>
                <h3 className={`${i === 0 ? 'text-4xl' : 'text-2xl'} font-black text-slate-900 leading-tight group-hover:text-[#00a896] transition-colors`}>{isAr ? n.titleAr : n.titleEn}</h3>
                <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">{isAr ? n.descAr : n.descEn}</p>
                <button className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] group/btn pt-4">{t.news.readMore}<ArrowUpRight size={16} className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServicesPage: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-1000 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.services.title} subtitle={t.services.subtitle} centered />
        <div className="grid lg:grid-cols-2 gap-12 mt-20">
          {t.services.items.map((s, i) => (
            <div key={i} className="group bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col">
              <div className="h-80 overflow-hidden relative">
                <img src={s.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={s.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 rtl:left-auto rtl:right-8 bg-white/90 backdrop-blur px-6 py-4 rounded-[2rem] shadow-xl flex items-center gap-4 animate-in slide-in-from-bottom-5"><div className="w-12 h-12 bg-[#00a896] rounded-2xl flex items-center justify-center text-white shadow-lg"><s.icon size={24} /></div><h4 className="text-2xl font-black text-slate-900">{s.title}</h4></div>
              </div>
              <div className="p-12 space-y-8 flex-1">
                <p className="text-xl text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{s.features.map((feat, idx) => (<div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-[#00a896]/5 transition-colors"><CheckCircle2 size={18} className="text-[#00a896]" /><span className="text-sm font-black text-slate-700">{feat}</span></div>))}</div>
                <div className="pt-6 border-t border-slate-50 flex justify-between items-center"><button className="flex items-center gap-3 text-[#00a896] font-black text-xs uppercase tracking-widest group/btn">{isAr ? 'عرض التفاصيل الفنية' : 'Technical Specifications'}<ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform" /></button><div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#00a896] transition-colors"><Shield size={20} /></div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ lang, onNavigate }: { lang: 'ar' | 'en', onNavigate: (page: Page) => void }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const sudanesePartners = [{ ar: 'أمي فارما', en: 'AMIPHARMA' }, { ar: 'أزال', en: 'AZAL' }, { ar: 'وفرة فارما', en: 'WAFRAPHARMA' }, { ar: 'النيل الأزرق', en: 'BLUE NILE' }, { ar: 'سودافارم', en: 'SUDAPHARM' }, { ar: 'باش للأدوية', en: 'BASH PHARMA' }];
  return (
    <div className="animate-in fade-in duration-1000 overflow-hidden">
      <section className="relative min-h-[95vh] flex items-center pt-28 overflow-hidden bg-[#fafafa]"><div className="absolute inset-0 -z-10"><div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#00a896]/10 rounded-full blur-[160px] animate-pulse"></div><div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-200/50 rounded-full blur-[130px]"></div><div className="absolute top-1/2 left-1/4 w-[2px] h-[300px] bg-gradient-to-b from-transparent via-[#00a896]/20 to-transparent"></div></div><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center"><div className="space-y-12"><div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white rounded-full shadow-xl shadow-slate-200/40 border border-slate-100 transform hover:scale-105 transition-all"><div className="flex -space-x-2 rtl:space-x-reverse">{[1,2,3].map(i => (<div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden"><img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Partner" /></div>))}</div><span className="text-[11px] font-black uppercase text-[#00a896] tracking-[0.2em]">{isAr ? 'موثوق من قبل 500+ صيدلية' : 'Trusted by 500+ Pharmacies'}</span></div><h1 className="text-7xl lg:text-9xl font-black text-slate-900 leading-[0.9] tracking-tighter">{isAr ? <>الرعاية <span className="text-[#00a896]">المستدامة</span> للإمداد الطبي</> : <>Sustainable <span className="text-[#00a896]">Medical</span> Care</>}</h1><p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl border-r-4 rtl:border-r-4 ltr:border-l-4 border-[#00a896] px-6 py-2">{t.hero.subtitle}</p><div className="flex flex-wrap gap-6 pt-4"><button onClick={() => onNavigate('products')} className="group px-12 py-6 bg-[#00a896] text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-[#00a896]/30 flex items-center gap-4 hover:scale-105 transition-all">{t.hero.cta} <ArrowRight size={24} className="group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" /></button><button onClick={() => onNavigate('about')} className="px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-lg border border-slate-100 shadow-xl hover:bg-slate-50 transition-colors">{t.hero.secondaryCta}</button></div></div><div className="relative group hidden lg:block"><div className="relative z-10 rounded-[6rem] overflow-hidden aspect-[4/5] shadow-2xl border-[12px] border-white transform rotate-2 hover:rotate-0 transition-all duration-700"><img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover" alt="Healthcare Professional" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div><div className="absolute bottom-10 left-10 right-10 p-8 glass-card rounded-[3rem] animate-float"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-[#00a896] rounded-2xl flex items-center justify-center text-white"><ShieldCheck size={28} /></div><div><p className="text-xs font-black uppercase text-slate-400 tracking-widest">{isAr ? 'الجودة المضمونة' : 'Certified Quality'}</p><p className="text-lg font-black text-slate-900">GMP & ISO Standard</p></div></div></div></div><div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00a896] rounded-full -z-10 opacity-20 blur-2xl"></div><div className="absolute -bottom-10 -left-10 w-60 h-60 bg-slate-900 rounded-[4rem] -z-10 opacity-5 rotate-45"></div></div></div></section>
      <section className="py-20 bg-white border-y border-slate-100 overflow-hidden"><div className="max-w-7xl mx-auto px-6 mb-12"><p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-[#00a896]">{isAr ? 'شركاء الإمداد السودانيين' : 'Sudanese Supply Partners'}</p></div><div className="flex gap-20 animate-marquee whitespace-nowrap">{sudanesePartners.map((partner, i) => (<div key={i} className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"><div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center"><FlaskConical className="text-slate-400" /></div><span className="text-2xl font-black text-slate-300 tracking-tighter uppercase">{isAr ? partner.ar : partner.en}</span></div>))}{sudanesePartners.map((partner, i) => (<div key={`dup-${i}`} className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"><div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center"><FlaskConical className="text-slate-400" /></div><span className="text-2xl font-black text-slate-300 tracking-tighter uppercase">{isAr ? partner.ar : partner.en}</span></div>))}</div></section>
      <section className="py-32 bg-slate-50 relative overflow-hidden"><div className="max-w-7xl mx-auto px-6"><div className="grid lg:grid-cols-2 gap-24 items-center"><div className="relative"><div className="grid grid-cols-2 gap-6"><div className="space-y-6"><div className="aspect-square bg-[#00a896] rounded-[3.5rem] p-10 text-white flex flex-col justify-end shadow-2xl shadow-[#00a896]/20 group hover:-translate-y-2 transition-transform"><Timer size={40} className="mb-6 opacity-40 group-hover:rotate-12 transition-transform" /><p className="text-4xl font-black mb-2">24h</p><p className="text-[10px] font-black uppercase tracking-widest opacity-80">{isAr ? 'توصيل فائق السرعة' : 'Ultra-Fast Delivery'}</p></div><div className="aspect-[4/5] bg-white rounded-[3.5rem] border border-slate-100 shadow-sm p-10 flex flex-col group hover:-translate-y-2 transition-transform"><BarChart3 size={40} className="text-[#00a896] mb-6 opacity-40" /><p className="text-3xl font-black text-slate-900 mb-2">Real-time</p><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'تتبع المخزون' : 'Stock Tracking'}</p></div></div><div className="space-y-6 pt-12"><div className="aspect-[4/5] bg-white rounded-[3.5rem] border border-slate-100 shadow-sm p-10 flex flex-col group hover:-translate-y-2 transition-transform"><Layers size={40} className="text-[#00a896] mb-6 opacity-40" /><p className="text-3xl font-black text-slate-900 mb-2">Smart</p><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'سلسلة إمداد ذكية' : 'Supply Chain'}</p></div><div className="aspect-square bg-slate-900 rounded-[3.5rem] p-10 text-white flex flex-col justify-end group hover:-translate-y-2 transition-transform"><Globe size={40} className="mb-6 opacity-40 group-hover:rotate-12 transition-transform" /><p className="text-4xl font-black mb-2">Sudan</p><p className="text-[10px] font-black uppercase tracking-widest opacity-60">{isAr ? 'تغطية شاملة' : 'Full Coverage'}</p></div></div></div></div><div className="space-y-10"><SectionHeader title={isAr ? 'قوة اللوجستيات' : 'Logistics Excellence'} subtitle={isAr ? 'نظام توريد ذكي يواكب احتياجاتكم الطبية' : 'Smart supply systems that match your medical needs'} /><p className="text-xl text-slate-500 font-medium leading-relaxed">{isAr ? 'نحن لا نقوم بتوزيع الأدوية فحسب، بل ندير نظاماً لوجستياً متكاملاً يضمن وصول المنتجات الطبية الحيوية في ظروف مثالية وسرعة قياسية لخدمة المرضى في كافة الولايات.' : 'We don\'t just distribute medications; we manage an integrated logistics system that ensures vital medical products arrive in ideal conditions and record time to serve patients across all states.'}</p><div className="space-y-6">{[{ title: isAr ? 'تحكم ذكي في درجات الحرارة' : 'Cold Chain Management', desc: isAr ? 'ضمان سلامة الأدوية الحساسة' : 'Ensuring the safety of sensitive medications' }, { title: isAr ? 'أتمتة المخازن' : 'Warehouse Automation', desc: isAr ? 'دقة 100% في إدارة الطلبات' : '100% precision in order fulfillment' }].map((f, i) => (<div key={i} className="flex gap-6 items-start"><div className="w-10 h-10 rounded-full bg-[#00a896]/10 flex items-center justify-center text-[#00a896] flex-shrink-0 mt-1"><CheckCircle2 size={20} /></div><div><p className="text-lg font-black text-slate-900 mb-1">{f.title}</p><p className="text-slate-500 font-medium">{f.desc}</p></div></div>))}</div><button onClick={() => onNavigate('services')} className="flex items-center gap-3 text-slate-900 font-black text-sm uppercase tracking-widest group">{isAr ? 'اكتشف خدماتنا اللوجستية' : 'Explore our logistics'}<div className="w-10 h-10 bg-[#00a896] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"><ChevronRight size={18} /></div></button></div></div></div></section>
      <section className="py-32 bg-white"><div className="max-w-7xl mx-auto px-6"><SectionHeader title={t.advantages.title} subtitle={t.advantages.subtitle} centered /><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">{t.advantages.items.map((item, i) => (<div key={i} className="group p-12 bg-white rounded-[4rem] border border-slate-100 hover:border-[#00a896]/30 hover:shadow-2xl hover:shadow-[#00a896]/10 transition-all duration-500"><div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-[#00a896] mb-10 group-hover:bg-[#00a896] group-hover:text-white transition-all duration-500 shadow-sm"><item.icon size={36} /></div><h4 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{item.title}</h4><p className="text-slate-500 leading-relaxed font-medium text-lg">{item.desc}</p></div>))}</div></div></section>
      <section className="py-24 bg-slate-900 relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00a896] to-transparent"></div><div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">{t.about.stats.map((s, i) => (<div key={i} className="text-center md:text-left rtl:md:text-right space-y-4"><p className="text-6xl font-black text-white tracking-tighter">{s.value}</p><div className="flex items-center gap-3 justify-center md:justify-start"><div className="w-6 h-0.5 bg-[#00a896]"></div><p className="text-[10px] font-black uppercase text-[#00a896] tracking-[0.4em]">{s.label}</p></div></div>))}</div></section>
    </div>
  );
};

const AboutPage: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [activeBranch, setActiveBranch] = useState<any>(null);
  const timelineItems = [{ year: '2014', titleAr: 'البداية الطموحة', titleEn: 'The Visionary Start', descAr: 'تأسيس الشركة برؤية لتغيير مفهوم التوزيع الدوائي في السودان.', descEn: 'Foundation with a vision to redefine pharma distribution in Sudan.' }, { year: '2017', titleAr: 'التوسع الوطني', titleEn: 'National Expansion', descAr: 'تغطية أكثر من 10 ولايات سودانية وتوسيع أسطول النقل المبرد.', descEn: 'Covering 10+ states and expanding the cold-chain fleet.' }, { year: '2020', titleAr: 'الريادة اللوجستية', titleEn: 'Logistics Leadership', descAr: 'إطلاق النظام الذكي لإدارة المخزون والتوريد الفوري.', descEn: 'Launching smart inventory management and real-time supply.' }, { year: '2024', titleAr: 'التميز المتكامل', titleEn: 'Integrated Excellence', descAr: 'أكبر شبكة توزيع تغطي كافة أرجاء البلاد بأعلى المعايير.', descEn: 'Largest distribution network covering all Sudan with peak standards.' }];
  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-1000 overflow-hidden bg-white"><div className="max-w-7xl mx-auto px-6 mb-32"><div className="grid lg:grid-cols-2 gap-24 items-center"><div className="space-y-10 order-2 lg:order-1"><div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#00a896]/10 text-[#00a896] rounded-full text-[10px] font-black uppercase tracking-[0.2em]"><Activity size={14} />{isAr ? 'عن الهوية والرسالة' : 'Identity & Mission'}</div><h2 className="text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">{isAr ? <>نحن نصنع <span className="text-[#00a896]">الأمل</span> من خلال التميز الطبي</> : <>We Create <span className="text-[#00a896]">Hope</span> Through Excellence</>}</h2><p className="text-2xl text-slate-500 font-medium leading-relaxed italic border-l-4 rtl:border-r-4 border-[#00a896] px-8 py-2 bg-slate-50 rounded-2xl">"{t.about.intro}"</p><p className="text-lg text-slate-400 font-medium leading-relaxed">{t.about.description}</p><div className="grid grid-cols-2 gap-8 pt-6">{t.about.stats.slice(0, 2).map((s, i) => (<div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all"><p className="text-5xl font-black text-[#00a896] mb-2 tracking-tighter">{s.value}</p><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p></div>))}</div></div><div className="relative order-1 lg:order-2"><div className="relative z-10 aspect-square rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,168,150,0.3)] border-[12px] border-white group"><img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Argi Medical" /><div className="absolute inset-0 bg-gradient-to-t from-[#00a896]/60 to-transparent mix-blend-overlay"></div></div><div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00a896]/5 rounded-full blur-3xl -z-10 animate-pulse"></div><div className="absolute -bottom-12 -left-12 w-80 h-80 bg-slate-900/5 rounded-[4rem] -z-10 rotate-12"></div></div></div></div><div className="py-32 bg-slate-900 relative overflow-hidden"><div className="absolute inset-0 opacity-5"><Globe size={1000} className="absolute -right-40 -top-40" /></div><div className="max-w-7xl mx-auto px-6 relative z-10"><div className="grid md:grid-cols-2 gap-12"><div className="group p-16 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:bg-white/[0.05] transition-all duration-700"><div className="w-20 h-20 bg-[#00a896] rounded-3xl flex items-center justify-center text-white mb-10 shadow-2xl shadow-[#00a896]/20 group-hover:-translate-y-2 transition-transform"><Target size={36} /></div><h3 className="text-4xl font-black text-white mb-6 tracking-tight">{isAr ? 'رسالتنا النبيلة' : 'Our Mission'}</h3><p className="text-xl text-white/50 font-medium leading-relaxed">{t.about.mission}</p></div><div className="group p-16 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:bg-white/[0.05] transition-all duration-700"><div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#00a896] mb-10 shadow-2xl transition-all group-hover:-translate-y-2"><Eye size={36} /></div><h3 className="text-4xl font-black text-white mb-6 tracking-tight">{isAr ? 'رؤيتنا المستقبلية' : 'Our Vision'}</h3><p className="text-xl text-white/50 font-medium leading-relaxed">{t.about.vision}</p></div></div></div></div><div className="py-32 bg-white"><div className="max-w-7xl mx-auto px-6"><SectionHeader title={isAr ? 'رحلة التميز' : 'The Excellence Journey'} subtitle={isAr ? 'قصة نجاح نمت في قلب السودان' : 'A success story grown in the heart of Sudan'} centered /><div className="relative mt-24"><div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden lg:block"></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">{timelineItems.map((item, i) => (<div key={i} className="space-y-8 text-center group"><div className="w-24 h-24 rounded-full bg-white border-8 border-slate-50 flex items-center justify-center mx-auto shadow-xl group-hover:border-[#00a896]/20 group-hover:scale-110 transition-all duration-500"><span className="text-xl font-black text-[#00a896]">{item.year}</span></div><div className="space-y-4"><h4 className="text-2xl font-black text-slate-900">{isAr ? item.titleAr : item.titleEn}</h4><p className="text-slate-400 font-medium leading-relaxed px-4">{isAr ? item.descAr : item.descEn}</p></div></div>))}</div></div></div></div><div className="py-32 max-w-7xl mx-auto px-6"><div className="flex flex-col lg:flex-row gap-20 items-stretch"><div className="lg:w-1/3 space-y-10"><SectionHeader title={isAr ? 'التوسع الجغرافي' : 'Network Expansion'} subtitle={t.about.networkTitle} /><div className="space-y-4">{t.about.branches.map((b, i) => (<button key={i} onClick={() => setActiveBranch(b)} className={`w-full p-8 rounded-[2.5rem] border transition-all flex items-center justify-between group ${activeBranch?.name === b.name ? 'bg-[#00a896] border-[#00a896] text-white shadow-2xl shadow-[#00a896]/30' : 'bg-white border-slate-100 text-slate-900 hover:border-[#00a896] shadow-sm'}`}><div className="text-right rtl:text-right ltr:text-left"><span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${activeBranch?.name === b.name ? 'text-white/60' : 'text-slate-400'}`}>{b.type}</span><h4 className="text-2xl font-black">{b.name}</h4></div><MapPin size={24} className={activeBranch?.name === b.name ? 'text-white' : 'text-slate-200 group-hover:text-[#00a896]'} /></button>))}</div></div><div className="lg:w-2/3 h-[600px] lg:h-auto min-h-[500px] relative rounded-[5rem] overflow-hidden shadow-2xl bg-slate-900 border-[12px] border-white">{activeBranch ? (<div className="w-full h-full animate-in fade-in duration-700"><iframe width="100%" height="100%" style={{ border: 0, filter: 'grayscale(0.1) invert(0.05)' }} title="Location Map" loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${activeBranch.lat},${activeBranch.lng}&z=14&hl=${lang}&output=embed`}></iframe><div className="absolute bottom-10 right-10 left-10 p-10 bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-10"><div><p className="text-[10px] font-black uppercase tracking-widest text-[#00a896] mb-2">{isAr ? 'الموقع النشط' : 'Current Selection'}</p><h4 className="text-3xl font-black text-slate-900">{activeBranch.name}</h4></div><div className="w-14 h-14 bg-[#00a896] rounded-2xl flex items-center justify-center text-white"><MapPin size={28} /></div></div></div>) : (<div className="h-full flex flex-col items-center justify-center p-20 text-center bg-slate-900 relative"><div className="absolute inset-0 opacity-10"><Globe size={800} className="absolute -right-40 -top-40" /></div><div className="relative z-10"><div className="w-24 h-24 bg-[#00a896]/20 text-[#00a896] rounded-[2.5rem] flex items-center justify-center mb-10 mx-auto animate-float"><Compass size={48} /></div><h4 className="text-4xl font-black text-white mb-6 leading-tight">{isAr ? 'استكشف شبكة فروعنا' : 'Discover Our Network'}</h4><p className="text-xl text-white/40 max-w-md mx-auto">{isAr ? 'اختر أحد فروعنا الرئيسية في السودان لعرض موقعه الدقيق وتفاصيله.' : 'Select one of our major branches in Sudan to view its exact location and details.'}</p></div></div>)}</div></div></div></div>
  );
};

const ContactPage: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const isAr = lang === 'ar';
  return (
    <div className="pt-32 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start"><div className="space-y-12"><SectionHeader title="Connect" subtitle={isAr ? 'تحدث مع خبرائنا' : 'Speak with our experts'} /><div className="space-y-8"><a href="mailto:info@argimedical.com" className="flex items-center gap-6 group"><div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white transition-all"><Mail size={32} /></div><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</p><p className="text-2xl font-black">info@argimedical.com</p></div></a><div className="flex items-center gap-6 group"><div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-[#00a896]"><Phone size={32} /></div><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'أرقام التواصل' : 'Contact Numbers'}</p><p className="text-2xl font-black">+249 912 326 210</p><p className="text-2xl font-black">+249 112 205 191</p></div></div><a href="https://wa.me/249912326210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group"><div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm"><MessageCircle size={32} /></div><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'واتساب' : 'WhatsApp Support'}</p><p className="text-2xl font-black">+249 912 326 210</p></div></a><div className="p-10 bg-slate-900 text-white rounded-[4rem] shadow-2xl relative overflow-hidden"><div className="relative z-10"><h4 className="text-xl font-black mb-2">{isAr ? 'الموقع الإلكتروني' : 'Website'}</h4><p className="text-3xl font-black text-[#00a896]">www.argimedical.com</p><p className="mt-4 text-white/50 text-sm">{isAr ? 'نحن هنا لخدمتكم وتقديم أفضل حلول الرعاية الصحية.' : 'We are here to serve you and provide the best healthcare solutions.'}</p></div></div></div></div><div className="bg-white p-16 rounded-[5rem] border border-slate-100 shadow-2xl"><form className="space-y-8" onSubmit={e => e.preventDefault()}><div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الاسم' : 'Name'}</label><input type="text" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-[#00a896] transition-all" /></div><div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'البريد الإلكتروني' : 'Email'}</label><input type="email" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-[#00a896] transition-all" /></div><div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الرسالة' : 'Message'}</label><textarea rows={4} className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-[#00a896] transition-all resize-none"></textarea></div><button className="w-full py-6 bg-[#00a896] text-white rounded-3xl font-black text-lg shadow-xl shadow-[#00a896]/20 hover:scale-[1.02] transition-transform">{isAr ? 'إرسال الرسالة' : 'Send Message'}</button></form></div></div></div>
  );
};

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
      case 'news': return <NewsPage lang={lang} />;
      case 'products': return <ProductsPage lang={lang} onNavigate={setCurrentPage} />;
      case 'contact': return <ContactPage lang={lang} />;
      case 'auth': return <AuthPage lang={lang} onNavigate={setCurrentPage} />;
      default: return <HomePage lang={lang} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen bg-white ${t.font} text-slate-900`}>
      <AIChat lang={lang} />
      <nav className={`fixed w-full z-[80] transition-all duration-700 ${isScrolled || currentPage !== 'home' ? 'py-3' : 'py-6'}`}><div className="max-w-7xl mx-auto px-6"><div className={`relative px-8 py-3 rounded-[2.5rem] transition-all duration-700 flex justify-between items-center ${isScrolled || currentPage !== 'home' ? 'bg-white/80 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100' : 'bg-transparent border-transparent'}`}><button onClick={() => setCurrentPage('home')} className="flex items-center gap-4 group"><div className="relative"><div className="w-12 h-12 bg-[#00a896] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#00a896]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"><Activity size={26} /></div><div className="absolute -inset-1.5 bg-[#00a896]/20 rounded-[1.4rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div></div><div className="flex flex-col"><span className="font-black text-2xl tracking-tighter uppercase leading-none text-slate-900">ARGI <span className="text-[#00a896]">MEDICAL</span></span><span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mt-1.5">{lang === 'ar' ? 'للخدمات الطبية' : 'MEDICAL SERVICES'}</span></div></button><div className="hidden lg:flex items-center gap-1">{(Object.entries(t.nav) as [Page, string][]).map(([key, label]) => (<button key={key} onClick={() => setCurrentPage(key)} className={`px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group rounded-xl ${currentPage === key ? 'text-[#00a896] bg-[#00a896]/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>{label}{currentPage === key && (<span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00a896]"></span>)}</button>))}</div><div className="hidden lg:flex items-center gap-6"><button onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')} className="w-11 h-11 flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-600 rounded-xl hover:bg-white hover:shadow-xl hover:text-[#00a896] transition-all transform active:scale-90 group" title={lang === 'en' ? 'العربية' : 'English'}><Globe size={18} className="group-hover:rotate-[360deg] transition-transform duration-1000" /></button><div className="w-[1px] h-8 bg-slate-100"></div><button onClick={() => setCurrentPage('auth')} className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${currentPage === 'auth' ? 'bg-[#00a896] text-white shadow-xl shadow-[#00a896]/30' : 'bg-slate-900 text-white hover:bg-[#00a896] shadow-xl shadow-slate-900/10 hover:shadow-[#00a896]/30'}`}><LogIn size={16} />{t.auth.login}</button></div><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-4 bg-slate-50 rounded-2xl text-slate-900 hover:bg-[#00a896] hover:text-white transition-all shadow-sm">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button></div></div><div className={`lg:hidden absolute top-full left-0 w-full px-6 pt-4 overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}><div className="bg-white/95 backdrop-blur-3xl rounded-[3rem] shadow-2xl border border-slate-100 p-10 space-y-6">{(Object.entries(t.nav) as [Page, string][]).map(([key, label]) => (<button key={key} onClick={() => { setCurrentPage(key); setIsMenuOpen(false); }} className={`block w-full text-right rtl:text-right ltr:text-left py-5 px-8 rounded-3xl font-black text-xl transition-all ${currentPage === key ? 'bg-[#00a896] text-white shadow-xl shadow-[#00a896]/20' : 'text-slate-900 hover:bg-slate-50'}`}>{label}</button>))}<div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100"><button onClick={() => { setCurrentPage('auth'); setIsMenuOpen(false); }} className="py-6 bg-slate-900 text-white rounded-3xl font-black shadow-xl">{t.auth.login}</button><button onClick={() => { setLang(prev => prev === 'en' ? 'ar' : 'en'); setIsMenuOpen(false); }} className="flex items-center justify-center gap-4 py-6 bg-slate-50 text-slate-900 rounded-3xl font-black shadow-sm"><Globe size={20} />{lang === 'en' ? 'AR' : 'EN'}</button></div></div></div></nav>
      <main>{renderPage()}</main>
      <footer className="relative bg-[#0b0f1a] pt-32 pb-16 overflow-hidden border-t border-white/5"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00a896]/40 to-transparent"></div><div className="absolute -top-24 right-[-5%] w-[40%] h-[40%] bg-[#00a896]/5 rounded-full blur-[150px]"></div><div className="absolute -bottom-24 left-[-5%] w-[30%] h-[30%] bg-[#00a896]/5 rounded-full blur-[100px]"></div><div className="max-w-7xl mx-auto px-6 relative z-10"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24"><div className="space-y-10"><div className="flex items-center gap-4 group cursor-pointer"><div className="w-14 h-14 bg-[#00a896] rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-[#00a896]/20 group-hover:rotate-12 transition-transform duration-500"><Activity size={32} /></div><div className="flex flex-col"><span className="text-3xl font-black tracking-tighter uppercase text-white">ARGI <span className="text-[#00a896]">Medical</span></span><span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#00a896]/60">{lang === 'ar' ? 'التميز الدوائي' : 'PHARMA EXCELLENCE'}</span></div></div><p className="text-slate-400 text-lg leading-relaxed font-medium">{lang === 'ar' ? 'رؤيتنا تتجاوز حدود التوزيع التقليدي؛ نحن نصنع المعيار الذهبي للرعاية الصحية والخدمات اللوجستية الطبية في السودان.' : 'Our vision transcends traditional distribution; we set the gold standard for healthcare and medical logistics in Sudan.'}</p><div className="flex gap-4">{[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (<button key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#00a896] hover:border-[#00a896] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00a896]/20 transition-all duration-500 group"><Icon size={22} className="group-hover:scale-110 transition-transform" /></button>))}</div></div><div className="space-y-10"><h4 className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center gap-3"><span className="w-10 h-0.5 bg-[#00a896] rounded-full"></span>{lang === 'ar' ? 'استكشف المزيد' : 'Quick Navigation'}</h4><ul className="space-y-6">{(Object.entries(t.nav) as [Page, string][]).map(([key, label]) => (<li key={key}><button onClick={() => setCurrentPage(key)} className="text-slate-400 hover:text-[#00a896] font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-4 group"><ArrowRight size={14} className="text-[#00a896] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />{label}</button></li>))}</ul></div><div className="space-y-10"><h4 className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center gap-3"><span className="w-10 h-0.5 bg-[#00a896] rounded-full"></span>{lang === 'ar' ? 'مركز التواصل' : 'Direct Support'}</h4><ul className="space-y-8"><li className="flex items-start gap-5 group cursor-pointer"><div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#00a896] flex-shrink-0 group-hover:bg-[#00a896] group-hover:text-white transition-all duration-500 shadow-lg"><Mail size={22} /></div><div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{lang === 'ar' ? 'المراسلات' : 'Official Correspondence'}</p><a href="mailto:info@argimedical.com" className="text-white font-black text-sm hover:text-[#00a896] transition-colors tracking-wide">info@argimedical.com</a></div></li><li className="flex items-start gap-5 group cursor-pointer"><div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-green-500 flex-shrink-0 group-hover:bg-green-500 group-hover:text-white transition-all duration-500 shadow-lg"><MessageCircle size={22} /></div><div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{lang === 'ar' ? 'واتساب' : 'WhatsApp Support'}</p><a href="https://wa.me/249912326210" target="_blank" rel="noopener noreferrer" className="text-white font-black text-sm hover:text-green-500 transition-colors tracking-wide">+249 912 326 210</a></div></li><li className="flex items-start gap-5 group cursor-pointer"><div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#00a896] flex-shrink-0 group-hover:bg-[#00a896] group-hover:text-white transition-all duration-500 shadow-lg"><Phone size={22} /></div><div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{lang === 'ar' ? 'الخط المباشر' : 'Emergency Hotline'}</p><div className="space-y-1"><p className="text-white font-black text-sm tracking-[0.1em]">+249 912 326 210</p><p className="text-white font-black text-sm tracking-[0.1em]">+249 112 205 191</p></div></div></li></ul></div><div className="space-y-10"><h4 className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center gap-3"><span className="w-10 h-0.5 bg-[#00a896] rounded-full"></span>{lang === 'ar' ? 'الموقع التشغيلي' : 'Operational Hub'}</h4><div className="relative group overflow-hidden p-8 bg-white/5 border border-white/10 rounded-[2.5rem] transition-all duration-500 hover:bg-white/[0.08] hover:border-[#00a896]/30"><div className="relative z-10 space-y-5"><div className="flex items-center gap-4 text-white"><div className="p-2 bg-[#00a896]/20 rounded-lg text-[#00a896]"><MapPin size={20} /></div><span className="font-black text-sm uppercase tracking-widest">{lang === 'ar' ? 'السودان - أم درمان' : 'Sudan - Omdurman'}</span></div><p className="text-slate-400 text-sm leading-relaxed font-medium">{lang === 'ar' ? 'المنطقة الصناعية، المجمع الطبي اللوجستي المتكامل.' : 'Industrial Area, Integrated Medical Logistics Complex.'}</p><button onClick={() => setCurrentPage('about')} className="flex items-center gap-3 text-[#00a896] font-black text-[10px] uppercase tracking-widest group/btn hover:gap-5 transition-all">{lang === 'ar' ? 'عرض على الخريطة' : 'View on Map'}<ChevronRight size={14} /></button></div><div className="absolute top-0 right-0 w-32 h-32 bg-[#00a896]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div></div></div></div><div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10"><div className="flex flex-col md:flex-row items-center gap-6 md:gap-12"><p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} ARGI MEDICAL COMPANY LTD. SUDAN. ALL RIGHTS RESERVED.</p></div><div className="flex items-center gap-4 px-8 py-3 bg-white/5 rounded-full border border-white/5 group hover:border-[#00a896]/30 transition-all duration-500"><div className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover:text-white transition-colors">{lang === 'ar' ? 'نظام الإمداد الطبي نشط' : 'Medical Logistics Secure'}</span></div></div></div></footer>
    </div>
  );
};

export default App;
