import { AnimatedSprite, Container, Sprite, Texture } from "./pixi.mjs";

export const createAnimatedSprite = (textureNames, position = { x: 0, y: 0 }, anchor) => {
    const textures = textureNames.map(name => Texture.from(name));

    const animatedSprite = new AnimatedSprite(textures);
    animatedSprite.position.copyFrom(position);
    animatedSprite.anchor.copyFrom(anchor);

    return animatedSprite;
}

export const createSprite = (textureName, position = { x: 0, y: 0 }) => {
    const sprite = new Sprite(Texture.from(textureName));
    sprite.position.copyFrom(position);
    sprite.anchor.set(0.5);

    return sprite;
}

export class Tank {
    constructor() {
        this._view = new Container();

        this.createBodyContainer();
        this.createTowerContainer();

        /*
        setInterval(() => {
            this.rotateTowerBy(1);
            this.rotateBodyBy(-.1);
        }, 1000 / 60);
        */
    }


    set towerDirection(value) {
        this._towerContainer.rotation = value;
    }

    get towerDirection() {
        return this._towerContainer.rotation;
    }

    set bodyDirection(value) {
        this._bodyContainer.rotation = value;
    }

    get bodyDirection() {
        return this._bodyContainer.rotation;
    }

    get x() {
        return this._view.position.x;
    }

    set x(value) {
        this._view.position.x = value;
    }

    get y() {
        return this._view.position.y;
    }

    set y(value) {
        this._view.position.y = value;
    }

    tracksStart() {
        this._tracksLeft.play();
        this._tracksRight.play();
    }

    tracksStop() {
        this._tracksLeft.stop();
        this._tracksRight.stop();
    }

    createBodyContainer() {
        this._bodyContainer = new Container();
        this._view.addChild(this._bodyContainer);

        const textures = ["TrackСFrame1", "TrackСFrame2"];

        this._tracksLeft = createAnimatedSprite(textures, { x: 0, y: -80 }, { x: .5, y: .5 });
        this._tracksRight = createAnimatedSprite(textures, { x: 0, y: 80 }, { x: .5, y: .5 });
        this._tracksRight.animationSpeed = .225;
        this._tracksLeft.animationSpeed = .225;

        this._bodyContainer.addChild(this._tracksLeft, this._tracksRight);

        this._hull = new Sprite(Texture.from("HeavyHullB"));
        this._hull.anchor.set(.5);

        this._bodyContainer.addChild(this._hull);
    }

    createTowerContainer() {
        this._towerContainer = new Container();
        this._view.addChild(this._towerContainer);

        this.createGuns();
        this.createTower();
    }

    createGuns() {
        const gunLeft = createSprite("HeavyGunB", { x: 138, y: -27 });
        const gunRight = createSprite("HeavyGunB", { x: 160, y: 29 });
        this._towerContainer.addChild(gunLeft, gunRight);
        this.createGunsConnectors({ x: gunLeft.x, y: gunLeft.y });
        this.createGunsConnectors({ x: gunRight.x, y: gunRight.y });
    }

    createGunsConnectors(params) {
        const gunLeftConnector = createSprite("GunConnectorB", { x: params.x - 161 / 2, y: params.y });
        const gunRightConnector = createSprite("GunConnectorB", { x: params.x - 161 / 2, y: params.y });
        this._towerContainer.addChild(gunLeftConnector, gunRightConnector);
    }

    createTower() {
        const tower = createSprite("HeavyTowerB");
        this._towerContainer.addChild(tower);
    }

    get view() {
        return this._view;
    }
}