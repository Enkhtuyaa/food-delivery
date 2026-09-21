import { Plus, Pencil, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookImage } from "lucide-react";
import axios from "axios";
import { server } from "../../../_api/api";
import { id } from "zod/locales";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function ListCategories({ categories }) {
  const [isOpen, setIsOpen] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [addDishesName, setAddDishesName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dishes, setDishes] = useState([]);

  const handleAddDishesClick = async (dishes) => {
    setIsOpen(dishes);
  };
  const resetForm = () => {
    setAddDishesName("");
    setPrice("");
    setIngredients("");
    setFile(null);
    setPreviewUrl(null);
    setImageUrl("");
  };
  const handleClose = () => {
    setIsOpen(null);
    resetForm();
  };

  // const handleChange = (e) => {
  //   const image = e.target.files?.[0];
  //   console.log(image);
  //   setFile(image);
  //   setPreviewUrl(URL.createObjectURL(image));
  // };

  const selectFile = (selected) => {
    if (!selected) return;
    setFile(selected);
    setImageUrl("");
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleChange = (e) => {
    selectFile(e.target.files?.[0]);
  };

  const getDishes = async () => {
    try {
      const response = await server.get("/dishes-category/get");
      console.log(response.data);
      setDishes(response.data.dishesCategories || []);
    } catch (error) {
      console.log("get dishes error", error.response?.data || error.message);
    }
  };

  const handleDishesClick = async () => {
    try {
      let url = imageUrl;
      if (!url && file) {
        url = await upload();
      }

      const response = await server.post("/dishes-category/create", {
        foodName: addDishesName,
        price: Number(price),
        ingredients,
        imageURL: url,
        category: isOpen._id,
      });
      handleClose();
      await getDishes();
    } catch (error) {
      console.error("dishes error", error.response?.data || error.message);
    }
  };

  const upload = async () => {
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("upload_preset", upload_preset);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        body,
      );
      const url = response.data.secure_url;
      setImageUrl(url);
      return url;
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getDishes();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const deleteDishesCategory = async (id) => {
    try {
      const response = await server.delete("/dishes-category/delete", {
        data: { id: id },
      });
      if (response.status === 200) {
        await getDishes();
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete";
      console.error("Delete dishes error", message);
    }
  };
  return (
    <div className="p-6 flex flex-col gap-5">
      {categories.map((item) => {
        const categoryDishes = dishes.filter(
          (dish) => (dish.category?._id || dish.category) === item._id,
        );
        return (
          <div
            key={item._id}
            className="w-[1172px] min-h-[327px] bg-white rounded-xl p-6 flex flex-col gap-4"
          >
            <p className="font-bold text-2xl">
              {item.categoryName} ({categoryDishes.length})
            </p>

            <div className="flex flex-wrap gap-4">
              <div
                className="w-[270px] h-[240px] rounded-xl border-dashed border border-red-400 flex flex-col gap-2 justify-center items-center cursor-pointer"
                onClick={() => handleAddDishesClick(item)}
              >
                <button className="w-[40px] h-[40px] rounded-full bg-red-500 flex justify-center items-center text-white">
                  <Plus size={16} />
                </button>
                <p>Add new Dish to {item.categoryName}</p>
              </div>

              {categoryDishes.map((dish) => (
                <div
                  key={dish._id}
                  className="group relative w-[270px] h-[240px] rounded-xl border p-4 flex flex-col gap-2"
                >
                  <div className="relative">
                    <img
                      src={dish.imageURL}
                      alt={dish.foodName}
                      className="w-full h-[130px] object-cover rounded-lg"
                    />

                    <button
                      onClick={() => handleEdit(dish)}
                      className="w-8 h-8 absolute bottom-2 left-2 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center cursor-pointer"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteDishesCategory(dish?._id)}
                      className="w-8 h-8 absolute top-2 right-2 rounded-full bg-white/90 hover:bg-red-100 text-red-500 shadow flex items-center justify-center cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="font-medium text-red-500">{dish.foodName}</p>
                    <p className="text-sm">${dish.price}</p>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {dish.ingredients}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[460px] min-h-[592px] bg-white border rounded-xl">
            <div className="flex justify-between p-6 items-center">
              <p className="font-bold text-lg">
                Add new Dish to {isOpen.categoryName}
              </p>
              <button
                className="bg-gray-100 hover:bg-gray-400 w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer"
                onClick={handleClose}
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex justify-between p-6">
              <div className="flex gap-2 flex-col">
                <p className="font-medium text-sm">Food name</p>
                <Input
                  value={addDishesName}
                  onChange={(e) => setAddDishesName(e.target.value)}
                  placeholder="Type food name"
                />
              </div>
              <div className="flex gap-2 flex-col">
                <p className="font-medium text-sm">Food price</p>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 p-6">
              <p className="font-medium text-sm">Ingredients</p>
              <Input
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-[412px] h-[90px]"
                placeholder="List ingredients..."
              />
            </div>

            <div className="p-6 flex flex-col gap-2">
              <Label htmlFor="food-image">Food image</Label>
              <Label
                htmlFor="food-image"
                className="flex w-[412px] h-[132px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 text-center bg-gray-200 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  selectFile(e.dataTransfer.files?.[0]);
                }}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Сонгосон зураг"
                    className="max-h-full rounded-md object-contain"
                  />
                ) : (
                  <>
                    <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white">
                      <BookImage size={16} />
                    </span>
                    <span>Choose a file or drag & drop it here</span>
                  </>
                )}
              </Label>
              <input
                onChange={handleChange}
                id="food-image"
                type="file"
                accept="image/*"
                className="peer sr-only"
              />
              {file && <p className="text-sm">{file.name}</p>}

              <div className="flex justify-between">
                <button
                  className="w-[93px] h-[40px] rounded-lg bg-black text-white cursor-pointer"
                  onClick={upload}
                >
                  Upload
                </button>
                <button
                  onClick={handleDishesClick}
                  className="w-[93px] h-[40px] rounded-lg bg-black text-white cursor-pointer"
                >
                  Add Dish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
