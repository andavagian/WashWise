import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import {useUserInput} from "./ContextProvider";

const dotAnimation = keyframes`
  0%, 20% { opacity: 0; }
  40%, 100% { opacity: 1; }
`;

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    justifyContent: "center",
    mt: 2
  },
  animatedDots: {
    display: "inline-block",
    "& span": {
      animation: `${dotAnimation} 1.5s infinite`,
      opacity: 0,
      mx: 0.25,
    },
    "& span:nth-of-type(1)": { animationDelay: "0s" },
    "& span:nth-of-type(2)": { animationDelay: "0.3s" },
    "& span:nth-of-type(3)": { animationDelay: "0.6s" },
  }
}

function Header() {
  const { city } = useUserInput()

  return <Box sx={styles.root}>
    <Typography variant="h1" textAlign='center'>WashWise in {city ? city : 'your city'}</Typography>
    <Typography variant="h4" textAlign='center'>
      Helping You Plan the Ideal Time for a Car Wash
      <Box component="span" sx={styles.animatedDots}>
        <span>.</span><span>.</span><span>.</span>
      </Box>
    </Typography>
  </Box>
}

export default Header;