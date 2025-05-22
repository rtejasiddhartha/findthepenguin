$(document).ready(function () {
  let score = 0;
  let highScore = 0;
  let clickCount = 0;

  function updateScore() {
    $("#score").html(`Score: ${score}<br>High Score: ${highScore}`);
  }

  function playSound(src) {
    const audio = new Audio(src);
    audio.play();
  }

  function endGame(won) {
    if (score > highScore) highScore = score;
    updateScore();
    $("#gameholder").fadeOut(800, function () {
      $("#message")
        .text(won ? "🎉 You Win! Tap to play again." : "😱 Yeti Found You! Tap to retry.")
        .css({ display: "inline-block", visibility: "visible" });
    });
  }

  function handlePenguinClick() {
    const mound = $(this);
    const role = mound.attr("data-role");  // Only use .attr here
    const index = parseInt(mound.attr("data-index"), 10);

    mound.css("pointer-events", "none");
    mound.addClass("revealed");

    clickCount++;

    if (role === "yeti") {
      mound.addClass("revealed");
      mound.css("background-image", "url(images/yeti.png)");
      playSound("media/Yetipop.wav");
      endGame(false);
    } else {
      const imgIndex = (index - 1) % 8 + 1;
      mound.css("background-image", `url(images/penguin_${imgIndex}.png)`);
      playSound("media/Penguinpop.wav");
      score += 10;
      updateScore();
      if (clickCount === 8) endGame(true);
    }
  }

  function setGame() {
    $(".FindThePenguin").each(function () {
      const mound = $(this);
      mound
        .off("click")
        .css("pointer-events", "auto")
        .on("click", handlePenguinClick);
    });
  }

  function placeYeti() {
    $(".FindThePenguin").each(function () {
      $(this).removeClass("yetti").attr("data-role", "penguin");
    });

    const randomIndex = Math.floor(Math.random() * 9);
    console.log(randomIndex);
    $(".FindThePenguin").eq(randomIndex)
      .attr("data-role", "yeti")
      .addClass("yetti");
  }

  function resetGame() {
    score = 0;
    clickCount = 0;

    //$(".FindThePenguin").each(function (i) {
    //  $(this)
    //    .removeClass("yetti")
    //    .attr("data-role", "penguin")
    //    .attr("data-index", i + 1)
    //    .css({
    //      "pointer-events": "auto",
    //      "visibility": "visible",
    //      "background-image": `url(images/mound_${i + 1}.png)`
    //    });
    //});
    
    $(".FindThePenguin").each(function (i) {
  $(this)
    .removeClass("revealed")
    .attr("data-role", "penguin")
    .attr("data-index", i + 1)
    .css("background-image", `url(images/mound_${i + 1}.png)`);
});

    $("#gameholder").show();
    $("#message").hide();
    updateScore();
    placeYeti();
    setGame();
  }

  $("#message").on("click", resetGame);
  $("body").on("keypress", function (e) {
    if (e.which === 13 && $("#message").is(":visible")) {
      resetGame();
    }
  });

  // Initialize game
  $(".FindThePenguin").each(function (i) {
    $(this)
      .attr("data-role", "penguin")
      .attr("data-index", i + 1)
      .css("background-image", `url(images/mound_${i + 1}.png)`);
  });

  updateScore();
  placeYeti();
  setGame();
});
