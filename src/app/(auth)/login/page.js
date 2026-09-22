"use client";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPageSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long") // Minimum length
    .max(32, "Password cannot exceed 32 characters")
    // Optional: Add regex for password complexity (1 uppercase, 1 lowercase, 1 number)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginPageSchema),
    defaultValues: { email: "", password: "" },
  });

  const emailStepSubmit = (data) => {
    console.log(data, "this is my data");
    // console.log("hello");
  }
// sign-up page baidlaar localStorage hiih estoi esehiig asuuh
  return (
    <div className="w-screen min-h-screen  flex items-center justify-center p-6 bg-gray-50  ">
      <div className="flex gap-12 items-center max-w-[1280px]">
        <div className="bg-white w-[416px]  flex gap-6  p-8 flex-col rounded-2xl shadow-sm border border-gray-100">
          <Link href="/" className="w-fit">
            <ChevronLeft className="cursor-pointer hover:opacity-75 transition-opacity" />
          </Link>
          <div>
            <h1 className="font-semibold text-2xl text-gray-900">Log in</h1>
            <p className=" font-normal text-base  text-gray-500 mt-1">
              {" "}
              Sign up to explore your favorite dishes.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(emailStepSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <Input
              // name={emailValidation.name}
              // onChange = {emailValidation.onChange}
              {...register("email")}
                // id="email"
                // type="text"
                // className={"w-full h-[40px]"}
                placeholder="Enter your email address"
                // value={email}
                // onChange={handleEmailInputChange}
              />
              {errors.email && (
                <span className="text-red-500  text-xs">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="relative flex items-center">
                <Input
                  // id="password"
                  // type={showPassword ? "text" : "password"}
                  // className="w-full h-[40px] pr-10"
                  placeholder="Password"
                  {...register("password")}
                  // value={password}
                  // onChange={handlePasswordInputChange}
                />
                <button
                  type="button"
                  // onClick={() => setShowpassword((prev) => !prev)}
                  className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {/* {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
                </button>
              </div>
              {errors.password&& (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </div>

            <div>
              <Link
                href="/forgot-password"
                className="font-normal text-sm text-gray-700 underline hover:text-black"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="bg-black hover:bg-gray-800 w-full h-[40px] text-white mt-2 cursor-pointer"
            >
              {" Let's go"}
            </Button>
          </form>

          <div className="flex gap-2 justify-center text-sm">
            <span className="font-normal text-gray-500">
              {" Don't have an account?"}
            </span>
            <Link
              href="/signup"
              className="font-medium hover:underline text-blue-600 cursor-pointer"
            >
              Sign up
            </Link>
          </div>
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
      {/* <div className="bg-black w-[400px] h-[350px]"></div> */}
    </div>
  );
}
