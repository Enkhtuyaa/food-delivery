"use client";
import { useState, useEffect } from "react";
import { server } from "../../_api/api";

export default function FoodMenuPage() {
  const [category, setCategory] = useState([]);

  const getFoodcategory = async () => {
    try {
      const response = await server.get("/food-category/get");
      console.log(response);
    } catch(error ){ 
     const message = error.message
    }
  };

  useEffect(() => {
    getFoodcategory();
    
  }, []);
  return (
    <div className="w-full h-full bg-gray-200 p-6">
      <div className="w-[1171px] h-[176px] rounded-xl bg-white flex gap-4 p-6 flex-col">
        <h1 className="font-bold text-black text-base flex gap-4">
          Dishes category
        </h1>
        <div className="flex flex-col">
          <button></button>
        </div>
      </div>
    </div>
  );
}
