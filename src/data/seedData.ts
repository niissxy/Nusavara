/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BrandSettings,
  ProductCategory,
  Product,
  ProductCollection,
  PreOrderBatch,
  Customer,
  Order,
  Voucher,
  Review,
  ResellerApplication,
  CorporateInquiry,
  BlogPost,
  ComplianceDoc,
  FAQ,
  AdminUser
} from "../types";

export const initialBrandSettings: BrandSettings = {
  brand_name: "Nusavara Local Premium",
  tagline: "Local Goods, Elevated Stories",
  industry: "Produk Lokal Premium",
  default_language: "id",
  supported_languages: ["id", "en", "ar", "ja", "ko"],
  currency: "IDR",
  country: "Indonesia",
  city: "Jakarta",
  whatsapp: "+6281234567890",
  email: "hello@nusavara.id",
  instagram: "https://instagram.com/nusavara",
  tiktok: "https://tiktok.com/@nusavara",
  youtube: "https://youtube.com/@nusavara",
  address: "Jl. Kemang Raya No. 18, Jakarta Selatan",
  theme_mode: ["light", "dark", "auto"]
};

export const initialCategories: ProductCategory[] = [
  {
    name: "Fashion",
    slug: "fashion",
    description: "Koleksi fashion lokal premium dengan desain modern dan material berkualitas harian."
  },
  {
    name: "Skincare",
    slug: "skincare",
    description: "Produk perawatan kulit lokal dengan informasi ingredients dan legalitas jelas halal."
  },
  {
    name: "Herbal Wellness",
    slug: "herbal-wellness",
    description: "Produk herbal legal dan wellness untuk ritual harian yang lebih natural dan alami."
  },
  {
    name: "Craft",
    slug: "craft",
    description: "Produk handmade premium dari artisan lokal dengan material pilihan istimewa."
  },
  {
    name: "Gift & Hampers",
    slug: "gift-hampers",
    description: "Paket hadiah premium untuk personal, formal, pesta pernikahan, dan corporate event."
  },
  {
    name: "Sustainable Goods",
    slug: "sustainable-goods",
    description: "Produk lokal ramah lingkungan yang memberikan kontribusi dampak sosial berkelanjutan."
  }
];

export const initialSubCategories: string[] = [
  "Dress",
  "Outerwear",
  "Modest Wear",
  "Batik Modern",
  "Tenun Premium",
  "Serum",
  "Cleanser",
  "Moisturizer",
  "Sunscreen",
  "Bodycare",
  "Jamu Modern",
  "Herbal Drink",
  "Aromatherapy",
  "Wellness Kit",
  "Ceramic",
  "Leather Goods",
  "Woodcraft",
  "Home Decor",
  "Corporate Hampers",
  "Wedding Gift",
  "Eco Product"
];

