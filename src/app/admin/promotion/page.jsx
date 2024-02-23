import Logout from "@/components/Logout";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";

const page = () => {
  // Your admin page content
  const navbarTitle = "Promotion Code";
  const inputPlaceHolder = "ค้นหาPromotion Code..";
  const createCategoryTitle = "เพิ่ม Promotion Code +";
  const linkToCreateCategory = "";

  return (
    <div className="flex">
      <AdminSideBar />

      <AdminNavbar
        title1={navbarTitle}
        title2={inputPlaceHolder}
        title3={createCategoryTitle}
        buttonlink1={linkToCreateCategory}
      />
    </div>
  );
};

export default page;
