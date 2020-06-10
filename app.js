// Util
function $(value) { return document.getElementById(value) }
function zeroBefore(value) { return String("0" + value).slice(-2); }

// Declarações 
var temp_today = $("temp_today");
var max_today = $("max_today");
var min_today = $("min_today");
var state_today = $("state_today");
var state_image_today = $("state_image_today");

var max_next_day1 = $("max_next_day1");
var min_next_day1 = $("min_next_day1");
var state_next_day1 = $("state_next_day1");
var state_image_next_day1 = $("state_image_next_day1");

var next_day2_title = $("next_day2_title");
var max_next_day2 = $("max_next_day2");
var min_next_day2 = $("min_next_day2");
var state_next_day2 = $("state_next_day2");
var state_image_next_day2 = $("state_image_next_day2");

var next_day3_title = $("next_day3_title");
var max_next_day3 = $("max_next_day3");
var min_next_day3 = $("min_next_day3");
var state_next_day3 = $("state_next_day3");
var state_image_next_day3 = $("state_image_next_day3");

var woeid = 455825;
var url = "https://www.metaweather.com/api/location/";

var arrWeatherState = [
    { abbr: "sn", title: "Nevasca", image: "src/icon_neve.svg" },
    { abbr: "sl", title: "Geada", image: "src/icon_granizo.svg" },
    { abbr: "h", title: "Granizo", image: "src/icon_granizo.svg" },
    { abbr: "t", title: "Tempestade", image: "src/icon_tempestade.svg" },
    { abbr: "hr", title: "Chuva forte", image: "src/icon_chuva.svg" },
    { abbr: "lr", title: "Chuva fraca", image: "src/icon_chuva.svg" },
    { abbr: "s", title: "Chuvoso", image: "src/icon_chuva.svg" },
    { abbr: "hc", title: "Parcial. Nublado", image: "src/icon_nublado.svg" },
    { abbr: "lc", title: "Pouco Nublado", image: "src/icon_nublado.svg" },
    { abbr: "c", title: "Limpo", image: "https://image.flaticon.com/icons/svg/2893/2893120.svg" }
];

var dayOfWeek = [
    "Domingo:",
    "Segunda:",
    "Terça:",
    "Quarta:",
    "Quinta:",
    "Sexta:",
    "Sábado:",
    "Domingo:",
    "Segunda:",
    "Terça:"
]

// Controle de Data e Hora
function setDateTime() {
    var time = new Date();
    hour = zeroBefore(time.getUTCHours() - 3);
    min = zeroBefore(time.getMinutes());
    sec = zeroBefore(time.getSeconds());
    timeTxt.innerText = hour + ":" + min + ":" + sec;

    next_day2_title.innerText = dayOfWeek[time.getDay() + 2]
    next_day3_title.innerText = dayOfWeek[time.getDay() + 3]
}
setDateTime();

// Controle de Clima
function findWeatherState(abbr) {
    var obj = {};
    for (var i = 0; i < arrWeatherState.length; i++) {
        if (arrWeatherState[i].abbr === abbr) {
            obj = arrWeatherState[i];
        }
    }
    return obj;
}
function setWeather() {
    var weatherResponse = {
        consolidated_weather: [
            {
                max_temp: 0.1,
                min_temp: 0.1,
                the_temp: 0.1,
                weather_state_abbr: "c",
            }
        ]
    };
    var xhr = new XMLHttpRequest()

    xhr.open("GET", "https://cors-anywhere.herokuapp.com/" + url + woeid, true)
    xhr.onload = function () {
        if (xhr.status === 200) {
            weatherResponse = JSON.parse(xhr.responseText);

            var objToday = findWeatherState(weatherResponse.consolidated_weather[0].weather_state_abbr);
            temp_today.innerText = Number(weatherResponse.consolidated_weather[0].the_temp).toFixed(1);
            max_today.innerText = Number(weatherResponse.consolidated_weather[0].max_temp).toFixed(1);
            min_today.innerText = Number(weatherResponse.consolidated_weather[0].min_temp).toFixed(1);
            state_today.innerText = objToday.title;
            state_image_today.src = objToday.image;

            var objNextDay1 = findWeatherState(weatherResponse.consolidated_weather[1].weather_state_abbr);
            max_next_day1.innerText = Number(weatherResponse.consolidated_weather[1].max_temp).toFixed(1);
            min_next_day1.innerText = Number(weatherResponse.consolidated_weather[1].min_temp).toFixed(1);
            state_next_day1.innerText = objNextDay1.title;
            state_image_next_day1.src = objNextDay1.image;

            var objNextDay2 = findWeatherState(weatherResponse.consolidated_weather[2].weather_state_abbr);
            max_next_day2.innerText = Number(weatherResponse.consolidated_weather[2].max_temp).toFixed(1);
            min_next_day2.innerText = Number(weatherResponse.consolidated_weather[2].min_temp).toFixed(1);
            state_next_day2.innerText = objNextDay2.title;
            state_image_next_day2.src = objNextDay2.image;

            var objNextDay3 = findWeatherState(weatherResponse.consolidated_weather[3].weather_state_abbr);
            max_next_day3.innerText = Number(weatherResponse.consolidated_weather[3].max_temp).toFixed(1);
            min_next_day3.innerText = Number(weatherResponse.consolidated_weather[3].min_temp).toFixed(1);
            state_next_day3.innerText = objNextDay3.title;
            state_image_next_day3.src = objNextDay3.image;


        }
    }
    xhr.send()
}
setWeather();

// Controle de mudança de cidade
$("city").addEventListener("change", function (evt) {
    woeid = evt.target.value
    setWeather();
})


// Controles de intervalo
setInterval(function () { setDateTime() }, 5000);
setInterval(function () { setWeather(); }, 60000);


