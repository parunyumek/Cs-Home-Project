"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import Link from "next/link";

const AdminServiceLists = ({ serviceDetails, searchInput }) => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [serviceName, setServiceName] = useState([]);
  const [filteredServiceList, setFilteredServiceList] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const categoryBackgroundColors = {
    บริการทั่วไป: "bg-blue-100",
    บริการห้องครัว: "bg-purple-100",
    บริการห้องน้ำ: "bg-green-100",
  };

  const categoryTextColors = {
    บริการทั่วไป: "text-blue-800",
    บริการห้องครัว: "text-purple-900",
    บริการห้องน้ำ: "text-green-900",
  };

  // Function to format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Get UTC time in milliseconds
    const utcTime = date.getTime();

    // Bangkok, Thailand is UTC+7
    const bangkokOffset = 24 * 60 * 60 * 1000; // 7 hours in milliseconds
    const bangkokTime = new Date(utcTime + bangkokOffset);

    const day = bangkokTime.getDate().toString().padStart(2, "0");
    const month = (bangkokTime.getMonth() + 1).toString().padStart(2, "0");
    const year = bangkokTime.getFullYear();
    const hours = bangkokTime.getHours().toString().padStart(2, "0");
    const minutes = bangkokTime.getMinutes().toString().padStart(2, "0");
    const ampm = bangkokTime.getHours() >= 12 ? "PM" : "AM";

    return `${day - 1}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  const timeFormatted = (createdTime, updatedTime, callbackFunction) => {
    setCreatedAt(createdTime);
    setUpdatedAt(updatedTime);
  };

  const fetchServicesDetails = async () => {
    try {
      let { data, error } = await supabase.from("services").select("*");

      if (error) {
        throw error;
      }

      // Modify the timestamp format before setting state
      data.forEach((service) => {
        service.created_at = formatDate(service.created_at);
        service.updated_at = formatDate(service.updated_at);
      });

      setFilteredServiceList(data);
      timeFormatted(data[0].created_at, data[0].updated_at, formatDate);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  useEffect(() => {
    const fetchAndFilterServices = async () => {
      try {
        let { data, error } = await supabase.from("services").select("*");

        if (error) {
          throw error;
        }

        // Modify the timestamp format before setting state
        data.forEach((service) => {
          service.created_at = formatDate(service.created_at);
          service.updated_at = formatDate(service.updated_at);
        });

        // Filter the services based on search input
        const filteredList = data.filter((service) =>
          service.service_name.toLowerCase().includes(searchInput.toLowerCase())
        );

        setFilteredServiceList(filteredList);
        timeFormatted(data[0].created_at, data[0].updated_at, formatDate);
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    fetchAndFilterServices();
  }, [searchInput, serviceDetails]);

  // Function to handle reordering
 
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, return

    const items = Array.from(filteredServiceList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFilteredServiceList(items);
  };

  const handleCancelButtonClick = (serviceName) => {
    setServiceName(serviceName); // Store the service name in the state
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const deleteService = async (serviceName) => {
    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("service_name", serviceName);

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
      });
      setIsDeleteConfirmationOpen(false);
      fetchServicesDetails();
    } catch (error) {
      console.error("Error deleting service:", error.message);
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <div>
          <div className=" w-[1570px] h-[41px] border-[1px] border-[#e6e7eb] m-10 bg-[#EFEFF2] z-10 rounded-t-[10px]">
            <div className="flex flex-row text-[#646C80] text-[14px] mt-2">
              <div className="flex flex-row w-[400px] justify-start gap-8 ml-16">
                <p>ลำดับ</p>
                <p>ชื่อบริการ</p>
              </div>
              <div className="flex flex-row w-[900px] justify-between ml-36 mb-[11px]">
                <p>หมวดหมู่</p>
                <p>สร้างเมื่อ</p>
                <p>แก้ไขล่าสุด</p>
                <p>Action</p>
              </div>
            </div>

            <Droppable droppableId="serviceDetails">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className=""
                >
                  {filteredServiceList.map((service, index) => (
                    <Draggable
                      key={service.id}
                      draggableId={service.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex bg-white w-[1568px] h-[90px] text-black text-[16px] items-center border-b-[1px] "
                        >
                          <img
                            src="/assets/icons/resequence.png"
                            className="h-[16px] ml-7"
                            alt="resequence"
                          />
                          <p className=" ml-[35px] w-auto text-center  ">
                            {index + 1}
                          </p>
                          <Link
                            href={`/admin/details-services?id=${service.id}`}
                          >
                            <p className="ml-[45px] w-[480px] text-start text-black hover:text-blue-600">
                              {service.service_name}
                            </p>
                          </Link>
                          <div className="w-[285px]">
                            <span
                              className={`p-1 rounded-md text-sm ${
                                categoryBackgroundColors[service.category_name]
                              } ${categoryTextColors[service.category_name]}`}
                            >
                              {service.category_name}
                            </span>
                          </div>

                          <p className=" w-[280px] text-start   ">
                            {createdAt}
                          </p>
                          <p className=" w-[285px] text-start  ">{updatedAt}</p>
                          <div className="flex flex-row  gap-4 ">
                            <img
                              src="/assets/icons/trashbin.svg"
                              className="cursor-pointer"
                              alt="Delete"
                              onClick={() =>
                                handleCancelButtonClick(service.service_name)
                              }
                            />
                            <Link
                              href={`/admin/edit-services?id=${service.id}`}
                            >
                              <img
                                src="/assets/icons/edit.svg"
                                className=""
                                alt="Edit"
                              />
                            </Link>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
      {/* Confirmation Popup */}
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
                คุณต้องการลบรายการ ‘{serviceName}’ ใช่หรือไม่
              </p>
              <div className="flex justify-center gap-2">
                <button
                  className="mr-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-[112px] h-[44px]"
                  onClick={() => deleteService(serviceName)}
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

export default AdminServiceLists;
