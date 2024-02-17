"use client";
import AdminSideBar from "@/components/AdminSidebar";
import AdminNavbar4 from "@/components/AdminNavbar4";
import AdminEditServiceForm from "@/components/AdminEditServiceForm";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "/supabase.js";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Page = () => {
  const [navbarServiceName, setNavbarServiceName] = useState("");
  const [service, setService] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceCategory, setServiceCategory] = useState([]);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [subService, setSubService] = useState([
    {
      subServiceId: "1",
      subServiceName: "",
      price: "",
      unit: "",
    },
  ]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const navbarTitle1 = "บริการ";
  const navbarTitle2 = "ตัวอย่างชื่อบริการ";
  const buttonText1 = "ยกเลิก";
  const buttonText2 = "ยืนยัน";
  const backToServiceLists = "/admin/services";

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

  const handleServiceNameChange = (name) => {
    setServiceName(name);
  };

  const handleSelectedServiceCategoryChange = (category) => {
    setSelectedServiceCategory(category);
  };

  const handleSubServiceChange = (subService) => {
    setSubService(subService);
  };

  const handleImage = (image) => {
    setImage(image);
  };
  const handleImageFile = (imageFile) => {
    setImageFile(imageFile);
  };

  const handleCancelCreateService = () => {
    router.push("/admin/services");
  };
  useEffect(() => {
    const fetchService = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("id", id)
            .single();
          if (error) {
            throw error;
          }
          if (data) {
            data.created_at = formatDate(data.created_at);
            data.updated_at = formatDate(data.updated_at);

            setService(data);
            setNavbarServiceName(data.service_name);
            setServiceName(data.service_name);
            setSelectedServiceCategory(data.category_name);

            setImage(data.img);
            setSubService(data.sub_services);
            setCreatedAt(data.created_at);
            setUpdatedAt(data.updated_at);
          }
        }
      } catch (error) {
        console.error("Error fetching service:", error.message);
      }
    };

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

    fetchService();
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if subServiceItems is null or empty
    if (
      !subService ||
      subService.length === 0 ||
      !serviceName ||
      !selectedServiceCategory
    ) {
      Swal.fire({
        title: "<p class='text-red-600'>โปรดตรวจเช็คข้อมูล</p>",
        text: "กรุณาระบุข้อมูลให้ครบทุกช่อง",
        icon: "question",
        confirmButtonColor: "#2563EB",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const fileName = uuid();
    const { data, error } = await supabase.storage
      .from("picture")
      .upload(fileName, imageFile);
    if (error) {
      throw error;
    }

    const publicUrl = supabase.storage.from("picture").getPublicUrl(fileName);

    console.log(publicUrl);

    const updatedService = {
      service_name: serviceName,
      category_name: selectedServiceCategory,
      sub_services: subService,
    };
    
    // Check if imageFile exists before attempting to upload
    if (imageFile) {
      const fileName = uuid();
      const { data, error } = await supabase.storage
        .from("picture")
        .upload(fileName, imageFile);
      if (error) {
        throw error;
      }
    
      const publicUrl = supabase.storage.from("picture").getPublicUrl(fileName);
    
      updatedService.img = publicUrl?.data?.publicUrl;
    }
    
    try {
      // Insert data into 'services' table
      const { data, error } = await supabase
        .from("services")
        .update([updatedService])
        .eq("id", id);
      console.log(updatedService);
      console.log("Data updated successfully:", data);
      Swal.fire({
        title: "อัพเดทบริการเรียบร้อย",
        icon: "success",
        customClass: {
          title: "text-xl text-blue-600",
          confirmButton: "hidden", // Hide the confirm button
        },
        timer: 2000, // Set the timer to auto-close the dialog after 2000 milliseconds (2 seconds)
        timerProgressBar: true, // Show a progress bar indicating the remaining time
        allowOutsideClick: false, // Prevent users from closing the dialog by clicking outside
        allowEscapeKey: false, // Prevent users from closing the dialog by pressing ESC key
        allowEnterKey: false, // Prevent users from closing the dialog by pressing Enter key
        showConfirmButton: false, // Hide the confirm button
      });
      // Clear form fields after successful insertion
      setServiceName("");
      setSelectedServiceCategory(""); // Clear selected category
      setService([
        { subServiceId: "1", subServiceName: "", price: "", unit: "" },
      ]);
      router.push("/admin/services");
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return (
    <div className="bg-[#f3f4f6] w-screen h-screen ">
      <AdminNavbar4
        title1={navbarTitle1}
        title2={navbarServiceName}
        buttonTitle1={buttonText1}
        buttonTitle2={buttonText2}
        backButtonClick={backToServiceLists}
        button1Click={handleCancelCreateService}
        button2Click={handleSubmit}
      />
      <AdminSideBar />
      <AdminEditServiceForm
        onServiceNameChange={handleServiceNameChange}
        onSelectedServiceCategoryChange={handleSelectedServiceCategoryChange}
        onSubServiceChange={handleSubServiceChange}
        onImageChange={handleImage}
        onImageFileChange={handleImageFile}
        serviceNameProps={serviceName}
        selectedServiceCategoryProps={selectedServiceCategory}
        imageProps={image}
        imageFileProps={imageFile}
        serviceCategoryProps={serviceCategory}
        subServiceProps={subService}
        onSubmits={(event) => handleSubmit(event)}
        createdAtProps={createdAt}
        updatedAtProps={updatedAt}
      />
    </div>
  );
};
export default Page;
