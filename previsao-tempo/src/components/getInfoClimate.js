export const getInfoClimate = (apiData) => ({ // Referência principal para informar as menores.
    name: apiData.name,
    temp: apiData.main.temp,
    temp_max: apiData.main.temp_max,
    temp_min: apiData.main.temp_min,
    feels_like: apiData.main.feels_like,
    description: apiData.weather[0].description,
    humidity: apiData.main.humidity,
    pressure: apiData.main.pressure,
    icon: apiData.weather[0].icon,
});

