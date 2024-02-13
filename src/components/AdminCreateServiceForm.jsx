"use client";
import React, { useRef, useState, useEffect } from "react";
import { supabase } from "/supabase.js";

const AdminCreateServiceForm = ({
  onServiceNameChange,
  onServiceCategoryChange,
  onSubServiceChange,
  serviceNameP,
  serviceCategoryP,
  subServiceItemsP,
  onSubmits,
}) => {
  // const [serviceName, setServiceName] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [serviceCategory, setServiceCategory] = useState([]);
  const [imageURL, setImageURL] = useState("");

  const fileInputRef = useRef(null);

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

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`path/to/store/${file.name}`, file);

      if (error) {
        console.error("Error uploading image:", error.message);
      } else {
        setImageURL(data.Key);
      }
    }
  };

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
    const newSubServiceItems = [
      ...subServiceItemsP,
      {
        subServiceName: "",
        price: "",
        unit: "",
      },
    ];
    onSubServiceChange(newSubServiceItems);
  };

  const removeSubServiceItem = (index) => {
    /// มีบัคต้องแก้จุดนี้
    const newSubServiceItems = [...subServiceItemsP];
    newSubServiceItems.splice(index, 1);
    onSubServiceChange(newSubServiceItems);
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
