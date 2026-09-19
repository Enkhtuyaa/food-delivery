"use client";
import { Plus } from "lucide-react";
import { use, useState } from "react";
export default function ListCategories({ categories }) {
  const [isOpen, setIsOpen] = useState(null);

  const handleAddDishesClick = (dishes) => {
    setIsOpen(dishes);
  };

  const handleClose = () => {
    setIsOpen(null);
  };
  return (
    <div className=" flex flex-col gap-4 p-6">
      {categories.map((item) => (
        <div
          key={item._id}
          className="w-full max-w-[1172px] h-[327px] bg-white rounded-xl p-6 flex gap-3 flex-col "
        >
          <p className="font-bold text-2xl">
            {" "}
            {item.categoryName} ({item.dishes?.length ?? 0})
          </p>
          <div className="w-[270px] min-h-[240px] rounded-xl border-dashed border border-red-500 flex  flex-col gap-2 justify-center items-center">
            <button
              className="w-[40px] h-[40px] rounded-full bg-red-500 flex justify-center items-center text-white"
              style={{ cursor: "pointer" }}
              onClick={() => handleAddDishesClick(item)}
            >
              <Plus size={16} />
            </button>
            <p className="font-medium text-base">
              Add menu to {item.categoryName}
            </p>
          </div>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="w-[460px] h-[592px] border rounded-xl bg-gray-50 p-6 flex flex-col justify-between shadow-lg">
                <div>
                  <p className="font-bold text-lg">
                    {isOpen.categoryName} категорид хоол нэмэх
                  </p>
                </div>

                <button
                  className="mt-2 text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg cursor-pointer"
                  onClick={handleClose}
                >
                  Хаах
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
