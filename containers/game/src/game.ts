import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { createTest3D } from "./scenes/3d";
import { createTestSprite } from "./scenes/sprites";

export const Game = () => {
    var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    var engine = new Engine(canvas, true);

    var testScene: Scene = createTestSprite(engine, canvas);

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

