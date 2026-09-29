"use client";
import { useState, useEffect } from "react";
import { server } from "../../_api/api";
import { useCart } from "@/app/(main)/_components/cart-context";
import DetailModal from "../_components/food-detail-model";
import FoodCard from "../_components/food-cart";
import AddressModal from "../_components/address-food";

export default function FoodGrid() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [address, setAddress] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);

  // Header-тэй хуваалцдаг нэг сагс
  const { cart, addToCart, setQuantity, removeFromCart } = useCart();

  // Хоолны дэлгэрэнгүй pop-up
  const [detailFood, setDetailFood] = useState(null);
  const [detailQty, setDetailQty] = useState(1);

  const getCategories = async () => {
    try {
      const response = await server.get("/food-category/get");
      setCategories(response.data.foodCategories || []);
    } catch (error) {
      console.log("get category error", error.response?.data || error.message);
    }
  };

  const getFoods = async () => {
    try {
      const response = await server.get("/dishes-category/get");
      setFoods(response.data.dishesCategories || []);
    } catch (error) {
      console.log("get food name error", error.response?.data || error.message);
    }
  };

  const isInCart = (id) => cart.some((item) => item._id === id);

  const handleAddFoodClick = (food) => {
    addToCart(food); // 1 ширхэг нэмнэ (байвал quantity + 1)
    setSelectedFood(food);
    setIsOpen(true); // хаягийн pop-up шууд нээгдэнэ
  };

  const handleSaveAddress = () => {
    if (!address.trim()) {
      setToast("Хаягаа оруулна уу!");
      return;
    }
    setIsOpen(false);
    setToast("Хоол сагсанд нэмэгдлээ!");
  };

  // Зураг дээр дарахад
  const openDetail = (food) => {
    const existing = cart.find((item) => item._id === food._id);
    setDetailQty(existing ? existing.quantity : 1);
    setDetailFood(food);
  };

  const closeDetail = () => setDetailFood(null);

  const handleDetailConfirm = () => {
    if (isInCart(detailFood._id)) {
      setQuantity(detailFood._id, detailQty); // тоог тохируулна
    } else {
      addToCart(detailFood, detailQty);
    }
    setDetailFood(null);
    setToast("Хоол сагсанд нэмэгдлээ!");
  };

  const handleDetailRemove = () => {
    removeFromCart(detailFood._id);
    setDetailFood(null);
    setToast("Хоол сагснаас хасагдлаа!");
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="p-20 bg-gray-500">
      <div className="w-full min-h-[2646px] flex flex-col gap-10">
        {toast && (
          <div className="fixed top-6 right-6 bg-black text-white px-4 py-2 rounded-lg z-[60]">
            {toast}
          </div>
        )}

        {/* Хоолны дэлгэрэнгүй pop-up */}
        <DetailModal
          detailFood={detailFood}
          detailQty={detailQty}
          setDetailQty={setDetailQty}
          isInCart={isInCart}
          closeDetail={closeDetail}
          handleDetailConfirm={handleDetailConfirm}
          handleDetailRemove={handleDetailRemove}
        />

        {/* Хаягийн pop-up */}
        <AddressModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedFood={selectedFood}
          address={address}
          setAddress={setAddress}
          handleSaveAddress={handleSaveAddress}
        />

        {categories.map((item) => {
          const categoryFoods = foods.filter(
            (food) => (food.category?._id || food.category) === item._id,
          );
          return (
            <div key={item._id} className="flex gap-8 flex-col">
              <p className="font-bold">{item.categoryName}</p>
              <div className="flex flex-wrap gap-4 ">
                {categoryFoods.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                    isInCart={isInCart}
                    openDetail={openDetail}
                    handleAddFoodClick={handleAddFoodClick}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}