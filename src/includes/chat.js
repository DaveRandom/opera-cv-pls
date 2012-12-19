// ==UserScript==
// @include http://chat.stackoverflow.com/rooms/*
// ==/UserScript==

(function() {

  var ScriptLoader, dependencies, loader,
      loadedCount = 0; 

  ScriptLoader = function(document) {
    this.document = document;
  };

  ScriptLoader.prototype.load = function(path, callBack) {
    var file, reader, self = this;

    file = opera.extension.getFile(path);
    if (file) {
      reader = new FileReader();
      reader.onload = function() {
        self.exec(reader.result));
        if (callBack) {
          callBack(self, path);
        }
      };
      reader.readAsText(file);
    }
  };

  ScriptLoader.prototype.exec = function(code) {
    var script = this.document.createElement('script');
    script.appendChild(this.document.createTextNode(code));
    this.document.body.appendChild(script);
  };

  function main() {
    (new CvPlsHelper.ChatApplication(document, {
      SettingsDataAccessor: CvPlsHelper.opera.ContentSettingsDataAccessor,
      SettingsDataStore: CvPlsHelper.opera.SettingsDataStore,
      DefaultSettings: CvPlsHelper.opera.DefaultSettings,
      DesktopNotificationDispatcher: CvPlsHelper.opera.DesktopNotificationDispatcher
    })).start();
  }

  function loadCallback() {
    loadedCount++;
    if (loadedCount === dependencies.length) {
      loader.exec('(' + main.toString() + ')()');
    }
  }

  dependencies = [
    "/cv-pls/lib/grippie.js",
    "/cv-pls/lib/shims.js",
    "/cv-pls/lib/mutations.js",
    "/cv-pls/lib/animator.js",

    "/cv-pls/src/CvPlsHelper.js",

    "/cv-pls/src/AnimatorFactory.js",
    "/cv-pls/src/ApiResponseProcessor.js",
    "/cv-pls/src/AudioPlayer.js",
    "/cv-pls/src/AvatarNotificationDisplay.js",
    "/cv-pls/src/AvatarNotificationDisplayFactory.js",
    "/cv-pls/src/AvatarNotificationManager.js",
    "/cv-pls/src/ButtonsManager.js",
    "/cv-pls/src/ChatRoom.js",
    "/cv-pls/src/Collection.js",
    "/cv-pls/src/CollectionFactory.js",
    "/cv-pls/src/CvBacklog.js",
    "/cv-pls/src/DesktopNotification.js",
    "/cv-pls/src/GrippieFactory.js",
    "/cv-pls/src/OneBox.js",
    "/cv-pls/src/OneBoxFactory.js",
    "/cv-pls/src/Post.js",
    "/cv-pls/src/PostFactory.js",
    "/cv-pls/src/QuestionStatusPoller.js",
    "/cv-pls/src/SoundManager.js",
    "/cv-pls/src/StackApi.js",
    "/cv-pls/src/VoteQueueProcessor.js",
    "/cv-pls/src/VoteRemoveProcessor.js",
    "/cv-pls/src/VoteRequestBufferFactory.js",
    "/cv-pls/src/VoteRequestListener.js",

    "/cv-pls/src/ChatApplication.js",

    "/js/ContentSettingsDataAccessor.js",
    "/js/DefaultSettings.js",
    "/js/DesktopNotificationDispatcher.js",
    "/js/SettingsDataStore.js"
  ];

  loader = new ScriptLoader(document);

  window.addEventListener('DOMContentLoaded', function() {
    var i, l = dependencies.length;
    for (i = 0; i < l; i++) {
      loader.load(dependencies[i], loadCallback);
    }
  }, false);

}());