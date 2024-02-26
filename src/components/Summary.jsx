import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const Summary = () => {
  const services = useSelector((state) => state.services);
  const address = useSelector((state) => state.address);
  const total = useSelector((state) => state.total);
  console.log("total :>> ", total);

  const selectedServices = services
    ? services.filter((service) => service.quantity > 0)
    : [];

  const formattedDate = address.date
    ? format(new Date(address.date), "dd MMM yyyy", { locale: th })
    : "";

  return (
    <div className=" w-full bg-white p-6 rounded-lg border-gray-300 border gap-4 flex flex-col">
      <h2 className=" text-gray-700 text-xl">สรุปรายการ</h2>
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
      {selectedServices.length === 0 && <p></p>}
      <hr />
      {Object.keys(address).length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-gray-700">วันที่</span>
            <span className="text-black">{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">เวลา</span>
            {address.hour && (
              <span className="text-black">
                {address.hour}.{address.minute} น.
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
      )}
      {Object.keys(address).length > 0 && <hr />}
      <h2 className="flex justify-between text-gray-700 text-lg">
        รวม <span className=" font-semibold">{total} ฿</span>
      </h2>
    </div>
  );
};

export default Summary;
