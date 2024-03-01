"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import * as React from "react";
import Link from "next/link";
import ButtonComponent from "./ButtonComponent";

const AllServiceCard = ({
  services,
  isUserAuthenticated,
  handleSelect,
}) => {

  return (
    <div className="w-full">
      {/*card*/}
      <div className="flex flex-col justify-center  items-center">
        <div className=" grid grid-cols-3 gap-[60px] mb-[60px] mt-[60px] ">
          {services.map((service) => {
            return (
              <div key={service.id}>
                <div className="w-[349px] h-[369px] relative bg-white rounded-lg border border-gray-300 flex">
                  <img
                    className="w-[349px] h-[200px] left-0 top-0 absolute rounded-t-lg"
                    src={service.img}
                  />
                  <div className="left-[24px] top-[216px] absolute flex-col justify-start items-start gap-2 inline-flex">
                    <div className="px-2.5 py-1 bg-indigo-50 rounded-lg justify-start items-start gap-2.5 inline-flex">
                      <div className="text-blue-800 text-xs font-normal  leading-[18px]">
                        <ButtonComponent
                          option={service.category_name}
                          onSelect={handleSelect}
                        />
                      </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-1 flex">
                      <div className="text-zinc-800 text-xl font-bold leading-[30px]">
                        {service.service_name}
                      </div>
                      <div className="justify-start items-center gap-2 inline-flex">
                        <div className="w-4 h-4 relative">
                          <img src="/assets/icons/sell_black.svg" alt="" />
                        </div>
                        <div className="text-gray-500 text-sm font-normal  leading-[21px]">
                          <div>
                            ค่าบริการเริ่มต้น {service.sub_services[0].price} ฿
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-0.5 left-[25px] top-[325px] absolute rounded-lg justify-start items-start gap-2.5 inline-flex">
                    {isUserAuthenticated ? (
                      <button className="text-blue-600 text-base font-semibold  underline leading-normal ">
                        <Link
                          href={`/servicedetails/[id]`}
                          as={`/servicedetails/${service.id}`}
                        >
                          เลือกบริการ
                        </Link>
                      </button>
                    ) : (
                      <button className="text-blue-600 text-base font-semibold  underline leading-normal ">
                        <Link href={"/login"}>เลือกบริการ</Link>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllServiceCard;
