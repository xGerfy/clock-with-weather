function changeBg() {
    setBgGreet()
}

document.querySelector('.btn__bg').onclick = changeBg;


let searchInp = document.querySelector('.search__input')
let city = 'Moscow'

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let value = searchInp.value
        if (!value) return false
        city = value
        init()
        searchInp.value = ''
    }
})

function init() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec2c0e2d67c5e008057c1761ea1c99d5`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            document.querySelector('.city__name').textContent = data.name;
            document.querySelector('.temperature').innerHTML = Math.round(data.main.temp - 273) + '&deg;C';
            document.querySelector('.weather__description').textContent = data.weather[0]['description'];
            document.querySelector('.weather__icon').innerHTML = `<img class="img__src" src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            document.querySelector('.weather__windspeed').textContent = `wind speed: ${data.wind['speed']} m/s`;
        })


        .catch(function () {
            alert('This city is not found')
            city = 'Moscow'
            init()
            searchInp.value = ''
        })
}

init()

setInterval(() => {
    init()
}, 10000);



const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    enterName = document.getElementById('name'),
    enterFocus = document.getElementById('focus'),
    date = document.querySelector('.date'),
    arrTimeOfDay = ['day', 'evening', 'morning', 'night'],
    images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg']

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds()
    dayOfWeek = today.getDay();
    dateOfMonth = today.getDate();
    month = today.getMonth();

    switch (dayOfWeek) {
        case 0:
            dayOfWeek = "Sunday";
            break;
        case 1:
            dayOfWeek = "Monday";
            break;
        case 2:
            dayOfWeek = "Tuesday";
            break;
        case 3:
            dayOfWeek = "Wednesday";
            break;
        case 4:
            dayOfWeek = "Thursday";
            break;
        case 5:
            dayOfWeek = "Friday";
            break;
        case 6:
            dayOfWeek = "Saturday";
            break;
        default:
            break;
    }
    switch (month) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
        default:
            break;
    }


    date.innerHTML = `${dayOfWeek}, ${dateOfMonth} ${month}`;
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`

    setTimeout(showTime, 1000)
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBgGreet() {
    let today = new Date(),
        hour = today.getHours(),

        randomIndex = Math.floor(Math.random() * images.length),
        selectedImage = images[randomIndex]


    if (hour > 4 && hour < 9) {
        timeOfDay = arrTimeOfDay['2']
        document.body.style.backgroundImage = `url('../img/${arrTimeOfDay['2']}/${selectedImage}')`
        greeting.textContent = 'Good Morning, '
    } else if (hour > 9 && hour < 18) {
        timeOfDay = arrTimeOfDay['0']
        document.body.style.backgroundImage = `url('../img/${arrTimeOfDay['0']}/${selectedImage}')`
        greeting.textContent = 'Good Day, '
    } else if (hour > 18 && hour < 24) {
        timeOfDay = arrTimeOfDay['1']
        document.body.style.backgroundImage = `url('../img/${arrTimeOfDay['1']}/${selectedImage}')`
        greeting.textContent = 'Good Evening, '
        document.body.style.color = 'white'
    } else {
        timeOfDay = arrTimeOfDay['3']
        document.body.style.backgroundImage = `url('../img/${arrTimeOfDay['3']}/${selectedImage}')`
        greeting.textContent = 'Good Night, '
        document.body.style.color = 'white'
    }
}

function getName() {
    if (localStorage.getItem('name') === null) {
        enterName.textContent = '[Enter Name]'
    } else {
        enterName.textContent = localStorage.getItem('name')
    }
}

function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText)
            enterName.blur()
        }
    } else {
        localStorage.setItem('name', e.target.innerText)
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        enterFocus.textContent = '[Enter Focus]'
    } else {
        enterFocus.textContent = localStorage.getItem('focus')
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText)
            enterFocus.blur()
        }
    } else {
        localStorage.setItem('focus', e.target.innerText)
    }
}

function getQuote() {
    fetch(`https://favqs.com/api/qotd`)
    .then(function (respQuote) { return respQuote.json() })
    .then(function (dataQuote) {
        console.log(dataQuote);
        document.querySelector('.quote__text').textContent = dataQuote.quote.body;
        document.querySelector('.quote__author').textContent = dataQuote.quote.author;
        
    })


    .catch(function () {
        
    })
}

getQuote()

function changeQuote() {
    getQuote()
}

document.querySelector('.btn__quote').onclick = changeQuote;

enterName.addEventListener('keypress', setName)
enterName.addEventListener('blur', setName)
enterFocus.addEventListener('keypress', setFocus)
enterFocus.addEventListener('blur', setFocus)

showTime()
setBgGreet()
getName()
getFocus()