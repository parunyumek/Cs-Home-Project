import Link from "next/link";
import Logout from "./Logout";

const AdminSideBar = () => {
  return (
    <div className="w-[250px] h-screen bg-blue-950 flex flex-col ">
      <div className="text-blue-600 text-[19px] font-medium text-center bg-indigo-50 rounded-xl m-5 mt-8 p-2 flex flex-row items-center">
        <div>
          <img src="/assets/icons/icon_house_addmin.svg" />
        </div>
        <p className="ml-1">HomeServices</p>
      </div>
      <div className="flex flex-col text-zinc-100 mt-11 text-base font-medium leading-normal">
      <Link href={"/admin/category"} className="h-[54px] bg-blue-950 hover:bg-blue-900 flex flex-row items-center">
        <button className="flex items-center">
        <img src="/assets/icons/icon_category_addmin.svg" className="mr-5 ml-6"/>
          หมวดหมู่
        </button>
        </Link>

        <Link href={"/admin/services"} className="h-[54px] bg-blue-950 hover:bg-blue-900 flex flex-row items-center">
        <button className="flex items-center">
        <img src="/assets/icons/icon_service_addmin.svg" className="mr-5 ml-6"/>
        บริการ
        </button>
        </Link>

        <Link href={"/admin/promotions"} className="h-[54px] bg-blue-950 hover:bg-blue-900 flex flex-row items-center">
        <button className="flex items-center">
        <img src="/assets/icons/icon_promotion_addmin.svg" className="mr-5 ml-6"/>
        Promotion Code
        </button>
        </Link>

      </div>
      <div className="flex flex-col mt-[500px]">
        <button>
          <div className="text-zinc-100 text-base font-normal leading-normal h-[54px] bg-blue-950 hover:bg-blue-900 flex ">
            <Logout />
          </div>
        </button>
      </div>
    </div>
  );
};
export default AdminSideBar;
