import { useState } from "react";
import { 
  Sun, 
  Moon, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  Globe,
  LayoutGrid
} from "lucide-react";
import { staticTranslations } from "../data/staticTranslations";

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  wishlistCount: number;
  currentLang: "id" | "en" | "ar" | "ja" | "ko";
  onSelectLang: (lang: "id" | "en" | "ar" | "ja" | "ko") => void;
  currentTemplate: any;
  onSelectTemplate: (templateName: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  themeMode?: "light" | "dark";
  onToggleTheme?: () => void;
  currentUser?: any;
}

export default function Navbar({
  activeView,
  onNavigate,
  cartCount,
  wishlistCount,
  currentLang,
  onSelectLang,
  currentTemplate,
  onSelectTemplate,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  themeMode = "light",
  onToggleTheme = () => {},
  currentUser = null
}: NavbarProps) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [tempMenuOpen, setTempMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const langNames = {
    id: "Bahasa Indonesia",
    en: "English (US)",
    ar: "Arabic (Saudi)",
    ja: "Japanese (Nihongo)",
    ko: "Korean (Hangul)"
  };

  const uiTranslations = {
    id: {
      tagline: "Nusavara Local Premium Multi-Store Engine",
      design: "Desain",
      chooseTheme: "Pilih Eksklusif Look & feel (10 Demo)",
      chooseThemeDesc: "Mengubah warna, tata letak, hero, font, dan nuansa visual katalog seketika",
      langPlatform: "Bahasa Platform",
      adminCrm: "Admin CRM & CMS",
      lightMode: "Ganti ke Mode Terang",
      darkMode: "Ganti ke Mode Gelap",
      wishlist: "Favorit Saya",
      cart: "Keranjang Belanja",
      loyalty: "Akun Loyalti & Member"
    },
    en: {
      tagline: "Nusavara Local Premium Multi-Store Engine",
      design: "Design",
      chooseTheme: "Select Exclusive Look & Feel (10 Demos)",
      chooseThemeDesc: "Instantly adjust colors, layout, hero, typography, and catalog visuals",
      langPlatform: "Platform Language",
      adminCrm: "Admin CRM & CMS",
      lightMode: "Switch to Light Mode",
      darkMode: "Switch to Dark Mode",
      wishlist: "My Favorites",
      cart: "Shopping Cart",
      loyalty: "Loyalty Account & Member"
    },
    ar: {
      tagline: "محرك نوسافارا الفاخر متعدد المتاجر المحلية",
      design: "التصميم",
      chooseTheme: "اختر المظهر والأسلوب الحصري (10 عروض تجريبية)",
      chooseThemeDesc: "تغيير الألوان والتخطيط والخط والمرئيات في الكتالوج على الفور",
      langPlatform: "لغة المنصة",
      adminCrm: "إدارة علاقات العملاء والمحتوى",
      lightMode: "التبديل إلى الوضع المضيء",
      darkMode: "التبديل إلى الوضع الداكن",
      wishlist: "مفضلتي",
      cart: "عربة التسوق",
      loyalty: "حساب الولاء والأعضاء"
    },
    ja: {
      tagline: "Nusavara ローカルプレミアムマルチストアエンジン",
      design: "デザイン",
      chooseTheme: "専用 of ルック＆フィールを選択（10デモ）",
      chooseThemeDesc: "カタログの色、レイアウト、ヒーロー、フォント、ビジュアルを瞬時に変更",
      langPlatform: "システム言語",
      adminCrm: "Admin CRM & CMS 管理",
      lightMode: "ライトモードに切り替え",
      darkMode: "ダークモードに切り替え",
      wishlist: "お気に入り",
      cart: "ショッピングカート",
      loyalty: "ロイヤルティアカウント＆会員"
    },
    ko: {
      tagline: "누사바라 로컬 프리미엄 멀티 스토어 엔진",
      design: "디자인 테마",
      chooseTheme: "독점 룩앤필 선택 (10개 데모)",
      chooseThemeDesc: "카탈로그의 색상, 레이아웃, 히어로, 폰트, 비주얼 테마를 즉시 전환",
      langPlatform: "플랫폼 언어",
      adminCrm: "Admin CRM & CMS 관리자",
      lightMode: "라이트 모드로 전환",
      darkMode: "다크 모드로 전환",
      wishlist: "위시리스트",
      cart: "장바구니",
      loyalty: "로열티 계정 및 멤버십"
    }
  };

  const primaryNavItems = [
    { key: "home", label: "Home", view: "home" },
    { key: "catalog", label: "Katalog", view: "catalog" },
    { key: "limited-drop", label: "Lookbook Drop", view: "limited-drop" },
    { key: "reseller", label: "Reseller", view: "reseller" },
    { key: "corporate", label: "Corporate Gift", view: "corporate" },
    { key: "account", label: "Member", view: "account" }
  ];

  const secondaryNavItems = [
    { key: "masalah-solusi", label: "Solusi", view: "masalah-solusi" },
    { key: "video-demo", label: "Video Demo", view: "video-demo" },
    { key: "testimonials", label: "Testimoni", view: "testimonials" },
    { key: "blog", label: "Edukasi", view: "blog" },
    { key: "compliance", label: "Legalitas", view: "compliance" }
  ];

  const navItems = [...primaryNavItems, ...secondaryNavItems];

  const isDark = themeMode === "dark";

  const t = (key: keyof typeof uiTranslations.id) => {
    return uiTranslations[currentLang]?.[key] || uiTranslations.id[key];
  };

  const navLabel = (item: typeof navItems[0]) => {
    return (staticTranslations[currentLang] as any)?.[item.key] || item.label;
  };

  return (
    <nav className={`sticky top-0 z-40 border-b transition-all duration-300 shadow-xs ${
      isDark ? "bg-stone-950/95 border-stone-850 text-stone-100" : "bg-white/95 border-stone-200 text-stone-900"
    }`}>
      {/* Super Top micro bar for language & template selections */}
      <div className={`text-[10px] py-1 px-4 border-b transition-colors ${
        isDark ? "bg-stone-900 border-stone-800 text-stone-400" : "bg-stone-50 border-stone-100 text-stone-500"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <span className="font-mono text-[9px] uppercase tracking-wider">{t("tagline")}</span>
          
          <div className="flex items-center gap-4">
            {/* Quick Template Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTempMenuOpen(!tempMenuOpen)}
                className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer font-bold font-mono"
              >
                <LayoutGrid className="w-3 h-3 text-amber-500" />
                <span>{t("design")}: <span className="uppercase text-amber-600 font-black">{currentTemplate?.id || currentTemplate}</span></span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {tempMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setTempMenuOpen(false)} />
                  <div className={`absolute right-0 mt-1 w-72 rounded-xl shadow-2xl border p-2 z-50 text-left ${
                    isDark ? "bg-stone-950 border-stone-800 text-stone-100" : "bg-white border-stone-200 text-stone-900"
                  }`}>
                    <div className="p-2 border-b border-stone-200 dark:border-stone-850 mb-1">
                      <span className="block text-[10px] font-bold uppercase text-amber-600">{t("chooseTheme")}</span>
                      <span className="block text-[8px] text-stone-400 mt-0.5">{t("chooseThemeDesc")}</span>
                    </div>
                    {[
                      { name: "default", desc: "Default Premium Classic Elegant" },
                      { name: "minimalist_white", desc: "Sleek Ultra Modern Light Minimalist" },
                      { name: "bold_noir", desc: "High Contrast Brutalist Noir Slate" },
                      { name: "vintage_warmth", desc: "Nostalgic Cozy Sepia Editorial" },
                      { name: "cyberpunk_neon", desc: "Vibrant Futuristic Techno Dark" },
                      { name: "earthy_forest", desc: "Organic Healing Zen Forest Sage" },
                      { name: "royal_gold", desc: "Lavish Regal Imperial Gold Accents" },
                      { name: "swiss_clean", desc: "Grid Helvetica Editorial Style" },
                      { name: "ocean_breeze", desc: "Fresh Coastal Sea Foam & Sand" },
                      { name: "cosmic_slate", desc: "Astronomical Space Slate Dark Aura" }
                    ].map((tName) => (
                      <button
                        key={tName.name}
                        onClick={() => {
                          onSelectTemplate(tName.name);
                          setTempMenuOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 text-[10px] rounded-lg transition-all cursor-pointer font-mono ${
                          (currentTemplate?.id || currentTemplate) === tName.name
                            ? "bg-amber-500 text-stone-950 font-bold"
                            : "hover:bg-stone-100 dark:hover:bg-stone-900"
                        }`}
                      >
                        <span className="block uppercase leading-none font-bold">{tName.name.replace("_", " ")}</span>
                        <span className="block text-[7px] text-stone-400 mt-0.5 leading-none">{tName.desc}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Language Selection */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer font-bold font-mono"
              >
                <Globe className="w-3 h-3 text-amber-500" />
                <span className="uppercase">{currentLang}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className={`absolute right-0 mt-1 w-40 rounded-xl shadow-2xl border py-1 z-50 text-left ${
                    isDark ? "bg-stone-950 border-stone-800 text-stone-100" : "bg-white border-stone-200 text-stone-900"
                  }`}>
                    <span className="block px-3 py-1 text-[8px] font-bold text-stone-400 uppercase tracking-wider">{t("langPlatform")}</span>
                    {(Object.keys(langNames) as Array<keyof typeof langNames>).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          onSelectLang(lang);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                          currentLang === lang
                            ? "bg-stone-100 dark:bg-stone-900 text-amber-500 font-bold"
                            : "hover:bg-stone-50 dark:hover:bg-stone-900"
                        }`}
                      >
                        {langNames[lang]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Header Navbar content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Corporate Brand */}
          <button 
            onClick={() => onNavigate("home")} 
            className="flex items-center gap-2.5 hover:opacity-90 cursor-pointer group text-left"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-amber-500/30 flex items-center justify-center bg-stone-950 group-hover:scale-105 transition-all shadow-md">
              <img
                src="/src/assets/images/nusavara_logo_1783569209711.jpg"
                alt="Nusavara Brand Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-20" />
            </div>
            <div>
              <span className="block text-sm sm:text-base font-black tracking-tight leading-tight font-sans uppercase">NUSAVARA</span>
              <span className="block text-[8px] sm:text-[9px] text-amber-500 tracking-wider font-mono font-medium uppercase leading-none mt-0.5">EST. 2026 • HERBAL</span>
            </div>
          </button>
 
          {/* Desktop Navigation Linkages */}
          <div className="hidden lg:flex items-center gap-6">
            {primaryNavItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`text-[13px] font-medium tracking-wide uppercase transition-all pb-1 border-b-2 cursor-pointer ${
                    isActive
                      ? "border-amber-600 font-bold " + (isDark ? "text-white" : "text-stone-950")
                      : "border-transparent " + (isDark ? "text-stone-400 hover:text-white" : "text-stone-600 hover:text-stone-950 hover:border-stone-300")
                  }`}
                >
                  {navLabel(item)}
                </button>
              );
            })}

            {/* Dropdown for Secondary items */}
            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`text-[13px] font-medium tracking-wide uppercase transition-all pb-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  secondaryNavItems.some(item => activeView === item.view)
                    ? "border-amber-600 font-bold " + (isDark ? "text-white" : "text-stone-950")
                    : "border-transparent " + (isDark ? "text-stone-400 hover:text-white" : "text-stone-600 hover:text-stone-950 hover:border-stone-300")
                }`}
              >
                <span>{currentLang === "id" ? "Lainnya" : "More"}</span>
                <span className="text-[9px] opacity-80">▼</span>
              </button>
              
              {moreMenuOpen && (
                <>
                  {/* Click outside backdrop to close dropdown */}
                  <div className="fixed inset-0 z-40" onClick={() => setMoreMenuOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border z-50 overflow-hidden py-1.5 animate-fade-in ${
                    isDark ? "bg-stone-950 border-stone-850 text-stone-100" : "bg-white border-stone-200 text-stone-900"
                  }`}>
                    {secondaryNavItems.map((item) => (
                      <button
                        key={item.view}
                        onClick={() => {
                          onNavigate(item.view);
                          setMoreMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs uppercase tracking-wide font-medium transition-colors cursor-pointer ${
                          activeView === item.view
                            ? (isDark ? "bg-stone-900 text-amber-400 font-bold" : "bg-stone-100 text-stone-950 font-bold")
                            : (isDark ? "text-stone-400 hover:bg-stone-900 hover:text-white" : "text-stone-600 hover:bg-stone-50 hover:text-stone-950")
                        }`}
                      >
                        {navLabel(item)}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
 
          {/* Utility Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Mode Toggle (Light / Dark) */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isDark 
                  ? "text-amber-400 hover:text-amber-300 hover:bg-stone-900" 
                  : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
              }`}
              title={isDark ? t("lightMode") : t("darkMode")}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
 
            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className={`relative p-2 rounded-full transition-all cursor-pointer ${
                isDark 
                  ? "text-stone-300 hover:text-white hover:bg-stone-900" 
                  : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
              }`}
              title={t("wishlist")}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 font-sans font-bold bg-amber-500 text-stone-950 text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>
 
            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className={`relative p-2 rounded-full transition-all cursor-pointer ${
                isDark 
                  ? "text-stone-300 hover:text-white hover:bg-stone-900" 
                  : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
              }`}
              title={t("cart")}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 font-sans font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center ${
                  isDark ? "bg-amber-400 text-stone-950" : "bg-stone-900 text-white"
                }`}>
                  {cartCount}
                </span>
              )}
            </button>
 
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full cursor-pointer ${
                isDark ? "text-stone-300 hover:text-white hover:bg-stone-900" : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t p-4 space-y-2 transition-all duration-300 max-h-[70vh] overflow-y-auto ${
          isDark ? "bg-stone-950 border-stone-850 text-stone-100" : "bg-stone-50 border-stone-200 text-stone-900"
        }`}>
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                onNavigate(item.view);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-3 text-[14px] uppercase tracking-wide font-medium rounded-lg transition-all ${
                activeView === item.view
                  ? (isDark ? "bg-stone-900 text-white font-bold border border-stone-800" : "bg-stone-900 text-white font-bold")
                  : (isDark ? "text-stone-300 hover:bg-stone-900" : "text-stone-700 hover:bg-stone-200")
              }`}
            >
              {navLabel(item)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
