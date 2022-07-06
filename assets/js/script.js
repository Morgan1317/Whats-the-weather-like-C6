
var myKey = 'd4fc14d68eb9260ec0dff594bc8fbb5d';
var cityName = '';
// initial search is initiated based on user input

$('#searchBtn').on('click',function(){
    cityName = $('#input').val().trim().toUpperCase();
    // clear previous search results
    $('#forcast').text('');
    $('#currentDay').text('');
    $('textarea').val('');
    
    getCoord();
});
var getCoord = function(){
     
    // get latitude and longitude for the city 
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather/?q=${cityName}&appid=${myKey}&units=imperial`;

    fetch(apiUrl)
        .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass the data into the new api to get weather for the city
                weather(data);
                storageSave(cityName);
            });
        } else {
            alert('Error: City Not Found, please type in a valid city name');
        }
        
        })
    
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
         
            
        });
        } else {
        alert('Error: City Not Found');
        }
    })
};
// display current conditions
var displayCurrent = function(current){
    document.getElementById('forcast').text = '';
    
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

    $(ulEl).attr('style','list-style:none');

 
    $(ulEl).append(li1,li2,li3,li4);
    
    console.log(currentUvi)
    $(title).text(cityName + ", " + " " + currentDate);
    $(title).append(img);
    $(li1).text('Temp: ' + currentTemp + ' ℉');
    $(li2).text('Wind: '+ currentWind + ' MPH');
    $(li3).text('Humidity: ' + currentHum + ' %');
    $(li4).text('UV index: '+ currentUvi);
    debugger;
    if (currentUvi < 2){
        $(li4).addClass('low');
        $(li4).removeClass('moderate');
        $(li4).removeClass('high');
        $(li4).removeClass('very-high');
        $(li4).removeClass('extreme');
    } else if (currentUvi <5){
        $(li4).addClass('moderate');
        $(li4).removeClass('low');
        $(li4).removeClass('high');
        $(li4).removeClass('very-high');
        $(li4).removeClass('extreme');
    } else if (currentUvi <8){
        $(li4).addClass('high');
        $(li4).removeClass('low');
        $(li4).removeClass('moderate');
        $(li4).removeClass('very-high');
        $(li4).removeClass('extreme');
    } else if (currentUvi < 11){
        $(li4).addClass('very-high');
        $(li4).removeClass('low');
        $(li4).removeClass('moderate');
        $(li4).removeClass('high');
        $(li4).removeClass('extreme');
    } else {
        $(li4).addClass('extreme');
        $(li4).removeClass('low');
        $(li4).removeClass('moderate');
        $(li4).removeClass('high');
        $(li4).removeClass('very-high');
    }
 
};
// display the  data 

var displayWeather = function(data){
    
    // run through the daily outputs for the city 
    var head = $('<h2>');
    $(head).addClass('row col-12');
    $('#forcast').append(head);
    $(head).text('5-day Forcast');
    for(var i = 0; i < 5; i++){
        nextDays = new Date() ;
        nextDays.setDate(nextDays.getDate()+1+i);
        
        var formatDates = nextDays.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"numeric", day:"numeric"});

        var divEl = $('<div>');
        $(divEl).addClass('col-2');
        $('#forcast').append(divEl);
        
        var p1 = $('<p>');
        var p2 = $('<p>');
        var p3 = $('<p>');
        var p4 = $('<p>');
        var p5 = $('<p>');
        var img = document.createElement("img");
        img.src =`https://openweathermap.org/img/w/${iconArray[i]}.png`;

        $(divEl).append(p5, p4, p1, p2, p3);

        $(p4).append(img);
        $(p1).text('Temp: ' + tempArray[i] + ' ℉');
        $(p3).text('Humidity: ' + humArray[i] + ' %');
        $(p2).text('Wind: '+ windArray[i] + ' MPH');
        $(p5).text(formatDates);

        $(p5).attr('style','font-weight:bold');
        
      
    }

};
// save the inputs
var storageSave = function(){
 
                
    cityArray = JSON.parse(localStorage.getItem('input'));
 
    if(!cityArray){
        cityArray = [];
        cityArray.push(cityName);
        localStorage.setItem('input',JSON.stringify(cityArray));
        loadInputs();

    } else {
        for(var i=0; i<cityArray.length; i++){
            
            // checks if city name is alreay in array, if it is it does not push to array and is valid
            if(cityArray.indexOf(cityName) !== -1 || cityArray[i] === null)  {
                
                return; 
            }else{  
                cityArray.push(cityName);
                localStorage.setItem('input',JSON.stringify(cityArray));
                loadInputs();
                return; 
               
            }  
 
        }
    }
    
  
    
}
// load inputs onto the screen upon entering them
var loadInputs = function() {
   
    cityArray = JSON.parse(localStorage.getItem("input"));
    // if there is no user input yet, set to empty string

    // gets city name content for this input
    for(var i=0; i<cityArray.length; i++){
        var cityBtn=document.createElement('button');
        $(cityBtn).addClass('col cityBtn');
        cityBtn.innerHTML = cityArray[i];
    }
    // appends the new city name 
    $('.here').append(cityBtn);
};
// load inputs onto page upon startup
var initialLoad = function(){

    cityArray = JSON.parse(localStorage.getItem("input"));
    // if there is no user input yet, set to empty string
    if(!cityArray){
        cityArray=[];
        var clear=document.createElement('button');
        $(clear).addClass('col clearBtn');
        clear.innerHTML = 'Clear Recent Searches';
        $('.here').append(clear);
    } else{

        // gets city name content for this input
        for(var i=0; i<cityArray.length; i++){
            var cityBtn=document.createElement('button');
            $(cityBtn).addClass('col cityBtn');
            cityBtn.innerHTML = cityArray[i];
            $('.here').append(cityBtn);
        }
        var clear=document.createElement('button');
        $(clear).addClass('col clearBtn');
        clear.innerHTML = 'Clear Recent Searches';
        $('.here').append(clear);

    }
}






$('.here').on('click','.cityBtn',function(){
        
    // clear previous results
    $('#forcast').text('');
    $('#currentDay').text('');
    cityName = $(this).text();
    getCoord();

});
$('.here').on('click','.clearBtn',function(){
        
    // clear previous results
    $('#forcast').text('');
    $('#currentDay').text('');
    
    localStorage.clear();
    localStorage.removeItem('input');
    $('.here').empty().next().val();
    $('.here').text('Recent Searches');

    var clear=document.createElement('button');
    $(clear).addClass('col clearBtn');
    clear.innerHTML = 'Clear Recent Searches';
    $('.here').append(clear);

});

// load screen upon startup
initialLoad();