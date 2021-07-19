import { Scene } from "@babylonjs/core/scene";
import { FreeCamera } from "@babylonjs/core/Cameras";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights"
import { Mesh, MeshBuilder } from "@babylonjs/core/Meshes";
import { Engine, Sound, StandardMaterial, Tools } from "@babylonjs/core";
import { MotionManager } from "../modules/input";
import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";
import { Element, ILevelFile, ReadFile } from "../modules/level-loader";

interface ILevel {
    song: Sound;
    track: Mesh;
    speed: number;
}

export default function (engine: Engine): Scene {
    //Initialize scene
    var scene: Scene = new Scene(engine);

    //Generate level
    async function generateLevel(scene: Scene, levelFile: ILevelFile, doneCB: CallableFunction) {
        console.log("Generating level!");

        //Load song
        const song = new Sound("Song", levelFile.songUrl, scene, null, {
            autoplay: false
        });

        //The track container
        const trackMat = new StandardMaterial("trackMat", scene);
        trackMat.alpha = 0;

        const track = MeshBuilder.CreateBox("track", { size: 1 }, scene);
        track.position.y = 0;
        track.material = trackMat;

        //Materials
        const startLineMat = new StandardMaterial("startLineMat", scene);
        startLineMat.diffuseColor = new Color3(0, 0.5, 0);

        const midLineMat = new StandardMaterial("midLineMat", scene);
        midLineMat.diffuseColor = new Color3(0, .5, .5);

        const endLineMat = new StandardMaterial("endLineMat", scene);
        endLineMat.diffuseColor = new Color3(0.5, 0, 0);

        //Generate the elements of the level
        var lastLane: number; //For ending lines
        for (const step of levelFile.track) {
            const beat = step[0];
            const offset = levelFile.offset * levelFile.speed;
            const position = (beat / 4) * (60 / levelFile.bpm) * levelFile.speed + offset;

            for (const element of step[1]) {
                console.log(element);

                //Figure out which element to create
                switch (element[0]) {
                    case Element.lineStart:
                        //Create a line start
                        const lineStart = MeshBuilder.CreateBox("line", { depth: 0.1 }, scene);
                        lineStart.position = new Vector3(-1 + element[1], 0, position);
                        lineStart.parent = track;
                        lineStart.material = startLineMat;
                        // lineStart.parent = track;

                        lastLane = element[1];
                        break;

                    case Element.linePoint:
                        const linePoint = MeshBuilder.CreateBox("line", { depth: 0.1 }, scene);
                        linePoint.position = new Vector3(-1 + element[1], 0, position);
                        linePoint.parent = track;
                        linePoint.material = midLineMat;
                        // linePoint.parent = track;

                        lastLane = element[1];
                        break;

                    case Element.lineEnd:
                        const lineEnd = MeshBuilder.CreateBox("line", { depth: 0.1 }, scene);
                        lineEnd.position = new Vector3(-1 + lastLane, 0, position);
                        lineEnd.parent = track;
                        lineEnd.material = endLineMat;
                        // lineEnd.parent = track;
                        break;
                }
            }
        }

        // Check that all elements have been loaded
        var loading = true;
        while (loading) {
            loading = false;

            if (!song.isReady()) {
                loading = true;
            }

            function wait(milliseconds: number) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
            }

            console.log("waiting");
            await wait(500);
        }

        const level: ILevel = {
            song,
            track,
            speed: levelFile.speed
        };
        doneCB(level);
    }

    //Load the level
    var generationFinished = false;
    var level: ILevel;
    function generatedDone(levelGenerated: ILevel) {
        generationFinished = true;

        level = levelGenerated;
        adt.addControl(button);
    };

    ReadFile("../content/levels/test/data.json")
        .then((levelFile: ILevelFile) => generateLevel(scene, levelFile, generatedDone));

    //Ground
    const groundMat = new StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new Color3(0, .4, 0);

    const ground = MeshBuilder.CreateGround("ground", { width: 3, height: 170 }, scene);
    ground.position.z = 70;
    ground.material = groundMat;

    //Player
    const player = MeshBuilder.CreateBox("box", { width: 0.5, depth: 0.1/*1.5*/ }, scene);
    player.position.y = .5;
    player.position.z = 0;

    //Light
    const ambient = new HemisphericLight("ambient", new Vector3(0, 1, 1), scene);

    //Camera
    const camera = new FreeCamera("Camera", new Vector3(0, 3.5, -3), scene);
    camera.rotation = new Vector3(Tools.ToRadians(30), 0, 0);
    camera.fov = 1;

    //UI
    const adt = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const button = Button.CreateSimpleButton(
        "startButton",
        "Start level"
    );
    button.width = 0.2;
    button.height = "40px";
    button.color = "white";
    button.background = "green";

    button.onPointerClickObservable.add(start);

    //Start running the level
    function start() {
        //Hide start button
        adt.removeControl(button);

        //Start song
        const motionManager = new MotionManager();

        level.song.play();

        var lastTime = 0;

        //Player
        var lastVelocity = 0;

        //Check if the song is playing
        scene.onBeforeRenderObservable.add((scene, event) => {
            //Set delta time
            const deltaTime = level.song.currentTime - lastTime;
            lastTime = level.song.currentTime;

            //Player movement
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

            //Level movement
            level.track.position.z = -(level.song.currentTime * level.speed);
        });
    }

    return scene;
}


function lerp(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end
}