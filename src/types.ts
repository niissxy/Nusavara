/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = "id" | "en" | "ar" | "ja" | "ko";

export type ThemeMode = "light" | "dark" | "auto";

export interface BrandSettings {
  brand_name: string;
  tagline: string;
  industry: string;
  default_language: LanguageCode;
  supported_languages: string[];
  currency: string;
  country: string;
  city: string;
  whatsapp: string;
  email: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  address: string;
  theme_mode: ThemeMode[];
}

export interface ProductCategory {
  name: string;
  slug: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  discount_price: number | null;
  badge: string[];
  stock_status: "Available" | "Low Stock" | "Pre-Order" | "Out of Stock";
  stock: number;
  description: string;
  material?: string;
  color?: string[];
  size?: string[];
  fit?: string;
  care_instruction?: string;
  collection?: string;
  preorder?: boolean;
  weight_gram: number;
  rating: number;
  skin_type?: string[];
  skin_concern?: string[];
  ingredients?: string[];
  bpom_number?: string;
  halal_certificate?: string;
  usage?: string;
  patch_test_note?: string;
  expiry_date?: string;
  batch_code?: string;
  legal_number?: string;
  serving_suggestion?: string;
  contraindication?: string;
  artisan?: string;
  region?: string;
  production_timeline?: string;
  customization?: boolean;
  imperfection_note?: string;
  custom_packaging?: boolean;
  minimum_order?: number;
  delivery_date_option?: boolean;
  corporate_logo_option?: boolean;
  impact_note?: string;
  image?: string; // We will generate placeholder product images or load premium vector drawings/icons
}

export interface ProductCollection {
  name: string;
  slug: string;
  type: string;
  description: string;
  status: "Active" | "Pre-Order" | "Coming Soon";
}

export interface PreOrderBatch {
  id: string;
  batch_name: string;
  product: string;
  status: "Open" | "Coming Soon" | "Almost Full" | "Closed" | "In Production" | "Ready to Ship" | "Completed";
  quota: number;
  ordered: number;
  cut_off_date: string;
  production_start: string;
  estimated_shipping: string;
  payment_type: string;
  timeline: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  customer_status: "VIP" | "Repeat Buyer" | "First Purchase" | "New" | "Inactive" | "At Risk";
  total_orders: number;
  total_spent: number;
  loyalty_points: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum" | "VIP Circle";
  favorite_category: string;
  source: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface Order {
  order_number: string;
  customer: string;
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  payment_method: "QRIS" | "Virtual Account" | "E-Wallet" | "Credit Card" | "Manual Transfer";
  payment_status: "Pending" | "Paid" | "Failed" | "Refunded";
  order_status: "Pending Payment" | "Paid" | "Processing" | "Packed" | "Shipped" | "Delivered" | "Completed" | "Cancelled" | "Refund Requested" | "Returned" | "Pre-Order";
  courier: string;
  tracking_number: string | null;
  date: string;
}

export interface Voucher {
  code: string;
  type: "percentage" | "fixed" | "shipping_discount";
  value: number;
  minimum_purchase: number;
  usage_limit: number;
  status: "Active" | "Expired" | "Draft";
}

export interface Review {
  id: string;
  customer: string;
  product: string;
  rating: number;
  review: string;
  status: "Published" | "Pending" | "Spam";
}

export interface ResellerApplication {
  id: string;
  name: string;
  owner: string;
  city: string;
  sales_channel: string[];
  product_interest: string[];
  monthly_sales_estimate: string;
  experience: string;
  status: "New" | "Reviewed" | "Approved" | "Rejected" | "Active" | "Inactive";
}

export interface CorporateInquiry {
  id: string;
  company: string;
  contact_person: string;
  email: string;
  phone: string;
  event_purpose: string;
  budget_per_package: number;
  quantity: number;
  custom_logo: boolean;
  delivery_date: string;
  status: "New Inquiry" | "Contacted" | "Need Quotation" | "Quotation Sent" | "Negotiation" | "Deal Won" | "Deal Lost";
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  status: "Published" | "Draft";
  date: string;
}

export interface ComplianceDoc {
  id: string;
  document_type: string;
  product: string;
  certificate_number: string;
  issued_by: string;
  issue_date: string;
  expiry_date: string;
  status: "Valid" | "Expired" | "Under Review";
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface AdminUser {
  name: string;
  email: string;
  role: "Super Admin" | "Owner / Director" | "Store Manager" | "Product Admin" | "Order Admin" | "Finance Admin" | "Marketing Admin" | "Reseller Manager" | "Corporate Sales" | "Compliance Admin" | "Content Editor" | "Customer Support";
  password?: string;
  photoUrl?: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  photoUrl?: string;
  points: number;
  memberSince: string;
}

