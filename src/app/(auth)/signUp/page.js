"use client";

import { useState } from "react";
import StepOnePage from "./_features/step-one";
import StepTwoPage from "./_features/step-two";
import { server } from "@/app/_api/api";
// schemas/auth.schema.js

export default function SignUp() {
  const [steps, setSteps] = useState(1);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleNextStep = () => {
    setSteps((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setSteps((prev) => prev - 1);
  };

 
  return (
    <div className="w-screen min-h-screen flex  gap-12   justify-center items-center ">
      <div className="flex  ">
        <div>
          {steps === 1 && <StepOnePage onNext={handleNextStep} />}
          {steps === 2 && (
            <StepTwoPage
              onBack={handleBackStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
