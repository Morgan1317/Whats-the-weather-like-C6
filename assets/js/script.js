
var myKey = 'd4fc14d68eb9260ec0dff594bc8fbb5d';
var cityName = '';
$('#searchBtn').on('click',function(){
    cityName = $('#input').val();
    

    // get latitude and longitude for the city 
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather/?q=${cityName}&appid=${myKey}&units=imperial`;

    fetch(apiUrl)
        .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass the data into the new api to get weather for the city
                weather(data);
                
            });
        } else {
            alert('Error: City Not Found');
        }
        
        })
        storageSave(cityName);


});

var storageSave = function(){
                
    userArray = JSON.parse(localStorage.getItem('input'));
    if(!userArray){
        userArray = [];
    };
    userArray.push(cityName);
    localStorage.setItem('input',JSON.stringify(userArray));
}
var loadInputs = function() {
    userArray = JSON.parse(localStorage.getItem("input"));
    // if there is no user input yet, set to empty string
    if(!userArray){
        userArray = [];
    };
};
var weather = function(data){

    // get the latitude and longitude of the city that the user input
    var lat = data.coord.lat;
    var long = data.coord.lon;
    var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&&appid=${myKey}&units=imperial`;
    
    // get weather data for the city
   
    fetch(weatherUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
          
           tempArray = [];
           humArray =[]; 
           windArray = []; 
           iconArray = []; 
            for (var i = 0; i<5; i++){
                dailyTemp = data.daily[i].temp.day;
                tempArray.push(dailyTemp);

                dailyHum = data.daily[i].humidity;
                humArray.push(dailyHum);

                dailyWind = data.daily[i].wind_speed;
                windArray.push(dailyWind);

                dailyIcon = data.daily[i].weather[0].icon
                iconArray.push(dailyIcon)
            }

            currentIcon = data.current.weather[0].icon;
            currentTemp = data.current.temp; 
            currentHum = data.current.humidity; 
            currentWind = data.current.wind_speed; 
            currentUvi = data.current.uvi;
            length = data.daily.length; 
            displayCurrent(data);
            displayWeather(data);
            // console.log(currentIcon)
            //console.log(data)
            
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
    var title = $('<h2>')
    var img = document.createElement("img");
    img.src =`https://openweathermap.org/img/w/${currentIcon}.png`
   
    $('#currentDay').append(title);
    $('#currentDay').append(ulEl);

    $(ulEl).attr('style','list-style:none')

    // $(ulEl).append(image);
    $(ulEl).append(li1,li2,li3,li4);
    
    $(title).text(currentDate)
    $(title).append(img);
    $(li1).text('Temp: ' + currentTemp + ' ℉');
    $(li2).text('Wind: '+ currentWind + ' MPH');
    $(li3).text('Humidity: ' + currentHum + ' %');
    $(li4).text('UV index: '+ currentUvi);
    if (currentUvi < 2){
        $(li4).addClass('low')
    } else if (3 <= currentUvi <= 5){
        $(li4).addClass('moderate')
    } else if (6 <= currentUvi <=7){
        $(li4).addClass('high')
    } else if (8 <= currentUvi <= 10){
        $(li4).addClass('very-high')
    } else {
        $(li4).addClass('extreme')
    }
    console.log(currentUvi)
 
};
// display the  data 

var displayWeather = function(data){
    
    // run through the daily outputs for the city 
    for(var i = 0; i < 5; i++){
        nextDays = new Date() ;
        nextDays.setDate(nextDays.getDate()+1+i);
        
        var formatDates = nextDays.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"numeric", day:"numeric"})
    
        var divEl = $('<div>');
        $(divEl).addClass('col-2')
        $('#forcast').append(divEl);
        var p1 = $('<p>');
        var p2 = $('<p>');
        var p3 = $('<p>');
        var p4 = $('<p>');
        var p5 = $('<p>');
        var img = document.createElement("img");
        img.src =`https://openweathermap.org/img/w/${iconArray[i]}.png`
        $(divEl).append(p5, p4, p1, p2, p3);

        $(p4).append(img);
        $(p1).text('Temp: ' + tempArray[i] + ' ℉');
        $(p3).text('Humidity: ' + humArray[i] + ' %');
        $(p2).text('Wind: '+ windArray[i] + ' MPH');
        $(p5).text(formatDates);

        $(p5).attr('style','font-weight:bold')
      
    }

};
 

