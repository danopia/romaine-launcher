/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */

chrome.commands.onCommand.addListener(launch);
chrome.app.runtime.onLaunched.addListener(launch);

function launch(launchData) {
  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;
  var width = 450;
  var height = 88;
  
  chrome.app.window.create('index.html', {
    id: 'mainWindow',
    frame: {
      color: '#8bc34a',
    },
    resizable: false,
    alwaysOnTop: true,
    visibleOnAllWorkspaces: true,
    innerBounds: {
      width: width,
      height: height,
      left: Math.round((screenWidth-width)/2),
      top: Math.round((screenHeight-height)/2),
    },
  }, (win) => {
    win.innerBounds.setPosition(
      Math.round((screenWidth-width)/2),
      Math.round((screenHeight-height)/2)
    );
  });
}
