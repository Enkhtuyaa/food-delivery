"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const StepOnePageSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),
});

export default function StepOnePage({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(StepOnePageSchema),
    defaultValues: { email: "" },
  });

  const emailStepSubmit = (data) => {
    console.log(data, "this is my data");
    onNext();
  };
  // const [createEmail, setCreateEmail] = useState("");
  // const [errorCreateEmail, setErrorCreateEmail] = useState("");

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // const isValidEmail = (email) => {
  //   return emailRegex.test(email);
  // };

  // const validateEmail = (email) => {
  //   if (!email) {
  //     return "Email reqiured";
  //   } else if (!isValidEmail(email)) {
  //     return "Invaild Email";
  //   } else {
  //     return "";
  //   }
  // };

  // const handleCreateInputChange = (event) => {
  //   const value = event.target.value;
  //   setCreateEmail(value);
  //   if (errorCreateEmail) {
  //     if (isValidEmail(value)) {
  //       setErrorCreateEmail("");
  //     }
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const error = validateEmail(createEmail);
  //   setErrorCreateEmail(error);
  //   if (error === "") {
  //     onNext();
  //     console.log("create success");
  //   }
  // };

  return (
    <div className="w-screen min-h-screen flex  gap-12   justify-center items-center ">
      <div className="flex flex-col ">
        <Card className="w-[416px] h-[288px] relative flex flex-col mt-1 ">
          <CardHeader className={"flex flex-col "}>
            <Link href="/" className="w-fit p-1 hover:bg-gray-100 rounded-md">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <CardTitle className={"font-semibold text-2xl text-gray-900"}>
              Create your account
            </CardTitle>
            <CardDescription>
              Sign up to explore your favorite dishes.
            </CardDescription>
            <CardAction>
              {/* <Button variant="link">Sign Up</Button> */}
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(emailStepSubmit)}>
              <div className="flex flex-col  ">
                <div className="gap-4">
                  {/* <Label htmlFor="email">Email</Label> */}
                  <Input
                    // id="email"
                    // type="email"
                    // className={"w-full h-[36px]"}
                    placeholder="your email address"
                    {...register("email")}
                    // required
                    // value={createEmail}
                    // onChange={handleCreateInputChange}
                  />
                  {errors.email && (
                    <span className="text-red-500  text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full"
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </Button>
                {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
                <div className="flex gap-2 justify-center ">
                  <span className="font-normal text-base text-gray-400">
                    Already have an account?
                  </span>
                  <Link
                    href="/login"
                    className="font-medium hover:underline text-blue-600 cursor-pointer"
                  >
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      <div>
        <Image
          src="/childpicture.jpg"
          alt="Child Picture"
          width={856}
          height={904}
          className="rounded-3xl"
        />
         
      </div>
    </div>
  );
}
