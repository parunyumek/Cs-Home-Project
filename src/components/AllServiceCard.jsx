"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import * as React from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { checkUserData, checkTagSelect } from "@/app/login/checkUserRole";
import Container from "./Container";
import ButtonComponent from "./ButtonComponent";
import { PriceSliderSelect } from "./PriceSlider";
import ServiceSelect from "./ServiceSelect";

const AllServiceCard = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [services, setServices] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
  const [userData, setUserData] = useState({});
  const user = getCookie("user") ? JSON.parse(getCookie("user")) : {};
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const handleGetUserData = async () => {
    const result = await checkUserData(user?.email);
    setUserData(result);
  };

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
    // ทำสิ่งที่คุณต้องการเมื่อมีการเลือกตัวเลือก
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

      if (selectedSort === "ตามตัวอักษร (Ascending)") {
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

      // if (priceRange !== null && priceRange !== undefined) {
      // data = data.filter((service) => {
      // const { sub_services } = service;
      // return sub_services.some((subService) => {
      // const numericPrice = parseInt(
      // subService.price.replace(/,/g, ""),
      // 10
      // ); // แปลงราคาที่มีลูกน้ำเป็นตัวเลข
      // return (
      // numericPrice >= priceRange[0] && numericPrice <= priceRange[1]
      // );
      // });
      // });
      // }
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
    <div className="w-full">
      <div className=" w-full h-[84px] border-gray-300 border-2 flex flex-row justify-center">
        <div>
          <label htmlFor="search text">
            {" "}
            <input
              type="text"
              id="search text"
              placeholder="ค้นหาหมวดหมู่..."
              className="w-[350px] h-11 px-4 py-2.5 rounded-lg border border-gray-300 text-black m-4 mr-20"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </label>{" "}
        </div>
        <div className="flex items-center space-x-4 mt-2 gap-3">
          <ServiceSelect
            name="หมวดหมู่บริการ"
            firstSelect="บริการทั้งหมด"
            secondSelect="บริการทั่วไป"
            thirdSelect="บริการห้องครัว"
            fourthSelect="บริการห้องน้ำ"
            label="Category"
            width="150px"
            value={selectedCategory}
            onSelectOption={(value) => {
              setSelectedCategory(value === "บริการทั้งหมด" ? "" : value);
            }}
          />
          <hr className="w-px h-11 bg-gray-300" />
          <PriceSliderSelect
            priceRange={priceRange || [0, 0]}
            onPriceChange={setPriceRange || (() => {})}
          />
          <hr className="w-px h-11 bg-gray-300" />
          <ServiceSelect
            name="เรียงตาม"
            firstSelect="บริการแนะนำ"
            secondSelect="บริการยอดนิยม"
            thirdSelect="ตามตัวอักษร (Ascending)"
            fourthSelect="ตามตัวอักษร (Descending)"
            label="Sorted"
            width="215px"
            value={selectedSort}
            onSelectOption={setSelectedSort}
          />
        </div>
        <div className="m-4">
          <button
            className="bg-blue-600 w-[86px] h-[44px] rounded-lg text-white"
            onClick={handleSearch}
          >
            ค้นหา
          </button>
        </div>
      </div>
      {/*card*/}
      <div className="flex flex-col justify-center  items-center">
        <div className=" grid grid-cols-3 gap-[60px] mb-[60px] mt-[60px] ">
          {services.map((service) => {
            return (
              <div key={service.id}>
                <div className="w-[349px] h-[369px] relative bg-white rounded-lg border border-gray-300 flex">
                  <img
                    className="w-[349px] h-[200px] left-0 top-0 absolute rounded-t-lg"
                    src={service.img}
                  />
                  <div className="left-[24px] top-[216px] absolute flex-col justify-start items-start gap-2 inline-flex">
                    <div className="px-2.5 py-1 bg-indigo-50 rounded-lg justify-start items-start gap-2.5 inline-flex">
                      <div className="text-blue-800 text-xs font-normal  leading-[18px]">
                        <ButtonComponent
                          option={service.category_name}
                          onSelect={handleSelect}
                        />
                      </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-1 flex">
                      <div className="text-zinc-800 text-xl font-bold leading-[30px]">
                        {service.service_name}
                      </div>
                      <div className="justify-start items-center gap-2 inline-flex">
                        <div className="w-4 h-4 relative">
                          <img src="/assets/icons/sell_black.svg" alt="" />
                        </div>
                        <div className="text-gray-500 text-sm font-normal  leading-[21px]">
                          <div>
                            ค่าบริการเริ่มต้น {service.sub_services[0].price} ฿
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-0.5 left-[25px] top-[325px] absolute rounded-lg justify-start items-start gap-2.5 inline-flex">
                    {isUserAuthenticated ? (
                      <button className="text-blue-600 text-base font-semibold  underline leading-normal ">
                        <Link
                          href={`/servicedetails/[id]`}
                          as={`/servicedetails/${service.id}`}
                        >
                          เลือกบริการ
                        </Link>
                      </button>
                    ) : (
                      <button className="text-blue-600 text-base font-semibold  underline leading-normal ">
                        <Link href={"/login"}>เลือกบริการ</Link>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllServiceCard;
