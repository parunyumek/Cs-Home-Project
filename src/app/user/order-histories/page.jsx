"use client";
import Navbar from "@/components/Navbar";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const page = () => {
  const [orderHistories, setOrdersHistories] = useState([]);

  const supabase = createClient();
  const router = useRouter();

  const fetchData = async () => {
    const userData = getCookie("user");
    const userId = userData ? JSON.parse(userData) : {};
    let { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.log("error", error);
      return;
    }
    const successfulOrders = data.filter(
      (order) => order.status === "ดำเนินการสำเร็จ"
    );

    setOrdersHistories(successfulOrders);
  };

  const handleFilterSubService = (item) => {
    const filteredServices = item.filter((item) => item.quantity !== 0);
    return filteredServices;
  };

  const handleLinkToHistories = (e) => {
    e.preventDefault();
    router.push("/user/order-histories");
  };

  const handleLinkToOrders = (e) => {
    e.preventDefault();
    router.push("/user/orders");
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear() + 543;
    return `${day}/${month}/${year}`;
  }

  const formatTime = (item) => {
    const [hours, minutes] = item.split(":");
    const formattedHours = hours.padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");
    return ` เวลา ${formattedHours}:${formattedMinutes} น.`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className=" h-[80px]">
        <div className="fixed w-full">
          <Navbar />
        </div>
      </div>
      <div className="h-[90px] bg-blue-600 flex justify-center items-center mb-6">
        <h1 className=" text-[32px] text-white ">ประวัติการซ่อม</h1>
      </div>

      <div className="flex flex-row justify-center  mx-auto h-[100%] w-full bg-gray-100">
        <div className="w-[253px] h-[252px] ">
          <div className="  bg-white p-6 rounded-md border-[1px] w-[253px] h-[252px] mr-10 fixed ">
            <p className="text-[20px] mb-5">บัญชีผู้ใช้</p>
            <hr />
            <div className="flex flex-row mt-6">
              <img
                src="/assets/icons/icon-user-information.svg"
                className="pr-3 pl-1"
              />
              <p>ข้อมูลผู้ใช้งาน</p>
            </div>

            <button
              className=" flex flex-row items-center mt-6"
              onClick={(e) => handleLinkToOrders(e)}
            >
              <img
                src="/assets/icons/icon-service-order-list.svg"
                className="pr-3 pl-1"
              />
              รายการคำสั่งซ่อม
            </button>

            <button
              className=" flex flex-row items-center mt-6 text-blue-600"
              onClick={(e) => handleLinkToHistories(e)}
            >
              <img
                src="/assets/icons/icon-history-service-blue.svg"
                className="pr-3"
              />
              ประวัติการซ่อม
            </button>
          </div>
        </div>
        <div>
          {orderHistories.map((order, index) => (
            <div
              key={index}
              className=" w-[830px] bg-white rounded-md border-[1px] p-6 flex flex-row justify-between mb-6 ml-10"
            >
              <div>
                <h1 className="text-[20px] font-bold">
                  คำสั่งการซ่อมรหัส : {order?.order_code}
                </h1>
                <div className="flex flex-row mt-4">
                  <img
                    src="/assets/icons/icon-processing-time.svg"
                    className="pr-3"
                  />
                  <p className=" text-gray-500 text-[14px]">
                    วันเวลาดำเนินการสำเร็จ: {formatDate(order?.service_date)}
                    {formatTime(order?.service_time)}
                  </p>
                </div>
                <div className="flex flex-row mt-1">
                  <img src="/assets/icons/icon-employee.svg" className="pr-3" />
                  <p className=" text-gray-500 text-[14px]">
                    พนักงาน: เมฆา ฟ้าแว๊บแว๊บ
                  </p>
                </div>
                <h3 className=" text-gray-500 mt-5">รายการ:</h3>
                {handleFilterSubService(order?.select_services).map(
                  (item, index) => (
                    <div key={index}>
                      <p className="mt-1 text-[14px]">
                        • {item.subServiceName} {item.quantity} {item.unit}
                      </p>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex flex-row justify-end">
                    <p className="mr-4 text-gray-500">สถานะ:</p>
                    <p className=" bg-green-100 text-green-700 rounded-full px-3">
                      {order.status}
                    </p>
                  </div>
                  <div className="flex flex-row justify-end mt-3">
                    <p className="mr-4 text-gray-500">ราคารวม:</p>
                    <p className="text-[18px] font-bold">
                      {order.total_price.toLocaleString()}.00 ฿
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <Footer />
        <Copyright />
      </div>
    </div>
  );
};

export default page;
