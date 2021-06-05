import "./App.css";
import { useState, useEffect } from "react";

const url = "http://api.openweathermap.org/data/2.5/weather";
const iconUrl = " http://openweathermap.org/img/wn/";
const API_KEY = "fe60276f92ce78ccdeca6124cbc796fe";
function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const handleChange = (city) => {
    setCity(city);
  };
  const fetchWeather = () => {
    fetch(`${url}?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          console.log(data);
          setData(data);
        } else {
          alert(data.message);
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error, "wrong city name"));
  };

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div>
      <div className="container-fluid App-header py-2">
        <div className="row">
          <div className="col">
            <h1>My Weather App</h1>
          </div>
          <div className="col d-flex flex-row align-items-center">
            <input
              type="text"
              className="form-group"
              value={city}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button className="btn btn-primary btn-sm" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {data ? (
          <div className="row mt-4">
            <div className="col">
              <h4>
                Weather forecast for {data.name}, {data.sys.country}
              </h4>
              <img src={iconUrl + data.weather[0].icon + "@2x.png"} alt="" />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col">
              <p>Pleas ener the city name</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
