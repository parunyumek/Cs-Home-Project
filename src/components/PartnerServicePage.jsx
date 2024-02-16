const PartnerServicePage = () => {
  return (
    <div className="bg-blue-700 flex relative h-[354px]">
      <div className="flex flex-col justify-center  item-center gap-6  ">
        <div className=" w-screen  h-[120px] text-white text-xl flex flex-col justify-center items-center font-normal leading-[30px] ">
          <div>
            เพราะเราคือช่าง ผู้ให้บริการเรื่องบ้านอันดับ 1 แบบครบวงจร
            โดยทีมช่างมืออาชีพมากกว่า 100 ทีม
          </div>
          <div>สามารถตอบโจทย์ด้านการบริการเรื่องบ้านของคุณ และสร้าง</div>
          <div>
            ความสะดวกสบายในการติดต่อกับทีมช่าง ได้ทุกที่ ทุกเวลา ตลอด 24 ชม.
          </div>
          <div>มั่นใจ ช่างไม่ทิ้งงาน พร้อมรับประกันคุณภาพงาน</div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <img src="/assets/images/house-1.png" alt="" />
      </div>
    </div>
  );
};

export default PartnerServicePage;
