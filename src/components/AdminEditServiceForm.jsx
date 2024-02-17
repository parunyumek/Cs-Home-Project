"use client";

import { supabase } from "/supabase.js";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const AdminCreateServiceForm = ({
  onSubmits,
  serviceNameProps,
  serviceCategoryProps,
  selectedServiceCategoryProps,
  imageProps,
  imageFileProps,
  subServiceProps,
  onServiceNameChange,
  onSelectedServiceCategoryChange,
  onSubServiceChange,
  onImageChange,
  onImageFileChange,
  createdAtProps,
  updatedAtProps,
}) => {
  const handleServiceNameChange = (event) => {
    const newName = event.target.value;
    onServiceNameChange(newName);
  };

  const handleServiceCategoryChange = (event) => {
    const newCategory = event.target.value;
    onSelectedServiceCategoryChange(newCategory);
  };

  const fillSubServiceItem = (value, index, key) => {
    const updatedSubService = [...subServiceProps];
    updatedSubService[index][key] = value;
    onSubServiceChange(updatedSubService);
  };

  const addSubServiceItem = (event) => {
    // เพิ่มช่องบริการย่อย
    event.preventDefault();
    const newSubServiceId = subServiceProps.length + 1;

    const newSubService = [
      ...subServiceProps,
      {
        subServiceId: newSubServiceId.toString(),
        subServiceName: "",
        price: "",
        unit: "",
      },
    ];
    onSubServiceChange(newSubService);
  };

  const removeSubServiceItem = (e, index) => {
    e.preventDefault();
    const newSubServiceItems = [...subServiceProps];
    newSubServiceItems.splice(index, 1);
    onSubServiceChange(newSubServiceItems);
  };

  const deleteImage = (event) => {
    event.preventDefault();
    ("");
    onImageChange(null);
  };

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      console.log("log file", file);
      onImageFileChange(file);
      const reader = new FileReader();
      console.log("log reader", reader);
      reader.onload = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    };
    input.click();
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
        onSubmit={(event) => onSubmits(event)}
      >
        <div className="">
          <div>
            <label htmlFor="fullName" className="text-gray-700 ml-5 font-bold">
              ชื่อบริการ
              <span className="text-rose-700 text-[16px] ">*</span>
            </label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-10 ml-64 w-[440px] text-gray-700"
              value={serviceNameProps}
              onChange={handleServiceNameChange}
            />
          </div>
          <div>
            <label htmlFor="fullName" className="text-gray-700 ml-5 font-bold">
              หมวดหมู่
              <span className="text-rose-700 text-[16px] ">*</span>
            </label>
            <select
              name="serviceCategory"
              id="serviceCategory"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-10 ml-64 w-[440px] text-gray-700"
              value={selectedServiceCategoryProps}
              onChange={handleServiceCategoryChange}
            >
              <option value="" disabled selected>
                กรุณาเลือกหมวดหมู่
              </option>
              {serviceCategoryProps.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <p
            htmlFor="fullName"
            className="text-gray-700 ml-5 mt-14 flex font-bold"
          >
            รูปภาพ
            <span className="text-rose-700 text-[16px] ">*</span>
          </p>
          {/* <img src={imageURL} alt="service image" className=" ml-52  border" /> */}

          <div className="flex-col">
            <div key={1}>
              <div
                className="ml-[350px] h-[150px] w-[440px] border-2 rounded-lg border-dashed text-center cursor-pointer relative z-0  "
                // onClick={handleImageClick}
                style={{
                  backgroundImage: `url(${imageProps})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  
                }}
              >
                {imageProps === null && (
                  <div
                    onClick={handleImageClick}
                    className="flex flex-col text-center justify-center items-center h-full "
                  >
                    <div>
                      <div
                        className="flex justify-center mt-6 mb-2"
                        id="service-pic"
                      >
                        <img src="/assets/icons/Path.svg" alt="" />
                      </div>
                      <span className=" text-blue-500 mr-3">อัพโหลดรูปภาพ</span>
                      <span className="text-gray-700">
                        หรือ ลากและวางที่นี่
                      </span>
                      <p className="text-gray-700">PNG, JPG ขนาดไม่เกิน 5MB</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-[30px] text-gray-700">
                <span className="ml-[350px] text-xs">
                  ขนาดภาพที่แนะนำ: 1440 x 225 PX
                </span>
                {imageProps !== null && (
                  <button
                    className=" text-blue-500 underline underline-offset-1 ml-[190px] font-bold"
                    onClick={deleteImage}
                  >
                    ลบรูปภาพ
                  </button>
                )}
              </div>
            </div>
          </div>

          <img
            id="imagePreview"
            className="hidden max-w-full max-h-[225px]"
            alt="preview"
          />

          <hr className="w-[1450px] mt-9 ml-8"></hr>

          <h1 className="text-gray-700 mt-16 text-[16px] ml-5 font-bold">
            รายการบริการย่อย
          </h1>

          {subServiceProps.map((item, index) => (
            <div key={index} className="flex flex-row gap-3 mt-10 ml-16">
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-gray-700 text-[14px] "
                >
                  ชื่อรายการ
                  <span className="text-rose-700 text-[16px] ">*</span>
                </label>
                <input
                  type="text"
                  id={`subServiceName${index}`}
                  name={`subServiceName${index}`}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-[440px] text-gray-700"
                  onChange={(e) =>
                    fillSubServiceItem(e.target.value, index, "subServiceName")
                  }
                  value={item.subServiceName}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-gray-700  text-[14px] "
                >
                  ค่าบริการ / 1 หน่วย
                  <span className="text-rose-700 text-[16px] ">*</span>
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
                  <span className="text-rose-700 text-[16px] ">*</span>
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
                className="text-blue-500 underline underline-offset-1  font-bold "
                onClick={(e) => removeSubServiceItem(e, index)}
              >
                ลบบริการ
              </button>
            </div>
          ))}

          <button
            className="w-[185px] h-[44px] px-6 py-2.5 bg-white rounded-lg justify-center items-center gap-2 inline-flex ml-6 border-blue-600 border-[1px]  text-blue-600 mt-10 font-bold"
            onClick={addSubServiceItem}
          >
            เพิ่มรายการ +
          </button>
          <hr className="w-[1450px] mt-9 ml-8"></hr>

          <div className="ml-5">
            <div className="flex flex-row mt-8 mb-8">
              <p className="text-[#646C80] text-[16px] font-bold w-[200px] ">
                สร้างเมื่อ
              </p>
              <p className="text-[#646C80] text-[16px]">{createdAtProps}</p>
            </div>
            <div className="flex flex-row">
              <p className="text-[#646C80] text-[16px] mb-8 font-bold w-[200px] ">
                แก้ไขล่าสุด
              </p>
              <p className="text-[#646C80] text-[16px]  mb-8">
                {updatedAtProps}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateServiceForm;
