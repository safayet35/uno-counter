import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaListUl } from "react-icons/fa6";
import { useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";
const Home = () => {
  return (
    <div className="w-full h-screen px-10 py-20 flex items-center justify-center">
      <div className="flex flex-col gap-6">
        <Link
          to="/table"
          className=" flex flex-col items-center justify-center bg-orange-500 px-10 py-3 rounded-2xl text-white font-extrabold"
        >
          <IoAdd className="text-4xl" />
          <p className="text-[18px]">Add match</p>
        </Link>
        <Link
          to="/matches"
          className="flex flex-col items-center justify-center bg-green-500 px-10 py-3 rounded-2xl text-white font-extrabold"
        >
          <FaListUl className="text-4xl" />
          <p className="text-[18px]">All matches</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
