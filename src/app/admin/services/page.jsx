"use client";
import React, { useState, useEffect } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";
import AdminServiceLists from "@/components/AdminServiceLists";
import { supabase } from "../../../../supabase";

const Page = () => {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navbarTitle = "บริการ";
  const placeHolderMessage = "ค้นหาบริการ...";
  const buttonText = "เพิ่มบริการ +";
  const linkToCreateService = "/admin/create-services";

  const fetchServicesDetails = async () => {
    try {
      const { data, error } = await supabase.from("services").select("*");
      if (error) {
        throw error;
      }

      setServiceDetails(data);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  useEffect(() => {
    fetchServicesDetails();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
    // Convert search input to lowercase
  };

  return (
    <div className="bg-[#f3f4f6] flex ">
      <div>
        <AdminSideBar />
      </div>
      <div className="w-[100%]">
        <AdminNavbar
          title1={navbarTitle}
          title2={placeHolderMessage}
          title3={buttonText}
          buttonlink1={linkToCreateService}
          navBarInputOnChange={handleSearchInputChange}
        />
        <AdminServiceLists
          serviceDetails={serviceDetails}
          searchInput={searchInput}
        />
      </div>
    </div>
  );
};

export default Page;
