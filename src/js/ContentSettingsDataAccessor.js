/*jslint plusplus: true, white: true, browser: true */
/*global CvPlsHelper */

(function() {

  'use strict';

  function storeSettings(settingsObject) {
    var key;
    for (key in settingsObject) {
      if (typeof settingsObject[key] !== 'function') {
        if (typeof settingsObject[key] === 'object') {
          this.settingsDataStore.saveSetting(key, JSON.stringify(settingsObject[key]));
        } else {
          this.settingsDataStore.saveSetting(key, settingsObject[key]);
        }
      }
    }
  }
  function normalizeSetting(value, defaultValue) {
    var result;

    if (value == undefined || value === null) {
      return defaultValue;
    }

    switch (typeof defaultValue) {
      case 'string':
        result = String(value);
        break;

      case 'boolean':
        result = Boolean(value && value !== 'false');
        break;

      case 'number':
        result = Number(value);
        if (isNaN(result)) {
          result = defaultValue;
        }
        break;

      case 'object':
        if (typeof value === 'object') {
          result = value;
        } else if (typeof value === 'string') {
          try {
            result = JSON.parse(value);
          } catch (e) {
            result = defaultValue;
          }
        } else {
          result = defaultValue;
        }
        break;

    }

    return result;
  }

  CvPlsHelper.opera.ContentSettingsDataAccessor = function(settingsDataStore, defaultSettings) {
    this.settingsDataStore = settingsDataStore;
    this.defaultSettings = defaultSettings;
  };

  CvPlsHelper.opera.ContentSettingsDataAccessor.prototype.saveSetting = function(key, value) {
    opera.extension.postMessage({
      method: 'saveSetting',
      key: key,
      value: value
    });
    this.settingsDataStore.saveSetting(key, value);
  };

  CvPlsHelper.opera.ContentSettingsDataAccessor.prototype.getSetting = function(key) {
    if (this.defaultSettings[key] !== undefined) {
      return normalizeSetting(this.settingsDataStore.getSetting(key), this.defaultSettings[key]);
    }
    return null;
  };

  CvPlsHelper.opera.ContentSettingsDataAccessor.prototype.getAllSettings = function() {
    var key, result = {};
    for (key in this.defaultSettings) {
      if (typeof this.defaultSettings[key] !== 'function') {
        result[key] = self.getSetting(key);
      }
    }
    return result;
  };

  CvPlsHelper.opera.ContentSettingsDataAccessor.prototype.init = function(callBack) {
    opera.extension.postMessage({method: 'getAllSettings', callBack: function(settingsObject) {
      storeSettings.call(this, settingsObject);
      callBack();
    });
  };

}());