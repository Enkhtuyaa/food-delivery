"use client";
import { useState, useEffect } from "react";
import { server } from "../../_api/api";
import { Plus } from "lucide-react";
import { Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FoodMenuPage() {
  const [category, setCategory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [addCategoryName, setAddCategoryName] = useState("");
  const [addCategoryNameError, setAddCategoryNameError] = useState("");

  const getFoodcategory = async () => {
    try {
      const response = await server.get("/food-category/get");
      console.log("API Response Data:", response.data);
      return response.data.foodCategories;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFoodcategory()
      .then((data) => setCategory(data))
      .catch((error) => {
        setErrorMessage("FOOD API ERROR");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setAddCategoryName(e.target.value);
  };

  const handleAddCategory = async () => {
    if (!addCategoryName.trim()) {
      setAddCategoryNameError("Please enter the category name");
      return;
    }
    try {
      const response = await server.post("/food-category/create", {
        categoryName: addCategoryName,
      });
      setAddCategoryName("");
      setAddCategoryNameError("");
      const data = await getFoodcategory();
      setCategory(data ?? []);
    } catch (error) {
      console.error("Add category error:", error);
      setAddCategoryNameError(
        error?.response?.data?.message || "Failed to add category",
      );
    }
  };

  const deleteFoodCategory = async (id) => {
    try {
      const response = await server.delete("food-category/delete", {
        data: { id },
      });
      if (response.status === 200) {
        setCategory((prevCategory) =>
          prevCategory.filter((item) => item._id !== id),
        );
      }
    } catch (error) {
      const message = error.response?.data?.message || "Устгахад алдаа гарлаа";
      console.error("Delete category error:", message);
    }
  };

  if (loading) return <p className="font-bold">Loading...</p>;
  return (
    <div className="w-full h-full bg-gray-200 p-6">
      <div className="w-[1171px]  rounded-xl bg-white flex gap-4 p-6 flex-col">
        <h1 className="font-bold text-black text-base flex gap-4">
          Dishes category
        </h1>
        {errorMessage && (
          <p className="text-red-500 font-medium">{errorMessage}</p>
        )}
        <div className="flex flex-wrap  gap-3 ">
        {category?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-2 px-4 h-[40px] rounded-full bg-amber-200"
            >
              <span>{item.categoryName}</span>
              <button
                type="button"
                onClick={() => deleteFoodCategory(item._id)}
                className="text-white cursor-pointer bg-black w-[30px] h-[30px] rounded-full  flex justify-center items-center"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}

          <Dialog>
            <form>
              <DialogTrigger
                render={
                  <button
                    className="w-[36px] h-[36px] bg-red-500 rounded-full text-white flex items-center justify-center"
                    style={{ cursor: "pointer" }}
                  >
                    <Plus className="w-[16px] h-[16px]" />
                  </button>
                }
              />
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle className={"font-bold"}>
                    Add new category
                  </DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="name-1"> Category Name</Label>
                    <Input
                      id="name-1"
                      name="name"
                      defaultValue="Pedro Duarte"
                      value={addCategoryName}
                      onChange={handleInputChange}
                    />
                    {addCategoryNameError && (
                      <span className="font-medium text-red-500">
                        {addCategoryNameError}
                      </span>
                    )}
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose
                    render={<Button variant="outline">Cancel</Button>}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      handleAddCategory();
                    }}
                  >
                    Add category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
