
var cityName='Austin';
var myKey = 'd4fc14d68eb9260ec0dff594bc8fbb5d';

// get latitude and longitude for the city 
var apiUrl = `https://api.openweathermap.org/data/2.5/weather/?q=${cityName}&appid=${myKey}&units=imperial`;


fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            // get the latitude and longitude of the city that the user input
            var lat = data.coord.lat;
            var long = data.coord.lon;
            // pass the data into the new api to get weather for the city
            weather(data);
            console.log(lat,long)

           
            
          
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
    console.log(weatherUrl)
    fetch(weatherUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
            // displayWeather(data);
            console.log(data)
            console.log(data.main.temp);
            console.log(data.main.humidity)
            console.log(data.wind.speed)
            
        });
        } else {
        alert('Error: City Not Found');
        }
    })
};

var displayWeather = function(daily){
    
    for(var i = 0; i<data.daily; i++)
    
}


