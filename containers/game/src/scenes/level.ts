import { Scene } from "@babylonjs/core/scene";
import { FreeCamera } from "@babylonjs/core/Cameras";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights"
import { MeshBuilder } from "@babylonjs/core/Meshes";
import { Engine, LerpBlock, Sound, StandardMaterial, Tools } from "@babylonjs/core";
import { MotionManager } from "../modules/input";

export default function (engine: Engine): Scene {
    //Initialize scene
    var scene: Scene = new Scene(engine);

    //Load song
    const song = new Sound("Gunshot", "../content/stay-here-forever.mp3", scene, finished, {
        autoplay: false
    });

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

    //Motion manager
    const motionManager = new MotionManager();

    //Start running the level
    function finished() {
        //Start song
        song.play();

        var lastTime = 0;

        //Player
        var lastVelocity = 0;

        //Before every frame print song time
        scene.onBeforeRenderObservable.add((scene, event) => {
            //Set delta time
            const deltaTime = song.currentTime - lastTime;
            lastTime = song.currentTime;

            //Handle player movement
            const tilt = motionManager.rotation;
            const speed = 1.5 / 10;
            const range = 1;
            const smoothing = 0.8;
            const deadZone = 2; //Should probably be exposed to player

            const velocity = (tilt > 3 || tilt < -3) ? tilt * speed * deltaTime : 0;
            const smoothed = lerp(lastVelocity, velocity, 1 - smoothing)
            player.position.x += smoothed;
            lastVelocity = smoothed;

            player.position.x = Math.max(Math.min(player.position.x, range), -range)
        });
    }

    return scene;
}


function lerp(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end
}