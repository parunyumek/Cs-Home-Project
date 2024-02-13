import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";

const page = () => {
  // Your admin page content
  const navbarTitle = "หมวดหมู่";
  const inputPlaceHolder = "ค้นหาหมวดหมู่..";
  const createCategoryTitle = "เพิ่มหมวดหมู่ +";
  const linkToCreateCategory = "";

  return (
    <div className="bg-[#f3f4f6] w-[1440px] h-screen">
      <AdminNavbar
        title1={navbarTitle}
        title2={inputPlaceHolder}
        title3={createCategoryTitle}
        buttonlink1={linkToCreateCategory}
      />
      <AdminSideBar />
    </div>
  );
};

export default page;
