"use client";
import AdminSideBar from "@/components/AdminSidebar";
import AdminNavbar2 from "@/components/AdminNavbar2";
import { AdminServiceDetails } from "@/components/AdminServiceDetails";

const page = () => {
  return (
    <div>
      <AdminNavbar2 />
      <AdminSideBar />
      <AdminServiceDetails />
    </div>
  );
};

export default page;
