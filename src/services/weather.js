export async function getCurrentWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${
        import.meta.env.VITE_OPEN_WEATHER_MAP_ACCESS_KEY
      }&q=${location}&units=metric`,
    );
    const data = await response.json();
    if (data.cod === '404') {
      return Promise.reject(data);
    } else {
      return Promise.resolve(data);
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function getWeatherForecastData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${
        import.meta.env.VITE_OPEN_WEATHER_MAP_ACCESS_KEY
      }&q=${location}&units=metric&cnt=5`,
    );
    const data = await response.json();
    if (data.cod === '404') {
      return Promise.reject(data);
    } else {
      return Promise.resolve(data);
    }
  } catch (e) {
    return Promise.reject(e);
  }
}
