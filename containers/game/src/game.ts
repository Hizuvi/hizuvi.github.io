import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import createLevel from "./scenes/level";

export default function () {
    var canvas: any = document.getElementById("renderCanvas");
    var engine: Engine = new Engine(canvas, true);

    var scene: Scene = createLevel(engine);

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });

    //Render loop
    engine.runRenderLoop(() => {
        scene.render();
    });
}