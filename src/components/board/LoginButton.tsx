"use client";
import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <Button onClick={() => signOut()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        로그아웃
      </Button>
    );
  } else {
    return (
      <Button onClick={() => signIn()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        로그인
      </Button>
    );
  }
};

export default LoginButton;
