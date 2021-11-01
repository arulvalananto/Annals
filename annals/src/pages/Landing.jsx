import React from "react";
import { Link } from "react-router-dom";
import { Menu, ArrowDownward, ArrowRightAlt } from "@mui/icons-material";

import logo from "../assets/logo.png";
import Button from "../components/Button";
import Drawer from "../components/Drawer";

const Landing = () => {
  return (
    <div className="w-5/6 m-auto font-poppins">
      <nav className="flex justify-between items-center mt-5">
        <img
          src={logo}
          alt="Annals Logo"
          className="w-14 h-14 object-contain"
        />
        <div className="lg:block hidden">
          <div className="flex items-center justify-center  ">
            <Link to="/sign-in">
              <Button
                title="Sign In"
                type="button"
                className="bg-primary mr-4 text-white"
              />
            </Link>
            <Link to="/sign-up">
              <Button title="Sign Up" type="button" />
            </Link>
          </div>
        </div>
        <div className="p-2 shadow rounded hover:opacity-90 block lg:hidden">
          <Drawer Icon={Menu}>
            <div className="p-3 flex flex-col w-48 font-poppins">
              <Link to="/sign-in" className="p-5 font-bold">
                Sign In <ArrowRightAlt />
              </Link>
              <Link to="/sign-up" className="p-5 font-bold">
                Sign Up <ArrowRightAlt />
              </Link>
            </div>
          </Drawer>
        </div>
      </nav>
      <main>
        <section className="mt-40 mb-20 font-bold text-center" id="showcase">
          <h1 className="lg:text-6xl text-3xl text-tertiary mb-4">Ensures</h1>
          <p className="lg:text-8xl text-6xl">Your Safety</p>
        </section>
        <div className="w-full text-center mt-40">
          <ArrowDownward fontSize="large" className="animate-bounce w-6 h-6" />
        </div>
        <section
          id="features"
          className="flex flex-col xl:flex-row items-center justify-between mt-80"
        >
          <div className="xl:mr-4 mb-4">
            <h1 className="font-bold text-2xl">Tasks</h1>
            <p className="mt-3 break-all">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              repellendus veniam perspiciatis atque vel eveniet ea suscipit.
              Doloremque, accusamus, consequatur voluptatibus voluptate quas
              quos impedit obcaecati, aperiam a quae quia!
            </p>
          </div>
          <div className="xl:mr-4 mb-4">
            <h1 className="font-bold text-2xl">Journals</h1>
            <p className="mt-3 break-all">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              repellendus veniam perspiciatis atque vel eveniet ea suscipit.
              Doloremque, accusamus, consequatur voluptatibus voluptate quas
              quos impedit obcaecati, aperiam a quae quia!
            </p>
          </div>
          <div className="xl:mr-4 mb-4">
            <h1 className="font-bold text-2xl">Passwords</h1>
            <p className="mt-3 break-all">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              repellendus veniam perspiciatis atque vel eveniet ea suscipit.
              Doloremque, accusamus, consequatur voluptatibus voluptate quas
              quos impedit obcaecati, aperiam a quae quia!
            </p>
          </div>
          <div className="xl:mr-4">
            <h1 className="font-bold text-2xl">Ideas</h1>
            <p className="mt-3 break-all">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              repellendus veniam perspiciatis atque vel eveniet ea suscipit.
              Doloremque, accusamus, consequatur voluptatibus voluptate quas
              quos impedit obcaecati, aperiam a quae quia!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
