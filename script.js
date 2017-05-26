
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
				hum: weatherData.main.humidity,
				winSpeed: weatherData.wind.speed,
				winDir: weatherData.wind.deg,
				rise: weatherData.sys.sunrise,
				set: weatherData.sys.sunset,
				cloud: weatherData.clouds.all,
				
			}
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			var desc = weatherData.weather[0].description;

			var secRise = temps.rise;
			var secSet = temps.set;
			var secRiseDate = new Date(secRise * 1000);
			var secSetDate = new Date(secSet * 1000);
			var riseTimeStr = secRiseDate.toLocaleTimeString();
			var setTimeStr = secSetDate.toLocaleTimeString();
			console.log(secRiseDate,riseTimeStr);

			var time = new Date().toTimeString().split(" ")[0];
			console.log(time);

			// $("#d1").html(date);
			// $("#d2").html(timestr);


			var newHTML = '<img src="http://openweathermap.org/img/w/' + icon +' ">' + desc;
			// newHTML += '<div>The temp in ' + name + ' is currently ' + currTemp + '&deg;</div>';
			
			newHTML += '<h2>' + name + '</h2>'
			newHTML += '<br>'
			newHTML += '<div>Current Temperature:  ' + temps.curr + '&degF;</div>';
            newHTML += '<div>High:  ' + temps.max + '&degF;</div>';
            newHTML += '<div>Low:  ' + temps.min + '&degF;</div>';
            newHTML += '<br>'
            newHTML += '<div>Humidity:  ' + temps.hum + '&#37;</div>';
            newHTML += '<br>'
            newHTML += '<div>Wind Speed:  ' + temps.winSpeed + 'mph</div>';
            newHTML += '<div>Wind Direction:  ' + temps.winDir + '&deg</div>';
            newHTML += '<br>'
            newHTML += '<div>Sunrise:  ' + riseTimeStr + '</div>';
            newHTML += '<div>Sunset:  ' + setTimeStr + '</div>';
            newHTML += '<br>'
            newHTML += '<div>Cloudiness:  ' + temps.cloud + '%</div>';

			$('#temp-info').html(newHTML);
			currentPercent = 0;
			animateCircle(0,currTemp);

			

			function sunRiseSet(){
				// console.log(riseTimeStr);
				context.stroke();
				context.font = "10px Khula";
				context.fillStyle = 'rgba(252,186,04,0.6)';
				// contextBaseline = "top";
				context.fillText(riseTimeStr,10,90);
			}
			sunRiseSet();
	



			
		});

	});


	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');
	var assumedTemperature = 65;
	var currentPercent = 0;


	function animateCircle(currentArc,currentTemp){
		context.clearRect(0,0,500,500);
		// console.log(currentArc);
		// Draw Inner Circle
		context.fillStyle = 'rgba(5,60,94,0.6)';
		context.beginPath();
		context.arc(155,105,90,Math.PI*0,Math.PI*2);
		context.closePath();
		context.fill();

		// Draw the outter line
		// 5px wide line
		context.lineWidth = 15; 
		context.strokeStyle = 'rgba(252,186,04,0.6)';
		context.beginPath();
		context.arc(155,105,95,Math.PI*1.5,(Math.PI * 2 * currentArc) + Math.PI*1.5);
		context.stroke();
		// context.font = "48px Myriad Pro";
  //       context.fillStyle = "fcba04";
  //       context.textBaseline = "top";
  //       context.fillText(temps.curr,155, 105);

		if (currentTemp != undefined){                             //<<<<<<<===============puts temp in circle
			context.stroke();
			context.font = "30px Khula";
			context.fillStyle = 'rgba(252,186,04,0.6)';
			context.textBaseline = "top";
			context.fillText(currentTemp+String.fromCharCode(176)+'F',110,90);
		}

		// Update the current Perecentage
		currentPercent++;
		if(currentPercent < currentTemp){
			requestAnimationFrame(function(){
				animateCircle(currentPercent/100,currentTemp);
			});
		}
		animateSun();
		// sunRiseSet();

		
		

	}
	// animateCircle();

	function animateSun(){
		context.lineWidth = 2;
		context.strokeStyle = 'black';
		context.beginPath();
		context.moveTo(60, 405);
		context.bezierCurveTo(85,305,235,305,260,405);
		context.stroke();

		// context.fillStyle = '#fcba04';
		// context.beginPath();
		// context.arc(60,405,10,Math.PI*0,Math.PI*2);
		// context.closePath();
		// context.fill();
		// requestAnimationFrame(function(){
		// 	animateSun(currentPercent/100,currentTemp);
		// });	
		function makeSun(){
			var sunImage = new Image();
			sunImage.src = 'images/sun.png';
			context.drawImage(sunImage,15,375);

		}	
		makeSun();
		

		
		
	}
	// function sunRiseSet(){
	// 		context.stroke();
	// 		context.font = "10px Khula";
	// 		context.fillStyle = 'rgba(252,186,04,0.6)';
	// 		contextBaseline = "top";
	// 		context.fillText(riseTimeStr,10,90);
	// }
	

	

});
