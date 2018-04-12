$(document).ready(function(){
    var H = document.documentElement.scrollHeight || document.body.scrollHeight;
    $("#page-wrapper").css('min-height',(H-60) + 'px');
});
$(window).resize(function(){
    var H = document.documentElement.scrollHeight || document.body.scrollHeight;
    $("#page-wrapper").css('min-height',(H-60) + 'px');
});