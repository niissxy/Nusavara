/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, BlogPost, ComplianceDoc, FAQ } from "../types";

export function getLocalizedCategory(catName: string, lang: string): string {
  if (lang === "id") return catName;
  const map: Record<string, string> = {
    "Fashion": "Fashion",
    "Skincare": "Skincare",
    "Herbal Wellness": "Herbal Wellness",
    "Craft": "Handmade Craft",
    "Gift & Hampers": "Gifts & Hampers",
    "Sustainable Goods": "Sustainable Goods"
  };
  return map[catName] || catName;
}

export function getLocalizedSubcategory(subName: string, lang: string): string {
  if (lang === "id") return subName;
  const map: Record<string, string> = {
    "Dress": "Dress",
    "Outerwear": "Outerwear",
    "Modest Wear": "Modest Wear",
    "Batik Modern": "Modern Batik",
    "Tenun Premium": "Premium Woven",
    "Serum": "Serum",
    "Cleanser": "Cleanser",
    "Moisturizer": "Moisturizer",
    "Sunscreen": "Sunscreen",
    "Bodycare": "Body Care",
    "Jamu Modern": "Modern Jamu",
    "Herbal Drink": "Herbal Drink",
    "Aromatherapy": "Aromatherapy",
    "Wellness Kit": "Wellness Kit",
    "Ceramic": "Ceramics",
    "Leather Goods": "Leather Goods",
    "Woodcraft": "Woodcraft",
    "Home Decor": "Home Decor",
    "Corporate Hampers": "Corporate Hampers",
    "Wedding Gift": "Wedding Gifts",
    "Eco Product": "Eco Products"
  };
  return map[subName] || subName;
}

export function getLocalizedProduct(prod: Product, lang: string): Product {
  if (lang === "id") return prod;

  const pTranslations: Record<string, Partial<Product>> = {
    "p1": {
      name: "Aruna Linen Outer",
      description: "Premium linen outerwear with a relaxed cut for a modern and comfortable daily look. Limited production using handpicked, eco-certified local natural organic linen fibers.",
      material: "Premium local organic linen blend",
      care_instruction: "Hand wash cold, do not bleach, iron at medium temperature.",
      collection: "Everyday Heritage"
    },
    "p2": {
      name: "Ceramide Barrier Calm Serum",
      description: "Highly concentrated serum to lock in hydration and restore skin barrier health. Lightweight, non-sticky, easily absorbed, and clinically formulated to be gentle on sensitive skin.",
      usage: "Apply 2-3 drops morning and night after cleansing and applying balancing toner.",
      patch_test_note: "Perform a patch test behind the ear for 24 hours prior to regular application."
    },
    "p3": {
      name: "Temu Glow Modern Jamu",
      description: "High-efficacy natural herbal drink with a refreshing modern taste, extracted from organic curcuma, pure turmeric, aromatic red ginger, and premium selected spices.",
      ingredients: ["Organic Curcuma", "Pure Turmeric", "Red Ginger", "Cinnamon", "Premium Palm Sugar"],
      serving_suggestion: "Brew 1 sachet of herbal concentrate into 150 ml of warm water, stir well. Best consumed in the morning.",
      contraindication: "Not recommended for pregnant women in the first trimester or those with acute renal conditions."
    },
    "p4": {
      name: "Raga Ceramic Cup Set",
      description: "Elegant ceramic cup set handcrafted by local artisans in Yogyakarta. Made from premium stoneware clay, high-temperature kiln fired, and glazed with natural volcanic ash minerals.",
      production_timeline: "14-21 working days hand-thrown process",
      imperfection_note: "Due to the fully manual hand-crafted process, each piece features unique glaze variations and speckles, serving as the authentic signature of artisan craft.",
      care_instruction: "Microwave and hot beverage safe, manual washing with a soft sponge is highly recommended."
    },
    "p5": {
      name: "Nusavara Corporate Wellness Hampers",
      description: "Premium exclusive gift hamper curated specifically for corporate gifting. Contains 1 pack of Temu Glow Modern Jamu, aromatherapy essential oil, a handmade Raga ceramic cup, and a custom branded greeting card."
    },
    "p6": {
      name: "Sagara Upcycled Tote",
      description: "Premium multi-purpose tote bag upcycled from thick export-grade cotton canvas scraps. Engineered with high durability and a modern unisex geometric aesthetic.",
      material: "Upcycled cotton canvas",
      impact_note: "Each unit purchased directly saves 1.2kg of textile waste from polluting local landfills."
    }
  };

  const trans = pTranslations[prod.id];
  if (trans) {
    return {
      ...prod,
      ...trans,
      category: getLocalizedCategory(prod.category, lang),
      subcategory: getLocalizedSubcategory(prod.subcategory, lang)
    };
  }

  return {
    ...prod,
    category: getLocalizedCategory(prod.category, lang),
    subcategory: getLocalizedSubcategory(prod.subcategory, lang)
  };
}

