import Summary from "./Summary";
import Container from "./Container";
import * as React from "react";
import PaymentProcess from "./PaymentProcess";

const Payment = () => {
  return (
    <div className="w-full flex justify-center mb-10 mt-16">
      <Container>
        <div className="flex flex-col w-full gap-8">
          <PaymentProcess />
          <div className="flex gap-8">
            <div className="  flex flex-col gap-6 bg-white p-6 rounded-lg border-gray-300 border w-2/3">
              <div className="top"></div>
              <div className="mib"></div>
              <div className="low"></div>
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

export default Payment;
