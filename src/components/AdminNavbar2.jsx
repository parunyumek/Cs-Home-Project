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
    <nav>
      <div className=" h-[80px] flex flex-row justify-between items-center border-gray-300 border-b-2 bg-white px-10">
        <div className="text-black text-[20px] font-semibold  ">{title1}</div>
        <div className="flex ">
          <div>
            <button
              className="text-center text-blue-600  font-medium px-10 py-2.5 bg-white rounded-lg border-blue-600 border-[1px]"
              onClick={button1click}
            >
              {buttonTitle1}
            </button>
          </div>
          <div>
            <button
              className="text-center text-white font-medium px-10 py-2.5 bg-blue-600 rounded-lg ml-6 border-[1px]"
              onClick={button2click}
            >
              {buttonTitle2}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar2;
