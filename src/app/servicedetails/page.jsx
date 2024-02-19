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
import { fetchData, fetchAddress } from "@/app/servicedetails/actions";
import { useSelector, useDispatch } from "react-redux";
import { setService, setData, setAddress } from "@/reducers/service.reducer";
import { Fragment } from "react";

const Page = () => {
  const search = useSearchParams();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const stepParam = parseInt(search.get("step"));
    if (!isNaN(stepParam)) {
      setStep(stepParam);
    }
  }, [search]);

  const dispatch = useDispatch();
  const services = useSelector((state) => state.services); // ไว้เรียกใช้ value ใน reducer
  const address = useSelector((state) => state.address);

  const fetchServices = async () => {
    try {
      const data = await fetchData();

      dispatch(setService(data.sub_services)); // send value to reducer
      dispatch(setData(data));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const getAddress = async () => {
    try {
      const address = await fetchAddress();

      dispatch(setData(address));
      dispatch(setAddress(address));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
    getAddress();
  }, []);

  return (
    <Fragment>
      <div className="h-full ">
        <Navbar />
        <BackgroundService />
        <ServiceName />
        {step === 0 && <ServiceDetail activeStep={step} />}
        {step === 1 && <AddAddress activeStep={step} />}
        {step === 2 && <Payment activeStep={step} />}
      </div>
      <BottomTab />
    </Fragment>
  );
};

export default Page;
