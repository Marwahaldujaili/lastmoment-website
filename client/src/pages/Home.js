import React from "react";
import "../styles/Home.scss";
import homeImg from "../assets/images/home.png";

function Home() {
  return (
    <div className="home-container">
      <img src={homeImg} alt="Last Moment" /> <p>Until The Last Moment...</p>
    </div>
  );
}

export default Home;
