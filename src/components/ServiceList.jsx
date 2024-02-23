"use client";

import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { serviceIncrement, serviceDecrement } from "@/reducers/service.reducer";

const ServiceList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data); // ไว้เรียกใช้ value ใน reducer
  const services = useSelector((state) => state.services);

  return (
    <div className="flex justify-between gap-6">
      <div className=" w-full flex flex-col gap-6 bg-white p-6 rounded-lg border-gray-300 border">
        <h1 className=" text-gray-700 text-xl">
          เลือกรายการบริการ{data ? data.service_name : ""}
        </h1>
        <div>
          {services?.map((service, index) => (
            <div key={index}>
              <div
                className={`flex justify-between py-5 ${
                  services.length - 1 !== index ? "border-b" : ""
                }`}
              >
                <label
                  htmlFor={service.id}
                  className=" text-lg font-medium gap-2 flex flex-col text-black"
                >
                  {service.subServiceName}
                  <p className=" text-sm text-gray-700 flex gap-3">
                    <img src="/assets/icons/sell_black.svg" alt="" />
                    {service.price} บาท / {service.unit}
                  </p>
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      dispatch(
                        serviceDecrement({
                          subServiceId: service.subServiceId,
                          services,
                        })
                      );
                    }}
                    className="border w-11 h-11 rounded-lg border-blue-600"
                  >
                    <RemoveIcon fontSize="small" className=" text-blue-600" />
                  </button>
                  <Typography className=" w-3 text-black">
                    {service.quantity || 0}
                  </Typography>
                  <button
                    // onClick={() => handleIncrement(service.subServiceId)}
                    onClick={() => {
                      dispatch(
                        serviceIncrement({
                          subServiceId: service.subServiceId,
                          services,
                        })
                      );
                    }}
                    className="border w-11 h-11 rounded-lg border-blue-600"
                  >
                    <AddIcon fontSize="small" className=" text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
