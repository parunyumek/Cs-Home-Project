"use client";

import Container from "./Container";

const Banner = () => {
  return (
    <div className="flex justify-center bg-blue-100">
      <Container>
        <div className="flex justify-between flex-col mt-[78px] mb-[50px]">
          <div>
            <div className="text-blue-700 text-[64px] font-extrabold  leading-[96px]">
              เรื่องบ้าน...ให้เราช่วยดูแลคุณ
            </div>
            <div className="text-black text-[42px] font-semibold ">
              “สะดวก ราคาคุ้มค่า เชื่อถือได้“
            </div>
          </div>
          <div className="w-[515px] text-gray-500 text-2xl font-normal ">
            ซ่อมเครื่องใช้ไฟฟ้า ซ่อมแอร์ ทำความสะอาดบ้าน โดยพนักงานแม่บ้าน
            และช่างมืออาชีพ
          </div>
          <div className="w-[191px] h-[54px] px-8 py-3 bg-blue-600 rounded-lg justify-start items-start gap-2.5 inline-flex">
            <button className="text-center text-white text-xl font-medium leading-[30px]">
              เช็คราคาบริการ
            </button>
          </div>
        </div>
        <div className="mt-[47px]">
          <img src="/assets/images/pointing-guy.png" alt="" />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
