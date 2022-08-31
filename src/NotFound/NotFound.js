import React from "react";
import "./not-found.scss";
import bg from './img/money-bg.jpg'

export default function NotFound(){
    return(
        <section className="section-full">
        <div className="bg-wrapp">
          <img className="bg-full" src={bg} alt="" />
        </div>
        <div className="not-found-wrapp">
          <h1>Sorry...</h1>
          <h4>Not found the page...</h4>
        </div>
      </section>
    )
}