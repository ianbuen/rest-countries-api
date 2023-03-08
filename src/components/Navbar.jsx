import react from "react";
import Image from "next/image";
import { BsMoon } from "react-icons/bs";

export const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 py-5 shadow text-sm">
      <h1 className="font-bold">Where in the world?</h1>
      
      <button className="flex items-center">
        <BsMoon className="mr-1"/>
        Dark Mode
      </button>

    </nav>
  );
};

export default Navbar;
