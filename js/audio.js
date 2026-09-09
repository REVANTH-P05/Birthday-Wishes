/**
 * BirthdayVerse – Audio Module
 * Manages background music playback with browser policy compliance.
 */

const BirthdayAudioModule = (() => {
  let audioElement = null;
  let isPlaying = false;
  let volume = 0.5;
  let musicBtn = null;
  let initialized = false; // Guard against double init

  function init(controlBtnId = 'music-toggle') {
    // Prevent double-initialisation (called from both DOMContentLoaded & startExperience)
    musicBtn = document.getElementById(controlBtnId);
    const data = window.BirthdayData ? window.BirthdayData.getCurrent() : {};
    volume = data.musicVolume || 0.5;

    const musicSrc = window.Storage ? window.Storage.getMusic() : null;

    if (musicSrc && !audioElement) {
      setupAudio(musicSrc);
    }

    // Always wire up the toggle button (only once)
    if (musicBtn && !initialized) {
      musicBtn.addEventListener('click', handleToggleClick);
    }

    initialized = true;
    updateBtn(!!musicSrc);
  }

  function handleToggleClick() {
    const musicSrc = window.Storage ? window.Storage.getMusic() : null;
    if (!musicSrc) {
      // No music uploaded – show helpful message
      if (window.Validation) {
        window.Validation.showToast('No music uploaded. Add music in the Customize page! 🎵', 'info');
      }
      return;
    }
    // Ensure audio is set up (lazy setup after click)
    if (!audioElement) {
      setupAudio(musicSrc);
    }
    toggle();
  }

  function setupAudio(src) {
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
    }
    // Use document.createElement('audio') — safest cross-browser approach
    audioElement = document.createElement('audio');
    audioElement.src = src;
    audioElement.loop = true;
    audioElement.volume = volume;
    audioElement.addEventListener('error', (e) => {
      console.warn('Audio playback error:', e);
      isPlaying = false;
      updateBtn(false);
    });
    audioElement.addEventListener('play', () => {
      isPlaying = true;
      updateBtn(true);
    });
    audioElement.addEventListener('pause', () => {
      isPlaying = false;
      updateBtn(true);
    });
  }

  function play() {
    if (!audioElement) return Promise.resolve();
    return audioElement.play().then(() => {
      isPlaying = true;
      updateBtn(true);
    }).catch((err) => {
      console.warn('Audio play prevented:', err.message);
    });
  }

  function pause() {
    if (!audioElement) return;
    audioElement.pause();
    isPlaying = false;
    updateBtn(true);
  }

  function toggle() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function setVolume(val) {
    volume = Math.max(0, Math.min(1, val));
    if (audioElement) audioElement.volume = volume;
  }

  function getVolume() { return volume; }
  function getIsPlaying() { return isPlaying; }

  function updateBtn(hasMusicSrc) {
    if (!musicBtn) return;
    if (!hasMusicSrc) {
      musicBtn.innerHTML = '🎵';
      musicBtn.title = 'No music added – click to learn more';
      musicBtn.style.opacity = '0.5';
      musicBtn.classList.remove('playing');
      return;
    }
    musicBtn.style.opacity = '1';
    musicBtn.innerHTML = isPlaying ? '🎵' : '🔇';
    musicBtn.title = isPlaying ? 'Pause Music' : 'Play Music';
    musicBtn.classList.toggle('playing', isPlaying);
  }

  function setSource(src) {
    const wasPlaying = isPlaying;
    setupAudio(src);
    if (wasPlaying) play();
  }

  function destroy() {
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
      audioElement = null;
    }
    isPlaying = false;
    initialized = false;
  }

  function getBuiltInOptions() {
    return [
      { label: 'Upload your own music', value: 'upload' },
      { label: '🎵 None', value: 'none' }
    ];
  }

  return {
    init,
    play,
    pause,
    toggle,
    setVolume,
    getVolume,
    getIsPlaying,
    setSource,
    destroy,
    getBuiltInOptions
  };
})();

window.BirthdayAudio = BirthdayAudioModule;
