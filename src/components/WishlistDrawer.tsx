/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Heart, ShoppingBag, Eye, Trash2, Flower } from "lucide-react";
import { Product } from "../types";
import { DesignTemplate } from "../data/seedData";

interface WishlistDrawerProps {
  wishlist: string[];
  products: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
  currentTemplate: DesignTemplate;
  themeMode?: "light" | "dark";
}

export default function WishlistDrawer({
  wishlist,
  products,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onOpenProductDetail,
  currentTemplate,
  themeMode
}: WishlistDrawerProps) {
  
  // Resolve product details
  const likedProducts = products.filter((p) => wishlist.includes(p.id));

  // Visual helper for thumbnail fallback representing item style
  const renderThumbnail = (type: string) => {
    const imagesMap = {
      fashion: "from-stone-200 to-stone-400 border-stone-300 dark:from-stone-800 dark:to-stone-700 dark:border-stone-600",
      skincare: "from-emerald-50 to-emerald-200 border-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/40 dark:border-emerald-800",
      herbal: "from-amber-50 to-amber-200 border-amber-100 dark:from-amber-950/40 dark:to-amber-900/40 dark:border-amber-800",
      craft: "from-[#F9EFE9] to-[#E3CEC0] border-[#D5B5A4] dark:from-[#3a2d26] dark:to-[#4e3c33] dark:border-[#5a463c]",
      gift: "from-indigo-50 to-indigo-200 border-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/40 dark:border-indigo-850",
      sustainable: "from-slate-100 to-slate-350 border-slate-200 dark:from-slate-800 dark:to-slate-700 dark:border-slate-600"
    };
    const styleStr = imagesMap[type as keyof typeof imagesMap] || "from-stone-100 to-stone-200 border-stone-200 dark:from-stone-800 dark:to-stone-900 dark:border-stone-700";

    return (
      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br flex items-center justify-center p-2 border ${styleStr} shrink-0`}>
        {type === "herbal" ? (
          <Flower className="w-6 h-6 text-amber-800 dark:text-amber-400 opacity-80" />
        ) : (
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-stone-600 dark:text-stone-300">
            {type.substring(0, 4)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex justify-end ${themeMode === "dark" ? "dark" : ""}`}>
      <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative border-l border-stone-200 dark:border-stone-800">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
            <h3 className="text-sm sm:text-base font-black tracking-tight text-stone-900 dark:text-white" style={{ fontFamily: currentTemplate.headingFont }}>
              Koleksi Favorit Saya
            </h3>
            <span className="bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
              {likedProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-full cursor-pointer text-stone-800 dark:text-stone-200 transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-left">
          {likedProducts.length === 0 ? (
            <div className="text-center py-20 px-4 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-400 dark:text-rose-500">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-stone-800 dark:text-stone-200 text-sm">Belum Ada Produk Terfavorit</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
                  Ketuk ikon hati pada produk di katalog untuk menyimpan produk kriya, herbal, dan busana favorit Anda di sini.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-950 font-mono text-[11px] font-bold uppercase rounded-md tracking-wider transition-all cursor-pointer"
              >
                Eksplor Produk Lokal
              </button>
            </div>
          ) : (
            <div className="space-y-3.5 divide-y divide-stone-100 dark:divide-stone-800">
              {likedProducts.map((prod, idx) => {
                const discount = prod.discount_price !== null;
                const activePrice = prod.discount_price || prod.price;

                return (
                  <div
                    key={prod.id}
                    className={`flex items-start gap-3.5 pt-3.5 ${idx === 0 ? "pt-0 border-t-0" : "border-t"}`}
                  >
                    {/* Image / Thumbnail Fallback */}
                    <div 
                      onClick={() => {
                        onOpenProductDetail(prod);
                        onClose();
                      }}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      {renderThumbnail(prod.image || "fashion")}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="text-[9px] font-mono font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest block">
                            {prod.subcategory}
                          </span>
                          <h4 
                            onClick={() => {
                              onOpenProductDetail(prod);
                              onClose();
                            }}
                            className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white truncate hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors"
                          >
                            {prod.name}
                          </h4>
                        </div>

                        {/* Unlike Icon Button */}
                        <button
                          onClick={() => onToggleWishlist(prod)}
                          className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded text-rose-600 cursor-pointer transition-colors"
                          title="Hapus dari Favorit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price area */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400 font-mono">
                          Rp {activePrice.toLocaleString("id-ID")}
                        </span>
                        {discount && (
                          <span className="text-[10px] sm:text-xs text-stone-400 dark:text-stone-500 line-through font-mono">
                            Rp {prod.price.toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>

                      {/* Action buttons under details */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => {
                            onOpenProductDetail(prod);
                            onClose();
                          }}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 border border-stone-200 dark:border-stone-750 hover:border-stone-900 dark:hover:border-stone-100 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded text-[10px] font-bold uppercase transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Detail</span>
                        </button>
                        <button
                          onClick={() => {
                            onAddToCart(prod, 1);
                          }}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-900 hover:bg-stone-850 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-950 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>+ Keranjang</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info/prompt */}
        <div className="p-4 border-t border-stone-150 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-center text-[11px] text-stone-500 dark:text-stone-400">
          <p>Terima kasih telah mendukung pengrajin & produsen lokal Indonesia.</p>
        </div>

      </div>
    </div>
  );
}
