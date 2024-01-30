import Container from "./Container";

const Copyright = () => {
  return (
    <div>
      <div className="bg-gray-100 flex justify-center items-center h-[42px]">
        <Container>
          <div className="text-gray-400 text-xs font-normal leading-[18px]">
            copyright © 2021 HomeServices.com All rights reserved
          </div>
          <div className="flex gap-6">
            <button className="text-gray-500 text-sm font-normal leading-[21px]">
              เงื่อนไขและข้อตกลงการใช้งานเว็บไซต์
            </button>
            <button className="text-gray-500 text-sm font-normal leading-[21px]">
              นโยบายความเป็นส่วนตัว
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Copyright;
