/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getCurrentWeatherData } from '../../services/weather';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

function CurrentWeather({ location }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      setLoading(true);
      getCurrentWeatherData(location)
        .then((data) => {
          setData(data);
          setError(null);
        })
        .catch(() => {
          setData(null);
          setError('Invalid Location');
        })
        .finally(() => setLoading(false));
    }
  }, [location]);

  return (
    <article aria-busy={loading}>
      <h2>Current Weather</h2>
      {error && <h3 style={{ color: '#e74c3c' }}>{error}</h3>}
      {data ? (
        <div className='grid'>
          <hgroup>
            <h3>{data.name}</h3>
            <h4>{regionNames.of(data.sys.country)}</h4>
          </hgroup>

          <div>
            <hgroup>
              <h3>{data.main.temp}°C</h3>
              <small>Feels like {data.main.feels_like}°C</small>
            </hgroup>

            <div>
              <small>Humidity: {data.main.humidity}%</small>
            </div>

            <div>
              {data.weather.map((el, i) => (
                <mark key={i}>{el.description}</mark>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <hgroup>
          <h2>No data found!</h2>
        </hgroup>
      )}
    </article>
  );
}

export default CurrentWeather;
