"use client";
import { useState, useEffect } from "react";
import { server } from "../../_api/api";
const getFoodcategory = async () => {
  const response = await server.get("/food-category/get");
  console.log(response);
};

export default function FoodMenuPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getFoodcategory();
  }, []);
  return (
    <div className="w-full h-full bg-gray-200 p-6">
      <div className="w-[1171px] h-[176px] rounded-xl bg-white flex gap-4 p-6 flex-col">
        <h1 className="font-bold text-black text-base flex gap-4">Dishes category</h1>
        <div className="flex flex-wrap gap-3">
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
          <div className="w-[145px] h-[36px] rounded-full border bg-amber-200">
            All dishes
          </div>
        </div>
      </div>
    </div>
  );
}
