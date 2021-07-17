import { Scene } from "@babylonjs/core/scene";
import { FreeCamera } from "@babylonjs/core/Cameras";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights"
import { MeshBuilder } from "@babylonjs/core/Meshes";
import { Engine, Sound, StandardMaterial, Tools } from "@babylonjs/core";

export default function (engine: Engine): Scene {
    //Initialize scene
    var scene: Scene = new Scene(engine);

    //Load song
    const song = new Sound("Gunshot", "../content/stay-here-forever.mp3", scene, finished, {
        autoplay: false
    });

    //Add level
    //Ground
    const groundMat = new StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new Color3(0, .4, 0);

    const ground = MeshBuilder.CreateGround("ground", { width: 3, height: 170 }, scene);
    ground.position.z = 70;
    ground.material = groundMat;

    //Player
    const player = MeshBuilder.CreateBox("box", { width: 0.5, depth: 1.5 }, scene);
    player.position.y = .5;
    player.position.z = -7;

    //Light
    const ambient = new HemisphericLight("ambient", new Vector3(0, 1, 1), scene);

    //Camera
    var camera = new FreeCamera("Camera", new Vector3(0, 3.5, -10), scene);
    camera.rotation = new Vector3(Tools.ToRadians(30), 0, 0);
    camera.fov = 1;

    //Start running the level
    function finished() {
        //Start song
        song.play();

        var lastTime = 0;
        //Before every frame print song time
        scene.onBeforeRenderObservable.add((scene, event) => {
            lastTime = song.currentTime;
            
        });
    }

    return scene;
}