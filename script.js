$(document).ready(function () {
    var btcBalance;
    var btcValue;
    $.getJSON("https://blockchain.info/de/ticker", function (result) {
        btcValue = result.USD.last;
        console.log(btcValue);
    });
    $('#chart').hide();
    $("#initial-balance").on('submit', function (e) {
        e.preventDefault();
        btcBalance = +$('#initial-balance-input').val();
        $('#front-page').slideUp(1000);
        $('#menu').html("<p>BTC Balance: " + btcBalance + "</p>" + "<p>USD Balance: " + btcBalance * btcValue + "$</p>");
        $('#chart').fadeIn(2000);


        console.log(btcBalance);
    });
    $('#deduction').on('submit', function (e) {
        e.preventDefault();
        btcBalance -= +$('#deduct').val();
        $('#menu').html("<p>BTC Balance: " + btcBalance + "</p>" + "<p>USD Balance: " + btcBalance * btcValue + "$</p>");
    });
    $('#addition').on('submit', function (e) {
        e.preventDefault();
        btcBalance += +$('#add').val();
        $('#menu').html("<p>BTC Balance: " + btcBalance + "</p>" + "<p>USD Balance: " + btcBalance * btcValue + "$</p>");

    });
    $(document).ready(function () {
        console.log("ready");
    });
});