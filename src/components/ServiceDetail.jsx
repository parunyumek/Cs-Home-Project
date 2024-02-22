"use client";

import Container from "./Container";
import * as React from "react";
import ServiceList from "./ServiceList";
import Summary from "./Summary";
import PaymentProcess from "./PaymentProcess";

const ServiceDetail = () => {
  return (
    <div className="w-full flex justify-center mt-16 mb-10 h-full">
      <Container>
        <div className="flex flex-col w-full gap-8">
          <PaymentProcess />
          <div className="flex gap-8">
            <div className="w-2/3">
              <ServiceList />
            </div>
            <div className="w-1/3">
              <Summary />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceDetail;
