import Container from "./Container";
import CardService from "./CardService";

const Service = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1440px] w-full flex flex-col ">
        <div className="flex justify-center mt-[80px] mb-[40px] text-blue-950 text-[32px] font-medium leading-[48px]">
          บริการยอดฮิตของเรา
        </div>
        <div className="flex justify-between mb-[60px]">
          <CardService />
          <CardService />
          <CardService />
        </div>
        <div className="flex justify-center mb-[147px]">
          <button className="flex w-[155px] h-11 px-6 py-2.5 bg-blue-600 rounded-lg justify-center items-center gap-2">
            <div className="text-center text-white text-base font-medium leading-normal">
              ดูบริการท้ังหมด
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
