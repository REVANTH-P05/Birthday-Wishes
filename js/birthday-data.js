/**
 * BirthdayVerse – Birthday Data Module
 * Manages birthday configuration, URL payload encoding for sharing, and default data structure.
 */

// ── Lightweight Embedded LZString Engine (Zero external dependency) ──
const LZString = (function() {
  const f = String.fromCharCode;
  const keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
  const baseReverseDic = {};

  function getBaseValue(alphabet, character) {
    if (!baseReverseDic[alphabet]) {
      baseReverseDic[alphabet] = {};
      for (let i = 0; i < alphabet.length; i++) {
        baseReverseDic[alphabet][alphabet.charAt(i)] = i;
      }
    }
    return baseReverseDic[alphabet][character];
  }

  return {
    compressToEncodedURIComponent: function(input) {
      if (input == null) return "";
      return LZString._compress(input, 6, function(a) { return keyStrUriSafe.charAt(a); });
    },
    decompressFromEncodedURIComponent: function(input) {
      if (input == null) return "";
      if (input == "") return null;
      input = input.replace(/ /g, "+");
      return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
    },
    _compress: function(uncompressed, bitsPerMode, getCharFromMode) {
      if (uncompressed == null) return "";
      let i, value,
        context_dictionary = {},
        context_dictionaryToCreate = {},
        context_c = "",
        context_wc = "",
        context_w = "",
        context_enlargeIn = 2,
        context_dictSize = 3,
        context_numBits = 2,
        context_data = [],
        context_data_val = 0,
        context_data_position = 0,
        ii;

      for (ii = 0; ii < uncompressed.length; ii += 1) {
        context_c = uncompressed.charAt(ii);
        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
          context_dictionary[context_c] = context_dictSize++;
          context_dictionaryToCreate[context_c] = true;
        }

        context_wc = context_w + context_c;
        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
          context_w = context_wc;
        } else {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1);
                if (context_data_position == bitsPerMode - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromMode(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 8; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerMode - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromMode(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            } else {
              value = 1;
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1) | value;
                if (context_data_position == bitsPerMode - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromMode(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = 0;
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 16; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerMode - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromMode(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
            delete context_dictionaryToCreate[context_w];
          } else {
            value = context_dictionary[context_w];
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerMode - 1) {
                context_data_position = 0;
                context_data.push(getCharFromMode(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          context_dictionary[context_wc] = context_dictSize++;
          context_w = String(context_c);
        }
      }

      if (context_w !== "") {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerMode - 1) {
                context_data_position = 0;
                context_data.push(getCharFromMode(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 8; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerMode - 1) {
                context_data_position = 0;
                context_data.push(getCharFromMode(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position == bitsPerMode - 1) {
                context_data_position = 0;
                context_data.push(getCharFromMode(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 16; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerMode - 1) {
                context_data_position = 0;
                context_data.push(getCharFromMode(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position == bitsPerMode - 1) {
              context_data_position = 0;
              context_data.push(getCharFromMode(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
      }

      value = 2;
      for (i = 0; i < context_numBits; i++) {
        context_data_val = (context_data_val << 1) | (value & 1);
        if (context_data_position == bitsPerMode - 1) {
          context_data_position = 0;
          context_data.push(getCharFromMode(context_data_val));
          context_data_val = 0;
        } else {
          context_data_position++;
        }
        value = value >> 1;
      }

      while (true) {
        context_data_val = (context_data_val << 1);
        if (context_data_position == bitsPerMode - 1) {
          context_data.push(getCharFromMode(context_data_val));
          break;
        } else context_data_position++;
      }
      return context_data.join('');
    },
    _decompress: function(length, resetValue, getNextValue) {
      let dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        data = { val: getNextValue(0), position: resetValue, index: 1 };

      for (i = 0; i < 3; i += 1) {
        dictionary[i] = i;
      }

      bits = 0;
      maxpower = Math.pow(2, 2);
      power = 1;
      while (power != maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (next = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2, 8);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          c = f(bits);
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2, 16);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          c = f(bits);
          break;
        case 2:
          return "";
      }
      dictionary[3] = c;
      w = c;
      result.push(c);
      while (true) {
        if (data.index > length) {
          return "";
        }

        bits = 0;
        maxpower = Math.pow(2, numBits);
        power = 1;
        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position == 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }

        switch (c = bits) {
          case 0:
            bits = 0;
            maxpower = Math.pow(2, 8);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            dictionary[dictSize++] = f(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;
          case 1:
            bits = 0;
            maxpower = Math.pow(2, 16);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            dictionary[dictSize++] = f(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;
          case 2:
            return result.join('');
        }

        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }

        if (dictionary[c]) {
          entry = dictionary[c];
        } else {
          if (c === dictSize) {
            entry = w + w.charAt(0);
          } else {
            return null;
          }
        }
        result.push(entry);

        dictionary[dictSize++] = w + entry.charAt(0);
        enlargeIn--;

        w = entry;

        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }
      }
    }
  };
})();


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
          console.warn('Error reading birthday config from storage:', e);
        }
      }
      return this.getDefault();
    },

    save(data) {
      const updated = {
        ...this.getCurrent(),
        ...data,
        updatedAt: new Date().toISOString()
      };
      if (!updated.createdAt) updated.createdAt = updated.updatedAt;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    },

    isConfigured(data) {
      const target = data || this.getCurrent();
      return !!(target && (
        (target.name && target.name.trim().length > 0) ||
        (target.birthdayMessage && target.birthdayMessage.trim().length > 0) ||
        target.birthday
      ));
    },

    // ── URL Payload Encoding for Sharing (LZ-String Compressed with Base64 Fallback) ──
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
        if (typeof LZString !== 'undefined' && LZString.compressToEncodedURIComponent) {
          const compressed = LZString.compressToEncodedURIComponent(json);
          if (compressed) return 'z_' + compressed;
        }
        return btoa(encodeURIComponent(json)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      } catch (e) {
        console.error('Error encoding share payload:', e);
        try {
          const textOnly = { ...payload, p: null, ph: [] };
          const json = JSON.stringify(textOnly);
          return btoa(encodeURIComponent(json)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        } catch (err) {
          return null;
        }
      }
    },

    decodeShareData(encodedStr) {
      if (!encodedStr || encodedStr === 'null' || encodedStr === 'undefined') return null;
      try {
        let json = null;
        let str = String(encodedStr).trim();

        // 1. Direct JSON check (for raw or URLSearchParams-decoded JSON strings)
        if (str.startsWith('{') && str.endsWith('}')) {
          json = str;
        }

        // 2. Try URL-unescaped JSON check
        if (!json) {
          try {
            const unescaped = decodeURIComponent(str);
            if (unescaped.trim().startsWith('{') && unescaped.trim().endsWith('}')) {
              json = unescaped.trim();
            }
          } catch (e0) {}
        }

        // 3. LZString compressed payload (starts with z_)
        if (!json && str.startsWith('z_')) {
          const raw = str.slice(2);
          if (typeof LZString !== 'undefined' && LZString.decompressFromEncodedURIComponent) {
            json = LZString.decompressFromEncodedURIComponent(raw);
          }
        }

        // 4. Base64 encoded JSON payload fallback
        if (!json) {
          try {
            let cleaned = decodeURIComponent(str.replace(/_/g, '/').replace(/-/g, '+'));
            json = decodeURIComponent(atob(cleaned));
          } catch (e1) {
            try {
              json = decodeURIComponent(atob(str));
            } catch (e2) {}
          }
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

      while ((!encoded || encoded.length > MAX_SAFE_URL_LEN) && compressedPhotos.length > 0) {
        compressedPhotos.pop();
        encoded = this.encodeShareData(currentData, compressedProfile, compressedPhotos);
      }

      if (!encoded || encoded === 'null' || encoded === 'undefined' || encoded.length > MAX_SAFE_URL_LEN) {
        encoded = this.encodeShareData(currentData, null, []);
      }

      if (!encoded || encoded === 'null' || encoded === 'undefined') {
        const textOnly = { ...currentData, profileImage: null, photos: [] };
        encoded = 'z_' + LZString.compressToEncodedURIComponent(JSON.stringify(textOnly));
      }

      const rawSlug = customSlug || currentData.relationship || currentData.name || 'surprise';
      const cleanSlug = rawSlug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'surprise';

      let baseUrl = window.location.href.split('#')[0].split('?')[0];
      if (/(customize|preview)\.html$/i.test(baseUrl)) {
        baseUrl = baseUrl.replace(/(customize|preview)\.html$/i, 'index.html');
      } else if (!/index\.html$/i.test(baseUrl)) {
        baseUrl = baseUrl.replace(/\/$/, '') + '/index.html';
      }

      return `${baseUrl}?to=${cleanSlug}&card=${encodeURIComponent(encoded)}`;
    },

    getSharedDataFromUrl() {
      try {
        // 1. Check Search Parameters (?card=...)
        const urlParams = new URLSearchParams(window.location.search);
        let cardParam = urlParams.get('card') || urlParams.get('greeting') || urlParams.get('d') || urlParams.get('c');

        if (!cardParam && window.location.search) {
          const match = window.location.search.match(/[?&](card|greeting|d|c)=([^&]+)/i);
          if (match && match[2]) {
            cardParam = decodeURIComponent(match[2]);
          }
        }

        // 2. Check Location Hash (#card=... or #z_...)
        if (!cardParam && window.location.hash) {
          const hash = window.location.hash.replace(/^#/, '');
          if (hash.startsWith('z_') || hash.startsWith('{') || hash.length > 10) {
            cardParam = hash;
          } else {
            const hashParams = new URLSearchParams(hash);
            cardParam = hashParams.get('card') || hashParams.get('greeting') || hashParams.get('d') || hashParams.get('c');
          }
        }

        if (cardParam && cardParam !== 'null' && cardParam !== 'undefined') {
          const decoded = this.decodeShareData(cardParam);
          if (decoded && (decoded.name || decoded.birthdayMessage)) {
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
      }
      if (!data.birthday) {
        errors.birthday = 'Birthday date is required.';
      }
      if (!data.birthdayMessage || data.birthdayMessage.trim().length === 0) {
        errors.birthdayMessage = 'Birthday message is required.';
      }
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    }
  };
})();
