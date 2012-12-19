/*jslint plusplus: true, white: true, browser: true */
/*global CvPlsHelper, localStorage */

(function() {

  'use strict';

  CvPlsHelper.opera.SettingsDataStore = function() {};

  CvPlsHelper.opera.SettingsDataStore.prototype.getSetting = function(key) {
    return localStorage.getItem(key);
  };

  CvPlsHelper.opera.SettingsDataStore.prototype.saveSetting = function(key, value) {
    localStorage.setItem(key, value);
  };

  CvPlsHelper.opera.SettingsDataStore.prototype.deleteSetting = function(key) {
    localStorage.remove(key);
  };

  CvPlsHelper.opera.SettingsDataStore.prototype.truncate = function() {
    localStorage.clear();
  };

}());