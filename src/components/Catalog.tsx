/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ShoppingBag,
  Star,
  Heart,
  Eye,
  Info,
  Layers,
  Sparkles,
  ClipboardCheck,
  Flower
} from "lucide-react";
import { Product, ProductCategory } from "../types";
import { DesignTemplate, initialSubCategories, initialCategories, translations } from "../data/seedData";
import { getLocalizedProduct, getLocalizedCategory, getLocalizedSubcategory } from "../utils/translationUtils";

const catalogTitleMap: Record<string, string> = {
  id: "Katalog Produk Premium Nusavara",
  en: "Nusavara Premium Product Catalog",
  ar: "كتالوج منتجات نوسافارا الفاخرة",
  ja: "ヌサヴァラ最高級製品カタログ",
  ko: "누사바라 프리미엄 카탈로그"
};
const catalogSubtitleMap: Record<string, string> = {
  id: "Menyaring keindahan otentik dari 6 kategori produk unggulan bersertifikat sah",
  en: "Filtering authentic beauty from 6 legally certified featured product categories",
  ar: "تصفية الجمال الأصيل من 6 فئات منتجات مميزة ومعتمدة قانونيًا",
  ja: "法的認可を受けた6つの厳選製品カテゴリーから、本物の美しさをお届けします",
  ko: "공식 법적 인증을 완료한 6대 시그니처 카테고리의 품격 있는 명품 큐레이션"
};
const hideFiltersMap: Record<string, string> = {
  id: "Sembunyikan Filter Pintar",
  en: "Hide Smart Filters",
  ar: "إخفاء الفلاتر الذكية",
  ja: "スマートフィルターを非表示",
  ko: "스마트 필터 숨기기"
};
const showFiltersMap: Record<string, string> = {
  id: "Tampilkan Filter Pintar",
  en: "Show Smart Filters",
  ar: "عرض الفلاتر الذكية",
  ja: "スマートフィルターを表示",
  ko: "스마트 필터 보이기"
};
const showingProductsMap: Record<string, string> = {
  id: "Menampilkan {count} Produk Sesuai Kriteria",
  en: "Showing {count} Products Matching Criteria",
  ar: "عرض {count} من المنتجات المطابقة للمعايير",
  ja: "該当する {count} 件の製品を表示中",
  ko: "조건에 부합하는 {count}개의 명품 검색됨"
};
const subcategoryLabelMap: Record<string, string> = {
  id: "Subkategori",
  en: "Subcategory",
  ar: "الفئة الفرعية",
  ja: "サブカテゴリー",
  ko: "세부 카테고리"
};
const allSubcategoriesMap: Record<string, string> = {
  id: "Semua Subkategori",
  en: "All Subcategories",
  ar: "جميع الفئات الفرعية",
  ja: "すべてのサブカテゴリー",
  ko: "모든 세부 카테고리"
};
const maxPriceLabelMap: Record<string, string> = {
  id: "Batas Harga Maks:",
  en: "Max Price Limit:",
  ar: "حد السعر الأقصى:",
  ja: "上限価格制限:",
  ko: "최대 가격 제한:"
};
const certLabelMap: Record<string, string> = {
  id: "Sertifikasi & Legalitas",
  en: "Certification & Legality",
  ar: "الشهادات والشرعية",
  ja: "認証・法的資格",
  ko: "공식 품질 인증 및 법규"
};
const skinFormulationLabelMap: Record<string, string> = {
  id: "Formulasi Kulit (Skincare)",
  en: "Skin Formulation (Skincare)",
  ar: "تركيبة البشرة (العناية بالبشرة)",
  ja: "肌の処方（スキンケア）",
  ko: "피부 타입 매칭 (스킨케어)"
};
const routineBuilderLabelMap: Record<string, string> = {
  id: "Interactive Skin Routine Builder",
  en: "Interactive Skin Routine Builder",
  ar: "منشئ روتين العناية التفاعلي",
  ja: "インタラクティブ美肌プランナー",
  ko: "인터랙티브 스킨케어 루틴 빌더"
};
const routineBuilderTitleMap: Record<string, string> = {
  id: "Rekomendasi Paket Rutinitas Perawatan Kulit Nusavara",
  en: "Nusavara Skincare Routine Package Recommendations",
  ar: "توصيات حزمة روتين العناية بالبشرة من نوسافارا",
  ja: "ヌサヴァラ推奨・美肌デイリールーティン構成",
  ko: "누사바라 제안 피부 타입별 솔루션 매칭"
};
const routineBuilderDescMap: Record<string, string> = {
  id: "Pilih kebutuhan utama kulit Anda di bawah ini. Mesin cerdas kami akan menyaring paduan serum, pembersih antiseptik, serta moisturizer yang tepat agar kulit Anda bersinar aman bersertifikat HAKI.",
  en: "Select your main skin needs below. Our smart builder will curate the exact serum, antiseptic cleanser, and moisturizer combination for a safe, certified radiant glow.",
  ar: "حدد احتياجات بشرتك الرئيسية أدناه. سيقوم برنامجنا الذكي باختيار المزيج الدقيق من المصل والمنظف والمطهر لتوهج مشع وآمن ومعتمد.",
  ja: "肌のタイプを選択してください。スマートプランナーが、特許・知的財産（HAKI）保護された、最適なスキンケアセットをご提案します。",
  ko: "현재 피부 고민을 선택해 주세요. 당사의 스마트 알고리즘이 공식 인증을 획득한 에센셜 세럼, 저자극 클렌저, 장벽 크림 배합을 추천합니다."
};
const yourBestPackageMap: Record<string, string> = {
  id: "PAKET TERBAIK ANDA:",
  en: "YOUR BEST PACKAGE:",
  ar: "أفضل حزمة لك:",
  ja: "おすすめのセット内容:",
  ko: "고객님을 위한 최적의 패키지:"
};
const routineSensMap: Record<string, string> = {
  id: "Serum Ceramide Barrier Calm + Cleanser Ekstrak Centella. Membantu meredakan iritasi 3 kali lebih cepat aman berizin BPOM.",
  en: "Ceramide Barrier Calm Serum + Centella Extract Cleanser. Helps calm redness and irritation 3x faster, officially certified by BPOM.",
  ar: "مصل Ceramide Barrier Calm + منظف خلاصة Centella. يساعد في تهدئة الاحمرار والتهيج أسرع بـ 3 مرات، معتمد رسميًا من BPOM.",
  ja: "セラミドバリアセラム ＋ ツボクサ葉エキス洗顔料。肌荒れを抑え、健やかな素肌環境を保ちます（BPOM政府認可済）。",
  ko: "세라마이드 장벽 세럼 + 병풀 추출물 클렌저. 울긋불긋한 민감성 피부 장벽을 3배 더 신속하게 진정시키는 BPOM 공식 특화 인증 포뮬러."
};
const routineDryMap: Record<string, string> = {
  id: "Paket Deep Moisture: Serum Ceramide + Toner Hydration. Mengunci kadar kebasahan kulit harian di iklim tropis ekstrem.",
  en: "Deep Moisture Bundle: Ceramide Serum + Hydration Toner. Locks in deep daily moisture tailored for extreme tropical climates.",
  ar: "حزمة الترطيب العميق: مصل السيراميد + تونر الترطيب. يحافظ على ترطيب يومي مخصص للمناخ الاستوائي القاسي.",
  ja: "ディープモイスチャーセット：セラミドセラム ＋ 高保湿トナー。極端な熱帯気候下でも1日中うるおいを閉じ込めます。",
  ko: "딥 모이스처 꿀조합: 세라마이드 세럼 + 고보습 토너. 극단적인 열대 건조 기후에서도 수분 손실을 막고 하루 종일 촉촉함을 잠금 유지."
};
const routineCombMap: Record<string, string> = {
  id: "Seimbang Serum + Matte Cleansing Clay. Menstabilkan sebum berlebih di zona-T dan melembapkan pipi.",
  en: "Balancing Serum + Matte Cleansing Clay. Stabilizes excess sebum on the T-zone while hydrating cheeks.",
  ar: "مصل التوازن + طين التطهير غير اللامع. يوازن الدهون الزائدة في منطقة T مع ترطيب الخدين.",
  ja: "バランシングセラム ＋ クレイ洗顔料。Tゾーンの余分な皮脂バランスを整え、乾燥しがちな頬に潤いを与えます。",
  ko: "밸런싱 에센스 + 머드 클렌징 폼. T존의 과도한 유분을 확실하게 제어하고 볼과 눈가에는 부족한 수분을 채웁니다."
};
const routineOilyMap: Record<string, string> = {
  id: "Acne Control Serum + Aloe Calmer. Komposisi seimbang Centella murni tanpa minyak yang menyumbat pori.",
  en: "Acne Control Serum + Aloe Calmer. A balanced combination of pure Centella with zero pore-clogging heavy oils.",
  ar: "مصل مكافحة حب الشباب + الصبار المهدئ. مزيج متوازن من خلاصة Centella النقية مع زيوت خفيفة لا تسد المسام.",
  ja: "アクネコントロールセラム ＋ アロエカーマー。毛穴を詰まらせない軽い成分設計で、健やかな肌状態をキープします。",
  ko: "아크네 컨트롤 세럼 + 알로에 카밍 젤. 모공을 막지 않는 순수 시카(병풀) 진정 성분의 오일-프리 산뜻 매트 피니시 배합."
};
const addRoutineBtnMap: Record<string, string> = {
  id: "Tambah Paket Rutin",
  en: "Add Routine Bundle",
  ar: "إضافة حزمة الروتين",
  ja: "スキンケアセットを追加",
  ko: "추천 스킨케어 전체 담기"
};
const selectSkinTypePromptMap: Record<string, string> = {
  id: "Pilih jenis kulit Anda di samping untuk menampilkan kalkulator perawatan pintar.",
  en: "Select your skin type on the side to display the smart routine calculator.",
  ar: "حدد نوع بشرتك من الجانب لعرض حاسبة الروتين الذكية.",
  ja: "肌の悩みを選択すると、自動的におすすめスキンケアセットが表示されます。",
  ko: "스마트 피부 상담을 위해 좌측 고민 키워드를 탭해 주세요."
};
const promoBadgeMap: Record<string, string> = {
  id: "PROMO BUNDLE LOKAL PRIDE",
  en: "LOCAL PRIDE PROMO BUNDLE",
  ar: "عرض الحزمة الفاخرة المحلية",
  ja: "伝統工芸 ＆ 健康ハーブ特別提携セット",
  ko: "스페셜 콜라보 로컬 프라이드 번들"
};
const promoTitleMap: Record<string, string> = {
  id: "Bundle Spesial: Kebanggaan Tradisi (Wellness + Craft Set)",
  en: "Special Bundle: Pride of Tradition (Wellness + Craft Set)",
  ar: "حزمة خاصة: فخر التقاليد (مجموعة العافية والحرف)",
  ja: "特別企画：伝統の誇り（ハーブ飲料 ＆ 手芸陶工器セット）",
  ko: "스페셜 번들: 전통의 긍지 (웰니스 허브차 + 수제 자기 세트)"
};
const promoDescMap: Record<string, string> = {
  id: "Dapatkan paduan nikmat 1 box Jamu Modern Temu Glow dan 1 set Raga Ceramic Cup Set premium eksklusif buatan artisan. Beli satu paket lebih hemat 10%.",
  en: "Get the delightful combination of 1 box of Temu Glow Modern Jamu and 1 set of premium artisan-made Raga Ceramic Cups. Save 10% when buying this bundle.",
  ar: "احصل على مزيج رائع مكون من علبة واحدة من Temu Glow Modern Jamu ومجموعة واحدة من أكواب السيراميك الفاخرة المصنوعة يدويًا. وفر 10% عند شراء هذه الحزمة.",
  ja: "伝統の滋養飲料「テムグロウハーブ茶」と、京都・金沢等の展示会でも評価されたジョグジャカルタの手づくりマグカップセット。単品購入より10％お得です。",
  ko: "현대식 프리미엄 허브 전통차 'Temu Glow' 1박스와 요그야카르타 명장 수제 전통 머그잔 1세트 특화 구성. 개별 구매 대비 VVIP 10% 추가 우대 가격."
};
const specialPriceLabelMap: Record<string, string> = {
  id: "Harga Spesial:",
  en: "Special Price:",
  ar: "سعر خاص:",
  ja: "特別価格:",
  ko: "스페셜 혜택가:"
};
const buyBundleBtnMap: Record<string, string> = {
  id: "Beli Bundle Hemat",
  en: "Buy Bundle & Save",
  ar: "شراء الحزمة وتوفير",
  ja: "限定特別セットを購入",
  ko: "스페셜 번들 간편 구매"
};
const notFoundTitleMap: Record<string, string> = {
  id: "Produk Tidak Ditemukan",
  en: "No Products Found",
  ar: "لم يتم العثور على منتجات",
  ja: "製品が見つかりません",
  ko: "검색 결과가 없습니다"
};
const notFoundDescMap: Record<string, string> = {
  id: "Kami tidak menemukan produk yang cocok dengan pencarian atau filter Anda.",
  en: "We couldn't find any products matching your search or filters.",
  ar: "لم نتمكن من العثور على أي منتجات تطابق بحثك أو مرشحاتك.",
  ja: "条件に一致する製品が見つかりませんでした。別のキーワードでお試しください。",
  ko: "선택하신 키워드 혹은 필터 조건에 부합하는 상품이 현재 존재하지 않습니다."
};
const clearFiltersBtnMap: Record<string, string> = {
  id: "Bersihkan Seluruh Filter",
  en: "Clear All Filters",
  ar: "مسح جميع الفلاتر",
  ja: "すべてのフィルターをクリア",
  ko: "필터 조건 초기화"
};
const byLabelMap: Record<string, string> = {
  id: "Oleh:",
  en: "By:",
  ar: "بواسطة:",
  ja: "作者:",
  ko: "제작자:"
};
const buyBtnTextMap: Record<string, string> = {
  id: "Beli",
  en: "Buy",
  ar: "شراء",
  ja: "購入",
  ko: "구매"
};

