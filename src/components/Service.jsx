"use client";
import Container from "./Container";
import Link from "next/link";
import AllServiceCard from "./AllServiceCard";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { getCookie } from "cookies-next";
import { checkUserData, checkTagSelect } from "@/app/login/checkUserRole";

const Service = () => {
  const [services, setServices] = useState([]);
  const [userData, setUserData] = useState({});
  const user = getCookie("user") ? JSON.parse(getCookie("user")) : {};
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  async function handleGetUserData() {
    const result = await checkUserData(user?.email);
    setUserData(result);
  }

  useEffect(() => {
    const user = getCookie("user") ? JSON.parse(getCookie("user")) : {};
    const fetchData = async () => {
      const result = await checkUserData(user?.email);
      setUserData(result);
      setIsUserAuthenticated(user.aud === "authenticated");
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchServices() {
      try {
        let { data, error } = await supabase
          .from("services")
          .select("*")
          .limit(3)
          .order("quantity_checkout", { ascending: false });

        if (error) {
          throw error;
        }

        setServices(data);
      } catch (error) {
        console.error("Error fetching servicedemo:", error.message);
      }
    }

    fetchServices();
  }, []);

  const handleSelect = async (selectedOption) => {
    let query = supabase.from("services").select("*");

    if (selectedOption === "บริการทั่วไป") {
      query = query.eq("category_name", selectedOption);
    } else if (selectedOption === "บริการห้องครัว") {
      query = query.eq("category_name", selectedOption);
    } else if (selectedOption === "บริการห้องน้ำ") {
      query = query.eq("category_name", selectedOption);
    }

    let { data, error } = await query;
    setServices(data);
  };

  return (
    <div className="w-full flex justify-center bg-[#f3f4f6]">
      <Container>
        <div className="   w-full flex flex-col ">
          <div className="flex justify-center mt-[80px] mb-[40px] text-blue-950 text-[32px] font-bold leading-[48px]">
            บริการยอดฮิตของเรา
          </div>
          <div className="flex justify-between mb-[15px]">
            <AllServiceCard
              services={services}
              isUserAuthenticated={isUserAuthenticated}
              handleGetUserData={handleGetUserData}
              handleSelect={handleSelect}
            />
          </div>
          <div className="flex justify-center mb-[147px]">
            <button className="flex w-[155px] h-11 px-6 py-2.5 bg-blue-600 rounded-lg justify-center items-center gap-2">
              <div className="text-center text-white text-base font-medium leading-normal">
                <Link href={"/service"}>ดูบริการทั้งหมด</Link>
              </div>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Service;
