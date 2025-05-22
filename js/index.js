$(document).ready(function () {
  let score = 0;
  let highScore = 0;
  let clickCount = 0;
  let yetiIndex;

  const mounds = $(".FindThePenguin");

  function updateScore() {
    animateScore();
    $("#score").html(`Score: ${score}<br>High Score: ${highScore}`);
  }

  function animateScore() {
    $("#score").fadeOut(100).fadeIn(100);
  }

  function playSound(src) {
    const audio = new Audio(src);
    audio.volume = 1;
    audio.play();
  }

  function placeYeti() {
    mounds.each(function () {
      $(this).data("role", "penguin").removeClass("yetti");
    });

    yetiIndex = Math.floor(Math.random() * 9);
    mounds.eq(yetiIndex).data("role", "yeti").addClass("yetti");
  }

  function setGame() {
    // Prevent duplicate click handlers
    mounds.off("click");

    mounds.each(function (index) {
      $(this)
        .data("index", index + 1)
        .data("role", "penguin")
        .css("pointer-events", "auto");
    });

    mounds.on("click", function () {
      const role = $(this).data("role");
      $(this).css("pointer-events", "none");
      clickCount++;

      if (role === "yeti") {
        $(this).css("background-image", "url(images/yeti.png)");
        playSound("media/Yetipop.wav");
        if (navigator.vibrate) navigator.vibrate(200);
        endGame(false);
      } else {
        const i = $(this).data("index");
        let imgIndex = (i - 1) % 8 + 1; // fallback for missing penguin_9.png
        $(this).css("background-image", `url(images/penguin_${imgIndex}.png)`);
        playSound("media/Penguinpop.wav");

        score += 10;
        updateScore();
        if (clickCount === 8) endGame(true);
      }
    });
  }

  function endGame(win) {
    if (score > highScore) highScore = score;
    updateScore();

    $("#gameholder").fadeOut(800, function () {
      $("#message")
        .text(win ? "🎉 You Win! Tap to play again." : "😱 Yeti Found You! Tap to retry.")
        .css({
          display: "inline-block",
          visibility: "visible",
          backgroundColor: win ? "#d4edda" : "#f8d7da"
        });
    });
  }

  function resetGame() {
    score = 0;
    clickCount = 0;

    mounds.each(function (index) {
      $(this)
        .data("index", index + 1)
        .data("role", "penguin")
        .removeClass("yetti")
        .css({
          "pointer-events": "auto",
          "visibility": "visible",
          "background-image": `url(images/mound_${index + 1}.png)`
        });
    });

    $("#gameholder").show();
    $("#message").hide();
    updateScore();
    placeYeti();
    setGame(); // reattach click handler safely
  }

  $("#message").on("click", resetGame);
  $("body").on("keypress", function (e) {
    if (e.which === 13 && $("#message").is(":visible")) resetGame();
  });

  // Ensure mounds are visible with background at page load
  mounds.each(function (index) {
    $(this)
      .data("index", index + 1)
      .data("role", "penguin")
      .css("background-image", `url(images/mound_${index + 1}.png)`);
  });

  setGame();
  updateScore();
  placeYeti();
});
