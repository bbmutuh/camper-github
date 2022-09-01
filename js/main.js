'use strict'

$(function (){
    $('.menu-item:not(.disabled)').click(function (){
        var itemId = $(this).attr('data-menu-item-id');
        var menuId = $(this).closest('[data-menu-id]').attr('data-menu-id');

        $(this).closest('.menu-container').find('.menu-item').removeClass('active');
        $(this).addClass('active');

        $('[data-menu-content-id="'+menuId+'"] .content-item').removeClass('active');
        $('.content-item[data-menu-content="'+itemId+'"]').addClass('active');
    });

    $('[data-menu-content-id="building"] .content-item').map(function (){
        var currentContent = $(this);
        var contentId = $(this).attr('data-menu-content');

        if (currentContent.is(':empty')) {
            $('[data-menu-content-id="building"] .menu-item[data-menu-item-id="'+contentId+'"]').addClass('disabled empty');
        }
    });

    $('.building-zone').map(function (){
        var currentZone = $(this);

        currentZone.css({
            'width': currentZone.attr('data-width')*2 +'px',
            'height': currentZone.attr('data-height')*2 +'px',
            'top': currentZone.attr('data-pos-top')*2 +'px',
            'left': currentZone.attr('data-pos-left')*2 +'px'
        });
        currentZone.attr('title','w' + currentZone.attr('data-width') + ' h' + currentZone.attr('data-height'));
    });

    $('[data-zone-menu]').hover(
        function(){
            $('.building-zone[data-zone-id="'+$(this).attr('data-zone-menu')+'"]').addClass('hover');
            $('.popup[data-zone-id="'+$(this).attr('data-zone-menu')+'"]').addClass('hover');
        }, function(){
            $('.building-zone[data-zone-id="'+$(this).attr('data-zone-menu')+'"]').removeClass('hover');
            $('.popup[data-zone-id="'+$(this).attr('data-zone-menu')+'"]').removeClass('hover');
        }
    );

    $('[data-zone-menu="multiple"]').hover(
        function(){
            $(this).next().find('[data-zone-menu]').trigger('mouseover');
        }, function(){
            $(this).next().find('[data-zone-menu]').trigger('mouseout');
        }
    );

    $('.building-zone').hover(
        function(){
            $('.popup[data-zone-id="'+$(this).attr('data-zone-id')+'"]').addClass('hover');
        }, function(){
            $('.popup[data-zone-id="'+$(this).attr('data-zone-id')+'"]').removeClass('hover');
        }
    );

    $('.accordion-button').click(function (){
        $(this).toggleClass('active');
    });

    $('.area-menu-item.parent').map(function (){
        var totalPrice = 0;
        var totalWeight = 0;
        $(this).next('.accordion-body').find('[data-price]').map(function (i){
            var thisPrice = parseInt($(this).text());
            totalPrice += thisPrice;
        });
        $(this).next('.accordion-body').find('[data-weight]').map(function (i){
            var thisWeight = parseInt($(this).text());
            totalWeight += thisWeight;
        });
        $(this).find('[data-total-price]').html(totalPrice);
        $(this).find('[data-total-weight]').html(totalWeight);
    });

    setTimeout(function (){
        var totalPrice = 0;
        var totalWeight = 0;
        $('.area-menu-item.parent').map(function (){

            $(this).find('[data-total-price]').map(function (i){
                var thisPrice = parseInt($(this).text());
                totalPrice += thisPrice;
            });
            $(this).find('[data-total-weight]').map(function (i){
                var thisWeight = parseInt($(this).text());
                totalWeight += thisWeight;
            });
            $('[data-super-total-price]').html(totalPrice);
            $('[data-super-total-weight]').html(totalWeight);
        });
    },100);

    $('.menu-item[data-menu-item-id="building"]').trigger('click');
    $('.menu-item[data-menu-item-id="outside-right"]').trigger('click');
});

