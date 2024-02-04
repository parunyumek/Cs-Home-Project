"use client";

import handleLogout from "@/app/login/actions";

const Logout = () => {
  return <button onClick={() => handleLogout()}>Logout</button>;
};

export default Logout;
