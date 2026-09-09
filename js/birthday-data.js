/**
 * BirthdayVerse – Birthday Data Module
 * Manages birthday configuration and default data structure.
 */

const BirthdayData = (() => {
  const STORAGE_KEY = 'birthdayverse_config';

  // No pre-filled content – everything starts EMPTY.
  // A real save() call is required before the experience shows real data.
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
          // Only merge stored keys – don't fill in empty defaults from stored nulls
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

    // A birthday is "configured" if the sender has saved a name AND birthday date AND message.
    // This prevents the experience from opening with just default/empty values.
    isConfigured() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;
      try {
        const parsed = JSON.parse(stored);
        return (
          parsed.name && parsed.name.trim().length > 0 &&
          parsed.birthday && parsed.birthday.trim().length > 0 &&
          parsed.birthdayMessage && parsed.birthdayMessage.trim().length > 0
        );
      } catch {
        return false;
      }
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
