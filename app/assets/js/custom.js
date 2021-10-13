

/*Sticky Header*/
$(window).scroll(function(){
    var sticky = $('#site-header'),
        scroll = $(window).scrollTop()
    if (scroll >= 400) sticky.addClass('sticky');
    else sticky.removeClass('sticky');
});

/*menu nav*/
function openNav() {
  document.getElementById("mySidenav").classList.add("active");
  $('.close-overlay').removeClass("d-none");
}

function closeNav() {
  document.getElementById("mySidenav").classList.remove("active");
  $('.close-overlay').addClass("d-none");
}
$(".close-overlay").click(function(){
  document.getElementById("mySidenav").classList.remove("active");
  $('.close-overlay').addClass("d-none");
});

/*scrooltop*/
var moveTop = $('.movetop a');
moveTop.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

/*sliders*/
$('.listingslider').owlCarousel({
    loop:true,
    dots: false,
    margin:50,
    nav:true,
    navText: ["<img src='./assets/images/leftangle.png'>","<img src='./assets/images/rightangle.png'>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

/*custom fileupload*/
const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");

function uploads(clicked_id){
  realFileBtn.click();
}

realFileBtn.addEventListener("change", function() {
  if (realFileBtn.value) {
    customTxt.innerHTML = realFileBtn.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else {
    customTxt.innerHTML = "No file chosen, yet.";
  }
});
