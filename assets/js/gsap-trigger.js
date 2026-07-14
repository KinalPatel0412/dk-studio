(function($) {
    "use strict";
    // Get Device width
    let device_width = window.innerWidth

    /*-------------------------------------
      Split Text Reveal Animation
    -------------------------------------*/
    if ($(".webex_text_reveal").length) {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        var reveal_1 = new SplitText(".webex_text_reveal", {
            type: "lines"
        });
        reveal_1.lines.forEach(function(target) {
            gsap.to(target, {
                backgroundPositionX: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: target,
                    scrub: 1,
                    start: "top 85%",
                    end: "bottom center"
                }
            });
        });
    }

    /*-------------------------------------
      Text Effect Animation
    -------------------------------------*/
    if ($(".text-effect").length) {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        $(".text-effect").each(function(index, el) {
            var splitText = new SplitText(el, {
                type: "lines,words,chars",
                linesClass: "split-line"
            });

            gsap.set(splitText.chars, {
                opacity: 0.3,
                x: -7
            });

            gsap.to(splitText.chars, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    end: "top 60%",
                    scrub: 1,
                    markers: false
                }
            });
        });
    }

    /*-------------------------------------
      Smooth Scrolling
    -------------------------------------*/
    if ($("#smooth-wrapper").length && $("#smooth-content").length) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

        gsap.config({
            nullTargetWarn: false
        });

        const smoother = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: false,
            ignoreMobileResize: true,
            // by default ScrollSmoother force-scrolls to center any element that
            // receives focus (a11y helper) -- clicking plain divs like the
            // accordion header still shifts browser focus to <body> and was
            // triggering this, yanking the page toward the top. Disable it.
            onFocusIn: false
        });

        // Smooth scroll for in-page section navigation (nav, buttons, mobile menu)
        $(document).on("click", 'a[href^="#"]', function(e) {
            const hash = $(this).attr("href");
            if (hash === "#" || hash.length < 2) return;
            const target = document.querySelector(hash);
            if (!target) return;
            e.preventDefault();
            smoother.scrollTo(target, true, "top 80px");
            // close mobile menu if open
            $(".mobile-nav-wrapper").removeClass("expanded");
            $("body").removeClass("locked");
        });
    }

    /*-------------------------------------
      Portfolio Extend Animation
    -------------------------------------*/
    const pbmitElm = gsap.utils.toArray(".portivio-extend-animation");
    if (pbmitElm.length) {
        ScrollTrigger.matchMedia({
            "(min-width: 1200px)": function() {
                pbmitElm.forEach(function(section, i) {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "top 50%",
                            end: "+=400px",
                            scrub: 1,
                            id: "pbmit-" + i // unique ID per section
                        },
                        defaults: {
                            ease: "none"
                        }
                    }).fromTo(
                        section, {
                            clipPath: "inset(0% 16% 0% 16% round 6px)"
                        }, {
                            clipPath: "inset(0% 0% 0% 0% round 6px)",
                            duration: 1.5
                        }
                    );
                });
            },
            "(max-width: 1199px)": function() {
                ScrollTrigger.getAll().forEach(function(st) {
                    if (st.trigger && st.trigger.classList.contains("portivio-extend-animation")) {
                        st.kill();
                    }
                });
            }
        });
    }

    /*-------------------------------------
  Project Section - Pinned Title
	-------------------------------------*/
    if ($(".project_section_area").length) {
        ScrollTrigger.matchMedia({
            "(min-width: 769px)": function() {
                gsap.timeline({
                        scrollTrigger: {
                            trigger: ".project_section_area",
                            start: "top center-=200",
                            end: "bottom 60%",
                            pin: ".pined_title_part",
                            pinSpacing: false,
                            scrub: 1,
                            markers: false
                        }
                    })
                    .to(".pined_title_part", {
                        scale: 1.1,
                        duration: 0.5
                    })
                    .to(".pined_title_part", {
                        scale: 1.2,
                        duration: 2
                    })
                    .to(".pined_title_part", {
                        scale: 1,
                        opacity: 0,
                        duration: 3
                    }, "+=2");
            },

            "(max-width: 768px)": function() {
                // kill all pinned title triggers when screen <= 768
                ScrollTrigger.getAll().forEach(function(st) {
                    if (st.trigger && st.trigger.classList.contains("project_section_area")) {
                        st.kill();
                    }
                });
            }
        });
    }


    /*-------------------------------------
  Pricing Style 01 - Pinned Title (Home 02)
	-------------------------------------*/
    if ($(".pricing_01_pin_section").length) {
        ScrollTrigger.matchMedia({
            "(min-width: 1024px)": function() {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".pricing_01_pin_section",
                        start: 'top center-=350',
                        end: "bottom 65%",
                        pin: ".pinned_title_box",
                        markers: false,
                        pinSpacing: false,
                        scrub: 1,
                    }
                })
            },

            "(max-width: 1023px)": function() {
                // kill all pinned title triggers when screen <= 1023
                ScrollTrigger.getAll().forEach(function(st) {
                    if (st.trigger && st.trigger.classList.contains("pricing_01_pin_section")) {
                        st.kill();
                    }
                });
            }
        });
    }

    /*-------------------------------------
  Pricing Style 02 - Pinned Cards (Home 02)
	-------------------------------------*/
    let itemMoveTop = document.querySelector(".pin_style_01_cards");

    if (itemMoveTop) {
        ScrollTrigger.matchMedia({
            "(min-width: 1024px)": function() {
                let cards = gsap.utils.toArray(".pin_style_01_cards .pinned_item");
                let stickDistance = 0;

                let firstCardST = ScrollTrigger.create({
                    trigger: cards[0],
                    start: "top center-=230",
                });

                let lastCardST = ScrollTrigger.create({
                    trigger: cards[cards.length - 1],
                    start: "top center-=230",
                });

                cards.forEach((card, index) => {
                    // Optional: adjust 0.05 for stagger scaling effect

                    let scaleDown = gsap.to(card, {
                        transformOrigin: "50% center",
                        ease: "none",
                    });

                    ScrollTrigger.create({
                        trigger: card,
                        start: "top center-=230",
                        end: () => lastCardST.start + stickDistance,
                        pin: true,
                        pinSpacing: false,
                        animation: scaleDown,
                        toggleActions: "restart none none reverse",
                        id: "pricing-card-" + index, // assign ID to control only these triggers
                    });
                });
            },

            "(max-width:1023px)": function() {
                // Kill only pricing card triggers, not all
                ScrollTrigger.getAll()
                    .filter(st => st.vars.id && st.vars.id.startsWith("pricing-card-"))
                    .forEach(st => st.kill(true));
            },
        });
    }

    // Circle button hover animation
    var hoverBtns = gsap.utils.toArray(".xotech_btn_block");
    const hoverBtnItem = gsap.utils.toArray(".circle_btn_item");
    hoverBtns.forEach((btn, i) => {
        $(btn).mousemove(function(e) {
            callParallax(e);
        });

        function callParallax(e) {
            parallaxIt(e, hoverBtnItem[i], 80);
        }

        function parallaxIt(e, target, movement) {
            var $this = $(btn);
            var relX = e.pageX - $this.offset().left;
            var relY = e.pageY - $this.offset().top;

            gsap.to(target, 0.5, {
                x: ((relX - $this.width() / 2) / $this.width()) * movement,
                y: ((relY - $this.height() / 2) / $this.height()) * movement,
                ease: Power2.easeOut,
            });
        }
        $(btn).mouseleave(function(e) {
            gsap.to(hoverBtnItem[i], 0.5, {
                x: 0,
                y: 0,
                ease: Power2.easeOut,
            });
        });
    });

    // button hover animation
    $('.circle_hover_btn').on('mouseenter', function(e) {
        var x = e.pageX - $(this).offset().left;
        var y = e.pageY - $(this).offset().top;
        $(this).find('.circle_btn_dot').css({
            top: y,
            left: x
        });
    });

    $('.circle_hover_btn').on('mouseout', function(e) {
        var x = e.pageX - $(this).offset().left;
        var y = e.pageY - $(this).offset().top;

        $(this).find('.circle_btn_dot').css({
            top: y,
            left: x
        });
    });

    //Image Scalling Effect
    if ($(".scale-img").length > 0) {
        var scale = document.querySelectorAll(".scale-img");
        var image = document.querySelectorAll(".scale-img img");
        scale.forEach((item) => {
            gsap.to(item, {
                scale: 1,
                duration: 1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play reverse play reverse",
                },
            });
        });
        image.forEach((image) => {
            gsap.set(image, {
                scale: 1.5,
            });
            gsap.to(image, {
                scale: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: image,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play reverse play reverse",
                },
            });
        });
    }

    //Bounce Animation Effect
    const wt_bounce_anim = gsap.utils.toArray(".bounce_anim_wrap .bounce_anim_item");
    if (wt_bounce_anim.length > 0) {
        // Initial state
        gsap.set(wt_bounce_anim, {
            y: -100,
            opacity: 0
        });

        if (device_width < 1023) {
            // Mobile / Tablet
            wt_bounce_anim.forEach((item) => {
                let counterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top center+=200",
                    }
                });

                counterTl.to(item, {
                    y: 0,
                    opacity: 1,
                    ease: "bounce",
                    duration: 1.2,
                });
            });
        } else {
            // Desktop
            gsap.to(wt_bounce_anim, {
                scrollTrigger: {
                    trigger: ".bounce_anim_wrap",
                    start: "top center+=300",
                },
                y: 0,
                opacity: 1,
                ease: "bounce",
                duration: 1.2,
                stagger: {
                    each: 0.4,
                }
            });
        }
    }

    //Award rubber Animation Effect
    const aw = gsap.matchMedia();
    aw.add("(min-width: 991px)", () => {
        const awardItems = document.querySelectorAll('.award_style1');
        awardItems.forEach(function(div) {
            div.addEventListener('mouseenter', function() {
                gsap.to(div, {
                    width: '100%',
                    duration: 2,
                    ease: 'expo.out'
                });
            });
            div.addEventListener('mouseleave', function() {
                gsap.to(div, {
                    width: '85%',
                    duration: 2,
                    ease: 'expo.out'
                });
            });
        })
    });


})(jQuery);