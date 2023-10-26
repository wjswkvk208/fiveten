import { Step, StepLabel, Stepper } from "@mui/material";
const CustomStepper = () => {
  const steps = ["플레이어 설정", "규칙 설정", "스코어 등록"];
  return (
    <>
      <Stepper activeStep={1} sx={{ pt: 3, pb: 5 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CustomStepper;
