import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createScene, engine, camera } from '../modules';
import Characters from '../modules/Characters';
import {MeshBuilder, Vector3, Engine, Scene} from '@babylonjs/core';

import '@babylonjs/inspector'
import Items from '../modules/Items';

interface Props {
  Engineloaded : boolean
}
declare global {
  interface Window {
    chracter:any;
  }
}

function World({Engineloaded} : Props) {
  const [load, setLoad] = useState(false);
  let chracter = useRef<Characters>()
  let Engine = useRef<Engine>()
  let items = useRef<Items>()
  let Scene = useRef<Scene>()
  useEffect(()=> {
    return () => {
      chracter.current?.dispose();
    }
  },[])
  useEffect(()=> {
    if (!load && Engineloaded) {
      Engine.current = engine;
      Scene.current = createScene(Engine.current);
      Scene.current?.debugLayer.show();
      Scene.current?.executeWhenReady(()=> {
        setLoad(true)
        Engine.current?.runRenderLoop(()=> {
          Scene.current?.render();
        })
      })
    }
  }, [load, Engineloaded])

  useEffect(()=> {
    if (load) {
      const importMesh = async () => {
        if (Scene.current) {
          chracter.current = new Characters("./assets/model/", "Avatar_Body.glb", "playerBody", Scene.current);
          items.current = new Items("./assets/model/", "Avatar_Item2.glb", "items", Scene.current)
          await chracter.current.init().then(container => console.log(container))
          await items.current.init().then(container => console.log(container.meshes[0].getChildren()[0].id))
        }
      }
      importMesh()
    }
  },[load])
  return (
    <></>
  );
}

export default World;