"use client";
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography, Link, createTheme, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "@/components/Copyright";
import { useRegister } from "@/hooks/Auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn, signOut, useSession } from "next-auth/react";

const defaultTheme = createTheme();
export default function Register() {
  const router = useRouter();
  const { data, trigger, error, reset } = useRegister();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    trigger(
      {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
      },
      {
        onSuccess: (data, key, config) => {
          signIn("credentials", {
            email: data.email,
            password: formData.get("password"),
            redirect: true,
            callbackUrl: "/board",
          });
        },
      }
    );
  };

  useEffect(() => {
    // console.log(error);
    if (error) {
      console.log(error.message);
    }

    if (data) {
      Swal.fire("회원가입 완료");
    }
    reset();
    //if (error) console.log(error.response.status);
  }, [data, error, reset]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="이메일" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="username" label="닉네임" name="username" autoComplete="user-name" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="비밀번호" type="password" id="password" autoComplete="new-password" />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error.message}</Alert>
                </Grid>
              )}
            </Grid>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
