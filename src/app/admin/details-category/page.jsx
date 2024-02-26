"use client";

import AdminSideBar from "@/components/AdminSidebar";
import AdminNavbar3 from "@/components/AdminNavbar3";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Category } from "@mui/icons-material";
import { supabase } from "../../../../supabase";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDetails, setCategoryDetails] = useState("");

  const buttonText = "แก้ไข";
  const title = "บริการ";
  const backToServiceLists = "/admin/category";

  const router = useRouter();

  const handleEditButton = (service) => {
    router.push(`/admin/edit-category?id=${id}`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Get UTC time in milliseconds
    const utcTime = date.getTime();

    // Bangkok, Thailand is UTC+7
    const bangkokOffset = 24 * 60 * 60 * 1000; // 7 hours in milliseconds
    const bangkokTime = new Date(utcTime + bangkokOffset);

    const day = bangkokTime.getDate().toString().padStart(2, "0");
    const month = (bangkokTime.getMonth() + 1).toString().padStart(2, "0");
    const year = bangkokTime.getFullYear();
    const hours = bangkokTime.getHours().toString().padStart(2, "0");
    const minutes = bangkokTime.getMinutes().toString().padStart(2, "0");
    const ampm = bangkokTime.getHours() >= 12 ? "PM" : "AM";

    return `${day - 1}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("id", id)
            .single();
          if (error) {
            throw error;
          }
          if (data) {
            data.created_at = formatDate(data.created_at);
            data.updated_at = formatDate(data.updated_at);

            setCategoryDetails(data);
            setCategoryName(data.category_name);
          }
        }
      } catch (error) {
        console.error("Error fetching service:", error.message);
      }
    };

    fetchCategory();
  }, []);

  if (!categoryDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#f3f4f6] w-screen h-screen ">
      <AdminNavbar3
        buttonTitle1={buttonText}
        title1={title}
        title2={categoryName}
        backButtonClick={backToServiceLists}
        button2Click={handleEditButton}
      />
      <AdminSideBar />
      <div className="ml-72 mt-28 bg-white w-4/5 h-auto rounded-[10px] pb-11 fixed">
        <div className=" text-gray-700 ml-5 font-bold mt-9 flex flex-row">
          <p>
            ชื่อหมวดหมู่<span className="text-rose-700 text-[16px]">*</span>
          </p>
          <p className="text-black ml-36">{categoryName}</p>
        </div>
        <hr className="w-[1500px] mt-10 ml-4"></hr>
        <div className="ml-6">
          <div className="flex flex-row mt-8 mb-8">
            <p className="text-[#646C80] text-[16px]  font-bold">สร้างเมื่อ</p>
            <p className="text-[#646C80] text-[16px] ml-[165px]  ">
              {categoryDetails.created_at}
            </p>
          </div>
          <div className="flex flex-row">
            <p className="text-[#646C80] text-[16px] mb-8 font-bold">
              แก้ไขล่าสุด
            </p>
            <p className="text-[#646C80] text-[16px] ml-[155px]  mb-8">
              {categoryDetails.updated_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
