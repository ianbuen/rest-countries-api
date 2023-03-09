import { BsMoon } from "react-icons/bs";

export const Navbar = () => {
  return (
    <nav className="flex justify-between px-5 py-10">
      <h1 className="font-bold text-lg">Where in the world?</h1>
      
      <button className="flex items-center font-semibold">
        <BsMoon className="mr-1"/>
        Dark Mode
      </button>

    </nav>
  );
};

export default Navbar;
