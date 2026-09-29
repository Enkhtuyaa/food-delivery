"use client";
import { Plus, Minus, Check, X } from "lucide-react";

export default function DetailModal({
  detailFood,
  detailQty,
  setDetailQty,
  isInCart,
  closeDetail,
  handleDetailConfirm,
  handleDetailRemove,
}) {
  if (!detailFood) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
      onClick={closeDetail}
    >
      <div
        className="relative w-[397px] max-w-[90vw] bg-white rounded-2xl p-4 flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow"
          onClick={closeDetail}
        >
          <X size={16} />
        </button>

        <img
          src={detailFood.imageURL}
          alt={detailFood.foodName}
          className="w-full h-[235px] object-cover rounded-lg"
        />

        <div className="flex justify-between items-center">
          <p className="font-bold text-red-500">{detailFood.foodName}</p>
          <p className="font-bold">${detailFood.price}</p>
        </div>
        <p className="font-medium">{detailFood.ingredients}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            <button
              className="w-[36px] h-[36px] rounded-full border flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => setDetailQty((q) => Math.max(1, q - 1))}
              disabled={detailQty <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="font-bold w-6 text-center">{detailQty}</span>
            <button
              className="w-[36px] h-[36px] rounded-full border flex items-center justify-center cursor-pointer"
              onClick={() => setDetailQty((q) => q + 1)}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Нийт үнэ</p>
            <p className="font-bold text-lg">
              ${(Number(detailFood.price) * detailQty).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          {isInCart(detailFood._id) && (
            <button
              className="px-4 py-2 rounded-lg border cursor-pointer"
              onClick={handleDetailRemove}
            >
              Хасах
            </button>
          )}
          <button
            className="flex-1 px-4 py-2 rounded-lg bg-black text-white flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleDetailConfirm}
          >
            <Check size={16} />
            {isInCart(detailFood._id) ? "Шинэчлэх" : "Сагсанд нэмэх"}
          </button>
        </div>
      </div>
    </div>
  );
}