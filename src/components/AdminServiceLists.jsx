import React from "react";

export const AdminServiceLists = () => {
  return (
    <div>
      <div className="fixed w-[1570px] h-[41px] border-[1px] border-[#e6e7eb] ml-[280px] mt-[150px] bg-[#EFEFF2] z-10 rounded-t-[10px]">
        <container className="flex flex-row  text-[#646C80] text-[14px] mt-2">
          <div className="flex flex-row  w-[400px] justify-start gap-8 ml-16">
            <p>ลำดับ</p>
            <p>ชื่อบริการ</p>
          </div>
          <div className="flex flex-row  w-[900px] justify-between ml-36 mb-[11px]">
            <p>หมวดหมู่</p>
            <p>สร้างเมื่อ</p>
            <p>แก้ไขล่าสุด</p>
            <p>Action</p>
          </div>
        </container>

        <div className="flex bg-white w-[1568px] h-[90px] text-black text-[16px] items-center border-b-[1px]">
          <p className="ml-[80px] ">1</p>
          <p className="ml-[40px]">ตัวอย่างบริการ</p>
          <p className="ml-[380px]">ตัวอย่างหมวดหมู่</p>
          <p className="ml-[170px]">12/02/2022 10:30PM</p>
          <p className="ml-[120px]">12/02/2022 10:30PM</p>
          <img src="/assets/icons/trashbin.svg" className="ml-[130px]" />
          <img src="/assets/icons/edit.svg" className="ml-[20px]" />
        </div>
        <div className="flex bg-white w-[1568px] h-[90px] text-black text-[16px] items-center border-b-[1px]">
          <p className="ml-[80px] ">1</p>
          <p className="ml-[40px]">ตัวอย่างบริการ</p>
          <p className="ml-[380px]">ตัวอย่างหมวดหมู่</p>
          <p className="ml-[170px]">12/02/2022 10:30PM</p>
          <p className="ml-[120px]">12/02/2022 10:30PM</p>
          <img src="/assets/icons/trashbin.svg" className="ml-[130px]" />
          <img src="/assets/icons/edit.svg" className="ml-[20px]" />
        </div>
      </div>
    </div>
  );
};
