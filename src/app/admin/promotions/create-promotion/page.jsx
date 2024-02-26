"use client";
import Logout from "@/components/Logout";
import AdminNavbar2 from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { InputAdornment, TextField, OutlinedInput } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState,useEffect } from "react";
import { grey } from "@mui/material/colors";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useSelector, useDispatch } from "react-redux";


const page = () => {
  // Your admin page content
  const navbarTitle = "เพิ่ม Promotion Code";
  const inputPlaceHolder = "ค้นหาPromotion Code..";
  const createCategoryTitle = "เพิ่ม Promotion Code +";
  const linkToCreateCategory = "";

  const [promotionCode, setPromotionCode] = useState("");
  const [value, setValue] = useState("Fixed");
  const [quota, setQuota] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

 

  const handlePromotionCode = (e) => {
    setPromotionCode(e.target.value);
  };

  const handleQuota = (e) => {
    setQuota(e.target.value);
  };

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const handleExpiryDate = (e) => {
    setExpiryDate(e.target.value);
  };

  const dispatch = useDispatch();
  const addressState = useSelector((state) => state.address);

  const [selectedDate, setSelectedDate] = useState(null); // เก็บค่าวันที่ที่เลือก
  const [selectedTime, setSelectedTime] = useState(null); // เก็บค่าเวลาที่เลือก

  const [address, setAddress] = useState({ 
    date: "",
    hour: "",
    minute: "",
  });
console.log(address);
  useEffect(() => {
    setAddress({ ...address, ...addressState });
  }, []);

  const handleChange = (scope) => (value) => {
    setAddress((oldAddr) => ({
      ...oldAddr,
      [scope]: value,
    }));
  };

  const handleSelect = (value) => {
    setAddress({ ...address, ...value });
    dispatch(
      saveAddress({
        ...address,
        ...value,
        hour: address.hour,
        minute: address.minute,
        address: address.address,
      })
    );
  };

  const minTime = dayjs().add(1, "hour");


  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    // Assuming inputDate is in format YYYY-MM-DD
    const dateParts = inputDate.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
    const day = parseInt(dateParts[2], 10);
    
    const date = new Date(year, month, day);

    setSelectedDate(date);
  };
  return (
    <div className="flex">
      <div>
        <AdminSideBar />
      </div>
      <div className="w-[100%]">
        <AdminNavbar2
          title1={navbarTitle}
          title2={inputPlaceHolder}
          title3={createCategoryTitle}
          buttonlink1={linkToCreateCategory}
        />
        <div className="flex flex-col m-10 bg-white rounded-lg border">
          <div className="m-9">
            <div className="flex flex-row items-center my-5">
              <p className=" text-[16px] text-gray-500 mr-[100px]">
                Promotion Code
              </p>
              <div>
                <TextField
                onChange={handlePromotionCode}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: "7px",
                      height: "42px",
                      width: "430px",
                    },
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row my-9">
              <p className="mr-2 text-gray-500">ประเภท</p>
              <div className="ml-[170px]">
                <div className="flex flex-row">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Fixed"
                        control={<Radio />}
                        label="Fixed"
                      />
                      <FormControlLabel
                        className="mt-3"
                        value="Percent"
                        control={<Radio />}
                        label="Percent"
                      />
                    </RadioGroup>
                  </FormControl>
                  <div className="ml-7">
                    <div>
                      <TextField
                        disabled={value === "Percent"}
                        variant="outlined"
                        onChange={handleDiscount}
                        InputProps={{
                          sx: {
                            borderRadius: "7px",
                            width: "140px",
                            height: "42px",
                            backgroundColor:
                              value === "Percent" ? "#E8E8E8" : null,
                          },
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ color: "#C8C8C8" }}
                            >
                              ฿
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        disabled={value === "Fixed"}
                        variant="outlined"
                        onChange={handleDiscount}
                        InputProps={{
                          sx: {
                            borderRadius: "7px",
                            marginTop: "15px",
                            width: "140px",
                            height: "42px",
                            backgroundColor:
                              value === "Fixed" ? "#E8E8E8" : null,
                          },
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ color: "#C8C8C8" }}
                            >
                              %
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center mb-10">
              <p className=" text-[16px] text-gray-500 mr-[145px]">
                โควต้าการใช้
              </p>
              <div>
                <TextField
                  variant="outlined"
                  onChange={handleQuota}
                  InputProps={{
                    sx: {
                      borderRadius: "7px",
                      height: "42px",
                      width: "430px",
                    },
                    endAdornment: (
                      <InputAdornment position="end" sx={{ color: "#C8C8C8" }}>
                        ครั้ง
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row items-center ">
              <p className=" text-[16px] text-gray-500 mr-[152px]">
                วันหมดอายุ
              </p>
              <div className="mr-5">
              <TextField
      variant="outlined"
      type="date" // This will show a date picker in supported browsers
      value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
      onChange={handleDateChange}
      InputProps={{
        sx: {
          borderRadius: "8px",
          height: "42px",
          width: "205px",
        },
      //   endAdornment: (
      //     <InputAdornment position="end" sx={{ color: "#C8C8C8" }}>
      //       <InsertInvitationIcon />
      //     </InputAdornment>
      //   ),
      }}
    />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast
                format="DD/MM/YYYY"
                value={selectedDate}
                defaultValue={address.date}
                onChange={(date) => setSelectedDate(date)}
                slotProps={{
                  textField: {
                    placeholder: "กรุณาเลือกวันที่",
                  },
                }}
                sx={{
                  width: "100%",
                  height: "44px",
                  "& .MuiOutlinedInput-root": {
                    padding: "16px 10px 16px 0px",
                    height: "44px",
                    borderRadius: "0.5rem",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a1a1aa",
                  },
                }}
                onAccept={(value) => {
                  console.log("value :>> ", dayjs(value).format("YYYY-MM-DD"));
                  setAddress({
                    ...address,
                    date: dayjs(value).format("YYYY-MM-DD"),
                  });
                  dispatch(
                    saveAddress({
                      ...addressState,
                      date: dayjs(value).format("YYYY-MM-DD"),
                    })
                  );
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="flex flex-col w-full gap-1 ">
            <label htmlFor="time">เวลาที่สะดวกใช้บริการ</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                disablePast={
                  selectedDate && selectedDate.isSame(new Date(), "day")
                }
                ampm={false}
                value={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                minTime={
                  selectedDate
                    ? selectedDate.isSame(new Date(), "day")
                      ? minTime
                      : null
                    : null
                }
                shouldDisableTime={(value) =>
                  selectedDate &&
                  (value.hour() > 16 ||
                    (value.hour() === 16 && value.minute() >= 31) ||
                    value.hour() < 8)
                }
                slotProps={{
                  textField: {
                    placeholder: "กรุณาเลือกเวลา",
                  },
                }}
                sx={{
                  width: "100%",
                  height: "44px",
                  "& .MuiOutlinedInput-root": {
                    padding: "16px 10px 16px 0px",
                    height: "44px",
                    borderRadius: "0.5rem",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a1a1aa",
                  },
                }}
                onAccept={(value) => {
                  setAddress({
                    ...address,
                    hour: dayjs(value).hour(),
                    minute: dayjs(value).minute(),
                  });
                  dispatch(
                    saveAddress({
                      ...addressState,
                      hour: dayjs(value).hour(),
                      minute: dayjs(value).minute(),
                    })
                  );
                }}
              />
            </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
