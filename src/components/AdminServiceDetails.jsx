"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useSearchParams } from "next/navigation";

const AdminServiceDetails = ({ setServiceName }) => {
  const [service, setService] = useState("");
  const [serviceId, setServiceId] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Get UTC time in milliseconds
    const utcTime = date.getTime();

    // Bangkok, Thailand is UTC+7
    const bangkokOffset = 24 * 60 * 60 * 1000; // 7 hours in milliseconds
    const bangkokTime = new Date(utcTime + bangkokOffset);

    const day = bangkokTime.getDate().toString().padStart(2, "0");
    const month = (bangkokTime.getMonth() + 1).toString().padStart(2, "0");
    const year = bangkokTime.getFullYear();
    const hours = bangkokTime.getHours().toString().padStart(2, "0");
    const minutes = bangkokTime.getMinutes().toString().padStart(2, "0");
    const ampm = bangkokTime.getHours() >= 12 ? "PM" : "AM";

    return `${day - 1}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("id", id)
            .single();
          if (error) {
            throw error;
          }
          if (data) {
            data.created_at = formatDate(data.created_at);
            data.updated_at = formatDate(data.updated_at);

            setService(data);
            setServiceName(data.service_name);
          }
        }
      } catch (error) {
        console.error("Error fetching service:", error.message);
      }
    };

    fetchService();
  }, []);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "100px",
        overflowY: "scroll",
        backgroundColor: "rgb(243,244,246)",
      }}
    >
      <div className="ml-72 mt-32 pt-10 bg-white w-4/5 h-auto rounded-[10px] pb-11 ">
        <div className="ml-8">
          <div className="flex flex-row mb-6 ">
            <p className="text-[#646C80] text-[16px] font-bold">ชื่อบริการ</p>
            <p className="text-black ml-48 text-[16px]">
              {service.service_name}
            </p>
          </div>
          <div className="flex flex-row mb-6">
            <p
              htmlFor="fullName"
              className="text-[#646C80] text-[16px] font-bold"
            >
              หมวดหมู่
            </p>
            <p className="text-black ml-48 text-[16px]">
              {service.category_name}
            </p>
          </div>
          <div className="flex flex-row mb-6">
            <p className="text-[#646C80] text-[16px] font-bold">รูปภาพ</p>

            <img
              src={service.img}
              alt="service image"
              className="rounded-[10px] ml-52 w-[433px] h-[200px]"
            />
          </div>
          <hr className="w-[1450px]"></hr>
        </div>

        <div className="ml-8">
          <p className="text-[#646C80] text-[16px] mt-8 mb-8 font-bold">
            รายการบริการย่อย
          </p>

          <div>
            <div className="flex flex-col  mb-6 text-[16px] text-black w-[1200px] ">
              {service.sub_services.map((subService) => (
                <p key={subService.subServiceId} className="">
                  <div className="flex flex-row   w-[1200px] text-[#646C80] text-[14px] ">
                    <p className=" w-[800px]  ">ชื่อรายการ</p>
                    <p className=" w-[300px] ">หน่วยการบริการ</p>
                    <p className=" w-[300px] ">ค่าบริการ / 1 หน่วย</p>
                  </div>
                  <div className="flex flex-row text-[16px] text-black">
                    <p className="w-[690px]"> {subService.subServiceName} </p>

                    <p className="w-[255px]"> {subService.unit}</p>
                    <p className="w-[120px] mb-5"> {subService.price}</p>
                  </div>
                </p>
              ))}
            </div>
          </div>
          <hr className="w-[1450px]"></hr>

          <div className="ml-2">
            <div className="flex flex-row mt-8 mb-8">
              <p className="text-[#646C80] text-[16px]  font-bold">
                สร้างเมื่อ
              </p>
              <p className="text-[#646C80] text-[16px] ml-24  ">
                {service.created_at}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="text-[#646C80] text-[16px] mb-8 font-bold">
                แก้ไขล่าสุด
              </p>
              <p className="text-[#646C80] text-[16px] ml-20   mb-8">
                {service.updated_at}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceDetails;
