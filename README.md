# Whats-the-weather-like-C6

**Purpose**

Use the open weather API to create a webpage that is user friendly, and allows the user to see the current weather and 5-day forcast for any city of thier choosing. 

**Summary**

It works by getting the user input (the city) and plugging it into the API URL. From there the data is fetched. 

<img width="1728" alt="Screen Shot 2022-07-06 at 11 01 53 AM" src="https://user-images.githubusercontent.com/103079401/177595282-0e9aca75-3481-43aa-a902-78d044b7a8d7.png">


With this initial input, the latitude and longitude cooridinates are taken from the input, and put into the one call API for the open weather API. This is located in my weather function. This data is also pushed into a save function, so the name can be recalled later for the recent searches. 

<img width="1728" alt="Screen Shot 2022-07-06 at 11 11 10 AM" src="https://user-images.githubusercontent.com/103079401/177595989-558910c1-1a89-43ef-ac38-ca180b26eb51.png">

From this fetch, the current weather data and 5-day forcast can be found, and used. I plugged this data into my displayWeather function, and displayCurrent, so the data would be able to show up on the screen. 

<img width="1728" alt="Screen Shot 2022-07-06 at 11 05 58 AM" src="https://user-images.githubusercontent.com/103079401/177596250-ce6eedf3-5202-43b6-ba27-f104ed0fbd94.png">

<img width="1728" alt="Screen Shot 2022-07-06 at 11 06 12 AM" src="https://user-images.githubusercontent.com/103079401/177596272-c68e8718-0f3f-463c-9baa-a491c9176ec0.png">

I also wanted to put in a clear button, so the user has the option to clear out any past results. 

**Deployed Page**

<img width="1840" alt="Screen Shot 2022-07-06 at 11 29 45 AM" src="https://user-images.githubusercontent.com/103079401/177599179-c1ddee5c-6494-401a-b558-fcf2f98b74ee.png">

**Link to Deployed Page**

https://morgan1317.github.io/Whats-the-weather-like-C6/

