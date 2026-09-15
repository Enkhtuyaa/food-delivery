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
  const [categoryName, setCategoryName] = useState("");
  const [nameError, setNameError] = useState("");

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
    setCategoryName(e.target.value);
  };
  const handleAddCategoryClick = () => {
    if (categoryName.trim() === "") {
      setNameError("please enter category");
      return;
    }
    console.log(categoryName, "categoryName");
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
                    onClick={handleAddCategoryClick}
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
                      value={categoryName}
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
                      handleAddCategoryClick();
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
