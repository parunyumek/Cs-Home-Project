"use client";
import AdminNavbar3 from "@/components/AdminNavbar3";
import AdminSideBar from "@/components/AdminSidebar";
import { createClient } from "@/supabase/client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const [promotionData, setPromotionData] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const navbarTitle = "Promotion Code";
  const navbarTitle2 = " Code";
  const editPromotion = "แก้ไข";
  const linkToPromotionPage = "/admin/promotions";
  const supabase = createClient();

  const handleLinkToEditPage = () => {
    router.push(`/admin/promotions/edit-promotion?id=${id}`);
  };

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("promotions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("get promotion", error);
      return;
    }
    setPromotionData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  function formatDateTime2(timestamp) {
    const date = new Date(timestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year} `;
  }

  function formatTime(timeString) {
    // แยกชั่วโมงและนาที
    if (!timeString) return "Invalid time";

    // แยกชั่วโมงและนาที
    const [hourString, minuteString] = timeString.split(":");
    let hour = parseInt(hourString);
    let minute = parseInt(minuteString);

    // ปรับรูปแบบเวลา
    let formattedHour = (hour < 10 ? "0" : "") + hour; // เพิ่มเลข 0 ถ้าหลักเดียว
    let ampm = "AM";
    if (hour >= 12) {
      formattedHour = hour - 12;
      ampm = "PM";
    }
    if (formattedHour === 0) {
      formattedHour = 12;
    }

    // เพิ่มเลข 0 ถ้าหลักเดียว
    let formattedMinute = (minute < 10 ? "0" : "") + minute;

    // ส่งค่าเวลาในรูปแบบ 'hh:mm AM/PM'
    return `${formattedHour}:${formattedMinute}${ampm}`;
  }

  console.log(promotionData);

  return (
    <div>
      <AdminNavbar3
        title1={navbarTitle}
        title2={navbarTitle2}
        buttonTitle1={editPromotion}
        button2Click={handleLinkToEditPage}
        backButtonClick={linkToPromotionPage}
      />
      <AdminSideBar />
      <div className="flex flex-col fixed left-[280px] top-[150px] w-[1570px] bg-white gap-10 p-6 py-10 border rounded-lg ">
        <div className="flex flex-row ">
          <p className="w-[250px] text-[#646C80]">Promotion Code</p>
          <p>{promotionData.promotion_code}</p>
        </div>
        <div className="flex flex-row ">
          <p className="w-[250px] text-[#646C80]">ประเภท</p>
          <p>{promotionData.promotion_type}</p>
        </div>
        <div className="flex flex-row ">
          <p className="w-[250px] text-[#646C80]">ราคาที่ลด</p>
          <p className=" text-[#C82438]">
            -{promotionData.promotion_discount}
            {promotionData.promotion_type === "Fixed" ? "฿" : "%"}
          </p>
        </div>
        <div className="flex flex-row ">
          <p className="w-[250px] text-[#646C80]">โควต้าการใช้</p>
          <p>
            {promotionData.remaining_quota}/{promotionData.quota_limit}
          </p>
        </div>
        <div className="flex flex-row ">
          <p className="w-[250px] text-[#646C80] ">วันหมดอายุ</p>
          <p>
            {formatDateTime2(promotionData.expiry_date)}{" "}
            {formatTime(promotionData.expiry_time)}
          </p>
        </div>
        <hr className="" />
        <div className="flex flex-row ">
          <p className="w-[250px] text-[#646C80]">สร้างเมื่อ</p>
          <p>{formatDateTime(promotionData.created_at)}</p>
        </div>
        <div className="flex flex-row ">
          <p className="w-[250px] text-[#646C80]">แก้ไขล่าสุด</p>
          <p>{formatDateTime(promotionData.updated_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
