import { createSlice } from "@reduxjs/toolkit";

// 1
const initialState = {
  // value: 0,
  services: [],
  data: [],
  address: {},
  role: "",
  total: "",
  promotionCode: "",
  promotionDiscount: "",
  promotionType: "",
  remainingQuota: "",
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
      console.log("services :>> ", services);
      state.total = "0.00";
      state.services = services; //reassign value from payload to state
    },

    resetDiscount: (state, action) => {
      state.promotionType = ""
    },

    totalDiscount: (state, action) => {
      const { payload } = action;
      console.log(payload.totalCalculate);
      state.total = payload.totalCalculate;
      state.promotionCode = payload.promotionCode
      state.promotionDiscount = payload.promotionDiscount
      state.promotionType = payload.promotionType
      state.remainingQuota = payload.remainingQuota
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

      const total = newServices.reduce((accumulatedTotal, service) => {
        return (
          accumulatedTotal +
          parseFloat(service.price) * parseFloat(service.quantity)
        );
      }, 0);

      const formattedTotal = total.toFixed(2);

      state.total = formattedTotal;
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
      const total = newServices.reduce((accumulatedTotal, service) => {
        return (
          accumulatedTotal +
          parseFloat(service.price) * parseFloat(service.quantity)
        );
      }, 0);

      const formattedTotal = total.toFixed(2);

      state.total = formattedTotal;
      state.services = newServices;
    },
    setData: (state, action) => {
      const { payload } = action;

      state.data = payload;
    },
    saveAddress: (state, action) => {
      const { payload } = action;

      state.address = payload;
    },
    setUserRole: (state, action) => {
      const { payload } = action;

      state.role = payload;
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
  saveAddress,
  totalDiscount,
  setUserRole,
  resetDiscount,
} = serviceReducer.actions;
export default serviceReducer.reducer;
