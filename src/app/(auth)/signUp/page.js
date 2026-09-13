"use client";

import { useState } from "react";
import StepOnePage from "./_features/step-one";
import StepTwoPage from "./_features/step-two";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { server } from "../../_api/api";
import { useRouter } from "next/navigation";

const signUpFormSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
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

export default function SignUp() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const passwordStepSubmit = async (data) => {
    try {
      console.log(data, "this is my data");
      const response = await server.post("/auth/sign-up", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/admin/food-menu");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while signing up. Please try again.";
      setSubmitError(message);
    }
  };

  const handleNextStep = async () => {
    const isEmailValid = await trigger(["email"]);
    if (isEmailValid) setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
  };

  return (
    <div className="w-screen min-h-screen flex gap-12 justify-center items-center">
      <form onSubmit={handleSubmit(passwordStepSubmit)}>
        {step === 1 && (
          <StepOnePage
            onNext={handleNextStep}
            register={register}
            errors={errors}
            emailValue={getValues().email}
          />
        )}
        {step === 2 && (
          <StepTwoPage
            onBack={handleBackStep}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        )}
        {submitError && (
          <p className="text-red-500 text-sm mt-2">{submitError}</p>
        )}
      </form>
    </div>
  );
}
