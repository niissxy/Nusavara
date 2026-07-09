/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import {
  X,
  CreditCard,
  QrCode,
  Truck,
  Ticket,
  Percent,
  CheckCircle,
  FileText,
  Coins,
  MapPin,
  RefreshCw,
  ShoppingBag
} from "lucide-react";
import { Product, Order, OrderItem } from "../types";
import { DesignTemplate, initialVouchers } from "../data/seedData";

interface CartCheckoutProps {
  cart: { product: Product; quantity: number; size?: string; color?: string }[];
  onUpdateQty: (productId: string, quantity: number, size?: string, color?: string) => void;
  onRemoveItem: (productId: string, size?: string, color?: string) => void;
  onClose: () => void;
  currentTemplate: DesignTemplate;
  onPlaceOrder: (order: Order) => void;
  loyaltyPoints: number;
  themeMode?: "light" | "dark";
}

export default function CartCheckout({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClose,
  currentTemplate,
  onPlaceOrder,
  loyaltyPoints = 0,
  themeMode
}: CartCheckoutProps) {
  // -- Checkout forms states --
  const [activeStep, setActiveStep] = useState<"cart" | "address" | "payment" | "invoice">("cart");
  const [couponCode, setCouponCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; type: string; value: number } | null>(null);
  const [redeemPoints, setRedeemPoints] = useState(false);

  // Address
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [city, setCity] = useState("Jakarta");
  const [addressDetail, setAddressDetail] = useState("");
  const [postal, setPostal] = useState("");

  // Shippping & Payment choice
  const [selectedCourier, setSelectedCourier] = useState<"JNE" | "SiCepat" | "AnterAja">("JNE");
  const [selectedGateway, setSelectedGateway] = useState<"QRIS" | "Virtual Account" | "E-Wallet" | "Manual Transfer">("QRIS");

  // Status for simulated checkout invoice
  const [generatedOrder, setGeneratedOrder] = useState<Order | null>(null);

  // Sum calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, curr) => {
      const price = curr.product.discount_price || curr.product.price || 0;
      const quantity = curr.quantity || 0;
      return acc + price * quantity;
    }, 0);
  }, [cart]);

  // Shipping cost simulated by city
  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    const rates: { [key: string]: number } = {
      Jakarta: 12000,
      Bandung: 18000,
      Surabaya: 24000,
      Bali: 32000,
      Yogyakarta: 19000
    };
    return rates[city] || 25000;
  }, [city, cart]);

  // Discounts
  const couponDiscount = useMemo(() => {
    if (!appliedVoucher) return 0;
    const value = appliedVoucher.value || 0;
    if (appliedVoucher.type === "percentage") {
      return Math.round((subtotal * value) / 100);
    }
    if (appliedVoucher.type === "shipping_discount") {
      return Math.min(shippingCost, value);
    }
    if (appliedVoucher.type === "fixed") {
      return value;
    }
    return 0;
  }, [appliedVoucher, subtotal, shippingCost]);

  const pointsDiscount = useMemo(() => {
    if (!redeemPoints) return 0;
    const points = loyaltyPoints || 0;
    const maxDiscount = subtotal - couponDiscount;
    const discount = Math.min(points * 500, maxDiscount);
    return Number.isNaN(discount) ? 0 : Math.max(0, discount);
  }, [redeemPoints, loyaltyPoints, subtotal, couponDiscount]);

  const grandTotal = useMemo(() => {
    const total = subtotal + shippingCost - couponDiscount - pointsDiscount;
    const safeTotal = Number.isNaN(total) ? 0 : total;
    return Math.max(0, safeTotal);
  }, [subtotal, shippingCost, couponDiscount, pointsDiscount]);

  // Handle coupon redemption
  const handleApplyCoupon = () => {
    const found = initialVouchers.find((v) => v.code.toUpperCase() === couponCode.trim().toUpperCase() && v.status === "Active");
    if (found) {
      if (subtotal < found.minimum_purchase) {
        alert(`Kupon memerlukan pembelian minimum Rp ${found.minimum_purchase.toLocaleString()}`);
        return;
      }
      setAppliedVoucher({
        code: found.code,
        type: found.type,
        value: found.value
      });
      alert(`Kupon ${found.code} berhasil dipasang!`);
    } else {
      alert("Kode kupon tidak valid atau sudah kedaluwarsa.");
    }
  };

  // Submit and create order invoice
  const handleSubmission = () => {
    if (!custName || !custEmail || !custPhone || !addressDetail) {
      alert("Harap lengkapi semua isian formulir alamat pengiriman.");
      return;
    }

    const orderNumber = `NSV-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const items: OrderItem[] = cart.map((c) => {
      const variantParts = [];
      if (c.size) variantParts.push(`Size: ${c.size}`);
      if (c.color) variantParts.push(`Color: ${c.color}`);
      return {
        product: c.product.name,
        quantity: c.quantity,
        price: c.product.discount_price || c.product.price,
        variant: variantParts.join(", ") || undefined
      };
    });

    const newOrder: Order = {
      order_number: orderNumber,
      customer: custName,
      items,
      subtotal,
      shipping_cost: shippingCost,
      discount: couponDiscount + pointsDiscount,
      total: grandTotal,
      payment_method: selectedGateway,
      payment_status: "Pending",
      order_status: "Pending Payment",
      courier: selectedCourier,
      tracking_number: null,
      date: new Date().toISOString()
    };

    setGeneratedOrder(newOrder);
    onPlaceOrder(newOrder);
    setActiveStep("invoice");
  };

  // Switcher simulation for completed payments
  const handleSimulatePaymentComplete = () => {
    if (!generatedOrder) return;
    const paidOrder = {
      ...generatedOrder,
      payment_status: "Paid" as const,
      order_status: "Paid" as const,
      tracking_number: `NSV-TRK-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setGeneratedOrder(paidOrder);
    alert("Simulasi Pembayaran Berhasil! Pesanan diproses ke gudang pengemasan.");
  };

  return (
    <div className={`fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex justify-end ${themeMode === "dark" ? "dark" : ""}`}>
      <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 w-full max-w-xl h-full flex flex-col justify-between shadow-2xl relative border-l border-stone-200 dark:border-stone-800">
        
        {/* Header container */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-800 dark:text-amber-400" />
            <h3 className="text-sm sm:text-base font-black tracking-tight text-stone-900 dark:text-white" style={{ fontFamily: currentTemplate.headingFont }}>
              Nusavara Premium Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-full cursor-pointer text-stone-800 dark:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Breadcrumbs navigation */}
        <div className="bg-stone-100 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-4 py-2.5 flex items-center justify-between gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none text-[10px] sm:text-[11px] font-mono font-bold text-stone-500 dark:text-stone-400">
          <span className={`${activeStep === "cart" ? "text-amber-800 dark:text-amber-400 font-extrabold" : ""} shrink-0`}>1. Keranjang</span>
          <span className="text-stone-300 dark:text-stone-700 shrink-0">&rarr;</span>
          <span className={`${activeStep === "address" ? "text-amber-800 dark:text-amber-400 font-extrabold" : ""} shrink-0`}>2. Alamat</span>
          <span className="text-stone-300 dark:text-stone-700 shrink-0">&rarr;</span>
          <span className={`${activeStep === "payment" ? "text-amber-800 dark:text-amber-400 font-extrabold" : ""} shrink-0`}>3. Pembayaran</span>
          <span className="text-stone-300 dark:text-stone-700 shrink-0">&rarr;</span>
          <span className={`${activeStep === "invoice" ? "text-indigo-600 dark:text-indigo-400 font-extrabold" : ""} shrink-0`}>4. Invoice</span>
        </div>

        {/* Dynamic step rendering contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-left">
          {activeStep === "cart" && (
            <div className="space-y-4">
              <span className="block text-[11px] font-mono tracking-widest text-stone-400 dark:text-stone-500 font-bold uppercase mb-2">Item Di Keranjang Anda</span>
              {cart.length === 0 ? (
                <div className="text-center py-12 text-stone-400 dark:text-stone-500">
                  <p className="text-sm font-semibold mb-2 text-stone-800 dark:text-stone-200">Keranjang Anda Kosong</p>
                  <p className="text-xs">Silakan pilih produk premium dari katalog utama kami.</p>
                </div>
              ) : (
                <div className="space-y-3 divide-y divide-stone-100 dark:divide-stone-800">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size || ""}-${item.color || ""}`} className="flex gap-4 pt-3 items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-white leading-tight">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 block">{item.product.subcategory} | {item.product.category}</span>
                        {(item.size || item.color) && (
                          <div className="flex flex-wrap gap-2 mt-1 text-[10px] font-mono uppercase tracking-wider font-bold text-amber-800 dark:text-amber-400">
                            {item.size && <span>Ukuran: {item.size}</span>}
                            {item.color && <span>Warna: {item.color}</span>}
                          </div>
                        )}
                        <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-200 mt-1 block">
                          Rp {(item.product.discount_price || item.product.price).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1), item.size, item.color)}
                          className="w-6 h-6 border dark:border-stone-700 rounded-full font-bold flex items-center justify-center bg-stone-50 dark:bg-stone-800 text-stone-850 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer text-xs transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-black text-stone-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.quantity + 1, item.size, item.color)}
                          className="w-6 h-6 border dark:border-stone-700 rounded-full font-bold flex items-center justify-center bg-stone-50 dark:bg-stone-800 text-stone-850 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer text-xs transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size, item.color)}
                          className="text-[10px] text-rose-600 hover:underline pl-2 font-bold cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dynamic Coupons Generator */}
              {cart.length > 0 && (
                <div className="p-4 bg-stone-50 dark:bg-stone-950 border rounded-xl border-stone-200 dark:border-stone-800 space-y-3">
                  <span className="block text-[10px] font-mono text-stone-500 dark:text-stone-400 font-bold uppercase flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" /> VOUCHER LOKAL PRIDE AKTIF
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: WELCOME10, FREESHIP50"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 border dark:border-stone-700 p-1.5 text-xs outline-none uppercase rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:border-stone-900 dark:focus:border-stone-100"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-850 dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-950 text-white text-[11px] font-bold rounded uppercase transition-colors cursor-pointer"
                    >
                      Pasang
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500">
                    *Gunakan <strong>WELCOME10</strong> (Diskon 10%) atau <strong>LOCALPRIDE25</strong> (Diskon Rp 25.000)
                  </p>
                </div>
              )}
            </div>
          )}

          {activeStep === "address" && (
            <div className="space-y-4">
              <span className="block text-[11px] font-mono tracking-widest text-stone-400 dark:text-stone-500 font-bold uppercase mb-2">Formulir Alamat Pengiriman</span>
              
              <div className="grid grid-cols-1 gap-4 text-xs font-medium text-stone-700 dark:text-stone-300">
                <div>
                  <label className="block mb-1.5 font-bold uppercase text-[10px] text-stone-900 dark:text-stone-100">Nama Lengkap Penerima</label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full border dark:border-stone-700 p-2.5 rounded text-xs outline-none bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:border-stone-900 dark:focus:border-stone-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 font-bold uppercase text-[10px] text-stone-900 dark:text-stone-100">Email</label>
                    <input
                      type="email"
                      required
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full border dark:border-stone-700 p-2.5 rounded text-xs outline-none bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:border-stone-900 dark:focus:border-stone-100"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 font-bold uppercase text-[10px] text-stone-900 dark:text-stone-100">No. WhatsApp Aktif</label>
                    <input
                      type="text"
                      required
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      placeholder="+62812345xx"
                      className="w-full border dark:border-stone-700 p-2.5 rounded text-xs outline-none bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:border-stone-900 dark:focus:border-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 font-bold uppercase text-[10px] text-stone-900 dark:text-stone-100">Kota Tujuan (Integrasi Ongkir Biteship)</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border dark:border-stone-700 p-2.5 rounded text-xs outline-none focus:border-stone-900 dark:focus:border-stone-100 bg-white dark:bg-stone-900 text-stone-900 dark:text-white cursor-pointer"
                  >
                    <option value="Jakarta">Jakarta (Kota Utama)</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                    <option value="Surabaya">Surabaya</option>
                    <option value="Bali">Bali (Denpasar)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 font-bold text-stone-900 dark:text-stone-100 uppercase text-[10px]">Alamat Detail Lengkap</label>
                  <textarea
                    rows={3}
                    required
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    placeholder="Nama Jalan, Blok, RT/RW, No. Rumah"
                    className="w-full border dark:border-stone-700 p-2.5 rounded text-xs outline-none bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:border-stone-900 dark:focus:border-stone-100"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-bold uppercase text-[10px] text-stone-900 dark:text-stone-100">Kode Pos</label>
                  <input
                    type="text"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    placeholder="12345"
                    className="w-full border dark:border-stone-700 p-2.5 rounded text-xs outline-none bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:border-stone-900 dark:focus:border-stone-100"
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === "payment" && (
            <div className="space-y-4">
              {/* Shipping integration */}
              <div className="p-3 bg-stone-50 dark:bg-stone-950 border rounded-xl border-stone-200 dark:border-stone-800">
                <span className="block text-[10px] font-mono text-stone-500 dark:text-stone-400 font-bold uppercase mb-2 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> EKSPEDISI TERINTEGRASI LOKAL (Biteship API)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["JNE", "SiCepat", "AnterAja"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCourier(c as any)}
                      className={`p-2 border rounded-lg text-center transition-all cursor-pointer ${
                        selectedCourier === c
                          ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-mono font-bold"
                          : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 font-mono"
                      }`}
                    >
                      <span className="block text-xs font-bold">{c === "JNE" ? "JNE Express" : c === "SiCepat" ? "SiCepat" : "AnterAja"}</span>
                      <span className="text-[9px] opacity-75 font-mono">Rp {shippingCost.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Secure Payment gateways */}
              <div className="space-y-3">
                <span className="block text-[10px] font-mono text-stone-500 dark:text-stone-400 font-bold uppercase flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" /> GERBANG PEMBAYARAN MIDTRANS SECURE
                </span>

                <div className="space-y-2">
                  {[
                    { key: "QRIS", name: "QRIS (Gopay, OVO, ShopeePay)", desc: "Metode instan tervalidasi otomatis" },
                    { key: "Virtual Account", name: "Bank Virtual Account (BCA, Mandiri, BNI)", desc: "Konfirmasi transfer secepatnya" },
                    { key: "Credit Card", name: "Visa / MasterCard Secure Integration", desc: "Enkripsi end-to-end WAF" },
                    { key: "Manual Transfer", name: "Transfer Bank Nusavara (Konfirmasi Manual)", desc: "Upload bukti tanda transaksi" }
                  ].map((gw) => (
                    <button
                      key={gw.key}
                      onClick={() => setSelectedGateway(gw.key as any)}
                      className={`w-full text-left p-3 border rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                        selectedGateway === gw.key 
                          ? "border-amber-600 bg-amber-50/40 dark:bg-amber-950/20" 
                          : "border-stone-200 dark:border-stone-800 bg-transparent"
                      }`}
                    >
                      {gw.key === "QRIS" ? (
                        <QrCode className="w-5 h-5 text-amber-800 dark:text-amber-400" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-amber-800 dark:text-amber-400" />
                      )}
                      <div>
                        <span className="block text-xs font-bold text-stone-900 dark:text-stone-100">{gw.name}</span>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400">{gw.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Point Redemptions */}
              {loyaltyPoints > 0 && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border rounded-xl border-amber-200 dark:border-amber-900/40 flex items-center justify-between gap-3 text-amber-950 dark:text-amber-200 font-sans text-xs">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-800 dark:text-amber-400 animate-bounce" />
                    <div>
                      <span className="block font-bold">Tukarkan {loyaltyPoints} Poin Anda?</span>
                      <span className="text-[10px]">Hemat Rp {(loyaltyPoints * 500).toLocaleString()} untuk transaksi ini</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={redeemPoints}
                    onChange={(e) => setRedeemPoints(e.target.checked)}
                    className="w-4 h-4 text-amber-600 dark:text-amber-400 rounded cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}

          {activeStep === "invoice" && generatedOrder && (
            <div className="space-y-4">
              {/* Success validation sticker */}
              <div className="text-center space-y-2 py-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl">
                <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <span className="block text-sm font-bold text-emerald-950 dark:text-emerald-200 font-mono">PESANAN BERHASIL DICATAT</span>
                <span className="inline-block text-[10px] font-mono bg-white dark:bg-stone-900 border border-emerald-250 dark:border-emerald-800 px-2 py-0.5 rounded font-black text-stone-900 dark:text-white">
                  NO: {generatedOrder.order_number}
                </span>
                <p className="text-[11px] text-stone-600 dark:text-stone-400">Simpan info untuk lacak kiriman di halaman utama</p>
              </div>

              {/* Detailed Invoice Sheet representation */}
              <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-4 bg-white dark:bg-stone-950 space-y-3 font-sans text-xs text-stone-700 dark:text-stone-300">
                <div className="flex justify-between font-mono font-bold text-stone-900 dark:text-stone-100 border-b dark:border-stone-800 pb-2">
                  <span>TAGIHAN INVOICE</span>
                  <span className="text-amber-800 dark:text-amber-400">{generatedOrder.payment_status === "Paid" ? "TERBAYAR" : "BELUM LUNAS"}</span>
                </div>

                <div className="space-y-1">
                  <p><strong>Penerima:</strong> {generatedOrder.customer}</p>
                  <p><strong>Pengiriman:</strong> {generatedOrder.courier} (Kota {city})</p>
                  <p><strong>Gateway:</strong> {generatedOrder.payment_method}</p>
                  <p><strong>Waktu Masuk:</strong> {new Date(generatedOrder.date).toLocaleString()}</p>
                </div>

                <div className="border-t dark:border-stone-800 pt-2 space-y-2">
                  <span className="block text-[9px] font-mono text-stone-400 dark:text-stone-500 font-bold uppercase">DAFTAR BARANG:</span>
                  {generatedOrder.items.map((it, i) => (
                    <div key={i} className="border-b border-stone-50 dark:border-stone-900 pb-2 last:border-0 last:pb-0 last:mb-0">
                      <div className="flex justify-between text-stone-900 dark:text-white font-bold">
                        <span>{it.product} (x{it.quantity})</span>
                        <span className="font-mono text-stone-950 dark:text-white">Rp {(it.price * it.quantity).toLocaleString()}</span>
                      </div>
                      {it.variant && (
                        <p className="text-[10px] text-amber-800 dark:text-amber-400 font-mono font-bold uppercase mt-0.5">
                          Detail: {it.variant}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Sub totals grids */}
                <div className="border-t dark:border-stone-800 pt-2 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rp {generatedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-500 dark:text-stone-400 font-mono">
                    <span>Asuransi & Ongkir:</span>
                    <span>Rp {generatedOrder.shipping_cost.toLocaleString()}</span>
                  </div>
                  {generatedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Total Diskon/Poin:</span>
                      <span>- Rp {generatedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-stone-950 dark:text-white border-t border-stone-100 dark:border-stone-800 pt-1.5">
                    <span>GRAND TOTAL:</span>
                    <span>Rp {generatedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment details actions simulation */}
              {generatedOrder.payment_status === "Pending" ? (
                <div className="p-4 bg-stone-50 dark:bg-stone-950 border rounded-xl border-stone-200 dark:border-stone-800 space-y-3 text-center">
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wide">PILIHAN SIMULASI INTERAKTIF</p>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 font-medium">Klik tombol di bawah ini untuk melunasi status pembayaran secara kilat (Simulasi Midtrans Sandbox)</p>
                  <button
                    onClick={handleSimulatePaymentComplete}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold rounded uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-white animate-spin-slow" /> Lakukan Simulasi Bayar Lunas
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center gap-3 text-emerald-950 dark:text-emerald-200 text-xs">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p>Lacak paket Anda kelak dengan No. Resi: <strong className="font-mono">{generatedOrder.tracking_number}</strong> di menu 'Lacak Kiriman'!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions columns based on state */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 space-y-3">
          {/* Subtotals detail display */}
          {activeStep !== "invoice" && (
            <div className="space-y-1.5 font-sans">
              <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Subtotal Barang:</span>
                <span className="font-mono">Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Beban Biteship Shippping:</span>
                <span className="font-mono">Rp {shippingCost.toLocaleString()}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Kupon ({appliedVoucher?.code}):</span>
                  <span className="font-mono">- Rp {couponDiscount.toLocaleString()}</span>
                </div>
              )}
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Poin Loyalitas:</span>
                  <span className="font-mono">- Rp {pointsDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm sm:text-base font-black text-stone-900 dark:text-white border-t border-stone-100 dark:border-stone-800 pt-1.5 font-mono">
                <span>Total Estimasi:</span>
                <span>Rp {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Large dynamic multi-step controller buttons */}
          {activeStep === "cart" && (
            <button
              onClick={() => {
                if (cart.length === 0) {
                  alert("Keranjang masih kosong!");
                  return;
                }
                setActiveStep("address");
              }}
              className={`w-full py-3.5 text-xs font-bold tracking-wider uppercase text-center cursor-pointer transition-all ${
                currentTemplate.primaryColor
              }`}
            >
              Lanjutkan Ke Alamat &rarr;
            </button>
          )}

          {activeStep === "address" && (
            <div className="flex gap-2">
              <button
                onClick={() => setActiveStep("cart")}
                className="flex-1 py-3 text-xs font-bold tracking-wider uppercase text-center border rounded-lg bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-850 dark:text-stone-200 border-stone-300 dark:border-stone-700 cursor-pointer transition-all"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  if (!custName || !custEmail || !custPhone || !addressDetail) {
                    alert("Mohon lengkapi semua data alamat pengiriman!");
                    return;
                  }
                  setActiveStep("payment");
                }}
                className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase text-center cursor-pointer transition-all ${
                  currentTemplate.primaryColor
                }`}
              >
                Atur Pembayaran
              </button>
            </div>
          )}

          {activeStep === "payment" && (
            <div className="flex gap-2">
              <button
                onClick={() => setActiveStep("address")}
                className="flex-1 py-3 text-xs font-bold tracking-wider uppercase text-center border rounded-lg bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-850 dark:text-stone-200 border-stone-300 dark:border-stone-700 cursor-pointer transition-all"
              >
                Kembali
              </button>
              <button
                onClick={handleSubmission}
                className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase text-center cursor-pointer transition-all ${
                  currentTemplate.primaryColor
                }`}
              >
                Buat Invoice Tagihan
              </button>
            </div>
          )}

          {activeStep === "invoice" && (
            <button
              onClick={() => {
                setCouponCode("");
                setAppliedVoucher(null);
                setRedeemPoints(false);
                setGeneratedOrder(null);
                setActiveStep("cart");
                onClose();
              }}
              className="w-full py-3.5 bg-stone-900 border border-stone-900 hover:bg-stone-850 dark:bg-stone-100 dark:border-stone-100 dark:text-stone-950 text-white text-xs font-bold tracking-wider uppercase rounded-lg text-center cursor-pointer transition-all"
            >
              Belanja Kembali & Tutup
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
