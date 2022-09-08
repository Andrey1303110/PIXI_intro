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

    const tank = new Tank();
    app.stage.addChild(tank.view);
    app.stage.position.set(1280/2, 720/2);

    const tweenManager = new TweenManager(app.ticker);

    let tank_is_moved = false;

    function moveTank({ data }) {
        const distanceToCenter = data.getLocalPosition(app.stage);
        const distanceToTank = data.getLocalPosition(tank.view);
        const angle = Math.atan2(distanceToTank.y, distanceToTank.x);

        let duration = 750

        function move() {
            if (tank_is_moved) {
                return;
            }
            tweenManager.createTween(tank, duration * 4, { x: distanceToCenter.x, y: distanceToCenter.y }, {
                onStart: () => {
                    tank_is_moved = true;
                    tank.tracksStart();
                },
                onFinish: () => {
                    tank.tracksStop();
                    tank_is_moved = false;
                }
            });
        }

        tweenManager.createTween(tank, duration, { towerDirection: angle });

        if (tank_is_moved) {
            return;
        }

        tweenManager.createTween(tank, duration * 1.5, { bodyDirection: angle }, {
            onStart: () => {
                tank.tracksStart();
            },
            onFinish: () => {
                move();
            }
        });
    };

    app.stage.on("pointerdown", moveTank, undefined);
    app.stage.interactive = true;
    app.stage.interactiveChildren = false;
    app.stage.hitArea = new PIXI.Rectangle(-1280/2, -720/2, 1280, 720);
}

assetsMap.sprites.forEach((value) => app.loader.add(value.name, value.url));
app.loader.load(runGame);

