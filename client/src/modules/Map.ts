import { Vector3, SceneLoader,AbstractMesh ,Scene, AssetContainer, ShadowGenerator, 
    DirectionalLight, DefaultRenderingPipeline, Material, 
    Vector2, Nullable, Mesh, MeshBuilder, StandardMaterial, CubeTexture, Color3, 
    Texture, Color4 } from '@babylonjs/core';
import { WaterMaterial } from '@babylonjs/materials';

interface ShadowGeneratorOptions {
    debug ?: boolean
    stabilizeCascades ?: boolean
    cascadeBlendPercentage ?: number
    depthClamp ?: boolean
    autoCalcDepthBounds ?: boolean
    shadowMaxZ ?: number
    bias ?: number
    normalBias ?: number
    darkness ?: number
    transparencyShadow ?: number
    numCascades ?: number
    lambda ?: number
    usePercentageCloserFiltering ?: boolean
    filteringQuality ?:number
    useContactHardeningShadow ?: boolean
    contactHardeningLightSizeUVRatio ?: number
    penumbraDarkness ?: number
}

class MyMap {
    position : Vector3
    rotation : Vector3
    scene : Scene
    container!: AssetContainer;
    shadowGenerator!: ShadowGenerator
    pipeline !: DefaultRenderingPipeline
    waterMaterial !: WaterMaterial
    navMesh : Nullable<AbstractMesh> | undefined
    skyBox !: Mesh
    constructor(scene : Scene) {
        this.position = new Vector3(0,0,0);
        this.rotation = new Vector3(0,0,0);
        this.scene = scene
    }
    async init (rootUrl : string,sceneFilename : string , name : string) {
        const container = await SceneLoader.LoadAssetContainerAsync(rootUrl, sceneFilename, this.scene);
        this.container = container
        container.meshes[0].name = name;
        container.materials[0].name = `${name}_material`;
        container.meshes[0].getChildMeshes().forEach(mesh => {
            if (mesh.name === "Nav")  mesh.isVisible = false
        })
        container.addAllToScene()
        this.navMesh = this.scene.getMeshByName("Nav") ? this.scene.getMeshByName("Nav") : undefined;
        return container;
    }
    createShadowGenerator(mapSize : number, light : DirectionalLight, usefulFloatFirst?: boolean | undefined, options ?: ShadowGeneratorOptions) {
        const shadowGenerator = new ShadowGenerator(mapSize, light, usefulFloatFirst);
        this.shadowGenerator = shadowGenerator
        if (options)
        return this.shadowGenerator;
    }
    createPipLine() {
        let defaultPipeline = new DefaultRenderingPipeline("DefaultRenderingPipeline",true,this.scene,this.scene.cameras);
        this.pipeline = defaultPipeline;
        return this.pipeline
    }
    async createWaterMaterial (name : string, size : Vector2) {
        let waterMaterial = new WaterMaterial(name, this.scene, size);
        this.waterMaterial = waterMaterial;
        this.waterMaterial.bumpTexture = new Texture("/assets/texture/waterbump.png", this.scene);
        this.waterMaterial.windForce = -1;
        this.waterMaterial.waveHeight = 0.02;
        this.waterMaterial.bumpHeight = 0.02;
        this.waterMaterial.waterColor = new Color3(1, 1, 1);
        this.waterMaterial.waveLength = 0.02;
        this.waterMaterial.waveSpeed = 0;
        this.waterMaterial.windDirection = new Vector2(-3, 1);
        this.waterMaterial.backFaceCulling = false;
        this.waterMaterial.colorBlendFactor = 0.5;
        this.setWaterMaterial()
        return this.waterMaterial;
    }
    private setWaterMaterial() {
        this.container.meshes[0].getChildTransformNodes().forEach(mesh => {
            if (mesh.name === "Floor") {
                mesh.getChildMeshes().forEach(chlidMesh => {
                    if (chlidMesh.name === "Water_floor") {
                        chlidMesh.material = this.waterMaterial;
                        chlidMesh.renderOverlay = true;
                        chlidMesh.overlayColor = Color3.FromHexString("#00B5FF");
                    }
                })
            }
        })
        this.waterMaterial.addToRenderList(this.skyBox);
    }
    createSkyBox() {
        const skyBox = MeshBuilder.CreateBox("skyBox", {size:900},this.scene);
        skyBox.position = new Vector3(0,0,0);
        const skyBoxMaterial = new StandardMaterial("skyBox_Material", this.scene);
        skyBoxMaterial.backFaceCulling = false;
        skyBoxMaterial.reflectionTexture = new CubeTexture("./assets/skybox/SampleScene_Skybox", this.scene);
        skyBoxMaterial.reflectionTexture.coordinatesMode = 5;
        skyBoxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyBoxMaterial.specularColor = new Color3(0, 0, 0);
        skyBoxMaterial.disableLighting = true;
        skyBox.material = skyBoxMaterial;
    }
}

export default MyMap