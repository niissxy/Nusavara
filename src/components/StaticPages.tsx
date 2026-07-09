/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ShieldAlert,
  Award,
  Globe,
  MapPin,
  HelpCircle,
  Clock,
  Sparkles,
  Heart,
  Send,
  CheckCircle2,
  BookOpen,
  ClipboardCheck,
  Search,
  Users,
  Lock,
  Mail,
  Phone,
  Camera,
  LogOut,
  Key,
  Edit2,
  Check
} from "lucide-react";
import {
  ResellerApplication,
  CorporateInquiry,
  Order,
  FAQ,
  BlogPost,
  ComplianceDoc,
  User
} from "../types";
import { DesignTemplate } from "../data/seedData";
import { staticTranslations } from "../data/staticTranslations";
import { getLocalizedBlog, getLocalizedFAQ, getLocalizedComplianceDoc } from "../utils/translationUtils";

interface StaticPagesProps {
  view: string;
  currentTemplate: DesignTemplate;
  resellers: ResellerApplication[];
  onAddReseller: (app: ResellerApplication) => void;
  inquiries: CorporateInquiry[];
  onAddInquiry: (inq: CorporateInquiry) => void;
  orders: Order[];
  blogs: BlogPost[];
  faqs: FAQ[];
  complianceDocs: ComplianceDoc[];
  showToast?: (message: string, type?: "success" | "info" | "warning") => void;
  currentLang?: "id" | "en" | "ar" | "ja" | "ko";
  currentUser?: User | null;
  onUpdateProfile?: (user: User) => void;
  onLogin?: (user: User) => void;
  onRegister?: (user: User) => void;
  onLogout?: () => void;
}

