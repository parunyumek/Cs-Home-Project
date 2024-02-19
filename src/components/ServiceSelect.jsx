import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ServiceSelect({
  name,
  firstSelect,
  secondSelect,
  thirdSelect,
  fourthSelect,
  label,
  width,
  onSelectOption,
}) {
  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    onSelectOption(selectedOption); // ส่งค่าหมวดหมู่ที่เลือกไปยัง parent component (ServiceSearchBar)
  };

  return (
    <Box sx={{ width: width, margin: "12px", marginTop: "30px" }}>
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
          {name}
        </InputLabel>
        <Select
          defaultValue={firstSelect}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          onChange={handleOptionChange}
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
            value={firstSelect}
            sx={{
              color: "rgba(100, 108, 128, 1)",

              "&:hover": {
                backgroundColor: "white", // ลบสีพื้นหลังเมื่อ hover
              },
              "&.Mui-focusVisible": {
                backgroundColor: "white", // ลบสีพื้นหลังเมื่อ focus
              },
              "&.Mui-selected": {
                color: "rgba(24, 82, 214, 1)",
                backgroundColor: "transparent !important",
                "&:hover": {
                  backgroundColor: "white", // ลบสีพื้นหลังเมื่อ hover ในสถานะที่เลือก
                },
              },
            }}
          >
            {firstSelect}
          </MenuItem>
          <MenuItem
            value={secondSelect}
            sx={{
              color: "rgba(100, 108, 128, 1)",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent", // ลบสีพื้นหลังเมื่อ hover
              },
              "&.Mui-focusVisible": {
                backgroundColor: "transparent", // ลบสีพื้นหลังเมื่อ focus
              },
              "&.Mui-selected": {
                color: "rgba(24, 82, 214, 1)",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white", // ลบสีพื้นหลังเมื่อ hover ในสถานะที่เลือก
                },
              },
            }}
          >
            {secondSelect}
          </MenuItem>
          <MenuItem
            value={thirdSelect}
            sx={{
              color: "rgba(100, 108, 128, 1)",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent", // ลบสีพื้นหลังเมื่อ hover
              },
              "&.Mui-focusVisible": {},
              "&.Mui-selected": {
                color: "rgba(24, 82, 214, 1)",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white", // ลบสีพื้นหลังเมื่อ hover ในสถานะที่เลือก
                },
              },
            }}
          >
            {thirdSelect}
          </MenuItem>
          <MenuItem
            value={fourthSelect}
            sx={{
              color: "rgba(100, 108, 128, 1)",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent", // ลบสีพื้นหลังเมื่อ hover
              },
              "&.Mui-focusVisible": {
                backgroundColor: "transparent", // ลบสีพื้นหลังเมื่อ focus
              },
              "&.Mui-selected": {
                color: "rgba(24, 82, 214, 1)",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white", // ลบสีพื้นหลังเมื่อ hover ในสถานะที่เลือก
                },
              },
            }}
          >
            {fourthSelect}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
