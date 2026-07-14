/*========================================
---------- [JS_INDEXING_START] -----------
==========================================
## [_DynamicCurrentMenuClass]
## [_Main_nav_menu]
## [_Sticky_header]
## [_Mobile_menu_list]
## [_Mobile_nav_toggler]
## [_Search_toggler]
## [_Wow_animation]
## [_Data_attribute]
## [_Language_btn]
## [_Progress_line]
## [_Odometer]
## [_Before_after_slider1]
## [_Nice_select]
## [_Accordion]
## [_js_tilt]
## [_video_popup]
## [_Home_banner_01]
## [_Home_banner_02]
## [_Testmonial_2col]
## [_Testmonial_3col]
## [_Projects_3col]
## [_Client_items]
## [_Sticky_header]
## [_Preloader]
==========================================
--------- [JS_INDEXING_END] --------------
==========================================
*/

(function ($) {
    "use strict";

    /*========== [_DynamicCurrentMenuClass] ============*/
    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];
        selector.find("li").each(function () {
            let anchor = $(this).find("a");
            if ($(anchor).attr("href") == FileName) {
                $(this).addClass("current");
            }
        });
        selector.children("li").each(function () {
            if ($(this).find(".current").length) {
                $(this).addClass("current");
            }
        });
        if ("" == FileName) {
            selector.find("li").eq(0).addClass("current");
        }
    }

    /*========== [_Main_nav_menu] ============*/
    if ($(".main-nav-menu").length) {
        // dynamic current class
        let mainNavUL = $(".main-nav-menu");
        dynamicCurrentMenuClass(mainNavUL);
    }
    if ($(".main-nav-menu").length && $(".mobile-nav-container").length) {
        $(".main-nav-menu").clone().removeClass('main-nav-menu').addClass('mobile-menu-list').appendTo('.mobile-nav-container');
    }
    /*========== [_Sticky_header] ============*/
    if ($(".sticky-header").length) {
        $(".sticky-header").clone().insertAfter('.sticky-header').addClass('sticky-header--cloned');
    }

    /*========== [_Mobile_menu_list] ============*/
    if ($(".mobile-menu-list").length) {
        let dropdownAnchor = $(".mobile-menu-list .menu-has-sub > a");
        dropdownAnchor.each(function () {
            let self = $(this);
            let toggleBtn = document.createElement("BUTTON");
            toggleBtn.setAttribute("aria-label", "dropdown toggler");
            toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
            self.append(function () {
                return toggleBtn;
            });
            self.find("button").on("click", function (e) {
                e.preventDefault();
                let self = $(this);
                self.toggleClass("expanded");
                self.parent().toggleClass("expanded");
                self.parent().parent().children("ul").slideToggle();
            });
        });
    }

    /*========== [_Image Hove Animation] ============*/
    if ($('.wx_hover_item').length) {
        let hoverAnimation__do = function (t, n) {
            let a = new hoverEffect({
                parent: t.get(0),
                intensity: t.data("intensity") || void 0,
                speedIn: t.data("speedin") || void 0,
                speedOut: t.data("speedout") || void 0,
                easing: t.data("easing") || void 0,
                hover: t.data("hover") || void 0,
                image1: n.eq(0).attr("src"),
                image2: n.eq(0).attr("src"),
                displacementImage: t.data("displacement"),
                imagesRatio: n[0].height / n[0].width,
                hover: !1
            });
            t.closest(".wx_hover_item").on("mouseenter", function () {
                a.next()
            }).on("mouseleave", function () {
                a.previous()
            })
        }
        let hoverAnimation = function () {
            $(".tp--hover-img").each(function () {
                let n = $(this);
                let e = n.find("img");
                let i = e.eq(0);
                i[0].complete ? hoverAnimation__do(n, e) : i.on("load", function () {
                    hoverAnimation__do(n, e)
                })
            })
        }
        hoverAnimation();
    }

    /*========== [_Mobile_nav_toggler] ============*/
    if ($(".mobile-nav-toggler").length) {
        $(".mobile-nav-toggler").on("click", function (e) {
            e.preventDefault();
            $(".mobile-nav-wrapper").toggleClass("expanded");
            $("body").toggleClass("locked");
        });
    }

    /*========== [_Search_toggler] ============*/
    if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
            e.preventDefault();
            $(".search-popup").toggleClass("active");
            $(".mobile-nav-wrapper").removeClass("expanded");
            $("body").toggleClass("locked");
        });
    }

    /*========== [_Wow_animation] ============*/
    if ($(".wow").length) {
        var wow = new WOW({
            boxClass: "wow", // animated element css class (default is wow)
            animateClass: "animated", // animation css class (default is animated)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    /*========== [_Data_attribute] ============*/
    var sectionBgImg = $(".bg-img, .feature-box-area-style1, .footer, section, div");
    sectionBgImg.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    /*========== [_Language_btn] ============*/
    $('.language-btn').on('click', function (event) {
        event.preventDefault();
        $(this).next('.language-dropdown').toggleClass('open');
    });

    /*========== [_Progress_line] ============*/
    if ($('.progress-line').length) {
        $('.progress-line').appear(function () {
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width', percent + '%');
        }, {
            accY: 0
        });
    }

    /*========== [_Odometer] ============*/
    // $('.odometer').appear(function (e) {
    // 	var odo = $(".odometer");
    // 	odo.each(function () {
    // 		var countNumber = $(this).attr("data-count");
    // 		$(this).html(countNumber);
    // 	});
    // });

    /* Init Counter */
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 6,
            time: 1500
        });
    }

    /*========= [_Nice_select] =========*/
    $('select').niceSelect();

    /*========= [_Accordion] =========*/
    $('.accordion-header').on('click', function (e) {
        var element = $(this).parent('.accordion-item');
        if (element.hasClass('active')) {
            element.removeClass('active');
            element.find('.accordion-body').removeClass('active');
            element.find('.accordion-body').slideUp(300, "swing");
        } else {
            element.addClass('active');
            element.children('.accordion-body').slideDown(300, "swing");
            element.siblings('.accordion-item').children('.accordion-body').slideUp(300, "swing");
            element.siblings('.accordion-item').removeClass('active');
            element.siblings('.accordion-item').find('.accordion-header').removeClass('active');
            element.siblings('.accordion-item').find('.accordion-body').slideUp(300, "swing");
        }
    });

    /*========= [_js_tilt] =========*/
    function onHoverthreeDmovement() {
        var tiltBlock = $('.js-tilt');
        if (tiltBlock.length) {
            $('.js-tilt').tilt({
                maxTilt: 15,
                perspective: 1200,
                glare: true,
                maxGlare: 0
            })
        }
    }
    onHoverthreeDmovement();

    /*========= [_video_popup] =========*/
    if ($(".video-popup").length) {
        $(".video-popup").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    }


    /*========= [_Testimonials Carousel Style 01] =========*/
    const testimonial_01_carousel = new Swiper(".testimonial_01_carousel", {
        // Optional parameters
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: true,
        speed: 2000,
        pagination: {
            el: '.testimonial_01_pagination',
            type: 'custom',
            clickable: true,
            renderCustom: function (swiper, current, total) {
                return current + '<span></span>' + (total);
            }
        },
        // Navigation arrows
        navigation: {
            nextEl: ".testimonial_01_button_next",
            prevEl: ".testimonial_01_button_prev"
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1400: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
        }
    });

    /*========= [_Testimonials Carousel Carousel 02] =========*/
    const testimonial_02_carousel = new Swiper(".testimonial_02_carousel", {
        // Optional parameters
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        effect: "cards",
        grabCursor: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".dot",
            clickable: true,
        },
        navigation: {
            nextEl: ".testimonial_02_button_prev",
            prevEl: ".testimonial_02_button_next-nexts",
        },
    });

    /*========= [_Project Carousel Style 01] =========*/
    const project_01_carousel = new Swiper(".project_01_carousel", {
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        speed: 2000,
        centeredSlides: true,
        pagination: {
            el: ".project_01_dot",
            clickable: true,
        },
        navigation: {
            nextEl: ".testimonial_02_button_prev",
            prevEl: ".testimonial_02_button_next-nexts",
        },
        breakpoints: {
            425: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });


    /*========= [_Clients Carousel Style 01] =========*/
    const clients_01_carousel = new Swiper(".clients_01_carousel", {
        slidesPerView: "auto",
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        speed: 6000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
        },
        breakpoints: {
            425: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 30,
            },
        }
    });

    /*========= [_Clients Carousel Style 02] =========*/
    const clients_02_carousel = new Swiper(".clients_02_carousel", {
        loop: true,
        spaceBetween: 120,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        speed: 2000,
        breakpoints: {
            425: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 80,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 120,
            },
        }
    });

    // MOUSE HOVER OBJECT PARALLAX
    $(".mouse-hover-parallax").each(function () {
        var s = $(this);

        function i(e) {
            var i = s.offset(),
                a = e.pageX - i.left,
                t = e.pageY - i.top,
                l = (a - s.width() / 2) * .2,
                r = (t - s.height() / 2) * .2;
            s.css({
                transform: "translate(" + l + "px, " + r + "px)",
                transition: "transform 0.1s ease-out"
            })
        }

        function a() {
            s.css({
                transform: "none",
                transition: "transform 0.3s ease-out"
            })
        }
        if (s.closest(".mouse-hover-parent-parallax").length) {
            var t = s.closest(".mouse-hover-parent-parallax");
            t.mousemove(function (e) {
                i(e)
            }), t.mouseleave(a)
        } else s.mousemove(i), s.mouseleave(a)
    });


    /*========= [_Sticky_header] =========*/
    $(window).on("scroll", function () {
        if ($(".sticky-header--cloned").length) {
            var headerScrollPos = 130;
            var stricky = $(".sticky-header--cloned");
            if ($(window).scrollTop() > headerScrollPos) {
                stricky.addClass("sticky-fixed");
            } else if ($(this).scrollTop() <= headerScrollPos) {
                stricky.removeClass("sticky-fixed");
            }
        }
        if ($(".scroll-to-top").length) {
            var strickyScrollPos = 100;
            if ($(window).scrollTop() > strickyScrollPos) {
                $(".scroll-to-top").fadeIn(500);
            } else if ($(this).scrollTop() <= strickyScrollPos) {
                $(".scroll-to-top").fadeOut(500);
            }
        }
    });

    /*========= [_Preloader] =========*/
    $(window).on("load", function () {
        $('#ctn-preloader').addClass('loaded');
        if ($('#ctn-preloader').hasClass('loaded')) {
            // Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
            $('#ctn-preloader').delay(200).fadeOut(500).queue(function () {
                $(this).remove();
            });
        }
    });

    var $items = $('.services_list_style1 .service_item');
    $items.eq(0).addClass('active');
    $items.on('click', '.service_head', function () {
        // toggle only the clicked item -- don't force-close the others,
        // since collapsing a panel above the viewport was what made the
        // page appear to jump/scroll upward on click
        $(this).closest('.service_item').toggleClass('active');
    });


    // hover reveal start
    const hoveritem = document.querySelectorAll(".portivio-hover-reveal-item");

    function moveImage(e, hoveritem, index) {
        const item = hoveritem.getBoundingClientRect();
        const x = e.clientX - item.x;
        const y = e.clientY - item.y;
        if (hoveritem.children[index]) {
            hoveritem.children[index].style.transform = `translate(${x}px, ${y}px)`;
        }
    }
    hoveritem.forEach((item, i) => {
        item.addEventListener("mousemove", (e) => {
            setInterval(moveImage(e, item, 1), 50);
        });
    });
    // hover reveal end

    // hover reveal with right side gap start
    const hoveritems2 = document.querySelectorAll(".portivio-hover-reveal-item2");

    function moveImage2(e, hoveritems2, index) {
        const item = hoveritems2.getBoundingClientRect();
        let x = e.clientX - item.x;
        let y = e.clientY - item.y;

        // Prevent image from reaching the right edge (100px gap)
        const maxX = item.width - 300;
        if (x > maxX) x = maxX;

        const maxY = item.height - 180;
        if (y > maxY) y = maxY;

        if (hoveritems2.children[index]) {
            hoveritems2.children[index].style.transform = `translate(${x}px, ${y}px)`;
        }
    }
    hoveritems2.forEach((item) => {
        item.addEventListener("mousemove", (e) => {
            requestAnimationFrame(() => moveImage2(e, item, 1));
        });
    });
    // hover reveal end


    // effectParallax
    if (!$(".parallax-img").length) return;
    const images = document.querySelectorAll(".parallax-img");
    new Ukiyo(images, {
        scale: 1.5,
        speed: 1.5,
        externalRAF: !1,
    });


})(jQuery);