import React from "react";
import Link from "next/link";

const AdminNavbar = ({
  title1,
  title2,
  title3,
  buttonlink1,
  navBarInputOnChange,
}) => {
  // AdminNavbar with search box and 1 button
  return (
    <nav className="w-screen h-[80px] border-gray-300 border-b-2 flex flex-row  fixed left-[240px] bg-white">
      <div className="w-4/5 flex flex-row  justify-between ml-20">
        <div className="text-black text-[20px] font-semibold leading-[30px]  mt-6 w-[500px] relative right-10">
          {title1}
        </div>
        <div className="flex">
          <div className="mt-4 ">
            <img
              src="/assets/icons/magnifier-icon.svg"
              alt="magnifier-icon"
              className=" w-[16px] h-[16px] ml-3 mt-3.5 absolute  "
            />{" "}
            <input
              type="text"
              placeholder={title2}
              className="w-[350px] h-11 px-10 py-2.5 rounded-lg border border-grey-300 text-black"
              onChange={navBarInputOnChange}
            />
          </div>
          <Link
            className="w-[148px] h-11 px-6 py-2.5 bg-blue-600 rounded-lg justify-center items-center gap-2 inline-flex mt-4 ml-6 hover:bg-blue-500"
            href={buttonlink1}
          >
            <button className="text-center text-white text-base font-medium leading-normal w-100">
              {title3}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
