"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StepOnePage({ onNext, register, errors,  }) {
  // const handleNextStep = () => {
  //   if (emailValue.length === 0) {
  //     return;
  //   }
  //   if (!errors.email) {
  //     onNext();
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
          </CardHeader>
          <CardContent>
            <div className="flex flex-col  ">
              <div className="gap-4">
                <Input
                  placeholder="your email address"
                  {...register("email")}
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
                type="button"
                className="w-full"
                style={{ cursor: "pointer" }}
                onClick={onNext}
              >
                SignUp
              </Button>
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
