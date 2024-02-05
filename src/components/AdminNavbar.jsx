const AdminNavbar = () => {
    return (
      <nav className=" w-[1200px] h-[80px] border-gray-300 border-b-2 flex flex-row fixed left-[240px] bg-white">
        <div className="text-black text-xl font-medium leading-[30px] mt-6 ml-10">
          หมวดหมู่
        </div>
        <div className=" mt-4 ml-[505px]">
          <input
            type="text"
            placeholder="ค้นหาหมวดหมู่..."
            className="w-[350px] h-11 px-4 py-2.5 rounded-lg border border-gery-300 text-black"
          />
        </div>
        <div className="w-[165px] h-11 px-6 py-2.5 bg-blue-600 rounded-lg justify-center items-center gap-2 inline-flex mt-4 ml-6">
          <button className="text-center text-white text-base font-medium leading-normal ">
            เพิ่มหมวดหมู่
          </button>
          <div className="w-5 h-5 relative" />
        </div>
      </nav>
    );
  };
  
  export default AdminNavbar;