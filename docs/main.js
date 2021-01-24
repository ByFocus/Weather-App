const api = {
    key: "ce13c3bc2b7972a0a39206c9ea9d9410",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);

var unidades = 'ºC'

var stateGrades = false;

  function farenheitFunc(){
    celsius = 'imperial';
    unidades = 'ºF'
    getResults(searchbox.value);
    stateGrades = true;
    console.log(stateGrades);
    if(stateGrades === true){

      selectButton.innerHTML = '<button class="btn" onclick="celsiusFunc()">ºC</button>';
      celsius = 'metric'; 
  }
  }

  function celsiusFunc(){
    celsius = 'metric';
    unidades = 'ºC'
    getResults(searchbox.value);
    stateGrades = false;
    if(stateGrades === false){

      selectButton.innerHTML = '<button class="btn" onclick="farenheitFunc()">ºF</button>';
     console.log('imperial');

}
  }

  const selectButton = document.querySelector('.farenheit');

  

  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
      celsiusFunc();
    }
  }
  
  var celsius = 'metric';

  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=${celsius}&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }


  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    

    switch(weather.sys.country){
      case undefined:
        weather.sys.country = '';
        city.innerText = `${weather.name}`;
        
        break

        
    }
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} ${unidades} `;
  
    let weather_el = document.querySelector('.current .weather');

    let currentWeather = 'Aqui va el tiempo actual';

    var weatherState = 'unknown';

    
    
    let locationIcon = document.querySelector('.current .locationIcon');

    switch(weather.weather[0].main){
      case 'Clouds': 
        currentWeather = 'Nublado';
        weatherState = '02d';
      break;
      case 'Rain':
        currentWeather = 'Lluvia';
        weatherState = 'chancerain';
        break;
      case 'Clear':
          currentWeather = 'Despejado';
          weatherState = 'clear';
          break;
      case 'Snow':
        currentWeather = 'Nevado';
        weatherState = 'snow';
        break;
      default: currentWeather = weather.weather[0].main; //weather.weather[0].main; 
    }
    console.log(weatherState);  
    var icon = ("<img src='assets/js/icons/" + weatherState + ".png'>");
    weather_el.innerText = currentWeather;
    locationIcon.innerHTML = icon;
    
    
    
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `Mínima Temp ${Math.round(weather.main.temp_min)}${unidades} / Máxima Temp ${Math.round(weather.main.temp_max)}${unidades}`;
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var clockDiv = document.querySelector('.location .hour');
    switch(minutes){
      case 1:
        minutes = '0'+minutes;
        break;
      case 2:
        minutes = '0'+minutes;
        break;
      case 3:
        minutes = '0'+minutes;
        break;
      case 4:
        minutes = '0'+minutes;
        break;
      case 5:
        minutes = '0'+minutes; //esto suma un '0' detrás del minuto si el minuto es solo un digito
        break;
      case 6:
        minutes = '0'+minutes; 
        break;
      case 7:
        minutes = '0'+minutes;
        break;
      case 8:
        minutes = '0'+minutes;
        break;
      case 9:
        minutes = '0'+minutes;
        break;
      
    }
    clockDiv.innerText = (hours + ":" + minutes);

    //background
    if(hours < 8){
      document.body.style.backgroundImage = "url('assets/js/night.jpg')";
    }
    if(hours < 12){
      document.body.style.backgroundImage = "url('assets/js/sunset.jpg')";
    }
    if(hours > 12){
      document.body.style.backgroundImage = "url('assets/js/day.jpg')";
    }
    if(hours > 18){
      document.body.style.backgroundImage = "url('assets/js/bg.jpg')";
    }

    if(hours > 23){
      document.body.style.backgroundImage = "url('assets/js/night.jpg')";
    }
  }

  function dateBuilder (d) {
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
  
    return `${day} ${date} ${month} ${year}`;
  }

    