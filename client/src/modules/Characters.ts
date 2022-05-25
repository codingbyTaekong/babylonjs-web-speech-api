import {Scene, SceneLoader, AssetContainer, Vector3, AbstractMesh, TransformNode, Skeleton, MeshBuilder, Material} from '@babylonjs/core';
import { transformNodes } from './Items';
import "@babylonjs/loaders";

interface Items {
    hair : string
    clothes : string
    shoes : string
}

class Characters {
    scene : Scene;
    meshes : AbstractMesh;
    position : Vector3;
    rotation : Vector3;
    hiarTransformNode : TransformNode;
    clothesTransformNode : TransformNode;
    shoesTransformNode : TransformNode;
    skeletons : Skeleton;
    container : undefined | AssetContainer;
    constructor (scene : Scene) {
        this.scene = scene;
        this.meshes = MeshBuilder.CreateBox("empthBox");
        this.meshes.dispose();
        this.meshes.isVisible = false;
        this.position = new Vector3(0,0,0);
        this.rotation = new Vector3(0,Math.PI,0);
        this.hiarTransformNode = new TransformNode("hair_transformNode", this.scene);
        this.clothesTransformNode = new TransformNode("clothes_transformNode", this.scene);
        this.shoesTransformNode = new TransformNode("shoes_transformNode", this.scene);
        this.skeletons = new Skeleton("emptySkeleton", 'emptySkeleton', this.scene);
    }
    async init(rootUrl : string,sceneFilename : string , name : string) {
        let container = await SceneLoader.LoadAssetContainerAsync(rootUrl, sceneFilename,  this.scene);
        console.log(container.materials)
        container.materials.map((mat : Material, index : number) => {
            console.log(mat.name)
            if (mat.name === "M_Avatar_Main") mat.transparencyMode = 0
        })
        // container.materials[0].transparencyMode = 0
        this.meshes = container.meshes[0];
        this.meshes.setEnabled(false);
        this.container = container;
        container.meshes[0].id = name;
        container.meshes[0].name = name;
        container.meshes[0].position = this.position;
        container.meshes[0].rotation = this.rotation;
        container.meshes[0].scaling = new Vector3(1, 1, 1);
        this.skeletons.dispose();
        this.skeletons = container.skeletons[0];
        if (container.animationGroups.length !== 0) container.animationGroups[0].stop();
        container.addAllToScene()
        
        return container
   }
    setPotition(position : Vector3) {
        this.position = position;
        if (this.meshes) {
            this.meshes.position = this.position
        }
    }
    setItmes(id : string, items : Items, itemsNodes : transformNodes) {
        const {hair, clothes, shoes} = itemsNodes;
        for (let [key, meshName] of Object.entries(items)) {
            const value : number = Number(meshName.split('_')[1]);
            switch (key) {
                case "hair":
                    const clone_hair = hair?.getChildMeshes()[value].clone(id+"_"+key+"_Clone",null, false);
                    if (clone_hair) {
                        clone_hair.alwaysSelectAsActiveMesh = true;
                        clone_hair.skeleton = this.skeletons;
                        clone_hair.isVisible = true;
                        clone_hair.parent = this.meshes.getChildTransformNodes()[0];
                    }
                    // if (thisItem.hair) {
                        // if (shadowGenerator) shadowGenerator.removeShadowCaster(thisItem.hair, true);
                        // thisItem.hair.dispose();
                    // }
                    // tempItems.hair = hairTransform.getChildMeshes()[value].clone(id !== '' ? id : '' + key + "Clone", null, false)
                    // tempItems.hair.alwaysSelectAsActiveMesh = true;
                    // tempItems.hair.skeleton = playerSkeleton;
                    // tempItems.hair.isVisible = true;
                    // tempItems.hair.parent = mainPlayer.getChildTransformNodes()[0];
                    // if (shadowGenerator) shadowGenerator.getShadowMap().renderList.push(tempItems.hair);
                    break;
                case "clothes":
                    const clone_clothes = clothes?.getChildMeshes()[value].clone(id+"_"+key+"_Clone",null, false);
                    if (clone_clothes) {
                        clone_clothes.alwaysSelectAsActiveMesh = true;
                        clone_clothes.skeleton = this.skeletons;
                        clone_clothes.isVisible = true;
                        clone_clothes.parent = this.meshes.getChildTransformNodes()[0];
                    }
                    break;
                case "shoes":
                    const clone_shoes = shoes?.getChildMeshes()[value].clone(id+"_"+key+"_Clone",null, false);
                    if (clone_shoes) {
                        clone_shoes.alwaysSelectAsActiveMesh = true;
                        clone_shoes.skeleton = this.skeletons;
                        clone_shoes.isVisible = true;
                        clone_shoes.parent = this.meshes.getChildTransformNodes()[0];
                    }
                    break;
                default:
                    break;
            }
        }
        // for (const [key, obj] of items) {
        //     console.log(key)
        //     const value : number = Number(items[key].split('_')[1]);
            // switch (key) {
            //     case 'hair':
            //         if (!sValue) {
            //             if (thisItem.hair) {
            //                 if (shadowGenerator) shadowGenerator.removeShadowCaster(thisItem.hair, true);
            //                 thisItem.hair.dispose();
            //             }
            //             tempItems.hair = hairTransform.getChildMeshes()[value].clone(id !== '' ? id : '' + key + "Clone", null, false)
            //             tempItems.hair.alwaysSelectAsActiveMesh = true;
            //             tempItems.hair.skeleton = playerSkeleton;
            //             tempItems.hair.isVisible = true;
            //             tempItems.hair.parent = mainPlayer.getChildTransformNodes()[0];
            //             if (shadowGenerator) shadowGenerator.getShadowMap().renderList.push(tempItems.hair);
            //         } else {
            //             if (thisItem.hair)
            //                 thisItem.hair.isVisible = false;
            //         }
            //         break;
            //     case 'shoes':
            //         if (!sValue) {
            //             if (thisItem.shoes) {
            //                 if (shadowGenerator) shadowGenerator.removeShadowCaster(thisItem.shoes, true);
            //                 thisItem.shoes.dispose();
            //             }
            //             tempItems.shoes = shoesTransform.getChildMeshes()[value].clone(id !== '' ? id : '' + key + "Clone", null, false)
            //             tempItems.shoes.alwaysSelectAsActiveMesh = true;
            //             tempItems.shoes.skeleton = playerSkeleton;
            //             tempItems.shoes.isVisible = true;
            //             tempItems.shoes.parent = mainPlayer.getChildTransformNodes()[0];
            //             if (shadowGenerator) shadowGenerator.getShadowMap().renderList.push(tempItems.shoes);
            //         } else {
            //             if (thisItem.shoes)
            //                 thisItem.shoes.isVisible = false;
            //         }
            //         break;
            //     case 'cloth':
            //         if (thisItem.cloth) {
            //             if (shadowGenerator) shadowGenerator.removeShadowCaster(thisItem.cloth, true);
            //             thisItem.cloth.dispose();
            //         }
            //         tempItems.cloth = clothTransform.getChildMeshes()[value].clone(id !== '' ? id : '' + key + "Clone", null, false)
            //         tempItems.cloth.alwaysSelectAsActiveMesh = true;
            //         tempItems.cloth.skeleton = playerSkeleton;
            //         tempItems.cloth.isVisible = true;
            //         tempItems.cloth.parent = mainPlayer.getChildTransformNodes()[0];
            //         if (shadowGenerator) shadowGenerator.getShadowMap().renderList.push(tempItems.cloth);
            //         if (sValue) {
            //             if (value === 18) {
            //                 mainPlayer.getChildMeshes()[0].isVisible = false;
            //                 mainPlayer.getChildMeshes()[1].isVisible = false;
            //                 mainPlayer.getChildMeshes()[2].isVisible = false;
            //             } else {
            //                 mainPlayer.getChildMeshes()[0].isVisible = true;
            //                 mainPlayer.getChildMeshes()[1].isVisible = true;
            //                 mainPlayer.getChildMeshes()[2].isVisible = true;
            //             }

            //             if (tempItems.shoes) {
            //                 tempItems.shoes.isVisible = false;
            //                 tempItems.hair.isVisible = false;
            //             }
            //         } else {
            //             mainPlayer.getChildMeshes().forEach((e) => {
            //                 mainPlayer.getChildMeshes()[0].isVisible = true;
            //                 mainPlayer.getChildMeshes()[1].isVisible = true;
            //                 mainPlayer.getChildMeshes()[2].isVisible = true;
            //                 if (tempItems.shoes) {
            //                     tempItems.shoes.isVisible = true;
            //                     tempItems.hair.isVisible = true;
            //                 }
            //             })
            //         }
            //         break;
            //     default:
            //         break;
            // }

        // }
    }
    clone(name : string, items : Items, itemsNodes : transformNodes) {

    }
    dispose() : void {
        this.clothesTransformNode.dispose();
        this.shoesTransformNode.dispose();
        this.hiarTransformNode.dispose();
        this.container?.dispose()
    }
}

export default Characters;
