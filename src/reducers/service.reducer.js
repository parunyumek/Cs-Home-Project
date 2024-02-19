import { createSlice } from "@reduxjs/toolkit";

// 1
const initialState = {
  // value: 0,
  services: [],
  data: [],
  address: [],
  addressData: [],
};

// 2
const serviceReducer = createSlice({
  name: "service",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount(state, action) {
    //   state.value += parseInt(action.payload);
    // },
    // setInitail(state) {
    //   state.value = 0;
    // },
    setService: (state, action) => {
      const services = action.payload.map((item) => {
        return { ...item, quantity: 0 };
      });

      state.services = services; //reassign value from payload to state
    },
    serviceIncrement: (state, action) => {
      const { payload } = action;
      const services = payload.services;

      const newServices = services.map((service) =>
        service.subServiceId === payload.subServiceId
          ? {
              ...service,
              quantity: service.quantity + 1,
            }
          : service
      );
      state.services = newServices;
    },
    serviceDecrement: (state, action) => {
      const { payload } = action;
      const services = payload.services;

      const newServices = services.map((service) =>
        service.subServiceId === payload.subServiceId && service.quantity > 0
          ? { ...service, quantity: service.quantity - 1 }
          : service
      );
      state.services = newServices;
    },
    setData: (state, action) => {
      const { payload } = action;

      state.data = payload;
    },
    setAddress: (state, action) => {
      const { payload } = action;

      state.address = payload;
    },
    addressSelect: (state, action) => {
      const { payload } = action;
      const addressData = payload.services;
    },
  },
});

// 3
export const {
  increment,
  decrement,
  incrementByAmount,
  setInitail,
  serviceIncrement,
  setService,
  serviceDecrement,
  setData,
  setAddress,
  addressSelect,
} = serviceReducer.actions;
export default serviceReducer.reducer;
