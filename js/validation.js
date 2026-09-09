/**
 * BirthdayVerse – Validation Module
 * Client-side form validation utilities.
 */

const Validation = (() => {

  // ── Show / Hide Field Error ──
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (field) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
    }
    if (error) {
      error.textContent = message;
      error.classList.add('visible');
    }
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (field) {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');
    }
    if (error) {
      error.textContent = '';
      error.classList.remove('visible');
    }
  }

  function clearAllErrors() {
    document.querySelectorAll('.form-input.error, .form-textarea.error, .form-select.error')
      .forEach(el => {
        el.classList.remove('error');
        el.setAttribute('aria-invalid', 'false');
      });
    document.querySelectorAll('.form-error.visible')
      .forEach(el => {
        el.textContent = '';
        el.classList.remove('visible');
      });
  }

  // ── Validate Individual Fields ──
  function validateName(value) {
    if (!value || !value.trim()) return 'Name is required.';
    if (value.trim().length > 50) return 'Name must be under 50 characters.';
    return null;
  }

  function validateBirthday(value) {
    if (!value) return 'Birthday date is required.';
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Please enter a valid date.';
    return null;
  }

  function validateMessage(value, label = 'Message', maxLength = 200) {
    if (!value || !value.trim()) return `${label} is required.`;
    if (value.length > maxLength) return `${label} must be under ${maxLength} characters.`;
    return null;
  }

  function validateOptionalText(value, label = 'Field', maxLength = 2000) {
    if (value && value.length > maxLength) {
      return `${label} must be under ${maxLength} characters.`;
    }
    return null;
  }

  function validateAge(value) {
    if (!value && value !== 0) return null; // optional
    const age = parseInt(value);
    if (isNaN(age) || age < 1 || age > 150) return 'Please enter a valid age (1–150).';
    return null;
  }

  function validateImageFile(file) {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) return 'Please choose a JPG, PNG, or WEBP image.';
    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > 5) return `Image must be under 5MB (this is ${sizeMB.toFixed(1)}MB).`;
    return null;
  }

  // ── Toast Notifications ──
  const toastContainer = (() => {
    let el = null;
    return () => {
      if (!el) {
        el = document.getElementById('toast-container');
        if (!el) {
          el = document.createElement('div');
          el.id = 'toast-container';
          el.className = 'toast-container';
          document.body.appendChild(el);
        }
      }
      return el;
    };
  })();

  function showToast(message, type = 'info', duration = 3500) {
    const container = toastContainer();
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${type}`;
    toastEl.innerHTML = `<span>${icons[type] || '💬'}</span><span>${message}</span>`;
    container.appendChild(toastEl);

    setTimeout(() => {
      toastEl.classList.add('toast-out');
      setTimeout(() => toastEl.remove(), 350);
    }, duration);

    return toastEl;
  }

  // ── Confirm Dialog ──
  function showConfirm({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, type = 'warning' }) {
    const overlay = document.getElementById('confirm-modal') || createConfirmModal();
    overlay.querySelector('#confirm-title').textContent = title || 'Are you sure?';
    overlay.querySelector('#confirm-message').textContent = message || '';
    overlay.querySelector('#confirm-ok').textContent = confirmText;
    overlay.querySelector('#confirm-cancel').textContent = cancelText;

    const okBtn = overlay.querySelector('#confirm-ok');
    okBtn.className = `btn btn-primary ${type === 'danger' ? 'btn-danger' : ''}`;
    if (type === 'danger') okBtn.style.background = 'linear-gradient(135deg, #ff4d7e, #c2185b)';
    else okBtn.style.background = '';

    const newOk = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOk, okBtn);
    newOk.addEventListener('click', () => {
      overlay.classList.remove('open');
      if (onConfirm) onConfirm();
    });

    const cancelBtn = overlay.querySelector('#confirm-cancel');
    const newCancel = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
    newCancel.addEventListener('click', () => {
      overlay.classList.remove('open');
      if (onCancel) onCancel();
    });

    overlay.classList.add('open');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    }, { once: true });
  }

  function createConfirmModal() {
    const el = document.createElement('div');
    el.id = 'confirm-modal';
    el.className = 'modal-overlay';
    el.innerHTML = `
      <div class="modal-box">
        <h3 id="confirm-title" class="section-title" style="font-size:1.4rem; margin-bottom:0.5rem;">Are you sure?</h3>
        <p id="confirm-message" class="body-text" style="margin-bottom:1.5rem; opacity:0.8;"></p>
        <div style="display:flex; gap:0.75rem; justify-content:flex-end;">
          <button id="confirm-cancel" class="btn btn-ghost">Cancel</button>
          <button id="confirm-ok" class="btn btn-primary">Confirm</button>
        </div>
      </div>
    `;
    document.body.appendChild(el);
    return el;
  }

  // ── Character Counter ──
  function attachCharCounter(inputId, counterId, max) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    if (!input || !counter) return;

    function update() {
      const len = input.value.length;
      counter.textContent = `${len} / ${max}`;
      counter.style.color = len > max * 0.9 ? '#ff4d7e' : '';
    }
    input.addEventListener('input', update);
    update();
  }

  // ── Universal Copy to Clipboard Helper ──
  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Clipboard API failed, trying fallback:', err);
      }
    }
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback copy failed:', err);
      return false;
    }
  }

  // ── Share Modal ──
  function showShareModal(shareUrl, recipientName = 'the birthday person') {
    let overlay = document.getElementById('share-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'share-modal';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }

    let currentUrl = shareUrl;

    const buildShareLinks = (url) => {
      const waText = encodeURIComponent(`A special birthday surprise just for you! 🎉\n${url}`);
      return {
        wa: `https://api.whatsapp.com/send?text=${waText}`,
        tg: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('A special birthday surprise just for you! 🎉')}`
      };
    };

    const links = buildShareLinks(currentUrl);

    overlay.innerHTML = `
      <div class="modal-box" style="max-width:560px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h3 class="section-title" style="font-size:1.4rem; margin:0;">💌 Share Greeting Link</h3>
          <button id="share-modal-close" class="btn btn-ghost btn-sm" aria-label="Close" style="border-radius:50%; width:32px; height:32px; padding:0;">✕</button>
        </div>
        <p class="body-text" style="font-size:0.9rem; margin-bottom:0.75rem; opacity:0.8;">
          Send this personalized link to <strong>${recipientName || 'the birthday person'}</strong>!
        </p>

        <div style="display:flex; gap:0.5rem; margin-bottom:0.75rem;">
          <input id="share-modal-input" type="text" class="form-input" value="${currentUrl}" readonly style="font-size:0.83rem; font-family:monospace; background:var(--color-surface-2);" onclick="this.select();">
          <button id="share-modal-copy-btn" class="btn btn-primary" style="flex-shrink:0;">
            📋 Copy
          </button>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <span id="share-link-badge" class="form-hint" style="font-size:0.78rem;">Clean Custom URL (${currentUrl.length} chars)</span>
          <button id="share-modal-shorten-btn" class="btn btn-outline btn-sm" style="font-size:0.78rem; padding:0.3rem 0.8rem;">
            ⚡ Shorten Link
          </button>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:0.6rem; margin-bottom:1rem;">
          <a id="share-wa-link" href="${links.wa}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="border-color:#25D366; color:#25D366; flex:1;">
            💬 WhatsApp
          </a>
          <a id="share-tg-link" href="${links.tg}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="border-color:#0088cc; color:#0088cc; flex:1;">
            ✈️ Telegram
          </a>
          <a id="share-test-link" href="${currentUrl}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm" style="flex:1;">
            👁️ Test Link
          </a>
        </div>

        <div style="text-align:right;">
          <button id="share-modal-done" class="btn btn-ghost btn-sm">Done</button>
        </div>
      </div>
    `;

    const closeBtn = overlay.querySelector('#share-modal-close');
    const doneBtn = overlay.querySelector('#share-modal-done');
    const copyBtn = overlay.querySelector('#share-modal-copy-btn');
    const shortenBtn = overlay.querySelector('#share-modal-shorten-btn');
    const inputEl = overlay.querySelector('#share-modal-input');
    const badgeEl = overlay.querySelector('#share-link-badge');
    const waEl = overlay.querySelector('#share-wa-link');
    const tgEl = overlay.querySelector('#share-tg-link');
    const testEl = overlay.querySelector('#share-test-link');

    const updateUrlDisplay = (newUrl, isShort = false) => {
      currentUrl = newUrl;
      inputEl.value = newUrl;
      badgeEl.textContent = isShort ? `✨ Shortened Link (${newUrl.length} chars)` : `Clean URL (${newUrl.length} chars)`;
      const newLinks = buildShareLinks(newUrl);
      waEl.href = newLinks.wa;
      tgEl.href = newLinks.tg;
      testEl.href = newUrl;
    };

    const closeModal = () => overlay.classList.remove('open');

    closeBtn?.addEventListener('click', closeModal);
    doneBtn?.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    copyBtn?.addEventListener('click', async () => {
      const ok = await copyToClipboard(currentUrl);
      if (ok) {
        copyBtn.textContent = '✅ Copied!';
        copyBtn.style.background = '#10b981';
        showToast('Link copied to clipboard! 📋 Share it with them!', 'success');
        setTimeout(() => {
          if (copyBtn) {
            copyBtn.textContent = '📋 Copy';
            copyBtn.style.background = '';
          }
        }, 3000);
      } else {
        inputEl?.select();
        showToast('Press Ctrl+C to copy the link!', 'info');
      }
    });

    shortenBtn?.addEventListener('click', async () => {
      shortenBtn.textContent = '⏳ Shortening...';
      shortenBtn.disabled = true;
      if (typeof BirthdayData !== 'undefined' && BirthdayData.getShortenedUrl) {
        const short = await BirthdayData.getShortenedUrl(currentUrl);
        if (short) {
          updateUrlDisplay(short, true);
          shortenBtn.textContent = '⚡ Shortened!';
          showToast('Link shortened successfully! 🚀', 'success');
        } else {
          shortenBtn.textContent = '⚡ Shorten Link';
          shortenBtn.disabled = false;
          showToast('Shortener API unavailable. Compact link copied!', 'info');
        }
      }
    });

    // Auto-shorten attempt
    if (typeof BirthdayData !== 'undefined' && BirthdayData.getShortenedUrl) {
      BirthdayData.getShortenedUrl(shareUrl).then(short => {
        if (short) {
          updateUrlDisplay(short, true);
          if (shortenBtn) {
            shortenBtn.textContent = '⚡ Shortened!';
            shortenBtn.disabled = true;
          }
        }
      }).catch(() => {});
    }

    overlay.classList.add('open');
    setTimeout(() => inputEl?.select(), 200);
  }

  return {
    showError,
    clearError,
    clearAllErrors,
    validateName,
    validateBirthday,
    validateMessage,
    validateOptionalText,
    validateAge,
    validateImageFile,
    showToast,
    showConfirm,
    showShareModal,
    copyToClipboard,
    attachCharCounter
  };
})();

window.Validation = Validation;
