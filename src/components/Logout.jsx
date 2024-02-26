"use client";

import handleLogout from "@/app/login/actions";

const Logout = () => {
  return (
    <div className=" fixed flex flex-row  justify-start mt-3 mr-16">
      <img
        src="/assets/icons/sidebar-logout-icon.svg"
        alt="service-icon"
        className=" w-[16px] h-[16px] mr-4 mt-1 "
      />
      <button onClick={() => handleLogout()} className="">
        ออกจากระบบ
      </button>
    </div>
  );
};

export default Logout;
