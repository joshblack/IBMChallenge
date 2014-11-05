$(document).ready(function () {
    // Menu Operations
    $('#trigger-menu').on('click', function() {
        $('#menu').show();
        $('.container').addClass('menu-push');
    });

    $('#menu-close').on('click', function() {
        $('.container').removeClass('menu-push');
        setTimeout(function() {
            $('#menu').hide();
        }, 350);
    });

    // Search Operations
    $('#search').on('focus', function () {
        var $searchOptions = $('.search-options');

        $('.results').show();
        $searchOptions.show();
        $searchOptions.css('opacity', 1);

        $searchOptions.children().velocity('transition.slideLeftIn', { stagger: 100, drag: true });
    });

    $('#search').on('keyup', function () {
        $('.results').children().not('.search-options')
            .velocity('transition.slideUpBigIn', { stagger: 100, drag: true });
    });

    if ($('#results-close').length > 0) {
        $('#results-close').on('click', function () {
            $('.results').children().velocity('transition.slideLeftOut', { stagger: 100, drag: true });
        });
    }
});

// Trigger our animations once the window loads
$(window).load(function () {
    if ($('.gym-feature').length > 0) {

        setTimeout(function () {
            $('.gym-copy').velocity('transition.slideUpBigIn', { stagger: 100, drag: true });
            $('.icon-arrow-down').velocity('transition.slideUpBigIn', { drag: true });
        }, 1000);

        setTimeout(function () {
            $('.icon-arrow-down').velocity('callout.bounce', { drag: true });
        }, 1500);

        $('.icon-arrow-down').on('click', function () {
            $.scrollTo('section', 800);
        });
    }

    if ($('.about').length > 0) {
        $('.about').children().hide();
        $('.about').show();
        $('.logo p').hide();

        setTimeout(function () {
            $('.logo p').velocity('transition.slideLeftIn', { drag: true });
        }, 300);

        setTimeout(function () {
            $('.about.content').children()
                .velocity('transition.slideUpBigIn', { 
                    stagger: 100, 
                    drag: true,
                    complete: function () {
                        $('footer').show();
                    }
                });
        }, 600)
    }

    if ($('.started.content').length > 0) {
        var $started = $('.started'),
            $alternative = $('.alternative'),
            $results = $('.results');

        // Get ready to animate started's children
        $started.children().hide();
        $started.show();

        // Same for alternative
        $alternative.children().hide();
        $alternative.show();

        $results.children().hide();
        $results.find('.search-options').children().hide();
        $results.find('.search-options').show();

        setTimeout(function () {
            $('.logo p').velocity('transition.slideLeftIn', { drag: true });
        }, 300);

        setTimeout(function () {
            $started.children().velocity('transition.slideUpBigIn', { stagger: 50, drag: true });
            $alternative.children().velocity('transition.slideUpBigIn', { stagger: 50, drag: true });
        }, 600)

        setTimeout(function () {
            $('footer').velocity('transition.slideUpBigIn', { stagger: 100, drag: true });
        }, 2000);
    }
});



