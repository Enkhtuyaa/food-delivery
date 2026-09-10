"use client";

import { useState } from "react";
import StepOnePage from "./_features/step-one";
import StepTwoPage from "./_features/step-two";
import { server } from "@/app/_api/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// const StepOnePageSchema = z.object({
//   email: z
//     .string()
//     .trim()
//     .min(1, "Email is required")
//     .email("Invalid email format"),
// });

export default function SignUp() {
  const [steps, setSteps] = useState(1);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm({
  //   resolver: zodResolver(StepOnePageSchema),
  //   defaultValues: { email: "" },
  // });

  // const emailStepSubmit = (data) => {
  //   console.log(data, "this is my data");
  //   onNext();
  // };
  // const response = await server.post("/")
  // const Server = async (data) => {
  //   // console.log(data)
  //   const response = await server.post("/auth/sign-up", {
  //     email: data.email,
  //     password: data.password,
  //   });
  //   console.log(response, "response");
  // };
  const handleNextStep = () => {
    setSteps((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setSteps((prev) => prev - 1);
  };

  return (
    <div className="w-screen min-h-screen flex  gap-12   justify-center items-center ">
      <div className="flex flex-col ">
        {steps === 1 && <StepOnePage onNext={handleNextStep} />}
        {steps === 2 && <StepTwoPage onBack={handleBackStep} />}
      </div>
    </div>
  );
}
