"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const AdminServiceLists = () => {
  const [serviceDetails, setServiceDetails] = useState([]);

  useEffect(() => {
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

        setServiceDetails(data);
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    fetchServicesDetails();
  }, []);

  // Function to format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

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

  // Function to handle reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, return

    const items = Array.from(serviceDetails);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setServiceDetails(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <div className="fixed w-[1570px] h-[41px] border-[1px] border-[#e6e7eb] ml-[280px] mt-[150px] bg-[#EFEFF2] z-10 rounded-t-[10px]">
          <div className="flex flex-row  text-[#646C80] text-[14px] mt-2">
            <div className="flex flex-row  w-[400px] justify-start gap-8 ml-16">
              <p>ลำดับ</p>
              <p>ชื่อบริการ</p>
            </div>
            <div className="flex flex-row  w-[900px] justify-between ml-36 mb-[11px]">
              <p>หมวดหมู่</p>
              <p>สร้างเมื่อ</p>
              <p>แก้ไขล่าสุด</p>
              <p>Action</p>
            </div>
          </div>

          <Droppable droppableId="serviceDetails">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {serviceDetails.map((service, index) => (
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
                        className="flex bg-white w-[1568px] h-[90px] text-black text-[16px] items-center border-b-[1px]"
                      >
                        <img
                          src="/assets/icons/resequence.png"
                          className="h-[16px] ml-7"
                          alt="resequence"
                        />
                        <p className=" ml-[80px] w-auto text-center fixed ">
                          {index + 1}
                        </p>
                        <p className=" ml-[125px] w-auto text-center fixed">
                          {service.service_name}
                        </p>

                        <p
                          className={`w-auto p-1 rounded-md text-sm ml-[600px] fixed ${
                            categoryBackgroundColors[service.category_name]
                          } ${categoryTextColors[service.category_name]}`}
                        >
                          {service.category_name}
                        </p>

                        <p className=" w-auto text-center ml-[890px] fixed">
                          {service.created_at}
                        </p>
                        <p className=" w-auto text-center ml-[1170px] fixed">
                          {service.updated_at}
                        </p>
                        <div className="flex flex-row ml-[1460px] gap-4 fixed">
                          <img
                            src="/assets/icons/trashbin.svg"
                            className=""
                            alt="Delete"
                          />
                          <img
                            src="/assets/icons/edit.svg"
                            className=""
                            alt="Edit"
                          />
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
  );
};

export default AdminServiceLists;
