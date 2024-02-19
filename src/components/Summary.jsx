import React from "react";
import { useSelector } from "react-redux";

const Summary = () => {
  const services = useSelector((state) => state.services);

  const selectedServices = services
    ? services.filter((service) => service.quantity > 0)
    : [];

  const total = selectedServices.reduce((accumulatedTotal, service) => {
    return (
      accumulatedTotal +
      parseFloat(service.price) * parseFloat(service.quantity)
    );
  }, 0);

  const formattedTotal = total.toFixed(2);

  return (
    <div className=" w-full bg-white p-6 rounded-lg border-gray-300 border gap-4 flex flex-col">
      <h2 className=" text-gray-700 text-xl">สรุปรายการ</h2>
      {selectedServices.length > 0 && (
        <ul className=" text-sm text-gray-700">
          {selectedServices.map((service) => (
            <li
              key={service.subServiceId}
              className="flex justify-between font-light"
            >
              {service.subServiceName}{" "}
              <span className=" font-medium">{service.quantity} รายการ</span>
            </li>
          ))}
        </ul>
      )}
      {selectedServices.length === 0 && <p></p>}
      <hr />
      <h2 className="flex justify-between">
        รวม <span className=" font-semibold">{formattedTotal} ฿</span>
      </h2>
    </div>
  );
};

export default Summary;
