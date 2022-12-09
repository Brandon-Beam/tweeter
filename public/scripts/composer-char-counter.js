$(document).ready(function () {
  $("textarea").keyup(function () {
    $(this).parent("form").find(".counter").text(140 - ($(this).val().length));
    if ($(this).val().length > 140) {
      $(this).parent("form").find(".counter").addClass("invalid");
    }
  });
});
