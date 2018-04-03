if (moment) {
    var now = moment();
    var nextBrew = moment().weekday(7).hour(16).minute(0).second(0);
    var nextBrewText = 'Next brew ' + now.to(nextBrew);

    var countdown = document.getElementById('countdown');
    countdown.innerText = nextBrewText;
}
