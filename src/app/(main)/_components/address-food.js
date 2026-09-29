"use client";
import { Check } from "lucide-react";

export default function AddressModal({
  isOpen,
  setIsOpen,
  selectedFood,
  address,
  setAddress,
  handleSaveAddress,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-[502px] max-w-[90vw] bg-white rounded-2xl p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">Хүргэлтийн хаяг</h2>

        {selectedFood && (
          <p className="text-gray-600">
            {selectedFood.foodName} - ${selectedFood.price}
          </p>
        )}

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Хаягаа оруулна уу..."
          className="w-full h-[120px] border rounded-lg p-3 resize-none outline-none"
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Болих
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-black text-white flex items-center gap-2 cursor-pointer"
            onClick={handleSaveAddress}
          >
            <Check size={16} />
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}