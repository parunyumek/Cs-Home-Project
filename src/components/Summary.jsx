import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { resetDiscount } from "@/reducers/service.reducer";
import { createClient } from "@/supabase/client";
import { totalDiscount } from "@/reducers/service.reducer";
import { useSearchParams } from "next/navigation";

const Summary = () => {
  const services = useSelector((state) => state.services);
  const address = useSelector((state) => state.address);
  const total = useSelector((state) => state.total);
  const promotionDiscount = useSelector((state) => state.promotionDiscount);
  const promotionType = useSelector((state) => state.promotionType);
  const [inputPromotionCode, setInputPromotionCode] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const supabase = createClient();
  const search = useSearchParams();
  const step = search.get("step") ? parseInt(search.get("step")) : 0;

  const dispatch = useDispatch();

  const selectedServices = services
    ? services.filter((service) => service.quantity > 0)
    : [];

  const formattedDate = address.date
    ? format(new Date(address.date), "dd MMM yyyy", { locale: th })
    : "";

  const handleCalCulate = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase
      .from("promotions")
      .select("*")
      .eq("promotion_code", inputPromotionCode)
      .single();
    if (error) {
      console.log("get promotion", error);
      return;
    }

    let totalCalculate = 0;
    if (data.promotion_type === "Fixed") {
      totalCalculate = Number(total) - Number(data.promotion_discount);
      setIsButtonDisabled(true);
    } else {
      totalCalculate =
        Number(total) - Number(total) * (Number(data.promotion_discount) / 100);
    }
    dispatch(
      totalDiscount({
        totalCalculate: totalCalculate,
        promotionCode: data.promotion_code,
        promotionDiscount: data.promotion_discount,
        promotionType: data.promotion_type,
        remainingQuota: data.remaining_quota,
      })
    );
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    dispatch(resetDiscount({}));
  }, []);

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
      )}

      {Object.keys(address).length > 0 && <hr />}
      {promotionType === "Fixed" ? (
        <h2 className="flex justify-between text-gray-700 text-lg">
          {" "}
          ส่วนลด{" "}
          <span className=" font-semibold text-[#C82438]">
            -{promotionDiscount} ฿
          </span>
        </h2>
      ) : promotionType === "Percent" ? (
        <h2 className="flex justify-between text-gray-700 text-lg">
          {" "}
          ส่วนลด{" "}
          <span className=" font-semibold text-[#C82438]">
            -{promotionDiscount} %
          </span>
        </h2>
      ) : null}
      <h2 className="flex justify-between text-gray-700 text-lg">
        รวม <span className=" font-semibold">{total} ฿</span>
      </h2>
      {step === 2 ? ( // เพิ่มเงื่อนไขตรวจสอบว่า step เท่ากับ 2 หรือไม่
        <div className="mt-4 flex flex-col gap-3">
          <label className="text-gray-900 text-base font-medium leading-normal">
            Promotion Code
          </label>
          <div className="flex flex-row justify-between">
            <input
              id="promotionCode"
              type="text"
              name="promotionCode"
              onChange={(e) => setInputPromotionCode(e.target.value)}
              placeholder="กรุณากรอกโค้ดส่วนลด (ถ้ามี)"
              className=" self-stretch text-gray-500 w-[70%] leading-normal px-4 py-2.5  border  border-gray-300 rounded-lg gap-2.5"
            />
            <button
              disabled={isButtonDisabled}
              onClick={(e) => handleCalCulate(e)}
              className={`w-[90px] h-11 px-6 py-2.5 rounded-lg text-white ${
                isButtonDisabled ? "bg-gray-300 " : "bg-blue-600"
              }`}
            >
              ใช้โค้ด
            </button>
          </div>
        </div>
      ) : (
        <div>{""}</div>
      )}
    </div>
  );
};

export default Summary;
