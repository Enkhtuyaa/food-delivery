import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { iso } from "zod/v4-mini";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookImage } from "lucide-react";
export default function ListCategories({ categories }) {
  const [isOpen, setIsOpen] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleAddDishesClick = (dishes) => {
    setIsOpen(dishes);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const handleChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleFile = (selected) => {
    if (!selected) return;
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
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
                    <X size={16} />
                  </button>
                </div>
                <div className="flex justify-between p-6">
                  <div className="flex gap-2 flex-col">
                    <p className="font-medium text-sm">Food name</p>
                    <Input placeholder="Type food name" />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <p className="font-medium text-sm">Food price</p>
                    <Input placeholder="Enter price..." />
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <p className="font-medium text-sm">Ingredients</p>
                  <Input
                    className={"w-[412px] h-[90px] "}
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
                      const dropped = e.dataTransfer.files?.[0];
                      if (dropped) setFile(dropped);
                    }}
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Сонгосон зураг"
                        className="max-h-60 rounded-md"
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
                  {file && <p>{file.name}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
