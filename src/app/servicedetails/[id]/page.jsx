"use client";

import { useState, useEffect } from "react";
import AddAddress from "@/components/AddAddress";
import BackgroundService from "@/components/BackgroundService";
import BottomTab from "@/components/BottomTab";
import Navbar from "@/components/Navbar";
import Payment from "@/components/Payment";
import ServiceDetail from "@/components/ServiceDetail";
import { useSearchParams } from "next/navigation";
import ServiceName from "@/components/ServiceName";
import { fetchData } from "@/app/servicedetails/[id]/actions";
import { useSelector, useDispatch } from "react-redux";
import { setService, setData, saveAddress } from "@/reducers/service.reducer";
import { Fragment } from "react";

const Page = ({ params }) => {
  const search = useSearchParams();
  const stepParam = search?.get("step") || "0";

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data); // ไว้เรียกใช้ value ใน reducer

  const fetchServices = async () => {
    try {
      if (params.id) {
        const data = await fetchData(params.id);

        dispatch(setService(data.sub_services)); // send value to reducer
        dispatch(setData(data));
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    if (parseInt(params.id) !== data.id) {
      fetchServices();
      dispatch(saveAddress({}));
    }
  }, []);

  return (
    <Fragment>
      <div className=" bg-[#f3f4f6] w-screen h-screen relative -z-20 ">
        <Navbar />
        <BackgroundService />
        <ServiceName />
        {(stepParam === "0" || !stepParam) && <ServiceDetail />}
        {stepParam === "1" && <AddAddress />}
        {stepParam === "2" && <Payment />}
      </div>
      <BottomTab params={params} />
    </Fragment>
  );
};

export default Page;
