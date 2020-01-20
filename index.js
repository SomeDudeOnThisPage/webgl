import Engine from './GLEngine/Engine.js'
import Model3D from './GLEngine/Model3D.js'
import Material from "./GLEngine/material/Material.js";
import LoadingScene from "./GLEngine/core/LoadingScene.js";

const canvas = $('.webgl-engine');
canvas[0].width = 1600;
canvas[0].height = 900;

let engine = new Engine(canvas);
engine.getCamera().getPosition()[2] -= 5.0;

let loader = new LoadingScene(function() { console.log('Finished preload!'); });
let material = new Material('phong_normal', engine.gl);
/*loader.preload([
  material
]);
loader.begin();*/

//let material = new Material('phong_normal', engine.gl);
let cube1 = new Model3D('cube', material, engine);
console.log(cube1);


let cube2 = new Model3D('cube', material, engine);
cube2.position[0] = -2.0;
cube2.position[1] = 2.0;
cube2.position[2] = -2.0;

let cube3 = new Model3D('cube', material, engine);
cube3.position[0] = 2.0;
cube3.position[1] = 2.0;
cube3.position[2] = -2.0;

engine.start();