export const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Aruna Linen Outer",
    category: "Fashion",
    subcategory: "Outerwear",
    price: 489000,
    discount_price: 429000,
    badge: ["New Arrival", "Limited Drop"],
    stock_status: "Available",
    stock: 32,
    description: "Outer linen premium dengan potongan relaxed untuk tampilan modern dan nyaman harian. Diproduksi terbatas menggunakan serat rami alami lokal pilihan bersertifikasi ramah lingkungan.",
    material: "Premium linen blend",
    color: ["Ivory", "Sage", "Charcoal"],
    size: ["S", "M", "L", "XL"],
    fit: "Relaxed fit",
    care_instruction: "Cuci tangan dengan air dingin, jangan gunakan pemutih keras, setrika dengan suhu sedang.",
    collection: "Everyday Heritage",
    preorder: false,
    weight_gram: 450,
    rating: 4.8,
    image: "fashion"
  },
  {
    id: "p2",
    name: "Serum Ceramide Barrier Calm",
    category: "Skincare",
    subcategory: "Serum",
    price: 189000,
    discount_price: null,
    badge: ["Best Seller", "BPOM"],
    stock_status: "Low Stock",
    stock: 8,
    description: "Serum berkonsentrasi tinggi untuk mengunci hidrasi dan memulihkan kondisi skin barrier. Formulanya ringan, bebas lengket, mudah meresap, dan dikembangkan secara klinis ramah kulit sensitif.",
    skin_type: ["Dry", "Sensitive", "Combination", "Oily"],
    skin_concern: ["Barrier", "Dryness", "Redness", "Acne"],
    ingredients: ["Ceramide NP", "Panthenol", "Centella Asiatica", "Hyaluronic Acid", "Niacinamide"],
    bpom_number: "NA18230123456",
    halal_certificate: "ID004100012345",
    usage: "Gunakan 2-3 tetes pada pagi dan malam hari setelah membersihkan wajah dan memakai toner penyeimbang.",
    patch_test_note: "Lakukan uji tempel (patch test) pada area leher belakang telinga selama 24 jam sebelum pemakaian reguler.",
    expiry_date: "2027-12-31",
    batch_code: "SCB-2409-A",
    weight_gram: 120,
    rating: 4.9,
    image: "skincare"
  },
  {
    id: "p3",
    name: "Jamu Modern Temu Glow",
    category: "Herbal Wellness",
    subcategory: "Jamu Modern",
    price: 129000,
    discount_price: 99000,
    badge: ["Herbal Legal", "PIRT", "Halal"],
    stock_status: "Available",
    stock: 55,
    description: "Minuman herbal berkhasiat tinggi dengan cita rasa modern hasil ekstraksi temulawak organik, kunyit murni, jahe merah aromatik, serta bumbu rempah pilihan yang menyegarkan kesehatan.",
    ingredients: ["Temulawak Organik", "Kunyit Murni", "Jahe Merah", "Kayu Manis", "Gula Aren Premium"],
    legal_number: "PIRT 2093174012345",
    halal_certificate: "ID004100045678",
    serving_suggestion: "Seduh 1 sachet konsentrat herbal ke dalam 150 ml air hangat, aduk merata. Bagus dinikmati di pagi hari.",
    contraindication: "Tidak disarankan bagi wanita hamil trimester awal atau penderita gangguan ginjal akut yang rentan.",
    expiry_date: "2027-06-30",
    batch_code: "JTG-2408-B",
    weight_gram: 300,
    rating: 4.7,
    image: "herbal"
  },
  {
    id: "p4",
    name: "Raga Ceramic Cup Set",
    category: "Craft",
    subcategory: "Ceramic",
    price: 349000,
    discount_price: null,
    badge: ["Handmade", "Limited Edition"],
    stock_status: "Pre-Order",
    stock: 0,
    description: "Set cangkir keramik elegan hasil mahakarya artisan lokal tanah Yogyakarta. Menggunakan tanah liat stoneware terpilih dengan proses pembakaran suhu tinggi dan pewarnaan glasir mineral abu vulkanik natural.",
    artisan: "Studio Tanah Raga",
    region: "Yogyakarta",
    material: "Stoneware ceramic",
    production_timeline: "14-21 hari kerja proses hand-thrown",
    customization: true,
    imperfection_note: "Karena proses pengerjaan manual penuh tanpa cetakan mesin, setiap produk memiliki variasi gradasi warna dan bercak unik sebagai ciri khas otentik produk artisan.",
    care_instruction: "Aman digunakan untuk microwave dan minuman panas, disarankan dicuci manual dengan spons halus.",
    weight_gram: 900,
    rating: 4.9,
    image: "craft"
  },
  {
    id: "p5",
    name: "Nusavara Corporate Wellness Hampers",
    category: "Gift & Hampers",
    subcategory: "Corporate Hampers",
    price: 375000,
    discount_price: null,
    badge: ["Corporate Gift", "Custom Packaging"],
    stock_status: "Available",
    stock: 120,
    description: "Paket hampers eksklusif premium yang dikurasi khusus untuk korporat. Berisi 1 pack Jamu Modern Temu Glow, botol aromatherapy essential oil, cangkir raga keramik, serta kartu ucapan custom branding perusahaan.",
    custom_packaging: true,
    minimum_order: 20,
    delivery_date_option: true,
    corporate_logo_option: true,
    weight_gram: 1500,
    rating: 4.8,
    image: "gift"
  },
  {
    id: "p6",
    name: "Sagara Upcycled Tote",
    category: "Sustainable Goods",
    subcategory: "Eco Product",
    price: 259000,
    discount_price: 229000,
    badge: ["Sustainable", "Upcycled"],
    stock_status: "Available",
    stock: 24,
    description: "Tote bag premium serbaguna hasil upcycling sisa potongan kain kanvas katun tebal berkualitas ekspor. Dirancang dengan ketahanan tinggi dan estetika geometris modern maskulin-feminin.",
    material: "Upcycled cotton canvas",
    impact_note: "Setiap pembelian unit produk ini berkontribusi menyelamatkan 1.2kg limbah tekstil agar tidak berakhir merusak lingkungan di TPA lokal.",
    color: ["Natural White", "Olive Drab", "Midnight Black"],
    weight_gram: 350,
    rating: 4.6,
    image: "sustainable"
  }
];

export const initialCollections: ProductCollection[] = [
  {
    name: "Everyday Heritage",
    slug: "everyday-heritage",
    type: "Fashion Collection",
    description: "Koleksi fashion lokal dengan sentuhan heritage, tenunan kultural, dan bahan linen organik untuk penggunaan harian.",
    status: "Active"
  },
  {
    name: "Barrier Care Routine",
    slug: "barrier-care-routine",
    type: "Skincare Routine",
    description: "Rangkaian urutan skincare bernutrisi ceramide alami untuk memulihkan dan melindungi pertahanan kulit yang lelah.",
    status: "Active"
  },
  {
    name: "Wellness Ritual Kit",
    slug: "wellness-ritual-kit",
    type: "Herbal Wellness",
    description: "Kombinasi suplemen kebugaran herbal dan jamu seduh instan untuk ritual penyeimbang daya tahan tubuh sehari-hari.",
    status: "Active"
  },
  {
    name: "Artisan Tableware Drop",
    slug: "artisan-tableware-drop",
    type: "Craft Limited Drop",
    description: "Koleksi keramik premium karya seniman lokal Yogyakarta bergaya wabi-sabi dengan stok terbatas.",
    status: "Pre-Order"
  },
  {
    name: "Lebaran Corporate Hampers",
    slug: "lebaran-corporate-hampers",
    type: "Corporate Gift",
    description: "Edisi spesial bingkisan hari raya mewah dengan ornamen anyaman bambu tasik dan kartu emas custom.",
    status: "Coming Soon"
  }
];

