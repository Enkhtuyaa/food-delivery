"use client";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { Plus } from "lucide-react";
export default function ListCategories({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = () => {};
  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="w-[1172px] rounded-xl bg-white">
        <div className="flex flex-wrap gap-3 p-6">
          {categories.map((item) => (
            <div
              key={item._id}
              className="w-[270px] h-[241px] border-dashed border rounded-xl flex flex-col gap-2 justify-center items-center"
            >
              {/* {item.categoryName} */}
              {isOpen && <div className="w-[472px] h-[592px] "></div>}
              <button
                className="w-[36px] h-[36px] bg-red-500 rounded-full flex justify-center items-center text-white"
                style={{ cursor: "pointer" }}
                onClick={handleButtonClick}
              >
                <Plus size={16} />
              </button>
              <p className="font-medium">Add menu Dish </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
