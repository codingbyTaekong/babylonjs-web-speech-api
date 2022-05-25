import {Scene, SceneLoader, AssetContainer, Vector3, AbstractMesh, TransformNode, Skeleton, Node, Mesh} from '@babylonjs/core';
import "@babylonjs/loaders";

export interface transformNodes {
    hair : TransformNode | undefined
    clothes : TransformNode | undefined
    shoes : TransformNode | undefined
}

class Items {
    rootUrl : string;
    name : string;
    sceneFilename : string;
    scene : Scene;
    meshes : undefined | AbstractMesh;
    position : Vector3;
    rotation : Vector3;
    container : undefined | AssetContainer;
    joint : undefined | Node
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
        container.skeletons[0].name = "itemsSkeleton";
        container.materials[0].transparencyMode = 0
        this.joint = container.meshes[0].getChildren()[0] 
        container.meshes[0].id = this.name;
        container.meshes[0].name = this.name;
        container.meshes[0].position = this.position;
        container.meshes[0].rotation = this.rotation;
        container.meshes[0].scaling = new Vector3(1, 1, 1);
        container.addAllToScene()
        this.meshes = container.meshes[0];
        return this
   }
   setParent(TransformNodes : transformNodes) : void {
        if (TransformNodes.hair === undefined || TransformNodes.clothes === undefined || TransformNodes.shoes === undefined ) throw new Error("Parameter object cannot be empty");   
        this.joint?.getChildMeshes().map((mesh : AbstractMesh, index : number)=> {
            let name = mesh.name;
            name = name.split("_")[0];
            mesh.isVisible = false
            switch (name) {
                case "hair":
                    if (TransformNodes.hair) mesh.parent = TransformNodes.hair
                    break;
                case "cloth":
                    if (TransformNodes.clothes) mesh.parent = TransformNodes.clothes
                    break;
                case "shoes":
                    if (TransformNodes.shoes) mesh.parent = TransformNodes.shoes
                    break;
                default:
                    break;
            }
        })
   }
}

export default Items