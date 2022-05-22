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
        // const loadAsset = async () => {
        //     await SceneLoader.LoadAssetContainerAsync(this.rootUrl, this.sceneFilename, this.scene, (e)=> {
        //         console.log(e)
        //     })
        // }
        SceneLoader.LoadAssetContainerAsync(this.rootUrl, this.sceneFilename, this.scene, (e)=> {
            console.log(e)
        }).then(container => {
            this.meshes = container.meshes[0]
        })
        // this.meshes = await SceneLoader.LoadAssetContainerAsync(this.rootUrl, this.sceneFilename, this.scene)
        // console.log(loadAsset)

        // (result : AssetContainer) => {
        //     console.log("로딩완료")
        //     this.meshes = result.meshes[0]
        //     result.meshes[0].position = this.position
        //     result.meshes[0].name = this.name
        //     result.meshes[0].scaling = new Vector3(1, 1, 1);
        //     result.addAllToScene();
        // }
    }
    setPotition(position : Vector3) {
        this.position = position;
        console.log(this.meshes);
        // this.meshes.position = this.position
    }
}

export default Characters;
