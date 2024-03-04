import React from "react";

const AdminNavbar2 = ({
  title1,
  buttonTitle1,
  buttonTitle2,
  button1click,
  button2click,
}) => {
  // AdminNavbar with 2 buttons
  return (
    <nav className="w-screen h-[80px] border-gray-300 border-b-2 flex flex-row fixed bg-white z-10">
      <div className="container w-screen flex items-center ml-20">
        <p className=" text-black text-[20px] font-semibold leading-[30px] relative left-[230px]">
          {title1}
        </p>
      </div>
      <div className=" inline-flex items-center relative right-10">
        <div className=" gap-2 ">
          <button
            className="text-center text-blue-600 text-base font-medium leading-normal bg-white rounded-lg  w-[112px] h-11 border-blue-600 border-[1px] hover:border-blue-400 "
            onClick={button1click}
          >
            {buttonTitle1}
          </button>
        </div>
        <div className="px-6 py-2.5">
          <button
            className="text-center text-white text-base font-medium leading-normal  bg-blue-600 w-[112px] h-11 hover:bg-blue-500 rounded-lg "
            onClick={button2click}
          >
            {buttonTitle2}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar2;
