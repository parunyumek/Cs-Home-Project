"use client";
import React, { useState, useEffect } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";
import AdminServiceLists from "@/components/AdminServiceLists";
import { supabase } from "../../../../supabase";
import AdminCategoryLists from "@/components/AdminCategoryList";

const Page = () => {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navbarTitle = "หมวดหมู่";
  const placeHolderMessage = "ค้นหาหมวดหมู่...";
  const buttonText = "เพิ่มหมวดหมู่ +";
  const linkToCreateService = "/admin/create-services";

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw error;
      }

      setServiceDetails(data);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
    // Convert search input to lowercase
  };

  return (
    <div className="bg-[#f3f4f6] w-screen h-screen ">
      <AdminNavbar
        title1={navbarTitle}
        title2={placeHolderMessage}
        title3={buttonText}
        buttonlink1={linkToCreateService}
        navBarInputOnChange={handleSearchInputChange}
      />
      <AdminSideBar />
      <AdminCategoryLists
        serviceDetails={serviceDetails}
        searchInput={searchInput}
      />
    </div>
  );
};

export default Page;
