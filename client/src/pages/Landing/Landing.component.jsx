import React from "react";
import "./Landing.style.scss";
import Journals from "../../assets/journals.svg";
import Ideas from "../../assets/ideas.svg";
import Passwords from "../../assets/passwords.svg";
import Tasks from "../../assets/tasks.svg";

// Other Components
import Header from "../../components/Header/Header.component";

const Landing = () => {
  return (
    <div className="landing">
      <Header />
      <main className="landing__container">
        <div className="landing__start">
          <h1 className="landing__startTitle">Ensures</h1>
          <h1 className="landing__startSubtitle">Your Safety</h1>
          {/* <p className="landing__startContent">
            Annals respect your privacy and keep it in a top-secret manner
          </p> */}
        </div>
      </main>
      <section className="features">
        <div className="feature">
          <img className="feature__icon" src={Tasks} alt="tasks" />
          <h3 className="feature__title">Tasks</h3>
          <p className="feature__subtitle">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            vitae et repellat exercitationem alias voluptatibus magni illo
            minima dolore enim, recusandae quia odit odio quis reprehenderit
            culpa beatae inventore facere?
          </p>
        </div>
        <div className="feature">
          <img className="feature__icon" src={Journals} alt="journals" />
          <h3 className="feature__title">Journals</h3>
          <p className="feature__subtitle">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            vitae et repellat exercitationem alias voluptatibus magni illo
            minima dolore enim, recusandae quia odit odio quis reprehenderit
            culpa beatae inventore facere?
          </p>
        </div>
        <div className="feature">
          <img className="feature__icon" src={Passwords} alt="passwords" />
          <h3 className="feature__title">Passwords</h3>
          <p className="feature__subtitle">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            vitae et repellat exercitationem alias voluptatibus magni illo
            minima dolore enim, recusandae quia odit odio quis reprehenderit
            culpa beatae inventore facere?
          </p>
        </div>
        <div className="feature">
          <img className="feature__icon" src={Ideas} alt="ideas" />
          <h3 className="feature__title">Ideas</h3>
          <p className="feature__subtitle">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            vitae et repellat exercitationem alias voluptatibus magni illo
            minima dolore enim, recusandae quia odit odio quis reprehenderit
            culpa beatae inventore facere?
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
