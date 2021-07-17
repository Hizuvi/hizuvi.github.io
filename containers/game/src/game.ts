import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import createStartup from "./scenes/startup";
import createLevel from "./scenes/level";

export default function () {
    var canvas: any = document.getElementById("renderCanvas");
    var engine: Engine = new Engine(canvas, true);

    var inLevel = false;
    function startLevel() {
        startupScene.dispose();
        inLevel = true;
    }

    var startupScene = createStartup(engine, startLevel);
    var levelScene = createLevel(engine);

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });

    //Render loop
    engine.runRenderLoop(() => {
        if(inLevel){
            levelScene.render();
        }
        else{
            startupScene.render();
        }
    });
}