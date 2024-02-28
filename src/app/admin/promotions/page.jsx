"use client";

import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";
import { createClient } from "@/supabase/client";
import { useState, useEffect } from "react";

const page = () => {
  const [promotionData, setPromotionData] = useState([]);
  // Your admin page content
  const navbarTitle = "Promotion Code";
  const inputPlaceHolder = "ค้นหาPromotion Code..";
  const createCategoryTitle = "เพิ่ม Promotion Code +";
  const linkToCreateCategory = "/admin/promotions/create-promotion";
  const supabase = createClient();

  const fetchData = async () => {
    let { data, error } = await supabase.from("promotions").select("*");
    if (error) {
      console.log("error", error);
      return;
    }
    setPromotionData(data);
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
    <div className="flex">
      <div>
        <AdminSideBar />
      </div>
      <div className="w-[100%]">
        <AdminNavbar
          title1={navbarTitle}
          title2={inputPlaceHolder}
          title3={createCategoryTitle}
          buttonlink1={linkToCreateCategory}
        />
        <div className="flex flex-col m-10">
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
              className="flex flex-row justify-between w-[100%] py-8 px-5 border-gray-200 border-[1px]"
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
                <div className="mr-5 w-6">
                  <img src="/assets/icons/trashbin.svg" />
                </div>
                <div className="w-6">
                  <img src="/assets/icons/edit.svg" />
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default page;