export const initialPreOrderBatches: PreOrderBatch[] = [
  {
    id: "po1",
    batch_name: "Artisan Tableware Drop Batch 01",
    product: "Raga Ceramic Cup Set",
    status: "Open",
    quota: 50,
    ordered: 37,
    cut_off_date: "2026-07-15",
    production_start: "2026-07-16",
    estimated_shipping: "2026-08-05",
    payment_type: "Full Payment",
    timeline: [
      "Order Open",
      "Payment Confirmed",
      "Production Started (Hand-Thrown Clay)",
      "Kiln Firing & Glazing",
      "Quality Checking & Certification",
      "Secure Bamboo Wrapping & Shipping"
    ]
  },
  {
    id: "po2",
    batch_name: "Raya Modest Wear Drop",
    product: "Aruna Linen Outer",
    status: "Coming Soon",
    quota: 100,
    ordered: 0,
    cut_off_date: "2026-08-01",
    production_start: "2026-08-02",
    estimated_shipping: "2026-08-20",
    payment_type: "Down Payment Available",
    timeline: [
      "Waitlist Deposit Open",
      "Detailed Fabric Precision Sizing",
      "Tailoring & Sewing Heritage Workshop",
      "Labeling & Eco Packaging",
      "Ready to Deliver"
    ]
  }
];

export const initialCustomers: Customer[] = [
  {
    id: "c1",
    name: "Alya Rahmani",
    email: "alya@example.com",
    phone: "+628111111111",
    city: "Jakarta",
    customer_status: "VIP",
    total_orders: 12,
    total_spent: 4850000,
    loyalty_points: 870,
    tier: "Gold",
    favorite_category: "Skincare",
    source: "Instagram"
  },
  {
    id: "c2",
    name: "Dimas Prasetyo",
    email: "dimas@example.com",
    phone: "+628122222222",
    city: "Bandung",
    customer_status: "Repeat Buyer",
    total_orders: 5,
    total_spent: 1890000,
    loyalty_points: 310,
    tier: "Silver",
    favorite_category: "Craft",
    source: "Google"
  },
  {
    id: "c3",
    name: "Mei Tanaka",
    email: "mei@example.com",
    phone: "+628133333333",
    city: "Bali",
    customer_status: "First Purchase",
    total_orders: 1,
    total_spent: 375000,
    loyalty_points: 40,
    tier: "Bronze",
    favorite_category: "Gift & Hampers",
    source: "TikTok"
  }
];

export const initialOrders: Order[] = [
  {
    order_number: "NSV-ORD-1001",
    customer: "Alya Rahmani",
    items: [
      {
        product: "Serum Ceramide Barrier Calm",
        quantity: 2,
        price: 189000,
        variant: "30ml Bottle"
      },
      {
        product: "Jamu Modern Temu Glow",
        quantity: 1,
        price: 99000,
        variant: "10-Sachet Box"
      }
    ],
    subtotal: 477000,
    shipping_cost: 22000,
    discount: 25000,
    total: 474000,
    payment_method: "QRIS",
    payment_status: "Paid",
    order_status: "Processing",
    courier: "JNE",
    tracking_number: null,
    date: "2026-06-03T14:22:00Z"
  },
  {
    order_number: "NSV-ORD-1002",
    customer: "Dimas Prasetyo",
    items: [
      {
        product: "Raga Ceramic Cup Set",
        quantity: 1,
        price: 349000,
        variant: "Original Stoneware"
      }
    ],
    subtotal: 349000,
    shipping_cost: 35000,
    discount: 0,
    total: 384000,
    payment_method: "Virtual Account",
    payment_status: "Paid",
    order_status: "Pre-Order",
    courier: "SiCepat",
    tracking_number: null,
    date: "2026-06-03T09:15:00Z"
  }
];

export const initialVouchers: Voucher[] = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minimum_purchase: 250000,
    usage_limit: 500,
    status: "Active"
  },
  {
    code: "FREESHIP50",
    type: "shipping_discount",
    value: 50000,
    minimum_purchase: 350000,
    usage_limit: 300,
    status: "Active"
  },
  {
    code: "LOCALPRIDE25",
    type: "fixed",
    value: 25000,
    minimum_purchase: 200000,
    usage_limit: 1000,
    status: "Active"
  }
];

export const initialReviews: Review[] = [
  {
    id: "rev1",
    customer: "Alya Rahmani",
    product: "Serum Ceramide Barrier Calm",
    rating: 5,
    review: "Teksturnya sangat ringan, berair, dan langsung menenangkan kulit saya yang kemerahan. Informasi BPOM serta sertifikasi Halalnya membuat saya tenang dan percaya penuh pada Nusavara.",
    status: "Published"
  },
  {
    id: "rev2",
    customer: "Dimas Prasetyo",
    product: "Raga Ceramic Cup Set",
    rating: 5,
    review: "Produk keramik stoneware buatan Studio Tanah Raga ini sungguh cantik! Gradasi glasir mineralnya begitu artistik dan terasa sangat mantap digenggam. Paket ditaruh dalam kardus kokoh berdaun paku kering.",
    status: "Published"
  },
  {
    id: "rev3",
    customer: "Mei Tanaka",
    product: "Nusavara Corporate Wellness Hampers",
    rating: 4,
    review: "Hampers berkelas tinggi. Kemasan kerbunya elegan sekali, dicustom logo kami dengan grafir kayu halus. Sangat direkomendasikan untuk kolega VIP perusahaan Anda.",
    status: "Published"
  }
];

