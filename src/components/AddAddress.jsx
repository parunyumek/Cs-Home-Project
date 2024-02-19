import Container from "./Container";
import * as React from "react";
import AddAddressForm from "./AddAddressForm";
import PaymentProcess from "./PaymentProcess";
import Summary from "./Summary";

const AddAddress = () => {
  return (
    <div className="w-full flex justify-center mt-16 ">
      <Container>
        <div className="flex flex-col w-full gap-8">
          <PaymentProcess />
          <div className="flex gap-8">
            <div className="w-2/3">
              <AddAddressForm />
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

export default AddAddress;
