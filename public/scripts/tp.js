function getTimeSince(startTime, endtime) {
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

function getBrewsSince(startTime, endTime) {
    var hadBrew = false;
    var brews = 0;
    var millisecondsInDay = 86400000;

    // If it's Sunday, check whether we've had brew o'clock!
    if (endTime.getDay() === 0 && endTime.getHours() >= 16) {
        hadBrew = true;
    }
    
    // Work out how many brews there have been
    if (startTime.getTime() < endTime.getTime()) {
        brews = (hadBrew ? 1 : 0) + Math.floor(((endTime.getTime() - startTime.getTime()) / millisecondsInDay) / 7);
    }

    return brews;
}

function initializeCountdown() {
    var starttime = new Date('January 31, 2020 23:00:00 GMT');
    var firstbrew = new Date('February 02, 2020 16:00:00 GMT');

    var clock = document.getElementById('tmClock');
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    var brewsSpan = document.getElementById('brews');

    function updateCountdown() {
        var now = new Date();
        var t = getTimeSince(starttime, now);
        var b = getBrewsSince(firstbrew, now);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        brewsSpan.innerHTML = b;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

initializeCountdown();
