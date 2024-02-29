"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Container from "./Container";
import { useSelector } from "react-redux";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { supabase } from "../../supabase";
import { getCookie } from "cookies-next";



const BottomTab = ({ params }) => {
  const search = useSearchParams();
  const router = useRouter();
  const services = useSelector((state) => state.services);
  const step = search.get("step") ? parseInt(search.get("step")) : 0;
  const total = useSelector((state) => state.total);
  const address = useSelector((state) => state.address);

  const onClickNext = () => {
    const nextStep = step + 1;

    console.log("nextStep :>> ", nextStep);
    if (nextStep <= 2) {
      router.push(`/servicedetails/${params.id}?step=${nextStep}`);
    }
  };

  const onClickBack = () => {
    const backStep = step - 1;

    if (backStep === -1) {
      router.push(`/service`);
    } else {
      router.push(`/servicedetails/${params.id}?step=${backStep}`);
    }
  };

  const canProcess = () => {
    const hasQuantityGreaterThanZero = services.some(
      (service) => service.quantity > 0
    );
    return hasQuantityGreaterThanZero;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่
  };

  const handleInsert = async (e) => {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่

    const userData = getCookie("user");
    const userId = userData ? JSON.parse(userData) : {};

    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId.id,
          select_services: services,
          total_price: parseInt(total),
          service_date: address.date,
          status: "รอดำเนินการ",
          service_time: `${address.hour}:${address.minute}`,
          province: address.province,
          district: address.amphoe,
          sub_district: address.district,
          address_no: address.address,
          remark: address.more,
          order_code: generateOrderCode(),
        },
      ])
      .select();

    console.log(ordersData);

    router.push("/paymentsuccess");

    if (ordersError) {
      console.error(
        "Error inserting data into 'orders' table:",
        ordersError.message
      );
      return;
    }
  };

  function generateOrderCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderCode = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderCode += characters.charAt(randomIndex);
    }
    return orderCode;
}

  return (
    <div className="w-full  flex justify-center h-24 bg-white border-t border-gray-300 bottom-0 sticky">
      <Container>
        <div className="w-full flex justify-between items-center">
          <button
            className=" rounded-lg bg-white w-40 h-11 border-blue-600 text-blue-500 border flex justify-center items-center gap-2"
            onClick={onClickBack}
          >
            <KeyboardArrowLeftRoundedIcon className=" text-blue-500" />
            ย้อนกลับ
          </button>
          {step === 2 ? ( // เพิ่มเงื่อนไขตรวจสอบว่า step เท่ากับ 2 หรือไม่
            <button
              className=" rounded-lg bg-blue-600 text-white w-48 h-11 flex justify-center items-center gap-2 disabled:bg-gray-300"
              onClick={handleInsert}
              disabled={!canProcess()}
            >
              ยืนยันการชำระเงิน
              <KeyboardArrowRightRoundedIcon className=" text-white" />
            </button>
          ) : (
            <button
              className=" rounded-lg bg-blue-600 text-white w-40 h-11 flex justify-center items-center gap-2 disabled:bg-gray-300"
              onClick={onClickNext}
              disabled={!canProcess()}
              onSubmit={handleSubmit}
            >
              ดำเนินการต่อ
              <KeyboardArrowRightRoundedIcon className=" text-white" />
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BottomTab;
