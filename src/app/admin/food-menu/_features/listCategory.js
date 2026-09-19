import { Plus } from "lucide-react";
import { useState } from "react";
import { iso } from "zod/v4-mini";
import { X } from "lucide-react";
export default function ListCategories({ categories }) {
  const [isOpen, setIsOpen] = useState(null);

  const handleAddDishesClick = (dishes) => {
    setIsOpen(dishes);
  };

  const handleClose = () => {
    setIsOpen(null);
  };
  return (
    <div className="p-6 flex flex-col gap-5 ">
      {categories.map((item) => (
        <div
          key={item._id}
          className=" w-[1172px] h-[327px] bg-white rounded-xl p-6 flex flex-col gap-4"
        >
          <p className="font-bold text-2xl">
            {item.categoryName} ({item.dishes ? item.dishes.length : 0}) 
          </p>
          <div
            className="w-[270px] h-[240px] rounded-xl border-dashed border border-red-400 flex justify-center items-center"
            style={{ cursor: "pointer" }}
            onClick={() => handleAddDishesClick(item)}
          >
            <button className="w-[40px] h-[40px] rounded-full bg-red-500 flex justify-center items-center text-white ">
              <Plus size={16} />
            </button>
          </div>
          {isOpen && (
            <div className=" fixed inset-0 z-50 flex items-center justify-center">
              <div className="w-[460px] h-[592px] bg-white border rounded-xl">
                <div className="flex justify-between p-6 items-center">
                  <p className="font-bold text-lg">
                    {" "}
                    Add new Dish to {isOpen.categoryName}
                  </p>
                  <button
                    className=" bg-gray-100 hover:bg-gray-400 w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer"
                    onClick={handleClose}
                  >
                    <X  size={16}/>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
