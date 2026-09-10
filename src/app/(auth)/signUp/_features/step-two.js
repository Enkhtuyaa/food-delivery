"use client";
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
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { email, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { server } from "@/app/_api/api";

const StepTwoPageSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password cannot exceed 32 characters")
      // Optional: Add regex for password complexity (1 uppercase, 1 lowercase, 1 number)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attaches the error to the confirmPassword field
  });

// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

// const isValidPassword = (password) => {
//   return passwordRegex.test(password);
// };

export default function StepTwoPage({ onBack }) {
  
  const [showPassword, setShowPassword] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(StepTwoPageSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

   const passwordStepSubmit = (data) => {
    console.log(data, "this is my data");
  
    navigateToAdminPage();
  };

  const router = useRouter();
  const navigateToAdminPage = () => {
    router.push("/admin");
  };
  // const passwordStepSubmit = async (data) => {
  //   console.log(data)
  //   const response = await server.post("/auth/sign-up", {
  //     email: data.email,
  //     password: data.password,
  //   });
  //   console.log(response);
  //   console.log(data, "this is my data");
  //   navigateToLoginPage();
  // };

 
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [errorPassword, setErrorPassword] = useState("");
  // const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  

  // const validatePassword = (password) => {
  //   if (!password) {
  //     return "Password required";
  //   } else if (!isValidPassword(password)) {
  //     return "Invalid password";
  //   } else {
  //     return "";
  //   }
  // };

  // const validateConfirmPassword = (pwd, confirmPwd) => {
  //   if (!confirmPwd) {
  //     return "  Confirm Password required";
  //   } else if (pwd !== confirmPwd) {
  //     return "Those password didn't match.Try again.";
  //   } else {
  //     return "";
  //   }
  // };

  // const handlePasswordInputChange = (event) => {
  //   const value = event.target.value;
  //   setPassword(value);
  //   if (errorPassword) {
  //     if (isValidPassword(value)) {
  //       setErrorPassword("");
  //     }
  //   }
  //   if (errorConfirmPassword && confirmPassword) {
  //     setErrorConfirmPassword(validateConfirmPassword(value, confirmPassword));
  //   }
  // };

  // const handleConfirmPasswordInputChange = (event) => {
  //   const value = event.target.value;
  //   setConfirmPassword(value);
  //   if (errorConfirmPassword) {
  //     setErrorConfirmPassword(validateConfirmPassword(password, value));
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const pwdError = validatePassword(password);
  //   const confirmError = validateConfirmPassword(password, confirmPassword);
  //   setErrorPassword(pwdError);
  //   setErrorConfirmPassword(confirmError);
  //   if (pwdError === "" && confirmError === "") {
  //     console.log("create success");
  //     navigateToLoginPage();
  //   }
  // };

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
            <CardAction>
              {/* <Button variant="link">Sign Up</Button> */}
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(passwordStepSubmit)}>
              <div className="flex flex-col gap-4 ">
                <div className="gap-4">
                  {/* <Label htmlFor="email">Email</Label> */}
                  <Input
                    // id="password"
                    type={showPassword ? "text" : "password"}
                    // className={"w-full h-[36px]"}
                    placeholder="password"
                    {...register("password")}
                    // required
                    // value={password}
                    // onChange={handlePasswordInputChange}
                  />
                  {errors.password && (
                    <span className="text-red-500  text-xs">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="gap-4">
                  <Input
                    // id="ConfirmPassword"
                    type={showPassword ? "text" : "password"}
                    className={"w-full h-[36px]"}
                    placeholder="ConfirmPassword"
                    // required
                    // value={confirmPassword}
                    // onChange={handleConfirmPasswordInputChange}
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
