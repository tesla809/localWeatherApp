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
var unit = "imperial";

// weather dock variables
var $temperture = $('#temperture');
var $humidity = $('#humidity');
var $sky = $('#sky');
var $wind = $('#wind');


// gets location and weather of current location
var currentLocation = findLocation();
weatherQuery(currentLocation);

// Unit: either metric or imperial
$("input[name=standard]:radio").click(function(){
  var $imperial = $("#imperial");
  if($imperial.is(":checked")) {
    unit = "imperial";
  } else {
    unit = "metric";
  }
}); //end metric/imperial selection 

// one method of finding current location based on IP
function findLocation(){
  // location address API
  // corsorigin.me to get around CORS issues in codepen
  var getLocationAPI = 'https://crossorigin.me/http://ipinfo.io';
  // success callback
  function locationSuccess(data){
    var location = data.city.toString() + ", " + data.country.toString();
    // add location to field
    $citySearchField.val(location);
  }
  // actual JSON call
  $.getJSON(getLocationAPI,locationSuccess);
} // end findLocation


function weatherQuery(city){
  var openWeatherAPI = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?';
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
    var place = data.name;
    place += ' ,' + data.sys.country;  

    if(unit === "imperial"){
      temp += " F";
    } else {
      temp += " C";
    }

    // weather dock
    // add location name
    $citySearchField.text(place);
    $temperture.html('<li> Temp: ' +  temp +'</li>');
    $humidity.html('<li> humidity: ' + humidity +'</li>');
    $sky.html('<li>30</li>');
    $wind.html('<li>40</li>');
  }
    
  // API callback
  $.getJSON(openWeatherPath, openWeatherAPISuccess);
} // end weatherQuery


// Run when go clicked and new location submitted
$($submitButton).click(function(evt){
  // prevent form from going to a new site.
  evt.preventDefault();

  // disable search until we get data
  $citySearchField.prop("disabled", true);

  //query the weather
  citySearch = $('#city-name').val();
  weatherQuery(citySearch);
});



$("form").submit(function() { return false; });


