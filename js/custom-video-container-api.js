let player;
  let selectedVideoId = null;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315',
    width: '560',
    videoId: '', // Start empty, we’ll cue below
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
	  enablejsapi: 1,
	  host: 'https://www.youtube-nocookie.com'
    },
    events: {
      'onReady': function () {
        // Load the first video on page load
        const firstThumb = document.querySelector('.video-thumbnail');
        if (firstThumb) {
          selectedVideoId = firstThumb.dataset.videoId;
          const overlayUrl = firstThumb.dataset.overlay;

          // Cue video
          player.cueVideoById(selectedVideoId);

          // Show overlay
          const overlayImage = document.getElementById('overlayImage');
          overlayImage.src = overlayUrl;
          overlayImage.style.display = 'block';

          // Show play button
          const playButton = document.getElementById('customPlay');
          playButton.style.display = 'flex';
        }
      },
	'onStateChange': onPlayerStateChange	
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.cueVideoById(selectedVideoId); // Reset to start, paused
  }
}

  document.querySelectorAll('.video-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      selectedVideoId = thumb.dataset.videoId;
      const overlayUrl = thumb.dataset.overlay;

      // Show custom overlay
      const overlayImage = document.getElementById('overlayImage');
      overlayImage.src = overlayUrl;
      overlayImage.style.display = 'block';

      // Show custom play button
      const playButton = document.getElementById('customPlay');
      playButton.style.display = 'flex';

      // Load video
      player.cueVideoById(selectedVideoId);
    });
  });

  document.getElementById('customPlay').addEventListener('click', () => {
    if (selectedVideoId) {
      player.playVideo();
      document.getElementById('overlayImage').style.display = 'none';
      document.getElementById('customPlay').style.display = 'none';
    }
  });

  // Load YouTube IFrame API
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);




const selector = document.querySelector('.video-selector');
//const scrollAmount = 140 * 3; // width of 3 thumbnails (adjust if needed)

let scrollAmount;

function debounce(func, wait = 150) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function updateScrollAmount() {
  scrollAmount = window.innerWidth <= 520 
    ? 140 * 2  // Mobile
    : 140 * 3;   // Desktop
}

// Initial setup
updateScrollAmount();

// Update when window resizes
window.addEventListener('resize', debounce(updateScrollAmount, 150));

document.querySelector('.left-arrow').addEventListener('click', () => {
  selector.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

document.querySelector('.right-arrow').addEventListener('click', () => {
  selector.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});
