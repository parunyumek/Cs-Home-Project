"use client";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";
import { createClient } from "@/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Stack";
import CloseIcon from '@mui/icons-material/Close';

import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { SxProps } from "@mui/system";

const page = () => {
  const [promotionData, setPromotionData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idTarget, setIdTarget] = useState(null);

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

  const handleDelete = async (e, id) => {
    e.preventDefault();
    setIdTarget(id);
    setOpen(true);
  };

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const time = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
    return `${day}/${month}/${year} ${time}`;
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
                {item.expiry_date} {item.expiry_time}
              </p>
              <div className="flex w-[85px] items-center">
                <button
                  onClick={(e) => handleDelete(e, item.id)}
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
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ยืนยันการลบรายการ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            คุณต้องการลบรายการ ‘HOME0202’<br/> ใช่หรือไม่
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={} onClick={handleConfermDelete}>ลบรายการ</Button>
          <Button onClick={handleClose} autoFocus>
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog> */}
      <Box >
      <Dialog onClose={handleClose} open={open} >
        <DialogContent  >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              
              "& .MuiButtonBase-root": { color: "base.400", display: "flex" },
            }}
          ><IconButton size='small' onClick={handleClose} sx={{ marginLeft: 'auto', p: 0 }}>
          <CloseIcon className='icon-close' />
        </IconButton></Box>
          <Box sx={{
            
           
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
            mx: 'auto'
          }}>
          <img src="/assets/icons/alerticon.svg"  className=""/>
          </Box>
          
          <DialogTitle
            id="alert-dialog-title"
            component="div"
            sx={{ textAlign: "center", p: 0, mb: 3 }}
          >
            ยืนยันการลบรายการ?
          </DialogTitle>
          <DialogContentText
            id="alert-dialog-description"
            component="div"
            sx={{ textAlign: "center" }}
          >
            คุณต้องการลบรายการ ‘HOME0202’
            <br /> ใช่หรือไม่
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: 4}}>
          <Button
            type="button"
            variant="contained"
            onClick={handleConfermDelete}
            fullWidth
            sx={{
              backgroundColor: "#336DF2"
            }}
          >
            ลบรายการ
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={handleClose}
            fullWidth
            sx={{
              color: "#336DF2",
              borderColor: "#336DF2"
            }}
          >
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </div>
  );
};

export default page;