export const initialResellers: ResellerApplication[] = [
  {
    id: "res1",
    name: "Raina Store",
    owner: "Raina Putri",
    city: "Surabaya",
    sales_channel: ["Instagram", "Shopee", "Offline Store Boutique"],
    product_interest: ["Skincare", "Herbal Wellness"],
    monthly_sales_estimate: "Rp20.000.000 - Rp50.000.000",
    experience: "3 tahun aktif mengelola toko kosmetik sehat & herbal premium.",
    status: "Reviewed"
  },
  {
    id: "res2",
    name: "Kirana Modest Gallery",
    owner: "Nadia Kirana",
    city: "Bandung",
    sales_channel: ["TikTok Live", "Instagram Feed", "WhatsApp Group VIP"],
    product_interest: ["Fashion", "Gift & Hampers"],
    monthly_sales_estimate: "Rp10.000.000 - Rp25.000.000",
    experience: "Fokus melayani pasar hijab eksklusif Jawa Barat dengan 500+ pelanggan loyal.",
    status: "Approved"
  }
];

export const initialCorporateInquiries: CorporateInquiry[] = [
  {
    id: "cor1",
    company: "PT Harmoni Digital Nusantara",
    contact_person: "Bima Arya",
    email: "bima@harmonidigital.co.id",
    phone: "+628144444444",
    event_purpose: "Employee Appreciation Wellness Gift (Annual Gathering)",
    budget_per_package: 350000,
    quantity: 150,
    custom_logo: true,
    delivery_date: "2026-09-10",
    status: "Quotation Sent"
  },
  {
    id: "cor2",
    company: "Satu Ruang Creative Studio",
    contact_person: "Clara Wijaya",
    email: "clara@saturuang.id",
    phone: "+628155555555",
    event_purpose: "Client End-of-Year Signature Hampers",
    budget_per_package: 500000,
    quantity: 75,
    custom_logo: true,
    delivery_date: "2026-12-01",
    status: "Negotiation"
  }
];

export const initialBlogs: BlogPost[] = [
  {
    id: "b1",
    title: "Cara Membaca Ingredients Skincare Sebelum Membeli",
    category: "Skincare Education",
    excerpt: "Panduan praktis sederhana bagi pemula untuk memahami ingredients aktif utama serta penangkal ketidakcocokan dalam skincare lokal masa kini.",
    status: "Published",
    date: "2026-05-18"
  },
  {
    id: "b2",
    title: "Mengapa Produk Handmade Memiliki Karakter Berbeda?",
    category: "Craft Story",
    excerpt: "Kenali keindahan seni wabi-sabi dari ketidaksempurnaan glasir keramik stoneware hasil sentuhan tangan artisan andalan kami.",
    status: "Published",
    date: "2026-05-24"
  },
  {
    id: "b3",
    title: "Panduan Memilih Hampers Corporate yang Berkesan",
    category: "Corporate Gift Guide",
    excerpt: "Tips mengesankan mitra bisnis level C-Suite menggunakan bingkisan kustom premium ramah lingkungan bermakna kultural mendalam.",
    status: "Published",
    date: "2026-06-01"
  },
  {
    id: "b4",
    title: "Cara Merawat Linen agar Tetap Awet & Bertekstur Indah",
    category: "Fashion Guide",
    excerpt: "Linen adalah investasi fashion sustainable. Simak teknik pencucian manual serta penyetrikaan bebas kusut demi menjaga serat araminya.",
    status: "Published",
    date: "2026-06-02"
  },
  {
    id: "b5",
    title: "Herbal Legal: Pentingnya Izin Edar BPOM demi Keamanan Konsumsi",
    category: "Herbal Wellness",
    excerpt: "Membongkar bahaya jamu racikan kimia tanpa izin edar resmi. Pelajari letak nomor PIRT/BPOM autentik demi kesehatan jangka panjang.",
    status: "Published",
    date: "2026-06-03"
  }
];

