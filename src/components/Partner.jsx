const Partner = () => {
  return (
    <div className="bg-blue-700 flex relative">
      <div>
        <img src="/assets/images/part-male-construction-worker.png" alt="" />
      </div>
      <div className="flex flex-col justify-center gap-6 ml-[130px]">
        <div className="text-white text-[40px] font-semibold leading-[50px]">
          มาร่วมเป็นพนักงานซ่อม
          <br />
          กับ HomeServices
        </div>
        <div className="w-[353px] text-white text-xl font-normal leading-[30px]">
          เข้ารับการฝึกอบรมที่ได้มาตรฐาน ฟรี! <br />
          และยังได้รับค่าตอบแทนที่มากขึ้นกว่าเดิม
        </div>
        <div className="text-white text-[32px] font-medium leading-[48px]">
          ติดต่อมาที่อีเมล: job@homeservices.co
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <img src="/assets/images/house-1.png" alt="" />
      </div>
    </div>
  );
};

export default Partner;
