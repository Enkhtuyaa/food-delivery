"use client";
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
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function StepTwoPage({ onBack, register, errors, }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-screen min-h-screen flex  gap-12   justify-center items-center ">
      <div className="flex flex-col ">
        <Card className="w-[416px]  relative flex flex-col mt-1 ">
          <CardHeader className={"flex flex-col "}>
            <button
              type="button"
              onClick={onBack}
              className="w-fit p-1 hover:bg-gray-100 rounded-md"
              style={{ cursor: "pointer" }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <CardTitle className={"font-semibold text-2xl text-gray-900"}>
              Create strong password
            </CardTitle>
            <CardDescription>
              Create a strong password with letters, numbers.
            </CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 ">
              <div className="gap-4">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500  text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="gap-4">
                <Input
                  type={showPassword ? "text" : "password"}
                  className={"w-full h-[36px]"}
                  placeholder="ConfirmPassword"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500  text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <Label
                  htmlFor="showPassword"
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  Show password
                </Label>
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
