(function ($) {

    "use strict";


    /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/

    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".mobail-menu .open-btn");
        var xbutton = $(".mobail-menu .navbar-toggler");

        openBtn.on("click", function (e) {
            e.stopImmediatePropagation();
            navbar.toggleClass("slideInn");
            xbutton.toggleClass("x-close");
            return false;
        })
    }

    toggleMobileNavigation();


    // Function for toggle class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function (e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                e.preventDefault();
                e.stopImmediatePropagation();
                $this.toggleClass("rotate");
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();


    // function for active menuitem
    function activeMenuItem($links) {
        var top = $(window).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height(),
            cur_pos = top + 2,
            sections = $("section"),
            nav = $links,
            nav_height = nav.outerHeight();


        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("current-menu-item");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current-menu-item");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("current-menu-item");
            }

        });
    }


    // smooth-scrolling
    function smoothScrolling($scrollLinks, $topOffset) {
        var links = $scrollLinks;
        var topGap = $topOffset;

        links.on("click", function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - topGap
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }




    $("body").on("click", function () {
        $('.navigation-holder').removeClass('slideInn');
    });
    $(".menu-close").on("click", function () {
        $('.navigation-holder').removeClass('slideInn');
    });
    $(".menu-close").on("click", function () {
        $('.open-btn').removeClass('x-close');
    });


    // tooltips

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function () {
                var height = $(this).position().top;
                var resize = height - $(window).scrollTop();
                var doParallax = -(resize / 5);
                var positionValue = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }

     /*------------------------------------------
        = HERO SLIDER
    -------------------------------------------*/

    if($(".hero-style-1") || $(".hero-style-2")) {
        // settings
       var $sliderDelay = 7500, 
           $sliderSpeed = 1000; 

       // animate stroke 
       var count = 0,
       $svg = $('.slider-nav-progress').drawsvg({
           duration: $sliderDelay,
           stagger: $sliderSpeed,
           reverse: true
       });

       function drawsvgSliderArrow() {
           $svg.drawsvg('animate');
       }

       var menu = [];
       jQuery('.swiper-slide').each( function(index){
           menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
       });
       var interleaveOffset = 0.5;
       var swiperOptions = {
           loop: false,
           speed: $sliderSpeed,
           parallax: true,
           autoplay: {
               delay: 6500,
               disableOnInteraction: false,
           },
           watchSlidesProgress: true,
           pagination: {
               el: '.swiper-pagination',
               clickable: true,
           },

           navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
           },

           on: {
               progress: function() {
                   var swiper = this;
                   for (var i = 0; i < swiper.slides.length; i++) {
                       var slideProgress = swiper.slides[i].progress;
                       var innerOffset = swiper.width * interleaveOffset;
                       var innerTranslate = slideProgress * innerOffset;
                       swiper.slides[i].querySelector(".slide-inner").style.transform =
                       "translate3d(" + innerTranslate + "px, 0, 0)";
                   }      
               },

               touchStart: function() {
                 var swiper = this;
                 for (var i = 0; i < swiper.slides.length; i++) {
                   swiper.slides[i].style.transition = "";
                 }
               },

               setTransition: function(speed) {
                   var swiper = this;
                   for (var i = 0; i < swiper.slides.length; i++) {
                       swiper.slides[i].style.transition = speed + "ms";
                       swiper.slides[i].querySelector(".slide-inner").style.transition =
                       speed + "ms";
                   }
               },

               slideChange: function() {
                   drawsvgSliderArrow();
               }
           },
       };

       var swiper = new Swiper(".swiper-container", swiperOptions);

       // DATA BACKGROUND IMAGE
       var sliderBgSetting = $(".slide-bg-image");
       sliderBgSetting.each(function(indx){
           if ($(this).attr("data-background")){
               $(this).css("background-image", "url(" + $(this).data("background") + ")");
           }
       });
   }



      /*** insert i tage after Slider SVG element for html validation error ***/
    if(($(".sw-ar-rt") && $(".sw-ar-lf")).length) {
        var swiperLfArr = $(".sw-ar-lf"),
            swiperRtArr = $(".sw-ar-rt");

        swiperLfArr.after('<i class="ti-angle-left"></i>');
        swiperRtArr.after('<i class="ti-angle-right"></i>');
    }

  
  


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function () {

                //active wow
                wow.init();

            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass: 'wow',      // default
        animateClass: 'animated', // default
        offset: 0,          // default
        mobile: true,       // default
        live: true        // default
    });



    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.site-header .navigation').length) {
        cloneNavForSticyMenu($('.site-header .navigation'), "sticky-header");
    }

    var lastScrollTop = '';

    function stickyMenu($targetMenu, $toggleClass, $topOffset) {
        var st = $(window).scrollTop();
        var mainMenuTop = $('.site-header .navigation');

        if ($(window).scrollTop() > 500) {
            if (st > lastScrollTop) {
                // hide sticky menu on scroll down
                $targetMenu.addClass($toggleClass);

            } else {
                // active sticky menu on scroll up
                $targetMenu.addClass($toggleClass);
            }

        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;


    }



    /*------------------------------------------
        = PARTNERS SLIDER
    -------------------------------------------*/
    if ($(".partners-slider").length) {
        $(".partners-slider").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            margin: 30,
            loop: true,
            autoplayHoverPause: true,
            dots: false,
            arrows: false,
            nav: false,
            responsive: {
                0: {
                    items: 2
                },

                550: {
                    items: 4
                },

                992: {
                    items: 5
                },

                1200: {
                    items: 7
                }
            }
        });
    }

    /*------------------------------------------
        = PARTNERS SLIDER
    -------------------------------------------*/
    if ($(".partners-slider-s2").length) {
        $(".partners-slider-s2").owlCarousel({
            autoplay: true,
            smartSpeed: 300,
            margin: 30,
            loop: true,
            autoplayHoverPause: true,
            dots: false,
            arrows: false,
            nav: false,
            responsive: {
                0: {
                    items: 3
                },

                550: {
                    items: 4
                },

                992: {
                    items: 4
                },

                1200: {
                    items: 8
                }
            }
        });
    }


    /*------------------------------------------
        = blog SLIDER
    -------------------------------------------*/
    if ($(".blog-slider".length)) {
        $(".blog-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed: 500,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="fi ti-arrow-left"></i>', '<i class="fi ti-arrow-right"></i>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },

                550: {
                    items: 1
                },

                992: {
                    items: 2
                },

                1200: {
                    items: 2
                }
            }
        });
    }


    /*------------------------------------------
        = Testimonial slider 1
    -------------------------------------------*/
    if ($(".transition-wrap").length) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots:true,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            dots:false,
            arrows: false,
        });
    }

    /*------------------------------------------
       = BACK TO TOP BTN SETTING
   -------------------------------------------*/
    $("body").append("<a href='#' class='back-to-top'><i class='ti-arrow-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 1000;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })


    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {

        preloader();

        toggleMobileNavigation();

        smallNavFunctionality();

        smoothScrolling($("#navbar > ul > li > a[href^='#'], .link-widget > ul > li > a[href^='#'] "), $(".site-header .navigation").innerHeight());
    });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function () {

        if ($(".site-header").length) {
            stickyMenu($('.site-header .navigation'), "sticky-on");
        }

        toggleBackToTopBtn();

        activeMenuItem($(".navigation-holder"));

    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function () {
        toggleClassForSmallNav();
        //smallNavFunctionality();

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function () {
            smallNavFunctionality();
        }, 200));
    });


})(window.jQuery);
