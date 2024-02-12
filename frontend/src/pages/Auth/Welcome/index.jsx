import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { IoMdLogIn } from "react-icons/io";
import heroImage from "../../../assets/hero-image.png";
import { IoMdArrowForward } from "react-icons/io";

const Welcome = () => {
  return (
    <div className="bg-black w-screen h-screen flex flex-col gap-3 p-5 rounded overflow-auto">
      <div className="bg-[#CCCCFE] w-full h-full rounded-xl">
        <div className="flex items-center justify-between p-5 md:px-10 relative">
          <img
            src={logo}
            alt="Annals Logo"
            className="w-12 h-12 md:w-24 md:h-24 object-contain"
          />
          <div className="font-poppins">
            <Link
              to="/sign-in"
              className="uppercase bg-black text-[#C4FF59] px-4 md:px-10 py-2 rounded-full flex items-center gap-4"
            >
              <IoMdLogIn className="text-md md:text-lg" />
              <span className="text-xs md:text-lg ">Sign In</span>
            </Link>
          </div>
        </div>
        <div className="md:px-20 flex flex-col md:flex-row items-center md:gap-10 justify-center">
          <div className="w-[250px] h-[250px] md:w-[750px] md:h-[750px]">
            <img
              src={heroImage}
              alt="hero"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-10 items-start">
            <p className="text-md md:text-xl font-semibold font-rampart">
              [All-in-one Personal Space]
            </p>
            <h1 className="text-2xl md:text-6xl font-bold flex flex-col font-poppins">
              <span>Start spend</span>
              <span>time with Annals</span>
            </h1>
            <div>
              <Link
                to="/sign-in"
                className="uppercase bg-[#C4FF59] text-black px-4 md:px-10 py-2 text-lg rounded-full flex items-center gap-4"
              >
                <span className="font-poppins text-xs md:text-lg ">
                  Get Started
                </span>
                <IoMdArrowForward className="-rotate-45 text-md md:text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
