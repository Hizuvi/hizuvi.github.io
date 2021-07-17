import { Scene } from "@babylonjs/core/scene";
import { FreeCamera } from "@babylonjs/core/Cameras";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights"
import { MeshBuilder } from "@babylonjs/core/Meshes";
import { ActionManager, Engine, ExecuteCodeAction, Sound, StandardMaterial, Tools, VideoTexture } from "@babylonjs/core";
import { MotionManager } from "../modules/input";
import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";
// import { ReadFile } from "../modules/level-loader";

export default function (engine: Engine, startLevel: CallableFunction): Scene {
    let scene = new Scene(engine);
    let camera = new FreeCamera("FreeCamera", new Vector3(0, 0, -10), scene);

    let gunshot = new Sound("gunshot", "../content/dummy/Jingle.mp3", scene)

    let cube = MeshBuilder.CreateBox("cube", { size: 1 }, scene);
    cube.position = new Vector3(-2, 0, 0);
    let cubeMaterial = new StandardMaterial("cubeMat", scene);
    cubeMaterial.emissiveColor = new Color3(1, 0, 0);
    cube.material = cubeMaterial;


    let videoCube = MeshBuilder.CreateBox("cube", { size: 1 }, scene);
    videoCube.position = new Vector3(2, 0, 0);

    let videoTextureSettings = {
        loop: false,
        autoPlay: false,
        autoUpdateTexture: true,
    };

    let videoTexture = new VideoTexture("demoVideo", "../content/dummy/Placehold.mp4", scene, true, true, VideoTexture.TRILINEAR_SAMPLINGMODE, videoTextureSettings);
    videoTexture.video.preload = "auto";

    let videoMaterial = new StandardMaterial("videoMat", scene);
    videoMaterial.diffuseTexture = videoTexture;
    videoMaterial.emissiveColor = new Color3(1, 1, 1);


    let cubeMaterial2 = new StandardMaterial("cubeMat2", scene);
    cubeMaterial2.emissiveColor = new Color3(0, 1, 0);
    cube.material = cubeMaterial;

    videoCube.material = cubeMaterial2;

    videoTexture.video.onplay = (() => {

    })

    var audioReady = false;
    videoCube.actionManager = new ActionManager(scene);
    videoCube.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
        videoTexture.video.play();
        videoCube.material = videoMaterial;

        if (!audioReady) {
            cube.actionManager = new ActionManager(scene);
            cube.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
                gunshot.play();

                if (cube.position.x === 0) {
                    gunshot.onEndedObservable.add(() => {
                        startLevel();
                    });
                }
                
                cube.position.x = 0;
            }));

            audioReady = true;
        }
    }));

    return scene;
}


function lerp(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end
}