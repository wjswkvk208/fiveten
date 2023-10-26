"use client";
import CustomStepper from "@/components/Stepper";
import { EditGame } from "@/hooks/Game";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Input, InputLabel, Paper, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Rules({ params }: { params: { id: string } }) {
  const { trigger } = EditGame(params.id);
  const [rules, setRules] = useState({
    금액: 5000,
    버디금액: 10000,
    이글금액: 30000,
    쓰리동타: true,
    트리플: true,
    무승부: true,
  });

  const handleChangeRule = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRules({
      ...rules,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRules({
      ...rules,
      [event.target.name]: Number(event.target.value),
    });
  };

  useEffect(() => {
    const delayTrigger = setTimeout(() => {
      trigger({ rules });
    }, 1500);
    return () => clearTimeout(delayTrigger);
  }, [rules, trigger]);

  return (
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" align="center">
        즐거운 골프, 스크라치
      </Typography>

      <CustomStepper />
      <Typography variant="h6" gutterBottom>
        규칙 설정
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField required name="금액" label="타 당 얼마?" fullWidth placeholder="5000" value={rules.금액} onChange={handleChangeAmount} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required name="버디금액" label="버디 축하금" fullWidth placeholder="10000" value={rules.버디금액} onChange={handleChangeAmount} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required name="이글금액" label="이글 축하금" fullWidth placeholder="50000" value={rules.이글금액} onChange={handleChangeAmount} />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox color="secondary" name="트리플" checked={rules.트리플} onChange={handleChangeRule} />} label="이글,버디 또는 트리플보기 이상 (Par3의 경우 더블보기)" />
          <FormControlLabel control={<Checkbox color="secondary" name="쓰리동타" checked={rules.쓰리동타} onChange={handleChangeRule} />} label="3명의 플레이어가 동타" />
          <FormControlLabel control={<Checkbox color="secondary" name="무승부" checked={rules.무승부} onChange={handleChangeRule} />} label="무승부의 경우 다음홀 두배판" />
        </Grid>
      </Grid>
    </Paper>
  );
}
