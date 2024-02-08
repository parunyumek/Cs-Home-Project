import React from "react";

const AdminNavbar2 = ({ title1, buttonTitle1, buttonTitle2,button1click, button2click}) => {
  return (
    <nav className="w-screen h-[80px] border-gray-300 border-b-2 flex flex-row fixed left-[230px] bg-white">
      <div className="container w-screen flex flex-row justify-between items-center ml-16 ">
        <div className="text-black text-[20px] font-semibold leading-[30px] ">
          {title1}
        </div>
        <div className="">
          <div className="w-[112px] h-11 px-6 py-2.5 bg-white rounded-lg justify-center items-center gap-2 inline-flex ml-6 border-blue-600 border-[1px]">
            <button className="text-center text-blue-600 text-base font-medium leading-normal w-100 " onClick={button1click}>
              {buttonTitle1}
            </button>
          </div>
          <div className="w-[112px] h-11 px-6 py-2.5 bg-blue-600 rounded-lg justify-center items-center gap-2 inline-flex ml-6">
            <button className="text-center text-white text-base font-medium leading-normal w-100" onClick={button2click}>
              {buttonTitle2}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar2;
