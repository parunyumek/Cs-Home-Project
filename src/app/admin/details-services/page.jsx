"use client";
import AdminSideBar from "@/components/AdminSidebar";
import AdminNavbar3 from "@/components/AdminNavbar3";
import AdminServiceDetails from "@/components/AdminServiceDetails";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const buttonText = "แก้ไข";
  const title = "บริการ";
  const backToServiceLists = "/admin/services";

  const router = useRouter();

  const handleEditButton = (service) => {
    router.push(`/admin/edit-services?id=${id}`);
  };

  return (
    <div className="bg-[#f3f4f6] w-screen h-screen ">
      <AdminNavbar3
        buttonTitle1={buttonText}
        title1={title}
        title2={serviceName}
        backButtonClick={backToServiceLists}
        button2Click={handleEditButton}
      />
      <AdminSideBar />
      <AdminServiceDetails setServiceName={setServiceName} />
    </div>
  );
};

export default Page;
