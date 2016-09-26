window.Chroots = new Mongo.Collection('chroots');
window.Apps = new Mongo.Collection('fd-apps');

Meteor.subscribe('chroots');
Meteor.subscribe('fd-apps');

/*
var appNames = [
  'Inkscape',
  'GIMP',
  'Firefox',
  'Atom',
  'IntelliJ IDEA',
  'Orage Calendar',
  'Dictionary',
  'Ristretto Image Viewer',
  'Task Manager',
  'Bulk Rename',
  'GDebi Package Installer', 
  'XTerm',
  'xeyes',
  'xcalc',
  'htop',
  'Thunar File Manager',
  'Xfce Terminal',
  'File Manager',

  'XFCE4',
  
  // Examples
  'OpenTTD',
  'VLC',
  'MPlayer',
  'Emacs',
  'Sublime',
  'Telegram',
  'Gedit',
  'Geany',
  'Spotify',
  'Steam',
  'Eclipse',
  'Android Studio',
;]
*/

window.onload = () => {
  input = document.querySelector('.search-box input');
  dupped = document.querySelector('.search-box .autocomplete .dupped');
  suggestion = document.querySelector('.search-box .autocomplete .rest');

  function updateSuggestion(event) {
    app = Apps.find({'Entry.Type': 'Application'}).fetch().find((app) => {
      return app.Entry.Name.toLowerCase().startsWith(input.value.toLowerCase());
    });
    
    if (input.value.length && app) {
      var duppedT = app.Entry.Name.slice(0, input.value.length);
      dupped.innerText = duppedT;
      if (duppedT != input.value)
        input.value = duppedT;

      suggestion.innerText = app.Entry.Name.slice(input.value.length);
    } else {
      // input.value = appName.slice(0);
      
      dupped.innerText = '';
      suggestion.innerText = '';
    }
  }

  input.addEventListener('input', updateSuggestion);
};

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }

  if (event.key === 'Escape') {
    window.close();
    event.preventDefault();
  }
}, true);