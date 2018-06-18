(function() {
    function updateCountdown() {
        var countdownText;
        var refreshDelay;
        var now = moment();

        if ((now.day() === 0) && (now.hour() === 16)) {
            // Brew for Europe is currently 4pm every Sunday
            countdownText = 'Kettles on!'
        } else {
            var nextBrew = moment(now);
            if((now.day() === 0) && now.hour() < 16) {
                // Not long to wait, the next brew is today!

                if (now.hour() >= 12) {
                    // Some dedicated brewers may want to watch the
                    // countdown on Sunday afternoon!
                    refreshDelay = 1000
                }
            } else {
                // Next brew isn't until next Sunday :(
                nextBrew.weekday(7);
            }
            nextBrew.hour(16).minute(0).second(0);

            var countdownSeconds = nextBrew.diff(now, 'seconds');
            if (countdownSeconds > 12) {
                countdownText = 'Next brew ' + now.to(nextBrew);
            } else {
                countdownText = 'Next brew in ' + countdownSeconds;
            }
        }
        
        var countdown = document.getElementById('countdown');
        countdown.innerText = countdownText;

        if (refreshDelay) {
            setTimeout(updateCountdown, refreshDelay);
        }
    }

    if (moment) {
        updateCountdown();
    }
})();
