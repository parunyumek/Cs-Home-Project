"use client";

import handleLogout from "@/app/login/actions";

const Logout = () => {
  return (
    <div className=" fixed flex flex-row  justify-start mt-3">
      <button onClick={() => handleLogout()} className="">
        {/* ออกจากระบบ */}
      </button>
    </div>
  );
};

export default Logout;
