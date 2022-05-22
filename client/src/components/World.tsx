import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createScene, engine, camera } from '../modules';
import Characters from '../modules/Characters';
import {MeshBuilder, Vector3} from '@babylonjs/core';

import '@babylonjs/inspector'

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
  useEffect(()=> {
    if (!load && Engineloaded) {
      const Engine  = engine;
      // console.log(Engine);
      const Scene = createScene(Engine);
      console.log(Scene);
      // setLoad(true);
      Scene?.debugLayer.show();
      Scene?.executeWhenReady(()=> {
        Engine?.runRenderLoop(()=> {
          Scene?.render();
        })
      })
      camera?.attachControl(true);
      // const ground = MeshBuilder.CreateGround("ground", {width:10, height:10});
      chracter.current = new Characters("./assets/model/", "GraduatedGom.glb", "npc", Scene);
      const importMesh = async () => {
        await chracter.current?.init(setLoad)
        // await chracter.current.init(setLoad)
        // chracter.setPotition(new Vector3(0,1,0))
      }
      importMesh()
    }
  }, [load, Engineloaded])

  useEffect(()=> {
    if (load) {
      console.log(chracter.current?.meshes)
      console.log("state 업데이트 됩")
    }
  },[load])
  return (
    <></>
  );
}

export default World;