var accordion = (function() {

    var $accordion = $('.js-accordion');
    var $accordion_header = $accordion.find('.js-accordion-header');
    var $accordion_item = $('.js-accordion-item');

    // default settings 
    var settings = {
        // animation speed
        speed: 400,

        // close all other accordion items if true
        oneOpen: false
    };

    return {
        // pass configurable object literal
        init: function($settings) {
            $accordion_header.on('click', function() {
                accordion.toggle($(this));
            });

            $.extend(settings, $settings);

            // ensure only one accordion is active if oneOpen is true
            if (settings.oneOpen && $('.js-accordion-item.active').length > 1) {
                $('.js-accordion-item.active:not(:first)').removeClass('active');
            }

            // reveal the active accordion bodies
            $('.js-accordion-item.active').find('> .js-accordion-body').show();
        },
        toggle: function($this) {

            if (settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
                $this.closest('.js-accordion')
                    .find('> .js-accordion-item')
                    .removeClass('active')
                    .find('.js-accordion-body')
                    .slideUp()
            }

            // show/hide the clicked accordion item
            $this.closest('.js-accordion-item').toggleClass('active');
            $this.next().stop().slideToggle(settings.speed);
        }
    }
})();

$(document).ready(function() {
    accordion.init({ speed: 300, oneOpen: true });
});


var $container = $('.dropdown-menu'),
    $list = $('.dropdown-menu ul'),
    listItem = $list.find('li');

$(".dropdown .title").click(function () {
  if( $container.height() > 0) {
    closeMenu(this);
  } else {
    openMenu(this);
  }
});

$(".dropdown-menu li").click(function () {
  closeMenu(this);
});

function closeMenu(el) {
  $(el).closest('.dropdown').toggleClass("closed").find(".title").text($(el).text());
  $container.css("height", 0);
  $list.css( "top", 0 );
}

function openMenu(el) {
  $(el).parent().toggleClass("closed");
  
  $container.css({
    height: 200
  })
  .mousemove(function(e) {
    var heightDiff = $list.height() / $container.height(),
        offset = $container.offset(),
        relativeY = (e.pageY - offset.top),
        top = relativeY*heightDiff > $list.height()-$container.height() ?
              $list.height()-$container.height() : relativeY*heightDiff;

    $list.css("top", -top);
  });
}

$(function() {
    var url = window.location.pathname,
        urlRegExp = new RegExp(url.replace(/\/$/, '') + "$");
    $('.accordion-body__contents ul li a').each(function() {
        if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
            $(this).addClass('active');
        }
    });
});


// tabbed content
    // http://www.entheosweb.com/tutorials/css/tabs.asp
    $(".tab_content").hide();
    $(".tab_content:first").show();

  /* if in tab mode */
    $("ul.tabs li").click(function() {
        
      $(".tab_content").hide();
      var activeTab = $(this).attr("rel"); 
      $("#"+activeTab).fadeIn();        
        
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

      $(".tab_drawer_heading").removeClass("d_active");
      $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
      
    });
    /* if in drawer mode */
    $(".tab_drawer_heading").click(function() {
      
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).fadeIn();
      
      $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
      
      $("ul.tabs li").removeClass("active");
      $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
    });
    
    
    /* Extra class "tab_last" 
       to add border to right side
       of last tab */
    $('ul.tabs li').last().addClass("tab_last");
    