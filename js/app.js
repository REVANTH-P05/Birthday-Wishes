/**
 * BirthdayVerse – Birthday Experience App (index.html)
 * Receiver-only view: no editing controls shown.
 * Includes: welcome → reveal → gallery → letter → special → finale
 * Mini-game: Balloon Pop
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = BirthdayData.getCurrent();
  const profileSrc = Storage.getProfilePhoto();
  const photos = Storage.getPhotos();
  const musicSrc = Storage.getMusic();

  // ── Apply theme ──
  document.documentElement.setAttribute('data-theme', data.theme || 'cute');

  // ── RECEIVER MODE: Hide all editing controls ──
  // Remove the Edit FAB
  document.querySelector('.fab-edit')?.remove();
  // Remove navbar customize/preview links
  document.querySelectorAll('.navbar-links a[href="customize.html"], .navbar-links a[href="preview.html"]').forEach(el => el.closest('li')?.remove());
  // Remove navbar actions (Edit buttons)
  const navActions = document.querySelector('.navbar-actions');
  if (navActions) navActions.innerHTML = '';

  // ── Always init audio so the toggle button works ──
  BirthdayAudio.init('music-toggle');

  // ── Gate: if not configured, show setup prompt ──
  if (!BirthdayData.isConfigured()) {
    const startBtn = document.getElementById('start-surprise-btn');
    const welcomeSubtitle = document.querySelector('.welcome-subtitle');
    const welcomeEyebrow = document.querySelector('.welcome-eyebrow');
    const welcomeEnvelope = document.querySelector('.welcome-envelope');
    if (welcomeEnvelope) welcomeEnvelope.textContent = '🎨';
    if (welcomeEyebrow) welcomeEyebrow.textContent = 'No birthday has been created yet…';
    if (welcomeSubtitle) welcomeSubtitle.textContent = 'Set up a birthday experience first, then share the link!';
    if (startBtn) {
      startBtn.innerHTML = '<span class="start-btn-icon">✏️</span> Create Birthday';
      startBtn.addEventListener('click', () => { window.location.href = 'customize.html'; });
    }
    Animations.initCustomCursor();
    return; // stop here – don't populate or wire anything else
  }

  // ── Populate Dynamic Content ──
  function setText(id, value, fallback = '') {
    const el = document.getElementById(id);
    if (el) el.textContent = value || fallback;
  }

  function setSrc(id, src) {
    const el = document.getElementById(id);
    if (el && src) { el.src = src; el.classList.remove('hidden'); }
  }

  setText('birthday-name', data.name, 'You');
  setText('profile-name', data.name);
  // Profile chips
  const ageChip = document.getElementById('profile-age-chip');
  const relChip = document.getElementById('profile-relationship-chip');
  if (ageChip && data.age) { ageChip.textContent = `🎂 ${data.age} Years`; }
  else if (ageChip) ageChip.style.display = 'none';
  if (relChip && data.relationship) { relChip.textContent = `💝 ${data.relationship}`; }
  else if (relChip) relChip.style.display = 'none';

  setText('birthday-message-text', data.birthdayMessage, '🎉 Happy Birthday!');
  setText('personal-message-text', data.personalMessage);
  setText('final-message-text', data.finalMessage || '🎉 Wishing you the most amazing birthday ever! 🎂');
  setSrc('profile-img', profileSrc);

  // Profile: show image or placeholder
  if (profileSrc) {
    document.getElementById('profile-avatar-placeholder')?.style.setProperty('display', 'none');
  }

  // .dynamic-name spans (in letter greeting)
  document.querySelectorAll('.dynamic-name').forEach(el => { el.textContent = data.name || 'You'; });

  // Special reasons
  const reasonsList = document.getElementById('reasons-list');
  if (reasonsList) {
    const reasons = (data.specialReasons || []).filter(r => r && r.trim());
    if (reasons.length > 0) {
      const emojis = ['💖', '⭐', '🌈', '✨', '🌸', '💫', '🎯', '🌟', '💝', '🎊'];
      reasonsList.innerHTML = reasons.map((reason, i) => `
        <div class="reason-card reveal-scale" style="animation-delay: ${i * 0.1}s">
          <div class="reason-emoji">${emojis[i % emojis.length]}</div>
          <p>${reason}</p>
        </div>
      `).join('');
    } else {
      // Hide the special section entirely if no reasons
      document.getElementById('special-section')?.classList.add('hidden');
    }
  }

  // Hide personal letter section if no personal message
  if (!data.personalMessage || !data.personalMessage.trim()) {
    document.getElementById('letter-section')?.classList.add('hidden');
  }

  // ── Welcome Screen wiring ──
  const welcomeScreen = document.getElementById('welcome-screen');
  const experienceWrapper = document.getElementById('experience-wrapper');
  const startBtn = document.getElementById('start-surprise-btn');
  let experienceStarted = false;

  if (startBtn) startBtn.addEventListener('click', startExperience);

  async function startExperience() {
    if (experienceStarted) return;
    experienceStarted = true;

    if (startBtn) { startBtn.textContent = '✨ Opening…'; startBtn.disabled = true; }

    // Play music on user gesture
    if (musicSrc) BirthdayAudio.play();

    // Fade out welcome
    if (welcomeScreen) {
      welcomeScreen.style.transition = 'opacity 0.5s ease';
      welcomeScreen.style.opacity = '0';
      await delay(520);
      welcomeScreen.classList.add('hidden');
    }

    // Fade in experience
    if (experienceWrapper) {
      experienceWrapper.classList.remove('hidden');
      experienceWrapper.style.opacity = '0';
      await delay(50);
      experienceWrapper.style.transition = 'opacity 0.8s ease';
      experienceWrapper.style.opacity = '1';
    }

    // Celebrations
    await delay(300);
    if (data.showConfetti !== false) Animations.launchConfetti(7000);
    if (data.showBalloons !== false) {
      setTimeout(() => Animations.launchBalloons(8), 500);
      setTimeout(() => Animations.launchBalloons(6), 3500);
    }
    if (data.showHearts !== false) {
      Animations.burstHearts(20);
      setTimeout(() => Animations.startFloatingHearts(), 3000);
    }

    // Scroll reveal
    setTimeout(() => Animations.initScrollReveal(), 400);

    // Gallery
    if (photos.length > 0) {
      const gallerySection = document.getElementById('gallery-section');
      Gallery.buildCarousel('gallery-container', photos);
      gallerySection?.classList.remove('hidden');
    }

    // Typing animation for birthday message
    setTimeout(() => {
      const msgEl = document.getElementById('birthday-message-text');
      if (msgEl && data.birthdayMessage) {
        const fullText = msgEl.textContent;
        Animations.typeText(msgEl, fullText, 32);
      }
    }, 1200);

    // Countdown
    if (data.showCountdown === true) initCountdown();

    // Mini game
    if (data.showMiniGame === true) {
      document.getElementById('mini-game-section')?.classList.remove('hidden');
      initBalloonPopGame();
    }
  }

  // ── Countdown ──
  function initCountdown() {
    const section = document.getElementById('countdown-section');
    if (!section || !data.birthday) return;
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-minutes');
    const secsEl = document.getElementById('cd-seconds');
    const cdTitle = document.getElementById('cd-title');

    function update() {
      const now = new Date();
      const bd = new Date(data.birthday + 'T00:00:00');
      bd.setFullYear(now.getFullYear());
      if (bd < now) bd.setFullYear(now.getFullYear() + 1);

      if (bd.toDateString() === now.toDateString()) {
        if (cdTitle) cdTitle.textContent = '🎂 Today is the Birthday! 🎉';
        clearInterval(timer);
        return;
      }

      const diff = bd - now;
      if (daysEl) daysEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    }

    section.classList.remove('hidden');
    update();
    const timer = setInterval(update, 1000);
  }

  // ── Mini Game: Balloon Pop 🎈 ──
  function initBalloonPopGame() {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;

    // Responsive canvas sizing
    const container = canvas.parentElement;
    canvas.width = Math.min(container.offsetWidth || 600, 700);
    canvas.height = 420;

    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('game-score');
    const livesEl = document.getElementById('game-lives');
    const timerEl = document.getElementById('game-timer');

    let score = 0, lives = 3, timeLeft = 45, gameActive = true;
    const balloons = [];

    // Balloon color pools per theme
    const balloonColors = [
      '#ff6b9d', '#ff8fab', '#c084fc', '#f472b6',
      '#fb923c', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'
    ];

    // Track which are popping (animation)
    class Balloon {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.r = 28 + Math.random() * 20;
        this.x = this.r + Math.random() * (canvas.width - this.r * 2);
        this.y = initial
          ? canvas.height + this.r + Math.random() * canvas.height
          : canvas.height + this.r + 10;
        this.speed = 0.7 + Math.random() * 1.4;
        this.color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        this.sway = Math.random() * Math.PI * 2;
        this.swaySpeed = 0.02 + Math.random() * 0.02;
        this.popping = false;
        this.popProgress = 0;
        this.emoji = Math.random() < 0.25
          ? ['🎉', '⭐', '✨', '🎊', '💖'][Math.floor(Math.random() * 5)]
          : null;
      }
    }

    // Spawn initial balloons
    for (let i = 0; i < 6; i++) balloons.push(new Balloon());

    // Spawn interval
    const spawnInterval = setInterval(() => {
      if (!gameActive) return;
      if (balloons.filter(b => !b.popping).length < 9) {
        balloons.push(new Balloon());
      }
    }, 1200);

    // Timer countdown
    const timerInterval = setInterval(() => {
      if (!gameActive) return;
      timeLeft--;
      if (timerEl) timerEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);

    function drawBalloon(b) {
      if (b.popping) {
        // Pop burst animation
        const prog = b.popProgress;
        const count = 8;
        ctx.save();
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const dist = prog * b.r * 2.5;
          const px = b.x + Math.cos(angle) * dist;
          const py = b.y + Math.sin(angle) * dist;
          ctx.globalAlpha = Math.max(0, 1 - prog);
          ctx.beginPath();
          ctx.arc(px, py, 5 * (1 - prog * 0.7), 0, Math.PI * 2);
          ctx.fillStyle = b.color;
          ctx.fill();
        }
        ctx.restore();
        return;
      }

      // Sway
      const swayX = Math.sin(b.sway) * 12;

      ctx.save();
      ctx.translate(b.x + swayX, b.y);

      // String
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1.5;
      ctx.moveTo(0, b.r);
      ctx.quadraticCurveTo(6, b.r + 20, 0, b.r + 35);
      ctx.stroke();

      // Balloon body
      ctx.beginPath();
      const grad = ctx.createRadialGradient(-b.r * 0.3, -b.r * 0.3, b.r * 0.1, 0, 0, b.r);
      grad.addColorStop(0, '#ffffff88');
      grad.addColorStop(0.3, b.color + 'cc');
      grad.addColorStop(1, b.color + '99');
      ctx.fillStyle = grad;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 12;
      ctx.ellipse(0, 0, b.r, b.r * 1.1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Shine
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.ellipse(-b.r * 0.3, -b.r * 0.3, b.r * 0.22, b.r * 0.15, -0.5, 0, Math.PI * 2);
      ctx.fill();

      // Knot
      ctx.beginPath();
      ctx.fillStyle = b.color;
      ctx.ellipse(0, b.r * 1.05, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Emoji
      if (b.emoji) {
        ctx.font = `${b.r * 0.9}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.emoji, 0, 0);
      }

      ctx.restore();
    }

    function gameLoop() {
      if (!gameActive) return;

      // Background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balloons.forEach((b, idx) => {
        if (!b.popping) {
          b.sway += b.swaySpeed;
          b.y -= b.speed;
          // Missed – lost a life
          if (b.y + b.r < 0) {
            lives = Math.max(0, lives - 1);
            if (livesEl) livesEl.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
            b.reset();
            if (lives <= 0) { endGame(); return; }
          }
        } else {
          b.popProgress += 0.08;
          if (b.popProgress >= 1) {
            b.reset();
            b.popping = false;
          }
        }
        drawBalloon(b);
      });

      requestAnimationFrame(gameLoop);
    }

    // Click / tap to pop
    function onPop(e) {
      if (!gameActive) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const mx = (clientX - rect.left) * scaleX;
      const my = (clientY - rect.top) * scaleY;

      let hit = false;
      for (const b of balloons) {
        if (b.popping) continue;
        const dx = mx - (b.x + Math.sin(b.sway) * 12);
        const dy = my - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < b.r * 1.2) {
          b.popping = true;
          b.popProgress = 0;
          score++;
          if (scoreEl) scoreEl.textContent = score;
          Animations.createSparkle(clientX, clientY);
          hit = true;
          break;
        }
      }
    }

    canvas.addEventListener('click', onPop);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); onPop(e); }, { passive: false });

    function endGame() {
      gameActive = false;
      clearInterval(spawnInterval);
      clearInterval(timerInterval);

      // Show result overlay
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(20,20,40,0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Trophy
      ctx.font = '4rem serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏆', cx, cy - 70);

      // Score text
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.min(28, canvas.width / 18)}px sans-serif`;
      ctx.fillText(`You popped ${score} balloon${score !== 1 ? 's' : ''}! 🎈`, cx, cy - 10);

      // Rating
      const rating = score >= 30 ? '🌟 LEGENDARY!' : score >= 20 ? '🔥 Amazing!' : score >= 12 ? '✨ Great job!' : score >= 6 ? '👏 Nice try!' : '😊 Keep popping!';
      ctx.font = `${Math.min(22, canvas.width / 22)}px sans-serif`;
      ctx.fillStyle = '#ffd700';
      ctx.fillText(rating, cx, cy + 28);

      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = `${Math.min(16, canvas.width / 32)}px sans-serif`;
      ctx.fillText('Click "Play Again" to try once more!', cx, cy + 65);

      // Show replay button
      const replayBtn = document.getElementById('game-replay-btn');
      if (replayBtn) replayBtn.classList.remove('hidden');
      document.getElementById('game-stop-btn')?.classList.add('hidden');
    }

    // Stop button
    document.getElementById('game-stop-btn')?.addEventListener('click', endGame);

    // Replay button
    document.getElementById('game-replay-btn')?.addEventListener('click', () => {
      score = 0; lives = 3; timeLeft = 45; gameActive = true;
      if (scoreEl) scoreEl.textContent = '0';
      if (livesEl) livesEl.textContent = '❤️❤️❤️';
      if (timerEl) timerEl.textContent = '45';
      balloons.length = 0;
      for (let i = 0; i < 6; i++) balloons.push(new Balloon());
      document.getElementById('game-replay-btn')?.classList.add('hidden');
      document.getElementById('game-stop-btn')?.classList.remove('hidden');
      gameLoop();
      // Restart intervals
      const si = setInterval(() => {
        if (!gameActive) { clearInterval(si); return; }
        if (balloons.filter(b => !b.popping).length < 9) balloons.push(new Balloon());
      }, 1200);
      const ti = setInterval(() => {
        if (!gameActive) { clearInterval(ti); return; }
        timeLeft--;
        if (timerEl) timerEl.textContent = timeLeft;
        if (timeLeft <= 0) { clearInterval(ti); endGame(); }
      }, 1000);
    });

    // Initial lives display
    if (livesEl) livesEl.textContent = '❤️❤️❤️';
    if (timerEl) timerEl.textContent = timeLeft;

    gameLoop();
  }

  // ── Final Celebration Button ──
  document.getElementById('celebrate-again-btn')?.addEventListener('click', () => {
    Animations.celebrate();
    setTimeout(() => Animations.launchConfetti(4000), 100);
  });

  // ── Share ──
  document.getElementById('share-btn')?.addEventListener('click', async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday, ${data.name || 'You'}! 🎂`,
          text: `A special birthday experience just for you! 🎉`,
          url: shareUrl
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        Validation.showToast('Link copied! 📋 Share it with them!', 'success');
      } catch {
        Validation.showToast('Copy this page URL to share!', 'info');
      }
    }
  });

  // ── Init ──
  Animations.initCustomCursor();

  // Scroll progress bar
  window.addEventListener('scroll', () => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const scrolled = document.documentElement.scrollTop;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 60);
  });

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
