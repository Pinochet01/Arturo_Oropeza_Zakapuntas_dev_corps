$(document).ready(function(){
    // --- Navigation & Scroll Logic ---
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top) 
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Initialize the solar calculator as soon as the page is ready
    if(document.getElementById('c-bill')) {
        solarCalc();
    }
});

// Mobile menu close on link click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggler:visible').click();
});
