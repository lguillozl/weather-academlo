import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState('');
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState('');

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  const API_KEY = '2f571130950cf8173adfbf44cce43ece';

  const fetchWeather = async () => {
    try {
      window.navigator.geolocation.getCurrentPosition(savePositionToState);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setTemperature(res.data.main.temp);
      setCityName(res.data.name);
      setCountry(res.data.sys.country);
      setWeather(res.data.weather[0].main);
      setHumidity(res.data.main.humidity);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  const handleFerenheit = () => {
    setTemperature((temperature * 9 / 5) + 32);
  }

  const handleCelsius = () => {
    setTemperature((temperature - 32) * 5 / 9);
  }

  return (
    <div className="app">
      <div className="app__container">
        <h1 className='app__title'>Weather App</h1>
        <div className="app__cityname">
          {cityName}, {country}
        </div>
        {
          weather === 'Clear' ? <i className="fas fa-sun"></i> : <i class="fas fa-cloud-rain"></i>
        }
        <h2 className='app__temperature'>Temperature</h2>
        <p className='app__grades'>
          {Math.trunc(temperature)}
          {temperature < 50 ? '°C' : '°F'}
        </p>
        <h2 className='weather'>Weather</h2>
        <p className='weather__type'>{weather}</p>
        <h2 className='humidity'>Humidity</h2>
        <p className='humidity__percentage'>{humidity}%</p>
        {
          temperature < 50
            ? <button onClick={handleFerenheit}>Change to Farenheit</button>
            : <button onClick={handleCelsius}>Change to Celsius</button>
        }
      </div>
    </div >
  );
}

export default App;
