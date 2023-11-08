"use client";
import { Step, StepLabel, Stepper } from "@mui/material";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const CustomStepper = () => {
  const path = usePathname().split("/")[1];
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      label: "플레이어 설정",
      path: "players",
    },
    {
      label: "규칙 설정",
      path: "rules",
    },
    {
      label: "스코어 등록",
      path: "scores",
    },
  ];

  useEffect(() => {
    setActiveStep(steps.findIndex(s => s.path === path));
  }, [path]);

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map(step => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CustomStepper;
