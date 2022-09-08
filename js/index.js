import * as PIXI from "./pixi.mjs";
import { assetsMap } from "./assetsMap.js";
import { Tank } from "./Tank.js";
import { TweenManager, Tween } from "./Tween.js";

const app = new PIXI.Application({
    width: 1280,
    height: 720,
    backgroundColor: 0xc2c2c2
});

document.body.appendChild(app.view);

const runGame = () => {
    const marker = new PIXI.Graphics();
    let params = {
        x: 1/3,
        y: 1/3,
        width: .5,
        height: .5
    };
    marker
    .beginFill(0xff0000, .45)
    .drawCircle(0, 0, 25)
    .endFill();

    const tank = new Tank();
    
    app.stage.addChild(tank.view);
    app.stage.addChild(marker);

    app.stage.position.set(1280/2, 720/2);

    const tweenManager = new TweenManager(app.ticker);
}

assetsMap.sprites.forEach((value) => app.loader.add(value.name, value.url));
app.loader.load(runGame);

