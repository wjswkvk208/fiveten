import { Box } from "@mui/material";

const sx = {
  px: "1rem",
  // width: 1024,
  m: "0 auto",
  //mx: "0 auto",
  "@media (max-width: 1024px)": {
    width: 768,
  },
  "@media (max-width: 768px)": {
    width: 1,
  },
};
const Responsive = ({ children, ...rest }: { children: React.ReactNode; rest?: any }) => {
  return (
    <Box sx={sx} {...rest}>
      {children}
    </Box>
  );
};

export default Responsive;
