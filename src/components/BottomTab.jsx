"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Container from "./Container";
import { useSelector } from "react-redux";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { supabase } from "../../supabase";

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
    if (step === 0) {
      const hasQuantityGreaterThanZero = services.some(
        (service) => service.quantity > 0
      );
      return hasQuantityGreaterThanZero;
    } else if (step === 1) {
      const requiredInputs = [
        "address",
        "date",
        "hour",
        "district",
        "amphoe",
        "province",
        "zipcode",
      ]; // รายการ input ที่ต้องการให้กรอกทั้งหมด

      const hasAllRequiredInputs = requiredInputs.every((input) => {
        return address[input] && address[input] !== ""; // ตรวจสอบว่า input นั้นๆ ไม่เป็นค่าว่างหรือไม่
      });

      return hasAllRequiredInputs;
    }
  };
  console.log(services)

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่
  };

  const handleInsert = async (e) => {
    const { sendAddress } = await supabase
      .from("address")
      .insert([
        {
          province: address.province,
          district: address.amphoe,
          sub_district: address.district,
          address_no: address.address,
          remark: address.more,
        },
      ])
      .select();

    console.log(sendAddress);

    const { status } = await supabase
      .from("orders")
      .insert([
        { mock_order_histories: services, total_price: parseInt(total) },
      ])
      .select();

    console.log(status);
  };

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
