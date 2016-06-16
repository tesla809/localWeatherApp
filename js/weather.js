
// ran when submitted
$('form').submit(function(evt){
  // prevent form from going to a new site.
  evt.preventDefault();
  

  var citySearch = $('#search').val();
  var $citySearchField = $('#search');

  var $submitButton = $('#submit');
  $citySearchField.prop("disabled", true);
  $submitButton.attr("disabled", true).val('searching...');

  // the AJAX part
  var openWeatherMapAPI = "api.openweathermap.org/data/2.5/forecast/city?id=" + citySearch + "&APPID=4c3a82148c102d600c31feb9ab9a3b94";
  
  // parameters to pass
  var openWeatherMapOptions = {
    // q is for the city
    q: citySearch,
    format: "json"
  };

  // callback function 
  function displayWeather(data) {
    alert(data);
  }

  $.getJSON(openWeatherMapAPI, openWeatherMapOptions, displayWeather);
}); // end submit