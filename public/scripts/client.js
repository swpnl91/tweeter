/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  $('#error-charCount').hide();
  $('#error-blank').hide();

  // HTML content check for tweets. Allows HTML code to be posted in tweets.
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadTweets = () => {
    $.ajax({
      url: 'http://localhost:8080/tweets/',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }
    });
  };

  loadTweets();
    
  
  const renderTweets = function (tweets) {
    $('.tweet-container').empty();                 // ??????
    for (const tweet of tweets) {
      const $tweetr = createTweetElement(tweet);
      $('.tweet-container').prepend($tweetr);
    }
  };


  const createTweetElement = function(tweet) {

    const time = timeago.format(tweet.created_at); 

    const $tweet = 
      $(`<br><article class="tweet-post"> 
      <header>
        <div class="user">
          <img src=${tweet.user.avatars}>
          <h3>${tweet.user.name}</h3>
        </div>
        <h4>${tweet.user.handle}</h4>
      </header>
       <p>${escape(tweet.content.text)}</p>
      <footer>
        <span>${time}</span>
        <div class="flag">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`)

    return $tweet;
  };
  
  // renderTweets(tweetData);

  const $form = $('.submit-tweet');

  $form.on('submit', function(event) {
    event.preventDefault();
    const charCount = $('.counter').val();
    const textAreaMessage = $('#tweet-text').val();
    const serializedData = $(this).serialize();

    if (charCount <= 0 || charCount > 140) {
      $('#error-charCount').show(1000);
    } else if (textAreaMessage === "") {
      $('#error-blank').show(1000);
    } else {
      $('#error-charCount').hide(1000);              // ?????? 1000???
      $('#error-blank').hide(1000);

      $.post('http://localhost:8080/tweets/', serializedData, (response) => {
        loadTweets();
        $('#tweet-text').val('');                    // ??????
        $('.counter').val('140');                    //  ??????
      })
    }
  });

});