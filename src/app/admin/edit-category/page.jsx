"use client";

import AdminSideBar from "@/components/AdminSidebar";
import AdminNavbar4 from "@/components/AdminNavbar4";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../../supabase";
import Swal from "sweetalert2";

const Page = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDetails, setCategoryDetails] = useState("");
  const [categoryNameNavbar, setCategoryNameNavbar] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const backToCategoryLists = "/admin/category";
  const navbarTitle1 = "บริการ";
  const navbarTitle2 = "ตัวอย่างชื่อบริการ";
  const buttonText1 = "ยกเลิก";
  const buttonText2 = "ยืนยัน";

  const handleEditButton = (service) => {
    router.push(`/admin/edit-services?id=${id}`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Bangkok, Thailand is UTC+7
    const bangkokOffset = 0 * 60 * 60 * 1000; // 7 hours in milliseconds
    const bangkokTime = new Date(date.getTime() - bangkokOffset);

    const day = bangkokTime.getDate().toString().padStart(2, "0");
    const month = (bangkokTime.getMonth() + 1).toString().padStart(2, "0");
    const year = bangkokTime.getFullYear();
    let hours = bangkokTime.getHours();
    const minutes = bangkokTime.getMinutes().toString().padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  const handleCancelEditCategory = () => {
    router.push("/admin/category");
  };

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCancelButtonClick = (serviceName) => {
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const deleteCategory = async (categoryName) => {
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("category_name", categoryName);

      if (error) {
        throw error;
      }

      // Refresh the service list after deletion
      Swal.fire({
        title: "ทำการลบหมวดหมู่เรียบร้อย",
        icon: "success",
        customClass: {
          title: "text-xl text-blue-600",
          confirmButton: "hidden", // Hide the confirm button
        },
        timer: 2000,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
      }).then(() => {
        console.log("Dialog closed automatically");
        router.push("/admin/category");
      });
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!categoryName) {
      // Check if subServiceItems is null or empty
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
      const { data, error } = await supabase
        .from("categories")
        .update([{ category_name: categoryName }])
        .eq("id", id);
      console.log("Data updated successfully:", data);
      Swal.fire({
        title: "อัพเดทหมวดหมู่เรียบร้อย",
        icon: "success",
        customClass: {
          title: "text-xl text-blue-600",
          confirmButton: "hidden", // Hide the confirm button
        },
        timer: 2000, // Set the timer to auto-close the dialog after 2000 milliseconds (2 seconds)
        timerProgressBar: true, // Show a progress bar indicating the remaining time
        allowOutsideClick: false, // Prevent users from closing the dialog by clicking outside
        allowEscapeKey: false, // Prevent users from closing the dialog by pressing ESC key
        allowEnterKey: false, // Prevent users from closing the dialog by pressing Enter key
        showConfirmButton: false, // Hide the confirm button
      });
      // Clear form fields after successful insertion

      router.push("/admin/category");
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
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
            setCategoryNameNavbar(data.category_name);
          }
        }
      } catch (error) {
        console.error("Error fetching category:", error.message);
      }
    };

    fetchCategory();
  }, []);

  if (!categoryDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#f3f4f6] w-screen h-screen ">
      <AdminNavbar4
        title1={navbarTitle1}
        title2={categoryNameNavbar}
        buttonTitle1={buttonText1}
        buttonTitle2={buttonText2}
        backButtonClick={backToCategoryLists}
        button1Click={handleCancelEditCategory}
        button2Click={handleSubmit}
      />
      <AdminSideBar />
      <form className="ml-72 mt-28 bg-white w-4/5 h-auto rounded-[10px] pb-11 fixed">
        <div className=" text-gray-700 ml-2 font-bold mt-9 flex flex-row">
          <label
            htmlFor="categoryName"
            className="text-gray-700 ml-5 font-bold"
          >
            ชื่อหมวดหมู่<span className="text-rose-700 text-[16px]">*</span>
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={handleCategoryNameChange}
            className="border border-gray-300 rounded-lg px-4 py-2 mt-0 ml-36 w-[440px] text-gray-700"
          />
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
      </form>
      <div className=" text-gray-600 underline mt-[440px] ml-[1700px] flex flex-row font-bold absolute z-50  ">
        {" "}
        <img src="/assets/icons/trashbin.svg" className="ml-3" alt="Delete" />
        <p className="ml-2 cursor-pointer " onClick={handleCancelButtonClick}>
          ลบบริการ
        </p>
      </div>
      {isDeleteConfirmationOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white w-[360px] h-[270px] rounded-lg  p-6 text-[#00144D] shadow-md relative">
              <img
                src="/assets/icons/alerticon.svg"
                className="ml-[130px] mb-4"
              />
              <button
                className="text-[#4F5E8C] absolute right-7 top-5"
                onClick={handleCancelDelete}
              >
                X
              </button>
              <p className="text-[20px] font-semibold mb-4 text-center">
                ยืนยันการลบรายการ?
              </p>
              <p className="text-[16px] font-light mb-10 text-center ">
                คุณต้องการลบรายการ ‘{categoryName}’ ใช่หรือไม่
              </p>
              <div className="flex justify-center gap-2">
                <button
                  className="mr-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-[112px] h-[44px]"
                  onClick={() => deleteCategory(categoryName)}
                >
                  ลบรายการ
                </button>
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
