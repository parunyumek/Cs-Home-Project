"use client";
import AdminNavbar3 from "@/components/AdminNavbar3";
import AdminSideBar from "@/components/AdminSidebar";
import { createClient } from "@/supabase/client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const [promotionData, setPromotionData] = useState([]);
  
  const router = useRouter()
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const navbarTitle = "Promotion Code";
  const navbarTitle2 = " Code";
  const editPromotion = "แก้ไข";
  const linkToPromotionPage = "/admin/promotions";
  const supabase = createClient();
  

  const handleLinkToEditPage = () => {
    router.push(`/admin/promotions/edit-promotion?id=${id}`)
  }

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("promotions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("get promotion", error);
      return;
    }
    setPromotionData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const time = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
    return `${day}/${month}/${year} ${time}`;
  }

  console.log(promotionData);

  return (
    <div>
      <AdminNavbar3
        title1={navbarTitle}
        title2={navbarTitle2}
        buttonTitle1={editPromotion}
        button2Click={handleLinkToEditPage}
        backButtonClick={linkToPromotionPage}
      />
      <AdminSideBar />
      <div className="flex flex-col fixed left-[280px] top-[150px] w-[1570px]">
        
      </div>
    </div>
  );
};

export default page;
