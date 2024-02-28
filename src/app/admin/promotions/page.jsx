"use client";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";
import { createClient } from "@/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const page = () => {
  const [promotionData, setPromotionData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idTarget, setIdTarget] = useState(null);
  const [codeTarget, setCodeTarget] = useState(null);

  const navbarTitle = "Promotion Code";
  const inputPlaceHolder = "ค้นหาPromotion Code..";
  const createCategoryTitle = "เพิ่ม Promotion Code +";
  const linkToCreateCategory = "/admin/promotions/create-promotion";
  const supabase = createClient();

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("promotions")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      console.log("get promotion", error);
      return;
    }
    setPromotionData(data);
  };

  const handleConfermDelete = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("promotions")
      .delete()
      .eq("id", idTarget);
    if (error) {
      console.log("promotion delete", error);
    }
    window.location.reload();
  };

  const handleDelete = async (e, id, code) => {
    e.preventDefault();
    setIdTarget(id);
    setCodeTarget(code);
    setOpen(true);
  };

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const formattedDate = `${day}/${month}/${year} ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")}${ampm}`;

    return formattedDate;
  }

  function formatTime(timeString) {
    // แยกชั่วโมงและนาที
    if (!timeString) return "Invalid time";

    // แยกชั่วโมงและนาที
    const [hourString, minuteString] = timeString.split(':');
    let hour = parseInt(hourString);
    let minute = parseInt(minuteString);
    
    // ปรับรูปแบบเวลา
    let formattedHour = (hour < 10 ? '0' : '') + hour; // เพิ่มเลข 0 ถ้าหลักเดียว
    let ampm = 'AM';
    if (hour >= 12) {
        formattedHour = hour - 12;
        ampm = 'PM';
    }
    if (formattedHour === 0) {
        formattedHour = 12;
    }

    // เพิ่มเลข 0 ถ้าหลักเดียว
    let formattedMinute = (minute < 10 ? '0' : '') + minute;

    // ส่งค่าเวลาในรูปแบบ 'hh:mm AM/PM'
    return `${formattedHour}:${formattedMinute}${ampm}`;
}

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#f3f4f6]  h-screen">
      <AdminNavbar
        title1={navbarTitle}
        title2={inputPlaceHolder}
        title3={createCategoryTitle}
        buttonlink1={linkToCreateCategory}
      />
      <AdminSideBar />
      <div>
        <div className="flex flex-col fixed left-[280px] top-[150px] w-[1570px]">
          <div className="bg-gray-200 flex flex-row justify-between w-[100%] p-2 px-5  rounded-t-lg border-gray-200 border-[1px]">
            <p className="w-[166px]">Promotion</p>
            <p className="w-[105px]">ประเภท</p>
            <p className="w-[140px]">โควต้าการใช้(ครั้ง)</p>
            <p className="w-[145px]">ราคาที่ลด</p>
            <p className="w-[209px]">สร้างเมื่อ</p>
            <p className="w-[225px]">วันหมดอายุ</p>
            <p className="w-[80px]">Action</p>
          </div>
          {promotionData.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between w-[100%] py-8 px-5 bg-white border-gray-200 border-[1px]"
            >
              <p className="w-[166px]">{item.promotion_code}</p>
              <p className="w-[105px]">{item.promotion_type}</p>
              <p className="w-[140px]">
                {item.remaining_quota}/{item.quota_limit}
              </p>
              <p className="w-[145px] text-[#C82438]">
                -{item.promotion_discount}
                {item.promotion_type === "Fixed" ? "฿" : "%"}
              </p>
              <p className="w-[209px]">{formatDateTime(item.created_at)}</p>
              <p className="w-[225px]">
                {item.expiry_date} {formatTime(item.expiry_time)}
              </p>
              <div className="flex w-[85px] items-center">
                <button
                  onClick={(e) => handleDelete(e, item.id, item.promotion_code)}
                  className="mr-5 w-6"
                >
                  <img src="/assets/icons/trashbin.svg" />
                </button>
                <Link href={`/admin/promotions/detail?id=${item.id}`}>
                  <div className="w-6">
                    <img src="/assets/icons/edit.svg" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ sx: { borderRadius: "16px", display: "" } }}
        sx={{}}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1,
            "& .MuiButtonBase-root": {
              color: "base.400",
              display: "flex",
            },
          }}
        >
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ marginLeft: "auto", p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Box
            sx={{
              width: "360px",
              height: "270px",
              borderRadius: "16px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "260px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <img src="/assets/icons/alerticon.svg" />
              </Box>

              <DialogTitle
                id="alert-dialog-title"
                component="div"
                sx={{
                  textAlign: "center",
                  p: 0,
                  mb: 1,
                }}
              >
                ยืนยันการลบรายการ?
              </DialogTitle>
              <DialogContentText
                id="alert-dialog-description"
                component="div"
                sx={{ textAlign: "center", mb: 2 }}
              >
                คุณต้องการลบรายการ ‘{codeTarget}’
                <br /> ใช่หรือไม่
              </DialogContentText>
              <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleConfermDelete}
                  fullWidth
                  sx={{
                    backgroundColor: "#336DF2",
                    width: "112px",
                    height: "44px",
                    borderRadius: "8px",
                  }}
                >
                  ลบรายการ
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleClose}
                  sx={{
                    color: "#336DF2",
                    borderColor: "#336DF2",
                    width: "112px",
                    height: "44px",
                    borderRadius: "8px",
                  }}
                >
                  ยกเลิก
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default page;
