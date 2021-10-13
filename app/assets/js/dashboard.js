
if ($(window).width() < 767) {
  $("#main-wrapper").addClass("mini-sidebar");
  $(".nav-toggler").click(function () {
      $("#main-wrapper").toggleClass("show-sidebar");
      $(".nav-toggler i").toggleClass("ti-menu");
      $(".nav-toggler i").addClass("ti-close");
  });
}
else {
   $("#main-wrapper").removeClass("mini-sidebar");
}
