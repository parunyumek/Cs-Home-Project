import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";

const page = () => {
  // Your admin page content
  return (
    <div className="w-full  h-screen bg-[#f3f4f6]">
      <AdminNavbar />
      <AdminSideBar />
    </div>
  );
};

export default page;
