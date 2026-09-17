"use client";
import { useState, useEffect } from "react";
import { server } from "../../../_api/api";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
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

export default function DishesCategory({ categories, getFoodCategory, error }) {
  const [addCategoryName, setAddCategoryName] = useState("");
  const [addCategoryNameError, setAddCategoryNameError] = useState("");

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
      console.log("Refetching categories...");
      await getFoodCategory();
      console.log("Refetch done");
    } catch (error) {
      console.error("Add category error:", error);
      setAddCategoryNameError(
        error?.response?.data?.message || "Failed to add category",
      );
    }
  };

  const deleteFoodCategory = async (id) => {
    try {
      const response = await server.delete("/food-category/delete", {
        data: { id: id },
      });
      if (response.status === 200) {
        await getFoodCategory();
        // getFoodCategory((prevCategory) =>
        //   prevCategory.filter((item) => item._id !== id),
        // );
      }
    } catch (error) {
      const message = error.response?.data?.message || "Устгахад алдаа гарлаа";
      console.error("Delete category error:", message);
    }
  };

  return (
    <div className=" p-6">
      <div className="w-[1171px]  rounded-xl bg-white flex gap-4 p-6 flex-col">
        <h1 className="font-bold text-black text-base flex gap-4">
          Dishes category
        </h1>
        {error && <p className="text-red-500 font-medium">{error}</p>}
        <div className="flex flex-wrap  gap-3 ">
          {categories?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-2 px-4 h-[40px] rounded-full border"
            >
              <span>{item.categoryName}</span>
              <button
                type="button"
                onClick={() => deleteFoodCategory(item._id)}
                className="text-white cursor-pointer bg-black w-[25px] h-[25px] rounded-full  flex justify-center items-center"
              >
                <Trash className="w-3 h-3" />
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
                    style={{ cursor: "pointer" }}
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
