/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1639417642068
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1639504042068
    }
  ];
    
  
  const renderTweets = function (tweets) {

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
       <p>${tweet.content.text}</p>
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
  
  renderTweets(tweetData);

});