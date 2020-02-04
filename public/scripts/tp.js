function getTimeSince(startTime, endTime) {
    var t = Date.parse(endTime) - Date.parse(startTime);
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

function getBrewsSince(firstBrew, endTime) {
    // firstBrew must be a Sunday at 4pm
    var brews = 0;
    var millisecondsInDay = 86400000;
    
    // Work out how many brews there have been
    if (firstBrew.getTime() <= endTime.getTime()) {
        brews = 1 + Math.floor(((endTime.getTime() - firstBrew.getTime()) / millisecondsInDay) / 7);
    }

    return brews;
}

function initializeCountup() {
    var startTime = new Date('January 31, 2020 23:00:00 GMT');
    var firstBrew = new Date('February 02, 2020 16:00:00 GMT');

    var clock = document.getElementById('tmClock');
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    var brewsSpan = document.getElementById('brews');

    function updateCountup() {
        var now = new Date();
        var t = getTimeSince(startTime, now);
        var b = getBrewsSince(firstBrew, now);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        brewsSpan.innerHTML = b;
    }

    updateCountup();
    setInterval(updateCountup, 1000);
}

initializeCountup();
