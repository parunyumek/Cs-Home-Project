"use client";

import handleLogout from "@/app/login/actions";

const Logout = (props) => {
  const userData = props.userData;
  return (
    <div className="flex items-center">
      <p className="mr-3">{userData?.fullname}</p>
      <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:cursor-pointer">
        <img onClick={() => handleLogout()} src="/assets/icons/icon-user.png" />
      </div>
    </div>
  );
};

export default Logout;
