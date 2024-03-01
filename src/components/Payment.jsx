import Summary from "./Summary";
import Container from "./Container";
import * as React from "react";
import PaymentProcess from "./PaymentProcess";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import { useSelector, useDispatch } from "react-redux";
import { totalDiscount } from "@/reducers/service.reducer";

const Payment = () => {
  const [inputPromotionCode, setInputPromotionCode] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();
  const supabase = createClient();

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
        totalCalculate: totalCalculate.toLocaleString(),
        promotionCode: data.promotion_code,
        promotionDiscount: data.promotion_discount,
        promotionType: data.promotion_type,
        remainingQuota: data.remaining_quota,
      })
    );
    setIsButtonDisabled(true);
  };

  return (
    <div className="w-full flex justify-center mb-10 mt-16">
      <Container>
        <div className="flex flex-col w-full gap-8">
          <PaymentProcess />
          <div className="flex gap-8">
            <div className="  flex flex-col gap-6 bg-white  text-black p-6 rounded-lg border-gray-300 border w-2/3">
              <div className=" text-gray-800 text-[20px]">ชำระเงิน</div>
              <div className="grid grid-cols-2 gap-10 ml-8">
                <button className="w-[331px] h-[86px] relative rounded-[5px] shadow border border-gray-300 ">
                  <div className="w-[68px] h-[60px]  flex-col  justify-center items-center gap-1 inline-flex">
                    <img src="/assets/icons/icon-qrcode.svg" alt="" />
                    <div className="text-center text-gray-800 text-sm">
                      พร้อมเพย์
                    </div>
                  </div>
                </button>
                <button className="w-[331px] h-[86px] relative bg-indigo-50 rounded-[5px] border border-blue-600">
                  <div className="w-[68px] h-[60px] flex-col justify-center  items-center gap-1 inline-flex">
                    <img src="/assets/icons/icon-creditCard.svg" alt="" />
                    <div className="text-center text-blue-800 text-sm">
                      บัตรเครดิต
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex flex-col ">
                <div className="w-full h-[72px] flex-col justify-start items-start gap-1 inline-flex mt-8">
                  <label className="text-gray-900 text-base font-medium leading-normal">
                    หมายเลขบัตรเครดิต<span className="text-rose-700">*</span>
                  </label>
                  <input
                    id="creditCardId"
                    type="text"
                    name="creditCardId"
                    placeholder="กรุณากรอกหมายเลขบัตรเครดิต"
                    className=" self-stretch text-gray-500 w-full leading-normal px-4 py-2.5  border  border-gray-300 rounded-lg gap-2.5"
                  />
                </div>
                <div className="mt-8">
                  <label className="text-gray-900 text-base font-medium leading-normal">
                    ชื่อบนบัตร<span className="text-rose-700">*</span>
                  </label>
                  <input
                    id="creditCardname"
                    type="text"
                    name="creditCardname"
                    placeholder="กรุณากรอกชื่อบนบัตร"
                    className=" self-stretch text-gray-500 w-full leading-normal px-4 py-2.5  border  border-gray-300 rounded-lg gap-2.5"
                  />
                </div>
                <div className="flex flex-row justify-between mt-8">
                  <div className="w-[47%] ">
                    <label className="text-gray-900 text-base font-medium leading-normal">
                      วันหมดอายุ<span className="text-rose-700">*</span>
                    </label>
                    <input
                      id="exprieDate"
                      type="text"
                      name="exprieDate"
                      placeholder="MM/YY"
                      className=" self-stretch text-gray-500 w-full leading-normal px-4 py-2.5  border  border-gray-300 rounded-lg gap-2.5"
                    />
                  </div>
                  <div className="w-[47%]">
                    <label className="text-gray-900 text-base font-medium leading-normal">
                      รหัส cvc / cvv<span className="text-rose-700">*</span>
                    </label>
                    <input
                      id="cvc/cvv"
                      type="text"
                      name="cvc/cvv"
                      placeholder="xxx"
                      className=" self-stretch text-gray-500 w-full leading-normal px-4 py-2.5  border  border-gray-300 rounded-lg gap-2.5"
                    />
                  </div>
                </div>
                <div className="w-full h-[0px] border border-gray-300 mt-12"></div>
              </div>
              <div className="mt-4">
                <label className="text-gray-900 text-base font-medium leading-normal">
                  Promotion Code
                </label>
                <div className="flex flex-row gap-12 ">
                  <input
                    id="promotionCode"
                    type="text"
                    name="promotionCode"
                    onChange={(e) => setInputPromotionCode(e.target.value)}
                    placeholder="กรุณากรอกโค้ดส่วนลด (ถ้ามี)"
                    className=" self-stretch text-gray-500 w-[47%] leading-normal px-4 py-2.5  border  border-gray-300 rounded-lg gap-2.5"
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
            </div>
            <div className="w-1/3">
              <Summary />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
