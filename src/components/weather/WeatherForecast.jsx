/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getWeatherForecastData } from '../../services/weather';
import OverView from './overview';

function WeatherForecast({ location }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      setLoading(true);
      getWeatherForecastData(location)
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

  useEffect(() => {}, [data]);

  return (
    <article aria-busy={loading}>
      <h2>Weather Forecast</h2>
      {error && <h3 style={{ color: '#e74c3c' }}>{error}</h3>}

      {data ? (
        <>
          <div className='grid'>
            {data.list.map((el, i) => (
              <article key={i}>
                <hgroup>
                  <h6>{el.dt_txt}</h6>
                  <small>{el.main.temp}°C</small>
                </hgroup>

                <div>
                  {el.weather.map((el, i) => (
                    <mark key={i}>{el.description}</mark>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div>
            <OverView data={data} />
          </div>
        </>
      ) : (
        <hgroup>
          <h2>No data found!</h2>
        </hgroup>
      )}
    </article>
  );
}

export default WeatherForecast;
