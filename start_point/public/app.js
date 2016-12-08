var populations;
var names;

window.onload = function(){
  var url = 'https://restcountries.eu/rest/v1';
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

// when request complete create the pie chart with data
var requestComplete = function(){
   if(this.status != 200) return;
   var jsonString = this.responseText;
   var countries = JSON.parse(jsonString);
   populations = populatePopulation(countries);
   names = populateNames(countries);
   console.log(constructData(populations, names));
   var pieData = {
      container: document.getElementById("pie-chart"),
      title: "Populations of the world",
      seriesName: "Population",
      data: constructData(populations, names)
    };
    new PieChart( pieData );
}

// construct array of objects from list of countries and list of populations
var constructData = function(countryData, labels) {
  var data = [];
  var colors = ["#FFAC81", "#FF928B", "#FEC3A6", "#EFE9AE", "#CDEAC0"];
  var colorCounter = 0;
  for(var i = 0; i < countryData.length; i++ ){
    var column = {};
    column.name = labels[i];
    column.y = countryData[i];
    data.push(column);
    if (colorCounter === colors.length) {
      colorCounter = 0;
    };
    column.color = colors[colorCounter];
    colorCounter++;
  }
  return data;
};

// create list of all countries
var populateNames = function(countries){
  var names = [];
  countries.forEach(function(country){
    names.push(country.name);
  });
  return names;
}

// create list of all population numbers
var populatePopulation = function(countries){
  var population = [];
  countries.forEach(function(country){
    population.push(country.population);
  });
  return population;
}
