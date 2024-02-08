// page.jsx
"use client";
import React, { useState } from "react";
import AdminNavbar2 from "@/components/AdminNavbar2";
import AdminSideBar from "@/components/AdminSidebar";
import AdminCreateServiceForm from "@/components/AdminCreateServiceForm";
import Link from "next/link";

const Page = () => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [serviceName, setServiceName] = useState("");

  const navbarTitle = "เพิ่มบริการ";
  const buttonText1 = "ยกเลิก";
  const buttonText2 = "สร้าง";

  const handleCancelButtonClick = () => {
    // Open the confirmation popup

    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    // Close the confirmation popup
    setIsDeleteConfirmationOpen(false);
  };

  const handleServiceNameChange = (name) => {
    setServiceName(name); // Set serviceName in Page.jsx as well
  };

  return (
    <div className="bg-[#f3f4f6] w-screen h-screen ">
      <AdminNavbar2
        title1={navbarTitle}
        buttonTitle1={buttonText1}
        buttonTitle2={buttonText2}
        button1click={handleCancelButtonClick}
      />
      <AdminSideBar />
      <AdminCreateServiceForm onServiceNameChange={handleServiceNameChange} />

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
                คุณต้องการลบรายการ ‘{serviceName}’ ใช่หรือไม่{" "}
              </p>
              <div className="flex justify-center gap-2">
                <Link
                  className="mr-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-[112px] h-[44px]"
                  href="/admin/services"
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
