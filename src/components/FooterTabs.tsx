"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { getCookie } from "@/app/actions";
export default function FooterTabs(props: any) {
  const [value, setValue] = React.useState(0);
  // const [gameId, setGameId] = React.useState("1");
  const router = useRouter();

  // React.useEffect(() => {
  //   const gameId = getCookie();
  //   // setGameId(gameId );
  // }, []);

  const onLink = (href: string) => {
    // console.log(href === "");
    if (href === "") router.push("/");
    else router.push(href + "/" + props.gameId);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        // console.log(event, newValue);
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="홈" icon={<RestoreIcon />} onClick={() => onLink("")} />
      <BottomNavigationAction label="플레이어" icon={<RestoreIcon />} onClick={() => onLink("/players")} />
      <BottomNavigationAction label="규칙" icon={<FavoriteIcon />} onClick={() => onLink("/rules")} />
      <BottomNavigationAction label="스코어" icon={<LocationOnIcon />} onClick={() => onLink("/scores")} />
    </BottomNavigation>
  );
}
