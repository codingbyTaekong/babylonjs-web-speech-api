import {Scene as BABYLONE_SCENE, Scene, SceneOptions, Engine, Color4, Vector3, ArcRotateCamera, FreeCamera, HemisphericLight} from '@babylonjs/core';

export let scene : BABYLONE_SCENE;
export let camera : FreeCamera
export const createScene = (engine?: Engine, options?: SceneOptions) => {
    if (engine) {
        scene = new Scene(engine, options)
        camera = new FreeCamera("MainCamera",new Vector3(-0.11,1.31,-2.31), scene);
        camera.rotation = new Vector3(12.64,-4.69,0);
        camera.setTarget(new Vector3(-0.80,-0.58,6.11))
        // camera.attachControl(false);
        // camera.speed = 0
        // scene.clearColor = new Color4(0, 0, 0, 0);
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    }
    return scene;
}

export const removeScene = () => {
    scene?.dispose();
}