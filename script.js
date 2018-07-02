$(document).ready(function () {
    $('#myPopup').hide();
    var btcBalance;
    var btcValue = +$('.btcwdgt-body').find('.price').find('.p-wrap').find('p').html();
    var btcAdd;
    var tempValue = btcValue;
    var tempBalance = btcBalance;
    var valueCounter = 0;
    var balanceCounter = 0;
    /* $.getJSON("https://blockchain.info/de/ticker", function (result) {
         btcValue = result.USD.last;
         console.log(btcValue);
     });*/

    $('#ticker').hide()
    window.setInterval(function () {
        btcValue = +$('.btcwdgt-body').find('.price').find('.p-wrap').find('p').html();
        if (tempBalance != btcBalance) {
            $('#menu').html("<p>BTC Balance: " + btcBalance.toFixed(5) + "</p>" + "<p>USD Balance: " + (btcBalance * btcValue).toFixed(2) + "$</p>");
            $('#myPopup').html(btcAdd).css('color', btcAdd > 0 ? 'greenyellow' : 'red').css('bottom', '87%').css('font-size','20px');
            $('#myPopup').fadeIn(10, function () {
                $('#myPopup').fadeOut(500);
            });
            var textColor = btcBalance > tempBalance ? "style='color:greenyellow;'" : "style='color:red;'"
            var currentTime = pad(new Date().getHours().toString()) + ":" + pad(new Date().getMinutes().toString()) + ":" + pad(new Date().getSeconds());
            if (balanceCounter < 9) {
                $('#balance-information').append("<p " + textColor + ">" + currentTime + " - " + btcBalance.toFixed(2) + "&#579;" + (btcBalance > tempBalance ? '&#x25B2;' : '&#x25BC;') + "</p>");
                balanceCounter++;
            } else {
                balanceCounter = 0;
                $('#balance-information').html("<p style=\"font-size: 25px;\">BTC Balance Changes</p>");
                $('#balance-information').append("<p " + textColor + ">" + currentTime + " - " + btcBalance.toFixed(2) + (btcBalance > tempBalance ? '&#x25B2;' : '&#x25BC;') + "</p>");
            }
            localStorage.setItem('lastBtcBalance', btcBalance);
            tempBalance = btcBalance;
        }
        if (tempValue != btcValue) {
            $('#menu').html("<p>BTC Balance: " + btcBalance.toFixed(5) + "&#579;" + "</p>" + "<p>USD Balance: " + (btcBalance * btcValue).toFixed(2) + "$</p>");
            $('#myPopup').html((btcValue * btcBalance - tempValue * btcBalance).toFixed(2) + "$").css('color', btcValue > tempValue ? 'greenyellow' : 'red').css('bottom', '70%').css('font-size','20px');;
            $('#myPopup').fadeIn(10, function () {
                $('#myPopup').fadeOut(2500);
            });
            if (valueCounter < 9) {
                var textColor = btcValue > tempValue ? "style='color:greenyellow;'" : "style='color:red;'";
                var currentTime = pad(new Date().getHours().toString()) + ":" + pad(new Date().getMinutes().toString()) + ":" + pad(new Date().getSeconds());
                $('#price-information').append("<p " + textColor + ">" + currentTime + " - " + btcValue.toFixed(2) + "$" + (btcValue > tempValue ? '&#x25B2;' : '&#x25BC;') + "</p>");
                valueCounter++;
            }
            else {
                valueCounter = 0;
                $('#price-information').html("<p style=\"font-size: 25px;\">BTC Balance Changes</p>");
                $('#price-information').append("<p " + textColor + ">" + currentTime + " - " + btcValue.toFixed(2) + "$" + (btcValue > tempValue ? '&#x25B2;' : '&#x25BC;') + "</p>");

            }
            localStorage.setItem('lastBtcPrice', btcValue);
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
        $('.modal-content').append("<p> Welcome back, you've " + change + ((btcValue - (+localStorage.getItem('lastBtcPrice'))) * btcBalance).toFixed(2) + "$ since you've last logged in</p>");
        $('#myModal').css('display', 'block');

    });
    $('#myModal').click(function () {
        $('#myModal').fadeOut('slow');
    });

    window.click(function () {
        $('#myModal').fadeOut('slow');
    });

    function pad(n) {
        return n < 10 ? '0' + n : n
    }

    $(window).on('beforeunload', function () {
        localStorage.setItem('lastBtcBalance', btcBalance);
        localStorage.setItem('lastBtcPrice', btcValue);
    });
});