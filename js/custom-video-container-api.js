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
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let scrollAmount = 144; // width of 1 tn

function updateArrowState() {
  const thumbnails = selector.querySelectorAll('.video-thumbnail');
  const containerRect = selector.getBoundingClientRect();

  // First thumbnail position in scroll coordinates
  const firstThumbOffset = thumbnails[0].offsetLeft;
  const lastThumbOffset = thumbnails[thumbnails.length - 1].offsetLeft + thumbnails[thumbnails.length - 1].offsetWidth;

  const atStart = Math.round(selector.scrollLeft) <= Math.round(firstThumbOffset);
  const atEnd = Math.round(selector.scrollLeft + selector.clientWidth) >= Math.round(lastThumbOffset);

  leftArrow.classList.toggle('inactive', atStart);
  rightArrow.classList.toggle('inactive', atEnd);
}

// Safari-safe smooth scroll fallback
function smoothScrollBy(element, amount) {
  if ('scrollBy' in element && typeof element.scrollBy === 'function') {
    try {
      element.scrollBy({ left: amount, behavior: 'smooth' });
    } catch (e) {
      element.scrollLeft += amount;
    }
  } else {
    element.scrollLeft += amount;
  }
  setTimeout(updateArrowState, 50); // update shortly after movement starts
}

// Scroll listener
selector.addEventListener('scroll', updateArrowState, { passive: true });

// Click handlers
leftArrow.addEventListener('click', () => {
  if (!leftArrow.classList.contains('inactive')) {
    smoothScrollBy(selector, -scrollAmount);
  }
});

rightArrow.addEventListener('click', () => {
  if (!rightArrow.classList.contains('inactive')) {
    smoothScrollBy(selector, scrollAmount);
  }
});
