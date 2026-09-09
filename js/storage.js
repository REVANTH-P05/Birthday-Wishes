/**
 * BirthdayVerse – Storage Module
 * Handles all persistent storage operations including photo storage.
 */

const Storage = (() => {
  const PHOTOS_KEY = 'birthdayverse_photos';
  const PROFILE_KEY = 'birthdayverse_profile';
  const MUSIC_KEY = 'birthdayverse_music';

  const MAX_PHOTO_SIZE_MB = 5;
  const MAX_PHOTOS = 12;
  const MAX_PROFILE_SIZE_MB = 5;

  // ── Image Utilities ──
  function compressImage(file, maxWidth = 1200, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function validateImageFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Please choose a JPG, PNG, or WEBP image.' };
    }
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_PHOTO_SIZE_MB) {
      return { valid: false, error: `Image must be under ${MAX_PHOTO_SIZE_MB}MB. This file is ${sizeMB.toFixed(1)}MB.` };
    }
    return { valid: true };
  }

  return {
    // ── Profile Photo ──
    async saveProfilePhoto(file) {
      const validation = validateImageFile(file);
      if (!validation.valid) throw new Error(validation.error);

      const compressed = await compressImage(file, 800, 0.85);
      localStorage.setItem(PROFILE_KEY, compressed);
      return compressed;
    },

    getProfilePhoto() {
      return localStorage.getItem(PROFILE_KEY);
    },

    removeProfilePhoto() {
      localStorage.removeItem(PROFILE_KEY);
    },

    // ── Memory Photos ──
    getPhotos() {
      const stored = localStorage.getItem(PHOTOS_KEY);
      if (!stored) return [];
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    },

    async addPhoto(file, caption = '') {
      const photos = this.getPhotos();
      if (photos.length >= MAX_PHOTOS) {
        throw new Error(`Maximum ${MAX_PHOTOS} photos allowed.`);
      }
      const validation = validateImageFile(file);
      if (!validation.valid) throw new Error(validation.error);

      const compressed = await compressImage(file, 1200, 0.8);
      photos.push({ src: compressed, caption });
      localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
      return photos;
    },

    removePhoto(index) {
      const photos = this.getPhotos();
      photos.splice(index, 1);
      localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
      return photos;
    },

    updatePhotoCaption(index, caption) {
      const photos = this.getPhotos();
      if (photos[index]) {
        photos[index].caption = caption;
        localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
      }
    },

    clearPhotos() {
      localStorage.removeItem(PHOTOS_KEY);
    },

    getPhotoCount() {
      return this.getPhotos().length;
    },

    maxPhotos: MAX_PHOTOS,

    // ── Music ──
    async saveMusic(file) {
      // Accept any audio type - browsers sometimes use application/octet-stream for audio
      const isAudio = file.type.startsWith('audio/') ||
                      file.type === 'application/octet-stream' ||
                      /\.(mp3|wav|ogg|m4a|aac|flac|weba)$/i.test(file.name);
      if (!isAudio) {
        throw new Error('Please select an audio file (MP3, WAV, OGG, M4A).');
      }
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > 10) {
        throw new Error(`Music file must be under 10MB. This file is ${sizeMB.toFixed(1)}MB. Please compress or choose a shorter clip.`);
      }
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            localStorage.setItem(MUSIC_KEY, e.target.result);
            resolve(e.target.result);
          } catch (storageErr) {
            // localStorage quota exceeded
            reject(new Error(
              'Not enough browser storage for this music file. ' +
              'Try a smaller file (under 3MB works best), or clear some stored photos first.'
            ));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read the music file. Please try again.'));
        reader.readAsDataURL(file);
      });
    },

    getMusic() {
      return localStorage.getItem(MUSIC_KEY);
    },

    removeMusic() {
      localStorage.removeItem(MUSIC_KEY);
    },

    // ── Clear All ──
    clearAll() {
      window.BirthdayData && window.BirthdayData.reset();
      this.clearPhotos();
      this.removeProfilePhoto();
      this.removeMusic();
    },

    // ── Storage Usage ──
    getUsagePercent() {
      try {
        let total = 0;
        for (const key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length * 2; // UTF-16
          }
        }
        const maxBytes = 5 * 1024 * 1024; // ~5MB typical limit
        return Math.min(100, Math.round((total / maxBytes) * 100));
      } catch {
        return 0;
      }
    }
  };
})();

window.Storage = Storage;
