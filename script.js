$(document).ready(function () {
    var btcBalance = 0;
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
    if (localStorage.getItem('lastBtcBalance') == null) {
        $('#login').hide();
    }


    window.setInterval(function () {

        btcValue = +$('.btcwdgt-body').find('.price').find('.p-wrap').find('p').html();
        var textColor = btcBalance >= tempBalance ? "style='color:greenyellow;'" : "style='color:red;'"
        var currentTime = pad(new Date().getHours().toString()) + ":" + pad(new Date().getMinutes().toString()) + ":" + pad(new Date().getSeconds());
        if (tempBalance != btcBalance) {
            $('#menu').html("<p>BTC Balance: " + btcBalance.toFixed(5) + "</p>" + "<p>USD Balance: " + (btcBalance * btcValue).toFixed(2) + "$</p>");
            $('#myPopup').html(btcAdd).css('color', btcAdd > 0 ? 'greenyellow' : 'red').css('bottom', '87%').css('font-size', '20px');
            $('#myPopup').fadeIn(10, function () {
                $('#myPopup').fadeOut(500);
            });
            if (balanceCounter < 9) {
                if (balanceCounter > 0) {
                    $('#balance-information').append("<p " + textColor + ">" + currentTime + " - " + btcBalance.toFixed(2) + "&#579;" + (btcBalance > tempBalance ? '&#x25B2;' : '&#x25BC;') + "</p>");
                }
                balanceCounter++;
            } else {
                balanceCounter = 1;
                $('#balance-information').html("<p style=\"font-size: 25px;\">BTC Balance Changes</p>");
                $('#balance-information').append("<p " + textColor + ">" + currentTime + " - " + btcBalance.toFixed(2) + "&#579;" + (btcBalance > tempBalance ? '&#x25B2;' : '&#x25BC;') + "</p>");
            }
            localStorage.setItem('lastBtcBalance', btcBalance);
            tempBalance = btcBalance;
        }
        if (tempValue != btcValue) {
            var textColor = btcValue >= tempValue ? "style='color:greenyellow;'" : "style='color:red;'"

            $('#menu').html("<p>BTC Balance: " + btcBalance.toFixed(5) + "&#579;" + "</p>" + "<p>USD Balance: " + (btcBalance * btcValue).toFixed(2) + "$</p>");
            $('#myPopup').html((btcValue * btcBalance - tempValue * btcBalance).toFixed(2) + "$").css('color', btcValue > tempValue ? 'greenyellow' : 'red').css('bottom', '70%').css('font-size', '20px');;
            $('#myPopup').fadeIn(10, function () {
                $('#myPopup').fadeOut(2500);
            });
            if (valueCounter < 9) {
                if (valueCounter > 0) {
                    $('#price-information').append("<p " + textColor + ">" + currentTime + " - " + btcValue.toFixed(2) + "$" + (btcValue > tempValue ? '&#x25B2;' : '&#x25BC;') + "</p>");
                }
                valueCounter++;
            } else {
                valueCounter = 1;
                $('#price-information').html("<p style=\"font-size: 25px;\">BTC Balance Changes</p>");
                $('#price-information').append("<p " + textColor + ">" + currentTime + " - " + btcValue.toFixed(2) + "$" + (btcValue > tempValue ? '&#x25B2;' : '&#x25BC;') + "</p>");

            }
            tempValue = btcValue;


        }

    }, 50);
    $("#initial-balance").on('submit', function (e) {
        e.preventDefault();
        if (!isNaN($('#initial-balance-input').val())) {
            btcBalance = btcAdd = +$('#initial-balance-input').val();
            $('#front-page').slideUp(1000, function () {
                $('#main-page, #ticker, #information, footer').fadeIn(1500);
            });
        } else {
            $('#login-error').toggle('slow', function () {
                setTimeout(function () {
                    $('#login-error').toggle('slow');
                }, 3000);
            });
        }
    });
    $('#addition').on('submit', function (e) {
        e.preventDefault();
        if (!isNaN($('#add').val())) {
            btcBalance += btcAdd = +$('#add').val();
        } else {
            $('#add-error').toggle('slow', function () {
                setTimeout(function () {
                    $('#add-error').toggle('slow');
                }, 3000);
            });

        }

    });
    $('#add-one, #add-zerotwentyfive, #remove-one, #remove-zerotwentyfive').click(function () {
        btcBalance += btcAdd = +$(this).val();


    });
    $('#login').click(function () {
        $('#login').hide();


        btcBalance = +localStorage.getItem('lastBtcBalance');
        $('#front-page').slideUp(1500, function () {
            $('#main-page, #ticker, #information, footer').fadeIn(1500);
        });
        var change = btcValue >= +localStorage.getItem('lastBtcPrice') ? "made " : "lost ";
        var oldPrice = +localStorage.getItem('lastBtcPrice');
        console.log(oldPrice);
        $('.modal-content').append("<p> Welcome back, you've " + change + ((btcValue - oldPrice) * btcBalance).toFixed(2) + "$ since you've last logged in</p>");
        $('#myModal').css('opacity', 0).slideDown(1500).animate({
            opacity: 1
        }, {
            queue: false,
            duration: 2500
        });

    });
    $('#myModal').click(function () {
        $('#myModal').fadeOut('slow');
    });

    function pad(n) {
        return n < 10 ? '0' + n : n
    }

    $(window).on('beforeunload', function () {
        localStorage.setItem('lastBtcBalance', btcBalance);
        localStorage.setItem('lastBtcPrice', btcValue);
    });
    $('.coinmarketcap-currency-widget').click(function () {
        $(this).find('a').on("click", function (e) {
            e.preventDefault();
        });
        var span_val = $(this).find("span:eq(1)").text().replace(/[^0-9\.]/g, '');
        var currencyName = $(this).find("span:eq(0)").text();
        var currencyValue = span_val.substring(0, span_val.length - 4);
        var calculateValue = (btcValue / (+currencyValue) * btcBalance).toFixed(2);
        $('#price-checker').fadeOut(500, function () {
            $('#price-checker').html("Your BTC is currently worth " + calculateValue + " " + currencyName).fadeIn(500);
        });
    });


});