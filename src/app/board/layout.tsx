import LoginButton from "@/components/board/LoginButton";
import { AppBar, Container, CssBaseline, GlobalStyles, ThemeProvider, Toolbar, createTheme, Typography, Link, Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  // const cookieStore = cookies().get("gameId");
  // const gameId = cookieStore?.value;

  return (
    <>
      <GlobalStyles
        styles={{
          ul: { margin: 0, padding: 0, listStyle: "none" },
        }}
      />
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {process.env.NEXT_PUBLIC_MAIN_TITLE + "게시판"}
          </Typography>
          <nav>
            <Link variant="button" color="text.primary" href="/" sx={{ my: 1, mx: 1.5 }}>
              계산기
            </Link>
          </nav>

          <LoginButton />
        </Toolbar>
      </AppBar>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        {children}
      </Container>
    </>
  );
}
