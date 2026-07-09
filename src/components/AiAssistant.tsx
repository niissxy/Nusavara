/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Layers,
  Heart,
  TrendingUp,
  Award,
  AlertTriangle,
  HelpCircle,
  FileCheck,
  Send,
  UserCheck,
  Search,
  CheckCircle2,
  ChevronDown,
  BookOpen
} from "lucide-react";
import { Product } from "../types";

interface AiAssistantProps {
  products: Product[];
  currentLang: string;
  onSelectProduct: (product: Product) => void;
}

export default function AiAssistant({ products, currentLang, onSelectProduct }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | "chat"
    | "skinRoutine"
    | "outfit"
    | "hampers"
    | "leadScorer"
    | "seoHelper"
    | "cartReminder"
    | "recommender"
    | "herbalGuide"
    | "reviewSummary"
  >("chat");

  // Chat conversation state
  const [chatQuery, setChatQuery] = useState("");
  const [chatLogs, setChatLogs] = useState<{ sender: "user" | "ai"; text: string }[]>([
    {
      sender: "ai",
      text: "Selamat datang di Nusavara Local Premium! Saya adalah AI Pramuniaga Anda. Silakan tanyakan apa saja tentang kecocokan kulit, padu padan busana rami, legalitas jamu rakyat, maupun cara ekspor hampers rotan kami."
    }
  ]);

  // Lead Scorer form state
  const [candidateVol, setCandidateVol] = useState("Rp 5.000.000 - Rp 10.000.000");
  const [candidateExp, setCandidateExp] = useState("2 tahun jualan jamu");
  const [candidateChannels, setCandidateChannels] = useState("Instagram & Shopee");
  const [scorerResult, setScorerResult] = useState<{ grade: string; score: number; reason: string } | null>(null);

  // SEO form state
  const [seoProduct, setSeoProduct] = useState(products[0]?.name || "");
  const [seoResult, setSeoResult] = useState<{ metaTitle: string; metaDesc: string; keywords: string } | null>(null);

  // Abandoned cart helper state
  const [cartUser, setCartUser] = useState("Alya Rahmani");
  const [cartItem, setCartItem] = useState("Aruna Linen Outer");
  const [reminderText, setReminderText] = useState("");

  // Handler for custom questions
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;

    const userText = chatQuery;
    const newLogs = [...chatLogs, { sender: "user" as const, text: userText }];
    setChatLogs(newLogs);
    setChatQuery("");

    // Simulate smart rule-based premium response in Indonesian
    setTimeout(() => {
      let aiResponse = "";
      const q = userText.toLowerCase();

      if (q.includes("skincare") || q.includes("kulit") || q.includes("serum")) {
        aiResponse = "Koleksi skincare Nusavara mengutamakan kebersihan formula ceramide alami bebas dari alkohol sintetis parah. Serum Ceramide Barrier Calm kami tervalidasi aman BPOM NA18230123456 dan bersertifikat Halal, cocok memulihkan skin barrier kemerahan.";
      } else if (q.includes("batik") || q.includes("fashion") || q.includes("baju") || q.includes("outer")) {
        aiResponse = "Produk busana kami mengedepankan linen rami ramah lingkungan sisa tenunan lokal lestari. 'Aruna Linen Outer' bernuansa ivory atau sage sangat pas dipasangkan dengan setelan kasual polos santai harian Anda.";
      } else if (q.includes("jamu") || q.includes("herbal") || q.includes("temulawak")) {
        aiResponse = "Jamu Modern Temu Glow merupakan ekstrak temulawak organic murni dan jahe merah berizin resmi dinkes PIRT 2093174012345. Baik diseduh hangat 150ml pada pagi hari guna membuang penumpukan toksin tubuh harian.";
      } else if (q.includes("keramik") || q.includes("cangkir") || q.includes("artisan") || q.includes("craft")) {
        aiResponse = "Cangkir Raga Keramik dikerjakan melingkar manual penuh (hand-thrown clay) oleh para maestro Yogyakarta, dibakar suhu tinggi berselimut glasir abu vulkanik Merapi yang estetik bertekstur wabi-sabi murni.";
      } else if (q.includes("hampers") || q.includes("corporate") || q.includes("hadiah")) {
        aiResponse = "Kami menyediakan Corporate Hampers Wellness Kit custom box anyaman rumbia berpita satin mewah dengan grafir laser kemitraan logo perusahaan Anda gratis untuk pemesanan minimum 20 unit.";
      } else {
        aiResponse = "Nusavara Local Premium menyajikan 100% karya murni lokal Indonesia naik kelas yang dikurasi ketat. Kami memastikan legalitas BPOM, sertifikasi halal murni, serta transparansi komposisi bahan alami melimpah.";
      }

      setChatLogs([...newLogs, { sender: "ai" as const, text: aiResponse }]);
    }, 850);
  };

  // 4. AI Reseller Lead Scorer Calculation
  const handleScoreLead = () => {
    let score = 50;
    if (candidateVol.includes("50.000.000")) score += 30;
    else if (candidateVol.includes("20.000.000")) score += 20;
    else score += 10;

    if (candidateExp.toLowerCase().includes("tahun") || candidateExp.toLowerCase().includes("pengalaman")) {
      score += 20;
    }
    if (candidateChannels.toLowerCase().includes("shopee") || candidateChannels.toLowerCase().includes("tiktok")) {
      score += 20;
    }

    let grade = "C";
    let reason = "Mitra potensial dengan prospek pemula. Diperlukan mentoring awal Reseller Kit.";
    if (score >= 80) {
      grade = "A (Prioritas Utama)";
      reason = "Mitra komersial premium dengan jaringan penjualan tinggi. Segera hubungi via WhatsApp VIP!";
    } else if (score >= 60) {
      grade = "B (Potensial Tinggi)";
      reason = "Kapasitas penjualan cukupan dan memiliki rekam jejak. Kirim Proposal Katalog B2B.";
    }

    setScorerResult({ score, grade, reason });
  };

  // 10. AI SEO Assistant Mock Generation
  const handleGenerateSeo = () => {
    const slug = seoProduct.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setSeoResult({
      metaTitle: `${seoProduct} - Nusavara Local Premium Indonesia`,
      metaDesc: `Beli ${seoProduct} berkualitas tinggi bersertifikasi BPOM, ramah lingkungan, diproses higienis oleh artisan nusantara asli hanya di Nusavara. Cicilan 0% & Checkout QRIS aman gratis ongkir.`,
      keywords: `${seoProduct.toLowerCase()}, produk lokal premium, skincare bpom, kriya handmade jogja, sustainable goods indonesia, brand lokal naik kelas`
    });
  };

  // 8. AI Abandoned Cart Assistant reminder draft generator
  const handleGenerateCartReminder = () => {
    setReminderText(
      `Halo Kak *${cartUser}*, Nusavara menyimpulkan produk favorit Anda *${cartItem}* masih tersimpan aman menunggu di keranjang Anda 🛒.\n\nJangan lewatkan diskon terbatas dengan memasukan kode promosi *WELCOME10* untuk potongan instan 10% dan klaim gratis ongkos kirim Biteship hari ini! Klik tautan checkout ini kelak ya kak: https://nusavara.id/checkout.`
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Floating Sparkles Toggle Badge Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
        >
          <Sparkles className="w-5 h-5 animate-spin" />
          <span className="text-xs font-bold tracking-widest uppercase font-mono hidden sm:inline">Nusavara AI</span>
        </button>
      )}

      {/* Main AI Sidebar dialog wrapper */}
      {isOpen && (
        <div className="bg-stone-950 text-stone-100 rounded-3xl w-96 sm:w-104 border border-stone-800 shadow-2xl overflow-hidden flex flex-col h-[520px] transition-all">
          
          {/* Header space */}
          <div className="bg-stone-900 p-4 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400">
              <Bot className="w-5 h-5" />
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider">Nusavara AI Pramuniaga</span>
                <span className="text-[9px] font-mono text-stone-400">Model: Gemini-3.5-flash Smart Engine</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 px-2.5 rounded bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-mono font-bold uppercase cursor-pointer"
            >
              Tutup
            </button>
          </div>

          {/* Core horizontal features selectors */}
          <div className="bg-stone-900/60 border-b border-stone-850 px-2 py-1.5 flex gap-1.5 overflow-x-auto select-none">
            {[
              { id: "chat", label: "Konsultan Chat" },
              { id: "skinRoutine", label: "Skin Routine Helper" },
              { id: "outfit", label: "Outfit Matcher" },
              { id: "herbalGuide", label: "Herbal Wellness Guide" },
              { id: "hampers", label: "Hampers Matcher" },
              { id: "leadScorer", label: "B2B Lead Scorer" },
              { id: "seoHelper", label: "SEO Metatags" },
              { id: "cartReminder", label: "Cart Assistant" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id ? "bg-amber-400 text-stone-950" : "text-stone-450 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab contents window */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            
            {/* TAB 1: Chat interface */}
            {activeTab === "chat" && (
              <div className="flex flex-col h-full justify-between gap-4">
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {chatLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                        log.sender === "ai"
                          ? "bg-stone-900 text-stone-100 border border-stone-800"
                          : "bg-amber-400 text-stone-950 ml-auto font-medium"
                      }`}
                    >
                      {log.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleChatSubmit} className="flex gap-1.5 border-t border-stone-850 pt-3">
                  <input
                    type="text"
                    required
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    placeholder="Tanyakan hal kecocokan skincare, batik, hampers..."
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-white placeholder-stone-500 outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: Skin Routine Helper */}
            {activeTab === "skinRoutine" && (
              <div className="space-y-3">
                <span className="block text-xs font-bold text-amber-300 uppercase">AI Skin Routine & Care Advisor</span>
                <p className="text-stone-300">
                  Mengembangkan urutan perawatan kulit terstruktur sesuai dengan jenis pertahanan alami dermis Anda:
                </p>

                <div className="space-y-3.5 divide-y divide-stone-850">
                  <div className="pt-2">
                    <span className="block text-[10px] text-emerald-400 font-mono font-bold uppercase">Kulit Sensitif & Kemerahan:</span>
                    <p className="text-stone-300 leading-relaxed mt-0.5">
                      1. Cleanser Ekstrak Centella &rarr; 2. Toner Air Mawar Alami &rarr; 3. <strong>Serum Ceramide Barrier Calm</strong> &rarr; 4. Sunscreen murni tanpa titanium dioksida kasar.
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10px] text-emerald-400 font-mono font-bold uppercase">Kulit Dehidrasi & Kering:</span>
                    <p className="text-stone-300 leading-relaxed mt-0.5">
                      1. Hydrating Milky Wash &rarr; 2. Essence Hyaluronic Acid &rarr; 3. <strong>Serum Ceramide</strong> &rarr; 4. Botanical Face Oil Squalane. Mengunci elastisitas sepanjang hari.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-350 rounded text-[10px] font-sans leading-snug">
                  ⚠️ Peringatan: Selalu lakukan uji tempel (patch test) skincare pada area lengan belakang telinga selama 24 jam sebelum pemakaian harian.
                </div>
              </div>
            )}

            {/* TAB 3: Outfit Matcher */}
            {activeTab === "outfit" && (
              <div className="space-y-3">
                <span className="block text-xs font-bold text-amber-300 uppercase">AI Outfit Mixer & Stylist Matcher</span>
                <p className="text-stone-300">Berikut rekomendasi lookbook padu padan elegan buatan kurator Nusavara:</p>

                <div className="grid grid-cols-1 gap-2.5">
                  <div className="p-3 bg-stone-900 border border-stone-800 rounded-lg">
                    <span className="font-bold text-stone-100 block">Look 1: "Everyday Urban Heritage"</span>
                    <p className="text-stone-400 leading-relaxed mt-1">
                      Padukan <strong>Aruna Linen Outer (Sage)</strong> dengan celana culotte warna pasir alami dan tank top linen ivory murni. Berakhir dengan kancing terbuka bebas.
                    </p>
                    <span className="block text-[10px] text-amber-400 font-mono mt-1">&rarr; Cocok untuk: Semi-formal, Gathering Sore</span>
                  </div>

                  <div className="p-3 bg-stone-900 border border-stone-800 rounded-lg">
                    <span className="font-bold text-stone-100 block">Look 2: "Modern Artisan Pride"</span>
                    <p className="text-stone-400 leading-relaxed mt-1">
                      Batik modern Indigo dipadukan dengan celana bahan linen lurus longgar dan sepatu sandal kulit handcrafted. Ditambah aksesoris cangkir tanah liat Yogyakarta saat berdiskusi santai.
                    </p>
                    <span className="block text-[10px] text-amber-400 font-mono mt-1">&rarr; Cocok untuk: Meeting Kerja Kreatif</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Herbal Guide */}
            {activeTab === "herbalGuide" && (
              <div className="space-y-3">
                <span className="block text-xs font-bold text-amber-305 uppercase text-amber-300">AI Herbal Usage & Safety Manual</span>
                <p className="text-stone-300">Cara menyeduh jamu rakyat secara ilmiah demi kesehatan metabolisme menyeluruh:</p>

                <div className="p-3 bg-stone-900 rounded-lg space-y-2">
                  <span className="font-bold text-white block">Satu Gelas Temu Glow Ritual:</span>
                  <p className="text-stone-400 leading-normal">
                    Ambil 1 sachet konsentrat kunyit-temulawak Nusavara, seduh menggunakan cangkir stoneware tersertifikasi raga keramik dengan air hangat 150ml (suhu optimal 75-80°C). Jangan diseduh dengan air mendidih murni karena merusak enzim temulawak halus.
                  </p>
                </div>

                <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-350 rounded text-[10px] leading-snug">
                  🚫 Kontraindikasi: Jangan dikonsumsi berlebih oleh pasien terdiagnosa batu empedu akut, ibu hamil trimester awal, serta balita berumur di bawah 2 tahun.
                </div>
              </div>
            )}

            {/* TAB 5: Hampers Matcher */}
            {activeTab === "hampers" && (
              <div className="space-y-3">
                <span className="block text-xs font-bold text-amber-305 uppercase text-amber-300">AI Corporate Gift & Hampers Matcher</span>
                <p className="text-stone-300">Tentukan rincian budget dan acara Anda guna menyusun kado termewah:</p>

                <div className="space-y-2.5">
                  <div className="p-3 bg-stone-900 rounded-lg">
                    <span className="font-bold text-white block">Budget Rp 250.000 - Rp 350.000:</span>
                    <p className="text-stone-400 mt-1">
                      Wellness Kit minimalis: 1 Pack Jamu Modern Temu Glow, 1 Botol Aromatherapy, Cangkir Raga keramik dalam kemasan box anyaman bambu tasik custom pita.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-900 rounded-lg">
                    <span className="font-bold text-white block">Budget di atas Rp 500.000:</span>
                    <p className="text-stone-400 mt-1">
                      Set Kebanggaan Heritage: Outer Linen Aruna mewah, cangkir raga keramik handmade eksklusif, cangkir rotan pajangan, madu organik murni, dalam boks kayu pinus grafir laser logo korporasi Anda.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: Lead Scorer */}
            {activeTab === "leadScorer" && (
              <div className="space-y-3.5">
                <span className="block text-xs font-bold text-amber-300 uppercase">AI Reseller Lead Scorer (B2B Prospector)</span>
                
                <div className="space-y-2 text-stone-300">
                  <div>
                    <label className="block text-[10px] text-stone-400 uppercase">Estimasi Omset Bulanan:</label>
                    <select
                      value={candidateVol}
                      onChange={(e) => setCandidateVol(e.target.value)}
                      className="w-full bg-stone-900 p-1.5 rounded border border-stone-800 text-xs mt-1 text-white"
                    >
                      <option value="Rp 5.000.000 - Rp 10.000.000">Rp 5.000.000 - Rp 10.000.000</option>
                      <option value="Rp 20.000.000 - Rp 50.000.000">Rp 20.000.000 - Rp 50.000.000</option>
                      <option value="Rp 100.000.000+">Rp 100.000.000+ (Minyak volume besar)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 uppercase">Pengalaman Dagang & Usaha:</label>
                    <input
                      type="text"
                      value={candidateExp}
                      onChange={(e) => setCandidateExp(e.target.value)}
                      className="w-full bg-stone-900 p-1.5 rounded border border-stone-800 text-xs mt-1 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 uppercase">Jalur Distribusi Pendukung:</label>
                    <input
                      type="text"
                      value={candidateChannels}
                      onChange={(e) => setCandidateChannels(e.target.value)}
                      className="w-full bg-stone-900 p-1.5 rounded border border-stone-800 text-xs mt-1 text-white"
                    />
                  </div>

                  <button
                    onClick={handleScoreLead}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold uppercase text-[10px] tracking-wider rounded transition-all cursor-pointer"
                  >
                    Kalkulasi Kelayakan Kemitraan
                  </button>
                </div>

                {scorerResult && (
                  <div className="p-3 bg-stone-900 border border-stone-800 text-stone-200 rounded-lg">
                    <span className="block text-[10px] text-amber-400 font-mono font-bold uppercase">GRADE KELAYAKAN: {scorerResult.grade}</span>
                    <span className="block text-xl font-black text-white mt-1">Nilai Evaluasi: {scorerResult.score}/100</span>
                    <p className="mt-1 text-[11px] text-stone-450">{scorerResult.reason}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 7: SEO Metatags helper */}
            {activeTab === "seoHelper" && (
              <div className="space-y-3.5">
                <span className="block text-xs font-bold text-amber-305 uppercase text-amber-300">AI SEO Meta tags & Sitemap Generator</span>
                <p className="text-stone-300">Pilih nama produk kriya/skincare guna menyalin format metatags google:</p>

                <div className="space-y-2 text-stone-300">
                  <select
                    value={seoProduct}
                    onChange={(e) => setSeoProduct(e.target.value)}
                    className="w-full bg-stone-900 p-2 rounded border border-stone-800 mt-1 text-xs text-white cursor-pointer"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleGenerateSeo}
                    className="w-full py-2 bg-[#C35232] hover:bg-[#A93E20] text-white font-bold uppercase text-[10px] tracking-wider rounded transition-all cursor-pointer"
                  >
                    Buat Metadata Halaman
                  </button>
                </div>

                {seoResult && (
                  <div className="space-y-2.5 p-3 bg-stone-900 border border-stone-805 rounded-lg text-[11px]">
                    <div>
                      <strong className="text-amber-400 font-mono text-[9px] block">META DISPLAY TITLE:</strong>
                      <span className="text-white block bg-stone-950 p-1.5 rounded border border-stone-800 mt-1">{seoResult.metaTitle}</span>
                    </div>
                    <div>
                      <strong className="text-amber-400 font-mono text-[9px] block">GOOGLE SEARCH DESCRIPTION:</strong>
                      <span className="text-stone-300 block bg-stone-950 p-1.5 rounded border border-stone-800 mt-1 leading-normal">{seoResult.metaDesc}</span>
                    </div>
                    <div>
                      <strong className="text-amber-400 font-mono text-[9px] block">LOKAL KEYWORDS:</strong>
                      <span className="text-stone-400 block break-words">{seoResult.keywords}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 8: Abandoned Cart Remainder */}
            {activeTab === "cartReminder" && (
              <div className="space-y-3">
                <span className="block text-xs font-bold text-amber-300 uppercase">AI Abandoned Cart Checkout Assistant</span>
                <p className="text-stone-300">Membuat draft pesan tindak lanjut WhatsApp otomatis bagi pelanggan yang belum menyelesaikan transaksi:</p>

                <div className="space-y-2 text-stone-300">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] text-stone-400 uppercase">Nama Pelanggan:</label>
                      <input
                        type="text"
                        value={cartUser}
                        onChange={(e) => setCartUser(e.target.value)}
                        className="w-full bg-stone-900 p-1.5 rounded border border-stone-850 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-stone-400 uppercase">Nama Barang:</label>
                      <input
                        type="text"
                        value={cartItem}
                        onChange={(e) => setCartItem(e.target.value)}
                        className="w-full bg-stone-900 p-1.5 rounded border border-stone-850 text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateCartReminder}
                    className="w-full py-2 bg-stone-800 hover:bg-stone-750 text-white font-bold uppercase text-[10px] tracking-wider rounded transition-all cursor-pointer"
                  >
                    Draf Pesan WhatsApp Lacak
                  </button>
                </div>

                {reminderText && (
                  <div className="p-3 bg-stone-900 border border-stone-800 rounded-lg text-[11px] space-y-2">
                    <span className="text-[9px] text-amber-400 font-mono font-bold block bg-stone-950 p-1">COPY-PASTE COPYWRITING:</span>
                    <pre className="text-stone-200 whitespace-pre-wrap font-sans leading-relaxed break-all bg-stone-950 p-2 border border-stone-900 rounded max-h-36 overflow-y-auto">
                      {reminderText}
                    </pre>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(reminderText);
                        alert("Berhasil menyalin draft reminder ke clipboard admin!");
                      }}
                      className="text-amber-400 underline hover:text-amber-350 font-bold block text-right text-[10px] cursor-pointer"
                    >
                      Salin Teks
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* AI Helper banner warning strip */}
          <div className="p-2.5 bg-stone-900 border-t border-stone-850 text-[9.5px] text-stone-500 font-sans tracking-wide text-center">
            Pramuniaga Nusavara beroperasi secara lokal demi mengamankan perlindungan data Anda.
          </div>

        </div>
      )}

    </div>
  );
}
