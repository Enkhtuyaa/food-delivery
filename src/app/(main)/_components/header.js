"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  MapPin,
  ChevronRight,
  User,
  X,
  Trash2,
} from "lucide-react";
import { useCart } from "@/app/(main)/_components/cart-context";
export default function Header() {
  const { cart, totalCount, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <header className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-20 h-[68px] flex justify-between items-center">
        {/* Лого хэсэг */}
        <div className="w-[146px] h-[44px] flex items-center gap-1">
          <Image src="/trace.png" alt="trace" width={46} height={37} priority />
          <div className="flex flex-col leading-tight">
            <div className="flex text-lg">
              <span className="font-bold text-white">Nom</span>
              <span className="font-bold text-red-500">Nom</span>
            </div>
            <p className="text-xs font-normal text-white">Swift delivery</p>
          </div>
        </div>

        {/* Хэрэглэгчийн тохиргоо болон сагс */}
        <div className="flex gap-3 items-center">
          <div className="h-[36px] px-3 rounded-full bg-white flex gap-1 justify-center items-center text-sm cursor-pointer">
            <MapPin size={16} />
            <p className="font-normal text-red-500">Delivery address:</p>
            <p className="font-normal text-gray-400">Add location</p>
            <ChevronRight size={16} />
          </div>

          {/* Сагсны товчлуур */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-[36px] h-[36px] rounded-full bg-white flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={16} />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>

          {/* Хэрэглэгчийн товчлуур */}
          <button 
            className="w-[36px] h-[36px] rounded-full bg-red-500 flex justify-center items-center text-white"
            aria-label="Profile"
          >
            <User size={16} />
          </button>
        </div>
      </div>

      {/* Сагсны Drawer (Drawer Modal) */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[70] flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-[400px] max-w-[90vw] h-full bg-white p-5 flex flex-col gap-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Сагс ({totalCount})</h2>
              <button
                className="cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                onClick={() => setIsCartOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3">
              {cart.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">Сагс хоосон байна</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex gap-3 items-center border-b pb-3"
                  >
                    <img
                      src={item.imageURL || "/placeholder.png"}
                      alt={item.foodName}
                      className="w-[64px] h-[64px] object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-red-500">{item.foodName}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                    <button
                      className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-2"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Нийт</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}