interface CatalogProps {
  products: Product[];
  categories?: ProductCategory[];
  currentTemplate: DesignTemplate;
  currentLang: "id" | "en" | "ar" | "ja" | "ko";
  onAddToCart?: (product: Product, quantity?: number) => void;
  onOpenProductDetail: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlist?: string[];
  themeMode?: "light" | "dark";
}

export default function Catalog({
  products,
  categories = initialCategories,
  currentTemplate,
  currentLang,
  onAddToCart = () => {},
  onOpenProductDetail,
  onToggleWishlist = () => {},
  wishlist = [],
  themeMode = "light"
}: CatalogProps) {
  const isDark = themeMode === "dark";
  const dict = translations[currentLang] || translations.id;

  // -- States for filtering & sorting --
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(600000);
  const [selectedSkinType, setSelectedSkinType] = useState<string>("All");
  const [selectedSkinConcern, setSelectedSkinConcern] = useState<string>("All");
  const [selectedCert, setSelectedCert] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [showFilters, setShowFilters] = useState(false);

  // -- Routine Builder simulator state --
  const [skinTypeRoutine, setSkinTypeRoutine] = useState<"Dry" | "Sensitive" | "Combination" | "Oily" | "">("");
  const [showRoutineSuggestion, setShowRoutineSuggestion] = useState(false);

  // -- Dynamic bundle state --
  const [selectedBundle, setSelectedBundle] = useState<boolean>(false);

  // Category and subcategory arrays
  const categoriesList = useMemo(() => ["All", ...categories.map((c) => c.name)], [categories]);
  const subcategoriesList = useMemo(() => ["All", ...initialSubCategories], []);

  // -- Localized Products --
  const localizedProductsList = useMemo(() => {
    return products.map((prod) => getLocalizedProduct(prod, currentLang));
  }, [products, currentLang]);

  // Filtered lists
  const filteredProducts = useMemo(() => {
    return localizedProductsList.filter((prod) => {
      // Search matches name or description
      const matchesSearch =
        prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category matches
      const matchesCategory = selectedCategory === "All" || prod.category === getLocalizedCategory(selectedCategory, currentLang);

      // Subcategory matches
      const matchesSubcategory = selectedSubcategory === "All" || prod.subcategory === getLocalizedSubcategory(selectedSubcategory, currentLang);

      // Price matches
      const realPrice = prod.discount_price || prod.price;
      const safeMaxPrice = Number.isNaN(maxPrice) ? 600000 : maxPrice;
      const matchesPrice = realPrice <= safeMaxPrice;

      // Skin Type matches
      const matchesSkinType =
        selectedSkinType === "All" || (prod.skin_type && prod.skin_type.includes(selectedSkinType));

      // Skin Concern matches
      const matchesSkinConcern =
        selectedSkinConcern === "All" || (prod.skin_concern && prod.skin_concern.includes(selectedSkinConcern));

      // Cert matches (BPOM, PIRT, Halal)
      const matchesCert =
        selectedCert === "All" ||
        (selectedCert === "BPOM" && prod.badge.includes("BPOM")) ||
        (selectedCert === "Halal" && prod.badge.includes("Halal")) ||
        (selectedCert === "PIRT" && prod.badge.includes("PIRT")) ||
        (selectedCert === "Sustainable" && prod.badge.includes("Sustainable"));

      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice && matchesSkinType && matchesSkinConcern && matchesCert;
    });
  }, [localizedProductsList, searchTerm, selectedCategory, selectedSubcategory, maxPrice, selectedSkinType, selectedSkinConcern, selectedCert, currentLang]);

  // Sorted list
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "Newest") return list; // maintain seed order
    if (sortBy === "PriceAsc") {
      return list.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
    }
    if (sortBy === "PriceDesc") {
      return list.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
    }
    if (sortBy === "RatingBest") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "BestSeller") {
      return list.sort((a, b) => (b.badge.includes("Best Seller") ? 1 : 0) - (a.badge.includes("Best Seller") ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Special vector graphics / color blocks represent curated items beautifully
  const renderProductImageFallback = (type: string) => {
    const imagesMap = {
      fashion: "bg-radial from-stone-200 to-stone-400 border border-stone-300",
      skincare: "bg-radial from-emerald-50 to-emerald-250 border border-emerald-100",
      herbal: "bg-radial from-amber-50 to-amber-250 border border-amber-100",
      craft: "bg-radial from-[#F9EFE9] to-[#E3CEC0] border border-[#D5B5A4]",
      gift: "bg-radial from-indigo-50 to-indigo-250 border border-indigo-100",
      sustainable: "bg-radial from-slate-100 to-slate-350 border border-slate-200"
    };
    const styleStr = imagesMap[type as keyof typeof imagesMap] || "bg-stone-300";

    return (
      <div className={`w-full aspect-square relative flex items-center justify-center p-6 ${styleStr}`}>
        {/* Draw abstract visual elements on standard card fallback */}
        {type === "fashion" && (
          <div className="text-center">
            <div className="w-16 h-20 border-2 border-stone-900 mx-auto opacity-70 relative">
              <div className="absolute top-2 left-2 right-2 h-8 bg-stone-900/10" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-stone-700 block mt-2 font-bold uppercase">Soft Linens</span>
          </div>
        )}
        {type === "skincare" && (
          <div className="text-center text-emerald-950">
            <div className="w-12 h-20 bg-emerald-900 rounded-lg mx-auto flex items-center justify-center relative">
              <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-900 block mt-2 font-bold uppercase text-center">Formulasi Murni</span>
          </div>
        )}
        {type === "herbal" && (
          <div className="text-center text-amber-950">
            <Flower className="w-14 h-14 text-amber-800 mx-auto stroke-[1.5]" />
            <span className="text-[10px] font-mono tracking-widest block mt-2 font-bold uppercase text-center text-amber-900">Extracted Roots</span>
          </div>
        )}
        {type === "craft" && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-2 border-stone-800 bg-[#E07A5F]/20 mx-auto relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-stone-800 border-dashed" />
            </div>
            <span className="text-[10px] font-mono tracking-widest block mt-2 font-bold uppercase text-amber-950">Clay Craft Yogyakarta</span>
          </div>
        )}
        {type === "gift" && (
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-950 rounded-xl mx-auto flex items-center justify-center text-amber-300 font-serif font-black text-xs">
              M-GOLD
            </div>
            <span className="text-[10px] font-mono tracking-widest block mt-2 font-bold uppercase text-indigo-900">Elite Corporate</span>
          </div>
        )}
        {type === "sustainable" && (
          <div className="text-center">
            <div className="w-20 h-16 bg-slate-900 text-white rounded-none border border-amber-400/35 mx-auto flex items-center justify-center text-[9px] font-mono uppercase tracking-wide">
              UPCYCULED
            </div>
            <span className="text-[10px] font-mono tracking-widest block mt-2 font-bold text-slate-800 uppercase">Save 1.2kg waste</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Search and Big Highlight Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/60 dark:border-stone-800/80">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-amber-800 dark:text-amber-400 font-bold uppercase block mb-1">
            EXPLORE MASTERPIECES
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-black text-stone-900 dark:text-stone-100" style={{ fontFamily: currentTemplate.headingFont }}>
            {catalogTitleMap[currentLang] || catalogTitleMap.id}
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm mt-1">
            {catalogSubtitleMap[currentLang] || catalogSubtitleMap.id}
          </p>
        </div>

        {/* Dynamic Search bar with customized look-and-feel */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={dict.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-xs sm:text-sm outline-none border-stone-200 focus:border-stone-950 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 dark:focus:border-amber-500 transition-all font-sans"
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 dark:text-stone-500" />
        </div>
      </div>

      {/* Categories Horizontal Selector */}
      <div className="flex flex-wrap items-center gap-2 py-6 overflow-x-auto">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSubcategory("All");
            }}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? (isDark ? "bg-amber-400 text-stone-950 font-bold" : "bg-stone-900 text-white font-bold")
                : (isDark ? "bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-white border border-stone-800" : "bg-stone-150 hover:bg-stone-200 text-stone-700 hover:text-stone-950")
            }`}
            style={{ borderRadius: currentTemplate.id.includes("craft") ? "0px" : "9999px" }}
          >
            {cat === "All" ? (currentLang === "id" ? "Semua" : "All") : getLocalizedCategory(cat, currentLang)}
          </button>
        ))}
      </div>

      {/* Advanced Filters Trigger and Main Interface Panel */}
      <div className={`p-4 border mb-6 flex flex-col gap-4 transition-colors duration-350 ${
        isDark ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-stone-50 border-stone-200/60"
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 border rounded-md text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                isDark 
                  ? "bg-stone-950 border-stone-800 hover:bg-stone-900 text-white" 
                  : "bg-white hover:bg-stone-100 border-stone-300 text-stone-900"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{showFilters ? (hideFiltersMap[currentLang] || hideFiltersMap.id) : (showFiltersMap[currentLang] || showFiltersMap.id)}</span>
            </button>

            {/* Quick tag label indicators */}
            <span className={`text-[11px] font-mono hidden md:inline ${isDark ? "text-stone-400" : "text-stone-500"}`}>
              {(showingProductsMap[currentLang] || showingProductsMap.id).replace("{count}", sortedProducts.length.toString())}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className={`text-[11px] font-mono font-bold uppercase ${isDark ? "text-stone-300" : "text-stone-600"}`}>{dict.sortBy}:</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none pr-8 pl-3 py-1.5 border text-xs font-semibold tracking-wider uppercase outline-none rounded-md cursor-pointer transition-all ${
                  isDark ? "bg-stone-950 border-stone-800 text-stone-200 focus:border-amber-400" : "bg-white border-stone-300 text-stone-850 focus:border-stone-900"
                }`}
              >
                <option value="Newest">Terbaru / Rekomendasi</option>
                <option value="PriceAsc">Harga Terendah</option>
                <option value="PriceDesc">Harga Tertinggi</option>
                <option value="RatingBest">Ulasan Bintang Terbaik</option>
                <option value="BestSeller">Best Seller Utama</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-2.5 w-3 h-3 text-stone-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Filters Grid Panel */}
        {showFilters && (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t transition-all ${isDark ? "border-stone-800" : "border-stone-200/60"}`}>
            
            {/* Filter 1: Subcategory selection */}
            <div>
              <label className={`block text-[11px] font-mono tracking-wider font-bold uppercase mb-2 ${isDark ? "text-stone-300" : "text-stone-700"}`}>{subcategoryLabelMap[currentLang] || subcategoryLabelMap.id}</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className={`w-full border rounded-md p-2 text-xs transition-all ${
                  isDark ? "bg-stone-950 border-stone-800 text-stone-200 focus:border-amber-400" : "bg-white border-stone-300 text-stone-850 focus:border-stone-900"
                }`}
              >
                <option value="All">{(allSubcategoriesMap[currentLang] || allSubcategoriesMap.id)} ({subcategoriesList.length - 1})</option>
                {subcategoriesList.slice(1).map((sub) => (
                  <option key={sub} value={sub}>{getLocalizedSubcategory(sub, currentLang)}</option>
                ))}
              </select>
            </div>

            {/* Filter 2: Price range selection */}
            <div>
              <label className={`block text-[11px] font-mono tracking-wider font-bold uppercase mb-2 ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                {maxPriceLabelMap[currentLang] || maxPriceLabelMap.id} <span className={`font-sans font-bold ${isDark ? "text-white" : "text-stone-900"}`}>Rp {(Number.isNaN(maxPrice) ? 600000 : maxPrice).toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="50000"
                max="600000"
                step="25000"
                value={Number.isNaN(maxPrice) ? 600000 : maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className={`w-full accent-amber-600 h-1.5 rounded-lg cursor-pointer ${isDark ? "bg-stone-850" : "bg-stone-300"}`}
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1">
                <span>Rp 50k</span>
                <span>Rp 600k</span>
              </div>
            </div>

            {/* Filter 3: Certification filter (Halal/BPOM/PIRT/Sustainable) */}
            <div>
              <label className={`block text-[11px] font-mono tracking-wider font-bold uppercase mb-2 ${isDark ? "text-stone-300" : "text-stone-700"}`}>{certLabelMap[currentLang] || certLabelMap.id}</label>
              <div className="flex flex-wrap gap-1">
                {["All", "BPOM", "Halal", "PIRT", "Sustainable"].map((cert) => (
                  <button
                    key={cert}
                    onClick={() => setSelectedCert(cert)}
                    className={`px-2 py-1 text-[10px] font-mono rounded font-bold transition-all cursor-pointer ${
                      selectedCert === cert
                        ? "bg-amber-600 text-white"
                        : (isDark ? "bg-stone-950 text-stone-300 border border-stone-850 hover:bg-stone-800 hover:text-white" : "bg-white text-stone-700 border hover:bg-stone-50 hover:text-stone-950 border-stone-200")
                    }`}
                  >
                    {cert === "All" ? (currentLang === "id" ? "Semua" : "All") : cert}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 4: Skincare Skin Type Specifities */}
            <div>
              <label className={`block text-[11px] font-mono tracking-wider font-bold uppercase mb-2 ${isDark ? "text-stone-300" : "text-stone-700"}`}>{skinFormulationLabelMap[currentLang] || skinFormulationLabelMap.id}</label>
              <select
                value={selectedSkinType}
                onChange={(e) => {
                  setSelectedSkinType(e.target.value);
                  if (e.target.value !== "All") setSelectedCategory("Skincare");
                }}
                className={`w-full border rounded-md p-2 text-xs transition-all ${
                  isDark ? "bg-stone-950 border-stone-800 text-stone-200 focus:border-amber-400" : "bg-white border-stone-300 text-stone-850 focus:border-stone-900"
                }`}
              >
                <option value="All">{currentLang === "id" ? "Semua Jenis Kulit" : currentLang === "en" ? "All Skin Types" : currentLang === "ja" ? "すべての肌タイプ" : currentLang === "ko" ? "모든 피부 타입" : "جميع أنواع البشرة"}</option>
                <option value="Dry">{currentLang === "id" ? "Tipe Kering (Dry)" : currentLang === "en" ? "Dry Skin Type" : currentLang === "ja" ? "乾燥肌" : currentLang === "ko" ? "건성 피부" : "피부 타입 건성"}</option>
                <option value="Sensitive">{currentLang === "id" ? "Tipe Kulit Sensitif" : currentLang === "en" ? "Sensitive Skin Type" : currentLang === "ja" ? "敏感肌" : currentLang === "ko" ? "민감성 피부" : "피부 타입 민감성"}</option>
                <option value="Combination">{currentLang === "id" ? "Kombinasi" : currentLang === "en" ? "Combination Skin" : currentLang === "ja" ? "混合肌" : currentLang === "ko" ? "복합성 피부" : "피부 타입 복합성"}</option>
                <option value="Oily">{currentLang === "id" ? "Tipe Berminyak (Oily)" : currentLang === "en" ? "Oily Skin Type" : currentLang === "ja" ? "脂性肌" : currentLang === "ko" ? "지성 피부" : "피부 타입 지성"}</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Special Module: AI Skin Routine Builder Highlight Widget */}
      <div className="mb-8 p-6 rounded-2xl bg-radial bg-stone-900 text-white border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 bg-contain bg-center pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[9px] font-mono uppercase tracking-widest font-bold mb-2">
              <Sparkles className="w-3 h-3 animate-spin" /> {routineBuilderLabelMap[currentLang] || routineBuilderLabelMap.id}
            </div>
            <h3 className="text-lg md:text-xl font-bold font-serif text-amber-300">
              {routineBuilderTitleMap[currentLang] || routineBuilderTitleMap.id}
            </h3>
            <p className="text-[12px] md:text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
              {routineBuilderDescMap[currentLang] || routineBuilderDescMap.id}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Dry", "Sensitive", "Combination", "Oily"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSkinTypeRoutine(type as any);
                    setShowRoutineSuggestion(true);
                    setSelectedCategory("Skincare");
                  }}
                  className={`px-3 py-1.5 border rounded-lg text-xs tracking-wider transition-all cursor-pointer font-semibold ${
                    skinTypeRoutine === type
                      ? "bg-amber-400 text-stone-950 font-bold border-amber-400"
                      : "bg-stone-800 border-stone-700 text-stone-300 hover:text-white"
                  }`}
                >
                  {currentLang === "id" ? "Kulit " : currentLang === "en" ? "Skin " : ""}{type === "Dry" ? (currentLang === "id" ? "Kering" : "Dry") : type === "Sensitive" ? (currentLang === "id" ? "Sensitif" : "Sensitive") : type === "Combination" ? (currentLang === "id" ? "Kombinasi" : "Combination") : (currentLang === "id" ? "Berminyak" : "Oily")}{currentLang === "ja" ? "肌" : currentLang === "ko" ? "피부" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-stone-950/60 p-4 border rounded-xl border-stone-850">
            {showRoutineSuggestion && skinTypeRoutine ? (
              <div className="space-y-3">
                <span className="block text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">{yourBestPackageMap[currentLang] || yourBestPackageMap.id}</span>
                <p className="text-xs text-stone-300 font-medium">
                  {skinTypeRoutine === "Sensitive" && (routineSensMap[currentLang] || routineSensMap.id)}
                  {skinTypeRoutine === "Dry" && (routineDryMap[currentLang] || routineDryMap.id)}
                  {skinTypeRoutine === "Combination" && (routineCombMap[currentLang] || routineCombMap.id)}
                  {skinTypeRoutine === "Oily" && (routineOilyMap[currentLang] || routineOilyMap.id)}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const ceramideSerum = products.find(p => p.id === "p2");
                      if (ceramideSerum) {
                        onAddToCart(ceramideSerum, 1);
                        const alertMsgs: Record<string, string> = {
                          id: `Berhasil menambahkan Serum Ceramide ke keranjang untuk rutinitas kulit ${skinTypeRoutine}!`,
                          en: `Successfully added Ceramide Serum to cart for ${skinTypeRoutine} skin routine!`,
                          ar: `تمت إضافة مصل السيراميد بنجاح إلى السلة لروتين البشرة ${skinTypeRoutine}!`,
                          ja: `${skinTypeRoutine}肌スキンケアルーティンのためにセラミドセラムをカートに追加しました！`,
                          ko: `${skinTypeRoutine} 피부 루틴 맞춤 세라마이드 세럼을 장바구니에 담았습니다!`
                        };
                        alert(alertMsgs[currentLang] || alertMsgs.id);
                      }
                    }}
                    className="w-full py-1.5 bg-white hover:bg-stone-100 text-stone-950 text-[11px] font-bold tracking-wider rounded uppercase transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> {addRoutineBtnMap[currentLang] || addRoutineBtnMap.id}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-stone-400 text-xs italic">
                {selectSkinTypePromptMap[currentLang] || selectSkinTypePromptMap.id}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Curated Pre-designed Bundle Offer Section */}
      <div className={`mb-10 border p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs transition-colors duration-300 ${
        isDark ? "bg-stone-900 border-stone-850 text-stone-100" : "bg-[#FAF7F2] border-amber-200/50 text-[#2C2520]"
      }`}>
        <div className="space-y-2">
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest font-bold ${
            isDark ? "bg-amber-500/20 text-amber-300" : "bg-amber-200 text-amber-950"
          }`}>
            {promoBadgeMap[currentLang] || promoBadgeMap.id}
          </div>
          <h4 className="text-lg font-bold font-serif">{promoTitleMap[currentLang] || promoTitleMap.id}</h4>
          <p className={`text-xs max-w-xl ${isDark ? "text-stone-300" : "text-stone-600"}`}>
            {promoDescMap[currentLang] || promoDescMap.id}
          </p>
          <div className={`text-xs font-mono font-bold ${isDark ? "text-stone-300" : "text-amber-900"}`}>
            {specialPriceLabelMap[currentLang] || specialPriceLabelMap.id} <span className="line-through text-stone-400">Rp 478.000</span> &rarr; <span className={`text-lg font-bold ${isDark ? "text-amber-400" : "text-[#C35232]"}`}>Rp 429.000</span>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              const p_jamu = products.find(p => p.id === "p3");
              const p_ceramic = products.find(p => p.id === "p4");
              if (p_jamu && p_ceramic) {
                onAddToCart(p_jamu, 1);
                onAddToCart(p_ceramic, 1);
                const alertMsgs: Record<string, string> = {
                  id: "Bundle Kebanggaan Tradisi ditambahkan ke keranjang! Promo potong kupon WELCOME10 dapat disematkan saat checkout.",
                  en: "Pride of Tradition bundle added to cart! Welcome promo code WELCOME10 can be applied at checkout.",
                  ar: "تمت إضافة حزمة فخر التقاليد إلى السلة! يمكن تطبيق كود الخصم WELCOME10 عند الدفع.",
                  ja: "「伝統の誇り」セットをカートに追加しました！チェックアウト時にクーポン WELCOME10 がご利用いただけます。",
                  ko: "전통의 긍지 특별 콜라보 세트가 장바구니에 담겼습니다! 결제창에서 WELCOME10 쿠폰코드를 등록해 주세요."
                };
                alert(alertMsgs[currentLang] || alertMsgs.id);
              }
            }}
            className="px-5 py-3 bg-[#C35232] hover:bg-[#A93E20] text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer rounded-lg"
          >
            <Sparkles className="w-4 h-4" /> {buyBundleBtnMap[currentLang] || buyBundleBtnMap.id}
          </button>
        </div>
      </div>

      {/* Main Grid: Products Cards */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-stone-200 rounded-2xl">
          <Info className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-stone-850">{notFoundTitleMap[currentLang] || notFoundTitleMap.id}</h3>
          <p className="text-stone-500 text-xs mt-1">{notFoundDescMap[currentLang] || notFoundDescMap.id}</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSelectedSubcategory("All");
              setMaxPrice(600000);
              setSelectedSkinType("All");
              setSelectedCert("All");
            }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase rounded hover:bg-stone-850 cursor-pointer"
          >
            {clearFiltersBtnMap[currentLang] || clearFiltersBtnMap.id}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {sortedProducts.map((prod) => {
            const hasDiscount = prod.discount_price !== null;
            const originalPrice = prod.price;
            const currentPrice = prod.discount_price || prod.price;
            const isWishlisted = wishlist.includes(prod.id);

            return (
              <div
                key={prod.id}
                className={`select-none relative group flex flex-col h-full transition-all duration-300 ${
                  isDark ? "bg-stone-900 border border-stone-850 text-white" : "bg-white border border-stone-200"
                } ${currentTemplate.cardStyle}`}
              >
                
                {/* Product Badge Area */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  {prod.badge.map((b) => (
                    <span
                      key={b}
                      className="px-1.5 py-0.5 text-[8px] font-mono tracking-wider font-bold uppercase text-white bg-stone-900 rounded-sm shadow-xs"
                    >
                      {b}
                    </span>
                  ))}
                  {prod.preorder && (
                    <span className="px-1.5 py-0.5 text-[8px] font-mono tracking-wider font-bold uppercase text-stone-950 bg-amber-400 rounded-sm shadow-xs animate-pulse">
                      PRE-ORDER
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(prod)}
                  className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-md transition-all cursor-pointer ${
                    isDark ? "bg-stone-950/80 hover:bg-stone-900 text-stone-300 hover:text-rose-500" : "bg-white/80 hover:bg-white text-stone-600 hover:text-rose-600"
                  }`}
                  title="Masukan ke Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`} />
                </button>

                {/* Main Product Frame / Render Fallback Art */}
                <div className="relative overflow-hidden cursor-pointer" onClick={() => onOpenProductDetail(prod)}>
                  {renderProductImageFallback(prod.image || "fashion")}
                  
                  {/* Subtle hover overlay details */}
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductDetail(prod);
                      }}
                      className="p-2.5 bg-white/95 text-stone-950 rounded-full hover:bg-stone-900 hover:text-white shadow-xl transition-all font-sans cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content Box */}
                <div className={`p-3 sm:p-4 flex-1 flex flex-col justify-between border-t ${isDark ? "border-stone-850" : "border-stone-100"}`}>
                  <div>
                    <div className="flex items-center justify-between gap-1.5 text-[8.5px] font-mono font-bold text-stone-500 uppercase tracking-widest mb-1">
                      <span>{prod.subcategory}</span>
                      <span className="flex items-center gap-0.5 text-amber-550">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span>{prod.rating.toFixed(1)}</span>
                      </span>
                    </div>

                    <h3
                      className={`text-xs sm:text-sm font-extrabold transition-colors cursor-pointer leading-snug line-clamp-2 mb-1 ${
                        isDark ? "text-stone-100 group-hover:text-amber-400" : "text-stone-950 group-hover:text-amber-800"
                      }`}
                      style={{ fontFamily: currentTemplate.headingFont }}
                      onClick={() => onOpenProductDetail(prod)}
                    >
                      {prod.name}
                    </h3>

                    {/* Highly specialized sub-detail descriptions */}
                    {prod.category === "Skincare" && prod.bpom_number && (
                      <div className="flex items-center gap-1 pb-1">
                        <ClipboardCheck className="w-3 h-3 text-emerald-600" />
                        <span className={`text-[9px] font-mono ${isDark ? "text-stone-400" : "text-stone-500"}`}>BPOM {prod.bpom_number}</span>
                      </div>
                    )}
                    {prod.category === getLocalizedCategory("Craft", currentLang) && prod.artisan && (
                      <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded font-mono font-medium mb-1 ${
                        isDark ? "text-amber-300 bg-amber-950/50 border border-amber-900/30" : "text-amber-900 bg-amber-50 border border-amber-150"
                      }`}>
                        {byLabelMap[currentLang] || byLabelMap.id} {prod.artisan}
                      </span>
                    )}

                    <p className={`text-[11px] leading-relaxed font-sans line-clamp-2 mb-3 ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                      {prod.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className={`pt-2 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${isDark ? "border-stone-850" : "border-stone-100"}`}>
                    <div className="flex flex-col">
                      {hasDiscount && (
                        <span className="text-[9px] line-through text-stone-400 font-mono leading-none mb-0.5">
                          Rp {originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className={`text-xs sm:text-[13px] font-black font-mono tracking-tight leading-none ${isDark ? "text-white" : "text-stone-900"}`}>
                        Rp {currentPrice.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(prod)}
                      className={`px-2.5 py-1.5 text-[9px] font-mono tracking-wider uppercase font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer rounded-xs ${
                        currentTemplate.primaryColor
                      }`}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{prod.preorder ? (currentLang === "id" ? "Pre" : "Pre-Order") : (buyBtnTextMap[currentLang] || buyBtnTextMap.id)}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