export const initialComplianceDocs: ComplianceDoc[] = [
  {
    id: "doc1",
    document_type: "BPOM",
    product: "Serum Ceramide Barrier Calm",
    certificate_number: "NA18230123456",
    issued_by: "BPOM RI",
    issue_date: "2024-09-01",
    expiry_date: "2029-09-01",
    status: "Valid"
  },
  {
    id: "doc2",
    document_type: "Halal",
    product: "Serum Ceramide Barrier Calm",
    certificate_number: "ID004100012345",
    issued_by: "BPJPH (Kementerian Agama RI)",
    issue_date: "2024-10-15",
    expiry_date: "2028-10-15",
    status: "Valid"
  },
  {
    id: "doc3",
    document_type: "PIRT",
    product: "Jamu Modern Temu Glow",
    certificate_number: "PIRT 2093174012345",
    issued_by: "Dinas Kesehatan Kota",
    issue_date: "2024-08-01",
    expiry_date: "2029-08-01",
    status: "Valid"
  },
  {
    id: "doc4",
    document_type: "HAKI",
    product: "Nusavara Local Premium Brand Logo",
    certificate_number: "DID2024056789",
    issued_by: "DJKI Kementerian Hukum & HAM RI",
    issue_date: "2024-06-12",
    expiry_date: "2034-06-12",
    status: "Valid"
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: "faq1",
    question: "Apakah semua produk skincare Nusavara sudah terdaftar BPOM & Halal?",
    answer: "Ya, seluruh rangkaian produk skincare lokal premium kami telah melewati uji laboratorium ketat, steril dari bahan berbahaya, serta memiliki sertifikasi BPOM dan Halal resmi dari Kemenag."
  },
  {
    id: "faq2",
    question: "Apakah kita dapat memesan corporate hampers dengan logo & custom box?",
    answer: "Tentu saja! Kami melayani pesanan produk bingkisan kustom skala sedang hingga ribuan unit, lengkap dengan grafir logo laser pada cangkir/kayu, pita satin berlogo, serta custom greeting card eksklusif."
  },
  {
    id: "faq3",
    question: "Berapa lama estimasi pengiriman untuk pesanan pre-order?",
    answer: "Estimasi lama pengerjaan bervariasi antara 14-25 hari mengikuti kerumitan pengerjaan manual artisan ditiap batch pre-order. Tanggal pengiriman tertera jelas di deskripsi produk saat checkout."
  },
  {
    id: "faq4",
    question: "Mengapa cangkir keramik handmade terkadang berbeda corak?",
    answer: "Setiap barang kriya (craft) handmade dibuat melingkar secara manual dan dibakar pada suhu tinggi menggunakan abu mineral alam. Efek pembakaran melahirkan variasi bercak artistik unik yang menjadikannya satu-satunya di dunia."
  },
  {
    id: "faq5",
    question: "Bagaimana cara mendaftar menjadi mitra reseller resmi?",
    answer: "Anda cukup masuk ke halaman 'Daftar Reseller' di bagian navigasi, mengisi profil bisnis, estimasi jalur promosi serta omset bulanan Anda. Tim Nusavara akan menghubungi via WhatsApp/Email maksimal 2x24 jam."
  }
];

export const initialAdminUsers: AdminUser[] = [
  {
    name: "Super Admin Nusavara",
    email: "admin@nusavara.id",
    role: "Super Admin",
    password: "adminpassword",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Mira Product Manager",
    email: "product@nusavara.id",
    role: "Product Admin",
    password: "productpassword",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Raka Order Manager",
    email: "order@nusavara.id",
    role: "Order Admin",
    password: "orderpassword",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Salsa Marketing",
    email: "marketing@nusavara.id",
    role: "Marketing Admin",
    password: "marketingpassword",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Beni Corporate Sales",
    email: "corporate@nusavara.id",
    role: "Corporate Sales",
    password: "corporatepassword",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Lina Compliance",
    email: "compliance@nusavara.id",
    role: "Compliance Admin",
    password: "compliancepassword",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  }
];

