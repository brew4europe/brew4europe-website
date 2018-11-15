function getTimeRemaining(startTime, endtime) {
    var t = Date.parse(endtime) - Date.parse(startTime);
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t > 0?t:0,
        'days': t > 0?days:0,
        'hours': t > 0?hours:0,
        'minutes': t > 0?minutes:0,
        'seconds': t > 0?seconds:0
    };
}

function initializeCountdown() {
    var blackoutTime = new Date('November 18, 2018 20:00:00 GMT');
    var surgeTime = new Date('November 18, 2018 21:00:00 GMT');

    var blackoutClock = document.getElementById('blackoutClock');
    var blackoutDaysSpan = blackoutClock.querySelector('.days');
    var blackoutHoursSpan = blackoutClock.querySelector('.hours');
    var blackoutMinutesSpan = blackoutClock.querySelector('.minutes');
    var blackoutSecondsSpan = blackoutClock.querySelector('.seconds');

    var surgeClock = document.getElementById('surgeClock');
    var surgeDaysSpan = surgeClock.querySelector('.days');
    var surgeHoursSpan = surgeClock.querySelector('.hours');
    var surgeMinutesSpan = surgeClock.querySelector('.minutes');
    var surgeSecondsSpan = surgeClock.querySelector('.seconds');

    function updateCountdown() {
        var now = new Date();
        
        var blackoutCountdown = getTimeRemaining(now, blackoutTime);
        blackoutDaysSpan.innerHTML = blackoutCountdown.days;
        blackoutHoursSpan.innerHTML = ('0' + blackoutCountdown.hours).slice(-2);
        blackoutMinutesSpan.innerHTML = ('0' + blackoutCountdown.minutes).slice(-2);
        blackoutSecondsSpan.innerHTML = ('0' + blackoutCountdown.seconds).slice(-2);
        
        var surgeCountdown = getTimeRemaining(now, surgeTime);
        surgeDaysSpan.innerHTML = surgeCountdown.days;
        surgeHoursSpan.innerHTML = ('0' + surgeCountdown.hours).slice(-2);
        surgeMinutesSpan.innerHTML = ('0' + surgeCountdown.minutes).slice(-2);
        surgeSecondsSpan.innerHTML = ('0' + surgeCountdown.seconds).slice(-2);

        if (surgeCountdown.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateCountdown();
    var timeinterval = setInterval(updateCountdown, 1000);
}

initializeCountdown();
