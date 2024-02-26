"use client";

import { supabase } from "/supabase.js";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

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
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

    const router = useRouter();

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

  const handleCancelButtonClick = (serviceName) => {
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const deleteService = async (serviceNameProps) => {
    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("service_name", serviceNameProps);

      if (error) {
        throw error;
      }

      // Refresh the service list after deletion
      Swal.fire({
        title: "ทำการลบบริการเรียบร้อย",
        icon: "success",
        customClass: {
          title: "text-xl text-blue-600",
          confirmButton: "hidden", // Hide the confirm button
        },
        timer: 2000,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
      }).then(() => {
        console.log("Dialog closed automatically");
        router.push("/admin/services");
      });
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting service:", error.message);
    }
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
      <div className=" text-gray-600 underline mt-5 ml-[1700px] flex flex-row font-bold  ">
        {" "}
        <img src="/assets/icons/trashbin.svg" className="ml-3" alt="Delete" />
        <p className="ml-2 cursor-pointer " onClick={handleCancelButtonClick}>
          ลบบริการ
        </p>
      </div>
      {isDeleteConfirmationOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white w-[360px] h-[270px] rounded-lg  p-6 text-[#00144D] shadow-md relative">
              <img
                src="/assets/icons/alerticon.svg"
                className="ml-[130px] mb-4"
              />
              <button
                className="text-[#4F5E8C] absolute right-7 top-5"
                onClick={handleCancelDelete}
              >
                X
              </button>
              <p className="text-[20px] font-semibold mb-4 text-center">
                ยืนยันการลบรายการ?
              </p>
              <p className="text-[16px] font-light mb-10 text-center ">
                คุณต้องการลบรายการ ‘{serviceNameProps}’ ใช่หรือไม่
              </p>
              <div className="flex justify-center gap-2">
                <button
                  className="mr-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-[112px] h-[44px]"
                  onClick={() => deleteService(serviceNameProps)}
                >
                  ลบรายการ
                </button>
                <button
                  className="bg-white px-4 py-2 rounded-lg border-[1px] border-blue-600 text-blue-600 w-[112px] h-[44px]"
                  onClick={handleCancelDelete}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCreateServiceForm;
