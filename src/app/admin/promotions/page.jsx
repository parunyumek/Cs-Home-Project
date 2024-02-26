import Logout from "@/components/Logout";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSideBar from "@/components/AdminSidebar";

const page = () => {
  // Your admin page content
  const navbarTitle = "Promotion Code";
  const inputPlaceHolder = "ค้นหาPromotion Code..";
  const createCategoryTitle = "เพิ่ม Promotion Code +";
  const linkToCreateCategory = "/admin/promotions/create-promotion";

  return (
    <div className="flex">
      <div>
        <AdminSideBar />
      </div>
      <div className="w-[100%]">
        <AdminNavbar
          title1={navbarTitle}
          title2={inputPlaceHolder}
          title3={createCategoryTitle}
          buttonlink1={linkToCreateCategory}
        />
        <div className="flex flex-col m-10">
          <div className="bg-gray-200 flex flex-row justify-between w-[100%] p-2 px-5  rounded-t-lg border-gray-200 border-[1px]">
            <p className="w-[166px]">Promotion</p>
            <p className="w-[105px]">ประเภท</p>
            <p className="w-[140px]">โควต้าการใช้(ครั้ง)</p>
            <p className="w-[145px]">ราคาที่ลด</p>
            <p className="w-[209px]">สร้างเมื่อ</p>
            <p className="w-[225px]">วันหมดอายุ</p>
            <p className="w-[120px]">Action</p>
          </div>
          <div className="flex flex-row justify-between w-[100%] py-8 px-5 border-gray-200 border-[1px]">
            <p className="w-[166px]">HOME0202</p>
            <p className="w-[105px]">Fixed</p>
            <p className="w-[140px]">10/100</p>
            <p className="w-[145px] text-[#C82438]">-50.00฿</p>
            <p className="w-[209px]">12/02/2022 10:30PM</p>
            <p className="w-[225px]">12/06/2022 10:30PM</p>
            <div className="flex w-[125px]">
              <img src="/assets/icons/trashbin.svg" className="mr-5" />
              <img src="/assets/icons/edit.svg" />
            </div>
          </div>
          <div className="flex flex-row justify-between w-[100%] py-8 px-5 border-gray-200 border-[1px]">
            <p className="w-[166px]">HOME0202</p>
            <p className="w-[105px]">Percent</p>
            <p className="w-[140px]">10/100</p>
            <p className="w-[145px] text-[#C82438]">-50.00฿</p>
            <p className="w-[209px]">12/02/2022 10:30PM</p>
            <p className="w-[225px]">12/06/2022 10:30PM</p>
            <div className="flex w-[125px]">
              <img src="/assets/icons/trashbin.svg" className="mr-5" />
              <img src="/assets/icons/edit.svg" />
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default page;
