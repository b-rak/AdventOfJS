export const getWeatherData = async () => {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=50.93&longitude=6.95&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto"
    const response = await fetch(url)
    const data = await response.json()
    let dataObj = {}
    dataObj.daily = []
    for (const [index, date] of data.daily.time.entries()) {
        dataObj.daily.push({
            time: date,
            weathercode: data.daily.weathercode[index],
            max_temp: data.daily.temperature_2m_max[index],
            min_temp: data.daily.temperature_2m_min[index],
            precipitation: data.daily.precipitation_sum[index]
        })
    }
    return dataObj
}