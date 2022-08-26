import React, { useEffect, useState } from "react";
import "./war.scss";
import bg from "./img/1439925.jpg";
import WarList from "./WarList/WarList";

export default function War() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [warTitle, setWarTitle] = useState([]);

  // get Date
  const date = new Date().toLocaleDateString();
  const dateFormat = `${date[0] + date[1]}.${date[3] + date[4]}.${
    date[8] + date[9]
  }`;

  // Get API war statistics
  useEffect(() => {
    fetch(`https://russianwarship.rip/api/v1/statistics/latest`)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItems(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // Get API military equipment title in ua
  useEffect(() => {
    fetch(`https://russianwarship.rip/api/v1/terms/ua`)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setWarTitle(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <section className="section-full">
        <div className="bg-wrapp">
          <img className="bg-full" src={bg} alt="" />
        </div>
        <div className="war-wrapp">
          <h3>Error: {error.message}</h3>
        </div>
      </section>
    );
  } else if (!isLoaded) {
    return (
      <section className="section-full">
        <div className="bg-wrapp">
          <img className="bg-full" src={bg} alt="" />
        </div>
        <div className="war-wrapp">
          <h1>Loading...</h1>
          <h4>Слава ЗСУ...</h4>
        </div>
      </section>
    );
  } else {
    return (
      <section className="section-full">
        <div className="bg-wrapp">
          <img className="bg-full" src={bg} alt="" />
        </div>
        <div className="war-wrapp">
          <div className="war-title-wrapp">
            <h5>{dateFormat}</h5>
            <h1 className="war-title">Загальні бойові втрати окупанта.</h1>
            <div className="day-wrapp">
              <h6>
                {`Станом на ${items.data?.date[8] + items.data?.date[9]}.${
                  items.data?.date[5] + items.data?.date[6]
                }.${
                  items.data?.date[0] +
                  items.data?.date[1] +
                  items.data?.date[2] +
                  items.data?.date[3]
                }`}
              </h6>
              <h6>{items.data?.day} день війни.</h6>
            </div>
          </div>
          <ul className="war-info">
            {/*Add war statistic list */}
            <WarList statistic={items.data?.stats} title={warTitle.data} />
          </ul>
        </div>
      </section>
    );
  }
}
