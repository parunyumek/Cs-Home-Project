import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useSelector, useDispatch } from "react-redux";

const AddAddressForm = () => {
  const dispatch = useDispatch();
  const { address, data } = useSelector((state) => state);

  console.log("address :>> ", address);

  return (
    <div className=" w-full flex flex-col gap-6 bg-white p-6 rounded-lg border-gray-300 border">
      <h2 className=" text-xl font-normal text-gray-700">กรอกข้อมูลบริการ</h2>
      <form className="flex flex-col gap-6">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="date">วันที่สะดวกใช้บริการ</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    placeholder: "กรุณาเลือกวันที่",
                  },
                }}
                sx={{
                  width: "100%",
                  height: "44px",
                  "& .MuiOutlinedInput-root": {
                    padding: "16px 10px 16px 0px",
                    height: "44px",
                    borderRadius: "0.5rem",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a1a1aa",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="time">เวลาที่สะดวกใช้บริการ</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                disablePast
                ampm={false}
                slotProps={{
                  textField: {
                    placeholder: "กรุณาเลือกเวลา",
                  },
                }}
                sx={{
                  width: "100%",
                  height: "44px",
                  "& .MuiOutlinedInput-root": {
                    padding: "16px 10px 16px 0px",
                    height: "44px",
                    borderRadius: "0.5rem",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a1a1aa",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="address">ที่อยู่</label>
            <input
              placeholder="กรุณากรอกที่อยู่"
              className="border-zinc-400 h-11 bg-white rounded-lg border px-2 py-4"
              type="text"
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="province">จังหวัด</label>
            <select
              className="border-zinc-400 h-11 bg-white rounded-lg border px-2"
              onChange={""}
            >
              <option value="" disabled selected>
                เลือกจังหวัด
              </option>
              {address.map((item) => (
                <option key={item.id} value={item.province}>
                  {item.province}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="district">เขต / อำเภอ</label>

            <select
              className="border-zinc-400 h-11 bg-white rounded-lg border px-2"
              onChange={""}
            >
              <option value="" disabled selected>
                เลือกเขต / อำเภอ
              </option>
              {address.map((item) => (
                <option key={item.id} value={item.amphoe}>
                  {item.amphoe}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="subDistrict">แขวง / ตำบล</label>
            <select
              className="border-zinc-400 h-11 bg-white rounded-lg border px-2"
              onChange={""}
            >
              <option value="" disabled selected>
                เลือกแขวง / ตำบล
              </option>
              {address.map((item) => (
                <option key={item.id} value={item.tambon}>
                  {item.tambon}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="additionalInfo">ระบุข้อความเพิ่มเติม</label>
          <textarea
            placeholder="กรุณาระบุข้อมูลเพิ่มเติม"
            className="border-zinc-400 h-24 bg-white rounded-lg border p-2 w-full "
            style={{ overflowY: "auto" }}
          />
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
