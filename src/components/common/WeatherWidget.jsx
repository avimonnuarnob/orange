import { useState } from 'react';
import CurrentWeather from '../weather/CurrentWeather';
import WeatherForecast from '../weather/WeatherForecast';

function WeatherWidget() {
  const [location, setLocation] = useState('');
  const [locationStateForChild, setLocationStateForChild] = useState('');

  function onSubmitHandler(e) {
    e.preventDefault();
    setLocationStateForChild(location);
  }

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input
          onChange={(e) => setLocation(e.target.value)}
          type='text'
          placeholder='Location'
        />
        <button type='submit'>Search</button>
      </form>

      <CurrentWeather location={locationStateForChild} />
      <WeatherForecast location={locationStateForChild} />
    </>
  );
}

export default WeatherWidget;
