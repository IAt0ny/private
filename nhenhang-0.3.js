// ==UserScript==
// @name         Lam giau kho vl
// @version      0.3
// @description  Try to take over the world!
// @author       Hoa Eng Tuc ft Toan Pho
// @include https://wake.unixcoin.com/ico
// @include https://wake.unixcoin.com/
// @grant        none
// @require       https://cdn.rawgit.com/antimatter15/ocrad.js/abae4b3b/ocrad.js
// ==/UserScript==

$('body').append('<input type="button" value="Test" id="btn_test">');
$("#btn_test").css("position", "fixed").css("top", 100).css("left", 20);
$('body').append('<input type="button" value="Run" id="btn_run">');
$("#btn_run").css("position", "fixed").css("top", 150).css("left", 20);
$('body').append('<input type="button" value="Heck" id="btn_heck">');
$("#btn_heck").css("position", "fixed").css("top", 200).css("left", 20);
$('body').append('<div id="captcha_ocr">  </div>');
$("#captcha_ocr").css("position", "fixed").css("top", 250).css("left", 20);
$('body').append('<div id="count_down">  </div>');
$("#count_down").css("position", "fixed").css("top", 300).css("left", 20);
var time_stamp = 0;

$('#btn_test').click(function(){
    document.getElementsByClassName("app-buy-all")[0].click();
    setTimeout(click_buy,200);
});

$('#btn_run').click(function(){
    setInterval(timer, 100);
});

$('#btn_heck').click(function(){
    heck_coin();
});

function ocr_captcha()
{
    var img = new Image();
    img.src = $('#captcha-img').attr('src');
    OCRAD(img, {
        numeric: true
    }, function(text){
        $('[name="captcha_key2"]').val(text);
        $("#captcha_ocr").html(('Captcha: ' +text));
    });
}

function click_buy()
{
    document.getElementsByClassName("app-buy-all")[0].click();
    $('button')[1].click();
}

function heck_coin()
{
    $.post('ico', {
        unx_amount: $('#unx_amount').val(),
        captcha_secret: $('[name="captcha_secret"]').val(),
        captcha_key2: $('[name="captcha_key2"]').val(),
        ahihi : Math.random(),
    }, function (res) {
        setTimeout(function () {
            $('#ico-form [type="submit"]').prop('disabled', false);
        }, 500);
        $('#ico-form-loading').addClass('hidden');

        if (res.success) {
            $('#captcha-img').attr('src', '/img/captchas/' + res.captcha_secret + '.png');
            $('[name="captcha_secret"]').val(res.captcha_secret);
            $('[name="captcha_key2"]').val('');

            $('#ico-form-success').removeClass('hidden').html(res.success);
            getUserInfo();
            setTimeout(function () {
                getIcoInfo();
                getUserInfo();
            }, 6666);
        }

        if (res.error) {
            $('#ico-form-error').removeClass('hidden').html(res.error);

            if (res.captcha_secret) {
                $('#captcha-img').attr('src', '/img/captchas/' + res.captcha_secret + '.png');
                $('[name="captcha_secret"]').val(res.captcha_secret);
                $('[name="captcha_key2"]').val('');
            }
        }
    }).fail(function () {
        $('#ico-form-loading').addClass('hidden');
        $('#ico-form-error').removeClass('hidden').html('Today ICO is sold out.');
    });
}

function timer()
{
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var count_down = time_stamp- epoch;
    //$('#count_down').html(count_down);
    var numhours = Math.floor((count_down % 86400) / 3600);
    var numminutes = Math.floor(((count_down % 86400) % 3600) / 60);
    var numseconds = ((count_down % 86400) % 3600) % 60;
    $('#count_down').html((numhours + " hours " + numminutes + " minutes " + numseconds + " seconds"));
    if ( count_down>0 && count_down % 116 ==0) {
        location.reload();
    }
    if ( count_down == 1 ) {
        setTimeout(click_buy,200);
    }
    if ( count_down == 7 ) {
        setTimeout(click_buy,200);
    }
    if ( count_down == -4 ) {
        setTimeout(click_buy,200);
    }
}

function getTime()
{
    time_stamp = next_ico_date.from_timestamp/1000;
}

$(document).ready(function() {
    setTimeout(getTime,5000);
    window.scrollTo(0, 1400);
    setTimeout(ocr_captcha,3000);
    setInterval(timer, 100);
});

