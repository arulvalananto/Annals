import React from "react";
import "./Landing.style.scss";
// Image
import LandingCover from "../../assets/landing__cover.jpg";

// Other Components
import Header from "../../components/Header/Header.component";

const Landing = (props) => {
  return (
    <div className="landing">
      <Header />
      <div className="landing__container">
        <div className="landing__containerLeft">
          <h1 className="landing__containerLeftTitle">
            Create your professional diary with us
          </h1>
          <p className="landing__containerLeftSubtitle">
            Write your daily memories. Check and share them anytime.
          </p>
        </div>
        <div className="landing__containerRight">
          <div className="landing__containerRightImageContainer">
            <img
              src={LandingCover}
              alt="Annals Landing Cover"
              className="landing__containerRightImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
