/**
 * BirthdayVerse – Audio Module
 * Manages background music playback with browser policy compliance.
 */

const BirthdayAudioModule = (() => {
  let audioElement = null;
  let isPlaying = false;
  let volume = 0.5;
  let musicBtn = null;
  let initialized = false;

  // ── Web Audio Synthesizer (Happy Birthday Music Box Chime) ──
  let audioCtx = null;
  let synthLoopTimeout = null;
  let isSynthPlaying = false;

  const NOTE_FREQS = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00
  };

  const HAPPY_BIRTHDAY_MELODY = [
    { note: 'C4', duration: 0.75 },
    { note: 'C4', duration: 0.25 },
    { note: 'D4', duration: 1.0 },
    { note: 'C4', duration: 1.0 },
    { note: 'F4', duration: 1.0 },
    { note: 'E4', duration: 2.0 },

    { note: 'C4', duration: 0.75 },
    { note: 'C4', duration: 0.25 },
    { note: 'D4', duration: 1.0 },
    { note: 'C4', duration: 1.0 },
    { note: 'G4', duration: 1.0 },
    { note: 'F4', duration: 2.0 },

    { note: 'C4', duration: 0.75 },
    { note: 'C4', duration: 0.25 },
    { note: 'C5', duration: 1.0 },
    { note: 'A4', duration: 1.0 },
    { note: 'F4', duration: 1.0 },
    { note: 'E4', duration: 1.0 },
    { note: 'D4', duration: 2.0 },

    { note: 'A#4', duration: 0.75 },
    { note: 'A#4', duration: 0.25 },
    { note: 'A4', duration: 1.0 },
    { note: 'F4', duration: 1.0 },
    { note: 'G4', duration: 1.0 },
    { note: 'F4', duration: 2.5 }
  ];

  function playSynthMelody() {
    if (isSynthPlaying) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      if (!audioCtx || audioCtx.state === 'closed') {
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch(e) {
      console.warn('AudioContext init error:', e);
      return;
    }

    isSynthPlaying = true;
    isPlaying = true;
    updateBtn(true);

    const TEMPO = 130;
    const beatSec = 60 / TEMPO;

    function playSequence() {
      if (!isSynthPlaying || !audioCtx) return;
      let currentTime = audioCtx.currentTime + 0.05;

      HAPPY_BIRTHDAY_MELODY.forEach(({ note, duration }) => {
        const freq = NOTE_FREQS[note];
        if (freq) {
          try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, currentTime);

            const durSec = duration * beatSec;
            const noteVol = volume * 0.3;

            gain.gain.setValueAtTime(0.001, currentTime);
            gain.gain.linearRampToValueAtTime(noteVol, currentTime + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, currentTime + durSec - 0.02);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(currentTime);
            osc.stop(currentTime + durSec);
          } catch(e) {}
        }
        currentTime += duration * beatSec;
      });

      const totalMelodyTime = (currentTime - audioCtx.currentTime) * 1000;
      synthLoopTimeout = setTimeout(() => {
        if (isSynthPlaying) playSequence();
      }, Math.max(1000, totalMelodyTime + 1200));
    }

    playSequence();
  }

  function stopSynthMelody() {
    isSynthPlaying = false;
    if (synthLoopTimeout) {
      clearTimeout(synthLoopTimeout);
      synthLoopTimeout = null;
    }
    if (audioCtx && audioCtx.state === 'running') {
      try { audioCtx.suspend(); } catch (e) {}
    }
  }

  function init(controlBtnId = 'music-toggle') {
    musicBtn = document.getElementById(controlBtnId);
    const data = window.BirthdayData ? window.BirthdayData.getCurrent() : {};
    volume = data.musicVolume || 0.5;

    const musicSrc = window.Storage ? window.Storage.getMusic() : null;
    if (musicSrc && !audioElement) {
      setupAudio(musicSrc);
    }

    if (musicBtn && !initialized) {
      musicBtn.addEventListener('click', handleToggleClick);
    }

    initialized = true;
    updateBtn(true);
  }

  function handleToggleClick() {
    const musicSrc = window.Storage ? window.Storage.getMusic() : null;
    if (musicSrc && !audioElement) {
      setupAudio(musicSrc);
    }
    toggle();
  }

  function setupAudio(src) {
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
    }
    audioElement = document.createElement('audio');
    audioElement.src = src;
    audioElement.loop = true;
    audioElement.volume = volume;
    audioElement.addEventListener('error', (e) => {
      console.warn('Audio playback error:', e);
      isPlaying = false;
      updateBtn(true);
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
    if (audioElement && audioElement.src) {
      stopSynthMelody();
      return audioElement.play().then(() => {
        isPlaying = true;
        updateBtn(true);
      }).catch((err) => {
        console.warn('Custom audio play blocked, falling back to Happy Birthday synth melody:', err.message);
        playSynthMelody();
      });
    } else {
      playSynthMelody();
      return Promise.resolve();
    }
  }

  function pause() {
    if (audioElement) {
      audioElement.pause();
    }
    stopSynthMelody();
    isPlaying = false;
    updateBtn(true);
  }

  function toggle() {
    if (isPlaying || isSynthPlaying) {
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
  function getIsPlaying() { return isPlaying || isSynthPlaying; }

  function updateBtn() {
    if (!musicBtn) return;
    const active = isPlaying || isSynthPlaying;
    musicBtn.style.opacity = '1';
    musicBtn.innerHTML = active ? '🎵' : '🔇';
    musicBtn.title = active ? 'Pause Music' : 'Play Music';
    musicBtn.classList.toggle('playing', active);
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
    stopSynthMelody();
    isPlaying = false;
    initialized = false;
  }

  function getBuiltInOptions() {
    return [
      { label: '🎵 Happy Birthday Melody (Built-in)', value: 'builtin' },
      { label: 'Upload your own music', value: 'upload' }
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
