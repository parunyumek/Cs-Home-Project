import React from "react";
import Link from "next/link";

const AdminNavbar4 = ({
  title1,
  title2,
  buttonTitle1,
  button2Click,
  backButtonClick,
  buttonTitle2,
  button1Click,
}) => {
  // AdminNavbar with 2 buttons and back button
  return (
    <nav className="w-screen h-[80px] border-gray-300 border-b-2 flex flex-row fixed left-[230px] bg-white z-10 ">
      <div className="container w-screen flex flex-row justify-between items-center ml-20 ">
        <div className="ml-10  w-auto ">
          <Link href={backButtonClick}>
            <img
              src="/assets/icons/backarrowicon.svg"
              className="absolute left-[60px] top-6 hover:opacity-50"
              alt="back"
            />
          </Link>
          <div className="text-gray-700 text-xs  leading-[20px] ">{title1}</div>
          <div className="text-black text-[20px] font-semibold leading-[30px] ">
            {title2}
          </div>
        </div>
        <div className=" mr-4">
          <div className=" justify-center items-center gap-2 inline-flex  ">
            <button
              className="text-center text-blue-600 text-base font-medium leading-normal  border-[1px] border-blue-600 w-[112px] h-11 rounded-lg bg-white hover:border-blue-400  "
              onClick={button1Click}
            >
              {buttonTitle1}
            </button>
          </div>
          <div className=" justify-center items-center gap-2 inline-flex ml-6">
            <button
              className="text-center text-white text-base font-medium leading-normal w-100 w-[112px] h-11 bg-blue-600 rounded-lg hover:bg-blue-500
              "
              onClick={button2Click}
            >
              {buttonTitle2}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar4;
