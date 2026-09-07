"use client";

import { useState } from "react";
import StepOnePage from "./_features/step-one";
import StepTwoPage from "./_features/step-two";

export default function SignUp() {
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pwdError = validatePassword(password);
    const confirmError = validateConfirmPassword(password, confirmPassword);
    setErrorPassword(pwdError);
    setErrorConfirmPassword(confirmError);
    if (pwdError === "" && confirmError === "") {
      console.log("create success");
    }
  };

  return (
    <div className="w-screen min-h-screen flex  gap-12   justify-center items-center ">
      <div className="flex flex-col ">
        {step === 1 && <StepOnePage  onSuccess={() => setStep(2)} />}
        {step === 2 && <StepTwoPage  onBack={() => setStep(1)}/>}
      </div>
    </div>
  );
}
