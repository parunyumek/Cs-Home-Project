
import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";
import { AdminServiceLists } from "@/components/AdminServiceLists";
const page = () => {
  // Your admin page content
  const navbarTitle = "บริการ";
  const placeHolderMessage = "ค้นหาบริการ...";
  const buttonText = "เพิ่มบริการ +";
  const linkToCreateService = "/admin/create-services";

  return (
    <div className="bg-[#f3f4f6] w-screen h-screen ">
      <AdminNavbar
        title1={navbarTitle}
        title2={placeHolderMessage}
        title3={buttonText}
        buttonlink1={linkToCreateService}
      />
      <AdminSideBar />
      <AdminServiceLists />
    </div>
  );
};

export default page;
