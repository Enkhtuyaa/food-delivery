"use client";
import { Plus, Check } from "lucide-react";

export default function FoodCard({
  food,
  isInCart,
  openDetail,
  handleAddFoodClick,
}) {
  return (
    <div className="w-[397px] h-[342px] bg-white rounded-2xl p-4 shadow-md">
      <div className="relative">
        <img
          src={food.imageURL}
          alt={food.foodName}
          className="w-[365px] h-[235px] object-cover rounded-lg cursor-pointer"
          onClick={() => openDetail(food)}
        />
        <button
          className={`w-[44px] h-[44px] absolute bottom-4 right-4 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
            isInCart(food._id)
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleAddFoodClick(food)}
        >
          {isInCart(food._id) ? <Check size={16} /> : <Plus size={16} />}
        </button>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="font-bold text-red-500">{food.foodName}</p>
        <p className="font-bold">${food.price}</p>
      </div>
      <p className="font-medium">{food.ingredients}</p>
    </div>
  );
}