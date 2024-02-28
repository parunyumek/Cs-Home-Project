"use client";
import React, { useState } from "react";
import AdminNavbar2 from "@/components/AdminNavbar2";
import AdminSideBar from "@/components/AdminSidebar";
import Link from "next/link";
import { supabase } from "/supabase.js";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Page = () => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [categoryName, setCategoryName] = useState("");

  const router = useRouter();

  const navbarTitle = "เพิ่มหมวดหมู่";
  const buttonText1 = "ยกเลิก";
  const buttonText2 = "สร้าง";

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if subServiceItems is null or empty
    if (!categoryName) {
      Swal.fire({
        title: "<p class='text-red-600'>โปรดตรวจเช็คข้อมูล</p>",
        text: "กรุณาระบุข้อมูลให้ครบทุกช่อง",
        icon: "question",
        confirmButtonColor: "#2563EB",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      // Insert data into 'services' table
      const { data } = await supabase
        .from("categories")
        .insert([{ category_name: categoryName }]);
      console.log("Data inserted successfully:", data);
      // Clear form fields after successful insertion
      setCategoryName("");

      router.push("/admin/category"); // Reset subServiceItems
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  const handleCancelButtonClick = () => {
   router.push("/admin/category")
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <div className="bg-[#f3f4f6] w-screen h-screen ">
      <AdminNavbar2
        title1={navbarTitle}
        buttonTitle1={buttonText1}
        buttonTitle2={buttonText2}
        button1click={handleCancelButtonClick}
        button2click={handleSubmit}
      />
      <AdminSideBar />
      <form
        className="ml-72 mt-28 bg-white w-4/5 h-auto rounded-[10px] pb-11 fixed"
        onSubmit={handleSubmit}
      >
        <label htmlFor="categoryName" className="text-gray-700 ml-5 font-bold">
          ชื่อหมวดหมู่<span className="text-rose-700 text-[16px]">*</span>
        </label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          value={categoryName}
          onChange={handleCategoryNameChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-10 ml-48 w-[440px] text-gray-700"
        />
      </form>
      {/* Confirmation Popup */}
      {isDeleteConfirmationOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white w-[360px] h-[270px] rounded-lg  p-6 text-[#00144D] shadow-md relative">
              <img
                src="/assets/icons/alerticon.svg"
                className="ml-[130px] mb-4"
              />
              <button
                className="text-[#4F5E8C] absolute right-7  top-5 "
                onClick={handleCancelDelete}
              >
                X
              </button>
              <p className="text-[20px] font-semibold mb-4 text-center">
                ยืนยันการลบรายการ?{" "}
              </p>
              <p className="text-[16px] font-light mb-10 text-center ">
                คุณต้องการลบรายการ ‘{categoryName}’ ใช่หรือไม่{" "}
              </p>
              <div className="flex justify-center gap-2">
                <Link
                  className="mr-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-[112px] h-[44px]"
                  href="/admin/category"
                >
                  ลบรายการ
                </Link>
                <button
                  className="bg-white px-4 py-2 rounded-lg border-[1px] border-blue-600 text-blue-600 w-[112px] h-[44px]"
                  onClick={handleCancelDelete}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
