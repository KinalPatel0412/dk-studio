/* =========================================================
   Smart video player (extend-section)
   ---------------------------------------------------------
   .h1_extend_video ke data-video-url ko dekhke khud decide karta hai:
     1) Direct .mp4 link        -> HTML5 <video>
     2) Local project file      -> HTML5 <video>   (jaise images/dkphoto/video.mp4)
     3) YouTube link            -> YouTube IFrame API player
   Custom play / pause button teeno case me kaam karta hai.
   ========================================================= */
(function () {
  var btn = document.getElementById("extendVideoBtn");
  if (!btn) return;
  var wrap = btn.closest(".h1_extend_video");
  var frame = wrap.querySelector(".h1_extend_video-frame");
  var icon = btn.querySelector("iconify-icon");
  var url = (wrap.getAttribute("data-video-url") || "").trim();

  function setIcon(playing) {
    icon.setAttribute("icon", playing ? "mdi:pause" : "mdi:play");
    wrap.classList.toggle("is-playing", playing);
  }

  // YouTube link -> video id (youtu.be/ID, watch?v=ID, /embed/ID, /shorts/ID)
  function getYouTubeId(u) {
    var m = u.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
  }
  var ytId = getYouTubeId(url);

  if (ytId) {
    /* ---------- Scenario 3: YouTube ---------- */
    var holder = document.createElement("div");
    holder.id = "extendYT";
    frame.appendChild(holder);

    var player, ready = false;
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = function () {
      player = new YT.Player("extendYT", {
        videoId: ytId,
        playerVars: { controls: 0, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: function () { ready = true; },
          onStateChange: function (e) { setIcon(e.data === YT.PlayerState.PLAYING); }
        }
      });
    };

    btn.addEventListener("click", function () {
      if (!ready || !player) return;
      if (player.getPlayerState() === YT.PlayerState.PLAYING) player.pauseVideo();
      else player.playVideo();
    });
  } else if (url) {
    /* ---------- Scenario 1 & 2: direct link / local file ---------- */
    var video = document.createElement("video");
    video.src = url;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("poster", "images/bg/expand-img.jpg");
    frame.appendChild(video);

    btn.addEventListener("click", function () {
      if (video.paused || video.ended) video.play();
      else video.pause();
    });
    video.addEventListener("play", function () { setIcon(true); });
    video.addEventListener("pause", function () { setIcon(false); });
    video.addEventListener("ended", function () { setIcon(false); });
  }
})();


/* =========================================================
   Portfolio card videos (.project_video_card)
   ---------------------------------------------------------
   Pehle se play NAHI hota -- poster + play button dikhta hai.
   Play button dabane par hi video chalu hota hai. Koi bhi link:
     - YouTube link (shorts / watch / youtu.be) -> iframe
     - direct .mp4 link ya local file           -> <video controls>
   ========================================================= */
(function () {
  var cards = document.querySelectorAll(".project_video_card");
  if (!cards.length) return;

  function getYouTubeId(u) {
    var m = u.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
  }

  cards.forEach(function (card) {
    var url = (card.getAttribute("data-video-url") || "").trim();
    if (!url) return;
    var poster = card.getAttribute("data-poster") || "";
    var ytId = getYouTubeId(url);

    // poster (jab tak play na karo)
    if (poster) {
      // di gayi poster image
      var img = document.createElement("img");
      img.className = "img-full project_video project_video_poster";
      img.src = poster;
      img.alt = "";
      card.appendChild(img);
    } else if (!ytId) {
      // local mp4 -- video ka pehla frame hi thumbnail ki tarah dikhao
      var preview = document.createElement("video");
      preview.className = "img-full project_video project_video_poster";
      preview.src = url + "#t=0.1";
      preview.muted = true;
      preview.playsInline = true;
      preview.setAttribute("preload", "metadata");
      card.appendChild(preview);
    }

    // play button overlay
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "project_play_btn";
    btn.setAttribute("aria-label", "Play video");
    btn.innerHTML = '<iconify-icon icon="mdi:play"></iconify-icon>';
    card.appendChild(btn);

    var loaded = false;
    btn.addEventListener("click", function () {
      if (loaded) return;       // dobara load na ho
      loaded = true;
      card.classList.add("is-playing");

      if (ytId) {
        // user ne click kiya -> ab autoplay allowed, controls bhi rahenge
        var iframe = document.createElement("iframe");
        iframe.className = "project_video";
        iframe.src = "https://www.youtube.com/embed/" + ytId +
          "?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1";
        iframe.allow = "autoplay; encrypted-media; fullscreen";
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        card.appendChild(iframe);
      } else {
        var video = document.createElement("video");
        video.className = "img-full project_video";
        video.src = url;
        video.controls = true;
        video.playsInline = true;
        if (poster) video.setAttribute("poster", poster);
        card.appendChild(video);
        video.play().catch(function () { });
      }
    });
  });
})();


/* =========================================================
   Ek time pe sirf EK video
   ---------------------------------------------------------
   Koi bhi <video> play ho -> baaki sab <video> pause ho jaayein.
   Saath hi YouTube iframes ko bhi pause karo (postMessage se).
   ========================================================= */
(function () {
  function pauseOthers(current) {
    // baaki sab HTML5 <video> pause karo (poster preview muted videos chhodo)
    document.querySelectorAll("video").forEach(function (v) {
      if (v !== current && !v.muted && !v.paused) v.pause();
    });
    // YouTube iframes ko pause command bhejo
    document.querySelectorAll('iframe[src*="youtube.com/embed"]').forEach(function (f) {
      try {
        f.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      } catch (e) { /* cross-origin ho to ignore */ }
    });
  }

  // capture phase -- har video ke play par trigger
  document.addEventListener(
    "play",
    function (e) {
      if (e.target && e.target.tagName === "VIDEO" && !e.target.muted) {
        pauseOthers(e.target);
      }
    },
    true
  );
})();
