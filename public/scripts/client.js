/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
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
    "created_at": 1461113959088
  }
]


const createTweetElement = (data) => {
  let $tweet = `<article>
  <header>

    <h2><img src="${data.user.avatars}"/>${data.user.name}</h2>

    <h3>${data.user.handle}</h3>

  </header>
  <p class="tweetBody">${data.content.text}</p>
  <footer>
    <p>${data.created_at}</p>
    <p class="icons"><i class="fa-solid fa-heart"></i><i class="fa-solid fa-flag"></i><i
      class="fa-solid fa-recycle"></i>
    </p>
  </footer>
</article>
`
  return $tweet
}

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet)
    $(document).ready(function () {
      $('#tweets-container').append($tweet);
    })
  }
}
renderTweets(data);

$(document).ready(function () {
  $("#new-tweet").submit(function (event) {
    const cereal = $(this).serialize();
    console.log(cereal)
    $.post("/tweets", cereal);
    event.preventDefault();
  });
})


