(function($) {
    "use strict";
    gsap.registerPlugin(SplitText);

    $(document).ready(function() {
        let addAnimation = function() {
            $(".animation-style4 .anim-title").each(function(index) {
                const textInstance = $(this);
                const text = new SplitText(textInstance, {
                    type: "chars",
                });

                let letters = text.chars;

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: textInstance,
                        start: "top 85%",
                        end: "top 85%",
                        onComplete: function() {
                            textInstance.removeClass(".animation-style4 .anim-title");
                        }
                    }
                });

                tl.set(textInstance, {
                    opacity: 1
                }).from(letters, {
                    duration: .5,
                    autoAlpha: 0,
                    x: 50,
                    // scaleY: 0,
                    // skewX: 50,
                    stagger: {
                        amount: 1
                    },
                    ease: "back.out(1)"
                });
            });
        };

        addAnimation();

        window.addEventListener("resize", function(event) {
            if ($(window).width() >= 992) {
                addAnimation();
            }
        });

    });

    $(document).ready(function() {
        let addAnimation = function() {
            $(".animation-style5 .anim-title").each(function(index) {
                const text = new SplitType($(this), {
                    types: "lines, words",
                    lineClass: "word-line"
                });
                let textInstance = $(this);
                let line = textInstance.find(".word-line");
                let word = line.find(".word");
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: textInstance,
                        start: "top 85%",
                        end: "top 85%",
                        onComplete: function() {
                            $(textInstance).removeClass("animation-style5 .anim-title");
                        }
                    }
                });
                tl.set(textInstance, {
                    opacity: 1
                }).from(word, {
                    y: "100%",
                    skewX: "-5",
                    duration: 2,
                    stagger: 0.09,
                    ease: "expo.out"
                });
            });
        };
        addAnimation();
        window.addEventListener("resize", function(event) {
            if ($(window).width() >= 992) {
                addAnimation();
            }
        });
    });

    $(document).ready(function() {
        $(".animation-style6 .anim-title").each(function(index) {
            const textInstance = $(this);
            const text = new SplitText(textInstance, {
                type: "chars",
            });

            let letters = text.chars;

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: textInstance,
                    start: "top 85%",
                    end: "top 85%",
                    onComplete: function() {
                        textInstance.removeClass("animation-style6 .anim-title");
                    }
                }
            });

            tl.set(textInstance, {
                opacity: 1
            }).from(letters, {
                duration: .4,
                autoAlpha: 0,
                y: 50,
                // scaleX: 0,
                // skewX: 50,
                stagger: {
                    amount: 1
                },
                ease: "back.out(0)"
            });
        });
    });

    function pbmit_title_animation() {

        ScrollTrigger.matchMedia({
            "": function() {

                var pbmit_var = jQuery('.anim-heading, .anim-heading-subheading');
                if (!pbmit_var.length) {
                    return;
                }
                const quotes = document.querySelectorAll(".anim-title");

                quotes.forEach(quote => {

                    //Reset if needed
                    if (quote.animation) {
                        quote.animation.progress(1).kill();
                        quote.split.revert();
                    }

                    var getclass = quote.closest('.anim-heading-subheading, .anim-heading').className;
                    var animation = getclass.split('animation-');
                    if (animation[1] == "style4") return

                    quote.split = new SplitText(quote, {
                        type: "lines,words,chars",
                        linesClass: "split-line"
                    });
                    gsap.set(quote, {
                        perspective: 400
                    });
                    if (animation[1] == "style1") {
                        gsap.set(quote.split.chars, {
                            opacity: 0,
                            x: "50"
                        });
                    }
                    if (animation[1] == "style2") {
                        gsap.set(quote.split.chars, {
                            opacity: 0,
                            y: "90%",
                            rotateX: "-40deg"
                        });
                    }
                    if (animation[1] == "style3") {
                        gsap.set(quote.split.chars, {
                            opacity: 0,
                        });
                    }
                    quote.animation = gsap.to(quote.split.chars, {
                        scrollTrigger: {
                            trigger: quote,
                            start: "top 90%",
                        },
                        x: "0",
                        y: "0",
                        rotateX: "0",
                        opacity: 1,
                        duration: 1,
                        ease: Back.easeOut,
                        stagger: .02
                    });
                });
            },
        });
    }

    // on ready
    jQuery(document).ready(function() {
        pbmit_title_animation();
    });
    // on resize
    jQuery(window).resize(function() {
        pbmit_title_animation();
    });

    // MOUSE HOVER OBJECT PARALLAX
    $(".mouse-hover-parallax").each(function() {
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
            t.mousemove(function(e) {
                i(e)
            }), t.mouseleave(a)
        } else s.mousemove(i), s.mouseleave(a)
    });

    // ScrollSmoother.create({
    //   smooth: 1,
    //   effects: true,
    // });

})(jQuery);