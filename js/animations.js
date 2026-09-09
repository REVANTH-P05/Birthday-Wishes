/**
 * BirthdayVerse – Animations Module
 * Handles confetti, floating hearts, balloons, sparkles, typing effects.
 */

const Animations = (() => {
  let confettiInterval = null;
  let balloonInterval = null;
  let heartInterval = null;

  // ── Confetti ──
  function launchConfetti(duration = 4000) {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = [
      '#ff69b4', '#a855f7', '#f59e0b', '#10b981',
      '#3b82f6', '#ef4444', '#ec4899', '#8b5cf6',
      '#06b6d4', '#fbbf24', '#34d399', '#60a5fa'
    ];
    const shapes = ['circle', 'square', 'triangle'];

    for (let i = 0; i < 180; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        speed: Math.random() * 4 + 2,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * 0.2 - 0.1,
        wobble: Math.random() * 2 - 1,
        wobbleSpeed: Math.random() * 0.05 + 0.01,
        opacity: 1
      });
    }

    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      pieces.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * p.wobble;
        p.angle += p.wobbleSpeed;
        p.rotation += 0.05;
        if (elapsed > duration - 1000) {
          p.opacity = Math.max(0, p.opacity - 0.015);
        }
        if (p.y < canvas.height + 20 && p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === 'square') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          } else {
            ctx.beginPath();
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(p.size / 2, p.size / 2);
            ctx.lineTo(-p.size / 2, p.size / 2);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }
      });

      if (alive) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(animate);
  }

  // ── Floating Hearts Burst ──
  function burstHearts(count = 20) {
    const emojis = ['❤️', '💕', '💖', '💝', '💗', '🥰', '💓'];
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'heart-burst';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = `${10 + Math.random() * 80}vw`;
        el.style.bottom = `${10 + Math.random() * 30}vh`;
        el.style.fontSize = `${1 + Math.random() * 1.5}rem`;
        el.style.animationDuration = `${1 + Math.random() * 0.8}s`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
      }, i * 80);
    }
  }

  // ── Continuous Floating Hearts ──
  function startFloatingHearts() {
    stopFloatingHearts();
    const emojis = ['❤️', '💕', '💖', '💝', '💗'];
    heartInterval = setInterval(() => {
      const el = document.createElement('div');
      el.className = 'heart-burst';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${5 + Math.random() * 90}vw`;
      el.style.bottom = '5vh';
      el.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
      el.style.animationDuration = `${2 + Math.random() * 2}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, 600);
  }

  function stopFloatingHearts() {
    if (heartInterval) { clearInterval(heartInterval); heartInterval = null; }
  }

  // ── Rising Balloons ──
  function launchBalloons(count = 8) {
    const balloons = ['🎈', '🎀', '🎊', '🎁', '⭐', '🌟'];
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'balloon';
        el.textContent = balloons[Math.floor(Math.random() * balloons.length)];
        el.style.left = `${5 + Math.random() * 90}vw`;
        el.style.animationDuration = `${4 + Math.random() * 4}s`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 9000);
      }, i * 400);
    }
  }

  // ── Sparkles ──
  function createSparkle(x, y) {
    const emojis = ['✨', '⭐', '💫', '🌟'];
    const el = document.createElement('div');
    el.className = 'sparkle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  // ── Typing Effect ──
  function typeText(element, text, speed = 40, onComplete) {
    if (!element) return;
    element.textContent = '';
    let index = 0;

    // Create cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);

    function type() {
      if (index < text.length) {
        const textNode = element.childNodes[0];
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          textNode.textContent += text[index];
        } else {
          element.insertBefore(document.createTextNode(text[index]), cursor);
        }
        index++;
        setTimeout(type, speed + Math.random() * 20);
      } else {
        setTimeout(() => {
          cursor.remove();
          if (onComplete) onComplete();
        }, 500);
      }
    }
    type();
  }

  // ── Number Count-Up ──
  function countUp(element, target, duration = 1500) {
    if (!element) return;
    const start = 0;
    const steps = 60;
    const increment = target / steps;
    let current = start;
    const step = duration / steps;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      element.textContent = Math.round(current);
      if (current >= target) clearInterval(timer);
    }, step);
  }

  // ── Scroll Reveal ──
  function initScrollReveal() {
    const options = {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Cascade delay for siblings
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });
  }

  // ── Particle Background ──
  function createParticles(container, count = 20) {
    if (!container) return;
    const colors = ['#ff69b4', '#a855f7', '#f59e0b', '#06b6d4', '#10b981', '#ff4d7e'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = 4 + Math.random() * 12;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        --duration: ${5 + Math.random() * 8}s;
        --delay: ${Math.random() * 4}s;
        opacity: ${0.05 + Math.random() * 0.2};
      `;
      container.appendChild(p);
    }
  }

  // ── Grand Birthday Celebration ──
  function celebrate() {
    launchConfetti(5000);
    burstHearts(25);
    launchBalloons(10);
    setTimeout(() => burstHearts(15), 1500);
    setTimeout(() => launchConfetti(3000), 3000);
  }

  // ── Custom Cursor (desktop only) ──
  function initCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    let mouseX = -100, mouseY = -100;
    let curX = -100, curY = -100;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.8)');
    document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');

    // Sparkle on click
    document.addEventListener('click', (e) => {
      createSparkle(e.clientX - 12, e.clientY - 12);
    });
  }

  return {
    launchConfetti,
    burstHearts,
    startFloatingHearts,
    stopFloatingHearts,
    launchBalloons,
    createSparkle,
    typeText,
    countUp,
    initScrollReveal,
    createParticles,
    celebrate,
    initCustomCursor
  };
})();

window.Animations = Animations;
