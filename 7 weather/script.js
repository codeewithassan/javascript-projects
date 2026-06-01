let lat = document.querySelector('#lat');
let lon = document.querySelector('#lon');
let submit = document.querySelector('#submit');
let dropdowns = document.querySelector('#dropdowns');
let heading = document.querySelector('#main-heading');
const formatTime = () => {    
    const dateObj = new Date();
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
}

const getApi = async (lat, lon) => {

    const url = `https://api.api-ninjas.com/v1/weatherforecast?lat=${lat}&lon=${lon}`;
    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': CONFIG.API_KEY,
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }

}
const getCityName = async (lat, lon) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.city || data.locality || "Unknown City";
    } catch (e) {
        return "Unknown City";
    }
};

const getWeather = async (lat, lon) => {

    const cityName = await getCityName(lat, lon);
    heading.innerText = `Weather of ${cityName}`;
    const result = await getApi(lat, lon);

    if (result && result.length > 0) {
        cloud_pct.innerText = result[0].cloud_pct + "%";
        feels_like.innerText = result[0].feels_like + "°C";
        humidity.innerText = result[0].humidity + "%";
        humidity2.innerText = result[0].humidity + "%";
        max_temp.innerText = result[0].max_temp + "°C"; 
        min_temp.innerText = result[0].min_temp + "°C"; 
        temp.innerText = result[0].temp + "°C"; 
        const finalTime = formatTime(result[0]);
        timestamp.innerText = finalTime;
        weather.innerText = result[0].weather 
        wind_degrees.innerText = result[0].wind_degrees + "°" 
        wind_speed.innerText = result[0].wind_speed + " km/h"; 
        wind_speed2.innerText = result[0].wind_speed + " km/h"; 
    }
}
const fetchAndPopulateRow = async (row) => {
    let lat = row.dataset.lat;
    let lon = row.dataset.lon;
    try {
        const result = await getApi(lat, lon);
        const data = result[0];
        row.querySelector('.cloud_pct').textContent = data.cloud_pct + "%";
        row.querySelector('.feels_like').textContent = data.feels_like + "°C";
        row.querySelector('.humidity').textContent = data.humidity + "%";
        row.querySelector('.max_temp').textContent = data.max_temp + "°C";
        row.querySelector('.min_temp').textContent = data.min_temp + "°C";
        row.querySelector('.temp').textContent = data.temp + "°C";
        row.querySelector('.weather').textContent = data.weather;
        row.querySelector('.wind_degrees').textContent = data.wind_degrees + "°";
        row.querySelector('.wind_speed').textContent = data.wind_speed + " km/h";
        const finalTime = formatTime(data)
        row.querySelector('.timestamp').textContent = finalTime;
    } catch (error) {
        console.log(`Error populating data for row ${row.id}:`, error);
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(lat.value, lon.value);
})

dropdowns.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('dropdown-item')) {
        const id = evt.target.id;
        // console.log(id);
        const lat = evt.target.dataset.lat;
        const lon = evt.target.dataset.lon;
        // console.log(lat, lon);


        getWeather(lat, lon);
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const allCityRows = document.querySelectorAll('.city-row');
    allCityRows.forEach((row) => {
        fetchAndPopulateRow(row)
    });
});
const usageLink = document.getElementById('usageLink');
const usageModal = document.getElementById('usageModal');
const closeModal = document.querySelector('.close-modal');

usageLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    usageModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    usageModal.style.display = 'none';
});

window.addEventListener('click', (evt) => {
    if (evt.target === usageModal) {
        usageModal.style.display = 'none';
    }
});