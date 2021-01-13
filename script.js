//var cityName = cityNameArray[0];
var cityNameArray = [];
console.log(cityNameArray)
var lat;
var long;

//need to work on this to have the city pop up below the search box,
// it has to be stored in local sorage and then it needs to be able to be clicked
// so as to populate the boxes with weather info.
// rendering names of cities under search bar
function renderCities(cityName) {

    //$(".city-dump").html("");

      for(var i=0; i < cityNameArray; i++){
        
        let newCity = $("<div>" + cityNameArray[i] + "</div>");
        
        $(".city-dump").append(newCity);
        
      console.log(newCity)
      };
};

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
        $(".date").prepend(weather.name + " ")
        $(".temp").append("Temperature: " + Math.floor(273.15 - weather.main.temp) + " &#8451;")
        $(".humidity").append("Humidity: " + weather.main.humidity + " %");
        $(".wind-speed").append("Wind Speed: " + weather.wind.speed + " MPH")

        long = weather.coord.lon;
        lat = weather.coord.lat;
       

        uvRetrieval(lat, long);
});
};
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
            var date = moment().add(i, 'days').calendar();
            
        if(fiveDay.list[i].dt_txt.indexOf("12:00:00") !== -1){
             $(".day" + index).append("Date: " + fiveDay.list[i].dt_txt + "<br>") 
             $(".day" + index).append("Temp: " + fiveDay.list[i].main.temp + " &#8451;" + "<br>")
             $(".day" + index).append("Humidity: " + fiveDay.list[i].main.humidity + "%")
             index++  
            
        } 
    }
});
};

//Need to push to the list class=city-dump, those should be buttons and saved on your
// local.

//button for city search
$(".city-search").on("click", function(event){

        // This line of code will grab the input from the textbox
        var city = $(".city-input").val().trim();
        $("city-input").val("")
       
        // Calling renderButtons which handles the processing of our movie array
        // renderCities()
        weatherRetrieval(city)
        weather5Day(city);

});