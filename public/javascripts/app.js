$(document).ready(function() {
  // Grab DOM elements
  var $section = $('section');

  // Enable long-polling to get text responses.
  // When we get a text, append and scroll.
  (function poll(){
    $.ajax({ url: "/getResponses", success: function (data){
      var text = data.Body;
      $section.append('<div class="from-them"><p>' + text + '</p></div>')
      $section.append('<div class="clear"></div>');
      $section.animate({ scrollTop: $section.height() });
    }, dataType: "json", complete: poll, timeout: 30000 });
  })();

  // Hookup events for text sending
  $("#textForm").submit(function(event) {
    event.preventDefault();

    var $textInput = $('.textInput');
    var text = $textInput.val();
    $textInput.val('');

    // Don't send blank texts.
    if (text === '') return;

    $.post('/sendText', {
      to: '+14155039174',
      body: text,
    });

    $section.append('<div class="from-me"><p>' + text + '</p></div>')
    $section.append('<div class="clear"></div>');
    $section.animate({ scrollTop: $section.height() });
  });
});