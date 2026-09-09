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

    // ── URL Payload Encoding for Sharing (LZ-String Compressed) ──
    encodeShareData(data, profilePhoto = null, photos = []) {
      const formatImg = (src) => {
        if (!src || typeof src !== 'string') return null;
        return src.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
      };

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
        p: formatImg(profilePhoto),
        ph: (photos || []).map(item => ({
          s: formatImg(item.src),
          c: item.caption || ''
        }))
      };
      try {
        const json = JSON.stringify(payload);
        const compressed = LZString.compressToEncodedURIComponent(json);
        return 'z_' + compressed;
      } catch (e) {
        console.error('Error encoding share payload:', e);
        return null;
      }
    },

    decodeShareData(encodedStr) {
      if (!encodedStr) return null;
      try {
        let json = null;
        if (encodedStr.startsWith('z_')) {
          const raw = encodedStr.slice(2);
          json = LZString.decompressFromEncodedURIComponent(raw);
        } else {
          let cleaned = decodeURIComponent(encodedStr);
          cleaned = cleaned.replace(/ /g, '+');
          json = decodeURIComponent(atob(cleaned));
        }

        if (!json) return null;
        const p = JSON.parse(json);

        const restoreImg = (str) => {
          if (!str || typeof str !== 'string') return null;
          if (str.startsWith('data:') || str.startsWith('http')) return str;
          return 'data:image/jpeg;base64,' + str;
        };

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
          profileImage: restoreImg(p.p),
          photos: (p.ph || []).map(item => ({
            src: restoreImg(item.s),
            caption: item.c || ''
          }))
        };
      } catch (e) {
        console.warn('Failed to decode URL share payload:', e);
        return null;
      }
    },

    async getShareUrl(customSlug = null) {
      const currentData = this.getCurrent();
      const rawProfile = (typeof Storage !== 'undefined') ? Storage.getProfilePhoto() : null;
      const rawPhotos = (typeof Storage !== 'undefined') ? Storage.getPhotos() : [];

      let compressedProfile = null;
      if (rawProfile && typeof Storage !== 'undefined' && Storage.compressDataUrl) {
        compressedProfile = await Storage.compressDataUrl(rawProfile, 250, 0.55);
      } else {
        compressedProfile = rawProfile;
      }

      let compressedPhotos = [];
      if (rawPhotos.length > 0 && typeof Storage !== 'undefined' && Storage.compressDataUrl) {
        compressedPhotos = await Promise.all(
          rawPhotos.map(async (p) => ({
            src: await Storage.compressDataUrl(p.src, 400, 0.55),
            caption: p.caption || ''
          }))
        );
      } else {
        compressedPhotos = rawPhotos;
      }

      const MAX_SAFE_URL_LEN = 65000;
      let encoded = this.encodeShareData(currentData, compressedProfile, compressedPhotos);

      while (encoded && encoded.length > MAX_SAFE_URL_LEN && compressedPhotos.length > 0) {
        compressedPhotos.pop();
        encoded = this.encodeShareData(currentData, compressedProfile, compressedPhotos);
      }

      if (encoded && encoded.length > MAX_SAFE_URL_LEN) {
        encoded = this.encodeShareData(currentData, null, []);
      }

      const rawSlug = customSlug || currentData.relationship || currentData.name || 'surprise';
      const cleanSlug = rawSlug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'surprise';

      const isFile = window.location.protocol === 'file:';
      let longUrl = '';

      if (isFile) {
        let href = window.location.href.split('#')[0].split('?')[0];
        if (/(customize|preview)\.html$/i.test(href)) {
          href = href.replace(/(customize|preview)\.html$/i, 'index.html');
        } else if (!/index\.html$/i.test(href)) {
          href = href.replace(/\/$/, '') + '/index.html';
        }
        longUrl = `${href}?to=${cleanSlug}&card=${encoded}#${encoded}`;
      } else {
        const origin = window.location.origin;
        longUrl = `${origin}/${cleanSlug}?card=${encoded}#${encoded}`;
      }

      return longUrl;
    },

    async getShortenedUrl(longUrl) {
      if (!longUrl || typeof longUrl !== 'string') return null;
      try {
        const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const shortUrl = await res.text();
          if (shortUrl && shortUrl.startsWith('http')) {
            return shortUrl.trim();
          }
        }
      } catch (e) {
        console.warn('Shortener API error:', e);
      }
      return null;
    },

    getSharedDataFromUrl() {
      try {
        // 1. Check Search Parameters (?card=...)
        const urlParams = new URLSearchParams(window.location.search);
        let cardParam = urlParams.get('card') || urlParams.get('greeting') || urlParams.get('d') || urlParams.get('c');

        // 2. Check Location Hash (#card=... or #z_...)
        if (!cardParam && window.location.hash) {
          const hash = window.location.hash.replace(/^#/, '');
          if (hash.startsWith('z_')) {
            cardParam = hash;
          } else {
            const hashParams = new URLSearchParams(hash);
            cardParam = hashParams.get('card') || hashParams.get('greeting') || hashParams.get('d') || hashParams.get('c');
          }
        }

        if (cardParam) {
          const decoded = this.decodeShareData(cardParam);
          if (decoded && decoded.name) {
            return decoded;
          }
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
