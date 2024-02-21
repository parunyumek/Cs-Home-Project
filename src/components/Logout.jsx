"use client";

import handleLogout from "@/app/login/actions";

const Logout = () => {
  return (
    <div className=" fixed flex flex-row  justify-start mt-3">
      {/* <img src="/assets/icons/logout.svg" className="ml-5 mr-5" /> */}
      <button onClick={() => handleLogout()} className="">
        ออกจากระบบ
      </button>
    </div>
  );
};

export default Logout;
