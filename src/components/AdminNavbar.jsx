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
    <nav className=" h-[80px] border-gray-300 border-b-2 bg-white ">
      <div className="  flex flex-row  justify-between">
        <div className="text-black text-[20px] font-semibold leading-[30px]  mt-6 ml-8 ">
          {title1}
        </div>
        <div className="flex">
          <div className="mt-4 ">
            {" "}
            <input
              type="text"
              placeholder={title2}
              className="w-[350px] h-11 px-4 py-2.5 rounded-lg border border-grey-300 text-black placeholder-ml-[200px]"
              onChange={navBarInputOnChange}
            />
          </div>
          <Link
            className=" h-11 px-6 py-2.5 m-10 bg-blue-600 rounded-lg justify-center items-center gap-2 inline-flex mt-4 ml-6"
            href={buttonlink1}
          >
            <button className="text-center text-white  font-medium  ">
              {title3}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
