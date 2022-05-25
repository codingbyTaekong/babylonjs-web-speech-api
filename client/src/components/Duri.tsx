import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createScene, engine, camera } from '../modules';
import Characters from '../modules/Characters';
import { MeshBuilder, Vector3, Engine, Scene, TransformNode } from '@babylonjs/core';
import "@babylonjs/loaders";

import '@babylonjs/inspector'
import Items from '../modules/Items';
import Player from '../modules/Player';

interface Props {
  Engineloaded : boolean
}
declare global {
  interface Window {
    chracter:any;
  }
}

function Duri({Engineloaded} : Props) {
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
      const Main = async () => {
        if (Scene.current) {
          chracter.current = new Characters(Scene.current);
          items.current = new Items("./assets/model/", "Avatar_Item2.glb", "items", Scene.current)
          await chracter.current.init("./assets/model/", "Avatar_Body.glb", "playerBody")
          await items.current.init().then(container => {
            const TransformNodes = {
              hair : chracter.current?.hiarTransformNode,
              clothes : chracter.current?.clothesTransformNode,
              shoes : chracter.current?.shoesTransformNode
            }
            const currentItems = {
              hair : "hair_1",
              clothes : "cloth_1",
              shoes : "shoes_1"              
            }
            container.setParent(TransformNodes)
            if (Scene.current && chracter.current?.container) {
              const myPlayer = new Player("myPlayer", "taeho" , Scene.current, chracter.current?.container, new Vector3(1,0,1), new Vector3(0,Math.PI, 0));
              myPlayer.setItmes(currentItems, TransformNodes);
            }


          })
        }
      }
      Main()
    }
  },[load])
  return (
    <></>
  );
}

export default Duri;