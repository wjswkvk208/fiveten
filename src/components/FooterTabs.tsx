"use client";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { usePathname, useRouter } from "next/navigation";

export default function FooterTabs(props: any) {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const onLink = (href: string) => {
    if (href === "") router.push("/");
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
      label: "커뮤니티",
      url: "/",
    },
  ];

  React.useEffect(() => {
    const page = pathname.split("/")[1];
    const v = menu.findIndex(m => m.url.indexOf(page) === 1);
    setValue(v);
  }, [pathname]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      // onChange={(event, newValue) => {

      //   // console.log(event, newValue);
      //   setValue(newValue);
      // }}
    >
      <BottomNavigationAction label="플레이어" icon={<RestoreIcon />} onClick={() => onLink("/players")} />
      <BottomNavigationAction label="규칙" icon={<FavoriteIcon />} onClick={() => onLink("/rules")} />
      <BottomNavigationAction label="스코어" icon={<LocationOnIcon />} onClick={() => onLink("/scores")} />
      <BottomNavigationAction label="커뮤니티" icon={<RestoreIcon />} onClick={() => onLink("/")} />
    </BottomNavigation>
  );
}