export default function StaticPages({
  view,
  currentTemplate,
  resellers,
  onAddReseller,
  inquiries,
  onAddInquiry,
  orders,
  blogs,
  faqs,
  complianceDocs,
  showToast,
  currentLang = "id",
  currentUser = null,
  onUpdateProfile = () => {},
  onLogin = () => {},
  onRegister = () => {},
  onLogout = () => {}
}: StaticPagesProps) {
  
  const lang = currentLang || "id";
  const user = (currentUser || {
    id: "MEMBER-ALYA-01",
    name: "Alya Rahmani",
    email: "alya@nusavara.com",
    phone: "081234567890",
    points: 870,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256",
    memberSince: "Desember 2025",
    password: "password123"
  }) as User;
  const t = (key: string) => {
    return (staticTranslations[lang] as any)?.[key] || (staticTranslations["id"] as any)?.[key] || key;
  };

  // -- Local state managers --
  // Customer Auth states
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Customer Profile edit states
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const avatarPresets = [
    { name: "Alya", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
    { name: "Siti", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
    { name: "Bagus", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { name: "Made", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
    { name: "Rian", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face" },
    { name: "Eka", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName || !authEmail || !authPhone || !authPassword) {
      showToast?.(lang === "id" ? "Mohon isi semua data!" : "Please fill out all fields!", "warning");
      return;
    }

    const usersStr = localStorage.getItem("nusavara_registered_users") || "[]";
    let usersList: User[] = [];
    try {
      usersList = JSON.parse(usersStr);
    } catch (err) {
      usersList = [];
    }

    if (usersList.some((u) => u.email.toLowerCase() === authEmail.toLowerCase())) {
      showToast?.(lang === "id" ? "Email sudah terdaftar!" : "Email is already registered!", "warning");
      return;
    }

    const newUser: User = {
      name: authName,
      email: authEmail,
      phone: authPhone,
      password: authPassword,
      points: 870,
      memberSince: new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long" }),
      photoUrl: avatarPresets[0].url
    };

    usersList.push(newUser);
    localStorage.setItem("nusavara_registered_users", JSON.stringify(usersList));

    onRegister(newUser);

    setAuthName("");
    setAuthEmail("");
    setAuthPhone("");
    setAuthPassword("");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      showToast?.(lang === "id" ? "Mohon isi email dan kata sandi!" : "Please fill out email and password!", "warning");
      return;
    }

    if (authEmail === "alya@nusavara.com" && authPassword === "123456") {
      const demoUser: User = {
        name: "Alya Rahmani",
        email: "alya@nusavara.com",
        phone: "+62 812-3456-7890",
        password: "123456",
        points: 870,
        memberSince: "Desember 2025",
        photoUrl: avatarPresets[0].url
      };
      onLogin(demoUser);
      return;
    }

    const usersStr = localStorage.getItem("nusavara_registered_users") || "[]";
    let usersList: User[] = [];
    try {
      usersList = JSON.parse(usersStr);
    } catch (err) {
      usersList = [];
    }

    const matched = usersList.find(
      (u) => u.email.toLowerCase() === authEmail.toLowerCase() && u.password === authPassword
    );

    if (matched) {
      onLogin(matched);
    } else {
      showToast?.(
        lang === "id" 
          ? "Kombinasi Email & Sandi salah! Coba alya@nusavara.com / 123456" 
          : "Invalid email or password! Try alya@nusavara.com / 123456", 
        "warning"
      );
    }
  };

  const handleProfileUpdateSubmit = (field: "name" | "email" | "phone" | "password" | "photo") => {
    const updatedUser = { ...user };

    if (field === "name") {
      if (!newName.trim()) {
        showToast?.(lang === "id" ? "Nama tidak boleh kosong!" : "Name cannot be empty!", "warning");
        return;
      }
      updatedUser.name = newName;
      setIsEditingName(false);
    } else if (field === "email") {
      if (!newEmail.trim() || !newEmail.includes("@")) {
        showToast?.(lang === "id" ? "Email tidak valid!" : "Invalid email!", "warning");
        return;
      }
      updatedUser.email = newEmail;
      setIsEditingEmail(false);
    } else if (field === "phone") {
      if (!newPhone.trim()) {
        showToast?.(lang === "id" ? "Nomor telepon tidak boleh kosong!" : "Phone number cannot be empty!", "warning");
        return;
      }
      updatedUser.phone = newPhone;
      setIsEditingPhone(false);
    } else if (field === "password") {
      if (oldPassword !== user.password && user.password) {
        showToast?.(lang === "id" ? "Kata sandi lama salah!" : "Incorrect current password!", "warning");
        return;
      }
      if (!newPassword || newPassword.length < 6) {
        showToast?.(lang === "id" ? "Sandi baru minimal 6 karakter!" : "New password must be at least 6 characters!", "warning");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        showToast?.(lang === "id" ? "Konfirmasi sandi baru tidak cocok!" : "Confirm password does not match!", "warning");
        return;
      }
      updatedUser.password = newPassword;
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsEditingPassword(false);
    } else if (field === "photo") {
      if (!newPhotoUrl.trim()) {
        showToast?.(lang === "id" ? "URL foto tidak boleh kosong!" : "Photo URL cannot be empty!", "warning");
        return;
      }
      updatedUser.photoUrl = newPhotoUrl;
      setIsEditingPhoto(false);
    }

    onUpdateProfile(updatedUser);

    // Also update in registered list so it persists on subsequent logins
    const usersStr = localStorage.getItem("nusavara_registered_users") || "[]";
    let usersList: User[] = [];
    try {
      usersList = JSON.parse(usersStr);
    } catch (err) {
      usersList = [];
    }
    const idx = usersList.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
    if (idx !== -1) {
      usersList[idx] = updatedUser;
      localStorage.setItem("nusavara_registered_users", JSON.stringify(usersList));
    }
  };

  // 1. Reseller sign up
  const [resName, setResName] = useState("");
  const [resOwner, setResOwner] = useState("");
  const [resCity, setResCity] = useState("Bandung");
  const [resExp, setResExp] = useState("");

  // 2. Corporate sign up
  const [corpCompany, setCorpCompany] = useState("");
  const [corpContact, setCorpContact] = useState("");
  const [corpEmail, setCorpEmail] = useState("");
  const [corpBudget, setCorpBudget] = useState(350000);
  const [corpQty, setCorpQty] = useState(50);

  // Success states for submissions
  const [resellerSuccess, setResellerSuccess] = useState(false);
  const [corporateSuccess, setCorporateSuccess] = useState(false);

  // 3. Order Tracker search
  const [trackId, setTrackId] = useState("");
  const [trackingResult, setTrackingResult] = useState<Order | null>(null);

  // Form submit reseller
  const handleResellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resOwner) {
      if (showToast) {
        showToast(lang === "id" ? "Mohon isi seluruh data pendaftaran!" : "Please fill out all registration data!", "warning");
      } else {
        alert(lang === "id" ? "Mohon isi seluruh data pendaftaran!" : "Please fill out all registration data!");
      }
      return;
    }

    const newApp: ResellerApplication = {
      id: `res-${Date.now()}`,
      name: resName,
      owner: resOwner,
      city: resCity,
      sales_channel: ["Instagram Feed", "Shopee Boutique"],
      product_interest: ["Skincare", "Fashion"],
      monthly_sales_estimate: "Rp 5.000.000 - Rp 15.000.000",
      experience: resExp || "Baru memulai usaha perdagangan kosmetik nusantara",
      status: "New"
    };

    onAddReseller(newApp);
    setResName("");
    setResOwner("");
    setResExp("");
    setResellerSuccess(true);
    
    if (showToast) {
      showToast(lang === "id" ? "Kirim Pengajuan Agen Resmi Nusavara Berhasil!" : "Official Agent Application Submitted Successfully!", "success");
    }
  };

  // Form submit corporate inquiry
  const handleCorporateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corpCompany || !corpContact || !corpEmail) {
      if (showToast) {
        showToast(lang === "id" ? "Mohon isi seluruh data kemitraan corporate!" : "Please fill out all corporate inquiry data!", "warning");
      } else {
        alert(lang === "id" ? "Mohon isi seluruh data kemitraan corporate!" : "Please fill out all corporate inquiry data!");
      }
      return;
    }

    const newInq: CorporateInquiry = {
      id: `cor-${Date.now()}`,
      company: corpCompany,
      contact_person: corpContact,
      email: corpEmail,
      phone: "+6281234567890",
      event_purpose: "Custom Event Corporate Gift",
      budget_per_package: Number(corpBudget),
      quantity: Number(corpQty),
      custom_logo: true,
      delivery_date: "2026-09-30",
      status: "New Inquiry"
    };

    onAddInquiry(newInq);
    setCorpCompany("");
    setCorpContact("");
    setCorpEmail("");
    setCorporateSuccess(true);

    if (showToast) {
      showToast(lang === "id" ? "Ajukan Penawaran Harga Corporate Berhasil!" : "Corporate Quotation Requested Successfully!", "success");
    }
  };

  // Order tracking solver
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find((o) => o.order_number.toUpperCase() === trackId.trim().toUpperCase());
    if (found) {
      setTrackingResult(found);
    } else {
      setTrackingResult(null);
      alert(lang === "id" ? "Nomor pesanan tidak terdaftar atau sedang dalam persiapan sistem." : "Order number is not registered or is currently in preparation.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left font-sans space-y-8">
      
      {/* 1. LOOKBOOK DROP & PRE-ORDER BATCHES */}
      {view === "limited-drop" && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 dark:text-amber-400 font-bold block">EDITORIAL REVELATIONS</span>
            <h1 className="text-3xl font-black text-stone-950 dark:text-white font-serif" style={{ fontFamily: currentTemplate.headingFont }}>
              {t("lookbookTitle")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm max-w-xl mx-auto">
              {t("lookbookSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 border border-stone-200 dark:border-stone-800 rounded-2xl bg-stone-50 dark:bg-stone-900 space-y-4">
              <div className="flex justify-between items-center bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-850 p-3 rounded-lg">
                <div>
                  <strong className="block text-stone-900 dark:text-white font-serif">{t("batch01Title")}</strong>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase block mt-1">{t("batch01Quota")}</span>
                </div>
                <span className="px-2 py-0.5 bg-amber-400 text-stone-950 font-mono text-[9px] font-bold uppercase">{t("statusOpen")}</span>
              </div>
              
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {t("batch01Desc")}
              </p>

              <div className="space-y-2 border-l-2 border-stone-300 dark:border-stone-700 pl-3">
                <div className="text-[11px] text-stone-700 dark:text-stone-300"><span className="font-bold">{t("batch01Prod")}</span> 16 Juli - 30 Juli 2026</div>
                <div className="text-[11px] text-stone-700 dark:text-stone-300"><span className="font-bold">{t("batch01Delivery")}</span> 5 Agustus 2026</div>
              </div>
            </div>

            <div className="p-5 border border-stone-200 dark:border-stone-800 rounded-2xl bg-stone-50 dark:bg-stone-900 space-y-4">
              <div className="flex justify-between items-center bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-850 p-3 rounded-lg">
                <div>
                  <strong className="block text-stone-900 dark:text-white font-serif">{t("batch02Title")}</strong>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase block mt-1">{t("batch02Quota")}</span>
                </div>
                <span className="px-2 py-0.5 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-[9px] font-bold uppercase">{t("statusSoon")}</span>
              </div>
              
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {t("batch02Desc")}
              </p>

              <div className="space-y-2 border-l-2 border-stone-300 dark:border-stone-700 pl-3">
                <div className="text-[11px] text-stone-700 dark:text-stone-300"><span className="font-bold">{lang === "id" ? "Proses Fitting:" : "Fitting Process:"}</span> 1 Agustus - 10 Agustus</div>
                <div className="text-[11px] text-stone-700 dark:text-stone-300"><span className="font-bold">{lang === "id" ? "Produksi & Kirim:" : "Production & Shipping:"}</span> 20 Agustus 2026</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROGRAM RESELLER REGISTRATION */}
      {view === "reseller" && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C35232] dark:text-amber-550 font-bold block">B2B ALLIANCE PROGRAM</span>
            <h1 className="text-3xl font-black text-stone-950 dark:text-white" style={{ fontFamily: currentTemplate.headingFont }}>
              {t("resellerTitle")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm max-w-xl mx-auto">
              {t("resellerSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
            
            <div className="md:col-span-4 space-y-4 text-xs leading-normal">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-250 dark:border-amber-900/30 text-amber-950 dark:text-amber-200 space-y-2">
                <span className="font-bold block text-sm">{t("benefitTitle")}</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>{t("benefit1")}</li>
                  <li>{t("benefit2")}</li>
                  <li>{t("benefit3")}</li>
                  <li>{t("benefit4")}</li>
                </ul>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 space-y-1">
                <span className="font-bold block text-stone-900 dark:text-white">{t("requisiteTitle")}</span>
                <p>{t("requisiteDesc")}</p>
              </div>
            </div>

            {/* Application form */}
            {resellerSuccess ? (
              <div className="md:col-span-8 p-8 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 rounded-2xl text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                  <ClipboardCheck className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-stone-900 dark:text-white" style={{ fontFamily: currentTemplate.headingFont }}>
                    {t("successResellerTitle")}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed max-w-md mx-auto font-sans">
                    {t("successResellerDesc")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setResellerSuccess(false)}
                  className="px-4 py-2 border border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100 hover:bg-stone-900 dark:hover:bg-stone-100 hover:text-white dark:hover:text-stone-950 font-mono text-[10px] font-bold uppercase rounded-md tracking-wider transition-all cursor-pointer"
                >
                  {t("btnNewApplication")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleResellerSubmit} className="md:col-span-8 p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">{t("formResellerTitle")}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-stone-700 dark:text-stone-300">
                  <div>
                    <label className="block mb-1 font-bold pl-1 uppercase text-[10px] text-stone-700 dark:text-stone-300">{t("labelBoutique")}</label>
                    <input
                      type="text"
                      required
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      placeholder={t("placeholderBoutique")}
                      className="w-full border border-stone-200 dark:border-stone-700 p-2.5 rounded bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:border-stone-950 dark:focus:border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold pl-1 uppercase text-[10px] text-stone-700 dark:text-stone-300">{t("labelOwner")}</label>
                    <input
                      type="text"
                      required
                      value={resOwner}
                      onChange={(e) => setResOwner(e.target.value)}
                      placeholder={t("placeholderOwner")}
                      className="w-full border border-stone-200 dark:border-stone-700 p-2.5 rounded bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:border-stone-950 dark:focus:border-stone-300"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block mb-1 font-bold pl-1 uppercase text-[10px] text-stone-700 dark:text-stone-300">{t("labelCity")}</label>
                    <select
                      value={resCity}
                      onChange={(e) => setResCity(e.target.value)}
                      className="w-full border border-stone-200 dark:border-stone-700 p-2.5 rounded bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:border-stone-950 dark:focus:border-stone-300 cursor-pointer"
                    >
                      <option value="Jakarta">Jakarta Raya</option>
                      <option value="Bandung">Bandung (Jawa Barat)</option>
                      <option value="Surabaya">Surabaya</option>
                      <option value="Yogyakarta">Yogyakarta Kota</option>
                      <option value="Medan">Medan</option>
                    </select>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block mb-1 font-bold pl-1 uppercase text-[10px] text-stone-700 dark:text-stone-300">{t("labelExperience")}</label>
                    <textarea
                      rows={3}
                      value={resExp}
                      onChange={(e) => setResExp(e.target.value)}
                      placeholder={t("placeholderExperience")}
                      className="w-full border border-stone-200 dark:border-stone-700 p-2.5 rounded bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:border-stone-950 dark:focus:border-stone-300"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-3 bg-stone-900 dark:bg-stone-100 border-stone-800 text-white dark:text-stone-950 font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 cursor-pointer transition-colors"
                >
                  {t("btnSubmitReseller")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. CORPORATE GIFTS & HAMPERS INQUIRIES */}
      {view === "corporate" && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#3B7A57] dark:text-emerald-450 font-bold block">ELITE GROUP SERVICE</span>
            <h1 className="text-3xl font-black text-stone-950 dark:text-white" style={{ fontFamily: currentTemplate.headingFont }}>
              {t("corpTitle")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm max-w-xl mx-auto">
              {t("corpSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
            
            {corporateSuccess ? (
              <div className="md:col-span-8 p-8 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 rounded-2xl text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-stone-900 dark:text-white" style={{ fontFamily: currentTemplate.headingFont }}>
                    {t("successCorpTitle")}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed max-w-md mx-auto font-sans">
                    {t("successCorpDesc")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCorporateSuccess(false)}
                  className="px-4 py-2 border border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100 hover:bg-stone-900 dark:hover:bg-stone-100 hover:text-white dark:hover:text-stone-950 font-mono text-[10px] font-bold uppercase rounded-md tracking-wider transition-all cursor-pointer"
                >
                  {t("btnNewInquiry")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleCorporateSubmit} className="md:col-span-8 p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xs space-y-4 text-xs font-medium text-stone-700 dark:text-stone-300">
                <h3 className="text-sm font-bold uppercase text-stone-900 dark:text-white pl-1 tracking-wider">{t("formCorpTitle")}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-extrabold uppercase text-[10px] text-stone-700 dark:text-stone-300">{t("labelCompany")}</label>
                    <input
                      type="text"
                      required
                      value={corpCompany}
                      onChange={(e) => setCorpCompany(e.target.value)}
                      placeholder={t("placeholderCompany")}
                      className="w-full border border-stone-200 dark:border-stone-700 p-2.5 rounded bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-stone-950 dark:focus:border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-extrabold uppercase text-[10px] text-stone-700 dark:text-stone-300">{t("labelContact")}</label>
                    <input
                      type="text"
                      required
                      value={corpContact}
                      onChange={(e) => setCorpContact(e.target.value)}
                      placeholder={t("placeholderContact")}
                      className="w-full border border-stone-200 dark:border-stone-700 p-2.5 rounded bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-stone-950 dark:focus:border-stone-300"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block mb-1 font-extrabold uppercase text-[10px] text-stone-700 dark:text-stone-300">{t("labelCorpEmail")}</label>
                    <input
                      type="email"
                      required
                      value={corpEmail}
                      onChange={(e) => setCorpEmail(e.target.value)}
                      placeholder={t("placeholderCorpEmail")}
                      className="w-full border border-stone-200 dark:border-stone-700 p-2.5 rounded bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-stone-950 dark:focus:border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-extrabold uppercase text-[10px] text-stone-700 dark:text-stone-300">{t("labelBudget")}</label>
                    <select
                      value={corpBudget}
                      onChange={(e) => setCorpBudget(Number(e.target.value))}
                      className="w-full border border-stone-200 dark:border-stone-700 p-2.5 rounded bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-stone-950 dark:focus:border-stone-300 cursor-pointer"
                    >
                      <option value={200000}>{lang === "id" ? "Rp 200.000 / Boks Paket" : "IDR 200,000 / Box Set"}</option>
                      <option value={350000}>{lang === "id" ? "Rp 350.000 (Terlaris: Wellness Kit)" : "IDR 350,000 (Best Seller: Wellness Kit)"}</option>
                      <option value={500000}>{lang === "id" ? "Rp 500.000+ (Mewah Royal Set)" : "IDR 500,000+ (Luxurious Royal Set)"}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-extrabold uppercase text-[10px] text-stone-700 dark:text-stone-300">{t("labelQty")}</label>
                    <input
                      type="number"
                      value={corpQty}
                      onChange={(e) => setCorpQty(Number(e.target.value))}
                      className="w-full border border-stone-200 dark:border-stone-700 p-2.5 rounded bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-stone-950 dark:focus:border-stone-300"
                    />
                  </div>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-950 border border-stone-150 dark:border-stone-850 rounded-lg space-y-1 font-mono text-[10px] text-stone-500 dark:text-stone-400">
                  <p>{t("customNote")}</p>
                </div>

                <button
                  type="submit"
                  className="px-5 py-3 bg-stone-900 dark:bg-stone-100 border-stone-800 text-white dark:text-stone-950 font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-stone-850 dark:hover:bg-stone-200 cursor-pointer transition-colors"
                >
                  {t("btnSubmitCorp")}
                </button>
              </form>
            )}

            <div className="md:col-span-4 p-5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl text-xs leading-relaxed space-y-3 text-stone-700 dark:text-stone-300">
              <span className="font-bold text-stone-900 dark:text-white uppercase block">{t("giftSetsTitle")}</span>
              <ul className="list-decimal pl-4 space-y-2 text-stone-600 dark:text-stone-400">
                <li>
                  <strong className="text-stone-900 dark:text-stone-200">Wellness Kit:</strong>{" "}
                  {lang === "id" ? "Teh herbal Temu Glow, gelas raga, aromaterapi sage. (Rp 350k)" : "Temu Glow herbs tea, wellness clay mug, aromatherapy sage. (IDR 350k)"}
                </li>
                <li>
                  <strong className="text-stone-900 dark:text-stone-200">Sutra Heritage:</strong>{" "}
                  {lang === "id" ? "Batik sutra tenun jember premium, aksesoris sabun artisanal organic. (Rp 550k)" : "Premium Jember woven silk batik, organic artisanal soap. (IDR 550k)"}
                </li>
                <li>
                  <strong className="text-stone-900 dark:text-stone-200">Home Sanctuary:</strong>{" "}
                  {lang === "id" ? "Lilin aromaterapi murni, wadah kriya Yogyakarta, taplak tenun. (Rp 400k)" : "Pure aromatherapy candle, Yogyakarta craft pot, woven tablecloth. (IDR 400k)"}
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* 4. CLINICAL SKINCARE ROUTINE INFORMATION */}
      {view === "skincare-routine" && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#3B7A57] dark:text-emerald-450 font-bold block">SCIENCE BASED DICTIONARY</span>
            <h1 className="text-3xl font-black text-stone-950 dark:text-white font-serif" style={{ fontFamily: currentTemplate.headingFont }}>
              {lang === "id" ? "Kamus Rutinitas & Kandungan Skincare" : "Skincare Routine & Ingredients Dictionary"}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm">
              {lang === "id" ? "Edukasi bahan aktif Ceramide NP, Centella Asiatica demi kecocokan barrier kulit sehat harian." : "Learn about Ceramide NP and Centella Asiatica for dynamic skin barrier health."}
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="p-4 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <span className="font-extrabold text-sm block text-emerald-950 dark:text-emerald-300">
                {lang === "id" ? "Aman Bagi Skin Barrier: Terdaftar BPOM" : "Skin Barrier Safe: BPOM Registered"}
              </span>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                {lang === "id" 
                  ? "Nusavara memastikan bahan pengawet kasar seperti paraben keras dibuang sepenuhnya. Struktur Ceramide NP mengunci anyaman protein lemak alami wajah harian."
                  : "Nusavara ensures harsh chemical preservatives like parabens are eliminated. Ceramide NP structure safely locks daily face lipids."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-xl text-xs space-y-1">
                <strong className="block text-stone-900 dark:text-white">
                  {lang === "id" ? "1. Ceramide NP (Komposisi Alami)" : "1. Ceramide NP (Natural Formulation)"}
                </strong>
                <p className="text-stone-600 dark:text-stone-400">
                  {lang === "id" 
                    ? "Pelindung fungsional yang merekatkan sel stratum korneum agar tidak kering mengelupas."
                    : "Functional lipids that bond cells within the stratum corneum, preventing peeling or dry spots."}
                </p>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-xl text-xs space-y-1">
                <strong className="block text-stone-900 dark:text-white">
                  {lang === "id" ? "2. Centella Asiatica (Ekstrak Lokal Jawa)" : "2. Centella Asiatica (Javanese Organic Extract)"}
                </strong>
                <p className="text-stone-600 dark:text-stone-400">
                  {lang === "id" 
                    ? "Herbal pegagan pegunungan menenangkan ruam kulit pasca terpapar matahari tropis ekstrem."
                    : "Highlands Centella asiatica soothe redness or reactive skin exposed to harsh tropical elements."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. LEGAL & COMPLIANCE TRUST CENTER */}
      {view === "compliance" && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-800 dark:text-emerald-450 font-bold block">TRUST CENTER PLATFORM</span>
            <h1 className="text-3xl font-black text-stone-900 dark:text-white" style={{ fontFamily: currentTemplate.headingFont }}>
              {t("complianceTitle")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm max-w-xl mx-auto">
              {t("complianceSubtitle")}
            </p>
          </div>

          {/* Quick Order Trace lookup functionality */}
          <div className="p-5 border bg-[#FAF7F2] dark:bg-stone-900 border-amber-300/60 dark:border-stone-800 rounded-2xl space-y-4">
            <span className="block text-[11px] font-mono text-amber-950 dark:text-amber-300 font-bold uppercase flex items-center gap-1">
              <Search className="w-4 h-4 text-[#C35232] dark:text-amber-500 animate-bounce" /> {t("trackTitle")}
            </span>
            
            <form onSubmit={handleTrackOrder} className="flex gap-2">
              <input
                type="text"
                required
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder={t("trackPlaceholder")}
                className="flex-1 border border-stone-200 dark:border-stone-700 p-2 px-3 text-xs outline-none uppercase rounded bg-white dark:bg-stone-800 text-stone-950 dark:text-stone-100 focus:border-stone-900 dark:focus:border-stone-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 dark:bg-stone-100 hover:bg-stone-850 dark:hover:bg-stone-200 text-white dark:text-stone-950 font-mono text-xs font-bold uppercase rounded cursor-pointer transition-colors"
              >
                {t("btnTrack")}
              </button>
            </form>

            {trackingResult ? (
              <div className="p-4 bg-white dark:bg-stone-950 border border-amber-250 dark:border-stone-800 rounded-xl text-xs font-sans text-stone-700 dark:text-stone-300 space-y-2">
                <div className="flex justify-between items-center border-b border-stone-150 dark:border-stone-800 pb-1.5">
                  <strong className="text-stone-950 dark:text-white">{t("orderId")} {trackingResult.order_number}</strong>
                  <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 rounded font-black text-[9px] font-mono">
                    {t("status")} {trackingResult.order_status.toUpperCase()}
                  </span>
                </div>
                <p><strong>{t("recipient")}</strong> {trackingResult.customer}</p>
                <p><strong>{t("courier")}</strong> {trackingResult.courier} Express</p>
                {trackingResult.tracking_number ? (
                  <p><strong>{t("trackingNo")}</strong> <span className="font-mono bg-stone-100 dark:bg-stone-800 p-1 rounded border border-stone-200 dark:border-stone-700 font-bold text-stone-950 dark:text-stone-100">{trackingResult.tracking_number}</span></p>
                ) : (
                  <p className="text-rose-700 dark:text-rose-400 italic">"{t("orderPreparation")}"</p>
                )}
                <p className="font-black text-xs text-stone-950 dark:text-white pt-1.5 border-t border-stone-150 dark:border-stone-850">
                  {lang === "id" ? `Total Dibayarkan: Rp ${trackingResult.total.toLocaleString()}` : `Total Paid: IDR ${trackingResult.total.toLocaleString()}`}
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-stone-500 dark:text-stone-400 italic pl-1">
                {t("trackNote")}
              </p>
            )}
          </div>

          <div className="space-y-3.5">
            <span className="block text-xs font-bold text-stone-900 dark:text-white uppercase">{t("certTitle")}</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {complianceDocs.map((rawDoc) => getLocalizedComplianceDoc(rawDoc, lang)).map((doc, idx) => (
                <div key={idx} className="p-4 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded uppercase">
                      {lang === "id" ? `Sertifikat ${doc.document_type} RI` : `Certified ${doc.document_type} RI`}
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">● {lang === "id" ? "Valid Aktif" : "Valid & Active"}</span>
                  </div>
                  <strong className="block text-stone-900 dark:text-white">{doc.product}</strong>
                  <p className="text-stone-500 dark:text-stone-400 font-mono">No: {doc.certificate_number}</p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    {lang === "id" ? `Diterbitkan Oleh: ${doc.issued_by}` : `Issued By: ${doc.issued_by}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. EDUCATIONAL BLOGS / READ STORY */}
      {view === "blog" && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C35232] dark:text-amber-550 font-bold block">EDUCATIONAL NOOK</span>
            <h1 className="text-3xl font-black text-stone-950 dark:text-white font-serif" style={{ fontFamily: currentTemplate.headingFont }}>
              {t("blogTitle")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm">
              {t("blogSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {blogs.map((rawBlog) => getLocalizedBlog(rawBlog, lang)).map((b) => (
              <div key={b.id} className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl hover:border-stone-500 dark:hover:border-stone-400 duration-300 space-y-3">
                <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-400 uppercase block">{b.category} | Post {b.date}</span>
                <h3 className="text-base font-black text-stone-950 dark:text-white font-serif" style={{ fontFamily: currentTemplate.headingFont }}>{b.title}</h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">{b.excerpt}</p>
                <button
                  onClick={() => alert(lang === "id" ? `Sedang membaca artikel menyeluruh "${b.title}" di kanal Nusavara Local Pride!` : `Opening educational article "${b.title}" in Nusavara Local Pride Hub.`)}
                  className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100 underline block cursor-pointer"
                >
                  {lang === "id" ? "Baca Selengkapnya →" : "Read Full Article →"}
                </button>
              </div>
            ))}
          </div>

          {/* Clean lists FAQs */}
          <div className="pt-8 border-t border-stone-200 dark:border-stone-850 space-y-4">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white uppercase tracking-wider text-center">{t("faqTitle")}</h3>
            <div className="space-y-3">
              {faqs.map((rawFAQ) => getLocalizedFAQ(rawFAQ, lang)).map((f) => (
                <div key={f.id} className="p-4 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs font-sans text-stone-700 dark:text-stone-300 leading-relaxed">
                  <p className="font-bold text-stone-900 dark:text-stone-100 mb-1">Q: {f.question}</p>
                  <p className="text-stone-600 dark:text-stone-400">A: {f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. CUSTOMER REGULAR ACCOUNT / MEMBERSHIP & LOYALTY */}
      {view === "account" && (() => {
        // High fidelity multilingual translation for simulated account view
        const tAcc = {
          id: {
            dashboard: "LOYAL MEMBER DASHBOARD",
            title: "Akun Member & Nusavara Loyalty",
            subtitle: "Raih poin loyalitas tinggi di setiap transaksi belanja kelipatan Rp 10.000 bersertifikat VVIP.",
            memberTier: "MEMBER TIER:",
            goldMember: "GOLD MEMBER",
            customerPatron: "NAMA PATRON PELANGGAN:",
            customerName: "Alya Rahmani (Jakarta Kota)",
            activePoints: "POIN AKTIF:",
            pointsVal: "870 Poin",
            redeemValue: "NILAI DISKON REDEEM LUNAS:",
            redeemVal: "Rp 435.000",
            benefitGold: "Benefit Gold: Early access terbatas preorder baru, potongan bebas ongkos kirim Biteship otomatis, diskon 5% member price di butik Nusavara Kemang.",
            simulatedHistory: "SIMULASI HISTORI PEMBELIAN TERAKHIR ANDA:",
            ref1: "Ref: NSV-ORD-1001",
            items1: "1x Serum Ceramide, 1x Jamu Temu Glow",
            price1: "Rp 474.000",
            status1: "Telah Terbayar",
            ref2: "Ref: NSV-ORD-0985",
            items2: "1x Aruna Outer Linen (Sage)",
            price2: "Rp 429.000",
            status2: "Selesai terkirim"
          },
          en: {
            dashboard: "LOYAL MEMBER DASHBOARD",
            title: "Member Account & Nusavara Loyalty",
            subtitle: "Earn high loyalty points on every purchase in multiples of Rp 10,000 with VVIP certification.",
            memberTier: "MEMBER TIER:",
            goldMember: "GOLD MEMBER",
            customerPatron: "CUSTOMER PATRON NAME:",
            customerName: "Alya Rahmani (Jakarta Kota)",
            activePoints: "ACTIVE POINTS:",
            pointsVal: "870 Points",
            redeemValue: "REDEEMED DISCOUNT VALUE:",
            redeemVal: "Rp 435,000",
            benefitGold: "Gold Benefit: Limited early access to new pre-orders, automatic free shipping via Biteship, 5% member price discount at Nusavara Kemang boutique.",
            simulatedHistory: "YOUR LATEST TRANSACTION SIMULATION:",
            ref1: "Ref: NSV-ORD-1001",
            items1: "1x Ceramide Serum, 1x Temu Glow Herbal Jamu",
            price1: "Rp 474,000",
            status1: "Paid",
            ref2: "Ref: NSV-ORD-0985",
            items2: "1x Aruna Outer Linen (Sage)",
            price2: "Rp 429,000",
            status2: "Delivered"
          },
          ar: {
            dashboard: "لوحة تحكم العضو الوفي",
            title: "حساب العضوية وولاء نوسافارا",
            subtitle: "احصل على نقاط ولاء عالية مع كل عملية شراء بمضاعفات 10,000 روبية بشهادة VVIP.",
            memberTier: "فئة العضوية:",
            goldMember: "عضو ذهبي",
            customerPatron: "اسم العميل المتميز:",
            customerName: "عليا رحماني (جاكرتا كوتا)",
            activePoints: "النقاط النشطة:",
            pointsVal: "870 نقطة",
            redeemValue: "قيمة خصم الاسترداد بالكامل:",
            redeemVal: "435,000 روبية",
            benefitGold: "المزايا الذهبية: وصول مبكر محدود للحجوزات الجديدة، شحن مجاني تلقائي عبر Biteship، خصم 5% على سعر الأعضاء في بوتيك نوسافارا كيمانغ.",
            simulatedHistory: "محاكاة آخر سجل معاملات لك:",
            ref1: "المرجع: NSV-ORD-1001",
            items1: "1x سيروم سيراميد، 1x مشروب تيمو جلو العشبي",
            price1: "474,000 روبية",
            status1: "مدفوع بالكامل",
            ref2: "المرجع: NSV-ORD-0985",
            items2: "1x عباءة أرونا الكتان (سيج)",
            price2: "429,000 روبية",
            status2: "تم التوصيل"
          },
          ja: {
            dashboard: "ロイヤルメンバーダッシュボード",
            title: "会員アカウント＆Nusavaraロイヤルティ",
            subtitle: "VVIP認定付きの10,000ルピアごとの購入で高ロイヤルティポイントを獲得できます。",
            memberTier: "メンバーティア:",
            goldMember: "ゴールドメンバー",
            customerPatron: "お客様パトロン名:",
            customerName: "Alya Rahmani（ジャカルタ市）",
            activePoints: "有効ポイント:",
            pointsVal: "870 ポイント",
            redeemValue: "還元割引総額:",
            redeemVal: "Rp 435,000",
            benefitGold: "ゴールド特典：新規先行予約への優先アクセス、Biteshipによる自動送料無料、Nusavaraクマンブティックでのメンバー価格5%オフ。",
            simulatedHistory: "最近のシミュレートされた購入履歴:",
            ref1: "参照: NSV-ORD-1001",
            items1: "1x セラミド美容液, 1x ハーブテムグロウ",
            price1: "Rp 474,000",
            status1: "お支払い済み",
            ref2: "参照: NSV-ORD-0985",
            items2: "1x Aruna リネンアウター（セージ）",
            price2: "Rp 429,000",
            status2: "配達完了"
          },
          ko: {
            dashboard: "로열 멤버 대시보드",
            title: "회원 계정 및 Nusavara 로열티",
            subtitle: "VVIP 인증이 포함된 10,000루피아 구매 시마다 높은 로열티 포인트가 적립됩니다.",
            memberTier: "멤버십 등급:",
            goldMember: "골드 회원",
            customerPatron: "고객 패트론 성함:",
            customerName: "알리야 라마니 (자카르타 시)",
            activePoints: "보유 포인트:",
            pointsVal: "870 포인트",
            redeemValue: "할인 혜택 누적가치:",
            redeemVal: "Rp 435,000",
            benefitGold: "골드 혜택: 신제품 한정 프리오더 우선 참여 권한, Biteship 연동 자동 무료 배송, Nusavara 크망 부티크 회원 전용 5% 특별 할인 제공.",
            simulatedHistory: "최근 시뮬레이션 구매 내역:",
            ref1: "참조: NSV-ORD-1001",
            items1: "1x 세라마이드 세럼, 1x 자무 테무 글로우",
            price1: "Rp 474,000",
            status1: "결제 완료",
            ref2: "참조: NSV-ORD-0985",
            items2: "1x 아루나 아우터 린넨 (세이지)",
            price2: "Rp 429,000",
            status2: "배송 완료"
          }
        };

        const activeT = tAcc[lang] || tAcc["id"];

        if (!currentUser) {
          return (
            <div className="space-y-8 animate-fade-in p-6 sm:p-10 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 max-w-md mx-auto rounded-3xl shadow-lg">
              <div className="text-center space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E0A72E] font-bold block">
                  NUSAVARA MEMBER PORTAL
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-white font-serif tracking-tight" style={{ fontFamily: currentTemplate.headingFont }}>
                  {authTab === "login" ? "Masuk Member" : "Daftar Member"}
                </h1>
                <p className="text-stone-500 dark:text-stone-400 text-xs">
                  {authTab === "login" 
                    ? "Masuk untuk mengakses poin loyalitas, diskon VVIP, dan histori pesanan Anda." 
                    : "Daftar gratis untuk langsung mendapatkan status Gold Member & 870 Poin gratis."}
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex border-b border-stone-150 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setAuthTab("login")}
                  className={`flex-1 py-2 text-xs font-bold tracking-wide border-b-2 font-mono transition-colors cursor-pointer ${
                    authTab === "login"
                      ? "border-amber-500 text-amber-500"
                      : "border-transparent text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  }`}
                >
                  MASUK / SIGN IN
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab("register")}
                  className={`flex-1 py-2 text-xs font-bold tracking-wide border-b-2 font-mono transition-colors cursor-pointer ${
                    authTab === "register"
                      ? "border-amber-500 text-amber-500"
                      : "border-transparent text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  }`}
                >
                  DAFTAR / SIGN UP
                </button>
              </div>

              {authTab === "login" ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-stone-500 uppercase font-bold">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="alya@nusavara.com"
                        className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-stone-900 dark:text-stone-100 outline-none focus:border-amber-500 dark:focus:border-amber-500/80 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-stone-500 uppercase font-bold">Kata Sandi</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-stone-900 dark:text-stone-100 outline-none focus:border-amber-500 dark:focus:border-amber-500/80 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
                      >
                        <span className="text-[10px] font-mono">{showPassword ? "HIDE" : "SHOW"}</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Masuk Sekarang
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
                    <span className="flex-shrink mx-4 text-[9px] text-stone-400 font-mono font-bold uppercase">Atau</span>
                    <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthEmail("alya@nusavara.com");
                      setAuthPassword("123456");
                      const demoUser: User = {
                        id: "MEMBER-ALYA-01",
                        name: "Alya Rahmani",
                        email: "alya@nusavara.com",
                        phone: "+62 812-3456-7890",
                        password: "123456",
                        points: 870,
                        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256",
                        memberSince: "Desember 2025"
                      };
                      onLogin(demoUser);
                    }}
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-850 text-white border border-stone-800 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    Masuk Instan (Akun Demo Alya)
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-stone-500 uppercase font-bold">Nama Lengkap</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="Aria Kusuma"
                        className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-stone-900 dark:text-stone-100 outline-none focus:border-amber-500 dark:focus:border-amber-500/80 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-stone-500 uppercase font-bold">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="aria@nusavara.com"
                        className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-stone-900 dark:text-stone-100 outline-none focus:border-amber-500 dark:focus:border-amber-500/80 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-stone-500 uppercase font-bold">Nomor Telepon</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                      <input
                        type="tel"
                        required
                        value={authPhone}
                        onChange={(e) => setAuthPhone(e.target.value)}
                        placeholder="08123456789"
                        className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-stone-900 dark:text-stone-100 outline-none focus:border-amber-500 dark:focus:border-amber-500/80 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-stone-500 uppercase font-bold">Kata Sandi</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-stone-900 dark:text-stone-100 outline-none focus:border-amber-500 dark:focus:border-amber-500/80 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
                      >
                        <span className="text-[10px] font-mono">{showPassword ? "HIDE" : "SHOW"}</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Daftar Akun Baru
                  </button>
                </form>
              )}
            </div>
          );
        }

        // -- LOGGED IN VIEWPORT --
        const isDefaultAlya = user.id === "MEMBER-ALYA-01" || user.name.toLowerCase().includes("alya");
        
        // Premium adaptive styling for cards
        const cardBg = isDefaultAlya 
          ? "bg-[#0C0C0C] text-stone-100 border border-stone-800" 
          : "bg-stone-50 dark:bg-[#0C0C0C] text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 shadow-md";
        
        const labelColor = isDefaultAlya 
          ? "text-stone-400" 
          : "text-stone-500 dark:text-stone-400";

        const subLabelColor = isDefaultAlya 
          ? "text-stone-500" 
          : "text-stone-400 dark:text-stone-500";

        const textColor = isDefaultAlya 
          ? "text-white" 
          : "text-stone-950 dark:text-white";

        const dividerColor = isDefaultAlya 
          ? "border-[#222222]" 
          : "border-stone-200 dark:border-[#222222]";

        return (
          <div className="space-y-12 animate-fade-in p-6 sm:p-10 bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-850 text-stone-900 dark:text-stone-100 max-w-5xl mx-auto rounded-3xl shadow-sm dark:shadow-none">
            
            {/* Header */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-[#E0A72E] font-bold block">
                {activeT.dashboard}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 dark:text-white font-serif tracking-tight" style={{ fontFamily: currentTemplate.headingFont }}>
                {activeT.title}
              </h1>
              <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                {activeT.subtitle}
              </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 text-left">
              
              {/* Left Column: Member Card (STAYS DARK PREMIUM IF ALYA, ELSE ADAPTS!) */}
              <div className="lg:col-span-5 w-full">
                <div className={`${cardBg} p-6 sm:p-7 rounded-[28px] space-y-6 relative overflow-hidden`}>
                  
                  {/* Member Tier Section */}
                  <div className="flex justify-between items-center">
                    <span className={`font-mono text-[9px] ${labelColor} font-bold uppercase tracking-wider`}>
                      {activeT.memberTier}
                    </span>
                    <span className="bg-[#FBBF24] text-[#0C0C0C] px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-sm font-mono">
                      {activeT.goldMember}
                    </span>
                  </div>

                  {/* Name Panel */}
                  <div className="space-y-1 pt-2">
                    <span className={`block text-[9px] ${subLabelColor} font-mono tracking-widest uppercase`}>
                      {activeT.customerPatron}
                    </span>
                    <div className="flex items-center gap-3">
                      {user.photoUrl && (
                        <img 
                          src={user.photoUrl} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div>
                        <h2 className={`text-2xl sm:text-3xl font-serif font-bold ${textColor} tracking-wide`}>
                          {isDefaultAlya ? activeT.customerName : user.name}
                        </h2>
                        <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                          {user.email} • {user.phone || "+62 812-3456-7890"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`border-t ${dividerColor}`} />

                  {/* Points & Discount */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className={`block text-[9px] ${subLabelColor} font-mono tracking-wider uppercase`}>
                        {activeT.activePoints}
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold font-mono text-[#E0A72E] block tracking-tight">
                        {user.points || 870} Poin
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className={`block text-[9px] ${subLabelColor} font-mono tracking-wider uppercase`}>
                        {activeT.redeemValue}
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold font-mono text-[#E0A72E] block tracking-tight">
                        Rp {((user.points || 870) * 500).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`border-t ${dividerColor}`} />

                  {/* Benefit description */}
                  <p className={`text-[11px] ${labelColor} leading-relaxed font-mono`}>
                    <span className="text-[#E0A72E] mr-1">★</span> {activeT.benefitGold}
                  </p>

                  {/* Logout Button */}
                  <button
                    onClick={onLogout}
                    className="w-full mt-4 py-2 bg-rose-600/15 hover:bg-rose-600 hover:text-white text-rose-500 dark:text-rose-400 font-bold font-mono text-[10px] uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar Akun Member</span>
                  </button>

                </div>
              </div>

              {/* Right Column: Transaction History */}
              <div className="lg:col-span-7 space-y-4">
                <span className="block text-[10px] font-extrabold text-stone-600 dark:text-stone-400 uppercase tracking-widest font-mono">
                  {activeT.simulatedHistory}
                </span>

                <div className="space-y-3 font-mono">
                  
                  {/* Item 1 */}
                  <div className="p-5 bg-white dark:bg-[#141414]/40 border border-stone-200 dark:border-[#222222] rounded-[18px] flex justify-between items-center transition-all hover:bg-stone-50 dark:hover:bg-[#141414] duration-200 shadow-xs dark:shadow-none">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-900 dark:text-white text-sm font-bold">{activeT.ref1}</span>
                      </div>
                      <span className="block text-xs text-stone-600 dark:text-stone-400 font-sans">
                        {activeT.items1}
                      </span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="block font-bold text-stone-900 dark:text-white text-sm">{activeT.price1}</span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 block font-sans font-medium">{activeT.status1}</span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-5 bg-white dark:bg-[#141414]/40 border border-stone-200 dark:border-[#222222] rounded-[18px] flex justify-between items-center transition-all hover:bg-stone-50 dark:hover:bg-[#141414] duration-200 shadow-xs dark:shadow-none">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-900 dark:text-white text-sm font-bold">{activeT.ref2}</span>
                      </div>
                      <span className="block text-xs text-stone-600 dark:text-stone-400 font-sans">
                        {activeT.items2}
                      </span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="block font-bold text-stone-900 dark:text-white text-sm">{activeT.price2}</span>
                      <span className="text-xs text-stone-500 dark:text-stone-400 block font-sans font-medium">{activeT.status2}</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        );
      })()}

    </div>
  );
}
