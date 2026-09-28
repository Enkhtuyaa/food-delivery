"use client";
import { useState, useEffect } from "react";
import { server } from "../../_api/api";
import { Plus } from "lucide-react";
import { Check } from "lucide-react";

export default function FoodGrid() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [addFood, setAddFood] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [foodId, setFoodId] = useState([]);

  const getCategories = async () => {
    try {
      const response = await server.get("/food-category/get");
      // console.log(response.data);
      setCategories(response.data.foodCategories || []);
    } catch (error) {
      console.log("get category error", error.response?.data || error.message);
    }
  };

  const getFoods = async () => {
    try {
      const response = await server.get("/dishes-category/get");
      // console.log(response.data);
      setFoods(response.data.dishesCategories || []);
    } catch (error) {
      console.log("get food name error", error.response?.data || error.message);
    }
  };

  const handleAddFoodClick = () => {
    setAddFood([]);
    setIsOpen(true);
    setToast("Food is being added to the cart!");
    setFoodId([])
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  return (
    <div className="p-20 bg-gray-500">
      <div className="w-full min-h-[2646px] flex flex-col gap-10">
        {categories.map((item) => {
          const categoryFoods = foods.filter(
            (food) => (food.category?._id || food.category) === item._id,
          );
          return (
            <div key={item._id} className="flex gap-8 flex-col">
              <p className="font-bold">{item.categoryName}</p>
              <div className="flex flex-wrap gap-4 ">
                {categoryFoods.map((food) => (

                  <div
                    key={food._id}
                    className="w-[397px] h-[342px] bg-white rounded-2xl p-4 shadow-md"
                  >
                    <div className="relative">
                      <img
                        src={food.imageURL}
                        alt={food.foodName}
                        className="w-[365px] h-[235px] object-cover rounded-lg"
                      />
                      <button
                        className="w-[44px] h-[44px] absolute bottom-4 right-4 bg-white rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleAddFoodClick}
                      >
                        <Plus size={16} />
                      </button>
                      {isOpen && (
                        <div className="flex justify-center items-center gap-4">
                          <div className="w-[502px] h-[288px] rounded-md bg-white absolute bottom-4 right-4 bg-black ">
                            <button className="w-[44px] h-[44px] rounded-full text-white">
                              <Check size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-red-500">{food.foodName}</p>
                      <p className="font-bold">${food.price}</p>
                    </div>
                    <p className="font-medium">{food.ingredients}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