// --- 5 Language Translations ---
export const translations = {
  id: {
    heroTitle: "Produk Lokal Premium dengan Cerita & Legalitas Jelas",
    heroSubtitle: "Temukan koleksi busana premium, formula skincare bersertifikat BPOM, racikan herbal alami, dan kriya buatan tangan karya terbaik artisan pejuang lokal yang berkelanjutan.",
    btnShop: "Belanja Koleksi",
    btnStory: "Lihat Cerita Brand",
    btnCheckLegal: "Cek Legalitas Produk",
    btnRegisterReseller: "Daftar Reseller",
    btnCorpGift: "Pesan Corporate Gift",
    featuredCol: "Koleksi Unggulan",
    bestSeller: "Produk Terlaris",
    preOrderAlert: "Drop Pre-Order Terbatas",
    brandStoryHeader: "Cerita di Balik Setiap Karya",
    reviewTitle: "Kisah Kepuasan Pelanggan Suka Cita",
    footerQuote: "Local Goods, Elevated Stories. Mengangkat martabat produk lokal ke tingkat tertinggi.",
    checkoutNow: "Checkout Sekarang",
    addToCart: "Tambah Ke Keranjang",
    categoriesLabel: "Kategori",
    searchPlaceholder: "Cari produk premium Nusavara...",
    filterLabel: "Filter Produk",
    sortBy: "Urutkan",
    priceLabel: "Harga",
    stockLabel: "Stok",
    aboutUsStatus: "Tentang Kami",
    routineGuide: "Panduan Rutinitas Skincare",
    herbalGuide: "Panduan Sehat Herbal",
    artisanTitle: "Kisah Sang Pengrajin",
    loyaltyPoints: "Poin Loyalitas",
    membershipTier: "Tingkat Keanggotaan",
    crmLeads: "Status CRM Terkini",
    paymentGateway: "Gerbang Pembayaran Aman",
    shippingTitle: "Integrasi Pengiriman Lintas Kurir",
    resellerFormTitle: "Pendaftaran Reseller Baru",
    corporateFormTitle: "Formulir Layanan Kemitraan Corporate Gift",
    aiAssistantTitle: "Nusavara AI Pramuniaga"
  },
  en: {
    heroTitle: "Premium Local Goods with Craft & Clear Compliance",
    heroSubtitle: "Explore premium fashion labels, BPOM certified skincare formulas, natural organic wellness solutions, and authentic handcrafted arts made with cultural pride.",
    btnShop: "Shop Collections",
    btnStory: "Explore Brand Stories",
    btnCheckLegal: "Verify Compliance Docs",
    btnRegisterReseller: "Join Reseller Network",
    btnCorpGift: "Inquire Corporate Gifts",
    featuredCol: "Featured Collections",
    bestSeller: "Best Selling Products",
    preOrderAlert: "Limited Pre-Order Drops",
    brandStoryHeader: "The Core Philosophical Story",
    reviewTitle: "What Our Patrons Say",
    footerQuote: "Local Goods, Elevated Stories. Pushing indigenous products to international heights.",
    checkoutNow: "Checkout Now",
    addToCart: "Add to Cart",
    categoriesLabel: "Categories",
    searchPlaceholder: "Search Nusavara fine goods...",
    filterLabel: "Filter Products",
    sortBy: "Sort By",
    priceLabel: "Price",
    stockLabel: "Stock Status",
    aboutUsStatus: "About Us",
    routineGuide: "Skincare Science Routine Planner",
    herbalGuide: "Herbal Wellness Guide",
    artisanTitle: "The Master Artisan Profile",
    loyaltyPoints: "Loyalty Points",
    membershipTier: "Membership Tier",
    crmLeads: "CRM Leads Pipeline",
    paymentGateway: "Secure Instant Payment Flow",
    shippingTitle: "Multi-Courier Shipping Grid",
    resellerFormTitle: "Reseller Network Boarding",
    corporateFormTitle: "Corporate Custom Inquiry Board",
    aiAssistantTitle: "Nusavara AI Shopping Assistant"
  },
  ar: {
    heroTitle: "سلع محلية متميزة مع الحرف والامتثال الواضح",
    heroSubtitle: "اكتشف أحدث صيحات الموضة، والحلول المعتمدة للعناية بالبشرة، والمنتجات العشبية الطبيعية، والصناعات اليدوية المستدامة من أفضل الحرفيين المحليين.",
    btnShop: "تسوق المجموعة",
    btnStory: "شاهد قصتنا",
    btnCheckLegal: "تحقق من الترخيص",
    btnRegisterReseller: "سجل كموزع",
    btnCorpGift: "طلب هدايا الشركات",
    featuredCol: "المجموعة المميزة",
    bestSeller: "المنتجات الأكثر مبيعا",
    preOrderAlert: "الحجز المسبق المحدود",
    brandStoryHeader: "فلسفة وراء كل قطعة",
    reviewTitle: "آراء عملائنا الأوفياء",
    footerQuote: "سلع محلية، بقصص راقية. الارتقاء بالإنتاج المحلي إلى القمة.",
    checkoutNow: "الدفع الآن",
    addToCart: "أضف إلى السلة",
    categoriesLabel: "الفئات",
    searchPlaceholder: "ابحث عن منتجات نوسافارا المتميزة...",
    filterLabel: "تصفية المنتجات",
    sortBy: "ترتيب حسب",
    priceLabel: "السعر",
    stockLabel: "حالة المخزون",
    aboutUsStatus: "من نحن",
    routineGuide: "دليل العناية بالبشرة",
    herbalGuide: "دليل العافية العشبية",
    artisanTitle: "قصة الحرفي المحترف",
    loyaltyPoints: "نقاط الولاء",
    membershipTier: "فئة العضوية",
    crmLeads: "عمليات المبيعات النشطة",
    paymentGateway: "بوابة دفع آمنة وسريعة",
    shippingTitle: "تكامل الشحن مع شركات متعددة",
    resellerFormTitle: "تسجيل الموزعين الجدد",
    corporateFormTitle: "طلب هدايا الشركات المخصصة",
    aiAssistantTitle: "مساعد التسوق الذكي نوسافارا"
  },
  ja: {
    heroTitle: "物語、卓越した品質、確かな認可を持つ最高級ローカルブランド",
    heroSubtitle: "洗練された最高級ファブリック、厳しい国産安全基準（BPOM）を充たしたスキンケア、本格派伝統ハーブ、職人入魂の手組み陶工品をお届けします。",
    btnShop: "コレクションを見る",
    btnStory: "私たちの物語",
    btnCheckLegal: "品質・認可証を確認",
    btnRegisterReseller: "販売代理店に登録",
    btnCorpGift: "法人大口ギフト問合せ",
    featuredCol: "厳選プレミアム",
    bestSeller: "ベストセラー商品",
    preOrderAlert: "数量限定先行予約ドロップ",
    brandStoryHeader: "工芸に込められた理念と哲学",
    reviewTitle: "顧客からの信頼と高評価の声",
    footerQuote: "Local Goods, Elevated Stories. インドネシア最高峰の手仕事に誇りを乗せて。",
    checkoutNow: "今すぐレジに進む",
    addToCart: "カートに追加する",
    categoriesLabel: "カテゴリー一覧",
    searchPlaceholder: "ヌサヴァラ名産を検索...",
    filterLabel: "検索フィルター",
    sortBy: "並び替え",
    priceLabel: "価格",
    stockLabel: "在庫状況",
    aboutUsStatus: "私たちについて",
    routineGuide: "美容サイエンスルーティン",
    herbalGuide: "現代の滋養ハーブ礼賛",
    artisanTitle: "熟練の匠と伝統工芸",
    loyaltyPoints: "会員ロイヤリティポイント",
    membershipTier: "会員ステージ",
    crmLeads: "営業リード管理",
    paymentGateway: "暗号化セキュア決済ゲートウェイ",
    shippingTitle: "配送物流ネットワーク連携",
    resellerFormTitle: "新規代理店・サロン提携申請",
    corporateFormTitle: "法人特注進物・ノベルティ申請フォーム",
    aiAssistantTitle: "Nusavara AIコンシェルジュ"
  },
  ko: {
    heroTitle: "높은 품격과 이야기를 품은 프리미엄 명품 로컬 플랫폼",
    heroSubtitle: "엄격한 친환경 소재 의류, 국가 승인(BPOM) 완료 비건 스킨케어, 세대를 이어온 로컬 천연 허브 테라피, Yogyakarta 명장의 수제 전통 자기를 만나보세요.",
    btnShop: "쇼핑하러 가기",
    btnStory: "브랜드 철학 보기",
    btnCheckLegal: "안전 인증 정보 조회",
    btnRegisterReseller: "공식 리셀러 파트너 신청",
    btnCorpGift: "단체/기업 기프트 문의",
    featuredCol: "시그니처 컬렉션",
    bestSeller: "누적 판매 베스트",
    preOrderAlert: "스페셜 배치 선주문 시스템",
    brandStoryHeader: "손끝에서 피어나는 장인 정신",
    reviewTitle: "VVIP 유저들의 검증 후기",
    footerQuote: "Local Goods, Elevated Stories. 아름다운 로컬 가치를 현대적 라이프스타일로 재정의합니다.",
    checkoutNow: "결제 신청하기",
    addToCart: "장바구니 담기",
    categoriesLabel: "카테고리 분류",
    searchPlaceholder: "누사바라 시그니처 검색...",
    filterLabel: "필터링 설정",
    sortBy: "정렬 기준",
    priceLabel: "소비자가격",
    stockLabel: "거래 잔고 상태",
    aboutUsStatus: "브랜드 소개",
    routineGuide: "스킨 스페셜리스트의 처방전",
    herbalGuide: "전통 웰니스 허브 가이트",
    artisanTitle: "로컬 아티산 단독 조명",
    loyaltyPoints: "우수회원 적립 포인트",
    membershipTier: "회원 등급 티어",
    crmLeads: "B2B 잠재적 리드 점수",
    paymentGateway: "안전 지불 결제 암호화",
    shippingTitle: "스마트 유통 배송 솔루션",
    resellerFormTitle: "리셀러 협력 신규 가입",
    corporateFormTitle: "기업 대량 맞춤 기프트 요청서",
    aiAssistantTitle: "Nusavara AI AI 쇼핑 헬퍼"
  }
};

