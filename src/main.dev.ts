process.env.NODE_ENV = "development";

import { app } from "electron";
import * as edi from "electron-devtools-installer";
const electron_debug = require("electron-debug");

electron_debug({ showDevTools: true });

app.on("ready", function () {
  edi.default(edi.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => console.warn("Unable to install `vue-devtools`: \n", err));
});

require("./main");
