/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Award, ArrowUpRight } from "lucide-react";
import { DesignTemplate, translations } from "../data/seedData";
import { LanguageCode } from "../types";
import { staticTranslations } from "../data/staticTranslations";

interface HeroProps {
  currentTemplate: DesignTemplate;
  currentLang: "id" | "en" | "ar" | "ja" | "ko";
  onNavigate: (view: string) => void;
  brandSettings: {
    brand_name: string;
    tagline: string;
  };
}

export default function Hero({ currentTemplate, currentLang, onNavigate, brandSettings }: HeroProps) {
  const dict = translations[currentLang] || translations.id;
  const tStatic = (key: string) => {
    return (staticTranslations[currentLang] as any)?.[key] || (staticTranslations.id as any)?.[key] || key;
  };

  // Custom text per template to feel highly curated, fully localized
  const textModifiers: Record<string, Record<LanguageCode, { title: string; subtitle: string; badge: string }>> = {
    "temp-fashion-label": {
      id: {
        title: "EVERYDAY HERITAGE LOOKBOOK",
        subtitle: "Koleksi busana linen organik lokal dengan tenun tangan asli artisan nusantara.",
        badge: "FALL - WINTER LIMITED DROP"
      },
      en: {
        title: "EVERYDAY HERITAGE LOOKBOOK",
        subtitle: "Local organic linen fashion collections handwoven by authentic Indonesian artisans.",
        badge: "FALL - WINTER LIMITED DROP"
      },
      ar: {
        title: "كتالوج التراث اليومي",
        subtitle: "مجموعات أزياء من الكتان العضوي المحلي منسوجة يدويًا من قبل حرفيين حقيقيين.",
        badge: "إطلاق محدود لخريف وشتاء"
      },
      ja: {
        title: "エブリデイ ヘリテージ ルックブック",
        subtitle: "インドネシアの本格的な職人による手織りの地元産オーガニックリネンファッションコレクション。",
        badge: "秋冬数量限定ドロップ"
      },
      ko: {
        title: "에브리데이 헤리티지 룩북",
        subtitle: "인도네시아 전통 아티산이 직접 직조한 로컬 유기농 리넨 패션 컬렉션.",
        badge: "가을 - 겨울 한정 출시"
      }
    },
    "temp-modest-wear": {
      id: {
        title: "KEMELEKAN BUSANA MODEST",
        subtitle: "Sentuhan warna pasir hangat, sutra lembut, serta potongan anggun berkelas tinggi.",
        badge: "EKSKLUSIF KELAS ATAS"
      },
      en: {
        title: "ELEGANT MODEST WEAR",
        subtitle: "Touches of warm sand colors, soft silk, and highly graceful high-class cuts.",
        badge: "PREMIUM EXCLUSIVE"
      },
      ar: {
        title: "أزياء محتشمة وأنيقة",
        subtitle: "لمسات من ألوان الرمل الدافئة، والحرير الناعم، وقصص راقية رشيقة للغاية.",
        badge: "حصري فاخر"
      },
      ja: {
        title: "洗練されたモデストウェア",
        subtitle: "温かみのあるサンドカラー、柔らかなシルク、そして非常に優雅でハイクラスなカットの融合。",
        badge: "プレミアム・エクスクルーシブ"
      },
      ko: {
        title: "우아한 모데스트 웨어",
        subtitle: "따뜻한 모래색, 부드러운 실크, 그리고 극도로 우아한 하이클래스 실루엣의 조화.",
        badge: "VVIP 독점 모델"
      }
    },
    "temp-skincare-clean": {
      id: {
        title: "REKAYASA KLINIS SKIN BARRIER",
        subtitle: "Menembus batas hidrasi alamiah dengan dosis aktif Ceramide NP bersertifikat murni.",
        badge: "100% DIUJI SECARA KLINIS & DERMATOLOGIS"
      },
      en: {
        title: "CLINICAL SKIN BARRIER FORMULA",
        subtitle: "Pushing natural hydration boundaries with an active dose of pure-certified Ceramide NP.",
        badge: "100% CLINICALLY & DERMATOLOGICALLY TESTED"
      },
      ar: {
        title: "تركيبة حاجز البشرة السريرية",
        subtitle: "تخطي حدود الترطيب الطبيعي بجرعة نشطة من السيراميد النقي المعتمد.",
        badge: "مختبر سريريًا وجلديًا 100%"
      },
      ja: {
        title: "臨床スキンバリア処方",
        subtitle: "高純度認定セラミドNPの有効成分配合で、極限の潤い肌へ導くスキンケア。",
        badge: "100% 臨床試験・皮膚科医テスト済み"
      },
      ko: {
        title: "클리니컬 스킨 베리어 처방",
        subtitle: "순수 인증 세라마이드 NP의 활성 성분으로 천연 수분 장벽을 재설계하는 임상 포뮬러.",
        badge: "100% 임상 및 피부과 전문의 테스트 완료"
      }
    },
    "temp-beauty-routine": {
      id: {
        title: "MAHKOTA CAHAYA KULIT SEHAT",
        subtitle: "Ritual kecantikan kulit natural bertekstur embun dewy rose dalam 4 langkah mudah.",
        badge: "RITUAL HARIAN TERBAIK"
      },
      en: {
        title: "HEALTHY SKIN GLOW RITUAL",
        subtitle: "Natural skin beauty ritual with a dewy rose texture in 4 simple steps.",
        badge: "BEST DAILY ROUTINE"
      },
      ar: {
        title: "طقوس توهج البشرة الصحية",
        subtitle: "طقوس جمال البشرة الطبيعية بقوام الورد الندي في 4 خطوات بسيطة.",
        badge: "أفضل روتين يومي"
      },
      ja: {
        title: "ツヤ肌グロウ・デイリールーティン",
        subtitle: "みずみずしいローズの質感で、澄んだ輝きを放つ肌へと導く4ステップの美容儀式。",
        badge: "最高のデイリー習慣"
      },
      ko: {
        title: "광채 피부 글로우 리추얼",
        subtitle: "이슬을 머금은 장미 텍스처와 함께 4단계로 완성하는 내추럴 스킨 웰니스 리추얼.",
        badge: "최상의 데일리 리추얼"
      }
    },
    "temp-herbal-wellness": {
      id: {
        title: "NURTURE BY RAW ELEMENTS",
        subtitle: "Racikan jamu tradisional organik premium bebas bahan kimia sintetis.",
        badge: "BOTANICAL HOLISTIC WELLNESS"
      },
      en: {
        title: "NURTURE BY RAW ELEMENTS",
        subtitle: "Premium organic traditional jamu herbal remedies free of synthetic chemicals.",
        badge: "BOTANICAL HOLISTIC WELLNESS"
      },
      ar: {
        title: "التغذية بالعناصر الطبيعية الخام",
        subtitle: "وصفات عشبية تقليدية عضوية ممتازة خالية من المواد الكيميائية الاصطناعية.",
        badge: "العافية النباتية الشاملة"
      },
      ja: {
        title: "生薬・ボタニカルウェルネス",
        subtitle: "合成化学物質を一切排除した、有機栽培の最高級オーガニックハーブ伝統温活ブレンド。",
        badge: "ボタニカル・ホリスティック"
      },
      ko: {
        title: "생원소 그대로의 힐링 웰니스",
        subtitle: "합성 화학 성분을 배제하고 유기농 원료로 배합한 프리미엄 전통 보양 허브 블렌드.",
        badge: "식물성 홀리스틱 웰니스"
      }
    },
    "temp-jamu-modern": {
      id: {
        title: "TEMU GLOW: THE GINGER THERAPY",
        subtitle: "Memulihkan stamina dengan ekstrak rimpang jahe merah dan temulawak kustomisasi.",
        badge: "LEGACY DISCOVERY"
      },
      en: {
        title: "TEMU GLOW: THE GINGER THERAPY",
        subtitle: "Restore stamina with custom extracts of red ginger and curcuma xanthorrhiza rhizome.",
        badge: "LEGACY DISCOVERY"
      },
      ar: {
        title: "تيمو غلو: علاج الزنجبيل",
        subtitle: "استعد نشاطك بمستخلصات مخصصة من الزنجبيل الأحمر والكركم البري العضوي.",
        badge: "اكتشاف التراث"
      },
      ja: {
        title: "テム・グロウ：ジンジャーセラピー",
        subtitle: "厳選された赤ショウガとクスリウコンのエキスで、身体の内側からスタミナを呼び覚ます現代の養生法。",
        badge: "伝承ハーブの現代的探求"
      },
      ko: {
        title: "테무 글로우: 진저 테라피",
        subtitle: "엄선된 프리미엄 적생강 및 야생 강황 추출물로 생기와 활력을 되찾아주는 허브 테라피.",
        badge: "고전 비책의 현대적 재해석"
      }
    },
    "temp-artisan-craft": {
      id: {
        title: "TANAH RAGA: KRISTALISASI TANAH LIAT",
        subtitle: "Set cangkir stoneware hand-thrown bersalut glasir abu vulkanik Merapi otentik.",
        badge: "KARYA SATU-SATUNYA"
      },
      en: {
        title: "TANAH RAGA: CLAY CRYSTALLIZATION",
        subtitle: "Hand-thrown stoneware cup sets finished with authentic Merapi volcanic ash glaze.",
        badge: "ONE OF A KIND"
      },
      ar: {
        title: "تانا راغا: بلورة الطين",
        subtitle: "مجموعات أكواب خزفية مشكلة يدويًا ومغطاة بطلاء رماد بركان ميرابي الأصيل.",
        badge: "قطعة فريدة لا تكرر"
      },
      ja: {
        title: "タナラガ：炎と土の結晶炻器",
        subtitle: "メラピ火山の火山灰灰釉を使用し、職人がろくろで一品一品丁寧に仕上げた一点物のカップセット。",
        badge: "唯一無二の工芸品"
      },
      ko: {
        title: "타나라가: 흙과 불의 결정체",
        subtitle: "메라피 화산재 재 유약을 입혀 장인이 직접 물레로 빚어낸 단 하나의 프리미엄 머그 세트.",
        badge: "세상에 단 하나뿐인 공예"
      }
    },
    "temp-heritage-textile": {
      id: {
        title: "TENUNAN MAHKOTA RAJA JEMBER",
        subtitle: "Setiap benang dipintal manual menggunakan bahan pewarna indigo alami berkelanjutan.",
        badge: "WARISAN SEJARAH PRESTIGE"
      },
      en: {
        title: "JEMBER ROYAL CROWN WEAVES",
        subtitle: "Each thread is manually spun and naturally dyed using sustainable organic indigo.",
        badge: "HERITAGE PRESTIGE"
      },
      ar: {
        title: "منسوجات تاج جember الملكي",
        subtitle: "يتم غزل كل خيط يدويًا وصبغه بشكل طبيعي باستخدام نبتة النيلة العضوية المستدامة.",
        badge: "هيبة التراث التاريخي"
      },
      ja: {
        title: "ジェンベル王宮の至高織物",
        subtitle: "持続可能なオーガニックの天然インディゴを使用し、一本の糸から丁寧に紡ぎ出された最高品質の伝統織物。",
        badge: "歴史あるプレステージ"
      },
      ko: {
        title: "젬베르 황실 왕관 수제 직조",
        subtitle: "지속 가능한 유기농 인디고 염료를 사용하여 장인이 한 올 한 올 직접 물레로 물들인 전통 명품 직물.",
        badge: "역사적 헤리티지 프레스티지"
      }
    },
    "temp-corporate-gift": {
      id: {
        title: "BINGKISAN MEWAH PENUH KESAN",
        subtitle: "Hampers kustom branding logo grafir laser untuk apresiasi mitra eksekutif.",
        badge: "PROSPEK LAYANAN CORPORATE"
      },
      en: {
        title: "LUXURY MEMORABLE CORPORATE GIFTS",
        subtitle: "Custom hampers with laser-engraved branding to appreciate your premium executive partners.",
        badge: "CORPORATE SERVICES"
      },
      ar: {
        title: "هدايا الشركات الفاخرة والمؤثرة",
        subtitle: "علب هدايا مخصصة مع حفر الشعار بالليزر لتقدير شركائك التنفيذيين المتميزين.",
        badge: "خدمات الشركات المتكاملة"
      },
      ja: {
        title: "記憶に残るハイクラス法人ギフト",
        subtitle: "大切なお得意様や役員の方への贈り物にふさわしい、無料ロゴ刻印入りの特注職人ギフトセット。",
        badge: "法人大口取引対応"
      },
      ko: {
        title: "품격을 담은 오피셜 기업 기프트",
        subtitle: "소중한 파트너와 임직원을 위한 레이저 무료 로고 각인 맞춤형 프리미엄 패키지 세트.",
        badge: "B2B 전문 파트너십"
      }
    },
    "temp-sustainable-local": {
      id: {
        title: "ZERO WASTE ECO CANVAS",
        subtitle: "Menyelamatkan potongan kain industri menjadi tote bag fungsional premium.",
        badge: "KONTRIBUSI DAMPAK SOSIAL SEGERA"
      },
      en: {
        title: "ZERO WASTE ECO CANVAS",
        subtitle: "Upcycling solid fabric offcuts into highly functional premium tote bags.",
        badge: "IMMEDIATE SOCIAL IMPACT"
      },
      ar: {
        title: "حقائب قماشية صديقة للبيئة بدون نفايات",
        subtitle: "إعادة تدوير بقايا الأقمشة الصناعية إلى حقائب يد عملية وممتازة.",
        badge: "أثر اجتماعي فوري"
      },
      ja: {
        title: "ゼロウェイスト・エコキャンバス",
        subtitle: "上質なアパレル素材의 端切れ를 アップサイクルし、機能的で洗練されたプレミアムトートバッグを製作。",
        badge: "持続可能な社会的インパクト"
      },
      ko: {
        title: "제로 웨이스트 에코 캔버스 백",
        subtitle: "업사이클링 공정을 통해 고품질 직물 조각들을 세련되고 유용한 프리미엄 친환경 백으로 탄생시킵니다.",
        badge: "즉각적인 사회 공헌"
      }
    }
  };

  const currentMod = textModifiers[currentTemplate.id]?.[currentLang] || textModifiers[currentTemplate.id]?.id || {
    title: dict.heroTitle,
    subtitle: dict.heroSubtitle,
    badge: "NUSAVARA NEW ERA"
  };

  return (
    <div className="relative overflow-hidden transition-all duration-700 py-12 px-4 sm:px-6 lg:px-8">
      {/* Visual Background Decoration based on Template Style Layout */}
      {currentTemplate.heroLayout === "editorial" && (
        <div className="absolute inset-0 bg-[#353330]/5 mix-blend-multiply pointer-events-none" />
      )}
      {currentTemplate.heroLayout === "minimal" && (
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-rose-200/40 mix-blend-multiply filter blur-3xl" />
      )}
      {currentTemplate.heroLayout === "organic" && (
        <div className="absolute inset-0 bg-radial-[circle_at_bottom_left] from-emerald-950/20 via-transparent" />
      )}
      {currentTemplate.heroLayout === "retro" && (
        <div className="absolute inset-0 border-4 border-dashed border-emerald-800/10 m-3 rounded-2xl pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Dynamic Theme Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 pb-8">
          
          {/* Left Text Column: Custom Editorial Alignment */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-[10px] font-mono tracking-widest text-amber-800 dark:text-amber-400 uppercase font-bold">
                {currentMod.badge}
              </span>
            </div>

            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-stone-900 dark:text-white"
              style={{ fontFamily: currentTemplate.headingFont }}
            >
              {currentMod.title}
            </h1>

            <p className="text-stone-600 dark:text-stone-300 max-w-xl text-base sm:text-lg font-sans leading-relaxed">
              {currentMod.subtitle}
            </p>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[12px] font-mono text-stone-500 dark:text-stone-400 font-bold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {tStatic("bpomBadge")}
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-550 dark:text-amber-400" /> {tStatic("localYarnBadge")}
              </span>
            </div>

            {/* Call To Actions Mapping */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate("catalog")}
                className={`px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md dark:shadow-stone-950/50 ${
                  currentTemplate.primaryColor
                } dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 dark:border-amber-500`}
              >
                <span>{dict.btnShop}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("compliance")}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase border text-stone-700 hover:text-stone-950 bg-white/50 hover:bg-white rounded-none border-stone-300 hover:border-stone-900 duration-300 flex items-center gap-1.5 cursor-pointer dark:text-stone-300 dark:hover:text-white dark:bg-stone-900/50 dark:hover:bg-stone-900 dark:border-stone-700 dark:hover:border-stone-500"
              >
                <span>{dict.btnCheckLegal}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 pt-1">
              <button 
                onClick={() => onNavigate("reseller")}
                className="text-[11px] font-mono tracking-wider text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline font-bold cursor-pointer"
              >
                {dict.btnRegisterReseller} &rarr;
              </button>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <button 
                onClick={() => onNavigate("corporate")}
                className="text-[11px] font-mono tracking-wider text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline font-bold cursor-pointer"
              >
                {dict.btnCorpGift} &rarr;
              </button>
            </div>
          </div>

          {/* Right Image/Lifestyle Column: CURATED LIFESTYLE */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              {/* Card wrapper echoing selected design template limits */}
              <div className={`overflow-hidden aspect-4/3 sm:aspect-16/10 lg:aspect-4/5 ${
                currentTemplate.id === "temp-artisan-craft" 
                  ? "rounded-none border-2 border-stone-800 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]" 
                  : currentTemplate.id === "temp-fashion-label" 
                  ? "rounded-none" 
                  : "rounded-3xl shadow-xl"
              }`}>
                <img
                  src={currentTemplate.illustration}
                  alt="Curated premium product mockup image"
                  className="w-full h-full object-cover group-hover:scale-105 duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float narrative badge for premium storytelling */}
              <div className="absolute -bottom-4 -left-4 bg-stone-900 text-white p-4 max-w-xs shadow-2xl rounded-lg border border-stone-800">
                <span className="block text-[8px] tracking-widest font-mono text-amber-400 font-bold uppercase mb-1">Impact Story</span>
                <p className="text-[11px] leading-snug opacity-90 font-sans italic font-medium">
                  {tStatic("impactStory")}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Impact Metric Strip */}
        <div className="mt-8 pt-6 border-t border-stone-200/60 dark:border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="block text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100" style={{ fontFamily: currentTemplate.headingFont }}>12,400+</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 font-bold">{tStatic("statShipped")}</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100" style={{ fontFamily: currentTemplate.headingFont }}>100%</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 font-bold">{tStatic("statLegal")}</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100" style={{ fontFamily: currentTemplate.headingFont }}>{tStatic("statIncomeVal")}</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 font-bold">{tStatic("statIncome")}</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100" style={{ fontFamily: currentTemplate.headingFont }}>{tStatic("statWasteVal")}</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 font-bold">{tStatic("statWaste")}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
