$(document).ready(function () {
    $('#myPopup').hide();
    var btcBalance;
    var btcValue = +$('.btcwdgt-body').find('.price').find('.p-wrap').find('p').html();
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
            $('#myPopup').html(btcAdd).css('color', btcAdd > 0 ? 'green' : 'red').css('bottom', '87%');
            $('#myPopup').fadeIn(10, function () {
                $('#myPopup').fadeOut(500);
            });
            tempBalance = btcBalance;
        }
        if (tempValue != btcValue) {
            $('#menu').html("<p>BTC Balance: " + btcBalance.toFixed(5) + "</p>" + "<p>USD Balance: " + (btcBalance * btcValue).toFixed(2) + "$</p>");
            $('#myPopup').html((btcValue * btcBalance - tempValue * btcBalance).toFixed(2) + "$").css('color', btcValue > tempValue ? 'green' : 'red').css('bottom', '75%');
            $('#myPopup').fadeIn(10, function () {
                $('#myPopup').fadeOut(2500);
            });
            tempValue = btcValue;


        }

    }, 50);
    $("#initial-balance").on('submit', function (e) {
        e.preventDefault();
        btcBalance = btcAdd = +$('#initial-balance-input').val();
        $('#front-page').slideUp(1000, function () {
            $('#main-page').fadeIn(1500);
            $('#ticker').fadeIn(1500);
        });
        console.log(btcBalance);
    });
    $('#addition').on('submit', function (e) {
        e.preventDefault();
        btcBalance += btcAdd = +$('#add').val();

    });
    $('#add-one, #add-zerotwentyfive, #remove-one, #remove-zerotwentyfive').click(function () {
        btcBalance += btcAdd = +$(this).val();


    });
    $('#login').click(function () {
        btcBalance = +localStorage.getItem('lastBtcBalance');
        $('#front-page').slideUp(1000, function () {
            $('#main-page').fadeIn(1500);
            $('#ticker').fadeIn(1500);
        });
        var change = btcValue > +localStorage.getItem('lastBtcPrice') ? "made " : "lost ";
        $('.modal-content').append("<p> Welcome back, you've " + change + ((btcValue - (+localStorage.getItem('lastBtcPrice'))) * btcBalance).toFixed(2) + " since you've last logged in</p>");
        $('#myModal').css('display', 'block');

    });
    $('.close').click(function () {
        $('#myModal').css('display', 'none');
    });
    window.click(function (event) {
        if (event.target == modal) {
            $('#myModal').css('display', 'none');
        }
    });
    $(window).on('unload',function(){
        localStorage.setItem('lastBtcBalance', btcBalance);
        localStorage.setItem('lastBtcPrice', btcValue);
    });
});