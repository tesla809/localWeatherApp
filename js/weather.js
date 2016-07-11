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
  console.log('Something');

  });
})();


function weatherQuery(city){
  var openWeatherAPI = 'http://api.openweathermap.org/data/2.5/weather?';
  var cityLookup = "q=" + city;
  var unitType = "&units=" + unit;
  var apiKey = "&APPID=4c3a82148c102d600c31feb9ab9a3b94";
  var openWeatherPath = openWeatherAPI+ cityLookup + unitType + apiKey;

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
    // a hack to clean the data
    // turn to string, eliminate the [] then turn into object again
    for(var x = 1; x < weather.length - 1; x++){
      weatherHolder += weather[x];
    }
    // weather object
    weatherObj = JSON.parse(weatherHolder);
    condition = weatherObj.main;

    if(unit === "imperial"){
      temp += "&#8457";
      windSpeed += ' f/s';

    } else {
      temp += "&#8451";
      windSpeed += 'm/s';
    }

    // weather dock
    // add location name
    $temperture.html(temp);
    $humidity.html(humidity);
    $sky.html(clouds);
    $wind.html(windSpeed);
    $condition.html(condition);
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


