"use client";
import React, { useState } from "react";
import AdminNavbar2 from "@/components/AdminNavbar2";
import AdminSideBar from "@/components/AdminSidebar";
import AdminCreateServiceForm from "@/components/AdminCreateServiceForm";
import Link from "next/link";
import { supabase } from "/supabase.js";
import { v4 as uuid } from "uuid";

const Page = () => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [serviceName, setServiceName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [serviceCategory, setServiceCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [subServiceItems, setSubServiceItems] = useState([
    {
      subServiceName: "",
      price: "",
      unit: "",
    },
  ]);

  const navbarTitle = "เพิ่มบริการ";
  const buttonText1 = "ยกเลิก";
  const buttonText2 = "สร้าง";

  const handleSubmit = async (event) => {
    console.log(111111);
    // Prevent default form submission behavior
    event.preventDefault();

    // Check if subServiceItems is null or empty
    if (!subServiceItems || subServiceItems.length === 0) {
      console.log("No sub services provided. Aborting submission.");
      return;
    }
    console.log(222222, subServiceItems);

    const fileName = uuid();
    const { error } = await supabase.storage
      .from("picture")
      .upload(fileName, imageFile);

    if (error) {
      throw error;
    }

    const publicUrl = supabase.storage.from("picture").getPublicUrl(fileName);

    console.log(publicUrl);
    // Prepare data for insertion
    const newService = {
      service_name: serviceName,
      category_name: selectedCategory,
      sub_services: subServiceItems,
      img: publicUrl?.data?.publicUrl,
    };
    console.log(newService);
    try {
      // Insert data into 'services' table
      const { data } = await supabase
        .from("services")
        .insert([newService]);
 
        console.log("Data inserted successfully:", data);
        // Clear form fields after successful insertion
        setServiceName("");
        setSelectedCategory(""); // Clear selected category
        setSubServiceItems([{ subServiceName: "", price: "", unit: "" }]); // Reset subServiceItems
      
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  const handleCancelButtonClick = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleServiceNameChange = (name) => {
    setServiceName(name);
  };

  const handleServiceCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSubServiceItems = (subService) => {
    console.log("subService", subService);
    setSubServiceItems(subService);
  };

  const handleImage = (image) => {
    setImage(image);
  };
  const handleImageFile = (imageFile) => {
    setImageFile(imageFile);
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
      <AdminCreateServiceForm
        onServiceNameChange={handleServiceNameChange}
        onServiceCategoryChange={handleServiceCategoryChange}
        onSubServiceChange={handleSubServiceItems}
        onImageChange={handleImage}
        onImageFileChange={handleImageFile}
        serviceNameP={serviceName}
        serviceCategoryP={selectedCategory}
        subServiceItemsP={subServiceItems}
        imageP={image}
        imageFileP={imageFile}
        onSubmits={(event) => handleSubmit(event, subServiceItems)} // Pass subServiceItems here
      />

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
