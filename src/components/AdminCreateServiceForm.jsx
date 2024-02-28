"use client";

import { supabase } from "/supabase.js";
import React, { useState, useEffect } from "react";

const AdminCreateServiceForm = ({
  onServiceNameChange,
  onServiceCategoryChange,
  onSubServiceChange,
  onImageChange,
  onImageFileChange,
  serviceNameP,
  serviceCategoryP,
  subServiceItemsP,
  imageP,
  onSubmits,
}) => {
  const [serviceCategory, setServiceCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let { data, error } = await supabase
          .from("categories")
          .select("category_name");

        if (error) {
          throw error;
        }

        const categoryNames = data.map((category) => category.category_name);

        setServiceCategory(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleServiceNameChange = (event) => {
    const newName = event.target.value;
    // setServiceName(newName);
    onServiceNameChange(newName); // ส่งค่า serviceName ไปยัง Page
  };

  const handleServiceCategoryChange = (event) => {
    const newCategory = event.target.value;

    onServiceCategoryChange(newCategory); // ส่งค่า serviceCategory ไปยัง Page
  };

  const fillSubServiceItem = (value, index, key) => {
    const updatedSubServiceItems = [...subServiceItemsP];
    updatedSubServiceItems[index][key] = value;
    onSubServiceChange(updatedSubServiceItems); // )
    console.log("subServiceItemsP", subServiceItemsP);
  };

  const addSubServiceItem = (event) => {
    // เพิ่มช่องบริการย่อย
    event.preventDefault();
    const newSubServiceId = subServiceItemsP.length + 1;

    const newSubServiceItems = [
      ...subServiceItemsP,
      {
        subServiceId: newSubServiceId.toString(),
        subServiceName: "",
        price: "",
        unit: "",
      },
    ];
    onSubServiceChange(newSubServiceItems);
  };

  const removeSubServiceItem = (e, index) => {
    e.preventDefault();
    /// มีบัคต้องแก้จุดนี้
    const newSubServiceItems = [...subServiceItemsP];
    newSubServiceItems.splice(index, 1);
    onSubServiceChange(newSubServiceItems);
  };

  const deleteImage = () => {
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
      
    >
      <form
        className=" bg-white  h-auto rounded-[10px] pb-11"
        onSubmit={(event) => onSubmits(event)}
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
              value={serviceNameP}
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
              value={serviceCategoryP}
              onChange={handleServiceCategoryChange}
            >
              <option value="" disabled selected>
                กรุณาเลือกหมวดหมู่
              </option>
              {serviceCategory.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-14 flex">
            <label htmlFor="fullName" className="text-gray-700 ml-5 ">
              รูปภาพ<span className="text-rose-700 text-[16px] ">*</span>
            </label>

            <div className="flex-col">
              <div key={1}>
                <div
                  className="ml-[268px] h-[150px] w-[440px] border-2 rounded-lg border-dashed text-center cursor-pointer relative z-0 "
                  onClick={handleImageClick}
                  style={{
                    backgroundImage: `url(${imageP})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                >
                  {imageP === null && (
                    <div className="flex flex-col text-center justify-center items-center h-full ">
                      <div>
                        <div
                          className="flex justify-center mt-6 mb-2"
                          id="service-pic"
                        >
                          <img src="/assets/icons/Path.svg" alt="" />
                        </div>
                        <span className=" text-blue-500 mr-3">
                          อัพโหลดรูปภาพ
                        </span>
                        <span className="text-gray-700">
                          หรือ ลากและวางที่นี่
                        </span>
                        <p className="text-gray-700">
                          PNG, JPG ขนาดไม่เกิน 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="h-[30px] text-gray-700">
                  <span className="ml-[278px] text-xs">
                    ขนาดภาพที่แนะนำ: 1440 x 225 PX
                  </span>
                  {imageP !== null && (
                    <button
                      className=" text-blue-500 underline underline-offset-1 ml-[190px]"
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
          </div>

          <h1 className="text-gray-700 mt-20 text-[16px] ml-5">
            รายการบริการย่อย
          </h1>

          {subServiceItemsP.map((item, index) => (
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
                onClick={(e) => removeSubServiceItem(e, index)}
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
