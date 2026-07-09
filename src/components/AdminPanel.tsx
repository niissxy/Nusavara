/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Package,
  FileCheck,
  ShoppingBag,
  Users,
  CheckCircle2,
  XCircle,
  FileText,
  Plus,
  Trash2,
  Lock,
  Tag,
  MessageSquare,
  HelpCircle,
  BarChart3,
  Sparkles,
  RefreshCcw,
  Layers,
  ArrowRightLeft,
  User,
  Mail,
  Key,
  LogOut,
  Camera,
  Check,
  Edit2,
  Eye,
  EyeOff,
  ShieldAlert
} from "lucide-react";
import {
  Product,
  Order,
  ResellerApplication,
  CorporateInquiry,
  ComplianceDoc,
  Voucher,
  BlogPost,
  FAQ,
  AdminUser
} from "../types";
import { DesignTemplate, initialAdminUsers } from "../data/seedData";

interface AdminPanelProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
  resellers: ResellerApplication[];
  onUpdateResellers: (resellers: ResellerApplication[]) => void;
  inquiries: CorporateInquiry[];
  onUpdateInquiries: (inquiries: CorporateInquiry[]) => void;
  complianceDocs: ComplianceDoc[];
  onUpdateComplianceDocs: (docs: ComplianceDoc[]) => void;
  vouchers: Voucher[];
  onUpdateVouchers: (vouchers: Voucher[]) => void;
  blogs: BlogPost[];
  onUpdateBlogs: (blogs: BlogPost[]) => void;
  faqs: FAQ[];
  onUpdateFaqs: (faqs: FAQ[]) => void;
  currentTemplate: DesignTemplate;
  themeMode?: "light" | "dark";
  onClose: () => void;
}

