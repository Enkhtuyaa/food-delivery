"use client";
import { useState, useEffect } from "react";
import { server } from "../../_api/api";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

  const deleteFoodCategory = async (id) => {
    try {
      const response = await server.delete("food-category/id");
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
  // const handleAddCategory = () => {
  //   e.preventDefault ()
  //   if (categoryName.trim() === "") {
  //     setNameError("please enter category");
  //     return;
  //   }
  //   try{
  //     const response = await server.create("/food-category/create")
  //     return response.data.foodCategories
  //   }
  //   // console.log(categoryName, "categoryName");
  // };
  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!addCategoryName.trim()) {
      setAddCategoryNameError("Ангиллын нэрийг оруулна уу");
      return; // энд try/catch хэрэггүй, учир нь async дуудлага байхгүй
    }
    try {
      const response = await server.post("/food-category/create", {
        addCategoryName,
      });
      setAddCategoryName("");
      setAddCategoryNameError("");
      // амжилттай бол шинэчилсэн жагсаалтыг дахин татах
      const data = await getFoodcategory();
      setCategory(data ?? []);
    } catch (error) {
      // 1) Хөгжүүлэгчид зориулж дэлгэрэнгүй лог
      console.error("Add category error:", error);
      // 2) Хэрэглэгчид ойлгомжтой мессеж
      setAddCategoryNameError(
        error?.response?.data?.message || "Ангилал нэмэхэд алдаа гарлаа",
      );
    }
  };
  
  if (loading) return <p className="font-bold">Loading...</p>;
  return (
    <div className="w-full h-full bg-gray-200 p-6">
      <div className="w-[1171px]  rounded-xl bg-white flex gap-4 p-6 flex-col">
        <h1 className="font-bold text-black text-base flex gap-4">
          Dishes category
        </h1>
        <div className="flex flex-wrap  gap-3 ">
          {category?.map((item) => (
            <button
              key={item._id}
              className="w-[165px] h-[40px] rounded-full bg-amber-200"
              style={{ cursor: "pointer" }}
            >
              {item.categoryName}
            </button>
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
                  {/* <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription> */}
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
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose
                    render={<Button variant="outline">Cancel</Button>}
                  />
                  <Button
                    type="submit"
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
