"use client";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { usePathname, useRouter } from "next/navigation";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import ScoreboardOutlinedIcon from "@mui/icons-material/ScoreboardOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import Link from "next/link";
export default function FooterTabs(props: any) {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const onLink = (href: string) => {
    // console.log(href);
    if (href === "") router.push("/");
    // else if (href === "help") router.push(href);
    else router.push(href + "/" + props.gameId);
  };

  const menu = [
    {
      label: "플레이어",
      url: "/players",
    },
    {
      label: "규칙",
      url: "/rules",
    },
    {
      label: "스코어",
      url: "/scores",
    },
    {
      label: "도움말",
      url: "/help",
    },
  ];

  React.useEffect(() => {
    const page = pathname.split("/")[1];
    const v = menu.findIndex(m => m.url.indexOf(page) === 1);
    setValue(v);
  }, [pathname]);

  return (
    <BottomNavigation showLabels value={value}>
      <BottomNavigationAction label="플레이어" icon={<PeopleOutlineOutlinedIcon />} onClick={() => onLink("/players")} />
      <BottomNavigationAction label="규칙" icon={<GavelOutlinedIcon />} onClick={() => onLink("/rules")} />
      <BottomNavigationAction label="스코어" icon={<ScoreboardOutlinedIcon />} onClick={() => onLink("/scores")} />
      <BottomNavigationAction label="십계명" icon={<AutoStoriesOutlinedIcon />} onClick={() => router.push("/help")} />
    </BottomNavigation>
  );
}
