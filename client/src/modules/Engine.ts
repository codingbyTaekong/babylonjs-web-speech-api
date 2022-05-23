import {Engine as BABYLONE_ENGINE, EngineOptions} from '@babylonjs/core';

export let engine :  BABYLONE_ENGINE;

export const createEngine = (canvas : HTMLCanvasElement, isIos ?: boolean, options ?: EngineOptions) => {
    if (!engine) engine = new BABYLONE_ENGINE(canvas, isIos, options);
    return engine
}

export const removeEngine = () => {
    engine?.stopRenderLoop();
    engine?.dispose()
}