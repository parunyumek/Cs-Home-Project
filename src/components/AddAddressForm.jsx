import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useSelector, useDispatch } from "react-redux";
import { Address, CreateInput } from "thai-address-autocomplete-react";
import { saveAddress } from "@/reducers/service.reducer";
import dayjs from "dayjs";

const InputThaiAddress = CreateInput();

const AddAddressForm = () => {
  const dispatch = useDispatch();
  const addressState = useSelector((state) => state.address);

  const [address, setAddress] = useState({
    more: "",
    date: "",
    hour: "",
    minute: "",
    address: "",
    district: "", // ตำบล tambol
    amphoe: "", // อำเภอ amphoe
    province: "", // จังหวัด changwat
    zipcode: "", // รหัสไปรษณีย์ postal code
  });

  console.log("addressState :>> ", addressState);

  useEffect(() => {
    setAddress({ ...address, ...addressState });
  }, []);

  const handleChange = (scope) => (value) => {
    setAddress((oldAddr) => ({
      ...oldAddr,
      [scope]: value,
    }));
  };

  const handleSelect = (value) => {
    setAddress({ ...address, ...value });
    dispatch(
      saveAddress({
        ...address,
        ...value,
        hour: address.hour,
        minute: address.minute,
      })
    );
  };

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
                onAccept={(value) => {
                  console.log("value :>> ", dayjs(value).format("YYYY-MM-DD"));
                  setAddress({
                    ...address,
                    date: dayjs(value).format("YYYY-MM-DD"),
                  });
                  dispatch(
                    saveAddress({
                      ...addressState,
                      date: dayjs(value).format("YYYY-MM-DD"),
                    })
                  );
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
                onAccept={(value) => {
                  setAddress({
                    ...address,
                    hour: dayjs(value).hour(),
                    minute: dayjs(value).minute(),
                  });
                  dispatch(
                    saveAddress({
                      ...addressState,
                      hour: dayjs(value).hour(),
                      minute: dayjs(value).minute(),
                    })
                  );
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
              className="border-zinc-400 h-11 bg-white rounded-lg border px-2 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="subDistrict">แขวง / ตำบล</label>
            <InputThaiAddress.District
              value={address.district}
              onChange={handleChange("district")}
              onSelect={handleSelect}
              // className="border-zinc-400 h-11 bg-white rounded-lg border px-2"
              style={{
                border: "rgb(161, 161, 170) 1px solid ",
                height: "44px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            />
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="district">เขต / อำเภอ</label>
            <InputThaiAddress.Amphoe
              value={address["amphoe"]}
              onChange={handleChange("amphoe")}
              onSelect={handleSelect}
              style={{
                border: "rgb(161, 161, 170) 1px solid ",
                height: "44px",
                borderRadius: "8px",
              }}
            />
          </div>
          <div
            className="flex flex-col w-full gap-1"
            style={{
              "&div": {
                border: "1px solid red ",
              },
            }}
          >
            <label htmlFor="province">จังหวัด</label>
            <InputThaiAddress.Province
              value={address["province"]}
              onChange={handleChange("province")}
              onSelect={handleSelect}
              style={{
                border: "rgb(161, 161, 170) 1px solid ",
                height: "44px",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="additionalInfo">ระบุข้อความเพิ่มเติม</label>
          <textarea
            placeholder="กรุณาระบุข้อมูลเพิ่มเติม"
            className="border-zinc-400 h-24 bg-white rounded-lg border p-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ overflowY: "auto" }}
            onChange={(e) => setAddress({ ...address, more: e.target.value })}
          />
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
