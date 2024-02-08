"use client";
import React, { useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const AdminCreateServiceForm = ({ onServiceNameChange }) => {
  const [subServiceItems, setSubServiceItems] = useState([
    {
      serviceListName: "",
      price: "",
      unit: "",
    },
  ]); // {} ให้มีช่องรายการบริการย่อยอยู่ 1 อันตั้งแต่เริ่มต้น

  const [serviceName, setServiceName] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [subServices, setSubServices] = useState([]);
  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`path/to/store/${file.name}`, file);

      if (error) {
        console.error("Error uploading image:", error.message);
      } else {
        // Set the uploaded image URL to the state
        setImageURL(data.Key);
      }
    }
  };

  const handleServiceNameChange = (event) => {
    const newName = event.target.value;
    setServiceName(newName);
    // Pass the service name to the parent component
    onServiceNameChange(newName);
  };

  const handleServiceCategoryChange = (event) => {
    setServiceCategory(event.target.value);
  };

  const addSubServiceItem = (event) => {
    event.preventDefault();
    const newSubServiceItems = [
      ...subServiceItems,
      {
        serviceListName: "",
        price: "",
        unit: "",
      },
    ];
    setSubServiceItems(newSubServiceItems);
  };

  const removeSubServiceItem = (index) => {
    /// มีบัคต้องแก้จุดนี้
    const newSubServiceItems = [...subServiceItems];
    newSubServiceItems.splice(index, 1);
    setSubServiceItems(newSubServiceItems);
  };

  const fillSubServiceItem = (value, index, key) => {
    const newSubServiceItems = [...subServiceItems];
    newSubServiceItems[index][key] = value;
    setSubServiceItems(newSubServiceItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data for insertion
    const newService = {
      name: serviceName,
      category: serviceCategory,
      sub_services: subServices,
    };

    try {
      // Insert data into 'services' table
      const { data, error } = await supabase
        .from("services")
        .insert([newService]);

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Data inserted successfully:", data);
        // Clear form fields after successful insertion
        setServiceName("");
        setServiceCategory("");
        setSubServices([]);
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "100px",
        overflowY: "scroll",
        backgroundColor: "rgb(243,244,246)",
      }}
    >
      <form
        className="ml-72 mt-28 bg-white w-4/5 h-auto rounded-[10px] pb-11"
        onSubmit={handleSubmit}
      >
        <div className="">
          <div>
            <label htmlFor="fullName" className="text-gray-700 ml-5">
              ชื่อบริการ<span className="text-rose-700 text-[16px]">*</span>
            </label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-10 ml-64 w-[440px] text-gray-700"
              value={serviceName}
              onChange={handleServiceNameChange}
            />
          </div>
          <div>
            <label htmlFor="fullName" className="text-gray-700 ml-5">
              หมวดหมู่<span className="text-rose-700 text-[16px]">*</span>
            </label>
            <select
              name="serviceCategory"
              id="serviceCategory"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-10 ml-64 w-[440px] text-gray-700"
              value={serviceCategory}
              onChange={handleServiceCategoryChange}
            >
              <option value="" disabled selected>
                กรุณาเลือกหมวดหมู่
              </option>
              <option value="บริการทั่วไป">บริการทั่วไป</option>
              <option value="บริการห้องครัว">บริการห้องครัว</option>
              <option value="บริการห้องน้ำ">บริการห้องน้ำ</option>
            </select>
          </div>

          <div className="mt-14">
            <label htmlFor="fullName" className="text-gray-700 ml-5 ">
              รูปภาพ<span className="text-rose-700 text-[16px] ">*</span>
            </label>
            <input
              type="file"
              id="serviceImage"
              name="serviceImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <img
              src="/assets/images/imageupload.svg"
              className="ml-[345px]  "
              alt="upload image"
              onClick={handleUploadButtonClick}
            />
          </div>
          <h1 className="text-gray-700 mt-24 text-[16px] ml-5">
            รายการบริการย่อย
          </h1>

          {/* แสดง element ของรายการบริการที่มีอยู่ก่อน */}
          {subServiceItems.map((item, index) => (
            <div key={index} className="flex flex-row gap-3 mt-10 ml-16">
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-gray-700 text-[14px] "
                >
                  ชื่อรายการ
                </label>
                <input
                  type="text"
                  id={`serviceName${index}`}
                  name={`serviceName${index}`}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-[440px] text-gray-700"
                  onChange={(e) =>
                    fillSubServiceItem(e.target.value, index, "serviceListName")
                  }
                  value={item.serviceListName}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-gray-700  text-[14px] "
                >
                  ค่าบริการ / 1 หน่วย
                </label>
                <input
                  type="number"
                  id={`serviceCost${index}`}
                  name={`serviceCost${index}`}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-[440px] text-right text-gray-700 "
                  placeholder="฿"
                  onChange={(e) =>
                    fillSubServiceItem(e.target.value, index, "price")
                  }
                  value={item.price}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-gray-700  text-[14px] "
                >
                  หน่วยการบริการ
                </label>
                <input
                  type="text"
                  id={`serviceUnit${index}`}
                  name={`serviceUnit${index}`}
                  className="border border-gray-300 rounded-lg px-4 py-2   w-[440px] text-gray-700"
                  onChange={(e) =>
                    fillSubServiceItem(e.target.value, index, "unit")
                  }
                  value={item.unit}
                />
              </div>
              <button
                className="text-gray-400 underline"
                onClick={() => removeSubServiceItem(index)}
              >
                ลบบริการ
              </button>
            </div>
          ))}

          <button
            className="w-[185px] h-[44px] px-6 py-2.5 bg-white rounded-lg justify-center items-center gap-2 inline-flex ml-6 border-blue-600 border-[1px]  text-blue-600 mt-10"
            onClick={addSubServiceItem}
          >
            เพิ่มรายการ +
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateServiceForm;
