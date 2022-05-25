import {Scene, Vector3, AbstractMesh, TransformNode, Skeleton, AssetContainer, InstantiatedEntries} from '@babylonjs/core';
import { transformNodes } from './Items';

interface Items {
    hair : string
    clothes : string
    shoes : string
}

class Player {
    type : string
    id : string
    scene : Scene
    originContainer : AssetContainer
    position : Vector3
    rotation : Vector3
    clonedContainer : InstantiatedEntries
    skeletons : Skeleton
    constructor (type : string, id : string, scene : Scene, originContainer : AssetContainer, position : Vector3, rotation : Vector3) {
        this.type = type;
        this.id = id;
        this.scene = scene;
        this.originContainer = originContainer;
        this.position = position;
        this.rotation = rotation;
        this.clonedContainer = originContainer.instantiateModelsToScene()
        this.skeletons = this.clonedContainer.skeletons[0];
        this.skeletons.name = `${id}_skeletons`
        this.clonedContainer.rootNodes[0].isEnabled(true);
        this.clonedContainer.rootNodes[0].name = `${id}_playerBody`
        this.clonedContainer.rootNodes[0].position = this.position
        this.clonedContainer.rootNodes[0].rotation = this.rotation
    }
    setItmes(items : Items, itemsNodes : transformNodes) {
        const {hair, clothes, shoes} = itemsNodes;
        for (let [key, meshName] of Object.entries(items)) {
            const value : number = Number(meshName.split('_')[1]);
            switch (key) {
                case "hair":
                    const clone_hair = hair?.getChildMeshes()[value].clone(this.id+"_"+key+"_Clone",null, false);
                    if (clone_hair) {
                        clone_hair.alwaysSelectAsActiveMesh = true;
                        clone_hair.skeleton = this.skeletons;
                        clone_hair.isVisible = true;
                        clone_hair.parent = this.clonedContainer.rootNodes[0].getChildTransformNodes()[0];
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
                    const clone_clothes = clothes?.getChildMeshes()[value].clone(this.id+"_"+key+"_Clone",null, false);
                    if (clone_clothes) {
                        clone_clothes.alwaysSelectAsActiveMesh = true;
                        clone_clothes.skeleton = this.skeletons;
                        clone_clothes.isVisible = true;
                        clone_clothes.parent = this.clonedContainer.rootNodes[0].getChildTransformNodes()[0];
                    }
                    break;
                case "shoes":
                    const clone_shoes = shoes?.getChildMeshes()[value].clone(this.id+"_"+key+"_Clone",null, false);
                    if (clone_shoes) {
                        clone_shoes.alwaysSelectAsActiveMesh = true;
                        clone_shoes.skeleton = this.skeletons;
                        clone_shoes.isVisible = true;
                        clone_shoes.parent = this.clonedContainer.rootNodes[0].getChildTransformNodes()[0];
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
}

export default Player