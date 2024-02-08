import React from "react";
import Link from "next/link";

const AdminNavbar = ({ title1, title2, title3,buttonlink1 }) => {
  return (
    <nav className="w-screen h-[80px] border-gray-300 border-b-2 flex flex-row  fixed left-[240px] bg-white">
      <container className="w-4/5 flex flex-row  justify-between">
        <div className="text-black text-[20px] font-semibold leading-[30px] mt-6 ml-8">
          {title1}
        </div>
        <div className="flex ml-[1000px] ">
          <div className="mt-4 ">
            {" "}
            <input
              type="text"
              placeholder={title2}
              className="w-[350px] h-11 px-4 py-2.5 rounded-lg border border-grey-300 text-black placeholder-ml-[200px]"
            />
          </div>
          <Link className="w-[148px] h-11 px-6 py-2.5 bg-blue-600 rounded-lg justify-center items-center gap-2 inline-flex mt-4 ml-6" href={buttonlink1}>
            <button className="text-center text-white text-base font-medium leading-normal w-100">
              {title3}
            </button>
          </Link>

       


        </div>
      </container>
    </nav>
  );
};

export default AdminNavbar;
