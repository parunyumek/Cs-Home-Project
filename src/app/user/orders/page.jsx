"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const page = () => {
  const [dataLink, setdataLink] = useState("serviceOrderList");

  const handleDataLink = (e, data) => {
    e.preventDefault();
    setdataLink(data);
  };

  return (
    <div>
      <Navbar />

      {dataLink === "serviceOrderList" ? (
        <div className="h-[90px] bg-blue-600 flex justify-center items-center">
          <h1 className=" text-[32px] text-white">รายการคำสั่งซ่อม</h1>
        </div>
      ) : dataLink === "serviceHistory" ? (
        <div className="h-[90px] bg-blue-600 flex justify-center items-center">
          <h1 className=" text-[32px] text-white">ประวัติการซ่อม</h1>
        </div>
      ) : null}

      <div className="flex flex-row justify-center  mx-auto h-[100%] w-[100%]">
        <div className="  bg-white p-6 rounded-md w-[253px]  mr-10 mt-6 ">
          <p className="text-[20px] mb-5">บัญชีผู้ใช้</p>
          <hr />
          <div className="flex flex-row mt-6">
            <img
              src="/assets/icons/icon-user-information.svg"
              className="pr-3 pl-1"
            />
            <p>ข้อมูลผู้ใช้งาน</p>
          </div>

          {dataLink === "serviceOrderList" ? (
            <button
              className=" flex flex-row items-center mt-6 text-blue-600"
              onClick={(e) => handleDataLink(e, "serviceOrderList")}
            >
              <img
                src="/assets/icons/icon-service-order-list-blue.svg"
                className="pr-3 pl-1"
              />
              รายการคำสั่งซ่อม
            </button>
          ) : (
            <button
              className=" flex flex-row items-center mt-6"
              onClick={(e) => handleDataLink(e, "serviceOrderList")}
            >
              <img
                src="/assets/icons/icon-service-order-list.svg"
                className="pr-3 pl-1"
              />
              รายการคำสั่งซ่อม
            </button>
          )}

          {dataLink === "serviceHistory" ? (
            <button
              className=" flex flex-row items-center mt-6 text-blue-600"
              onClick={(e) => handleDataLink(e, "serviceHistory")}
            >
              <img
                src="/assets/icons/icon-history-service-blue.svg"
                className="pr-3"
              />
              ประวัติการซ่อม
            </button>
          ) : (
            <button
              className=" flex flex-row items-center mt-6"
              onClick={(e) => handleDataLink(e, "serviceHistory")}
            >
              <img
                src="/assets/icons/icon-history-service.svg"
                className="pr-3"
              />
              ประวัติการซ่อม
            </button>
          )}
        </div>

        <div>
          {dataLink === "serviceOrderList" ? (
            <div className=" w-[830px] bg-white rounded-md p-6 flex flex-row justify-between mt-6">
              <div>
                <h1 className="text-[20px] font-bold">
                  คำสั่งการซ่อมรหัส : AD04071205                {/* ต้องดึงข้อมูลออกมาใช้  */}
                </h1> 
                <div className="flex flex-row mt-4">
                  <img
                    src="/assets/icons/icon-processing-time.svg"
                    className="pr-3"
                  />
                  <p className=" text-gray-500 text-[14px]">
                    วันเวลาดำเนินการ: 25/04/2563 เวลา 13.00 น.      {/* ต้องดึงข้อมูลออกมาใช้  */}
                  </p>
                </div>
                <div className="flex flex-row mt-1">
                  <img src="/assets/icons/icon-employee.svg" className="pr-3" />
                  <p className=" text-gray-500 text-[14px]">
                    พนักงาน: สมาน เยี่ยมยอด
                  </p>
                </div>
                <h3 className=" text-gray-500 mt-5">รายการ:</h3>
                <p className="mt-1 text-[14px]">
                  • ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง       {/* ต้องดึงข้อมูลออกมาใช้  */}
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex flex-row justify-end">
                    <p className="mr-4 text-gray-500">สถานะ:</p>
                    <p className=" bg-yellow-100 text-yellow-800 rounded-full px-3">
                      รอดำเนินการ                                  {/* ต้องดึงข้อมูลออกมาใช้  */}
                    </p>
                  </div>
                  <div className="flex flex-row justify-end mt-3">
                    <p className="mr-4 text-gray-500">ราคารวม:</p>
                    <p className="text-[18px] font-bold">1,500.00 ฿</p>  {/* ต้องดึงข้อมูลออกมาใช้  */}
                    <p></p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className=" text-white bg-blue-600 px-6 py-3 rounded-lg">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          ) : dataLink === "serviceHistory" ? (
            <div className=" w-[830px] bg-white rounded-md p-6 flex flex-row justify-between mt-6">
              <div>
                <h1 className="text-[20px] font-bold">
                  คำสั่งการซ่อมรหัส : AD04071205
                </h1>
                <div className="flex flex-row mt-4">
                  <img
                    src="/assets/icons/icon-processing-time.svg"
                    className="pr-3"
                  />
                  <p className=" text-gray-500 text-[14px]">
                    วันเวลาดำเนินการสำเร็จ: 25/04/2563 เวลา 16.00 น.
                  </p>
                </div>
                <div className="flex flex-row mt-1">
                  <img src="/assets/icons/icon-employee.svg" className="pr-3" />
                  <p className=" text-gray-500 text-[14px]">
                    พนักงาน: สมาน เยี่ยมยอด
                  </p>
                </div>
                <h3 className=" text-gray-500 mt-5">รายการ:</h3>
                <p className="mt-1 text-[14px]">
                  • ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex flex-row justify-end">
                    <p className="mr-4 text-gray-500">สถานะ:</p>
                    <p className=" bg-green-100 text-green-700 rounded-full px-3">
                      ดำเนินการสำเร็จ
                    </p>
                  </div>
                  <div className="flex flex-row justify-end mt-3">
                    <p className="mr-4 text-gray-500">ราคารวม:</p>
                    <p className="text-[18px] font-bold">1,500.00 ฿</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
};

export default page;
