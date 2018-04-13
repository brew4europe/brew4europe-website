if (moment) {
    var now = moment();

    // Brew for Europe is currently 4pm every Sunday
    var nextBrew = moment(now);
    if((now.day() === 0) && now.hour() < 16) {
        // Not long to wait, the next brew is this Sunday!
        nextBrew.weekday(0);
    } else {
        // Have to wait until next Sunday now :(
        nextBrew.weekday(7);
    }
    nextBrew.hour(16).minute(0).second(0);

    var nextBrewText = 'Next brew ' + now.to(nextBrew);
    var countdown = document.getElementById('countdown');
    countdown.innerText = nextBrewText;
}
