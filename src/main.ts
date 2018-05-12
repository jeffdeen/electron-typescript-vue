import { BrowserWindow, app } from "electron";

const PAGE_URL = process.env.NODE_ENV === "development"
    ? `http://localhost:9090`
    : `file://${__dirname}/index.html`;

app.on("ready", function () {
  const win = new BrowserWindow();
  win.loadURL(PAGE_URL);
  win.setSize(1024, 768);
  win.show();

  win.once("closed", () => {
    win.destroy();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