export function getLocalizedBlog(blog: BlogPost, lang: string): BlogPost {
  if (lang === "id") return blog;

  const bTranslations: Record<string, Partial<BlogPost>> = {
    "b1": {
      title: "How to Read Skincare Ingredients Before Buying",
      category: "Skincare Education",
      excerpt: "A simple, practical guide for beginners to understand active ingredients and avoid incompatibility in modern local skincare."
    },
    "b2": {
      title: "Why Do Handmade Products Have Unique Characters?",
      category: "Craft Story",
      excerpt: "Discover the wabi-sabi beauty of imperfections in stoneware ceramic glazes shaped by our master artisans."
    },
    "b3": {
      title: "Guide to Choosing Memorable Corporate Hampers",
      category: "Corporate Gift Guide",
      excerpt: "Tips on impressing C-suite business partners using premium, eco-friendly custom gifts with deep cultural meanings."
    },
    "b4": {
      title: "How to Care for Linen to keep it Durable & Beautiful",
      category: "Fashion Guide",
      excerpt: "Linen is a sustainable fashion investment. Learn manual washing and wrinkle-free ironing techniques to preserve its natural organic fibers."
    },
    "b5": {
      title: "Legal Herbs: The Importance of BPOM License for Consumption Safety",
      category: "Herbal Wellness",
      excerpt: "Unpacking the dangers of unregistered chemical-adulterated herbal drinks. Learn how to identify authentic PIRT/BPOM numbers for long-term health."
    }
  };

  const trans = bTranslations[blog.id];
  if (trans) {
    return {
      ...blog,
      ...trans
    };
  }
  return blog;
}

export function getLocalizedFAQ(faq: FAQ, lang: string): FAQ {
  if (lang === "id") return faq;

  const fTranslations: Record<string, Partial<FAQ>> = {
    "faq1": {
      question: "Are all Nusavara skincare products registered with BPOM and Halal certified?",
      answer: "Yes, our entire line of premium local skincare has passed strict laboratory testing, is free from harmful materials, and holds official BPOM and Halal certifications from the Ministry of Religious Affairs."
    },
    "faq2": {
      question: "Can we order custom corporate hampers with corporate logos and custom boxes?",
      answer: "Absolutely! We cater to custom gift orders from medium to large scales (thousands of units), complete with custom laser engraving on cups/wood, satin ribbons, and premium greeting cards."
    },
    "faq3": {
      question: "How long is the estimated delivery time for pre-order purchases?",
      answer: "Production timelines vary between 14-25 days depending on the manual craftsmanship complexity of each pre-order batch. The shipping date is clearly stated on the product page during checkout."
    },
    "faq4": {
      question: "Why do handmade ceramic cups sometimes have slight differences in glaze or pattern?",
      answer: "Each piece of handmade craft is thrown on a potter's wheel and fired at high temperatures using natural mineral glazes. This process yields organic variations in texture and shades, making each cup one-of-a-kind."
    },
    "faq5": {
      question: "How can I register to become an official retail reseller partner?",
      answer: "Simply go to the 'Reseller Registration' page in our navigation menu and fill out your business profile, promotional channels, and monthly estimates. Our team will contact you via WhatsApp/Email within 48 hours."
    }
  };

  const trans = fTranslations[faq.id];
  if (trans) {
    return {
      ...faq,
      ...trans
    };
  }
  return faq;
}

export function getLocalizedComplianceDoc(doc: ComplianceDoc, lang: string): ComplianceDoc {
  if (lang === "id") return doc;

  const dTranslations: Record<string, Partial<ComplianceDoc>> = {
    "doc1": {
      product: "Ceramide Barrier Calm Serum",
      issued_by: "BPOM RI (Indonesian FDA)"
    },
    "doc2": {
      product: "Ceramide Barrier Calm Serum",
      issued_by: "BPJPH (Ministry of Religious Affairs RI)"
    },
    "doc3": {
      product: "Temu Glow Modern Jamu",
      issued_by: "Municipal Health Office"
    },
    "doc4": {
      product: "Nusavara Local Premium Brand Logo",
      issued_by: "DJKI Ministry of Law & Human Rights RI"
    }
  };

  const trans = dTranslations[doc.id];
  if (trans) {
    return {
      ...doc,
      ...trans
    };
  }
  return doc;
}
