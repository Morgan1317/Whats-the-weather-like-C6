
var cityName='Austin';
var myKey = 'd4fc14d68eb9260ec0dff594bc8fbb5d';

// get latitude and longitude for the city 
var apiUrl = `https://api.openweathermap.org/data/2.5/weather/?q=${cityName}&appid=${myKey}&units=imperial`;


fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
            // get the latitude and longitude of the city that the user input
            var lat = data.coord.lat;
            var long = data.coord.lon;
            // pass the data into the new api to get weather for the city
            weather(data);
            
            

           
            
          
        });
      } else {
        alert('Error: City Not Found');
      }
     
    })

;

var weather = function(data){
    var lat = data.coord.lat;
    var long = data.coord.lon;
    var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&&appid=${myKey}&units=imperial`;
    

    // get weather data for the city
   
    fetch(weatherUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
           
            // dailyDate = data.
            dailyTemp = data.daily[0].temp;
            dailyHum = data.daily[0].humidity;
            dailyWind = data.daily[0].wind_speed;
            currentTemp = data.current.temp; 
            currentHum = data.current.humidity; 
            currentWind = data.current.wind_speed; 
            currentUvi = data.current.uvi; 
            console.log(currentWind);
            displayCurrent(data);

            // displayWeather(data);
        });
        } else {
        alert('Error: City Not Found');
        }
    })
};

var displayCurrent = function(current){
    // get current date
    var currentDate = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"numeric", day:"numeric"}) ;
      
    var ulEl = $('<ul>');
    var li1 = $('<li>');
    var li2 = $('<li>');
    var li3 = $('<li>');
    var li4 = $('<li>');

    $('#currentDay').append(ulEl);
    $(ulEl).attr('style','list-style:none')
    $(ulEl).text(currentDate);
    $(ulEl).append(li1,li2,li3,li4);
    
    $(li1).text('Temp: ' + currentTemp + ' ℉');
    $(li2).text('Wind: '+ currentWind + ' MPH');
    $(li3).text('Humidity: ' + currentHum + ' %');
    $(li4).text('UV index: '+ currentUvi);
};
// display the  data 
var displayWeather = function(daily){
   
    // run through the daily outputs for the city 
    for(var i = 0; i<data.daily; i++){
        
        var dailyEl = document.createElement("p");
        
    }

}


