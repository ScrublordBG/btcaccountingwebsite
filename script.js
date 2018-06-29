var balance;
$("#money").on('submit',function(e){
    e.preventDefault();
    balance = +$('#money-input').val();
    $('#test').html(balance);
    console.log(balance);
});
$('#deduction').on('submit',function(e){
    e.preventDefault();
    balance -= +$('#deduct').val();
    $('#test').html(balance);
});
$(document).ready(function(){
    console.log("ready");
});