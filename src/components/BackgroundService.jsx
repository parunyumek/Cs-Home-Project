import { useState, useEffect } from "react";
import { fetchData } from "@/app/servicedetails/actions";

const BackgroundService = () => {
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
    <div className="absolute h-60 w-full -z-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${services.img}')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
    </div>
  );
};

export default BackgroundService;
