import {Scene, SceneLoader, AssetContainer, Vector3, AbstractMesh, TransformNode, Skeleton} from '@babylonjs/core';
import "@babylonjs/loaders";

class Characters {
    rootUrl : string;
    name : string;
    sceneFilename : string;
    scene : Scene;
    meshes : undefined | AbstractMesh;
    position : Vector3;
    rotation : Vector3;
    hiarTransformNode : TransformNode;
    clothesTransformNode : TransformNode;
    shoesTransformNode : TransformNode;
    skeletons : Skeleton;
    container : undefined | AssetContainer;
    constructor (rootUrl : string, sceneFilename: string, meshName : string, scene : Scene) {
        this.rootUrl = rootUrl;
        this.name = meshName;
        this.scene = scene;
        this.sceneFilename = sceneFilename;
        this.position = new Vector3(0,0,0);
        this.rotation = new Vector3(0,0,0);
        this.hiarTransformNode = new TransformNode("hair_transformNode", this.scene);
        this.clothesTransformNode = new TransformNode("clothes_transformNode", this.scene);
        this.shoesTransformNode = new TransformNode("shoes_transformNode", this.scene);
        this.skeletons = new Skeleton("emptySkeleton", 'emptySkeleton', this.scene);
    }
   async init() {
        let container = await SceneLoader.LoadAssetContainerAsync(this.rootUrl, this.sceneFilename, this.scene)
        this.container = container;
        container.meshes[0].id = this.name;
        container.meshes[0].name = this.name;
        container.meshes[0].position = this.position;
        container.meshes[0].rotation = this.rotation;
        container.meshes[0].scaling = new Vector3(1, 1, 1);
        this.skeletons.dispose();
        this.skeletons = container.skeletons[0];
        if (container.animationGroups.length !== 0) container.animationGroups[0].stop();
        container.addAllToScene()
        this.meshes = container.meshes[0];
        return container
   }
    setPotition(position : Vector3) {
        this.position = position;
        console.log(this.meshes);
        if (this.meshes) {
            this.meshes.position = this.position
        }
    }
    dispose() : void {
        this.clothesTransformNode.dispose();
        this.shoesTransformNode.dispose();
        this.hiarTransformNode.dispose();
        this.container?.dispose()
    }
}

export default Characters;
