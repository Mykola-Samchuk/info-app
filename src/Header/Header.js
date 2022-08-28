import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./header.scss";
import Weather from "../Weather/Weather";
import War from "../War/War";
// import Сurrency from "../Сurrency/Сurrency";
import Currency from "../Currency/Сurrency";
import { useState } from "react";
import { useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // add background to header on scroll 
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else setScrolled(false);
  });
  
  return (
    <>
      <header className={`header-wrapp ${scrolled ? "scrolled" : ""}`}>
        <nav>
          <ul className="header-nav">
            <li className="nav-wrapp-link">
              <Link className="nav-link" to="/">
                Weather
              </Link>
            </li>
            <li className="nav-wrapp-link">
              <Link className="nav-link" to="/war">
                War Info
              </Link>
            </li>
            <li className="nav-wrapp-link">
              <Link className="nav-link" to="/currency">
                Сurrency
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes basename="/info-app">
        <Route path="/info-app" element={<Weather />} />
        <Route path="/info-app/war" element={<War />} />
        <Route path="/info-app/currency" element={<Currency/>} />
      </Routes>
    </>
  );
}
