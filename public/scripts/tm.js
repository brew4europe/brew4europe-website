function getTimeRemaining(startTime, endtime) {
    var t = Date.parse(endtime) - Date.parse(startTime);
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getBrewsRemaining(startTime, endTime) {
    var missedBrew = false;
    var brews = 0;
    var millisecondsInDay = 86400000;

    // If it's Sunday, check we haven't missed brew o'clock!
    if (startTime.getDay() === 0 && startTime.getHours() >= 16) {
        missedBrew = true;
    }

    // Start counting from the next brew day
    function getNextBrewDay(date) {
        date.setDate(date.getDate() + (7 - date.getDay()) % 7);
        return date;
    }
    startTime = getNextBrewDay(startTime);
    
    // Work out how many brews are left
    if (startTime.getTime() < endTime.getTime()) {
        brews = (missedBrew ? 0 : 1) + Math.floor(((endTime.getTime() - startTime.getTime()) / millisecondsInDay) / 7);
    }

    return brews;
}

function initializeCountdown() {
    var endtime = new Date('October 31, 2019 23:00:00 GMT');

    var clock = document.getElementById('tmClock');
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    var brewsSpan = document.getElementById('brews');

    function updateCountdown() {
        var now = new Date();
        var t = getTimeRemaining(now, endtime);
        var b = getBrewsRemaining(now, endtime);;

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        brewsSpan.innerHTML = b;

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateCountdown();
    var timeinterval = setInterval(updateCountdown, 1000);
}

initializeCountdown();
