const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function() {
    $(".dashboard-nav-dropdown-toggle").click(function() {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function() {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
});
// Get a handle to the player
player       = document.getElementById('video-element');
btnPlayPause = document.getElementById('btnPlayPause');
btnMute      = document.getElementById('btnMute');
progressBar  = document.getElementById('progress-bar');
volumeBar    = document.getElementById('volume-bar');

// Update the video volume
volumeBar.addEventListener("change", function(evt) {
    player.volume = evt.target.value;
});
document.getElementById('btnFullScreen').disabled = true;
// Add a listener for the timeupdate event so we can update the progress bar
player.addEventListener('timeupdate', updateProgressBar, false);

// Add a listener for the play and pause events so the buttons state can be updated
player.addEventListener('play', function() {
    // Change the button to be a pause button
    changeButtonType(btnPlayPause, 'pause');
}, false);

player.addEventListener('pause', function() {
    // Change the button to be a play button
    changeButtonType(btnPlayPause, 'play');
}, false);

player.addEventListener('volumechange', function(e) { 
    // Update the button to be mute/unmute
    if (player.muted) changeButtonType(btnMute, 'unmute');
    else changeButtonType(btnMute, 'mute');
}, false);	

player.addEventListener('ended', function() { this.pause(); }, false);	

progressBar.addEventListener("click", seek);

function seek(e) {
  var percent = e.offsetX / this.offsetWidth;
  player.currentTime = percent * player.duration;
  e.target.value = Math.floor(percent / 100);
  e.target.innerHTML = progressBar.value + '% played';
}

function playPauseVideo() {
  if (player.paused || player.ended) {
      // Change the button to a pause button
      changeButtonType(btnPlayPause, 'pause');
      player.play();
  }
  else {
      // Change the button to a play button
      changeButtonType(btnPlayPause, 'play');
      player.pause();
  }
}

function formatString(e) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }
  
    event.target.value = event.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
      /\/\//g, '/' // Prevent entering more than 1 `/`
    );
  }
  