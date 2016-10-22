// show-hide form for adding new skills
$("#add-skills-button").click(function () {
    $("#add-skill-form").toggle();
});

// add new skill if form is valid
$('#add-skill-form').verify({
    'beforeSubmit': function(form, result) {
        if (result) {
            var skillName = $("#skill-name").val();
            var skillRange = $("#skill-range").val();
            var skillObject = $(".hidden").clone();
            skillObject.find(".skill-label").text(skillName);
            skillObject.width(skillRange + "%");
            skillObject.removeClass("hidden");
            $(".skills-list").append(skillObject);
        }
        return false;
    }
});

//move to select menu block and add active
$('.menu-link').on('click', function () {
    $('.menu-link').removeClass("active-menu");
    var href = $(this).attr("href");
    var block = $(".container").find(href);
    $(this).addClass("active-menu");
    $("html, body").animate({
        scrollTop: $(block).offset().top
    }, 500);
    return false;
});

//open-close sidebar
$('.menu-button').on('click', function() {
    $(".sidebar").toggleClass('active');
    $('.content-wrapper').toggleClass('active');
});

// init Isotope
var $grid = $('.portfolio-list').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
});
// change isotope filtering for portfolio block
$('.tab-link').click(function() {
    $(".tab-link").removeClass("active-menu");
    $(this).addClass("active-menu");
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
});

// event for scroll bottom in education block
$(".education-timestamp").scroll(function(){
    if($(this)[0].scrollHeight - $(this).scrollTop() === $(this).outerHeight()) {
        loadHistory();
    };
});