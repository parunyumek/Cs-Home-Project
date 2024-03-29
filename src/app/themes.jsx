"use client";

import { createTheme } from "@mui/material/styles";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  weight: "400",
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: `${prompt.style.fontFamily}, sans-serif`,
  },
});

export default theme;
