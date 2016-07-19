/*
features to add:
- modularize and turn into anonymous functions
- add rest of info needed

- style up to look better
  -fix weather dock to look better
  -better font
  -background style cartoony to match weather
    - pick color templates

  - how to add map to weather map

- error handler for city not found
*/

// global variables
var $citySearchField = $('#city-name');
var citySearch = $('#city-name').val();
var $submitButton = $('#submit');
var unit = 'imperial';

// weather dock variables
var $condition = $('#condition');
var $variableWeatherConditionIcon = $('#variable-weather-condition-icon');
var $temperture = $('#temperture');
var $humidity = $('#humidity');
var $sky = $('#sky');
var $wind = $('#wind');

// anon function to find location
(function(){
  // one method of finding current location based on IP
  var findLocation = function(){
  // location address API
  // corsorigin.me to get around CORS issues in codepen
  var getLocationAPI = 'http://ipinfo.io';
  // success callback
  function locationSuccess(data){
    var location = data.city.toString() + ", " + data.country.toString();
    // add location to field
    $citySearchField.val(location);
  }
  // actual JSON call
  $.getJSON(getLocationAPI,locationSuccess);
}; // end findLocation

// gets location and weather of current location
var currentLocation = findLocation();
currentLocal = currentLocation;

// Calls for location
weatherQuery(currentLocation);
})();


//widget F/C toggle
//need to clean up JS and take out css.
(function(){
  var $flipSwitch = $('.flipswitch');
  // add text programmatically
  $flipSwitch.html("<p>&#8457</p>");

  //when flipSwitch is clicked ...
  $($flipSwitch).click(function() {
    // get clicked switch
    var $clickedSwitch = $(this);
    var spaceMove = 170;
    var imperialColor = "black";
    var metricColor = "rgb(121,170,225)";
    
    //if state is true, then move left to off
    if ($clickedSwitch.attr('value') === 'true') {
      $($clickedSwitch).animate({
          left: spaceMove
        })
        .css("background-color", metricColor)
        .html("<p>&#8451</p>")
        .attr('value', 'false');
    } // if off, go back to 1st state.
    else if ($clickedSwitch.attr('value') === 'false') {
      $($clickedSwitch).animate({
        //subtract movement 
          left: spaceMove-spaceMove
        })
        .css("background-color", imperialColor)
        .html("<p>&#8457</p>")
        .attr('value', 'true');
    }

  searchAction();
  });
})();



