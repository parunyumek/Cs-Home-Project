const SideBar = () => {
  return (
    <div className="w-60 h-screen bg-blue-950 flex flex-col fixed">
      <div className="w-48 h-[46px] bg-indigo-50 rounded-xl mt-6 ml-6">
        <div className="text-blue-600 text-xl font-medium flex justify-center mt-2">
          HomeServices
        </div>
      </div>
      <div className="flex flex-col text-zinc-100 mt-11 text-base font-medium leading-normal">
        <button className="h-[54px] bg-blue-950 hover:bg-blue-900">
          หมวดหมู่
        </button>
        <button className="h-[54px] bg-blue-950 hover:bg-blue-900">
          บริการ
        </button>
        <button className="h-[54px] bg-blue-950 hover:bg-blue-900">
          Promotion Code
        </button>
      </div>
      <div className="flex flex-col mt-[410px]">
        <button className="text-zinc-100 text-base font-normal leading-normal h-[54px] bg-blue-950 hover:bg-blue-900">
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};
export default SideBar;
