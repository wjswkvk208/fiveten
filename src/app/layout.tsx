import FooterTabs from "@/components/FooterTabs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Paper from "@mui/material/Paper";

const inter = Inter({ subsets: ["latin"] });

import { cookies } from "next/headers";
import { Container, Typography } from "@mui/material";
import CustomStepper from "@/components/Stepper";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_META_TITLE,
  description: process.env.NEXT_PUBLIC_META_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies().get("gameId");
  const gameId = cookieStore?.value;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              {process.env.NEXT_PUBLIC_MAIN_TITLE}
            </Typography>
            <CustomStepper />

            {children}

            <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
              <FooterTabs gameId={gameId} />
            </Paper>
          </Paper>
        </Container>
      </body>
    </html>
  );
}
