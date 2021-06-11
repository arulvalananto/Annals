import React from "react";
import "./Landing.scss";
// Image
import LandingCover from "../../assets/landing__cover.jpg";

// Other Components
import Header from "../../components/Header/Header";

const Landing = (props) => {
    return (
        <div className="landing">
            <Header />
            <div className="landing__body">
                <div className="landing__bodyLeft">
                    <h1 className="landing__bodyTitle">
                        Create your professional diary with us
                    </h1>
                    <p className="landing__bodySubtitle">
                        Write your daily memories. Check and share them anytime.
                    </p>
                </div>
                <div className="landing__bodyRight">
                    <div className="landing__bodyImageContainer">
                        <img
                            src={LandingCover}
                            alt="Annals Landing Cover"
                            className="landing__bodyImage"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
