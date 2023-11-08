import { Link, Typography } from "@mui/material";

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href={props.url}>
        {props.url}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