// --- 10 PREMIUM DECORATION TEMPLATES CONFIG ---
export interface DesignTemplate {
  id: string;
  name: string;
  vibe: string;
  theme: "light" | "dark" | "mixed";
  headingFont: string;
  baseFont: string;
  primaryColor: string;
  accentColor: string;
  bgSolid: string;
  cardStyle: string;
  borderStyle: string;
  heroLayout: "editorial" | "minimal" | "split" | "bento" | "organic" | "classic" | "corporate" | "indigenous" | "science" | "retro";
  illustration: string;
}

export const designTemplates: DesignTemplate[] = [
  {
    id: "temp-fashion-label",
    name: "1. Premium Fashion Label (Everyday Luxury)",
    vibe: "High Fashion Lookbook, Matte Soft Contrast, Serif Bold Layout",
    theme: "light",
    headingFont: "Playfair Display, Georgia, serif",
    baseFont: "Inter, sans-serif",
    primaryColor: "bg-stone-900 border-stone-900 hover:bg-stone-800 text-white",
    accentColor: "text-stone-700 bg-stone-100",
    bgSolid: "bg-stone-50 text-stone-950",
    cardStyle: "rounded-none border border-stone-200 shadow-sm hover:border-stone-900 duration-500",
    borderStyle: "border-stone-200",
    heroLayout: "editorial",
    illustration: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "temp-modest-wear",
    name: "2. Modest Wear Premium (Warm Sand)",
    vibe: "Elegant modest, Warm ivory canvas, golden ratios, graceful margins",
    theme: "light",
    headingFont: "Cormorant Garamond, serif",
    baseFont: "Inter, sans-serif",
    primaryColor: "bg-amber-950 border-amber-950 hover:bg-amber-900 text-white",
    accentColor: "text-amber-900 bg-amber-50",
    bgSolid: "bg-[#FAF7F2] text-[#2C2520]",
    cardStyle: "rounded-2xl border border-amber-100 shadow-sm hover:shadow-lg duration-300",
    borderStyle: "border-amber-100",
    heroLayout: "classic",
    illustration: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "temp-skincare-clean",
    name: "3. Skincare Science Clean (Mint & Ice)",
    vibe: "Clinical high contrast, cold ice white, medical teal highlights",
    theme: "light",
    headingFont: "Outfit, Space Grotesk, sans-serif",
    baseFont: "Inter, sans-serif",
    primaryColor: "bg-emerald-950 border-emerald-950 hover:bg-emerald-900 text-white",
    accentColor: "text-emerald-800 bg-emerald-50",
    bgSolid: "bg-slate-50 text-slate-900",
    cardStyle: "rounded-lg border border-slate-200 shadow-sm hover:border-emerald-600 duration-300",
    borderStyle: "border-slate-200",
    heroLayout: "science",
    illustration: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "temp-beauty-routine",
    name: "4. Beauty Routine Store (Rose Petals)",
    vibe: "Feminine, soft peach glows, circular cards, silky gradients",
    theme: "light",
    headingFont: "Fraunces, serif",
    baseFont: "Inter, sans-serif",
    primaryColor: "bg-rose-900 border-rose-900 hover:bg-rose-800 text-white",
    accentColor: "text-rose-700 bg-rose-50",
    bgSolid: "bg-rose-50/40 text-stone-900",
    cardStyle: "rounded-3xl border border-rose-100 shadow-sm hover:shadow-rose-100 duration-300",
    borderStyle: "border-rose-100",
    heroLayout: "minimal",
    illustration: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "temp-herbal-wellness",
    name: "5. Herbal Wellness Brand (Celt Forest)",
    vibe: "Deep green woods, organic raw curves, holistic botanical badges",
    theme: "dark",
    headingFont: "Playfair Display, serif",
    baseFont: "Inter, sans-serif",
    primaryColor: "bg-stone-50 border-stone-50 text-stone-950 hover:bg-stone-200",
    accentColor: "text-emerald-300 bg-[#1D2B1B]",
    bgSolid: "bg-[#0E150D] text-[#ECEFEA]",
    cardStyle: "rounded-xl border border-emerald-900/40 bg-[#131D12]/70 hover:border-emerald-500 duration-300",
    borderStyle: "border-emerald-950",
    heroLayout: "organic",
    illustration: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "temp-jamu-modern",
    name: "6. Jamu Modern (Golden Turmeric)",
    vibe: "Warm ginger glow, amber accents, spiced packaging aesthetics",
    theme: "light",
    headingFont: "Outfit, sans-serif",
    baseFont: "Inter, sans-serif",
    primaryColor: "bg-amber-600 border-amber-600 hover:bg-amber-700 text-white",
    accentColor: "text-amber-800 bg-amber-50",
    bgSolid: "bg-amber-50/50 text-stone-900",
    cardStyle: "rounded-2xl border border-amber-200 shadow-sm hover:border-amber-500 duration-300",
    borderStyle: "border-amber-200",
    heroLayout: "split",
    illustration: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "temp-artisan-craft",
    name: "7. Artisan Craft Store (Terracotta Clay)",
    vibe: "Earthy textured ceramics, raw slate tones, brutalist borders, hand-thrown feel",
    theme: "light",
    headingFont: "Space Grotesk, sans-serif",
    baseFont: "JetBrains Mono, monospace",
    primaryColor: "bg-[#C35232] border-[#C35232] text-white hover:bg-[#A93E20]",
    accentColor: "text-[#C35232] bg-[#F7ECE8]",
    bgSolid: "bg-[#FAF5F2] text-[#3d211a]",
    cardStyle: "rounded-none border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 duration-200",
    borderStyle: "border-stone-800",
    heroLayout: "bento",
    illustration: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "temp-heritage-textile",
    name: "8. Heritage Textile (Indigo Loom)",
    vibe: "Deep indigo navy, high contrast ikat weaves, gold stitch motifs",
    theme: "dark",
    headingFont: "Cinzel, serif",
    baseFont: "Inter, sans-serif",
    primaryColor: "bg-amber-500 border-amber-500 hover:bg-amber-600 text-indigo-950",
    accentColor: "text-amber-400 bg-indigo-950/60",
    bgSolid: "bg-[#090C15] text-[#E0E4F0]",
    cardStyle: "rounded-none border border-indigo-900/60 hover:border-amber-400 duration-500",
    borderStyle: "border-indigo-950",
    heroLayout: "indigenous",
    illustration: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "temp-corporate-gift",
    name: "9. Corporate Gift & Hampers (Midnight Gold)",
    vibe: "Prestige navy cardstock, gold leaf lines, elegant geometric grids",
    theme: "dark",
    headingFont: "Playfair Display, serif",
    baseFont: "Inter, sans-serif",
    primaryColor: "bg-amber-400 border-amber-400 text-stone-950 hover:bg-amber-300",
    accentColor: "text-amber-300 bg-stone-900",
    bgSolid: "bg-[#111625] text-stone-100",
    cardStyle: "rounded-xl border border-stone-800 hover:border-amber-400 duration-300 bg-slate-900/80",
    borderStyle: "border-slate-800",
    heroLayout: "corporate",
    illustration: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "temp-sustainable-local",
    name: "10. Sustainable Local Brand (Eco Craft)",
    vibe: "Recycled brown paper fibers, green chlorophyll badges, transparency meters",
    theme: "light",
    headingFont: "Outfit, sans-serif",
    baseFont: "Inter, sans-serif",
    primaryColor: "bg-emerald-850 hover:bg-emerald-900 border-emerald-850 text-white",
    accentColor: "text-[#3B7A57] bg-[#E8F0EC]",
    bgSolid: "bg-[#EFECE6] text-[#222E28]",
    cardStyle: "rounded-xl border-2 border-dashed border-[#A8B4AE] hover:border-emerald-700 duration-300",
    borderStyle: "border-[#D6D0C4]",
    heroLayout: "retro",
    illustration: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop"
  }
];
