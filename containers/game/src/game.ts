import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights"
import { MeshBuilder } from "@babylonjs/core/Meshes";
import { Tools } from "@babylonjs/core";

export const Game = () => {
    var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    var engine = new Engine(canvas, true);

    var testScene: Scene = createTestScene(engine, canvas);

    //Run render loop
    engine.runRenderLoop(() => {

        //Render scene
        testScene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
}


const createTestScene = (engine: Engine, canvas: HTMLCanvasElement): Scene => {
    //Initialize
    const scene: Scene = new Scene(engine);

    //Camera
    const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    //Add scene elements
    const light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

    //House
    const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.8, height: 3.4, tessellation: 3 }, scene);
    roof.position.y = 1 + 1.8 / 2;
    roof.rotation.x = Tools.ToRadians(90);

    const box = MeshBuilder.CreateBox("box", { width: 3, height: 1, depth: 1.5 }, scene);
    box.position.y = .5;

    //Run before rendering the scene
    scene.onBeforeRenderObservable.add(() => {

    });

    return scene;
}