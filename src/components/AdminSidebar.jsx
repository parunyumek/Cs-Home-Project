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
        <Link
          href={"/admin/category"}
          className="h-[54px] bg-blue-950 hover:bg-blue-900 flex flex-row items-center"
        >
          <button className="flex items-center">
            <img
              src="/assets/icons/sidebar-category-icon.svg"
              className="mr-5 ml-5"
            />
            หมวดหมู่
          </button>
        </Link>
        <Link
          href={"/admin/services"}
          className="h-[54px] bg-blue-950 hover:bg-blue-900 flex flex-row items-center"
        >
          <button className="flex items-center">
            <img
              src="/assets/icons/sidebar-service-icon.svg"
              className="mr-[22px] ml-6"
            />
            บริการ
          </button>
        </Link>
        <Link
          href={"/admin/promotions"}
          className="h-[54px] bg-blue-950 hover:bg-blue-900 flex flex-row items-center"
        >
          <button className="flex items-center">
            <img
              src="/assets/icons/sidebar-promotioncode-icon.svg"
              className="mr-5 ml-6"
            />
            Promotion Code
          </button>
        </Link>
      </div>
      <div className="flex flex-col mt-[500px]">
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
