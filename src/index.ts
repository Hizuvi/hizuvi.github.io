/// <reference path="babylon.ts" />
function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    // This creates sda basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    box.position.y = 0.5;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 });

    const sound = new BABYLON.Sound("sound", "../files/Galaxies.mp3", scene, null, { loop: true, autoplay: true });

    //Return the scene
    return scene;
}