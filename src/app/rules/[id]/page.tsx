"use client";
import CustomStepper from "@/components/Stepper";
import { EditGame } from "@/hooks/Game";
import { Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Rules({ params }: { params: { id: string } }) {
  const { trigger } = EditGame(params.id);
  const [rules, setRules] = useState({
    bet: 5000,
    birdie: 10000,
    eagle: 30000,
    triple: true,
    three: true,
    draw: true,
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
    if (!params) return;
    const delayTrigger = setTimeout(() => {
      trigger({ rules });
    }, 1500);
    return () => clearTimeout(delayTrigger);
  }, [rules, trigger]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        규칙 설정
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField required name="bet" label="타 당 얼마?" fullWidth placeholder="5000" value={rules.bet} onChange={handleChangeAmount} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required name="birdie" label="버디 축하금" fullWidth placeholder="10000" value={rules.birdie} onChange={handleChangeAmount} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required name="eagle" label="이글 축하금" fullWidth placeholder="50000" value={rules.eagle} onChange={handleChangeAmount} />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox color="secondary" name="triple" checked={rules.triple} onChange={handleChangeRule} />} label="이글,버디 또는 트리플보기 이상 (Par3의 경우 더블보기)" />
          <FormControlLabel control={<Checkbox color="secondary" name="three" checked={rules.three} onChange={handleChangeRule} />} label="3명의 플레이어가 동타" />
          <FormControlLabel control={<Checkbox color="secondary" name="draw" checked={rules.draw} onChange={handleChangeRule} />} label="무승부의 경우 다음홀 두배판" />
        </Grid>
      </Grid>
    </>
  );
}
