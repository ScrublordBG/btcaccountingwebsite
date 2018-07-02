$(document).ready(function () {
    $('#myPopup').hide();
    var btcBalance;
    var btcValue;
    var btcAdd;
    var tempValue = btcValue;
    var tempBalance = btcBalance;
    /* $.getJSON("https://blockchain.info/de/ticker", function (result) {
         btcValue = result.USD.last;
         console.log(btcValue);
     });*/

    $('#ticker').hide() 
    window.setInterval(function () {
        btcValue = +$('.btcwdgt-body').find('.price').find('.p-wrap').find('p').html();
        if (tempBalance != btcBalance) {
            $('#menu').html("<p>BTC Balance: " + btcBalance.toFixed(5) + "</p>" + "<p>USD Balance: " + (btcBalance * btcValue).toFixed(2) + "$</p>");
            $('#myPopup').html(btcAdd).css('color', btcAdd > 0 ? 'green' : 'red').css('bottom','87%');
            $('#myPopup').fadeIn(10, function () {
                $('#myPopup').fadeOut(500);
            });
            tempBalance = btcBalance;
        }
        if (tempValue != btcValue){
            $('#menu').html("<p>BTC Balance: " + btcBalance.toFixed(5) + "</p>" + "<p>USD Balance: " + (btcBalance * btcValue).toFixed(2) + "$</p>");
            $('#myPopup').html((btcValue*btcBalance-tempValue*btcBalance).toFixed(2)+"$").css('color', btcValue > tempValue ? 'green' : 'red').css('bottom','75%');
            $('#myPopup').fadeIn(10, function () {
                $('#myPopup').fadeOut(2500);
            });
            tempValue = btcValue;

        }

    }, 50);
    $("#initial-balance").on('submit', function (e) {
        e.preventDefault();
        btcBalance = btcAdd = +$('#initial-balance-input').val();
        $('#front-page').slideUp(1000);
        $('#main-page').fadeIn(2000);
        $('#ticker').fadeIn(2000);
        console.log(btcBalance);
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