
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
			// console.log(secRiseDate,riseTimeStr);

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

   //          html += '<p id="wind-info">Winds: '+cards+' at '+windSpeed+' mph</p>'
			// html += '<div id="compass"><p id="N">N</p><p id="E">E</p><p id="S">S</p><p id="W">W</p></div>'
			// html += '<img id="wind-arrow" src="windarrow.png">'



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

			


			// function cardinalDirection(deg){
			// 	var direction;
			// 	if((deg<11.25)||(deg>348.75)){
			// 		direction = 'N';
			// 	}else if(deg<33.75){
			// 		direction = 'NNE';
			// 	}else if(deg<56.25){
			// 		direction = 'NE';
			// 	}else if(deg<78.75){
			// 		direction = 'ENE';
			// 	}else if(deg<101.25){
			// 		direction = 'E';
			// 	}else if(deg<123.75){
			// 		direction = 'ESE';
			// 	}else if(deg<146.25){
			// 		direction = 'SE';
			// 	}else if(deg<168.75){
			// 		direction = 'SSE';
			// 	}else if(deg<191.25){
			// 		direction = 'S';
			// 	}else if(deg<213.75){
			// 		direction = 'SSW';
			// 	}else if(deg<236.25){
			// 		direction = 'SW';
			// 	}else if(deg<258.75){
			// 		direction = 'WSW';
			// 	}else if(deg<281.25){
			// 		direction = 'W';
			// 	}else if(deg<303.75){
			// 		direction = 'WNW';
			// 	}else if(deg<326.25){
			// 		direction = 'NW';
			// 	}else if(deg<348.75){
			// 		direction = 'NNW';
			// 	}
			// 	return direction;

			// 	if(windCoord>=180){
			// 		windCoordMod = windCoord - 180;
			// 	}
			// }


			// $('#wind-arrow').addClass('rotate');
			// $('#wind-arrow').css('transition', 'transform '+ 10/windSpeed +'s cubic-bezier(0.09,0.25,0.49,1.58)');
			// if(windCoord<=180){
			// 	var rotationAngle = -(180-windCoord);
			// 	setTimeout(function(){$('.rotate').css('transform','rotate('+rotationAngle+'deg)')},0)
			// }else{
			// 	setTimeout(function(){$('.rotate').css('transform','rotate('+windCoordMod+'deg)')},0)
			// }
			
	



			
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

  		if (currentTemp >= 90){
			context.strokeStyle = 'rgba(242,39,23,0.6)';
		}else if (currentTemp >= 80){
			context.strokeStyle = 'rgba(242,136,3,0.6)';
		}else if (currentTemp >= 60){
			context.strokeStyle = 'rgba(252,186,04,0.6)';
		}else if (currentTemp >=50){
			context.strokeStyle = 'rgba(87,239,249,0.6)';
		}else if (currentTemp >32){
			context.strokeStyle = 'rgba(12,42,249,0.6)';
		}else{
			context.strokeStyle = 'rgba(255,255,255,0.6)';
		}



		if (currentTemp != undefined){                             //<<<<<<<===============puts temp in circle
			context.stroke();
			context.font = "30px Khula";
			// context.fillStyle = 'rgba(252,186,04,0.6)';
			// context.textBaseline = "top";
			// context.fillText(currentTemp+String.fromCharCode(176)+'F',110,90);
			if (currentTemp >= 90){
				context.fillStyle = 'rgba(242,39,23,0.6)';
			}else if (currentTemp >= 80){
				context.fillStyle = 'rgba(242,136,3,0.6)';
			}else if (currentTemp >= 60){
				context.fillStyle = 'rgba(252,186,04,0.6)';
			}else if (currentTemp >=50){
				context.fillStyle = 'rgba(87,239,249,0.6)';
			}else if (currentTemp >32){
				context.fillStyle = 'rgba(255,255,255,0.6)';
			}else{
				context.fillStyle = 'rgba(255,255,255,0.6)';
			}
		}	context.textBaseline = "top";
			context.fillText(currentTemp+String.fromCharCode(176)+'F',110,90);

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
			// if(time >= '11:00:00') && (time <= )
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
