/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import ProductDetailModal from "./components/ProductDetailModal";
import CartCheckout from "./components/CartCheckout";
import WishlistDrawer from "./components/WishlistDrawer";
import AiAssistant from "./components/AiAssistant";
import AdminPanel from "./components/AdminPanel";
import StaticPages from "./components/StaticPages";

import {
  designTemplates,
  initialProducts,
  initialOrders,
  initialResellers,
  initialCorporateInquiries,
  initialComplianceDocs,
  initialVouchers,
  initialBlogs,
  initialFAQs,
  translations
} from "./data/seedData";
import { Product, Order, ResellerApplication, CorporateInquiry, ComplianceDoc, Voucher, LanguageCode, User } from "./types";
import { staticTranslations } from "./data/staticTranslations";
import { Sparkles, Award, ShieldCheck, Heart, MapPin, Phone, AlertTriangle, TrendingDown, Users, ShieldAlert, CheckCircle2, Leaf, TrendingUp, ArrowRight, Play, Pause, Laptop, Smartphone, Settings, Database, Globe, RefreshCw, BarChart3, HelpCircle, Eye, Star, Quote, X } from "lucide-react";

export default function App() {
  // -- Global Application settings managers --
  const [currentTemplate, setCurrentTemplate] = useState(designTemplates[0]);
  const [currentLang, setCurrentLang] = useState("id");
  const [activeMainView, setActiveMainView] = useState<string>("home");

  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("nusavara_theme_mode");
    return (saved === "dark" || saved === "light") ? saved : "light";
  });

  const handleToggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("nusavara_theme_mode", next);
      return next;
    });
  };

  // Sync with html dark class
  React.useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  // -- Programmatic scrolling lock to prevent scroll-spy jitter --
  const [isScrollingTo, setIsScrollingTo] = useState(false);

  // -- Interactive Video Demo Simulator State --
  const [activeVideoChapter, setActiveVideoChapter] = useState<"cms" | "b2b" | "customizer">("cms");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoPlaybackTime, setVideoPlaybackTime] = useState(0);
  const [videoDeviceMode, setVideoDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [simulatedStockState, setSimulatedStockState] = useState(48);
  const [simulatedResellerStatus, setSimulatedResellerStatus] = useState<"Pending" | "Approved">("Pending");
  const [simulatedFontFamily, setSimulatedFontFamily] = useState<"sans" | "serif" | "mono">("serif");

  // Tick timer for simulated video playback
  React.useEffect(() => {
    let interval: any = null;
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setVideoPlaybackTime((prev) => {
          if (prev >= 30) {
            return 0; // Loop playback
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoPlaying]);

  // -- Programmatic smooth scroll to a target section ID --
  const handleNavigate = (viewId: string) => {
    setActiveMainView(viewId);
    setIsScrollingTo(true);
    
    const element = document.getElementById(viewId);
    if (element) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 130;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - navHeight + 2; // precise target alignment
      
      window.scrollTo({
        top: targetY >= 0 ? targetY : 0,
        behavior: "smooth"
      });
      
      // Release scroll spy lock after smooth transition completes
      setTimeout(() => {
        setIsScrollingTo(false);
      }, 800);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      setTimeout(() => {
        setIsScrollingTo(false);
      }, 800);
    }
  };

  // -- Scroll Spy: Automatically update active tab on manual viewport scrolling --
  React.useEffect(() => {
    const handleScroll = () => {
      if (isScrollingTo) return;
      
      const sections = ["home", "catalog", "masalah-solusi", "video-demo", "testimonials", "limited-drop", "blog", "compliance", "reseller", "corporate", "account"];
      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 130;
      
      let currentSection = "home";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Detect which section is currently focused in the viewport
          if (rect.top <= navHeight + 100) {
            currentSection = sectionId;
          }
        }
      }
      setActiveMainView(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollingTo]);

  // -- Master State Database managers (for CRUD synchronization on CMS!) --
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [resellers, setResellers] = useState<ResellerApplication[]>(initialResellers);
  const [inquiries, setInquiries] = useState<CorporateInquiry[]>(initialCorporateInquiries);
  const [complianceDocs, setComplianceDocs] = useState<ComplianceDoc[]>(initialComplianceDocs);
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);

  // -- Authentication state --
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("nusavara_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      id: "MEMBER-ALYA-01",
      name: "Alya Rahmani",
      email: "alya@nusavara.com",
      phone: "081234567890",
      points: 870,
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256",
      memberSince: "Desember 2025"
    };
  });

  const handleUpdateProfile = (updated: User) => {
    setCurrentUser(updated);
    localStorage.setItem("nusavara_user", JSON.stringify(updated));
  };

  // -- Cart checkout managers --
  const [cart, setCart] = useState<{ product: Product; quantity: number; size?: string; color?: string }[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(870); // VIP gold points baseline

  // -- Modal switches --
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // -- Check if we are on the admin path --
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    return window.location.pathname === "/admin" || window.location.hash === "#/admin" || window.location.hash === "#admin";
  });

  React.useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(window.location.pathname === "/admin" || window.location.hash === "#/admin" || window.location.hash === "#admin");
    };
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  // -- Wishlist / Likes state --
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // -- Custom Notification/Toast State --
  interface ToastMessage {
    id: string;
    message: string;
    type: "success" | "info" | "warning";
  }
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // -- Custom Confirmation Modal State --
  interface ConfirmModal {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }
  const [confirmModal, setConfirmModal] = useState<ConfirmModal | null>(null);

  const handleToggleWishlist = (product: Product) => {
    const isLiked = wishlist.includes(product.id);
    if (isLiked) {
      setConfirmModal({
        isOpen: true,
        title: "Hapus dari Favorit",
        message: `Apakah Anda yakin ingin menghapus "${product.name}" dari daftar favorit Anda?`,
        onConfirm: () => {
          setWishlist((prev) => prev.filter((id) => id !== product.id));
          setConfirmModal(null);
          showToast(`"${product.name}" berhasil dihapus dari favorit.`, "info");
        }
      });
    } else {
      setWishlist([...wishlist, product.id]);
      showToast(`"${product.name}" berhasil ditambahkan ke favorit!`, "success");
    }
  };

  // -- Helpers for cart alterations --
  const handleAddToCart = (product: Product, quantity: number = 1, size?: string, color?: string) => {
    const safeQty = Number.isNaN(quantity) || quantity <= 0 ? 1 : quantity;
    const existing = cart.find(
      (i) => i.product.id === product.id && i.size === size && i.color === color
    );
    if (existing) {
      setCart(
        cart.map((i) =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + safeQty }
            : i
        )
      );
    } else {
      setCart([...cart, { product, quantity: safeQty, size, color }]);
    }
    // Gain 10 points per add
    setLoyaltyPoints((prev) => prev + 10);
    showToast(`Sukses menambahkan ${safeQty} item "${product.name}" ke keranjang belanja Anda!`, "success");
  };

  const handleUpdateCartQty = (productId: string, quantity: number, size?: string, color?: string) => {
    const safeQty = Number.isNaN(quantity) || quantity <= 0 ? 1 : quantity;
    setCart(
      cart.map((i) =>
        i.product.id === productId && i.size === size && i.color === color
          ? { ...i, quantity: safeQty }
          : i
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size?: string, color?: string) => {
    const item = cart.find(i => i.product.id === productId && i.size === size && i.color === color);
    if (!item) return;

    setConfirmModal({
      isOpen: true,
      title: "Hapus dari Keranjang",
      message: `Apakah Anda yakin ingin menghapus "${item.product.name}"${size ? ` (Ukuran: ${size})` : ""}${color ? ` (Warna: ${color})` : ""} dari keranjang belanja Anda?`,
      onConfirm: () => {
        setCart((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size && i.color === color)));
        setConfirmModal(null);
        showToast("Item berhasil dihapus dari keranjang belanja.", "success");
      }
    });
  };

  // Add order upon checkout completion
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    // Empty cart upon checkout
    setCart([]);
    // Add significant loyalty points for new transactions
    setLoyaltyPoints((prev) => prev + Math.floor(newOrder.total / 10000));
  };

  // Switch design template handler
  const handleSelectTemplate = (templateId: string) => {
    const found = designTemplates.find((t) => t.id === templateId);
    if (found) {
      setCurrentTemplate(found);
      if (found.theme === "dark") {
        setThemeMode("dark");
      } else if (found.theme === "light") {
        setThemeMode("light");
      }
    }
  };

  // Add dynamic reseller application
  const handleAddReseller = (app: ResellerApplication) => {
    setResellers([app, ...resellers]);
  };

  // Add dynamic corporate inquiry
  const handleAddInquiry = (inq: CorporateInquiry) => {
    setInquiries([inq, ...inquiries]);
  };

  // Filter translation labels shorthand
  const t = (key: string) => {
    return translations[currentLang]?.[key] || translations["id"]?.[key] || key;
  };

  const tStatic = (key: string) => {
    return (staticTranslations[currentLang as LanguageCode] as any)?.[key] || (staticTranslations["id"] as any)?.[key] || key;
  };

  const footerTranslations = {
    id: {
      desc: "Nusavara Local Premium adalah brand-commerce platform untuk produk lokal pilihan berkualitas tinggi. Menyatukan kriya handmade, fashion rami organik, herba tersertifikasi, dan skincare klinis BPOM.",
      catHeader: "Kategori Unggulan",
      cat1: "Fashion Rami Modest",
      cat2: "Skincare Barrier Klinis",
      cat3: "Kriya Tanah Liat Jogja",
      cat4: "Herbal Temu Glow",
      b2bHeader: "Kanal Kemitraan B2B",
      b2b1: "Pendaftaran Reseller Baru",
      b2b2: "Corporate Gift & Hampers",
      b2b3: "Sertifikasi & Lacak Resi",
      b2b4: "Kanal Edukasi FAQ",
      contactHeader: "Layanan Contact Center",
      contactDesc: "Hubungi tim operational kami melalui saluran WhatsApp Bisnis resmi berikut:",
      copyright: "© 2026 NUSAVARA LOCAL PREMIUM. Hak cipta dilindungi undang-undang NIB 9120123456789. Dibuat oleh ",
      bpom: "Sertifikat BPOM RI: NA18230123456",
      halal: "Halal MUI No. 00150085430126"
    },
    en: {
      desc: "Nusavara Local Premium is a brand-commerce platform for highly curated premium local goods, uniting handmade crafts, organic flax modest wear, certified herbs, and clinical skincare.",
      catHeader: "Featured Categories",
      cat1: "Organic Flax Modest Wear",
      cat2: "Clinical Barrier Skincare",
      cat3: "Yogyakarta Ceramic Crafts",
      cat4: "Temu Glow Herbal Remedy",
      b2bHeader: "B2B Partnership Channels",
      b2b1: "New Reseller Registration",
      b2b2: "Corporate Gift & Hampers",
      b2b3: "Compliance & Parcel Tracking",
      b2b4: "Education Channel & FAQ",
      contactHeader: "Contact Center Services",
      contactDesc: "Contact our operations team via the official Business WhatsApp below:",
      copyright: "© 2026 NUSAVARA LOCAL PREMIUM. All rights reserved. NIB 9120123456789. Built by ",
      bpom: "BPOM RI Certificate: NA18230123456",
      halal: "Halal MUI No. 00150085430126"
    },
    ar: {
      desc: "نوسافارا بريميوم المحلي هو منصة تجارة وعلامة تجارية للمنتجات المحلية الفاخرة والمختارة بعناية. تجمع بين الحرف اليدوية، وأزياء الكتان العضوية، والأعشاب المعتمدة، ومستحضرات العناية بالبشرة السريرية المرخصة.",
      catHeader: "الفئات المميزة",
      cat1: "أزياء الكتان العضوية المحتشمة",
      cat2: "العناية بالبشرة السريرية لحماية الحاجز",
      cat3: "حرف السيراميك والصلصال من يوجياكارتا",
      cat4: "العلاجات العشبية تيمو جلو",
      b2bHeader: "قنوات شراكة B2B",
      b2b1: "تسجيل موزع جديد",
      b2b2: "هدايا الشركات والسلال",
      b2b3: "الامتثال وتتبع الشحنات",
      b2b4: "قناة التعليم والأسئلة الشائعة",
      contactHeader: "خدمات مركز الاتصال",
      contactDesc: "اتصل بفريق العمليات لدينا عبر الواتساب الرسمي للأعمال أدناه:",
      copyright: "© 2026 نوسافارا بريميوم المحلي. جميع الحقوق محفوظة. ترخيص 9120123456789. تم التطوير بواسطة ",
      bpom: "شهادة BPOM RI: NA18230123456",
      halal: "حلال MUI رقم 00150085430126"
    },
    ja: {
      desc: "ヌサヴァラ・ローカルプレミアムは、厳選された高品質なローカル製品のためのブランドコマースプラットフォームです。ハンドメイド工芸品、オーガニックリネン、認証ハーブ、安全なスキンケアを融合します。",
      catHeader: "注目のカテゴリ",
      cat1: "オーガニックリネンファッション",
      cat2: "バリア機能スキンケア",
      cat3: "ジョグジャカルタ伝統陶芸",
      cat4: "伝統ハーブ健康サプリ",
      b2bHeader: "B2Bパートナー窓口",
      b2b1: "新規代理店・加盟店のご案内",
      b2b2: "法人向けギフト・贈答用",
      b2b3: "各種ライセンス＆配送追跡",
      b2b4: "よくあるご質問・教育チャンネル",
      contactHeader: "カスタマーサポート",
      contactDesc: "以下より公式ビジネスWhatsApp窓口へお気軽にお問い合わせください：",
      copyright: "© 2026 NUSAVARA LOCAL PREMIUM. All rights reserved. NIB 9120123456789. Designed by ",
      bpom: "BPOM RI 安全認証: NA18230123456",
      halal: "ハラール MUI 認証: No. 00150085430126"
    },
    ko: {
      desc: "누사바라 로컬 프리미엄은 고품질의 엄선된 향토 브랜드 유통 플랫폼입니다. 수공예 양식, 유기농 대마 패션, 인증 건강 원료 및 전문 스킨케어 브랜드를 하나로 엮어냅니다.",
      catHeader: "추천 카테고리",
      cat1: "유기농 대마 모던 가운",
      cat2: "전문 고성능 스킨케어",
      cat3: "요그야카르타 수제 도자기",
      cat4: "천연 허브 테무 글루",
      b2bHeader: "B2B 도매 및 제휴 채널",
      b2b1: "신규 공식 리셀러 모집",
      b2b2: "기업 특판 기프트 및 행사용",
      b2b3: "품질 보증 승인서 및 실시간 배송 조회",
      b2b4: "자주 묻는 질문 FAQ 게시판",
      contactHeader: "비즈니스 센터 안내",
      contactDesc: "공식 비즈니스 카카오톡/WhatsApp 채널로 빠르게 연락할 수 있습니다:",
      copyright: "© 2026 NUSAVARA LOCAL PREMIUM. All rights reserved. NIB 9120123456789. 제작사: ",
      bpom: "BPOM RI 안전성 승인: NA18230123456",
      halal: "할랄 MUI 인증 번호: 00150085430126"
    }
  };

  const subtitleTranslations = {
    id: {
      cms_1: "Selamat datang di Nusavara CMS. Ini adalah halaman utama panel administrasi produk premium.",
      cms_2: "Dengan satu klik, Anda dapat mengelola stok kriya rami, kosmetik herba, dan keramik jogja.",
      cms_3: "Sistem Multi-Bahasa secara otomatis menerjemahkan katalog ke Bahasa Inggris, Jepang, Korea, dan Arab.",
      cms_4: "Tingkat konversi meningkat hingga 45% berkat lokalisasi budaya dan integrasi mata uang global.",
      b2b_1: "Mari lihat portal kemitraan B2B dan reseller yang dirancang khusus untuk memperluas jangkauan pasar.",
      b2b_2: "Formulir pendaftaran dilengkapi dengan sistem verifikasi dokumen legalitas otomatis.",
      b2b_3: "Kanal Corporate Hampers memungkinkan perusahaan memesan bingkisan kriya nusantara yang dicustom.",
      b2b_4: "Semua pengajuan masuk ke dasbor admin secara real-time untuk ditinjau dan disetujui dalam 5 menit.",
      demo_1: "Nusavara dilengkapi dengan 10 template desain kelas dunia yang dapat diganti secara instan.",
      demo_2: "Ubah font ke Playfair Display untuk sentuhan mewah, atau JetBrains Mono untuk gaya technical modern.",
      demo_3: "Asisten AI pintar kami siap membantu memoles deskripsi produk dan merekomendasikan strategi promosi.",
      demo_4: "Ekspor seluruh website dalam bentuk static file atau deploy langsung ke server production dengan mulus."
    },
    en: {
      cms_1: "Welcome to Nusavara CMS. This is the main interface of our premium catalog administration panel.",
      cms_2: "With a single click, you can manage inventory for linen fashion, organic skincare, and local ceramics.",
      cms_3: "Our built-in translation system automatically translates the catalog to English, Japanese, Korean, and Arabic.",
      cms_4: "Global conversion rates improve up to 45% using native localization and currency setups.",
      b2b_1: "Explore our wholesale portal and reseller channels specially built to scale business footprints.",
      b2b_2: "The partner form is fully integrated with instant legal documentation checks.",
      b2b_3: "Corporate Custom Hampers allows enterprise clients to create bespoke premium local gift boxes.",
      b2b_4: "All partner requests are funneled live into the CRM dashboard, approved in under 5 minutes.",
      demo_1: "Nusavara comes packed with 10 production-ready theme presets switched in a millisecond.",
      demo_2: "Toggle serif typography for extreme editorial luxury, or monospace for technical minimalist design.",
      demo_3: "Our embedded AI assistant optimizes catalog copy and curates customized marketing tactics.",
      demo_4: "Export the full responsive platform to static HTML or deploy immediately to secure production containers."
    },
    ar: {
      cms_1: "مرحبًا بكم في Nusavara CMS. هذه هي الواجهة الرئيسية للوحة إدارة المنتجات الفاخرة الخاصة بنا.",
      cms_2: "بنقرة واحدة، يمكنك إدارة المخزون لأزياء الكتان ومستحضرات العناية بالبشرة العضوية والخزف المحلي.",
      cms_3: "يقوم نظام الترجمة المدمج لدينا بترجمة الكتالوج تلقائيًا إلى الإنجليزية واليابانية والكورية والعربية.",
      cms_4: "تتحسن معدلات التحويل العالمية بنسبة تصل إلى 45٪ باستخدام التوطين المحلي وإعدادات العملة.",
      b2b_1: "استكشف بوابة الجملة وقنوات الموزعين المصممة خصيصًا لتوسيع نطاق الأعمال.",
      b2b_2: "تم دمج نموذج الشريك بالكامل مع عمليات فحص وثائق الهوية القانونية الفورية.",
      b2b_3: "تسمح قنوات الهدايا المخصصة للشركات بإنشاء علب هدايا محلية ممتازة ومخصصة.",
      b2b_4: "يتم توجيه جميع طلبات الشركاء مباشرة إلى لوحة معلومات CRM، وتتم الموافقة عليها في أقل من 5 دقائق.",
      demo_1: "يأتي Nusavara مزودًا بـ 10 قوالب تصميم جاهزة للإنتاج يمكن التبديل بينها في أجزاء من الثانية.",
      demo_2: "قم بتبديل طباعة الخطوط لإضفاء فخامة تحريرية، أو الخط أحادي المسافة للتصميم التقني البسيط.",
      demo_3: "يعمل مساعد الذكاء الاصطناعي المدمج لدينا على تحسين الكتالوج وتنسيق أساليب التسويق المخصصة.",
      demo_4: "قم بتصدير النظام الأساسي المستجيب بالكامل إلى ملفات ثابتة أو نشره على الفور في حاويات إنتاج آمنة."
    },
    ja: {
      cms_1: "Nusavara CMSへようこそ。これはプレミアムカタログ管理パネルのメインインターフェースです。",
      cms_2: "クリックひとつで、リネン衣服、ハーブ化粧品、伝統陶芸クラフトの在庫をシームレスに管理できます。",
      cms_3: "内蔵の多言語エンジンが、英語、日本語、韓国語、アラビア語に瞬時に自動翻訳します。",
      cms_4: "地域ローカライズと通貨設定により、グローバルコンバージョン率が最大45％向上します。",
      b2b_1: "卸取引専用ポータルと代理店管理チャネルを探索し、迅速な事業拡大をサポートします。",
      b2b_2: "パートナー申請フォームは、自動化された法的な書類審査システムとリアルタイムに同期しています。",
      b2b_3: "法人向けギフト・贈答用パッケージでは、特注ロゴを施したオリジナルの工芸ギフトセットを受ねることができます。",
      b2b_4: "すべての提携申請は管理画面のCRMログへ即座に送信され、5分以内でスピード審査が可能です。",
      demo_1: "Nusavaraは、ワンクリックで瞬時に切り替え可能な10種類の洗練された実用テーマを搭載しています。",
      demo_2: "伝統と高級感を演出する明朝体フォント、またはテクニカルでミニマルな等幅フォントを自在に選択できます。",
      demo_3: "埋め込まれたAIアシスタントが、製品説明文の推敲や効果的な販売プロモーション戦略を自律的に提案します。",
      demo_4: "ボタンひとつで全ページを静的ファイルとして書き出し、安全な本番用サーバーへシームレスにデプロイできます。"
    },
    ko: {
      cms_1: "Nusavara CMS에 오신 것을 환영합니다. 본 화면은 프리미엄 제품 라인을 총괄하는 핵심 어드민 페이지입니다.",
      cms_2: "클릭 한 번으로 고급 대마 패션, 천연 화장품 및 수제 세라믹스의 입출고 및 재고 현황을 실시간으로 관리합니다.",
      cms_3: "지능형 로컬라이징 번역 모듈이 전 제품 정보를 영어, 일본어, 한국어, 아랍어로 자동 가공하여 송출합니다.",
      cms_4: "각 국가별 맞춤 현지화 브랜딩 및 통화 연동 기술을 통해 글로벌 매출 전환율이 약 45% 이상 상승합니다.",
      b2b_1: "공식 유통망 확장을 위해 세심하게 기획된 도매 B2B 오더 허브 및 가맹 대리점 관리 시스템을 구비하고 있습니다.",
      b2b_2: "대리점 가입 승인은 첨부 문서의 자동 비즈니스 증빙 검증기를 거쳐 투명하게 완료됩니다.",
      b2b_3: "기업 맞춤 기프트 박스 서비스를 통해, 공공기관이나 기업 대상 대량 특판용 수제 기프트를 설계 및 출고합니다.",
      b2b_4: "수집된 제휴 파트너십 요청 사항은 CRM으로 다이렉트 연동되어, 5분 이내에 승인 여부를 검토하고 회신합니다.",
      demo_1: "Nusavara는 현대인에게 소구하는 10가지 세련된 데모 UI 스킨을 즉각적인 테마 체인저 형태로 지원합니다.",
      demo_2: "고전적 감성과 우아함의 세리프 패밀리, 또는 미래지향적이고 기하학적인 고딕 모노 패밀리를 즉시 반영할 수 있습니다.",
      demo_3: "내장형 AI 카피라이터가 카탈로그 가치를 올리는 매력적인 영문/아랍어 홍보 카피를 제안하고 지원합니다.",
      demo_4: "한 번의 실행으로 전 시스템을 빌드 완료하여 고속 로컬 환경이나 대규모 웹 서버로 끊김 없이 이식할 수 있습니다."
    }
  };

  const demoTranslations = {
    id: {
      headerBadge: "VIDEO WALKTHROUGH & SIMULATOR",
      title: "Demo Tampilan & Cara Kerja Sistem Nusavara",
      desc: "Eksplorasi dashboard administrasi, portal kemitraan B2B, dan pengubah desain instan kami secara interaktif. Putar demo otomatis atau simulasikan langsung alatnya di bawah.",
      clickToPlay: "KLIK UNTUK PUTAR DEMO SISTEM",
      autoplayTip: "Tekan putar di atas atau pilih sub-fitur di sebelah kanan untuk memulai simulasi walkthrough.",
      walkthroughSection: "Bagian Walkthrough",
      simulatedDatabaseTip: "💡 Tip: Klik tombol \"+ Tambah Stok\" di atas untuk mensimulasikan live update di database!",
      changeFont: "Pilih Tipografi Brand (Font)",
      changeDesignMode: "Ubah Mode Desain",
      activeFont: "Font aktif",
      buyNow: "Beli Sekarang",
      previewFontTip: "Pratinjau merespon font aktif",
      b2bWholesale: "Kanal B2B Reseller",
      b2bTitle: "Ganti Desain Corporate Gift Box secara Real-Time",
      boxTraditional: "Box Tradisional",
      boxMinimalist: "Box Minimalis",
      previewFontTitle: "Eksklusif Skincare Herbal",
      aiCopywriting: "AI Copywriting",
      aiCleanText: "Diramu dari keajaiban kunyit organik pilihan, facial cleanser herba ini mengembalikan binar wajah Anda.",
      laptopTooltip: "Tampilan Desktop Admin",
      phoneTooltip: "Tampilan Mobile Customer",
      adminTitle: "NUSAVARA ADMIN v2.5",
      dbSync: "Live Database Sync",
      catalogHeader: "Katalog Produk Nusantara",
      localizationInfo: "Mendukung otomatisasi lokalisasi 5 bahasa",
      stockQty: "Jumlah Stok",
      addStock: "+ Tambah Stok",
      totalReseller: "Total Reseller",
      pendingReview: "Menunggu Review",
      totalHampers: "Total Hampers B2B",
      inboxReseller: "Inbox Registrasi Reseller Baru",
      tipB2bPending: "💡 Klik tombol 'Approve' untuk menyetujui instan reseller baru!",
      tipB2bApproved: "✓ Sukses disetujui! Mitra otomatis menerima email login platform.",
      styleEngineTitle: "Style Engine Controls",
      welcomeStore: "Selamat Datang di Toko",
      localGoodsElevated: "Local Goods, Elevated Stories.",
      activeFontLabel: "Font aktif",
      ch1Title: "CMS Katalog Multi-Bahasa",
      ch1Sub: "Simulasi database stok & bahasa",
      ch2Title: "Portal Reseller & B2B",
      ch2Sub: "Inbox pengajuan & paket hampers",
      ch3Title: "Customizer Desain & AI",
      ch3Sub: "Modifikasi visual & generator teks"
    },
    en: {
      headerBadge: "VIDEO WALKTHROUGH & SIMULATOR",
      title: "Interactive System Demo & Walkthrough",
      desc: "Explore our administration panel, B2B wholesale portal, and real-time storefront style engine. Start the automated walkthrough or test the tools manually below.",
      clickToPlay: "CLICK TO PLAY SYSTEM DEMO",
      autoplayTip: "Click the play button above or select any walkthrough chapter on the right to start.",
      walkthroughSection: "Walkthrough Chapters",
      simulatedDatabaseTip: "💡 Tip: Click the \"+ Add Stock\" button above to simulate live inventory updates in our real-time database!",
      changeFont: "Select Brand Typography (Font)",
      changeDesignMode: "Adjust Design Codes",
      activeFont: "Active font",
      buyNow: "Buy Now",
      previewFontTip: "Preview reacts to active font",
      b2bWholesale: "B2B Reseller Channel",
      b2bTitle: "Customize Corporate Gift Box Designs Live",
      boxTraditional: "Traditional Box",
      boxMinimalist: "Minimalist Box",
      previewFontTitle: "Organic Herbal Skincare",
      aiCopywriting: "AI Copywriting",
      aiCleanText: "Formulated with curated organic turmeric, this facial cleanser restores your natural glowing skin barrier.",
      laptopTooltip: "Desktop Admin View",
      phoneTooltip: "Mobile Customer View",
      adminTitle: "NUSAVARA ADMIN v2.5",
      dbSync: "Live Database Sync",
      catalogHeader: "Nusantara Product Catalog",
      localizationInfo: "Supports automated 5-language localization",
      stockQty: "Stock Qty",
      addStock: "+ Add Stock",
      totalReseller: "Total Resellers",
      pendingReview: "Pending Review",
      totalHampers: "Total B2B Hampers",
      inboxReseller: "New Reseller Registration Inbox",
      tipB2bPending: "💡 Click 'Approve' button to instantly approve the new reseller!",
      tipB2bApproved: "✓ Successfully approved! Partner automatically receives platform login email.",
      styleEngineTitle: "Style Engine Controls",
      welcomeStore: "Welcome to Store",
      localGoodsElevated: "Local Goods, Elevated Stories.",
      activeFontLabel: "Active font",
      ch1Title: "Multi-Language Catalog CMS",
      ch1Sub: "Simulate stocks & translations database",
      ch2Title: "B2B & Reseller Portal",
      ch2Sub: "Partner applications inbox & gift box setups",
      ch3Title: "Style & AI Customizer",
      ch3Sub: "Visual style modifier & AI writer"
    },
    ar: {
      headerBadge: "عرض توضيحي وتفاعلي للنظام",
      title: "عرض توضيحي وتفاعلي لطريقة عمل نظام Nusavara",
      desc: "استكشف لوحة الإدارة، وبوابة بيع الجملة B2B، ومحرك تصميم المتجر في الوقت الفعلي بشكل تفاعلي. ابدأ العرض التوضيحي التلقائي أو اختبر الأدوات مباشرة بالأسفل.",
      clickToPlay: "انقر لتشغيل عرض النظام",
      autoplayTip: "انقر على زر التشغيل بالأعلى أو اختر أي قسم من القائمة اليمنى للبدء.",
      walkthroughSection: "أقسام العرض التوضيحي",
      simulatedDatabaseTip: "💡 نصيحة: انقر فوق الزر \"+ إضافة مخزون\" أعلاه لمحاكاة التحديث المباشر للمخزون!",
      changeFont: "تغيير نمط الخطوط العام",
      changeDesignMode: "تعديل رموز التصميم",
      activeFont: "الخط النشط",
      buyNow: "شراء الآن",
      previewFontTip: "يتفاعل العرض المعاين مع الخط النشط",
      b2bWholesale: "قناة موزعي الجملة B2B",
      b2bTitle: "تخصيص تصاميم علب الهدايا بشكل مباشر",
      boxTraditional: "علبة تقليدية",
      boxMinimalist: "علبة بسيطة",
      previewFontTitle: "مستحضرات العناية بالبشرة العضوية",
      aiCopywriting: "كتابة نصوص بالذكاء الاصطناعي",
      aiCleanText: "مُصمم من الكركم العضوي المختار بعناية، يعيد منظف الوجه هذا حاجز بشرتك الطبيعي المتوهج.",
      laptopTooltip: "عرض لوحة تحكم الكمبيوتر",
      phoneTooltip: "عرض متجر الجوال للعميل",
      adminTitle: "NUSAVARA ADMIN v2.5",
      dbSync: "مزامنة قاعدة البيانات الحية",
      catalogHeader: "كتالوج المنتجات المحلية",
      localizationInfo: "يدعم الترجمة التلقائية إلى 5 لغات",
      stockQty: "كمية المخزون",
      addStock: "+ زيادة المخزون",
      totalReseller: "إجمالي الموزعين",
      pendingReview: "في انتظار المراجعة",
      totalHampers: "إجمالي علب الهدايا B2B",
      inboxReseller: "صندوق وارد تسجيل الموزعين الجدد",
      tipB2bPending: "💡 انقر فوق الزر 'موافقة' للموافقة الفورية على الموزع الجديد!",
      tipB2bApproved: "✓ تم الموافقة بنجاح! يتلقى الشريك تلقائيًا بريد الدخول.",
      styleEngineTitle: "عناصر التحكم في نمط التصميم",
      welcomeStore: "مرحباً بكم في المتجر",
      localGoodsElevated: "منتجات محلية، قصص راقية.",
      activeFontLabel: "الخط النشط",
      ch1Title: "نظام إدارة المحتوى متعدد اللغات",
      ch1Sub: "محاكاة قواعد بيانات المخزون والترجمات",
      ch2Title: "بوابة الشركات والموزعين B2B",
      ch2Sub: "طلبات الشراكة وتصميم علب الهدايا",
      ch3Title: "مخصص الأنماط والذكاء الاصطناعي",
      ch3Sub: "معدل الأنماط المرئية والكاتب الذكي"
    },
    ja: {
      headerBadge: "ビデオツアー＆シミュレーター",
      title: "Nusavara システム의 데모＆動作方法",
      desc: "管理画面、B2B卸売ポータル、リアルタイムデザインカスタマイザーをお手元で体験。自動ツアーを再生するか、以下のシミュレーションでお試しください。",
      clickToPlay: "クリックしてシステムデモを再生",
      autoplayTip: "上の再生ボタンを押すか、右側のメニューからチャプターを選択してシミュレーションを開始します。",
      walkthroughSection: "シミュレーション項目",
      simulatedDatabaseTip: "💡 ヒント: 上の「+ 在庫追加」ボタンを押すと、リアルタイムデータベースへの即時反映をシミュレートできます！",
      changeFont: "表示フォントの切り替え",
      changeDesignMode: "デザインカラー・パラメータの調整",
      activeFont: "有効なフォント",
      buyNow: "今すぐ購入",
      previewFontTip: "アクティブフォントがリアルタイムで反映されます",
      b2bWholesale: "B2B代理店卸売チャネル",
      b2bTitle: "コーポレートギフトボックスのデザイン即時プレビュー",
      boxTraditional: "木目伝統ボックス",
      boxMinimalist: "シンプルモダンボックス",
      previewFontTitle: "ハーブスキンケア化粧品",
      aiCopywriting: "AI自動キャッチコピー作成",
      aiCleanText: "厳選された有機ウコンの自然な力で、肌本来의クリアな輝きを取り戻すフェイシャルクレンザーです。",
      laptopTooltip: "デスクトップ管理画面ビュー",
      phoneTooltip: "モバイルストアフロントビュー",
      adminTitle: "NUSAVARA ADMIN v2.5",
      dbSync: "リアルタイムDB同期中",
      catalogHeader: "プレミアム製品カタログ",
      localizationInfo: "5言語の自動翻訳ローカライズに対応",
      stockQty: "在庫数",
      addStock: "+ 在庫を追加",
      totalReseller: "総代理店数",
      pendingReview: "未承認の申請",
      totalHampers: "B2Bギフト総数",
      inboxReseller: "新規代理店申請インボックス",
      tipB2bPending: "💡 'Approve'ボタンをクリックして、新規代理店を即座に承認します！",
      tipB2bApproved: "✓ 承認が完了しました！パートナーへログイン情報が送信されます。",
      styleEngineTitle: "スタイルエンジン設定",
      welcomeStore: "オンラインストアへようこそ",
      localGoodsElevated: "地域の良品を、洗練されたストーリーと共に。",
      activeFontLabel: "有効なフォント",
      ch1Title: "多言語カタログCMS",
      ch1Sub: "在庫データベースと自動翻訳シミュレーション",
      ch2Title: "B2B・代理店ポータル",
      ch2Sub: "代理店申請インボックス＆ギフトボックス設計",
      ch3Title: "スタイル＆AIカスタマイザー",
      ch3Sub: "ビジュアル調整＆AIキャッチコピー生成"
    },
    ko: {
      headerBadge: "비디오 가이드 및 인터랙티브 시뮬레이터",
      title: "Nusavara 시스템 작동방식 및 비주얼 데모",
      desc: "제품 어드민 관리자 패널, B2B 도매 파트너십 허브, 실시간 폰트/스타일 체인저를 직접 컨트롤해 보세요. 자동재생 가이드를 활성화하거나 수동 시뮬레이터를 조작해 보세요.",
      clickToPlay: "시스템 비주얼 데모 시작하기",
      autoplayTip: "위의 재생 버튼을 누르거나 오른쪽에서 시뮬레이션하고 싶은 장을 선택하세요.",
      walkthroughSection: "시뮬레이션 장 목록",
      simulatedDatabaseTip: "💡 팁: 위의 \"+ 재고 증가\" 버튼을 누르면 실시간 데이터베이스의 동기화 연동을 확인할 수 있습니다!",
      changeFont: "사이트 서체 레이아웃 제어",
      changeDesignMode: "디자인 매개변수 실시간 설정",
      activeFont: "현재 서체",
      buyNow: "지금 구매하기",
      previewFontTip: "선택된 서체가 시뮬레이션 화면에 실시간으로 반영됩니다",
      b2bWholesale: "B2B 가맹점 전용 오더 채널",
      b2bTitle: "기업 특판 기프트 박스 비주얼 실시간 설정",
      boxTraditional: "전통 대나무 패키지",
      boxMinimalist: "미니멀 하드 커버 패키지",
      previewFontTitle: "오가닉 허브 스킨케어 라인",
      aiCopywriting: "AI 자동 카피라이터 기획",
      aiCleanText: "유기농 심황의 귀중한 자연 성분으로 메마른 안면 장벽을 정화하고 자연스러운 안색을 되찾아 줍니다.",
      laptopTooltip: "PC 웹 관리자 화면",
      phoneTooltip: "모바일 고객 스토어 화면",
      adminTitle: "NUSAVARA ADMIN v2.5",
      dbSync: "실시간 동기화 상태",
      catalogHeader: "로컬 프리미엄 카탈로그",
      localizationInfo: "5개국 글로벌 로컬라이징 자동 번역 탑재",
      stockQty: "보유 재고량",
      addStock: "+ 재고 추가",
      totalReseller: "총 가맹 가맹점",
      pendingReview: "검토 대기 건수",
      totalHampers: "B2B 특판 출고건수",
      inboxReseller: "신규 가맹 신청 승인 대기 목록",
      tipB2bPending: "💡 'Approve' 버튼을 누르면 가맹점 개설이 즉시 승인됩니다!",
      tipB2bApproved: "✓ 가맹 개설 완료! 파트너에게 메일 전송 및 가맹 ID가 발급되었습니다.",
      styleEngineTitle: "스타일 엔진 컨트롤",
      welcomeStore: "스토어 방문을 환영합니다",
      localGoodsElevated: "엄선된 특산품, 격조 높은 브랜드 스토리.",
      activeFontLabel: "현재 서체",
      ch1Title: "다국어 카탈로그 CMS",
      ch1Sub: "재고 데이터베이스 및 번역 시뮬레이션",
      ch2Title: "B2B 및 대리점 포털",
      ch2Sub: "가맹점 가입 신청서함 및 특판 패키징 조작",
      ch3Title: "스타일 및 AI 커스터마이저",
      ch3Sub: "비주얼 템플릿 변경 및 AI 카피라이터 기획"
    }
  };

  // Get active subtitle text for video demo
  const getCurrentSubtitle = () => {
    const langSub = subtitleTranslations[currentLang as LanguageCode] || subtitleTranslations.id;
    if (activeVideoChapter === "cms") {
      if (videoPlaybackTime <= 6) return langSub.cms_1;
      if (videoPlaybackTime <= 13) return langSub.cms_2;
      if (videoPlaybackTime <= 21) return langSub.cms_3;
      return langSub.cms_4;
    } else if (activeVideoChapter === "b2b") {
      if (videoPlaybackTime <= 6) return langSub.b2b_1;
      if (videoPlaybackTime <= 13) return langSub.b2b_2;
      if (videoPlaybackTime <= 21) return langSub.b2b_3;
      return langSub.b2b_4;
    } else {
      if (videoPlaybackTime <= 6) return langSub.demo_1;
      if (videoPlaybackTime <= 13) return langSub.demo_2;
      if (videoPlaybackTime <= 21) return langSub.demo_3;
      return langSub.demo_4;
    }
  };

  const dTrans = demoTranslations[currentLang as LanguageCode] || demoTranslations.id;

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
        <AdminPanel
          products={products}
          onUpdateProducts={setProducts}
          orders={orders}
          onUpdateOrders={setOrders}
          resellers={resellers}
          onUpdateResellers={setResellers}
          inquiries={inquiries}
          onUpdateInquiries={setInquiries}
          complianceDocs={complianceDocs}
          onUpdateComplianceDocs={setComplianceDocs}
          vouchers={vouchers}
          onUpdateVouchers={setVouchers}
          blogs={initialBlogs}
          onUpdateBlogs={() => {}}
          faqs={initialFAQs}
          onUpdateFaqs={() => {}}
          currentTemplate={currentTemplate}
          themeMode={themeMode}
          onClose={() => {
            window.location.href = "/";
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 font-sans ${
        themeMode === "dark" ? "dark bg-stone-950 text-stone-100" : currentTemplate.bgSolid
      }`}
    >
      {/* 1. Main Navigation Header */}
      <Navbar
        currentLang={currentLang as any}
        onSelectLang={setCurrentLang as any}
        currentTemplate={currentTemplate}
        onSelectTemplate={handleSelectTemplate}
        activeView={activeMainView}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => {
          setIsAdminOpen(true);
          alert("Memuat Panel Admin & Sistem CRM. Hak akses default diset: 'Super Admin'.");
        }}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        currentUser={currentUser}
      />

      {/* 2. Primary Route Switch Viewports */}
      <main id="main-content" className="flex-1 pb-16 space-y-32">
        
        {/* Section: Home */}
        <section id="home" className="scroll-mt-28">
          <div className="space-y-16">
            {/* Template-aware dynamic editorial hero */}
            <Hero
              currentTemplate={currentTemplate}
              currentLang={currentLang as any}
              onNavigate={handleNavigate}
              brandSettings={{ brand_name: "Nusavara Local Premium", tagline: "Local Goods, Elevated Stories." }}
            />

            {/* Premium Trust stamps block */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 gap-4 sm:gap-6 text-center select-none">
              <div className={`p-6 border rounded-3xl space-y-2 shadow-xs transition-colors duration-300 col-span-1 ${
                themeMode === "dark" ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-white border-stone-200"
              }`}>
                <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C35232] dark:text-amber-500 font-serif">{tStatic("trust1_title")}</h4>
                <p className={`text-[11px] sm:text-xs max-w-xs mx-auto ${themeMode === "dark" ? "text-stone-400" : "text-stone-500"}`}>
                  {tStatic("trust1_desc")}
                </p>
              </div>

              <div className={`p-6 border rounded-3xl space-y-2 shadow-xs transition-colors duration-300 col-span-1 ${
                themeMode === "dark" ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-white border-stone-200"
              }`}>
                <Award className="w-8 h-8 text-amber-555 mx-auto" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C35232] dark:text-amber-500 font-serif">{tStatic("trust2_title")}</h4>
                <p className={`text-[11px] sm:text-xs max-w-xs mx-auto ${themeMode === "dark" ? "text-stone-400" : "text-stone-500"}`}>
                  {tStatic("trust2_desc")}
                </p>
              </div>

              <div className={`p-6 border rounded-3xl space-y-2 shadow-xs transition-colors duration-300 col-span-2 ${
                themeMode === "dark" ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-white border-stone-200"
              }`}>
                <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C35232] dark:text-amber-500 font-serif">{tStatic("trust3_title")}</h4>
                <p className={`text-[11px] sm:text-xs max-w-md mx-auto ${themeMode === "dark" ? "text-stone-400" : "text-stone-500"}`}>
                  {tStatic("trust3_desc")}
                </p>
              </div>
            </div>

             {/* Curated featured items subset carousel (Catalog preview) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
              <div>
                <span className={`text-[10px] uppercase font-mono tracking-widest font-bold block ${themeMode === "dark" ? "text-emerald-400" : "text-emerald-850"}`}>COLLECTOR SELECTIONS</span>
                <h2 className={`text-2xl sm:text-3xl font-black font-serif ${themeMode === "dark" ? "text-white" : "text-stone-900"}`} style={{ fontFamily: currentTemplate.headingFont }}>
                  {t("featured_curations")}
                </h2>
                <p className={`text-xs ${themeMode === "dark" ? "text-stone-400" : "text-stone-500"}`}>
                  {currentLang === "en" ? "Discover the bestselling collections beloved by Nusavara patrons worldwide." : currentLang === "ar" ? "اكتشف المجموعات الأكثر مبيعًا والمفضلة لدى رعاة نوسافارا حول العالم." : currentLang === "ja" ? "世界中のヌサヴァラ愛好家に最も愛されているベストセラーコレクションをご覧ください。" : currentLang === "ko" ? "누사바라 글로벌 패트론들이 가장 사랑하는 베스트셀러 컬렉션을 만나보세요." : "Berikut koleksi terlaris yang paling digemari para patron Nusavara lokal tanah air."}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
                {products.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setActiveDetailProduct(p)}
                    className={`p-3 border rounded-2xl transition-all duration-300 shadow-xs group cursor-pointer text-xs ${
                      themeMode === "dark" ? "bg-stone-900 border-stone-800 text-stone-100 hover:border-stone-500" : "bg-white border-stone-200 text-stone-900 hover:border-stone-500"
                    }`}
                  >
                    <div className={`aspect-square rounded-xl mb-3 flex items-center justify-center font-mono uppercase text-[9px] relative overflow-hidden ${
                      themeMode === "dark" ? "bg-stone-950 text-stone-500" : "bg-stone-100 text-stone-400"
                    }`}>
                      {p.image === "fashion" ? (
                        <span className={`p-6 rounded-lg text-center font-serif text-lg italic ${
                          themeMode === "dark" ? "bg-stone-900 text-stone-300" : "bg-stone-200 text-stone-850"
                        }`}>
                          FSHN
                        </span>
                      ) : p.image === "skincare" ? (
                        <span className={`p-6 rounded-lg text-center font-serif text-lg italic ${
                          themeMode === "dark" ? "bg-amber-950/40 text-amber-300" : "bg-amber-100 text-amber-900"
                        }`}>
                          SKIN
                        </span>
                      ) : (
                        <span className={`p-6 rounded-lg text-center font-serif text-lg italic ${
                          themeMode === "dark" ? "bg-emerald-950/40 text-emerald-300" : "bg-emerald-100 text-emerald-950"
                        }`}>
                          CRFT
                        </span>
                      )}
                      
                      {/* Top badge indicators like pre-order or preorder quota */}
                      {p.preorder && (
                        <span className="absolute top-2 left-2 bg-indigo-600 text-white font-mono text-[8px] font-black uppercase px-1.5 py-0.5 rounded">
                          Preorder
                        </span>
                      )}

                      {/* Best Seller ribbon banner */}
                      {p.badge && p.badge[0] && (
                        <span className="absolute top-2 right-2 bg-stone-900 text-white font-mono text-[8px] uppercase px-1.5 py-0.5 rounded">
                          {p.badge[0]}
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-[#C35232] dark:text-amber-500 text-[10px] uppercase font-mono block">
                      {p.subcategory}
                    </h4>

                    <h3 className={`font-black mt-0.5 group-hover:underline line-clamp-1 ${
                      themeMode === "dark" ? "text-stone-100" : "text-stone-950"
                    }`}>
                      {p.name}
                    </h3>

                    <div className="flex gap-2 items-center mt-1">
                      {p.discount_price ? (
                        <>
                          <span className={`font-mono font-bold ${themeMode === "dark" ? "text-stone-100" : "text-stone-900"}`}>
                            Rp {p.discount_price.toLocaleString()}
                          </span>
                          <span className="font-mono text-[10px] text-stone-400 line-through">
                            Rp {p.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className={`font-mono font-bold ${themeMode === "dark" ? "text-stone-100" : "text-stone-900"}`}>
                          Rp {p.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* View entire catalog route trigger */}
              <button
                onClick={() => handleNavigate("catalog")}
                className={`inline-block px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  themeMode === "dark" ? "bg-stone-100 text-stone-950 hover:bg-white" : "bg-stone-900 text-white hover:bg-stone-800"
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: tStatic("exploreCatalogBtn") }} />
              </button>
            </div>
          </div>
        </section>

        {/* Section: Catalog */}
        <section id="catalog" className="scroll-mt-28">
          <Catalog
            products={products}
            currentTemplate={currentTemplate}
            currentLang={currentLang as any}
            onOpenProductDetail={setActiveDetailProduct}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            themeMode={themeMode}
          />
        </section>

        {/* Section: Masalah & Solusi (Comparative Philosophy & Ecosystem) */}
        <section id="masalah-solusi" className={`scroll-mt-28 py-20 border-y transition-colors duration-300 ${
          themeMode === "dark" ? "bg-stone-900/60 border-stone-850" : "bg-stone-50 border-stone-200"
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full ${
                themeMode === "dark" ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-800"
              }`}>
                {tStatic("philosophyBadge")}
              </span>
              <h2 className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight ${
                themeMode === "dark" ? "text-white" : "text-stone-900"
              }`}>
                {tStatic("philosophyTitle")}
              </h2>
              <p className={`text-sm leading-relaxed ${
                themeMode === "dark" ? "text-stone-300" : "text-stone-600"
              }`}>
                {tStatic("philosophySubtitle")}
              </p>
            </div>

            {/* Comparative Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">
              
              {/* Left Column: Masalah (Tantangan) - Red theme */}
              <div className="bg-[#FFF8F7] border border-red-100 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-red-100/60">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-700">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-900">{tStatic("problemTitle")}</h3>
                    <p className="text-[11px] text-red-600 uppercase tracking-widest font-mono font-bold">{tStatic("problemSubtitle")}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-red-400 bg-red-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">01</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        {tStatic("problem1_title")}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tStatic("problem1_desc")}
                      </p>
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-red-400 bg-red-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">02</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        {tStatic("problem2_title")}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tStatic("problem2_desc")}
                      </p>
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-red-400 bg-red-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">03</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        {tStatic("problem3_title")}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tStatic("problem3_desc")}
                      </p>
                    </div>
                  </div>

                  {/* Problem 4 */}
                  <div className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-red-400 bg-red-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">04</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-red-500" />
                        {tStatic("problem4_title")}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tStatic("problem4_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Solusi (Ecosystem) - Green theme */}
              <div className="bg-[#F6FAF7] border border-emerald-100 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-emerald-100/60">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-900">{tStatic("solutionTitle")}</h3>
                    <p className="text-[11px] text-emerald-700 uppercase tracking-widest font-mono font-bold">{tStatic("solutionSubtitle")}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Solution 1 */}
                  <div className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">01</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        {tStatic("solution1_title")}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tStatic("solution1_desc")}
                      </p>
                    </div>
                  </div>

                  {/* Solution 2 */}
                  <div className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">02</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {tStatic("solution2_title")}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tStatic("solution2_desc")}
                      </p>
                    </div>
                  </div>

                  {/* Solution 3 */}
                  <div className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">03</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        {tStatic("solution3_title")}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tStatic("solution3_desc")}
                      </p>
                    </div>
                  </div>

                  {/* Solution 4 */}
                  <div className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">04</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <Leaf className="w-4 h-4 text-emerald-600" />
                        {tStatic("solution4_title")}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tStatic("solution4_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Premium CTA Callout */}
            <div className="bg-stone-900 text-stone-100 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="font-serif text-lg font-bold text-amber-400">
                  {currentLang === "en" ? "Ready to Be Part of the Change?" : currentLang === "ar" ? "هل أنت مستعد لتكون جزءًا من التغيير؟" : currentLang === "ja" ? "変化の一部になる準備はできていますか？" : currentLang === "ko" ? "변화의 주인공이 될 준비가 되셨나요?" : "Siap Menjadi Bagian dari Perubahan?"}
                </h4>
                <p className="text-xs text-stone-300">
                  {currentLang === "en" ? "Every purchase you make directly supports rural artisans and environmental conservation." : currentLang === "ar" ? "كل عملية شراء تقوم بها تدعم بشكل مباشر الحرفيين الريفيين والمحافظة على البيئة." : currentLang === "ja" ? "お買い上げいただくごとに、農村の職人支援と環境保全に直接つながります。" : currentLang === "ko" ? "모든 구매는 지역 장인 지원과 생태 환경 보전에 전액 기여됩니다." : "Setiap pembelian Anda berkontribusi langsung pada pemberdayaan pengrajin lokal dan kelestarian hayati."}
                </p>
              </div>
              <button
                onClick={() => handleNavigate("catalog")}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-wider text-[11px] rounded-full transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {currentLang === "en" ? "View Curated Collection" : currentLang === "ar" ? "عرض المجموعة المنسقة" : currentLang === "ja" ? "厳選コレクションを見る" : currentLang === "ko" ? "엄선된 컬렉션 보기" : "Lihat Koleksi Terkurasi"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Section: Video Demo & Interactive Simulator */}
        <section id="video-demo" className="scroll-mt-28 py-20 bg-stone-950 text-stone-100 border-y border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold tracking-widest uppercase rounded-full border border-amber-500/20">
                {dTrans.headerBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                {dTrans.title}
              </h2>
              <p className="text-sm text-stone-400 leading-relaxed">
                {dTrans.desc}
              </p>
            </div>

            {/* Layout Wrapper: Left Player Screen, Right Controller & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Interactive Player Screen: Column span 8 */}
              <div className="lg:col-span-8 flex flex-col justify-between bg-stone-900 border border-stone-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden min-h-[460px]">
                
                {/* Mock Browser/Player Topbar */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
                    <span className="text-[11px] font-mono text-stone-500 ml-4 hidden sm:inline-block">https://admin.nusavara.com/dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Device Switcher */}
                    <button
                      onClick={() => setVideoDeviceMode("desktop")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${videoDeviceMode === "desktop" ? "bg-stone-800 text-amber-400" : "text-stone-500 hover:text-stone-300"}`}
                      title={dTrans.laptopTooltip}
                    >
                      <Laptop className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setVideoDeviceMode("mobile")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${videoDeviceMode === "mobile" ? "bg-stone-800 text-amber-400" : "text-stone-500 hover:text-stone-300"}`}
                      title={dTrans.phoneTooltip}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Simulated Screen Content based on Mode & Active Chapter */}
                <div className="flex-1 flex items-center justify-center py-4 relative z-10">
                  {videoDeviceMode === "desktop" ? (
                    /* DESKTOP FRAME */
                    <div className="w-full bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-lg flex flex-col min-h-[320px]">
                      {/* Inner Admin Navigation */}
                      <div className="bg-stone-900 px-4 py-2 flex items-center justify-between border-b border-stone-800 text-[10px] text-stone-400 font-mono">
                        <div className="flex items-center gap-3">
                          <span className="text-amber-400 font-bold">{dTrans.adminTitle}</span>
                          <span className="opacity-40">|</span>
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {dTrans.dbSync}
                          </span>
                        </div>
                        <div>User: {translations[currentLang as any]?.role_admin || "Administrator"}</div>
                      </div>

                      {/* Screen Content */}
                      <div className="p-4 flex-1 text-xs">
                        {activeVideoChapter === "cms" && (
                          /* CHAPTER 1: CMS MULTI-BAHASA MOCK */
                          <div className="space-y-4 font-sans">
                            <div className="flex justify-between items-center bg-stone-900/60 p-3 rounded-xl border border-stone-800/50">
                              <div>
                                <h4 className="font-serif font-bold text-sm text-stone-100">{dTrans.catalogHeader}</h4>
                                <p className="text-[10px] text-stone-500 font-mono">{dTrans.localizationInfo}</p>
                              </div>
                              <div className="flex gap-1.5">
                                <span className="px-2 py-0.5 bg-stone-800 rounded text-[10px] text-amber-300 font-bold font-mono">ID</span>
                                <span className="px-2 py-0.5 bg-stone-800 rounded text-[10px] text-stone-500">EN</span>
                                <span className="px-2 py-0.5 bg-stone-800 rounded text-[10px] text-stone-500">AR</span>
                                <span className="px-2 py-0.5 bg-stone-800 rounded text-[10px] text-stone-500">JA</span>
                                <span className="px-2 py-0.5 bg-stone-800 rounded text-[10px] text-stone-500">KO</span>
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              {/* Product row */}
                              <div className="bg-stone-900/40 p-2.5 rounded-xl border border-stone-800/40 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center font-mono text-[10px] text-amber-400 font-bold">Rami</div>
                                  <div>
                                    <p className="font-bold text-stone-100 text-xs">Kemeja Rami Modest (Soft Linen)</p>
                                    <p className="text-[10px] text-stone-500 font-mono">ID: PROD-RAMI-01 | Rp 450.000</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <p className="text-[10px] text-stone-400">{dTrans.stockQty}</p>
                                    <p className="font-bold text-amber-400 font-mono">{simulatedStockState} pcs</p>
                                  </div>
                                  <button
                                    onClick={() => setSimulatedStockState(prev => prev + 1)}
                                    className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg text-[10px] text-white transition-colors cursor-pointer"
                                  >
                                    {dTrans.addStock}
                                  </button>
                                </div>
                              </div>

                              {/* Product row 2 */}
                              <div className="bg-stone-900/40 p-2.5 rounded-xl border border-stone-800/40 flex justify-between items-center opacity-70">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center font-mono text-[10px] text-emerald-400 font-bold">Herba</div>
                                  <div>
                                    <p className="font-bold text-stone-100 text-xs">Temu Glow Facial Cleanser</p>
                                    <p className="text-[10px] text-stone-500 font-mono">ID: PROD-HERB-02 | Rp 185.000</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] text-stone-400">{dTrans.stockQty}</p>
                                  <p className="font-bold text-stone-300 font-mono">120 pcs</p>
                                </div>
                              </div>
                            </div>

                            <div className="text-center">
                              <span className="text-[10px] text-amber-400/85 font-mono bg-amber-500/5 px-3 py-1.5 rounded-full border border-amber-500/20">
                                {dTrans.simulatedDatabaseTip}
                              </span>
                            </div>
                          </div>
                        )}

                        {activeVideoChapter === "b2b" && (
                          /* CHAPTER 2: B2B PARTNER PORTAL MOCK */
                          <div className="space-y-4 font-sans">
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/50 text-center">
                                <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">{dTrans.totalReseller}</p>
                                <p className="text-lg font-bold text-white font-mono">{simulatedResellerStatus === "Pending" ? "14" : "15"}</p>
                              </div>
                              <div className="bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/50 text-center">
                                <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">{dTrans.pendingReview}</p>
                                <p className="text-lg font-bold text-amber-400 font-mono">{simulatedResellerStatus === "Pending" ? "1" : "0"}</p>
                              </div>
                              <div className="bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/50 text-center">
                                <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">{dTrans.totalHampers}</p>
                                <p className="text-lg font-bold text-emerald-400 font-mono">148 paket</p>
                              </div>
                            </div>

                            <div className="bg-stone-900/40 p-3 rounded-xl border border-stone-800/40 space-y-2">
                              <p className="font-bold text-stone-200 text-xs font-serif">{dTrans.inboxReseller}</p>
                              
                              <div className="flex justify-between items-center p-2 bg-stone-900/60 rounded-lg border border-stone-800/40">
                                <div className="space-y-0.5">
                                  <p className="font-bold text-stone-100">CV Pesona Batik Solo (Rina Astuti)</p>
                                  <p className="text-[9px] text-stone-500">Provinsi Jawa Tengah | KBLI 47711</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${simulatedResellerStatus === "Pending" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"}`}>
                                    {simulatedResellerStatus === "Pending" ? "Pending" : "Verified B2B"}
                                  </span>
                                  {simulatedResellerStatus === "Pending" && (
                                    <button
                                      onClick={() => setSimulatedResellerStatus("Approved")}
                                      className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-[9px] text-white font-bold cursor-pointer"
                                    >
                                      Approve
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-center">
                              <span className="text-[10px] text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/20 font-mono">
                                {simulatedResellerStatus === "Pending" ? dTrans.tipB2bPending : dTrans.tipB2bApproved}
                              </span>
                            </div>
                          </div>
                        )}

                        {activeVideoChapter === "customizer" && (
                          /* CHAPTER 3: CUSTOMIZER & STYLE GUIDE MOCK */
                          <div className="space-y-4 font-sans">
                            <div className="flex gap-4">
                              {/* Left Customizer Tool Controls */}
                              <div className="w-1/2 bg-stone-900/60 p-3 rounded-xl border border-stone-800/50 space-y-3">
                                <p className="font-bold text-stone-200 text-[11px] uppercase tracking-wider font-mono">{dTrans.styleEngineTitle}</p>
                                
                                <div className="space-y-1">
                                  <p className="text-[9px] text-stone-400">{dTrans.changeFont}</p>
                                  <div className="grid grid-cols-3 gap-1">
                                    <button
                                      onClick={() => setSimulatedFontFamily("sans")}
                                      className={`px-1.5 py-1 rounded text-[9px] font-bold cursor-pointer ${simulatedFontFamily === "sans" ? "bg-amber-500 text-stone-950" : "bg-stone-800 text-stone-400"}`}
                                    >
                                      Sans
                                    </button>
                                    <button
                                      onClick={() => setSimulatedFontFamily("serif")}
                                      className={`px-1.5 py-1 rounded text-[9px] font-bold cursor-pointer ${simulatedFontFamily === "serif" ? "bg-amber-500 text-stone-950" : "bg-stone-800 text-stone-400"}`}
                                    >
                                      Serif
                                    </button>
                                    <button
                                      onClick={() => setSimulatedFontFamily("mono")}
                                      className={`px-1.5 py-1 rounded text-[9px] font-bold cursor-pointer ${simulatedFontFamily === "mono" ? "bg-amber-500 text-stone-950" : "bg-stone-800 text-stone-400"}`}
                                    >
                                      Mono
                                    </button>
                                  </div>
                                </div>

                              <div className="space-y-1">
                                <p className="text-[9px] text-stone-400">{dTrans.changeDesignMode}</p>
                                <div className="grid grid-cols-2 gap-1 text-[9px]">
                                  <span className="bg-stone-850 text-stone-300 p-1 rounded font-mono text-[8px] text-center">PRIMARY: #D97706</span>
                                  <span className="bg-stone-850 text-stone-300 p-1 rounded font-mono text-[8px] text-center">BG: #FFFBEB</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Storefront Mock Reacting */}
                            <div className="w-1/2 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10 flex flex-col justify-between">
                              <p className="text-[9px] text-amber-400 uppercase tracking-widest font-mono text-center">Live Website Preview</p>
                              
                              <div className={`p-2 bg-stone-900/85 border border-stone-850 rounded-lg text-center space-y-1.5 ${simulatedFontFamily === "sans" ? "font-sans" : simulatedFontFamily === "serif" ? "font-serif" : "font-mono"}`}>
                                <p className="text-[9px] text-amber-500 uppercase font-bold tracking-widest">Temu Glow</p>
                                <h5 className="font-bold text-[10px] text-stone-100">{dTrans.previewFontTitle}</h5>
                                <button className="px-3 py-1 bg-amber-500 text-stone-950 font-bold uppercase rounded-full text-[8px] tracking-wider w-full">
                                  {dTrans.buyNow}
                                </button>
                              </div>

                              <p className="text-[8px] text-stone-500 text-center mt-2">{dTrans.previewFontTip}: <span className="font-bold text-amber-400 uppercase">{simulatedFontFamily}</span></p>
                            </div>
                          </div>

                          <div className="bg-stone-900/50 p-2 rounded-xl border border-stone-800/40 flex items-center gap-2.5">
                            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                            <p className="text-[10px] text-stone-400 leading-normal">
                              <span className="text-amber-300 font-bold">{dTrans.aiCopywriting}:</span> "{dTrans.aiCleanText}"
                            </p>
                          </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* MOBILE FRAME (iPhone Frame Mock) */
                    <div className="w-[200px] bg-stone-950 border-4 border-stone-850 rounded-[32px] overflow-hidden shadow-2xl flex flex-col min-h-[320px] relative">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-24 bg-stone-850 rounded-b-xl z-20" />
                      
                      {/* Content Area */}
                      <div className="flex-1 bg-stone-900 p-3 pt-6 flex flex-col justify-between text-[10px]">
                        {/* Mobile Header */}
                        <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                          <span className="font-bold text-amber-400 tracking-wider">NUSAVARA</span>
                          <span className="bg-stone-950 px-1.5 py-0.5 rounded text-[8px] text-stone-400">ID 🇮🇩</span>
                        </div>

                        {/* Mobile Main Body */}
                        <div className="py-3 space-y-2 flex-1">
                          {activeVideoChapter === "cms" && (
                            <div className="space-y-2">
                              <div className="h-16 rounded-lg bg-stone-950 flex items-center justify-center font-bold text-amber-400 text-center p-2 font-serif border border-stone-800">
                                Kemeja Rami Premium
                              </div>
                              <div className="space-y-1 bg-stone-950 p-2 rounded-lg border border-stone-800">
                                <div className="flex justify-between">
                                  <span>{dTrans.stockQty}</span>
                                  <span className="text-amber-300 font-mono font-bold">{simulatedStockState} pcs</span>
                                </div>
                                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-amber-400 h-full" style={{ width: `${Math.min(100, (simulatedStockState / 80) * 100)}%` }} />
                                </div>
                              </div>
                            </div>
                          )}

                          {activeVideoChapter === "b2b" && (
                            <div className="space-y-2">
                              <div className="p-2 bg-stone-950 rounded-lg text-center space-y-1 border border-stone-800">
                                <p className="text-[8px] text-emerald-400 uppercase font-mono font-bold">{dTrans.b2bWholesale}</p>
                                <p className="font-bold text-[9px]">{dTrans.b2bTitle}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-1.5">
                                <div className="bg-stone-950 p-1.5 rounded text-center border border-emerald-500/20 text-[8px] text-stone-300">
                                  {dTrans.boxTraditional}
                                </div>
                                <div className="bg-stone-950 p-1.5 rounded text-center border border-stone-800 text-[8px] text-stone-500">
                                  {dTrans.boxMinimalist}
                                </div>
                              </div>
                            </div>
                          )}

                          {activeVideoChapter === "customizer" && (
                            <div className={`space-y-1.5 ${simulatedFontFamily === "sans" ? "font-sans" : simulatedFontFamily === "serif" ? "font-serif" : "font-mono"}`}>
                              <p className="text-[8px] text-stone-400">{dTrans.welcomeStore}</p>
                              <h5 className="font-bold text-[11px] text-white">Nusavara Local Premium</h5>
                              <p className="text-[8px] text-amber-400">{dTrans.localGoodsElevated}</p>
                              <div className="h-10 bg-stone-950 rounded-lg flex items-center justify-center text-[8px] text-stone-500 italic border border-stone-850">
                                {dTrans.activeFont}: {simulatedFontFamily}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Mobile Footer Tab Bar */}
                        <div className="grid grid-cols-3 gap-1 pt-2 border-t border-stone-800 text-center text-[7px] text-stone-500">
                          <span className="text-amber-400 font-bold">Catalog</span>
                          <span>B2B Portal</span>
                          <span>My Account</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Play Overlay if not playing */}
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs flex flex-col items-center justify-center z-20 space-y-3">
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
                      >
                        <Play className="w-8 h-8 fill-stone-950 ml-1" />
                      </button>
                      <span className="text-xs font-bold text-stone-300 tracking-wider">{dTrans.clickToPlay}</span>
                    </div>
                  )}
                </div>

                {/* Subtitle / Telemetry Caption Box (Live synchronized subtitles!) */}
                <div className="bg-stone-950 border border-stone-800 p-3 sm:p-4 rounded-2xl min-h-[56px] flex items-center justify-center text-center relative overflow-hidden z-10 mt-4">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500" />
                  <p className="text-xs text-stone-300 font-sans leading-relaxed">
                    {isVideoPlaying ? (
                      getCurrentSubtitle()
                    ) : (
                      <span className="italic text-stone-500">{dTrans.autoplayTip}</span>
                    )}
                  </p>
                </div>

              </div>

              {/* Sidebar Controller Deck: Column span 4 */}
              <div className="lg:col-span-4 flex flex-col justify-between bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-6">
                
                {/* Chapters / Navigation */}
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-white">{dTrans.walkthroughSection}</h3>
                  <div className="space-y-3">
                    
                    {/* Chapter 1 */}
                    <button
                      onClick={() => {
                        setActiveVideoChapter("cms");
                        setVideoPlaybackTime(0);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer border flex items-center gap-3 ${activeVideoChapter === "cms" ? "bg-stone-950 border-amber-500/50 text-white" : "bg-stone-950/40 border-stone-850 hover:bg-stone-950/80 text-stone-400"}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeVideoChapter === "cms" ? "bg-amber-500 text-stone-950 font-bold" : "bg-stone-800 text-stone-400"}`}>
                        01
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold">{dTrans.ch1Title}</p>
                        <p className="text-[10px] opacity-60 font-mono">{dTrans.ch1Sub}</p>
                      </div>
                    </button>

                    {/* Chapter 2 */}
                    <button
                      onClick={() => {
                        setActiveVideoChapter("b2b");
                        setVideoPlaybackTime(0);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer border flex items-center gap-3 ${activeVideoChapter === "b2b" ? "bg-stone-950 border-amber-500/50 text-white" : "bg-stone-950/40 border-stone-850 hover:bg-stone-950/80 text-stone-400"}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeVideoChapter === "b2b" ? "bg-amber-500 text-stone-950 font-bold" : "bg-stone-800 text-stone-400"}`}>
                        02
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold">{dTrans.ch2Title}</p>
                        <p className="text-[10px] opacity-60 font-mono">{dTrans.ch2Sub}</p>
                      </div>
                    </button>

                    {/* Chapter 3 */}
                    <button
                      onClick={() => {
                        setActiveVideoChapter("customizer");
                        setVideoPlaybackTime(0);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer border flex items-center gap-3 ${activeVideoChapter === "customizer" ? "bg-stone-950 border-amber-500/50 text-white" : "bg-stone-950/40 border-stone-850 hover:bg-stone-950/80 text-stone-400"}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeVideoChapter === "customizer" ? "bg-amber-500 text-stone-950 font-bold" : "bg-stone-800 text-stone-400"}`}>
                        03
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold">{dTrans.ch3Title}</p>
                        <p className="text-[10px] opacity-60 font-mono">{dTrans.ch3Sub}</p>
                      </div>
                    </button>

                  </div>
                </div>

                {/* Progress Timeline Player controls */}
                <div className="space-y-4 pt-6 border-t border-stone-800">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="p-2 bg-stone-950 hover:bg-stone-800 rounded-full text-amber-400 transition-colors cursor-pointer"
                        title={isVideoPlaying ? "Pause" : "Play"}
                      >
                        {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-amber-400" />}
                      </button>
                      <span className="font-mono font-bold text-white">
                        0:{videoPlaybackTime < 10 ? `0${videoPlaybackTime}` : videoPlaybackTime}
                      </span>
                      <span>/</span>
                      <span className="font-mono">0:30</span>
                    </div>
                    <span className="text-[10px] text-stone-500 uppercase font-mono">Auto Loop Active</span>
                  </div>

                  {/* Playback Slider */}
                  <div className="relative w-full h-1.5 bg-stone-950 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 bottom-0 bg-amber-500 transition-all duration-300"
                      style={{ width: `${(videoPlaybackTime / 30) * 100}%` }}
                    />
                  </div>

                  {/* Interactive Manual Sandbox Banner */}
                  <div className="p-3 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-[11px] text-stone-400 leading-relaxed text-center">
                    <span className="font-bold text-amber-400">💡 Simulasi Interaktif:</span> Anda dapat mengetuk tombol-tombol pada monitor pratinjau kapan saja untuk menguji performa dashboard secara langsung!
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Section: Testimonial & Success Stories */}
        <section id="testimonials" className="scroll-mt-28 py-24 bg-[#FAF9F6] dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3 py-1 bg-stone-900 text-stone-100 text-[10px] font-mono tracking-widest uppercase rounded-full border border-stone-800">
                {tStatic("testimonial_badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
                {tStatic("testimonial_title")}
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {tStatic("testimonial_subtitle")}
              </p>
            </div>

            {/* Testimonials Grid - 4 premium cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              
              {/* Card 1 */}
              <div className="bg-white dark:bg-stone-950 border border-stone-250/80 dark:border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
                <div className="space-y-4 relative z-10">
                  {/* Stars & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-stone-200/80 group-hover:text-amber-500/15 transition-colors" />
                  </div>
                  {/* Quote Text */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                    {tStatic("t1_quote")}
                  </p>
                </div>
                {/* Person Info */}
                <div className="pt-6 border-t border-stone-100 dark:border-stone-850 mt-6 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-mono font-bold flex items-center justify-center text-xs shrink-0 border border-amber-200 dark:border-amber-900/50">
                    AW
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-stone-900 dark:text-stone-200 text-xs truncate">{tStatic("t1_name")}</p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{tStatic("t1_role")}</p>
                    <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-md border border-amber-150 dark:border-amber-900/50 font-bold uppercase">
                      {tStatic("t1_tag")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-stone-950 border border-stone-250/80 dark:border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
                <div className="space-y-4 relative z-10">
                  {/* Stars & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-stone-200/80 group-hover:text-emerald-500/15 transition-colors" />
                  </div>
                  {/* Quote Text */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                    {tStatic("t2_quote")}
                  </p>
                </div>
                {/* Person Info */}
                <div className="pt-6 border-t border-stone-100 dark:border-stone-850 mt-6 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-xs shrink-0 border border-emerald-200 dark:border-emerald-900/50">
                    SA
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-stone-900 dark:text-stone-200 text-xs truncate">{tStatic("t2_name")}</p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{tStatic("t2_role")}</p>
                    <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-md border border-emerald-150 dark:border-emerald-900/50 font-bold uppercase">
                      {tStatic("t2_tag")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-stone-950 border border-stone-250/80 dark:border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-stone-500/5 rounded-bl-full pointer-events-none group-hover:bg-stone-500/10 transition-colors" />
                <div className="space-y-4 relative z-10">
                  {/* Stars & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-stone-200/80 group-hover:text-stone-500/15 transition-colors" />
                  </div>
                  {/* Quote Text */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                    {tStatic("t3_quote")}
                  </p>
                </div>
                {/* Person Info */}
                <div className="pt-6 border-t border-stone-100 dark:border-stone-850 mt-6 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300 font-mono font-bold flex items-center justify-center text-xs shrink-0 border border-stone-250 dark:border-stone-700">
                    BH
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-stone-900 dark:text-stone-200 text-xs truncate">{tStatic("t3_name")}</p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{tStatic("t3_role")}</p>
                    <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-md border border-stone-250 dark:border-stone-700 font-bold uppercase">
                      {tStatic("t3_tag")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white dark:bg-stone-950 border border-stone-250/80 dark:border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
                <div className="space-y-4 relative z-10">
                  {/* Stars & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-stone-200/80 group-hover:text-blue-500/15 transition-colors" />
                  </div>
                  {/* Quote Text */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                    {tStatic("t4_quote")}
                  </p>
                </div>
                {/* Person Info */}
                <div className="pt-6 border-t border-stone-100 dark:border-stone-850 mt-6 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-mono font-bold flex items-center justify-center text-xs shrink-0 border border-blue-200 dark:border-blue-900/50">
                    NT
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-stone-900 dark:text-stone-200 text-xs truncate">{tStatic("t4_name")}</p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{tStatic("t4_role")}</p>
                    <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-md border border-blue-150 dark:border-blue-900/50 font-bold uppercase">
                      {tStatic("t4_tag")}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Section: Lookbook & Drop */}
        <section id="limited-drop" className="scroll-mt-28">
          <StaticPages
            view="limited-drop"
            currentTemplate={currentTemplate}
            resellers={resellers}
            onAddReseller={handleAddReseller}
            inquiries={inquiries}
            onAddInquiry={handleAddInquiry}
            orders={orders}
            blogs={initialBlogs}
            faqs={initialFAQs}
            complianceDocs={complianceDocs}
            showToast={showToast}
            currentLang={currentLang as any}
          />
        </section>

        {/* Section: Edukasi & Blog */}
        <section id="blog" className="scroll-mt-28">
          <StaticPages
            view="blog"
            currentTemplate={currentTemplate}
            resellers={resellers}
            onAddReseller={handleAddReseller}
            inquiries={inquiries}
            onAddInquiry={handleAddInquiry}
            orders={orders}
            blogs={initialBlogs}
            faqs={initialFAQs}
            complianceDocs={complianceDocs}
            showToast={showToast}
            currentLang={currentLang as any}
          />
        </section>

        {/* Section: Legalitas & Trust */}
        <section id="compliance" className="scroll-mt-28">
          <StaticPages
            view="compliance"
            currentTemplate={currentTemplate}
            resellers={resellers}
            onAddReseller={handleAddReseller}
            inquiries={inquiries}
            onAddInquiry={handleAddInquiry}
            orders={orders}
            blogs={initialBlogs}
            faqs={initialFAQs}
            complianceDocs={complianceDocs}
            showToast={showToast}
            currentLang={currentLang as any}
          />
        </section>

        {/* Section: Program Reseller */}
        <section id="reseller" className="scroll-mt-28">
          <StaticPages
            view="reseller"
            currentTemplate={currentTemplate}
            resellers={resellers}
            onAddReseller={handleAddReseller}
            inquiries={inquiries}
            onAddInquiry={handleAddInquiry}
            orders={orders}
            blogs={initialBlogs}
            faqs={initialFAQs}
            complianceDocs={complianceDocs}
            showToast={showToast}
            currentLang={currentLang as any}
          />
        </section>

        {/* Section: Corporate & Hampers */}
        <section id="corporate" className="scroll-mt-28">
          <StaticPages
            view="corporate"
            currentTemplate={currentTemplate}
            resellers={resellers}
            onAddReseller={handleAddReseller}
            inquiries={inquiries}
            onAddInquiry={handleAddInquiry}
            orders={orders}
            blogs={initialBlogs}
            faqs={initialFAQs}
            complianceDocs={complianceDocs}
            showToast={showToast}
            currentLang={currentLang as any}
          />
        </section>

        {/* Section: Akun Member */}
        <section id="account" className="scroll-mt-28">
          <StaticPages
            view="account"
            currentTemplate={currentTemplate}
            resellers={resellers}
            onAddReseller={handleAddReseller}
            inquiries={inquiries}
            onAddInquiry={handleAddInquiry}
            orders={orders}
            blogs={initialBlogs}
            faqs={initialFAQs}
            complianceDocs={complianceDocs}
            showToast={showToast}
            currentLang={currentLang as any}
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
            onLogin={(user) => {
              setCurrentUser(user);
              localStorage.setItem("nusavara_user", JSON.stringify(user));
              showToast(currentLang === "id" ? "Selamat datang kembali, " + user.name + "!" : "Welcome back, " + user.name + "!", "success");
            }}
            onRegister={(user) => {
              setCurrentUser(user);
              localStorage.setItem("nusavara_user", JSON.stringify(user));
              showToast(currentLang === "id" ? "Pendaftaran berhasil! Selamat bergabung, " + user.name + "!" : "Registration successful! Welcome, " + user.name + "!", "success");
            }}
            onLogout={() => {
              setCurrentUser(null);
              localStorage.removeItem("nusavara_user");
              showToast(currentLang === "id" ? "Sesi Anda telah diakhiri. Berhasil keluar." : "Your session has ended. Successfully logged out.", "success");
            }}
          />
        </section>

        {/* Section: Elegant Call to Action (CTA) */}
        <section id="cta" className="py-24 bg-stone-900 border-t border-stone-800 text-stone-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.06),transparent_45%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.04),transparent_40%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-stone-950 border border-stone-800/80 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-bl-[100px] pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Text Contents */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold tracking-widest uppercase rounded-full border border-amber-500/20">
                    <Sparkles className="w-3 h-3 animate-pulse" /> {tStatic("ctaBadge").replace("💡 ", "")}
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
                    {tStatic("ctaTitle")}
                  </h2>
                  
                  <p className="text-sm sm:text-base text-stone-400 leading-relaxed">
                    {tStatic("ctaSubtitle")}
                  </p>
                  
                  {/* Trust Badges */}
                  <div className="pt-4 grid grid-cols-3 gap-4 border-t border-stone-900 text-left">
                    <div>
                      <p className="text-lg font-bold text-white font-mono">100%</p>
                      <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">{tStatic("ctaMetric1")}</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-400 font-mono">5 Menit</p>
                      <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">{tStatic("ctaMetric2")}</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-amber-400 font-mono">Gratis</p>
                      <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">{tStatic("ctaMetric3")}</p>
                    </div>
                  </div>
                </div>

                {/* Right: CTA Option Buttons / Panel */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  
                  {/* B2C Card CTA */}
                  <div className="bg-stone-900/60 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-all group">
                    <div className="space-y-1 text-left mb-4">
                      <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest">{tStatic("ctaRetailHeader")}</span>
                      <h4 className="font-serif font-bold text-base text-white">{tStatic("ctaRetailSub")}</h4>
                      <p className="text-xs text-stone-400 leading-normal">
                        {tStatic("ctaRetailDesc")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate("catalog")}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-stone-950 font-bold uppercase rounded-xl text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {tStatic("ctaRetailBtn")} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* B2B Partner Card CTA */}
                  <div className="bg-stone-900/40 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-500/30 transition-all group">
                    <div className="space-y-1 text-left mb-4">
                      <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">{tStatic("ctaCorpHeader")}</span>
                      <h4 className="font-serif font-bold text-base text-white">{tStatic("ctaCorpSub")}</h4>
                      <p className="text-xs text-stone-400 leading-normal">
                        {tStatic("ctaCorpDesc")}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => handleNavigate("reseller")}
                        className="py-2.5 bg-stone-800 hover:bg-stone-700 active:scale-[0.98] text-stone-200 font-bold uppercase rounded-lg text-[10px] tracking-wider transition-all cursor-pointer border border-stone-700"
                      >
                        {tStatic("ctaCorpResellerBtn")}
                      </button>
                      <button
                        onClick={() => handleNavigate("corporate")}
                        className="py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold uppercase rounded-lg text-[10px] tracking-wider transition-all cursor-pointer"
                      >
                        {tStatic("ctaCorpBtn")}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Immersive Product Detail Modal Window */}
      {activeDetailProduct && (
        <ProductDetailModal
          product={activeDetailProduct}
          onClose={() => setActiveDetailProduct(null)}
          onAddToCart={(prod, qty, size, color) => {
            handleAddToCart(prod, qty, size, color);
            setActiveDetailProduct(null);
          }}
          currentTemplate={currentTemplate}
          complianceDocs={complianceDocs}
          currentLang={currentLang as any}
          themeMode={themeMode}
        />
      )}

      {/* 4. Beautiful Slide-over Checkout Drawer Cart */}
      {isCartOpen && (
        <CartCheckout
          cart={cart}
          onUpdateQty={handleUpdateCartQty}
          onRemoveItem={handleRemoveCartItem}
          onClose={() => setIsCartOpen(false)}
          currentTemplate={currentTemplate}
          onPlaceOrder={handlePlaceOrder}
          loyaltyPoints={loyaltyPoints}
          themeMode={themeMode}
        />
      )}

      {/* 4.5. Beautiful Slide-over Wishlist Drawer */}
      {isWishlistOpen && (
        <WishlistDrawer
          wishlist={wishlist}
          products={products}
          onClose={() => setIsWishlistOpen(false)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onOpenProductDetail={setActiveDetailProduct}
          currentTemplate={currentTemplate}
          themeMode={themeMode}
        />
      )}

      {/* 5. Giant Role-based CRM & CMS control Dashboard Panel */}
      {isAdminOpen && (
        <AdminPanel
          products={products}
          onUpdateProducts={setProducts}
          orders={orders}
          onUpdateOrders={setOrders}
          resellers={resellers}
          onUpdateResellers={setResellers}
          inquiries={inquiries}
          onUpdateInquiries={setInquiries}
          complianceDocs={complianceDocs}
          onUpdateComplianceDocs={setComplianceDocs}
          vouchers={vouchers}
          onUpdateVouchers={setVouchers}
          blogs={initialBlogs}
          onUpdateBlogs={() => {}}
          faqs={initialFAQs}
          onUpdateFaqs={() => {}}
          currentTemplate={currentTemplate}
          themeMode={themeMode}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* 6. Perpetual Interactive Floating AI Assistant sidebar */}
      <AiAssistant
        products={products}
        currentLang={currentLang}
        onSelectProduct={(p) => {
          setActiveDetailProduct(p);
        }}
      />

      {/* 7. Bottom Local Footer with compliance certificates */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-900 mt-16 text-xs text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img 
                src="/src/assets/images/nusavara_logo_1783569209711.jpg" 
                alt="Nusavara Logo" 
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-amber-500/20"
              />
              <h3 className="font-extrabold font-serif text-white tracking-widest text-sm sm:text-base">NUSAVARA</h3>
            </div>
            <p className="text-[11px] leading-relaxed">
              {footerTranslations[currentLang as LanguageCode]?.desc || footerTranslations.id.desc}
            </p>
            <div className="flex gap-2.5 text-[10px] font-mono text-stone-500">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Jakarta, Indonesia</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              {footerTranslations[currentLang as LanguageCode]?.catHeader || footerTranslations.id.catHeader}
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => { handleNavigate("catalog"); }} className="hover:text-amber-400 transition-colors">{footerTranslations[currentLang as LanguageCode]?.cat1 || footerTranslations.id.cat1}</button></li>
              <li><button onClick={() => { handleNavigate("catalog"); }} className="hover:text-amber-400 transition-colors">{footerTranslations[currentLang as LanguageCode]?.cat2 || footerTranslations.id.cat2}</button></li>
              <li><button onClick={() => { handleNavigate("catalog"); }} className="hover:text-amber-400 transition-colors">{footerTranslations[currentLang as LanguageCode]?.cat3 || footerTranslations.id.cat3}</button></li>
              <li><button onClick={() => { handleNavigate("catalog"); }} className="hover:text-amber-400 transition-colors">{footerTranslations[currentLang as LanguageCode]?.cat4 || footerTranslations.id.cat4}</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              {footerTranslations[currentLang as LanguageCode]?.b2bHeader || footerTranslations.id.b2bHeader}
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => handleNavigate("reseller")} className="hover:text-amber-400 transition-colors">{footerTranslations[currentLang as LanguageCode]?.b2b1 || footerTranslations.id.b2b1}</button></li>
              <li><button onClick={() => handleNavigate("corporate")} className="hover:text-amber-400 transition-colors">{footerTranslations[currentLang as LanguageCode]?.b2b2 || footerTranslations.id.b2b2}</button></li>
              <li><button onClick={() => handleNavigate("compliance")} className="hover:text-amber-400 transition-colors">{footerTranslations[currentLang as LanguageCode]?.b2b3 || footerTranslations.id.b2b3}</button></li>
              <li><button onClick={() => handleNavigate("blog")} className="hover:text-amber-400 transition-colors font-mono font-bold">{footerTranslations[currentLang as LanguageCode]?.b2b4 || footerTranslations.id.b2b4}</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              {footerTranslations[currentLang as LanguageCode]?.contactHeader || footerTranslations.id.contactHeader}
            </h4>
            <p className="text-[11px] leading-normal">
              {footerTranslations[currentLang as LanguageCode]?.contactDesc || footerTranslations.id.contactDesc}
            </p>
            <span className="block font-mono text-white text-xs font-bold leading-none flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-amber-500" /> +62 821-2290-NSV</span>
          </div>

        </div>

        {/* Legal notice strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-900 mt-8 pt-6 flex flex-wrap justify-between items-center gap-3 text-[10px] text-stone-500 font-mono">
          <p>
            {footerTranslations[currentLang as LanguageCode]?.copyright || footerTranslations.id.copyright}
            <a href="https://contech.id" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 font-bold hover:underline">Contech ID</a>.
          </p>
          <div className="flex gap-4">
            <span>{footerTranslations[currentLang as LanguageCode]?.bpom || footerTranslations.id.bpom}</span>
            <span>{footerTranslations[currentLang as LanguageCode]?.halal || footerTranslations.id.halal}</span>
          </div>
        </div>
      </footer>

      {/* Custom Confirmation Modal (Yes/No Dialog) */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-3xl p-6 shadow-2xl max-w-sm w-full space-y-4 text-left transition-all duration-300">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-500">
              <AlertTriangle className="w-6 h-6 shrink-0 text-amber-600 dark:text-amber-500" />
              <h3 className="text-base font-extrabold text-stone-900 dark:text-white" style={{ fontFamily: currentTemplate.headingFont }}>
                {confirmModal.title}
              </h3>
            </div>
            
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              {confirmModal.message}
            </p>
            
            <div className="flex gap-3 pt-2 font-sans">
              <button
                onClick={() => {
                  setConfirmModal(null);
                }}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 font-bold uppercase rounded-xl text-[10px] tracking-wider transition-all cursor-pointer text-center border border-stone-200 dark:border-stone-750"
              >
                Tidak, Batal
              </button>
              <button
                onClick={() => {
                  confirmModal.onConfirm();
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase rounded-xl text-[10px] tracking-wider transition-all cursor-pointer text-center shadow-md hover:shadow-rose-600/20"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications System */}
      <div className="fixed top-4 right-4 z-[99] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.01]"
          >
            {toast.type === "success" && (
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            )}
            {toast.type === "info" && (
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}
            {toast.type === "warning" && (
              <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 leading-normal text-left font-sans">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => {
                setToasts((prev) => prev.filter((t) => t.id !== toast.id));
              }}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
