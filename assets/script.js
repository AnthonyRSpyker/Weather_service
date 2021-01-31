
//function that puts cities that where searched into a p item under the search bar.
function renderCities(city) {
    
    var newCity = $("<p>").addClass("city").text(city);
    $(".city-dump").prepend(newCity);
   
};

// on click for every p item inide of the class of city-dump
$(".city-dump").on("click", "p", function() {
    
    //grabbing the text of the button clicked ("this") and running that through your function of weatherRetrieval
    weatherRetrieval($(this).text());
    weather5Day($(this).text());
  });

//function to seak out info from api
function weatherRetrieval(city){
    //erases previous info so new info wont double up.
    $(".new").text("");
    //date pushed to the h1 in information box.
    var date = moment().format('l');
    $(".date").append("(" + date + ")");
    var urlQuery = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&uvi/forecast&appid=94d00576fff4b5480bdc9bbfa8996d40";
    $.ajax({
        url: urlQuery,
        method: "GET"
    })
    //Want the little image that tells me the weather.
    .then(function(weather){
        // if statement checking to see if the searched city is already in local storage, 
        // if it is not, we are going to hit this if statement and push it too the array of 
        // localStore (variable below) 
        if (localStore.indexOf(city) === -1) {

            localStore.push(city);

            window.localStorage.setItem("cities", JSON.stringify(localStore));
            
            renderCities(city);
          }
        $(".date").prepend(weather.name + " ")
        $(".temp").append("Temperature: " + Math.floor(273.15 - weather.main.temp) + " &#8451;")
        $(".humidity").append("Humidity: " + weather.main.humidity + " %");
        $(".wind-speed").append("Wind Speed: " + weather.wind.speed + " MPH")
        long = weather.coord.lon;
        lat = weather.coord.lat;
        uvRetrieval(lat, long);
});
};
//uv retrieval info.  function run when weather retrieval is run.
function uvRetrieval(lat, long){
    //erases previous info so new info wont double up.
    $(".uv").text("");
        var urlQuery2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=94d00576fff4b5480bdc9bbfa8996d40";
    $.ajax({
        url: urlQuery2,
        method: "GET"
    })
    .then(function(uv){
        $(".uv").append("UV index: " + uv.value);
    });
};
//five day weather forcast population.
function weather5Day(city){
    //erases previous info so new info wont double up.
    $(".boxes").text("");
    var urlQuery3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=94d00576fff4b5480bdc9bbfa8996d40&units=imperial";
    $.ajax({
        url: urlQuery3,
        method: "GET"
    })
    .then(function(fiveDay){
        var index = 1
        for(var i=0 ; i < fiveDay.list.length ; i++ ){
            //var date = moment().add(i, 'days').calendar();
        if(fiveDay.list[i].dt_txt.indexOf("12:00:00") !== -1){
             $(".day" + index).append("Date: " + fiveDay.list[i].dt_txt + "<br>") 
             $(".day" + index).append("Temp: " + fiveDay.list[i].main.temp + " &#8451;" + "<br>")
             $(".day" + index).append("Humidity: " + fiveDay.list[i].main.humidity + "%")
             index++  
        } 
    }
});
};

//button for city search
$(".city-search").on("click", function(){
        // This line of code will grab the input from the textbox
        var city = $(".city-input").val().trim();
        $("city-input").val("")
       
        weatherRetrieval(city)
        weather5Day(city);
        
});

// this is going to get anything out of local storage with the "key" of history, if there is nothing to pull out of local storage, then this is just an empty array that we can push too. 
var localStore = JSON.parse(window.localStorage.getItem("cities")) || [];

//with that localstore variable being an array in localStorage, this will
//  loop through that array to make a list of items.
for (var i = 0; i < localStore.length; i++) {
    renderCities(localStore[i]);
  }