import * as PIXI from "./pixi.mjs";

const app = new PIXI.Application({
    width: 1280,
    height: 720,
});

document.body.appendChild(app.view);