
export * from './Engine';
export * from './Scene';
export * from './Characters'
export * from "./Player"
export * from "./Map"

// // import * as BABYLON from '@babylonjs/core';
// import {Engine, Scene, RecastJSPlugin} from '@babylonjs/core';
// import Recast from 'recast-detour'

// let engine = null;
// let scene = null;
// let navigationPlugin = null;
// let recast = null;

// export const createEngine = (canvas, isIos, options) => {
//     if (!engine) engine = new Engine(canvas, isIos, {...options});
//     console.log(engine);
//     return engine;
// }

// export const clearEngine = () => {
//     engine.stopRenderLoop();
//     engine.dispose(true, true);
//     if (scene) {
//         scene.dispose();
//     }
//     engine = null;
//     scene = null;
// }

// export const getEngine = () => {
//     return engine;
// }

// export const createScene = (options) => {
//     scene = new Scene(engine, {...options})
//     return scene
// }

// export const getScene = ()=> {
//     return scene;
// }

// export const clearScene = ()=> {
//     scene.dispose();
// }

// export const createNavi = async () => {
//         try {
//             if (!recast) {
//                 recast = await Recast();
//                 navigationPlugin = new RecastJSPlugin(recast);
//             } else {
//                 navigationPlugin = new RecastJSPlugin(recast);
//             }
//             console.log(navigationPlugin);
//             return true;
//         } catch (error) {
//             return error
//         }
// }

// export const getNaviPlugin = () => {
//     return navigationPlugin;
// }

// export const clearNaviPlugin = () => {
//     navigationPlugin.dispose();
//     navigationPlugin = null;
// }