import {Scene, SceneLoader, AssetContainer, Vector3, AbstractMesh} from '@babylonjs/core';
import { Container } from '@babylonjs/gui';
import "@babylonjs/loaders";

interface initialParams {
    name : string,
    rootUrl : string,
    sceneFilename : string,
    scene : Scene
}

class Characters {
    rootUrl : string;
    name : string;
    sceneFilename : string;
    scene : undefined | Scene;
    meshes : any;
    position : Vector3
    constructor (rootUrl : string, sceneFilename: string, meshName : string, scene ?: Scene) {
        this.rootUrl = rootUrl;
        this.name = meshName;
        this.scene = scene;
        this.sceneFilename = sceneFilename
        this.position = new Vector3(0,0,0)
    }
   async init(stateFc : React.Dispatch<React.SetStateAction<boolean>>) {
        SceneLoader.LoadAssetContainer(this.rootUrl, this.sceneFilename, this.scene, (result : AssetContainer) => {
            console.log("로딩완료")
            this.meshes = result.meshes[0]
            result.meshes[0].position = this.position
            result.meshes[0].name = this.name
            result.meshes[0].scaling = new Vector3(1, 1, 1);
            result.addAllToScene();
            stateFc(true);
        })
   }
    setPotition(position : Vector3) {
        this.position = position;
        console.log(this.meshes);
        // this.meshes.position = this.position
    }
}

export default Characters;
