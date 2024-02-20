"use client";
import Navbar from "@/components/Navbar";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";

const page = () => {
  const [dataLink, setdataLink] = useState("serviceOrderList");
  const [orders, setOrders] = useState([]);
  const [orderHistories, setOrdersHistories] = useState([]);

  const supabase = createClient();

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      console.log("error", error);
      return;
    }

    const successfulOrders = data.filter(
      (order) => order.status === "ดำเนินการสำเร็จ"
    );
    const pendingOrders = data.filter(
      (order) => order.status !== "ดำเนินการสำเร็จ"
    );
    setOrders(pendingOrders);
    setOrdersHistories(successfulOrders);
  };

  const handleDataLink = (e, data) => {
    e.preventDefault();
    setdataLink(data);
  };

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear() + 543;
    const time = `${date.getUTCHours()}.${date.getUTCMinutes()}`;
    return `${day}/${month}/${year} เวลา ${time} น.`;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {dataLink === "serviceOrderList" ? (
        <div className="h-[90px] bg-blue-600 flex justify-center items-center mb-6">
          <h1 className=" text-[32px] text-white">รายการคำสั่งซ่อม</h1>
        </div>
      ) : dataLink === "serviceHistory" ? (
        <div className="h-[90px] bg-blue-600 flex justify-center items-center mb-6">
          <h1 className=" text-[32px] text-white ">ประวัติการซ่อม</h1>
        </div>
      ) : null}

      <div className="flex flex-row justify-center  mx-auto  w-[100%] bg-gray-100">
        <div className="  bg-white p-6 rounded-md border-[1px] w-[253px] h-[252px] mr-10 ">
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
          {dataLink === "serviceOrderList"
            ? orders.map((order, index) => (
                <div
                  key={index}
                  className=" w-[830px] bg-white rounded-md border-[1px] p-6 flex flex-row justify-between mb-6"
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
                        วันเวลาดำเนินการ: {formatDateTime(order?.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-row mt-1">
                      <img
                        src="/assets/icons/icon-employee.svg"
                        className="pr-3"
                      />
                      <p className=" text-gray-500 text-[14px]">
                        พนักงาน: เมฆา ฟ้าแว๊บแว๊บ
                      </p>
                    </div>
                    <h3 className=" text-gray-500 mt-5">รายการ:</h3>
                    {order?.mock_order_histories.map((item, index) => (
                      <div key={index}>
                        <p className="mt-1 text-[14px]">
                          • {item.subServiceName} {item.quantity} {item.unit}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex flex-row justify-end">
                        <p className="mr-4 text-gray-500">สถานะ:</p>
                        <p
                          className={`rounded-full px-3 ${
                            order.status === "กำลังดำเนินการ"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "รอดำเนินการ"
                              ? "bg-gray-200 text-gray-800"
                              : null
                          }`}
                        >
                          {order.status}
                        </p>
                      </div>
                      <div className="flex flex-row justify-end mt-3">
                        <p className="mr-4 text-gray-500">ราคารวม:</p>
                        <p className="text-[18px] font-bold">
                          {order.total_price.toLocaleString()}.00 ฿
                        </p>
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
              ))
            : dataLink === "serviceHistory"
            ? orderHistories.map((order, index) => (
                <div
                  key={index}
                  className=" w-[830px] bg-white rounded-md border-[1px] p-6 flex flex-row justify-between mb-6"
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
                        วันเวลาดำเนินการสำเร็จ:{" "}
                        {formatDateTime(order?.updated_at)}
                      </p>
                    </div>
                    <div className="flex flex-row mt-1">
                      <img
                        src="/assets/icons/icon-employee.svg"
                        className="pr-3"
                      />
                      <p className=" text-gray-500 text-[14px]">
                        พนักงาน: เมฆา ฟ้าแว๊บแว๊บ
                      </p>
                    </div>
                    <h3 className=" text-gray-500 mt-5">รายการ:</h3>
                    {order?.mock_order_histories.map((item, index) => (
                      <div key={index}>
                        <p className="mt-1 text-[14px]">
                          • {item.subServiceName} {item.quantity} {item.unit}
                        </p>
                      </div>
                    ))}
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
              ))
            : null}
        </div>
      </div>
      <div className="">
        <Footer />
        <Copyright/>
      </div>
    </div>
  );
};

export default page;
