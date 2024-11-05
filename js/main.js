(function ($, sr) {
        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        var debounce = function (func, threshold, execAsap) {
            var timeout;
            return function debounced() {
                var obj = this, args = arguments;

                function delayed() {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }
                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }
                timeout = setTimeout(delayed, threshold || 100);
            }
                ;
        }
        // smartresize
        jQuery.fn[sr] = function (fn) {
            return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
        }
        ;
    }
)(jQuery, 'smartresize');

$(document).ready(function () {
    ///////////////////////////////
    // Set Home Slideshow Height
    ///////////////////////////////
    function setHomeBannerHeight() {
        var windowHeight = jQuery(window).height();
        jQuery('#header').height(windowHeight);
    }

    ///////////////////////////////
    // Center Home Slideshow Text
    ///////////////////////////////
    function centerHomeBannerText() {
        var bannerText = jQuery('#header > .center');
        var bannerTextTop = (jQuery('#header').actual('height') / 2) - (jQuery('#header > .center').actual('height') / 2) - 20;
        bannerText.css('padding-top', bannerTextTop + 'px');
        bannerText.show();
    }

    setHomeBannerHeight();
    centerHomeBannerText();
    //Resize events
    jQuery(window).smartresize(function () {
        setHomeBannerHeight();
        centerHomeBannerText();
    });

    // function scroll() {
    // 	if ($(window).scrollTop() == 0 ) {
    // 		//$('.nav > li').removeClass('active');
    // 		console.log($(window).scrollTop());
    // 	} else {

    // 	}
    // }
    // document.onscroll = scroll;
    var $scrollDownArrow = $('#scrollDownArrow');
    var animateScrollDownArrow = function () {
        $scrollDownArrow.animate({
                top: 5,
            }
            , 400, "linear", function () {
                $scrollDownArrow.animate({
                        top: -5,
                    }
                    , 400, "linear", function () {
                        animateScrollDownArrow();
                    }
                );
            });
    }
    animateScrollDownArrow();
    //Set Down Arrow Button
    jQuery('#scrollDownArrow').click(function (e) {
        // e.preventDefault();
        jQuery.scrollTo("#story", 1000, {
                offset: -(jQuery('#header #menu').height()), axis: 'y'
            }
        );
    });
    jQuery('.nav > li > a, #logo a').click(function (e) {
        // e.preventDefault();

        jQuery.scrollTo(jQuery(this).attr('href'), 400, {
                offset: -(jQuery('#header #menu').height()), axis: 'y'
            }
        );
    });

});

var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
    }
}

function handleForm() {
    for (let element of document.getElementsByClassName("alert-box")) {
        element.style.display = "block";
    }
}

function shareForm() {
    var formData = document.getElementById("myForm")
    if (formData.checkValidity()) {
        var form = new FormData(formData);
        var name = form.get('name');
        var email = form.get('email');
        var phone = form.get('phone');
        var reservation_date = form.get('reservation_date');
        var number_of_guests = form.get('number_of_guests');
        var date = new Date(reservation_date.toString());

        var url = "https://wa.me/919880130646?text="
            + "Hello VG Caterers,%0a%0aI'm " + name + ",%0a"
            + "Phone: " + phone + "%0a"
            + "Email: " + email + "%0a"
            + "I want to reserve an order on : " + date.toDateString() + "%0a"
            + "Number of Guests : " + number_of_guests + "%0a%0a"
            + "(Click on SEND message) -->";

        window.open(url, '_blank').focus();
    } else {
        console.log("Form invalid");
    }
}

function gotowhatsapp() {

    var url = "https://api.whatsapp.com/send?phone=919880130646&text=Hello VG Caterers,%0a%0aI'm contacting%20from%20the%20website vgcatering.me,%0aI%20wanted%20to%20know%20the%20services%20offered%20by%20VG%20Catering%0a%0a(Click on SEND message) -->";

    window.open(url, '_blank').focus();
}