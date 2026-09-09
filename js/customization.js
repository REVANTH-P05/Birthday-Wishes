/**
 * BirthdayVerse – Customization Page JS
 * Handles the multi-step birthday creation form.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── State ──
  let currentStep = 1;
  const TOTAL_STEPS = 4;
  let formData = { ...BirthdayData.getCurrent() };
  let profilePhotoFile = null;
  let memoryPhotos = Storage.getPhotos();
  let profilePhotoSrc = Storage.getProfilePhoto();

  // ── Step Navigation ──
  const stepItems = document.querySelectorAll('.step-item');
  const stepPanels = document.querySelectorAll('.step-panel');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const saveBtn = document.getElementById('save-btn');

  function showStep(step) {
    currentStep = step;
    stepPanels.forEach(p => p.classList.add('hidden'));
    stepItems.forEach((item, i) => {
      item.classList.toggle('active', i + 1 === step);
      item.classList.toggle('completed', i + 1 < step);
    });
    const activePanel = document.getElementById(`step-${step}`);
    if (activePanel) {
      activePanel.classList.remove('hidden');
      activePanel.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        el.classList.remove('revealed');
        setTimeout(() => el.classList.add('revealed'), 50);
      });
    }

    // Update navigation buttons
    if (prevBtn) prevBtn.classList.toggle('hidden', step === 1);
    if (nextBtn) nextBtn.classList.toggle('hidden', step === TOTAL_STEPS);
    if (saveBtn) saveBtn.classList.toggle('hidden', step !== TOTAL_STEPS);

    updatePreview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function validateStep(step) {
    Validation.clearAllErrors();
    let valid = true;

    if (step === 1) {
      const nameErr = Validation.validateName(formData.name);
      if (nameErr) { Validation.showError('name', nameErr); valid = false; }

      const bdayErr = Validation.validateBirthday(formData.birthday);
      if (bdayErr) { Validation.showError('birthday', bdayErr); valid = false; }
    }

    if (step === 3) {
      const msgErr = Validation.validateMessage(formData.birthdayMessage, 'Birthday message', 200);
      if (msgErr) { Validation.showError('birthday-message', msgErr); valid = false; }
    }

    return valid;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!validateStep(currentStep)) {
        Validation.showToast('Please fix the highlighted errors.', 'error');
        return;
      }
      if (currentStep < TOTAL_STEPS) showStep(currentStep + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) showStep(currentStep - 1);
    });
  }

  stepItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      const targetStep = i + 1;
      if (targetStep <= currentStep || validateStep(currentStep)) {
        showStep(targetStep);
      }
    });
  });

  // ── Step 1: Person Details ──
  function bindDetailsFields() {
    const fields = [
      { id: 'name', key: 'name' },
      { id: 'age', key: 'age' },
      { id: 'relationship', key: 'relationship' },
      { id: 'birthday', key: 'birthday' }
    ];

    fields.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.value = formData[key] || '';
      el.addEventListener('input', () => {
        formData[key] = el.value;
        Validation.clearError(id);
        updatePreviewField(key, el.value);
      });
    });

    // Relationship quick-picks
    document.querySelectorAll('.relation-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.relation-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        formData.relationship = chip.dataset.value;
        const relInput = document.getElementById('relationship');
        if (relInput) relInput.value = chip.dataset.value;
        updatePreviewField('relationship', chip.dataset.value);
      });
    });

    // Pre-select chip if value already set
    if (formData.relationship) {
      document.querySelectorAll('.relation-chip').forEach(chip => {
        if (chip.dataset.value === formData.relationship) chip.classList.add('active');
      });
    }
  }
  bindDetailsFields();

  // ── Step 2: Photos ──
  // Profile Photo
  const profileUploadZone = document.getElementById('profile-upload-zone');
  const profileInput = document.getElementById('profile-photo-input');
  const profilePreview = document.getElementById('profile-photo-preview');
  const profilePreviewImg = document.getElementById('profile-preview-img');
  const removeProfileBtn = document.getElementById('remove-profile-btn');

  function updateProfilePreview(src) {
    if (src && profilePreviewImg) {
      profilePreviewImg.src = src;
      profilePreview?.classList.remove('hidden');
      profileUploadZone?.classList.add('hidden');
    }
  }

  if (profilePhotoSrc) updateProfilePreview(profilePhotoSrc);

  if (profileInput) {
    profileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const err = Validation.validateImageFile(file);
      if (err) { Validation.showToast(err, 'error'); return; }
      try {
        const src = await Storage.saveProfilePhoto(file);
        profilePhotoSrc = src;
        updateProfilePreview(src);
        Validation.showToast('Profile photo uploaded! ✨', 'success');
      } catch (ex) {
        Validation.showToast(ex.message, 'error');
      }
    });
  }

  if (removeProfileBtn) {
    removeProfileBtn.addEventListener('click', () => {
      Storage.removeProfilePhoto();
      profilePhotoSrc = null;
      profilePreview?.classList.add('hidden');
      profileUploadZone?.classList.remove('hidden');
      if (profileInput) profileInput.value = '';
    });
  }

  // Memory Photos
  const memoryInput = document.getElementById('memory-photo-input');
  const memoryGrid = document.getElementById('memory-photos-grid');
  const memoryCount = document.getElementById('memory-count');

  function renderMemoryGrid() {
    memoryPhotos = Storage.getPhotos();
    if (!memoryGrid) return;
    if (memoryCount) memoryCount.textContent = `${memoryPhotos.length} / ${Storage.maxPhotos}`;

    memoryGrid.innerHTML = memoryPhotos.map((photo, i) => `
      <div class="photo-preview-item">
        <img src="${photo.src}" alt="Memory ${i + 1}">
        <button class="photo-remove-btn" data-index="${i}" aria-label="Remove photo">✕</button>
        <div class="photo-caption-input-wrapper">
          <input class="photo-caption-input" type="text" placeholder="Caption…" value="${photo.caption || ''}" data-index="${i}" maxlength="80">
        </div>
      </div>
    `).join('');

    memoryGrid.querySelectorAll('.photo-remove-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        await Storage.removePhoto(parseInt(btn.dataset.index));
        renderMemoryGrid();
        Validation.showToast('Photo removed.', 'info');
      });
    });

    memoryGrid.querySelectorAll('.photo-caption-input').forEach(input => {
      input.addEventListener('input', () => {
        Storage.updatePhotoCaption(parseInt(input.dataset.index), input.value);
      });
    });
  }
  renderMemoryGrid();

  if (memoryInput) {
    memoryInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files);
      let added = 0;
      for (const file of files) {
        try {
          await Storage.addPhoto(file);
          added++;
        } catch (ex) {
          Validation.showToast(ex.message, 'error');
          break;
        }
      }
      if (added > 0) {
        Validation.showToast(`${added} photo(s) added! 🖼️`, 'success');
        renderMemoryGrid();
      }
      memoryInput.value = '';
    });
  }

  // Drag and Drop for memory upload zone
  const memoryZone = document.getElementById('memory-upload-zone');
  if (memoryZone) {
    memoryZone.addEventListener('dragover', (e) => { e.preventDefault(); memoryZone.classList.add('drag-over'); });
    memoryZone.addEventListener('dragleave', () => memoryZone.classList.remove('drag-over'));
    memoryZone.addEventListener('drop', async (e) => {
      e.preventDefault();
      memoryZone.classList.remove('drag-over');
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      for (const file of files) {
        try { await Storage.addPhoto(file); }
        catch (ex) { Validation.showToast(ex.message, 'error'); }
      }
      renderMemoryGrid();
    });
  }

  // ── Step 3: Messages ──
  function bindMessageFields() {
    const msgFields = [
      { id: 'birthday-message', key: 'birthdayMessage', max: 200 },
      { id: 'personal-message', key: 'personalMessage', max: 2000 },
      { id: 'final-message', key: 'finalMessage', max: 500 }
    ];

    msgFields.forEach(({ id, key, max }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.value = formData[key] || '';
      Validation.attachCharCounter(id, `${id}-counter`, max);
      el.addEventListener('input', () => {
        formData[key] = el.value;
        Validation.clearError(id);
        updatePreviewField(key, el.value);
      });
    });

    // Special reasons
    renderSpecialReasons();

    document.getElementById('add-reason-btn')?.addEventListener('click', () => {
      if (!formData.specialReasons) formData.specialReasons = [];
      if (formData.specialReasons.length >= 10) {
        Validation.showToast('Maximum 10 special reasons.', 'warning');
        return;
      }
      formData.specialReasons.push('');
      renderSpecialReasons();
    });
  }

  function renderSpecialReasons() {
    const container = document.getElementById('special-reasons-list');
    if (!container || !formData.specialReasons) return;
    container.innerHTML = formData.specialReasons.map((r, i) => `
      <div class="reason-item reveal" style="display:flex; gap:0.5rem; align-items:center; margin-bottom:0.5rem;">
        <span style="font-size:1.2rem;">✨</span>
        <input class="form-input" type="text" value="${r}" placeholder="Why they're special…" data-index="${i}" maxlength="100" style="flex:1;">
        <button class="btn btn-icon btn-ghost" data-remove="${i}" aria-label="Remove reason" style="width:36px;height:36px;font-size:1rem;">✕</button>
      </div>
    `).join('');

    container.querySelectorAll('input[data-index]').forEach(input => {
      input.addEventListener('input', () => {
        formData.specialReasons[parseInt(input.dataset.index)] = input.value;
      });
      setTimeout(() => input.closest('.reveal')?.classList.add('revealed'), 50);
    });

    container.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        formData.specialReasons.splice(parseInt(btn.dataset.remove), 1);
        renderSpecialReasons();
      });
    });
  }
  bindMessageFields();

  // ── Step 4: Theme & Options ──
  function bindThemeStep() {
    // Theme Selection
    document.querySelectorAll('.theme-card').forEach(card => {
      if (card.dataset.theme === formData.theme) card.classList.add('selected');
      card.addEventListener('click', () => {
        document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        formData.theme = card.dataset.theme;
        applyTheme(card.dataset.theme);
        Validation.showToast(`Theme changed to ${card.querySelector('.theme-name').textContent}! 🎨`, 'info');
      });
    });

    // Options
    bindToggle('show-confetti', 'showConfetti');
    bindToggle('show-balloons', 'showBalloons');
    bindToggle('show-hearts', 'showHearts');
    bindToggle('show-countdown', 'showCountdown');
    bindToggle('show-mini-game', 'showMiniGame');

    // Music Upload
    const musicInput = document.getElementById('music-input');
    const musicStatus = document.getElementById('music-status');
    const removeMusicBtn = document.getElementById('remove-music-btn');

    if (musicInput) {
      musicInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          await Storage.saveMusic(file);
          if (musicStatus) musicStatus.textContent = `🎵 ${file.name}`;
          if (removeMusicBtn) removeMusicBtn.classList.remove('hidden');
          Validation.showToast('Music uploaded! 🎵', 'success');
        } catch (ex) {
          Validation.showToast(ex.message, 'error');
        }
      });
    }

    if (removeMusicBtn) {
      removeMusicBtn.addEventListener('click', () => {
        Storage.removeMusic();
        if (musicStatus) musicStatus.textContent = 'No music selected';
        removeMusicBtn.classList.add('hidden');
        if (musicInput) musicInput.value = '';
      });
    }

    // Music volume
    const volumeSlider = document.getElementById('music-volume');
    const volumeDisplay = document.getElementById('volume-display');
    if (volumeSlider) {
      volumeSlider.value = (formData.musicVolume || 0.5) * 100;
      if (volumeDisplay) volumeDisplay.textContent = `${Math.round((formData.musicVolume || 0.5) * 100)}%`;
      volumeSlider.addEventListener('input', () => {
        formData.musicVolume = volumeSlider.value / 100;
        if (volumeDisplay) volumeDisplay.textContent = `${volumeSlider.value}%`;
      });
    }

    const existingMusic = Storage.getMusic();
    if (existingMusic && musicStatus) {
      musicStatus.textContent = '🎵 Music uploaded';
      removeMusicBtn?.classList.remove('hidden');
    }
  }

  function bindToggle(toggleId, key) {
    const el = document.getElementById(toggleId);
    if (!el) return;
    el.checked = formData[key] !== undefined ? formData[key] : true;
    el.addEventListener('change', () => { formData[key] = el.checked; });
  }

  bindThemeStep();

  // ── Apply Theme ──
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    formData.theme = theme;
  }
  applyTheme(formData.theme || 'cute');

  // ── Save ──
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (!validateStep(3)) { showStep(3); return; }
      const finalData = {
        ...formData,
        specialReasons: formData.specialReasons?.filter(r => r.trim()) || []
      };
      BirthdayData.save(finalData);
      Validation.showToast('Birthday saved! 🎉 Redirecting to preview…', 'success');
      setTimeout(() => window.location.href = 'preview.html', 1800);
    });
  }

  // ── Reset ──
  document.getElementById('reset-btn')?.addEventListener('click', () => {
    Validation.showConfirm({
      title: '🗑️ Reset Birthday?',
      message: 'This will clear all your birthday data and photos. This cannot be undone.',
      confirmText: 'Reset Everything',
      cancelText: 'Keep Data',
      type: 'danger',
      onConfirm: () => {
        Storage.clearAll();
        formData = BirthdayData.getDefault();
        showStep(1);
        bindDetailsFields();
        renderMemoryGrid();
        Validation.showToast('Birthday data reset.', 'info');
      }
    });
  });

  // ── Live Preview Panel ──
  function updatePreviewField(key, value) {
    const el = document.getElementById(`preview-${key}`);
    if (el) el.textContent = value || '';
  }

  function updatePreview() {
    updatePreviewField('name', formData.name || 'Someone Special');
    updatePreviewField('age', formData.age ? `Age ${formData.age}` : '');
    updatePreviewField('relationship', formData.relationship || '');
    updatePreviewField('birthdayMessage', formData.birthdayMessage || '');
    updatePreviewField('personalMessage', formData.personalMessage?.substring(0, 100) + (formData.personalMessage?.length > 100 ? '…' : '') || '');

    const profileSrc = Storage.getProfilePhoto();
    const previewProfileImg = document.getElementById('preview-profile-img');
    if (previewProfileImg && profileSrc) {
      previewProfileImg.src = profileSrc;
      previewProfileImg.style.display = 'block';
    }

    // Birthday countdown in preview
    if (formData.birthday) {
      const today = new Date();
      const bd = new Date(formData.birthday);
      bd.setFullYear(today.getFullYear());
      if (bd < today) bd.setFullYear(today.getFullYear() + 1);
      const diff = Math.ceil((bd - today) / (1000 * 60 * 60 * 24));
      const previewCd = document.getElementById('preview-countdown');
      if (previewCd) {
        previewCd.textContent = diff === 0 ? '🎂 Today!' : `${diff} days away`;
      }
    }
  }

  // ── Storage Usage Bar ──
  function updateStorageBar() {
    const bar = document.getElementById('storage-bar');
    const pct = Storage.getUsagePercent();
    if (bar) {
      bar.style.width = `${pct}%`;
      bar.style.background = pct > 80 ? '#ff4d7e' : 'var(--gradient-primary)';
    }
    const label = document.getElementById('storage-pct');
    if (label) label.textContent = `${pct}%`;
  }
  updateStorageBar();

  // ── Initialize ──
  showStep(1);
  Animations.initScrollReveal();
  Animations.initCustomCursor();

  // Keyboard shortcut: Enter to go next
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
      if (currentStep < TOTAL_STEPS) nextBtn?.click();
    }
  });
});
