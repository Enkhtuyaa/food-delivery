import { Plus } from "lucide-react";
export default function FoodCart({ foodItem }) {
  return (
    <div className="w-[397px] h-[342px] bg-white rounded-2xl p-4 shadow-md">
      <div className="relative">
        <img
          src={foodItem?.imageURL}
          alt={foodItem?.foodName}
          className=" w-[365px] h-[235px] object-cover rounded-lg cursor-pointer"
        />
        <button className="w-[44px] h-[44px] bg-white absolute bottom-4 right-4 rounded-full flex items-center justify-center cursor-pointer">
          <Plus size={16} />
        </button>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="font-bold text-red-500">{foodItem.foodName}</p>
        <p className="font-bold">${foodItem.price}</p>
      </div>
      <div>
        <p className="font-medium">{foodItem.ingredients}</p>
      </div>
    </div>
  );
}
