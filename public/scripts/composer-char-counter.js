$(document).ready(function() {
  
  $('#tweet-text').on('input', function() {
    const charLimit = 140;
    const charCount = this.value.length;

    if (charCount > 115) {
      $("output").addClass("warn");
    } else {
      $("output").removeClass("warn");
    }
    if (charCount > charLimit) {
      $("output").addClass("negative-count");
    } else {
      $("output").removeClass("negative-count");
    }

    $("output").text(charLimit - charCount);

  });
  
});