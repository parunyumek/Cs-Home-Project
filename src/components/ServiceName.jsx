import Link from "next/link";
import Container from "./Container";
import { useState, useEffect } from "react";
import { fetchData } from "@/app/servicedetails/actions";

const ServiceName = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const data = await fetchData();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <Container>
        <div className="flex justify-center items-center gap-3 rounded-lg min-w-min px-9 h-[68px] bg-white shadow-sm mt-10">
          <Link href="/">บริการของเรา</Link>
          <img src="/assets/icons/right.svg" />
          {/* ต้องคิวรี่จาก service */}
          <span className=" text-3xl font-medium tracking-normal text-blue-500">
            {services.service_name}
          </span>
        </div>
      </Container>
    </div>
  );
};

export default ServiceName;
