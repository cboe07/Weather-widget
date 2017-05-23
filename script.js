
// apiKey is included in config.js.
// Ignoring file from git

$(document).ready(()=>{

	const weatherApi = 'http://api.openweathermap.org/data/2.5/weather';

	$('#weather-form').submit(function(event){
		event.preventDefault();
		var zipCode = $('#zip-code').val();
		// console.log(zipCode);
		// var weatherUrl = weatherApi + '?zip='+zipCode+',us&appid='+apiKey;
		var weatherUrl = `${weatherApi}?zip=${zipCode},us&units=imperial&appid=${apiKey}`;
		// console.log(weatherUrl);
		$.getJSON(weatherUrl, (weatherData)=>{
			console.log(weatherData);
			var currTemp = weatherData.main.temp;
			var temps = {
				curr: weatherData.main.temp,
				max: weatherData.main.temp_max,
				min: weatherData.main.temp_min,
			}
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			var desc = weatherData.weather[0].description;
			var newHTML = '<img src="http://openweathermap.org/img/w/' + icon+'">' + desc;
			newHTML += '<div>The temp in ' + name + ' is currently ' + currTemp + '&deg;</div>';
			$('#temp-info').html(newHTML);
			currentPercent = 0;
			animateCircle(0,currTemp);
		});
	});


	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');
	var assumedTemperature = 65;
	var currentPercent = 0;

	function animateCircle(currentArc,currentTemp){
		// console.log(currentArc);
		// Draw Inner Circle
		context.fillStyle = "#ccc";
		context.beginPath();
		context.arc(155,75,70,Math.PI*0,Math.PI*2);
		context.closePath();
		context.fill();

		// Draw the outter line
		// 5px wide line
		context.lineWidth = 5; 
		context.strokeColor = '#ffff00';
		context.beginPath();
		context.arc(155,75,75,Math.PI*1.5,(Math.PI * 2 * currentArc) + Math.PI*1.5);
		context.stroke();

		// Update the current Perecentage
		currentPercent++;
		if(currentPercent < currentTemp){
			requestAnimationFrame(function(){
				animateCircle(currentPercent/100,currentTemp);
			});
		}
	}
	// animateCircle();

});
