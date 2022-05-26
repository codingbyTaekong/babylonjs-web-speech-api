import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createScene, engine} from '../modules';
import Characters from '../modules/Characters';
import {  Vector3, Engine, Scene, Vector2} from '@babylonjs/core';
import "@babylonjs/loaders";

import '@babylonjs/inspector'
import Items from '../modules/Items';
import Player from '../modules/Player';
import MyMap from '../modules/Map';

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

  let MyPlayer = useRef<Player>()
  let map = useRef<MyMap>();
  useEffect(()=> {
    return () => {
      items.current?.container?.dispose()
      map.current?.container.dispose()
      chracter.current?.dispose();
      MyPlayer.current?.dispose();
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
          // 캐릭터
          chracter.current = new Characters(Scene.current);
          // 아이템 꾸러미
          items.current = new Items("./assets/model/", "Avatar_Item2.glb", "items", Scene.current);
          // 맵
          map.current = new MyMap(Scene.current);
          await map.current.init("./assets/model/", "duri_Map.glb", "duriMap").then(async (container) => {
            map.current?.createPipLine()
            await map.current?.createWaterMaterial("waterMaterial", new Vector2(512,512));
            map.current?.createSkyBox();
          })

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
              MyPlayer.current = new Player("myPlayer", "taeho" , Scene.current, chracter.current?.container, new Vector3(0,0,0), new Vector3(0,Math.PI, 0));
              MyPlayer.current.setItmes(currentItems, TransformNodes);
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