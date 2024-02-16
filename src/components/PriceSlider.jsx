import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Grid from "@mui/system/Unstable_Grid/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

function valuetext(value) {
  if (Array.isArray(value)) {
    return `${value[0]}-${value[1]} ฿`;
  }
  return "";
}

const minDistance = 500;

export default function PriceSlider({ priceRange, onPriceChange }) {
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      onPriceChange([
        Math.min(newValue[0], priceRange[1] - minDistance),
        priceRange[1],
      ]);
    } else {
      onPriceChange([
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + minDistance),
      ]);
    }
  };

  return (
    <Box>
      <Slider
        getAriaLabel={() => "Price range"}
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min={0}
        max={3000}
        disableSwap
        sx={{
          "& .MuiSlider-thumb": {
            width: "13px",
            height: "13px",
            color: "white",
            border: "4px solid rgba(24, 82, 214, 1)",
          },
          "& .MuiSlider-rail": {
            color: "rgba(179, 184, 196, 1)",
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "rgba(255, 255, 255, 0)",
            color: "rgba(24, 82, 214, 1)",
            position: "absolute",
            top: "35px",
          },
          color: "rgba(76, 127, 244, 1)",
          height: "6px",
          width: "200px",
        }}
      />
    </Box>
  );
}

export const PriceSliderSelect = ({ priceRange, onPriceChange }) => {
  const handlePriceChange = (event) => {
    onPriceChange(event.target.value);
  };

  return (
    <Box sx={{ width: "150px", margin: "12px", marginTop: "30px" }}>
      <FormControl fullWidth>
        <InputLabel
          sx={{
            margin: "0",
            padding: "0",
            height: "20px",
            position: "relative",
            top: "10px",
          }}
        >
          ราคา
        </InputLabel>
        <Select
          value={valuetext(priceRange)}
          onChange={handlePriceChange}
          sx={{
            position: "relative",
            bottom: "15px",
            margin: "0",
            padding: "0",
            color: "rgba(35, 38, 48, 1)",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem
            value={valuetext(priceRange)}
            sx={{
              color: "rgba(100, 108, 128, 1)",
              marginTop: "10px",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent", // ลบสีพื้นหลังเมื่อ hover
              },
              "&.Mui-focusVisible": {
                backgroundColor: "transparent", // ลบสีพื้นหลังเมื่อ focus
              },
              "&.Mui-selected": {
                backgroundColor: "white !important",
                "&:hover": {
                  backgroundColor: "white ", // ลบสีพื้นหลังเมื่อ hover ในสถานะที่เลือก
                },
              },
            }}
          >
            {valuetext(priceRange)}
          </MenuItem>
          <MenuItem
            value={priceRange}
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent", // ลบสีพื้นหลังเมื่อ hover
              },
              "&.Mui-focusVisible": {
                backgroundColor: "transparent", // ลบสีพื้นหลังเมื่อ focus
                outline: "none", // ลบเส้นโครงร่าง (outline) เมื่อ focus
              },
              "&.Mui-selected": {
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white", // ลบสีพื้นหลังเมื่อ hover ในสถานะที่เลือก
                },
              },
            }}
          >
            <PriceSlider
              priceRange={priceRange}
              onPriceChange={onPriceChange}
            />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
