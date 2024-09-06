import React from "react";
import { propsTypeSetDisplay } from "./LoginPage";

const LandingMain = ({ setDisplay }: propsTypeSetDisplay) => {
  return (
    <main className="main landing-main">
      <p className="description">
        Unlock the future of digital finance with CryptoMaster, the ultimate app
        for managing your cryptocurrency portfolio. Designed for both novices
        and experts, CryptoMaster offers real-time tracking of your assets,
        seamless transaction management, and intuitive analytics to help you
        make informed decisions.CryptoMaster transforms complex crypto
        management into a simple, efficient experience. Whether you're trading
        Bitcoin, Ethereum, or exploring altcoins, CryptoMaster is your essential
        tool for mastering the world of cryptocurrency. Create an account today
        and take control of your financial future!
      </p>
      <div className="sign-up">
        <p>
          Don't have an account yet? <br /> Create one now!
        </p>
        <button className="btn1" onClick={() => setDisplay("account")}>
          Sign Up
        </button>
      </div>
      <div className="sign-in">
        <p>
          Already have an account? <br /> Sign In Here!
        </p>
        <button className="btn1" onClick={() => setDisplay("login")}>
          Sign In
        </button>
      </div>
    </main>
  );
};

export default LandingMain;
