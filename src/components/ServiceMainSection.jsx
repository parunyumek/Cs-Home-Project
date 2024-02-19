
import CardService from "./CardService";
import Container from "./Container";
import AllServiceCard from "./AllServiceCard";



const ServiceMainSection = () => {
  
  
  return (
    <div className="flex flex-col justify-center  items-center w-full bg-[#f3f4f6]">
      <div className="  h-80 w- full overflow-hidden">
        {/* banerhead */}
        <img src="/banner.svg" alt="" className="object-cover h-full w-full" />
      </div>
      

      
        <div className=" w-full flex flex-col ">
          {/* <div>  seach  </div> */}
          <div className="cardService">
            <div>
              <AllServiceCard />
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default ServiceMainSection;
