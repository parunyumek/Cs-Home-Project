"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import Link from "next/link";

const AdminCategoryLists = ({ categoryListP, searchInput }) => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [categoryName, setCategoryName] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  // Function to format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Bangkok, Thailand is UTC+7
    const bangkokOffset = 0 * 60 * 60 * 1000; // 7 hours in milliseconds
    const bangkokTime = new Date(date.getTime() - bangkokOffset);

    const day = bangkokTime.getDate().toString().padStart(2, "0");
    const month = (bangkokTime.getMonth() + 1).toString().padStart(2, "0");
    const year = bangkokTime.getFullYear();
    let hours = bangkokTime.getHours();
    const minutes = bangkokTime.getMinutes().toString().padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  const timeFormatted = (createdTime, updatedTime, callbackFunction) => {
    setCreatedAt(createdTime);
    setUpdatedAt(updatedTime);
  };

  const fetchCategoryList = async () => {
    try {
      let { data, error } = await supabase.from("categories").select("*");

      if (error) {
        throw error;
      }

      // Modify the timestamp format before setting state
      data.forEach((category) => {
        category.created_at = formatDate(category.created_at);
        category.updated_at = formatDate(category.updated_at);
      });

      setFilteredCategoryList(data);
      timeFormatted(data[0].created_at, data[0].updated_at, formatDate);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  useEffect(() => {
    const fetchAndFilterCategories = async () => {
      try {
        let { data, error } = await supabase.from("categories").select("*");

        if (error) {
          throw error;
        }

        // Modify the timestamp format before setting state
        data.forEach((category) => {
          category.created_at = formatDate(category.created_at);
          category.updated_at = formatDate(category.updated_at);
        });

        // Filter the services based on search input
        const filteredList = data.filter((category) =>
          category.category_name
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );

        setFilteredCategoryList(filteredList);
        timeFormatted(data[0].created_at, data[0].updated_at, formatDate);
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    fetchAndFilterCategories();
  }, [searchInput, categoryListP]);

  // Function to handle reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, return

    const items = Array.from(filteredCategoryList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFilteredCategoryList(items);
  };

  const handleCancelButtonClick = (CategoryName) => {
    setCategoryName(CategoryName); // Store the service name in the state
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const deleteCategory = async (categoryName) => {
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("category_name", categoryName);

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
      fetchCategoryList();
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
          <div className=" w-[1570px] h-[41px] border-[1px] border-[#e6e7eb] ml-[280px] mt-[150px]  bg-[#EFEFF2] z-10 rounded-t-[10px]">
            <div className="flex flex-row text-[#646C80] text-[14px] mt-2">
              <div className="flex flex-row w-[400px] justify-start gap-8 ml-16">
                <p>ลำดับ</p>
                <p>ชื่อหมวดหมู่</p>
              </div>
              <div className="flex flex-row w-[900px] justify-between ml-36 mb-[11px]">
                <p>สร้างเมื่อ</p>
                <p>แก้ไขล่าสุด</p>
                <p>Action</p>
              </div>
            </div>

            <Droppable droppableId="categoryListP">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className=""
                >
                  {filteredCategoryList.map((category, index) => (
                    <Draggable
                      key={category.id}
                      draggableId={category.id.toString()}
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
                            href={`/admin/details-category?id=${category.id}`}
                          >
                            <p className="ml-[45px] w-[480px] text-start text-black hover:text-blue-600">
                              {category.category_name}
                            </p>
                          </Link>

                          <p className=" w-[420px] text-start   ">
                            {category.created_at}
                          </p>
                          <p className=" w-[430px] text-start  ">
                            {" "}
                            {category.updated_at}
                          </p>
                          <div className="flex flex-row  gap-4 ">
                            <img
                              src="/assets/icons/trashbin.svg"
                              className="cursor-pointer"
                              alt="Delete"
                              onClick={() =>
                                handleCancelButtonClick(category.category_name)
                              }
                            />
                            <Link
                              href={`/admin/edit-category?id=${category.id}`}
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
                คุณต้องการลบรายการ ‘{categoryName}’ ใช่หรือไม่
              </p>
              <div className="flex justify-center gap-2">
                <button
                  className="mr-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-[112px] h-[44px]"
                  onClick={() => deleteCategory(categoryName)}
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

export default AdminCategoryLists;
