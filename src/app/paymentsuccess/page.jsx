"use client";

import Navbar from "@/components/Navbar";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Fragment } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const services = useSelector((state) => state.services);
  const address = useSelector((state) => state.address);
  const total = useSelector((state) => state.total);

  const router = useRouter();

  const handleLinkToOrders = () => {
    router.push("/user/orders");
  };

  const selectedServices = services
    ? services.filter((service) => service.quantity > 0)
    : [];

  const formattedDate = address.date
    ? format(new Date(address.date), "dd MMM yyyy", { locale: th })
    : "";

  return (
    <div className="">
      <Navbar />
      <div className="w-full flex justify-center bg-[#f3f4f6] py-12 h-full">
        <div className=" w-[550px] bg-white border border-gray-300 p-16">
          <div>
            <div className="flex items-center flex-col gap-8">
              <CheckCircleRoundedIcon
                sx={{ width: "64px", height: "64px", fill: "#00596C" }}
              />
              <p className=" text-gray-950 text-4xl font-medium">
                ชำระเงินเรียบร้อย !
              </p>
            </div>
            <div className=" mt-10">
              {" "}
              {selectedServices.length > 0 && (
                <ul className=" text-sm text-gray-700">
                  {selectedServices.map((service) => (
                    <li
                      key={service.subServiceId}
                      className="flex justify-between font-light text-base"
                    >
                      {service.subServiceName}{" "}
                      <span className=" font-medium text-base">
                        {service.quantity} รายการ
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <hr className=" my-7 bg-gray-300" />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="text-gray-700">วันที่</span>
                <span className="text-black">{formattedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">เวลา</span>
                {address.hour && (
                  <span className="text-black">
                    {address.hour.toString().padStart(2, "0")}:
                    {address.minute.toString().padStart(2, "0")} น.
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">สถานที่</span>
                <span className="flex flex-col justify-end items-end text-black">
                  <p>
                    {address.address} {address.district}
                  </p>
                  <p>
                    {address.amphoe} {address.province}
                  </p>
                </span>
              </div>
            </div>
            <hr className=" my-7 bg-gray-300" />
            <div className="flex flex-col gap-7">
              <h2 className="flex justify-between text-gray-700 text-lg">
                รวม <span className=" font-semibold">{total} ฿</span>
              </h2>
              <button onClick={handleLinkToOrders} className=" h-11 w-full bg-blue-600 rounded-lg text-white">
                เช็ครายการซ่อม
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col justify-center items-center">
        <Navbar />
        <div className=" w-[550px] bg-white border border-gray-300 px-16 py-12 mt-14 mb-20">
          <div className="flex items-center flex-col gap-8">
            <CheckCircleRoundedIcon
              sx={{ width: "64px", height: "64px", fill: "#00596C" }}
            />
            <p className=" text-gray-950 text-4xl font-medium">
              ชำระเงินเรียบร้อย !
            </p>
          </div>
          <div className=" mt-10">
            {" "}
            {selectedServices.length > 0 && (
              <ul className=" text-sm text-gray-700">
                {selectedServices.map((service) => (
                  <li
                    key={service.subServiceId}
                    className="flex justify-between font-light text-base"
                  >
                    {service.subServiceName}{" "}
                    <span className=" font-medium text-base">
                      {service.quantity} รายการ
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <hr className=" my-7 bg-gray-300" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-gray-700">วันที่</span>
              <span className="text-black">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">เวลา</span>
              {address.hour && (
                <span className="text-black">
                  {address.hour.toString().padStart(2, "0")}:
                  {address.minute.toString().padStart(2, "0")} น.
                </span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">สถานที่</span>
              <span className="flex flex-col justify-end items-end text-black">
                <p>
                  {address.address} {address.district}
                </p>
                <p>
                  {address.amphoe} {address.province}
                </p>
              </span>
            </div>
          </div>
          <hr className=" my-7 bg-gray-300" />
          <div className="flex flex-col gap-7">
            <h2 className="flex justify-between text-gray-700 text-lg">
              รวม <span className=" font-semibold">{total} ฿</span>
            </h2>
            <button className=" h-11 w-full bg-blue-600 rounded-lg text-white">
              เช็ครายการซ่อม
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Page;
