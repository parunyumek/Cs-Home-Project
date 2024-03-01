"use client";
import AllServiceCard from "./AllServiceCard";
import { useState, useEffect } from "react";
import ServiceSearchBar from "./ServiceSearchBar";
import { getCookie } from "cookies-next";
import { checkUserData, checkTagSelect } from "@/app/login/checkUserRole";
import { supabase } from "../../supabase";

const ServiceMainSection = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [services, setServices] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
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
    setSelectedSort("บริการแนะนำ");
    setPriceRange([0, 2000]);
  }, []);

  useEffect(() => {
    async function fetchServices() {
      try {
        let { data, error } = await supabase.from("services").select("*");

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
  const handleSearch = async () => {
    try {
      let query = supabase.from("services").select("*");

      if (searchText) {
        query = query.ilike("service_name", `%${searchText}%`);
      }

      if (selectedCategory && selectedCategory !== "บริการทั้งหมด") {
        query = query.eq("category_name", selectedCategory);
      }

      if (selectedSort === "บริการยอดนิยม") {
        query = query.order("quantity_checkout", { ascending: false });
      } else if (selectedSort === "ตามตัวอักษร (Ascending)") {
        query = query.order("service_name", { ascending: true });
      } else if (selectedSort === "ตามตัวอักษร (Descending)") {
        query = query.order("service_name", { ascending: false });
      }

      let { data, error } = await query;

      if (selectedSort === "บริการแนะนำ") {
        data.sort((a, b) => {
          const priceA = a.sub_services[0].price; // ราคาของ sub_services แรกในบริการ A
          const priceB = b.sub_services[0].price; // ราคาของ sub_services แรกในบริการ B
          return priceA - priceB; // เรียงลำดับตามราคาของ sub_services
        });
      }

      if (priceRange !== null && priceRange !== undefined) {
        data = data.filter((service) => {
          const { sub_services } = service;
          const firstSubServicePrice = parseInt(
            sub_services[0].price.replace(/,/g, ""),
            10
          );
          return (
            firstSubServicePrice >= priceRange[0] &&
            firstSubServicePrice <= priceRange[1]
          );
        });
      }

      if (error) {
        throw error;
      }

      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

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
            <ServiceSearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              handleSearch={handleSearch}
            />
            <AllServiceCard
              services={services}
              isUserAuthenticated={isUserAuthenticated}
              handleSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceMainSection;
