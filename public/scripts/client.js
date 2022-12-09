//required to prevent scripts from running from input tweets
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//creates html block for repeated insert as tweet
const createTweetElement = (data) => {
  let $tweet = `<article>
  <header class="tweetTop">

    <h4><img src="${data.user.avatars}"/>${data.user.name}</h4>

    <h5>${data.user.handle}</h5>

  </header>
  <p class="tweetBody">${escape(data.content.text)}</p>
  <footer class="tweetBottom">
    <p>${timeago.format(data.created_at)}</p>
    <p class="icons"><i class="fa-solid fa-heart"></i><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i>
    </p>
  </footer>
</article>
`;
  return $tweet;
};
//renders all tweets in array using createTweetElement
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $(document).ready(function () {
      $('#tweets-container').prepend($tweet);
    });
  }
};
//verifies tweet and posts if passes
$(document).ready(function () {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
  $("#new-tweet").submit(function (event) {
    const cereal = $(this).serialize();
    $(this).parents(".container").find("#error-text").hide(1000);
    if ($(this).find("textarea").val() === "") {
      $(this).parents(".container").find("#error-text").text("not enough text").show(1000);
    }
    if ($(this).find("textarea").val().length > 140) {
      $(this).parents(".container").find("#error-text").show(1000);

    } else {
      $.post("/tweets", cereal)
        .then(function () {
          $.ajax('/tweets', { method: 'GET' })
            .then(function (data) {
              renderTweets(data);
            });
        });
      $(this).find("textarea").val('');
      $(this).find(".counter").val('140');
    }
    event.preventDefault();
  });
});
//focuses on text field on button clicked
$(document).ready(function () {
  $(".focus").click(function () {
    $(this).parents("body").find("textarea").focus();
  });
});