function weatherQuery(city){
  var openWeatherAPI = 'http://api.openweathermap.org/data/2.5/weather?';
  var cityLookup = "q=" + city;
  var unitType = "&units=" + unit;
  var apiKey = "&APPID=4c3a82148c102d600c31feb9ab9a3b94";
  var openWeatherPath = openWeatherAPI+ cityLookup + unitType + apiKey;


  function variableIcon(condition){
    var weather;

    // key value pair of weather icon - condition
    var iconList = {
      'clear sky' : 'wi-day-sunny',
      'clear' : 'wi-day-sunny',
      'clouds' : 'wi-day-cloudy',
      'few clouds' : 'wi-day-cloudy',
      'scattered clouds' : 'wi-day-cloudy',
      'broken clouds' : 'wi-day-cloudy',
      'overcast clouds' : 'wi-day-sunny-overcast',

      'shower rain' : 'wi-day-showers',
      'rain' : 'wi-day-rain',
      'thunderstorm' : 'wi-day-snow-thunderstorm',

      'thunderstorm with light rain': 'wi-thunderstorm',
      'thunderstorm with rain' : 'wi-thunderstorm',
      'thunderstorm with heavy rain' : 'wi-thunderstorm',
      'light thunderstorm' : 'wi-lightning',
      'heavy thunderstorm' : 'wi-thunderstorm',
      'ragged thunderstorm' : 'wi-thunderstorm',
      'thunderstorm with light drizzle' : 'wi-thunderstorm',
      'thunderstorm with drizzle' : 'wi-thunderstorm',
      'thunderstorm with heavy drizzle' : 'wi-thunderstorm',

      'light intensity drizzle' : 'wi-sprinkle',
      'drizzle' : 'wi-raindrops',
      'heavy intensity drizzle' : 'wi-sprinkle',
      'light intensity drizzle rain' : 'wi-sprinkle',
      'drizzle rain' : 'wi-sprinkle',
      'heavy intensity drizzle rain' : 'wi-rain-wind',
      'shower rain and drizzle' : 'wi-showers',
      'heavy shower rain and drizzle' : 'wi-rain-wind',
      'shower drizzle' : 'wi-showers',

      'light rain' : 'wi-raindrops',
      'moderate rain' : 'wi-rain',
      'heavy intensity rain' : 'wi-rain-wind',
      'very heavy rain' : 'wi-rain-wind',
      'extreme rain' : 'wi-rain-wind',
      'freezing rain' : 'wi-rain-mix',
      'light intensity shower rain' : 'wi-rain-wind',
      'heavy intensity shower rain': 'wi-rain-wind',
      'ragged shower rain' : 'wi-rain-wind',
      
      'snow' : 'wi-day-snow',
      'light snow' : 'wi-day-snow',
      'heavy snow': 'wi-snow-wind',
      'sleet' : 'sleet',
      'shower sleet': 'wi-rain-mix',
      'light rain and snow' : 'wi-rain-mix',
      'rain and snow' : 'wi-rain-mix',
      'light shower snow' : 'wi-rain-mix',
      'shower snow' : 'wi-rain-mix',
      'heavy shower snow' : 'wi-storm-showers',

      'mist' : 'wi-day-fog',
      'haze' : 'wi-day-haze',
      'smoke' : 'wi-smoke',
      'sand, dust whirls' : 'wi-sandstorm',
      'fog' : 'wi-fog',
      'sand' : 'wi-dust',
      'dust' : 'wi-dust',
      'volcanic ash' : 'wi-volcano',
      'squalls': 'wi-day-rain-wind',
      'tornado' : 'wi-tornado',
      'tropical storm' : 'wi-thunderstorm',
      'hurricane' : 'wi-hurricane',

      'cold' : 'wi-snowflake-cold',
      'hot' : 'wi-hot',
      'windy' : 'wi-windy',
      'hail' : 'wi-day-hail',

      'calm' : 'wi-windy',
      'light breeze' : 'wi-windy',
      'gentle breeze' : 'wi-windy',
      'moderate breeze' : 'wi-windy',
      'fresh breeze' : 'wi-windy',
      'strong breeze' : 'wi-strong-wind',

      'high wind, near gale' : 'wi-gale-warning',
      'gale' : 'wi-gale-warning',
      'severe gale' : 'wi-gale-warning',

      'storm' : 'wi-storm-warning',
      'violent storm' : 'wi-storm-warning',
    };

    // decide condition
    if (iconList.hasOwnProperty(condition) === true){
        weather = iconList[condition];
    } else {
      // to prevent icon from being the same when changing city and conditions are not met.
      weather = 'nothing';
    }
    return weather;
  }

  // API callback
  function openWeatherAPISuccess(data){
    // when successful, search button allowed again
    $citySearchField.prop("disabled", false);

    var temp = data.main.temp;
    var humidity = data.main.humidity + "%";
    var clouds = data.clouds.all + "%";
    var windSpeed = data.wind.speed;

    var weather = JSON.stringify(data.weather);
    var weatherHolder = "";
    var weatherObj;
    var condition;
    var variableWeather;
    
    // a hack to clean the data
    // turn to string, eliminate the [] then turn into object again
    for(var x = 1; x < weather.length - 1; x++){
      weatherHolder += weather[x];
    }
    
    // getting description for weather object
    weatherObj = JSON.parse(weatherHolder);
    condition = weatherObj.main;
    condition = condition.toLowerCase();
    variableWeather = variableIcon(condition);

    // decide standard
    if(unit === "imperial"){
      temp += "&#8457";
      windSpeed += ' f/s';

    } else {
      temp += "&#8451";
      windSpeed += 'm/s';
    }


    // add info to weather dock 
    $temperture.html(temp);
    $humidity.html(humidity);
    $sky.html(clouds);
    $wind.html(windSpeed);
    $condition.html(condition);
    $variableWeatherConditionIcon.html("<i class='wi weather-icon " + variableWeather +" 'id='variable-weather-condition-icon'></i>");
  }
    
  // API callback
  $.getJSON(openWeatherPath, openWeatherAPISuccess);
} // end weatherQuery

var searchAction = function(evt){
  // disable search until we get data
  $citySearchField.prop("disabled", true);

  // get value at search time
  unit = $('.flipswitch').attr('value');

  // set unit
  if(unit === 'true') {
    unit = "imperial";
  } else {
    unit = "metric";
  }
  //query the weather
  citySearch = $('#city-name').val();
  weatherQuery(citySearch);
};

// Run when go clicked and new location submitted
$($submitButton).click(function(evt){
  searchAction(evt);
});

$($citySearchField).on('keyup keypress', function(evt) {
  var keyCode = evt.keyCode || evt.which;
  if (keyCode === 13) { 
    evt.preventDefault();
    searchAction(evt);  
    return false;
  }
});


// background chanage based on weather

