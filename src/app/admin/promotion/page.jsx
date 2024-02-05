import Logout from "@/components/Logout";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";

const page = () => {
  // Your admin page content
  return (
    <div className="bg-[#f3f4f6] w-[1440px] h-screen">
      <AdminNavbar />
      <AdminSideBar />
      <Logout />
    </div>
  );
};

export default page;
