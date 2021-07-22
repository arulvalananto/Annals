import React from "react";
import "./Landing.style.scss";

// Other Components
import Header from "../../components/Header/Header.component";

const Landing = () => {
  return (
    <div className='landing'>
      <Header />
      <div className='landing__container'>
        <div className='landing__start'>
          <h1 className='landing__startTitle'>Ensures</h1>
          <h1 className='landing__startSubtitle'>Your Safety</h1>
          <p className='landing__startContent'>
            Annals respect your privacy and keep it in a top-secret manner
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
