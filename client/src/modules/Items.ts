import {Scene, SceneLoader, AssetContainer, Vector3, AbstractMesh, TransformNode, Skeleton} from '@babylonjs/core';
import "@babylonjs/loaders";

class Items {
    rootUrl : string;
    name : string;
    sceneFilename : string;
    scene : Scene;
    meshes : undefined | AbstractMesh;
    position : Vector3;
    rotation : Vector3;
    container : undefined | AssetContainer;
    constructor (rootUrl : string, sceneFilename: string, meshName : string, scene : Scene) {
        this.rootUrl = rootUrl;
        this.name = meshName;
        this.scene = scene;
        this.sceneFilename = sceneFilename;
        this.position = new Vector3(0,0,0);
        this.rotation = new Vector3(0,0,0);
    }
    async init() {
        let container = await SceneLoader.LoadAssetContainerAsync(this.rootUrl, this.sceneFilename, this.scene)
        this.container = container;
        container.meshes[0].id = this.name;
        container.meshes[0].name = this.name;
        container.meshes[0].position = this.position;
        container.meshes[0].rotation = this.rotation;
        container.meshes[0].scaling = new Vector3(1, 1, 1);
        // this.skeletons.dispose();
        // this.skeletons = container.skeletons[0];
        // if (container.animationGroups.length !== 0) container.animationGroups[0].stop();
        container.addAllToScene()
        this.meshes = container.meshes[0];
        return container
   }
}

export default Items