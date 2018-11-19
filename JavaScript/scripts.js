// Run function on DOM load
document.addEventListener("DOMContentLoaded", function () {
    // Global Scope variables
    let lat;
    let lon;
    let city;
    let temp;
    let minTemp;
    let maxTemp;
    let c;
    let minC;
    let maxC;
    let f;
    let minF;
    let maxF;
    let weatherType;
    let icon;
    let windSPeed;
    let humidity;
    // Determine if browser can access geolocation(gps)
    if (navigator.geolocation) {
        // If geolocation(gps) is detected, pull coordinates
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            // Concatenate lon and lat into the weather api
            let url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
            console.log(url);
            // Begin our API call
            let request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.onload = function () {
                data = JSON.parse(this.response);
                //  set our variable to represent the pieces of data we need from the api
                city = data.name;
                temp = data.main.temp;
                minTemp = data.main.temp_min;
                maxTemp = data.main.temp_max;
                c = temp + " °C"
                minC = minTemp + " °C";
                maxC = maxTemp + " °C";
                f = (temp * 1.8 + 32).toFixed(1) + " °F";
                minF = (minTemp * 1.8 + 32).toFixed(1) + " °F";
                maxF = (maxTemp * 1.8 + 32).toFixed(1) + " °F";
                console.log(f);
                humidity = data.main.humidity;
                windSpeed = data.wind.speed;
                if(temp > 32.22){
                    document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1536466528142-f752ae7bdd0c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9a18f8b2fac38ab1fad42682f6ef7f65&auto=format&fit=crop&w=1350&q=80')"
                } else if(temp > 26.667) {
                    document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=93a711a664d6fb5c5ebe09400f41451c&auto=format&fit=crop&w=676&q=80')"
                } else if (temp > 15.55) {
                    document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1538411503730-03756f82a97d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=21b417fe09b946c389b50be33dbc3e1d&auto=format&fit=crop&w=634&q=80')"
                } else if (temp > 4.44) {
                    document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1433162653888-a571db5ccccf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6138d4bb4d3515092f3379fb64fbbb00&auto=format&fit=crop&w=1350&q=80')"
                } else if (temp > -0.55) {
                    document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1540230435196-aea93d597554?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=acb1f7dbfc809fae1ea87152f2db5e79&auto=format&fit=crop&w=1267&q=80')"
                }
                
                //  Tempswap variable we'll use later for a button to switch between Celsius and Farhenheit
                let tempSwap = true;
                // Inputing the data into HTML
                // City / Humidity / Wind
                document.getElementById("name").textContent = "City: " + city;
                document.getElementById("humidity").textContent = "Humidity: " + humidity + "%";
                document.getElementById("windSpeed").textContent = "Wind speed: " + windSpeed + "mph";
                console.log(weatherType);
                function change() {
                    // Fahrenheit
                    if (tempSwap === true) {
                        document.getElementById("c").textContent = "Current Temp: " + f;
                        document.getElementById("minC").textContent = "Todays Low: " + minF;
                        document.getElementById("maxC").textContent = "Todays High: " + maxF;
                        document.getElementById("tempSwap").classList.add("fahrenheit");
                        document.getElementById("tempSwap").classList.remove("celsius");
                        tempSwap = false;
                        console.log("Fahrenheit");
                    } else {
                        // Celsius
                        document.getElementById("c").textContent = "Current Temp: " + c;
                        document.getElementById("minC").textContent = "Todays Low: " + minC;
                        document.getElementById("maxC").textContent = "Todays High: " + maxC;
                        document.getElementById("tempSwap").classList.add("celsius");
                        document.getElementById("tempSwap").classList.remove("fahrenheit");
                        tempSwap = true;
                        console.log("Celsius");
                    }
                }
            
                change();
                document.getElementById("tempSwap").addEventListener("click", change);
            }
            request.send(null);

        })
    }


});