import Container from "./Container";

const Footer = () => {
  return (
    <div className="flex flex-col items-center bg-[#ffffff]">
      <Container>
        <div className="flex w-full justify-between items-center h-[193px]">
          <div className="gap-[10px] flex items-center">
            <img className="h-[40px]" src="/assets/icons/house_1.svg" alt="" />
            <span className="text-blue-600 text-3xl font-medium">
              HomeServices
            </span>
          </div>
          <div>
            <div className="text-zinc-800 text-lg font-bold leading-[27px]">
              บริษัท โฮมเซอร์วิสเซส จำกัด
            </div>
            <div className="text-gray-600 text-sm font-normal leading-[21px]">
              452 ซอยสุขุมวิท 79 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพมหานคร 10260
            </div>
          </div>
          <div>
            <div className="flex gap-3">
              <img src="/assets/icons/phone_black.svg" alt="" />
              <span className="text-gray-600 text-base font-normal leading-normal">
                080-540-6357
              </span>
            </div>
            <div className="flex gap-3">
              <img src="/assets/icons/email_black.svg" alt="" />
              <span className="text-gray-600 text-base font-normal leading-normal">
                contact@homeservices.co
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