export default function AdminPanel({
  products,
  onUpdateProducts,
  orders,
  onUpdateOrders,
  resellers,
  onUpdateResellers,
  inquiries,
  onUpdateInquiries,
  complianceDocs,
  onUpdateComplianceDocs,
  vouchers,
  onUpdateVouchers,
  blogs,
  onUpdateBlogs,
  faqs,
  onUpdateFaqs,
  currentTemplate,
  themeMode = "light",
  onClose
}: AdminPanelProps) {
  // -- Admin Authentication List & Current User --
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem("nusavara_admin_users");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialAdminUsers;
      }
    }
    localStorage.setItem("nusavara_admin_users", JSON.stringify(initialAdminUsers));
    return initialAdminUsers;
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem("nusavara_logged_admin");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // -- Custom Local Toast System to bypass iframe alert/confirm blocking --
  const [localToast, setLocalToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);
  const toastTimeoutRef = React.useRef<any>(null);

  const showLocalToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setLocalToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setLocalToast(null);
    }, 4000);
  };

  const handleLogout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem("nusavara_logged_admin");
    setActiveTab("analytics");
    showLocalToast("Sesi administrator berhasil diakhiri.", "success");
  };

  // -- Active tab --
  const [activeTab, setActiveTab] = useState<
    "analytics" | "products" | "orders" | "resellers" | "corporate" | "compliance" | "vouchers" | "content" | "profile"
  >("analytics");

  // Dynamic role mapping from logged admin
  const currentRole = currentAdmin ? currentAdmin.role : "";

  // Filter permission helper
  const isSuperOrRole = (allowedRoles: string[]) => {
    if (!currentAdmin) return false;
    return currentRole === "Super Admin" || allowedRoles.includes(currentRole);
  };

  // Login form inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Profile editing inputs
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

  // Sync profile editing fields when profile tab opens or admin changes
  const initProfileFields = (admin: AdminUser) => {
    setProfileName(admin.name);
    setProfileEmail(admin.email);
    setProfilePassword(admin.password || "adminpassword");
    setProfilePhotoUrl(admin.photoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200");
  };

  // Run once when admin logs in
  React.useEffect(() => {
    if (currentAdmin) {
      initProfileFields(currentAdmin);
    }
  }, [currentAdmin]);

  // -- CRUDS Local creation forms states --
  // 1. Voucher form state
  const [newCode, setNewCode] = useState("");
  const [newVal, setNewVal] = useState(15);
  const [newMin, setNewMin] = useState(150000);
  const [newType, setNewType] = useState<"percentage" | "fixed" | "shipping_discount">("percentage");

  // 2. Compliance Document form state
  const [newDocType, setNewDocType] = useState("BPOM");
  const [newDocProd, setNewDocProd] = useState("");
  const [newDocCert, setNewDocCert] = useState("");
  const [newDocIssuer, setNewDocIssuer] = useState("");

  // 3. New Product form state
  const [newProdName, setNewProdName] = useState("");
  const [newProdCat, setNewProdCat] = useState("Fashion");
  const [newProdPrice, setNewProdPrice] = useState(250000);
  const [newProdBadge, setNewProdBadge] = useState("New Arrival");

  // Analytics helper numbers calculations
  const analyticsTotals = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.payment_status === "Paid")
      .reduce((acc, curr) => {
        const total = curr.total || 0;
        return acc + (Number.isNaN(total) ? 0 : total);
      }, 0);

    const paidOrdersLength = orders.filter((o) => o.payment_status === "Paid").length;
    const totalOrdersCount = orders.length;
    
    let conversionRate = totalOrdersCount > 0 ? (paidOrdersLength / totalOrdersCount) * 100 : 0;
    if (Number.isNaN(conversionRate)) {
      conversionRate = 0;
    }

    let avOrderValue = paidOrdersLength > 0 ? totalRevenue / paidOrdersLength : 0;
    if (Number.isNaN(avOrderValue)) {
      avOrderValue = 0;
    }

    return {
      totalRevenue,
      paidOrdersLength,
      totalOrdersCount,
      conversionRate,
      avOrderValue
    };
  }, [orders]);

  // Handle Voucher Generation
  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const newV: Voucher = {
      code: newCode.trim().toUpperCase(),
      type: newType,
      value: Number(newVal),
      minimum_purchase: Number(newMin),
      usage_limit: 200,
      status: "Active"
    };

    onUpdateVouchers([...vouchers, newV]);
    setNewCode("");
    showLocalToast(`Kode Voucher ${newV.code} berhasil ditambahkan ke database Nusavara!`, "success");
  };

  // Handle Compliance Document Registration
  const handleCreateCompliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocCert.trim() || !newDocProd.trim()) {
      showLocalToast("Harap isi seluruh formulir legalitas produk.", "warning");
      return;
    }

    const newDoc: ComplianceDoc = {
      id: `doc-${Date.now()}`,
      document_type: newDocType,
      product: newDocProd,
      certificate_number: newDocCert,
      issued_by: newDocIssuer,
      issue_date: "2026-06-01",
      expiry_date: "2031-06-01",
      status: "Valid"
    };

    onUpdateComplianceDocs([...complianceDocs, newDoc]);
    setNewDocCert("");
    setNewDocProd("");
    setNewDocIssuer("");
    showLocalToast("Dokumen legalitas baru dipersiapkan & sedia ditampilkan di halaman publik.", "success");
  };

  // Handle fast seed product adder
  const handleAddProductFast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newPr: Product = {
      id: `p-${Date.now()}`,
      name: newProdName,
      category: newProdCat,
      subcategory: newProdCat === "Fashion" ? "Outerwear" : "Serum",
      price: Number(newProdPrice),
      discount_price: null,
      badge: [newProdBadge],
      stock_status: "Available",
      stock: 45,
      description: `Edisi peluncuran khusus dari ${newProdName} diproses menggunakan material lokal terbaik.`,
      weight_gram: 250,
      rating: 4.5,
      image: newProdCat.toLowerCase() === "fashion" ? "fashion" : "skincare",
      preorder: false
    };

    onUpdateProducts([...products, newPr]);
    setNewProdName("");
    showLocalToast(`Produk ${newPr.name} berhasil diinput ke CMS!`, "success");
  };

  // Quick action resellers status updates
  const handleUpdateResellerStatus = (id: string, nextStatus: any) => {
    const updated = resellers.map((r) => (r.id === id ? { ...r, status: nextStatus } : r));
    onUpdateResellers(updated);
    showLocalToast(`Status Aplikasi Reseller diset ke: ${nextStatus}`, "info");
  };

  // Quick action corporate inquiries stages updates
  const handleUpdateInquiryStatus = (id: string, nextStatus: any) => {
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status: nextStatus } : i));
    onUpdateInquiries(updated);
    showLocalToast(`Dealing Pipeline diset ke: ${nextStatus}`, "info");
  };

  // Quick action order details status updates (Processing, packing, shipped, delivered)
  const handleUpdateOrderStatus = (orderNumber: string, nextStatus: any) => {
    const updated = orders.map((o) => {
      if (o.order_number === orderNumber) {
        let tracking = o.tracking_number;
        if (nextStatus === "Shipped" && !o.tracking_number) {
          tracking = `NSV-TRK-${Math.floor(100000 + Math.random() * 900000)}`;
        }
        return {
          ...o,
          order_status: nextStatus,
          tracking_number: tracking
        };
      }
      return o;
    });
    onUpdateOrders(updated);
    showLocalToast(`Status Pemesanan #${orderNumber} sukses diubah ke: ${nextStatus}`, "success");
  };

  // Delete product from catalog
  const handleDeleteProduct = (id: string) => {
    onUpdateProducts(products.filter((p) => p.id !== id));
    showLocalToast("Produk premium berhasil dihapus dari CMS halaman utama.", "info");
  };

  const isFullPage = window.location.pathname === "/admin" || window.location.hash === "#/admin" || window.location.hash === "#admin";

  return (
    <div className={isFullPage 
      ? "min-h-screen w-full bg-stone-950 flex flex-col font-sans" 
      : "fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 font-sans"
    }>
      <div className={isFullPage 
        ? "bg-white dark:bg-stone-950 w-full flex-1 flex flex-col text-stone-900 dark:text-stone-100" 
        : "bg-white dark:bg-stone-950 w-full max-w-6xl h-full sm:h-[620px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border-0 sm:border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100"
      }>
        
        {/* Top Control Header Area */}
        <div className="bg-stone-950 text-white p-4 flex flex-wrap items-center justify-between gap-4 border-b border-stone-850">
          
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-amber-400" />
            <div>
              <span className="block text-sm font-black font-mono tracking-tight uppercase">NUSAVARA DASHBOARD INTEGRASI</span>
              <span className="text-[10px] text-stone-400 font-mono">B2B CRM Pipeline + Legal Compliance CMS + Security Audit Log</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentAdmin ? (
              <div className="flex items-center gap-1.5">
                <button 
                   onClick={() => setActiveTab("profile")}
                  className="flex items-center gap-2 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-full pl-2 pr-3 py-1 cursor-pointer transition-colors"
                  title="Lihat Profil Admin"
                >
                  <img
                    src={currentAdmin.photoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"}
                    alt={currentAdmin.name}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover border border-amber-500"
                  />
                  <div className="text-left font-mono leading-none">
                    <span className="block text-[10px] font-bold text-white">{currentAdmin.name}</span>
                    <span className="block text-[8px] text-amber-400 font-medium uppercase tracking-wide">{currentAdmin.role}</span>
                  </div>
                </button>
                
                 <button
                  onClick={handleLogout}
                  className="p-1.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-rose-400 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                  title="Keluar Sesi Aman"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-rose-500 font-mono text-[10px] font-bold uppercase bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded">
                <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
                <span>Otoritas Terbatas</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1 px-3 bg-stone-800 hover:bg-stone-750 text-white rounded text-xs font-mono tracking-widest uppercase cursor-pointer"
            >
              {isFullPage ? "Kembali ke Toko" : "Tutup Panel"}
            </button>
          </div>
        </div>

        {!currentAdmin ? (
          /* ========================================================= */
          /* REAL ADMIN LOGIN VIEW (GORGEOUS PORTAL)                    */
          /* ========================================================= */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-stone-950 text-stone-100">
            {/* Left side: Hero / Info card */}
            <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-stone-900 to-stone-950 p-8 flex-col justify-between border-r border-stone-900 relative">
              <div className="absolute inset-0 bg-[radial-gradient(#c35232_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
              
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-white tracking-wide">Portal Nusavara</h2>
                  <p className="text-xs text-stone-400 font-sans mt-2 leading-relaxed">
                    Akses aman eksklusif untuk jajaran direksi, manajer operasional, tim pemenuhan legalitas, dan representatif korporat Nusavara.
                  </p>
                </div>
              </div>

              <div className="relative p-4 rounded-xl bg-stone-900/60 border border-stone-850 space-y-2">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block tracking-wider">🔒 Enkripsi Sesi WAF</span>
                <p className="text-[10px] text-stone-500 font-sans leading-normal">
                  Semua aktivitas di dalam dasbor ini diaudit dan dicatat dalam register log audit keamanan sesuai sertifikasi ISO 27001.
                </p>
              </div>
            </div>

            {/* Right side: Login form and Quick Logins */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center overflow-y-auto space-y-6">
              <div className="max-w-md mx-auto w-full space-y-6 text-left">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Masuk Administrator</h3>
                  <p className="text-xs text-stone-400 mt-1">Silakan ketik detail kredensial Anda atau pilih akun demo di bawah.</p>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  setLoginError("");
                  const found = adminUsers.find(
                    (u) => u.email.toLowerCase() === loginEmail.toLowerCase()
                  );
                  if (!found) {
                    setLoginError("Email administrator tidak terdaftar.");
                    return;
                  }
                  // Let's support either custom password or standard fallback
                  const expectedPassword = found.password || `${found.role.split(" ")[0].toLowerCase()}password`;
                  if (loginPassword !== expectedPassword) {
                    setLoginError("Kata sandi yang Anda masukkan salah.");
                    return;
                  }
                  setCurrentAdmin(found);
                  localStorage.setItem("nusavara_logged_admin", JSON.stringify(found));
                  setLoginEmail("");
                  setLoginPassword("");
                }} className="space-y-4">
                  {loginError && (
                    <div className="p-2.5 text-xs text-rose-400 bg-rose-950/20 border border-rose-900/50 rounded-lg">
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-stone-400 font-bold uppercase">Surel / Email Admin</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="contoh@nusavara.id"
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-stone-100 outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-stone-400 font-bold uppercase">Kata Sandi</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Masukkan sandi..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-stone-100 outline-none focus:border-amber-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-stone-500 hover:text-stone-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-mono tracking-wider text-xs uppercase rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10 border border-amber-400"
                  >
                    <Lock className="w-4 h-4" /> Autentikasi Masuk
                  </button>
                </form>

                {/* Quick accounts lists */}
                <div className="border-t border-stone-900 pt-5 space-y-2.5">
                  <span className="block text-[10px] font-mono text-amber-400/80 font-bold uppercase tracking-widest">AKUN DEMO CEPAT (SEKALI KLIK)</span>
                  <div className="grid grid-cols-2 gap-2">
                    {adminUsers.map((u) => (
                      <button
                        key={u.role}
                        type="button"
                        onClick={() => {
                          setLoginEmail(u.email);
                          const expectedPass = u.password || `${u.role.split(" ")[0].toLowerCase()}password`;
                          setLoginPassword(expectedPass);
                          // Immediate login for maximum delight!
                          setCurrentAdmin(u);
                          localStorage.setItem("nusavara_logged_admin", JSON.stringify(u));
                        }}
                        className="p-2 bg-stone-900 hover:bg-stone-850 border border-stone-850 hover:border-amber-500/40 rounded-lg text-left transition-all cursor-pointer flex items-center gap-2 group"
                      >
                        <img
                          src={u.photoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"}
                          alt={u.name}
                          className="w-7 h-7 rounded-full object-cover border border-stone-700 group-hover:border-amber-500 transition-colors"
                        />
                        <div className="truncate">
                          <span className="block text-[10px] font-bold text-white truncate leading-none">{u.name.split(" ")[0]} ({u.role.split(" ")[0]})</span>
                          <span className="block text-[8px] text-stone-500 truncate mt-0.5">{u.email}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* LOGGED IN DASHBOARD VIEWPORT                              */
          /* ========================================================= */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Leftside Admin Navbar linkages */}
            <div className="w-full md:w-56 bg-stone-50 dark:bg-stone-950 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-850 p-2 md:p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0 whitespace-nowrap md:whitespace-normal">
              <span className="hidden md:block text-[9px] font-mono font-bold text-stone-400 dark:text-stone-500 uppercase pl-3 tracking-wide mb-2">MODULE CONTROLS</span>
              
              {[
                { id: "analytics", label: "Overview Analytics", icon: BarChart3, roles: ["Super Admin", "Owner / Director", "Store Manager", "Finance Admin", "Marketing Admin"] },
                { id: "products", label: "CMS Manajemen Produk", icon: Package, roles: ["Super Admin", "Store Manager", "Product Admin", "Content Editor"] },
                { id: "orders", label: "CMS Status Pesanan", icon: ShoppingBag, roles: ["Super Admin", "Store Manager", "Order Admin", "Finance Admin", "Customer Support"] },
                { id: "resellers", label: "Reseller CRM Board", icon: Users, roles: ["Super Admin", "Reseller Manager", "Corporate Sales"] },
                { id: "corporate", label: "Corporate Corporate CRM", icon: TrendingUp, roles: ["Super Admin", "Corporate Sales", "Store Manager"] },
                { id: "compliance", label: "Compliance & Legal", icon: FileCheck, roles: ["Super Admin", "Compliance Admin"] },
                { id: "vouchers", label: "Kupon Promo & Gift", icon: Tag, roles: ["Super Admin", "Marketing Admin"] }
              ].map((nav) => {
                const hasAccess = isSuperOrRole(nav.roles);
                return (
                  <button
                    key={nav.id}
                    onClick={() => {
                      if (!hasAccess) {
                        showLocalToast(`Akses Ditolak: Peran "${currentRole}" tidak memiliki hak otorisasi untuk mengakses menu ini.`, "warning");
                        return;
                      }
                      setActiveTab(nav.id as any);
                    }}
                    className={`shrink-0 md:w-full text-left px-3 py-2 rounded-lg text-xs font-bold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
                      !hasAccess
                        ? "opacity-40 cursor-not-allowed text-stone-400 dark:text-stone-650"
                        : activeTab === nav.id
                        ? "bg-stone-900 dark:bg-stone-800 text-white shadow-xs"
                        : "text-stone-600 dark:text-stone-300 hover:bg-stone-150 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white"
                    }`}
                  >
                    <nav.icon className={`w-4 h-4 ${activeTab === nav.id ? "text-amber-400" : "text-stone-400"}`} />
                    <span>{nav.label}</span>
                    {!hasAccess && <Lock className="w-3 h-3 ml-auto text-stone-400" />}
                  </button>
                );
              })}

              {/* PROFILE TAB */}
              <span className="hidden md:block border-t border-stone-200 dark:border-stone-800 my-2" />
              <button
                onClick={() => setActiveTab("profile")}
                className={`shrink-0 md:w-full text-left px-3 py-2 rounded-lg text-xs font-bold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-amber-500 text-stone-950 shadow-xs"
                    : "text-stone-600 dark:text-stone-300 hover:bg-stone-150 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white"
                }`}
              >
                <User className={`w-4 h-4 ${activeTab === "profile" ? "text-stone-950" : "text-stone-400"}`} />
                <span>Profil Admin</span>
              </button>

              <button
                onClick={handleLogout}
                className="shrink-0 md:w-full text-left px-3 py-2 rounded-lg text-xs font-bold tracking-wide flex items-center gap-2 transition-all cursor-pointer text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Keluar Sesi Aman</span>
              </button>
            </div>

            {/* Rightside dynamic viewing window */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-stone-900 space-y-6 text-left">
              
              {/* TAB: Overview Analytics and KPIs */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                
                {/* 4 Cards main metric display */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-stone-50 dark:bg-stone-950/60 border rounded-xl border-stone-200 dark:border-stone-800">
                    <span className="block text-[10px] text-stone-400 dark:text-stone-500 font-mono uppercase font-bold">Total Pendapatan Terbayar</span>
                    <span className="block text-xl font-mono font-black text-stone-950 dark:text-stone-100 mt-1">Rp {analyticsTotals.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-950/60 border rounded-xl border-stone-200 dark:border-stone-800">
                    <span className="block text-[10px] text-stone-400 dark:text-stone-500 font-mono uppercase font-bold">Transaksi Konfirmasi</span>
                    <span className="block text-xl font-mono font-black text-stone-950 dark:text-stone-100 mt-1">{analyticsTotals.paidOrdersLength} Orders</span>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-950/60 border rounded-xl border-stone-200 dark:border-stone-800">
                    <span className="block text-[10px] text-stone-400 dark:text-stone-500 font-mono uppercase font-bold">Rasio Konversi QRIS</span>
                    <span className="block text-xl font-mono font-black text-stone-950 dark:text-stone-100 mt-1">{analyticsTotals.conversionRate.toFixed(1)}%</span>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-950/60 border rounded-xl border-stone-200 dark:border-stone-800">
                    <span className="block text-[10px] text-stone-400 dark:text-stone-500 font-mono uppercase font-bold">Rerata Keranjang (AOV)</span>
                    <span className="block text-xl font-mono font-black text-stone-950 dark:text-stone-100 mt-1">Rp {Math.round(analyticsTotals.avOrderValue).toLocaleString()}</span>
                  </div>
                </div>

                {/* Simulated SVG Graph of Visual analytics (No high external d3 dependencies required directly, clean vector representation ensures maximum speed and look-and-feel aesthetics!) */}
                <div className="p-5 border border-stone-200 dark:border-stone-800 rounded-2xl bg-stone-50 dark:bg-stone-950/40 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-[11px] font-mono tracking-wider text-stone-400 dark:text-stone-500 font-bold uppercase">LOKAL SALES PERFORMANCE GRAPH</span>
                      <h4 className="text-sm font-bold font-serif text-stone-850 dark:text-stone-200">Kurva Penghasilan Bersih Harian Nusavara (Rp Juta)</h4>
                    </div>
                    <span className="inline-block text-[10px] font-mono bg-amber-400 text-stone-950 px-2 py-0.5 rounded font-bold uppercase animate-pulse">Live</span>
                  </div>

                  <svg viewBox="0 0 500 120" className="w-full bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 rounded-lg p-2 text-stone-300 dark:text-stone-700">
                    {/* Gridlines */}
                    <line x1="10" y1="20" x2="490" y2="20" stroke="currentColor" className="text-stone-100 dark:text-stone-800/60" strokeWidth="1" />
                    <line x1="10" y1="50" x2="490" y2="50" stroke="currentColor" className="text-stone-100 dark:text-stone-800/60" strokeWidth="1" />
                    <line x1="10" y1="80" x2="490" y2="80" stroke="currentColor" className="text-stone-100 dark:text-stone-800/60" strokeWidth="1" />

                    {/* Sales curve */}
                    <path
                      d="M 10 90 Q 90 70 170 85 T 330 40 T 490 10"
                      fill="none"
                      stroke="#C35232"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Nodes indications */}
                    <circle cx="170" cy="85" r="4" fill="#C35232" />
                    <circle cx="330" cy="40" r="4" fill="#C35232" />
                    <circle cx="490" cy="10" r="5" fill="#3b7a57" />

                    <text x="175" y="80" fill="currentColor" className="text-[7px] font-bold font-mono text-stone-750 dark:text-stone-300">Rp 12,4Jt</text>
                    <text x="335" y="35" fill="currentColor" className="text-[7px] font-bold font-mono text-stone-750 dark:text-stone-300">Rp 30.1Jt</text>
                    <text x="440" y="20" fill="currentColor" className="text-[7px] font-bold font-mono text-emerald-800 dark:text-emerald-400 font-black">Rp 48.5Jt (Puncak!)</text>

                    <text x="10" y="115" fill="currentColor" className="text-[6px] font-mono text-stone-500 dark:text-stone-400">Mon 1 Juni</text>
                    <text x="170" y="115" fill="currentColor" className="text-[6px] font-mono text-stone-500 dark:text-stone-400">Wed 3 Juni</text>
                    <text x="330" y="115" fill="currentColor" className="text-[6px] font-mono text-stone-500 dark:text-stone-400">Fri 5 Juni</text>
                    <text x="450" y="115" fill="currentColor" className="text-[6px] font-mono text-stone-500 dark:text-stone-400">Sun (Target)</text>
                  </svg>
                </div>

                {/* Warning lists indicators: stock alerts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-rose-200/60 dark:border-rose-950/40 bg-rose-50/40 dark:bg-rose-950/10 rounded-xl space-y-2">
                    <span className="block text-[11px] font-mono text-rose-800 dark:text-rose-450 font-bold uppercase flex items-center gap-1">
                      ⚠️ ALERT: STOCK HABIS / MINIM
                    </span>
                    <ul className="text-xs divide-y divide-stone-100 dark:divide-stone-800 divide-dashed">
                      {products.filter(p => p.stock <= 10).map(p => (
                        <li key={p.id} className="py-2 flex justify-between items-center text-stone-750 dark:text-stone-300 font-medium font-mono">
                          <span>{p.name}</span>
                          <span className="text-rose-700 dark:text-rose-400 font-bold">Peringatan: Tersisa {p.stock} Unit</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 rounded-xl space-y-2">
                    <span className="block text-[11px] font-mono text-stone-500 dark:text-stone-400 font-bold uppercase">
                      PENCUPLIKAN SALURAN TRAFFIK
                    </span>
                    <table className="w-full text-xs text-stone-700 dark:text-stone-300 leading-normal">
                      <tbody>
                        <tr className="border-b dark:border-stone-800/60"><td className="py-1">Instagram Spreads</td><td className="text-right font-bold">520 leads</td></tr>
                        <tr className="border-b dark:border-stone-800/60"><td className="py-1">Google Search SEO</td><td className="text-right font-bold">340 leads</td></tr>
                        <tr className="border-b dark:border-stone-800/60"><td className="py-1">TikTok Live Shop</td><td className="text-right font-bold">290 leads</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: CMS Products list management */}
            {activeTab === "products" && (
              <div className="space-y-6">
                
                {/* Add Fast Product Form */}
                <form onSubmit={handleAddProductFast} className="p-4 bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                  <div className="col-span-1 sm:col-span-2 text-left">
                    <label className="block text-[9px] font-mono text-stone-500 dark:text-stone-400 font-bold uppercase mb-1">Cara Cepat Tambah Item Produk:</label>
                    <input
                      type="text"
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="Nama produk baru lokal..."
                      className="w-full border border-stone-200 dark:border-stone-800 p-2 text-xs bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-[9px] font-mono text-stone-500 dark:text-stone-400 font-bold uppercase mb-1">Kategori:</label>
                    <select
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value)}
                      className="w-full border border-stone-200 dark:border-stone-800 p-2 text-xs bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                    >
                      <option value="Fashion">Fashion</option>
                      <option value="Skincare">Skincare</option>
                      <option value="Herbal Wellness">Herbal Wellness</option>
                      <option value="Craft">Craft</option>
                    </select>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-amber-400 font-bold uppercase text-xs rounded-lg transition-all duration-200 cursor-pointer shadow-md dark:shadow-[0_0_15px_rgba(245,158,11,0.35)] border border-transparent dark:border-amber-400 flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Tambahkan
                    </button>
                  </div>
                </form>

                {/* Major Table layout */}
                <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-x-auto bg-white dark:bg-stone-950">
                  <table className="w-full text-xs text-left text-stone-700 dark:text-stone-300">
                    <thead className="bg-stone-50 dark:bg-stone-900 text-[10px] font-mono uppercase text-stone-500 dark:text-stone-400 border-b dark:border-stone-800">
                      <tr>
                        <th className="p-3">Nama Produk</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Harga Retail</th>
                        <th className="p-3">Sisa Stok</th>
                        <th className="p-3 text-right">Aksi CMS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-stone-800 font-mono text-stone-750 dark:text-stone-300">
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td className="p-3 font-sans font-bold text-stone-900 dark:text-white">{p.name}</td>
                          <td className="p-3">{p.category}</td>
                          <td className="p-3">Rp {p.price.toLocaleString()}</td>
                          <td className={`p-3 font-bold ${p.stock <= 10 ? "text-rose-600 dark:text-rose-400" : "text-emerald-700 dark:text-emerald-400"}`}>
                            {p.stock} unit
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1 px-2.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition-colors ml-auto cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB: CMS Orders status management */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <span className="block text-[11px] font-mono tracking-widest text-stone-400 dark:text-stone-500 font-bold uppercase mb-2">Manajemen Transaksi Nusavara</span>
                
                <div className="grid grid-cols-1 gap-4">
                  {orders.map((o) => (
                    <div key={o.order_number} className="p-4 border rounded-xl border-stone-200 dark:border-stone-800 space-y-3 bg-stone-50 dark:bg-stone-950/60 text-stone-900 dark:text-stone-100">
                      <div className="flex justify-between items-center border-b dark:border-stone-800 pb-2">
                        <div>
                          <span className="font-mono text-xs font-black text-stone-900 dark:text-white">PESANAN ID: {o.order_number}</span>
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Klien: {o.customer} ({o.payment_method})</span>
                        </div>
                        <div className="flex gap-2 text-[10px] font-mono text-white">
                          <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                            o.payment_status === "Paid" ? "bg-emerald-600" : "bg-amber-500 text-stone-950"
                          }`}>
                            {o.payment_status}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-stone-800 font-bold uppercase">
                            {o.order_status}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-stone-700 dark:text-stone-300">
                        <span className="font-mono font-bold">Barang:</span> {o.items.map(it => `${it.product} (x${it.quantity})`).join(", ")}
                      </div>

                      {/* Dropdown status switcher inside CMS */}
                      <div className="flex items-center gap-3 justify-end pt-1">
                        <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase font-bold">Alihkan Status Ke:</span>
                        <div className="flex gap-1">
                          {["Processing", "Packed", "Shipped", "Completed"].map((s) => (
                            <button
                              key={s}
                              onClick={() => handleUpdateOrderStatus(o.order_number, s as any)}
                              className="px-2 py-1 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 hover:border-stone-900 dark:hover:border-stone-600 text-[10px] font-bold rounded cursor-pointer text-stone-850 dark:text-stone-200 transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB: B2B Resellers CRM pipeline */}
            {activeTab === "resellers" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <span className="block text-[11px] font-mono text-stone-400 dark:text-stone-500 font-bold uppercase">PELUANG B2B MITRA KERJA</span>
                    <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-200">Pipeline Calon Reseller Terdaftar</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {resellers.map((r, i) => (
                    <div key={i} className="p-4 border rounded-xl border-stone-200 dark:border-stone-800 space-y-3 font-sans text-xs bg-stone-50 dark:bg-stone-950/60 text-stone-900 dark:text-stone-100">
                      <div className="flex justify-between items-center border-b dark:border-stone-800 pb-2">
                        <div>
                          <span className="font-extrabold text-stone-950 dark:text-white text-sm">{r.name} ({r.owner})</span>
                          <span className="text-[10px] uppercase font-mono block text-stone-400 mt-0.5">Asal Kota: {r.city}</span>
                        </div>
                        <span className={`px-2 py-0.5 font-mono text-[10px] font-bold rounded uppercase ${
                          r.status === "Approved" ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300" : "bg-amber-100 dark:bg-amber-950/40 text-amber-950 dark:text-amber-300"
                        }`}>
                          Status: {r.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-stone-700 dark:text-stone-300">
                        <p><strong>Minat Produk:</strong> {r.product_interest.join(" & ")}</p>
                        <p><strong>Saluran Dagang:</strong> {r.sales_channel.join(", ")}</p>
                        <p><strong>Teknis Pengalaman:</strong> "{r.experience}"</p>
                      </div>

                      {/* Controls B2B approval */}
                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          onClick={() => handleUpdateResellerStatus(r.id, "Approved")}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-stone-950 text-white text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-sm shadow-emerald-500/10 transition-all duration-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Setujui Mitra
                        </button>
                        <button
                          onClick={() => handleUpdateResellerStatus(r.id, "Rejected")}
                          className="px-3 py-1 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/45 dark:hover:text-rose-300 hover:border-rose-500 dark:border-rose-900/60 dark:bg-rose-950/15 text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-all duration-200 focus:ring-2 focus:ring-rose-500/20"
                        >
                          <XCircle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" /> Tolak
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB: B2B Corporate Gifts pipeline */}
            {activeTab === "corporate" && (
              <div className="space-y-4">
                <div>
                  <span className="block text-[11px] font-mono text-stone-400 dark:text-stone-500">CORPORATE HAMPERS LOGS</span>
                  <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-200">Hubungan Layanan Kemitraan Kado Perusahaan</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {inquiries.map((inq, idx) => (
                    <div key={idx} className="p-4 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50 dark:bg-stone-950/60 space-y-3 font-sans text-xs text-stone-750 dark:text-stone-300">
                      <div className="flex justify-between items-center border-b dark:border-stone-800 pb-2">
                        <div>
                          <strong className="block text-stone-900 dark:text-white text-sm">{inq.company}</strong>
                          <span className="text-[10px] text-stone-400 dark:text-stone-500">Kontak Person: {inq.contact_person} | {inq.phone}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-[#C35232] text-white font-mono text-[9px] uppercase tracking-wider font-bold">
                          Tahap: {inq.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-stone-700 dark:text-stone-300 leading-normal">
                        <p><strong>Tujuan Event:</strong> {inq.event_purpose}</p>
                        <p><strong>Anggaran per Unit:</strong> Rp {inq.budget_per_package.toLocaleString()}</p>
                        <p><strong>Jumlah Unit:</strong> {inq.quantity} Boks paket</p>
                        <p><strong>Pemesanan Grafir Logo:</strong> {inq.custom_logo ? "Ya, pesan kustomisasi" : "Tidak"}</p>
                      </div>

                      {/* Lead pipeline stage switcher */}
                      <div className="pt-2 border-t dark:border-stone-800 flex flex-wrap gap-1.5 items-center justify-end">
                        <span className="text-[10px] font-mono font-bold text-stone-450 dark:text-stone-400 uppercase">Pindah Tahap Dealing:</span>
                        {["Contacted", "Quotation Sent", "Negotiation", "Deal Won", "Deal Lost"].map((stage) => (
                          <button
                            key={stage}
                            onClick={() => handleUpdateInquiryStatus(inq.id, stage as any)}
                            className="px-2 py-0.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 hover:border-stone-950 dark:hover:border-stone-600 text-[10px] rounded text-stone-850 dark:text-stone-200 cursor-pointer transition-all"
                          >
                            {stage}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB: Compliance Documents Registration */}
            {activeTab === "compliance" && (
              <div className="space-y-6">
                
                {/* Form to add new compliance doc */}
                <form onSubmit={handleCreateCompliance} className="p-4 bg-stone-50 dark:bg-stone-950/60 border rounded-xl border-stone-200 dark:border-stone-800 space-y-4">
                  <span className="block text-xs font-bold text-stone-900 dark:text-white uppercase text-left">Daftarkan Sertifikasi / Dokumen BPOM Baru</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700 dark:text-stone-300 text-left">
                    <div>
                      <label className="block mb-1 font-bold">Tipe Registrasi:</label>
                      <select
                        value={newDocType}
                        onChange={(e) => setNewDocType(e.target.value)}
                        className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2 rounded-lg outline-none text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                      >
                        <option value="BPOM">BPOM RI</option>
                        <option value="Halal">Halal MUI</option>
                        <option value="PIRT">Dinkes PIRT</option>
                        <option value="HAKI">Merek Dagang HAKI</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-1 font-bold">Kaitan Nama Produk:</label>
                      <input
                        type="text"
                        required
                        value={newDocProd}
                        onChange={(e) => setNewDocProd(e.target.value)}
                        className="w-full border border-stone-200 dark:border-stone-800 p-2 rounded-lg bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                        placeholder="Contoh: Serum Ceramide Barrier Calm"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-bold">Nomor Nomor Registrasi:</label>
                      <input
                        type="text"
                        required
                        value={newDocCert}
                        onChange={(e) => setNewDocCert(e.target.value)}
                        className="w-full border border-stone-200 dark:border-stone-800 p-2 rounded-lg bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                        placeholder="NA182301xxxx"
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="block mb-1 text-xs font-bold text-stone-700 dark:text-stone-300">Otoritas Penerbit Sertifikat:</label>
                    <input
                      type="text"
                      required
                      value={newDocIssuer}
                      onChange={(e) => setNewDocIssuer(e.target.value)}
                      className="w-full border border-stone-200 dark:border-stone-800 p-2 rounded-lg bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                      placeholder="Contoh: BPOM RI / BPJPH Kemenag"
                    />
                  </div>

                  <div className="text-left">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 dark:bg-emerald-600 text-white dark:text-stone-50 hover:bg-stone-800 dark:hover:bg-emerald-500 font-bold uppercase text-xs rounded-lg transition-all duration-200 cursor-pointer shadow-md shadow-emerald-500/10 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-stone-800 dark:border-emerald-500 flex items-center gap-1.5"
                    >
                      <FileCheck className="w-4 h-4 text-emerald-400" /> Simpan Legalitas Valid
                    </button>
                  </div>
                </form>

                {/* Listing */}
                <div className="space-y-2.5">
                  {complianceDocs.map((doc, idx) => (
                    <div key={idx} className="p-3 border rounded-lg bg-stone-50 dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 flex justify-between items-center font-mono text-xs text-stone-750 dark:text-stone-300">
                      <div>
                        <strong className="text-stone-900 dark:text-white block">{doc.product} ({doc.document_type})</strong>
                        <span className="text-stone-500 dark:text-stone-400">No. Sertifikat: {doc.certificate_number} | {doc.issued_by}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-150 dark:bg-emerald-950/45 text-emerald-950 dark:text-emerald-300 rounded font-black text-[10px]">
                        VALID
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB: CMS Vouchers Generator */}
            {activeTab === "vouchers" && (
              <div className="space-y-6">
                
                {/* Generation Form */}
                <form onSubmit={handleCreateVoucher} className="p-4 bg-stone-50 dark:bg-stone-950/60 border rounded-xl border-stone-200 dark:border-stone-800 space-y-4">
                  <span className="block text-xs font-bold text-stone-900 dark:text-white uppercase text-left">Generate Kupon Kampanye Baru</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-stone-700 dark:text-stone-300 text-left">
                    <div>
                      <label className="block mb-1 font-bold">Kode Kupon:</label>
                      <input
                        type="text"
                        required
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        placeholder="Contoh: MERDEKA50"
                        className="w-full p-2 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none uppercase focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-bold">Tipe Potongan:</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as any)}
                        className="w-full p-2 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                      >
                        <option value="percentage">Persentase (%)</option>
                        <option value="fixed">Nominal Tetap (Rupiah)</option>
                        <option value="shipping_discount">Diskon Ongkir Biteship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-1 font-bold">Nilai Potongan:</label>
                      <input
                        type="number"
                        required
                        value={newVal}
                        onChange={(e) => setNewVal(Number(e.target.value))}
                        className="w-full p-2 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-bold">Min. Pembelian:</label>
                      <input
                        type="number"
                        required
                        value={newMin}
                        onChange={(e) => setNewMin(Number(e.target.value))}
                        className="w-full p-2 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 dark:bg-gradient-to-r dark:from-amber-500 dark:to-orange-500 text-white dark:text-stone-950 hover:bg-stone-800 dark:hover:from-amber-400 dark:hover:to-orange-400 font-bold uppercase text-xs rounded-lg transition-all duration-200 cursor-pointer shadow-md shadow-amber-500/10 dark:shadow-[0_0_15px_rgba(245,158,11,0.45)] border border-stone-850 dark:border-amber-400 flex items-center gap-1.5"
                    >
                      <Tag className="w-4 h-4" /> Aktifkan Kupon Kampanye
                    </button>
                  </div>
                </form>

                {/* Vouchers lists */}
                <div className="space-y-2.5 text-xs text-stone-750 dark:text-stone-300 font-mono">
                  {vouchers.map((v) => (
                    <div key={v.code} className="p-3 bg-white dark:bg-stone-950 border rounded-lg border-stone-200 dark:border-stone-800 flex justify-between items-center">
                      <div>
                        <span className="font-extrabold text-stone-900 dark:text-stone-200 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 rounded text-xs inline-block mb-1">{v.code}</span>
                        <p className="text-stone-500 dark:text-stone-400">Tipe: {v.type} | Nilai: {v.value} | Min. Beli: Rp {v.minimum_purchase.toLocaleString()}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 font-black rounded text-[10px] uppercase">
                        Aktif Berjalan
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB: Admin Profile & Credentials Settings */}
            {activeTab === "profile" && currentAdmin && (
              <div className="space-y-6">
                <div>
                  <span className="block text-[11px] font-mono text-stone-400 dark:text-stone-500 font-bold uppercase">KEAMANAN AKSES DASBOR</span>
                  <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-200">Manajemen Profil Administrator</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left column: Avatar & Privilege badge */}
                  <div className="md:col-span-4 p-5 bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-850 rounded-2xl flex flex-col items-center text-center space-y-4">
                    <div className="relative group">
                      <img
                        src={profilePhotoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"}
                        alt={currentAdmin.name}
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 rounded-full object-cover border-4 border-amber-500 shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-stone-900 dark:text-white">{currentAdmin.name}</h4>
                      <span className="inline-block px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 text-amber-500 font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">
                        {currentAdmin.role}
                      </span>
                    </div>

                    {/* Pre-configured aesthetic portrait picker */}
                    <div className="w-full space-y-2 border-t border-stone-200 dark:border-stone-850 pt-4">
                      <span className="block text-[9px] font-mono text-stone-400 uppercase font-bold text-left">Pilih Preset Avatar Cepat:</span>
                      <div className="flex gap-2 justify-center flex-wrap">
                        {[
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", // Man 1
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200", // Woman 1
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", // Man 2
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200", // Woman 2
                          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200", // Man 3
                          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"  // Woman 3
                        ].map((url, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setProfilePhotoUrl(url)}
                            className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                              profilePhotoUrl === url ? "border-amber-500 scale-110" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={url} alt="preset" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full border-t border-stone-200 dark:border-stone-850 pt-4">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-2 px-3 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-400 hover:border-rose-300 font-bold font-mono text-[10px] uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Keluar Sesi Aman
                      </button>
                    </div>

                  </div>

                  {/* Right column: Editing form */}
                  <div className="md:col-span-8 p-5 border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-950/20 space-y-4">
                    <span className="block text-xs font-bold text-stone-900 dark:text-white uppercase">Informasi Kredensial Akun</span>
                    
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!profileName.trim() || !profileEmail.trim()) {
                        showLocalToast("Harap lengkapi semua bidang.", "warning");
                        return;
                      }

                      const updated: AdminUser = {
                        ...currentAdmin,
                        name: profileName.trim(),
                        email: profileEmail.trim(),
                        password: profilePassword,
                        photoUrl: profilePhotoUrl
                      };

                      setCurrentAdmin(updated);
                      localStorage.setItem("nusavara_logged_admin", JSON.stringify(updated));

                      const listUpdated = adminUsers.map((u) => 
                        u.role === currentAdmin.role ? updated : u
                      );
                      setAdminUsers(listUpdated);
                      localStorage.setItem("nusavara_admin_users", JSON.stringify(listUpdated));

                      showLocalToast("Profil Administrator Berhasil Diperbarui!", "success");
                    }} className="space-y-4 text-xs text-stone-700 dark:text-stone-300">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-bold">Nama Lengkap Admin:</label>
                          <input
                            type="text"
                            required
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="w-full p-2.5 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-500/20"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-bold">Surel / Email Kerja:</label>
                          <input
                            type="email"
                            required
                            value={profileEmail}
                            onChange={(e) => setProfileEmail(e.target.value)}
                            className="w-full p-2.5 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-500/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-bold">Kata Sandi Baru:</label>
                          <input
                            type="text"
                            required
                            value={profilePassword}
                            onChange={(e) => setProfilePassword(e.target.value)}
                            className="w-full p-2.5 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-500/20 font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-bold">Foto URL Kustom:</label>
                          <input
                            type="text"
                            value={profilePhotoUrl}
                            onChange={(e) => setProfilePhotoUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full p-2.5 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-lg outline-none focus:ring-2 focus:ring-amber-500/20 font-mono"
                          />
                        </div>
                      </div>

                      {/* Privilege breakdown card */}
                      <div className="p-3 bg-stone-50 dark:bg-stone-900/40 rounded-xl border border-stone-150 dark:border-stone-850 space-y-1">
                        <span className="block text-[10px] font-mono uppercase font-black text-amber-500">Tingkat Otorisasi: {currentAdmin.role}</span>
                        <p className="text-[10px] text-stone-500 leading-normal">
                          {currentAdmin.role === "Super Admin" 
                            ? "Memiliki kendali penuh atas sistem katalog CMS, persetujuan reseller CRM, legalitas dokumen compliance, dan modul kupon promosi."
                            : currentAdmin.role === "Product Admin"
                            ? "Diberikan hak akses CMS Manajemen Katalog Produk untuk menambah/menghapus produk."
                            : currentAdmin.role === "Order Admin"
                            ? "Diizinkan untuk memperbarui status pemesanan, mencetak resi, dan memonitor data kurir JNE/Sicepat Express."
                            : "Diberikan hak akses parsial untuk memonitor dasbor terkait divisi kerja Anda."
                          }
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-400 text-white dark:text-stone-950 font-bold uppercase text-[10px] font-mono tracking-wider rounded-lg transition-all flex items-center gap-1.5 border border-stone-800 dark:border-amber-400 cursor-pointer"
                        >
                          <Check className="w-4 h-4" /> Simpan Perubahan Profil
                        </button>
                      </div>

                    </form>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>
        )}

        {/* Audit status strip footer */}
        <div className="p-3.5 bg-stone-950 border-t border-stone-850 flex flex-wrap justify-between items-center gap-2 text-[9.5px] font-mono text-stone-500">
          <span>PLATFORM VERSI: 1.0.4-LOKAL | ENKRIPSI DATA: AES-256 SECURED WAF</span>
          <span>LOG AUDIT: AKSES ADMIN DISETUJUI {new Date().toLocaleTimeString()} UTC</span>
        </div>

        {/* Custom non-blocking local toast */}
        {localToast && (
          <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-2xl font-sans text-xs font-semibold tracking-wide transition-all duration-300 max-w-sm bg-stone-900 border-stone-800 text-stone-100">
            <div className={`w-2 h-2 rounded-full shrink-0 ${
              localToast.type === "success" ? "bg-emerald-500 animate-pulse" :
              localToast.type === "warning" ? "bg-rose-500 animate-pulse" : "bg-amber-500 animate-pulse"
            }`} />
            <span className="flex-1 leading-normal">{localToast.message}</span>
            <button
              onClick={() => setLocalToast(null)}
              className="text-stone-400 hover:text-white font-black text-[10px] ml-2 font-mono cursor-pointer"
            >
              [X]
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
