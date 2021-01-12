


//time pushed to the h1 in information box.
var date = moment().format('l');;
console.log(date);
$(".date").append("(" + date + ")");

//function to seak out info from api
function weatherRetrieval(){
    var apiKey =  "94d00576fff4b5480bdc9bbfa8996d40";
    var urlStart = "http://api.openweathermap.org/data/2.5/weather?q=";
    var appid =  "&uvi/forecast&appid=";
    var city = "grand rapids";
    var urlQuery = urlStart + city + appid + apiKey;

    $.ajax({
        url: urlQuery,
        method: "GET"
    })
    //Want the little image that tells me the weather.
    .then(function(weather){
        $(".date").prepend(weather.name + " ")
        $(".temp").append("Temperature: " + Math.floor(273.15 - weather.main.temp) + " &#8451;")
        $(".humidity").append("Humidity: " + weather.main.humidity + " %");
        $(".wind-speed").append("Wind Speed: " + weather.wind.speed + " MPH")
        //$(".uv").append("UV Index: " + )
        //may need to make a separate function that retrieves lat and long from previous 
        // request in order to get the uv index.
        console.log(weather)
    })

}

weatherRetrieval()
//This works (above), I need to connect the search entry to the city.  Then the button 
// to the search. 

//Need to push to the list class=city-dump, those should be buttons and saved on your
// local.

// 5 day forcast may be another api request.

//button for city search
$(".city-search").on("click",function(){
    console.log("jquery and button works");
});