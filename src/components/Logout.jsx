"use client";

import handleLogout from "@/app/login/actions";

const Logout = () => {
  return (
    <div className="  flex flex-row items-center ">
      <img src="/assets/icons/logout.svg" className=" mr-5 ml-6 h-6" />
      <button onClick={() => handleLogout()}>
        ออกจากระบบ
      </button>
    </div>
  );
};

export default Logout;
