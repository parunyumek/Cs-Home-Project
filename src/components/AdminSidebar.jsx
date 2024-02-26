import Link from "next/link";
import Logout from "./Logout";

const AdminSideBar = () => {
  return (
    <div className="w-60 h-screen bg-blue-950 flex flex-col fixed z-20">
      <div className="w-48 h-[46px] bg-indigo-50 rounded-xl mt-6 ml-6">
        <div className="text-blue-600 text-xl font-medium flex justify-center mt-2">
          <img
            src="/assets/icons/house_1.svg"
            alt="house-icon"
            className="mr-2 mb-4 w-[26.6px] h-[26.6px]"
          />
          HomeServices
        </div>
      </div>
      <div className="flex flex-col text-zinc-100 mt-11 text-base font-medium leading-normal ">
        <button className="h-[54px] bg-blue-950 hover:bg-blue-900">
          {" "}
          <img
            src="/assets/icons/sidebar-category-icon.svg"
            alt="category-icon"
            className=" w-[16px] h-[16px] absolute left-[25px] top-[134px]"
          />
          <Link className="mr-16" href={"/admin/category"}>
            หมวดหมู่
          </Link>
        </button>
        <img
          src="/assets/icons/sidebar-service-icon.svg"
          alt="service-icon"
          className=" w-[16px] h-[16px] absolute left-[25px] top-[188px]"
        />
        <button className="h-[54px] bg-blue-950 hover:bg-blue-900">
          <Link className="mr-20" href={"/admin/services"}>
            บริการ
          </Link>
        </button>
        <button className="h-[54px] bg-blue-950 hover:bg-blue-900">
          <img
            src="/assets/icons/sidebar-promotioncode-icon.svg"
            alt="service-icon"
            className=" w-[16px] h-[16px] absolute left-[25px] top-[241px]"
          />
          <Link href={"/admin/promotion"}>Promotion Code</Link>
        </button>
      </div>
      <div className="flex flex-col mt-[410px]">
        <button>
          <div className="text-zinc-100 text-base font-normal leading-normal h-[54px] bg-blue-950 hover:bg-blue-900 flex justify-center">
            <Logout />
          </div>
        </button>
      </div>
    </div>
  );
};
export default AdminSideBar;
