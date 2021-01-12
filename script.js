


//time pushed to the h1 in information box.
var date = moment().format('l');;
console.log(date);
$(".date").append("(" + date + ")");

var long1;
var cityName = $(this).attr("city-search");
//function to seak out info from api
function weatherRetrieval(){
    var apiKey =  "94d00576fff4b5480bdc9bbfa8996d40";
    var urlStart = "http://api.openweathermap.org/data/2.5/weather?q=";
    var appid =  "&uvi/forecast&appid=";
    //var city = "grand rapids";
    var urlQuery = urlStart + cityName + appid + apiKey;

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
        long = weather.coord.lon;
        lat = weather.coord.lat;
   
})
}

function uvRetrieval(){
        var urlQuery2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=94d00576fff4b5480bdc9bbfa8996d40";
        
    $.ajax({
        url: urlQuery2,
        method: "GET"
    })
    .then(function(uv){
       
        $(".uv").append("UV index: " + uv.value);
    })
}


weatherRetrieval()
var long;
var lat
setTimeout(function(){
uvRetrieval();
},2000);

//This works (above), I need to connect the search entry to the city.  Then the button 
// to the search. 

//Need to push to the list class=city-dump, those should be buttons and saved on your
// local.

// 5 day forcast may be another api request.

//button for city search
$(".city-search").on("click",function(event){
    
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var movie = $("#movie-input").val().trim();

        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      

});