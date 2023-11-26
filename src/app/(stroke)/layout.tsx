import Copyright from "@/components/Copyright";
import FooterTabs from "@/components/FooterTabs";
import CustomStepper from "@/components/Stepper";
import { Container, Paper, Typography } from "@mui/material";
import { cookies } from "next/headers";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies().get("gameId");
  const gameId = cookieStore?.value;

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          {process.env.NEXT_PUBLIC_MAIN_TITLE}
        </Typography>
        <CustomStepper />

        {children}

        <Copyright url={process.env.NEXT_PUBLIC_TELEGRAM_URL} sx={{ mt: 2 }} />
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
          <FooterTabs gameId={gameId} />
        </Paper>
      </Paper>
    </Container>
  );
}
