"use client";
import AdminNavbar2 from "@/components/AdminNavbar2";
import AdminSideBar from "@/components/AdminSidebar";
import { InputAdornment, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState,useEffect } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../../supabase";

const page = () => {
  const [promotionCode, setPromotionCode] = useState("");
  const [type, setType] = useState("Fixed");
  const [discount, setDiscount] = useState("");
  const [quota, setQuota] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [expiryDate, setExpiryDate] = useState({
    date: "",
    hour: "",
    minute: "",
  });
  const [promotionData, setPromotionData] = useState([]);
console.log(selectedTime);
  const navbarTitle = "เพิ่ม Promotion Code";
  const buttonCancle = "ยกเลิก";
  const buttonCreate = "สร้าง";
  const linkToCancle = "";
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
console.log(id);
  const router = useRouter();

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handlePromotionCode = (e) => {
    setPromotionCode(e.target.value);
  };

  const handleQuota = (e) => {
    setQuota(e.target.value);
  };

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promotionData = {
      promotionCode,
      type,
      discount,
      quotaLimit: quota,
      remainingQuota: quota,
      expiryDate: expiryDate.date,
      expiryTime: `${expiryDate.hour}:${expiryDate.minute}`,
    };
    const { error } = await supabase.from("promotions").insert([
      {
        promotion_code: promotionData.promotionCode,
        promotion_type: promotionData.type,
        promotion_discount: promotionData.discount,
        quota_limit: promotionData.quotaLimit,
        remaining_quota: promotionData.remainingQuota,
        expiry_date: promotionData.expiryDate,
        expiry_time: promotionData.expiryTime,
      },
    ]);
    if (error) {
      console.error("promotionCreate", error.message);
    }
    router.push("/admin/promotions");
  };

  const handleEdit = async (e) => {

    const { data, error } = await supabase
      .from("promotions")
      .update({ other_column: "otherValue" })
      .eq("id", id)
      .select();
      if (error) {
        console.error("promotionEdit", error.message);
      }
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        
          const { data, error } = await supabase
            .from("promotions")
            .select("*")
            .eq("id", id)
            .single();
          setPromotionData(data)
          setSelectedDate(dayjs(data.expiry_date));
          setSelectedTime(dayjs(data.expiry_time, "HH:mm"));
          setType(data.promotion_type);

          console.log(data);
      } catch (error) {
        console.error("Error fetching service:", error.message);
      }
    };

    fetchService();
  }, []);

  const minTime = dayjs().add(1, "hour");
  return (
    <div className="bg-[#f3f4f6]">
      <AdminNavbar2
        title1={navbarTitle}
        buttonTitle1={buttonCancle}
        buttonTitle2={buttonCreate}
        button1click={linkToCancle}
        button2click={handleSubmit}
      />
      <AdminSideBar />
      <div className="w-[100%]">
        <div className="flex flex-col bg-white rounded-lg border fixed left-[280px] top-[150px] w-[1570px]">
          <div className="m-9">
            <div className="flex flex-row items-center ">
              <p className=" text-[16px] text-gray-500 mr-[100px]">
                Promotion Code
              </p>
              <div>
                <TextField
                value={promotionData.promotion_code}
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
                      value={type}
                      onChange={handleTypeChange}
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
                        disabled={type === "Percent"}
                        
                        variant="outlined"
                        onChange={handleDiscount}
                        InputProps={{
                          sx: {
                            borderRadius: "7px",
                            width: "140px",
                            height: "42px",
                            backgroundColor:
                              type === "Percent" ? "#E8E8E8" : null,
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
                        disabled={type === "Fixed"}
                        
                        variant="outlined"
                        onChange={handleDiscount}
                        InputProps={{
                          sx: {
                            borderRadius: "7px",
                            marginTop: "15px",
                            width: "140px",
                            height: "42px",
                            backgroundColor:
                              type === "Fixed" ? "#E8E8E8" : null,
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
                value={promotionData.quota_limit}
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
              <div className="mr-5 flex">
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      format="DD/MM/YYYY"
                      value={selectedDate}
                      defaultValue={expiryDate.date}
                      onChange={(date) => setSelectedDate(date)}
                      slotProps={{
                        textField: {
                          placeholder: "กรุณาเลือกวันที่",
                          height: "44px",
                          width: "205px",
                        },
                      }}
                      sx={{
                        width: "205px",
                        height: "44px",
                        "& .MuiOutlinedInput-root": {
                          height: "44px",
                          borderRadius: "0.5rem",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#a1a1aa",
                        },
                        "& .MuiIconButton-root .MuiSvgIcon-root": {
                          color: "#AAAAAA",
                        },
                      }}
                      onAccept={(value) => {
                        console.log(
                          "value :>> ",
                          dayjs(value).format("YYYY-MM-DD")
                        );
                        setExpiryDate({
                          ...expiryDate,
                          date: dayjs(value).format("YYYY-MM-DD"),
                        });
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="ml-6 ">
                  <label htmlFor="time"></label>
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
                      slotProps={{
                        textField: {
                          placeholder: "กรุณาเลือกเวลา",
                        },
                      }}
                      sx={{
                        width: "205px",
                        height: "44px",
                        "& .MuiOutlinedInput-root": {
                          height: "44px",
                          borderRadius: "0.5rem",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#a1a1aa",
                        },
                        "& .MuiIconButton-root .MuiSvgIcon-root": {
                          color: "#AAAAAA",
                        },
                      }}
                      onAccept={(value) => {
                        setExpiryDate({
                          ...expiryDate,
                          hour: dayjs(value).hour(),
                          minute: dayjs(value).minute(),
                        });
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
