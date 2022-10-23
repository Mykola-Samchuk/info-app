import React from "react";
import "./war-list.scss";


export default function WarList(props) {

 //  Combine props to []
  let item = [];

  const combineProps = () => {
    const warStats = props.statistic;
    const warTitle = props.title;
    for (let key in warTitle) {
      item.push({
        ["title"]: warTitle[key].title,
        ["id"]: key,
        ["icon"]: warTitle[key].icon,
      });
    }
    item.forEach((el) => {
      for (let key in warStats) {
        if (el.id === key) {
          el["count"] = warStats[key];
        }
      }
    });
  };
  combineProps();

 // return combine props to list
  return (
    <>
      {item.map((item) => {
        return (
          <li className="war-item" key={item.title}>
            <div className="war-list-wrapp">
              <img src={item.icon} alt="icon" />
              <h3 className="war-list-title">{item.title}</h3>
            </div>
            <h2 className="war-list-count">{item.count}</h2>
          </li>
        );
      })}
    </>
  );
}
