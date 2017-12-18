$(document).ready(function(){
	var data2 = {};
	var time = getTime();
	var currentUnit = "C";
	var day = 0;
	navigator.geolocation.getCurrentPosition(function(position){
			$.getJSON("https://api.apixu.com/v1/forecast.json?key=8236fe551caf4b3ca5d204215172011&q=" + position.coords.latitude + "%2C" + position.coords.longitude + "&days=7", function(data){
				data2 = data;
				getWeatherC();
				getBotWeatherC();
				$("#locationName").text(data.location.name);
				$("#countryName").text(data.location.country);
				$("#humidity").text(data.current.humidity + "%");
				$("#windDirection").text(data.current.wind_dir);
				$("#sunrise").text(data.forecast.forecastday[0].astro.sunrise);
				$("#sunset").text(data.forecast.forecastday[0].astro.sunset);
				$("#topwea").append('<img src="' + data.current.condition.icon.replaceIcon() + '">');
				$("#currentWeather").text(data.current.condition.text);
			});
		});

	$("#advancedButton").on("click", function(){
	$("#togglenone").slideToggle(500).toggleClass("none");
	});

	$("#currentTemp").on("click", function(){
		if (currentUnit === "C"){
			getWeatherF();
			getBotWeatherF();
			currentUnit = "F";
		}
		else{ 
			getWeatherC();
			getBotWeatherC();
			currentUnit = "C";
		}
	});

	var getWeatherC = function(){
			$("#currentTemp").text(data2.current.temp_c + "°C");
			$("#maxTemp").text(data2.forecast.forecastday[0].day.maxtemp_c + "°C");
			$("#minTemp").text(data2.forecast.forecastday[0].day.mintemp_c + "°C");
			$("#avgTemp").text(data2.forecast.forecastday[0].day.avgtemp_c + "°C");
			$("#feelsLike").text(data2.current.feelslike_c + "°C");
			$("#windSpeed").text(data2.current.wind_kph + "km/h");
			$("#visibility").text(data2.current.vis_km + "km");

	}


	var getWeatherF = function(){
			$("#currentTemp").text(data2.current.temp_f + "°F");
			$("#maxTemp").text(data2.forecast.forecastday[0].day.maxtemp_f + "°F");
			$("#minTemp").text(data2.forecast.forecastday[0].day.mintemp_f + "°F");
			$("#avgTemp").text(data2.forecast.forecastday[0].day.avgtemp_f + "°F");
			$("#feelsLike").text(data2.current.feelslike_f + "°F");
			$("#windSpeed").text(data2.current.wind_mph + "mp/h");
			$("#visibility").text(data2.current.vis_miles + "m");
	}

	var getBotWeatherC = function(unit){
		for (i = 0; i < 6; i++){
			$("#hourly" + i).children().remove();
			$("#daily" + i).children().remove();
			if (time + 3 * (i+1) <= 24){
				day = 0;
			} else{
				day = 1;
			}
			$("#hourly" + i)
				.append("<p>" + data2.forecast.forecastday[day].hour[(time + 3 * (i+1)) % 24].time.substring(11) + "</p>")
				.append("<img src='" + data2.forecast.forecastday[day].hour[(time + 3 * (i+1)) % 24].condition.icon.replaceIcon() + "'>")
				.append("<p>" + data2.forecast.forecastday[day].hour[(time + 3 * (i+1)) % 24].condition.text + "</p>")
				.append("<p>" + data2.forecast.forecastday[day].hour[(time + 3 * (i+1)) % 24].temp_c + "°C</p>");

			$("#daily" + i)
				.append("<p>" + data2.forecast.forecastday[i + 1].date)
				.append("<img src='" + data2.forecast.forecastday[i + 1].day.condition.icon.replaceIcon() + "'>")
				.append("<p>" + data2.forecast.forecastday[i + 1].day.condition.text + "<p>")
				.append("<p>" + data2.forecast.forecastday[i + 1].day.avgtemp_c + "°C</p>");


			}

		}
	var getBotWeatherF = function(unit){
		for (i = 0; i < 6; i++){
			$("#hourly" + i).children().remove();
			$("#daily" + i).children().remove();
			if (time + 3 * (i+1) <= 24){
				day = 0;
			} else{
				day = 1;
			}
			$("#hourly" + i)
				.append("<p>" + data2.forecast.forecastday[day].hour[(time + 3 * (i+1)) % 24].time.substring(11) + "</p>")
				.append("<img src='" + data2.forecast.forecastday[day].hour[(time + 3 * (i+1)) % 24].condition.icon.replaceIcon() + "'>")
				.append("<p>" + data2.forecast.forecastday[day].hour[(time + 3 * (i+1)) % 24].condition.text + "</p>")
				.append("<p>" + data2.forecast.forecastday[day].hour[(time + 3 * (i+1)) % 24].temp_f + "°F</p>");

			$("#daily" + i)
				.append("<p>" + data2.forecast.forecastday[i + 1].date)
				.append("<img src='" + data2.forecast.forecastday[i + 1].day.condition.icon.replaceIcon() + "'>")
				.append("<p>" + data2.forecast.forecastday[i + 1].day.condition.text + "<p>")
				.append("<p>" + data2.forecast.forecastday[i + 1].day.avgtemp_f + "°F</p>");


			}

		}


	String.prototype.replaceIcon = function(){
		return this.replace("//cdn.apixu.com/weather/", "");
	}

	function getTime(){
		var dt = new Date();
		return dt.getHours();
	}

});

