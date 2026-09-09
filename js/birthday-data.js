/**
 * BirthdayVerse – Birthday Data Module
 * Manages birthday configuration, URL payload encoding for sharing, and default data structure.
 */

const BirthdayData = (() => {
  const STORAGE_KEY = 'birthdayverse_config';

  const defaultData = {
    name: '',
    age: '',
    relationship: '',
    birthday: '',
    birthdayMessage: '',
    personalMessage: '',
    specialReasons: [],
    finalMessage: '',
    theme: 'cute',
    musicVolume: 0.5,
    showCountdown: false,
    showMiniGame: false,
    showConfetti: true,
    showBalloons: true,
    showHearts: true,
    createdAt: null,
    updatedAt: null
  };

  return {
    getDefault() {
      return JSON.parse(JSON.stringify(defaultData));
    },

    getCurrent() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return { ...this.getDefault(), ...parsed };
        } catch (e) {
          console.warn('Failed to parse stored birthday data, using defaults.');
        }
      }
      return this.getDefault();
    },

    save(data) {
      const toSave = { ...data, updatedAt: new Date().toISOString() };
      if (!toSave.createdAt) {
        toSave.createdAt = new Date().toISOString();
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    },

    reset() {
      localStorage.removeItem(STORAGE_KEY);
    },

    isConfigured(customData = null) {
      const target = customData || this.getCurrent();
      return (
        target &&
        typeof target.name === 'string' && target.name.trim().length > 0 &&
        typeof target.birthdayMessage === 'string' && target.birthdayMessage.trim().length > 0
      );
    },

    // ── URL Payload Encoding for Sharing ──
    encodeShareData(data, profilePhoto = null, photos = []) {
      const payload = {
        n: data.name || '',
        a: data.age || '',
        r: data.relationship || '',
        b: data.birthday || '',
        bm: data.birthdayMessage || '',
        pm: data.personalMessage || '',
        sr: data.specialReasons || [],
        fm: data.finalMessage || '',
        t: data.theme || 'cute',
        cd: data.showCountdown === true,
        mg: data.showMiniGame === true,
        cf: data.showConfetti !== false,
        bl: data.showBalloons !== false,
        ht: data.showHearts !== false,
        p: profilePhoto || null,
        ph: (photos || []).map(p => ({ s: p.src, c: p.caption || '' }))
      };
      try {
        const json = JSON.stringify(payload);
        // Safe UTF-8 Base64 encoding
        return btoa(encodeURIComponent(json));
      } catch (e) {
        console.error('Error encoding share payload:', e);
        return null;
      }
    },

    decodeShareData(encodedStr) {
      if (!encodedStr) return null;
      try {
        const json = decodeURIComponent(atob(encodedStr));
        const p = JSON.parse(json);
        return {
          name: p.n || '',
          age: p.a || '',
          relationship: p.r || '',
          birthday: p.b || '',
          birthdayMessage: p.bm || '',
          personalMessage: p.pm || '',
          specialReasons: p.sr || [],
          finalMessage: p.fm || '',
          theme: p.t || 'cute',
          showCountdown: p.cd === true,
          showMiniGame: p.mg === true,
          showConfetti: p.cf !== false,
          showBalloons: p.bl !== false,
          showHearts: p.ht !== false,
          profileImage: p.p || null,
          photos: (p.ph || []).map(item => ({ src: item.s, caption: item.c }))
        };
      } catch (e) {
        console.warn('Failed to decode URL share payload:', e);
        return null;
      }
    },

    getShareUrl() {
      const currentData = this.getCurrent();
      const profile = (typeof Storage !== 'undefined') ? Storage.getProfilePhoto() : null;
      const photos = (typeof Storage !== 'undefined') ? Storage.getPhotos() : [];

      // Try full encoding with photos
      let encoded = this.encodeShareData(currentData, profile, photos);

      // If payload is over 6KB (for URL safety across all browsers), strip photos
      if (encoded && encoded.length > 6000) {
        encoded = this.encodeShareData(currentData, null, []);
      }

      const path = window.location.pathname.replace(/(customize|preview)\.html$/, 'index.html');
      const origin = window.location.origin;
      return `${origin}${path}?card=${encoded}`;
    },

    getSharedDataFromUrl() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const cardParam = urlParams.get('card') || urlParams.get('greeting') || urlParams.get('d');
        if (cardParam) {
          return this.decodeShareData(cardParam);
        }
      } catch (e) {
        console.warn('Error reading URL parameters:', e);
      }
      return null;
    },

    validate(data) {
      const errors = {};
      if (!data.name || data.name.trim().length === 0) {
        errors.name = 'Name is required.';
      } else if (data.name.trim().length > 50) {
        errors.name = 'Name must be under 50 characters.';
      }
      if (!data.birthday) {
        errors.birthday = 'Birthday date is required.';
      }
      if (!data.birthdayMessage || data.birthdayMessage.trim().length === 0) {
        errors.birthdayMessage = 'Birthday message is required.';
      } else if (data.birthdayMessage.length > 200) {
        errors.birthdayMessage = 'Birthday message must be under 200 characters.';
      }
      if (data.personalMessage && data.personalMessage.length > 2000) {
        errors.personalMessage = 'Personal message must be under 2000 characters.';
      }
      if (data.finalMessage && data.finalMessage.length > 500) {
        errors.finalMessage = 'Final message must be under 500 characters.';
      }
      if (data.age !== '' && data.age !== null) {
        const age = parseInt(data.age);
        if (isNaN(age) || age < 1 || age > 150) {
          errors.age = 'Please enter a valid age (1–150).';
        }
      }
      return errors;
    }
  };
})();

window.BirthdayData = BirthdayData;
