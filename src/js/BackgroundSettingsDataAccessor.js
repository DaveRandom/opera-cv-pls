/*jslint plusplus: true, white: true, browser: true */
/*global CvPlsHelper */

(function() {

  'use strict';

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
        result = Boolean(value && value !== "false");
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

  CvPlsHelper.opera.BackgroundSettingsDataAccessor = function(settingsDataStore, defaultSettings) {
    this.settingsDataStore = settingsDataStore;
    this.defaultSettings = defaultSettings;
  };

  CvPlsHelper.opera.BackgroundSettingsDataAccessor.prototype.saveSetting = function(key, value) {
    this.settingsDataStore.saveSetting(key, value);
  };

  CvPlsHelper.opera.BackgroundSettingsDataAccessor.prototype.getSetting = function(key) {
    if (this.defaultSettings[key] !== undefined) {
      return normalizeSetting(this.settingsDataStore.getSetting(key), this.defaultSettings[key]);
    }
    return null;
  };

  CvPlsHelper.opera.BackgroundSettingsDataAccessor.prototype.getAllSettings = function() {
    var key, result = {};
    for (key in this.defaultSettings) {
      if (typeof this.defaultSettings[key] !== 'function') {
        result[key] = this.getSetting(key);
      }
    }
    return result;
  };

  CvPlsHelper.opera.BackgroundSettingsDataAccessor.prototype.init = function(callBack) {
    callBack();
  };

}());