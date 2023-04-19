document.querySelector('.find').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== '') {
        clearInfo();
        showWarning('Loading...');

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=en&appid=d06cdb298fafc83c520d5ab677fc477e`);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Location not found.');
        }
    } else {
        clearInfo();
    }
});

function showInfo(obj) {
    showWarning('');

    document.querySelector('.title').innerHTML = `${obj.name}, ${obj.country}`;
    
    document.querySelector('.weatherInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`;
    document.querySelector('.windInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;

    document.querySelector('.weather img').setAttribute('src', 
    `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    
    document.querySelector('.windPoint').style.transform = `rotate(${obj.windAngle-90}deg)`;

    document.querySelector('.result').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.result').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.notice').innerHTML = msg;
}