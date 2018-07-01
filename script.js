$(document).ready(function () {
    $('#myPopup').hide();
    var btcBalance;
    var btcValue;
    var btcAdd;
    var tempBalance = btcBalance;
    $.getJSON("https://blockchain.info/de/ticker", function (result) {
        btcValue = result.USD.last;
        console.log(btcValue);
    });
    $('#chart').hide();
    window.setInterval(function () {
        if (tempBalance != btcBalance) {
            $('#menu').html("<p>BTC Balance: " + btcBalance + "</p>" + "<p>USD Balance: " + (btcBalance * btcValue).toFixed(2) + "$</p>");
            $('#myPopup').html(btcAdd); 
            $('#myPopup').fadeIn(10, function(){
                $('#myPopup').fadeOut(500);
            });
            tempBalance = btcBalance;


        }

    }, 50);
    $("#initial-balance").on('submit', function (e) {
        e.preventDefault();
        btcBalance = btcAdd = +$('#initial-balance-input').val();
        $('#front-page').slideUp(1000);
        $('#chart').fadeIn(2000);
        console.log(btcBalance);
    });
    $('#deduction').on('submit', function (e) {
        e.preventDefault();
        btcBalance -= btcAdd = +$('#deduct').val();
    });
    $('#addition').on('submit', function (e) {
        e.preventDefault();
        btcBalance += btcAdd = +$('#add').val();

    });
    $('#add-one, #add-zerotwentyfive, #remove-one, #remove-zerotwentyfive').click(function () {
        btcBalance += btcAdd = +$(this).val();


    });
    $(document).ready(function () {
        console.log("ready");
    });

});