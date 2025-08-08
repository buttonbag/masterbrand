let selectedVideoId = null;

  // Load the first video overlay + play button on page load
  const firstThumb = document.querySelector('.video-thumbnail');
  if (firstThumb) {
    selectedVideoId = firstThumb.dataset.videoId;
    const overlayUrl = firstThumb.dataset.overlay;

    document.getElementById('overlayImage').src = overlayUrl;
    document.getElementById('overlayImage').style.display = 'block';
    document.getElementById('customPlay').style.display = 'flex';
  }

  // Handle thumbnail clicks
  document.querySelectorAll('.video-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      selectedVideoId = thumb.dataset.videoId;
      const overlayUrl = thumb.dataset.overlay;

      document.getElementById('overlayImage').src = overlayUrl;
      document.getElementById('overlayImage').style.display = 'block';
      document.getElementById('customPlay').style.display = 'flex';

      // Remove any existing iframe so we reset it
      document.getElementById('player').innerHTML = '';
    });
  });

  // Handle custom play button click
  document.getElementById('customPlay').addEventListener('click', () => {
    if (selectedVideoId) {
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.src = `https://www.youtube-nocookie.com/embed/${selectedVideoId}?autoplay=1&rel=0&enablejsapi=1`;
      iframe.title = 'YouTube video player';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;

      document.getElementById('player').innerHTML = '';
      document.getElementById('player').appendChild(iframe);

      document.getElementById('overlayImage').style.display = 'none';
      document.getElementById('customPlay').style.display = 'none';
    }
  });

  // Thumbnail scroller controls
  const selector = document.querySelector('.video-selector');
  const scrollAmount = 140 * 3;

  document.querySelector('.left-arrow').addEventListener('click', () => {
    selector.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  document.querySelector('.right-arrow').addEventListener('click', () => {
    selector.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
