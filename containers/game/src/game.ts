import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera, FollowCamera } from "@babylonjs/core/Cameras";
import { Color3, Color4, Vector3, Vector4 } from "@babylonjs/core/Maths/math";
import { DirectionalLight, HemisphericLight, ShadowGenerator, SpotLight } from "@babylonjs/core/Lights"
import { AbstractMesh, Mesh, MeshBuilder } from "@babylonjs/core/Meshes";
import { Animation, ParticleSystem, PointerEventTypes, StandardMaterial, Texture, Tools } from "@babylonjs/core";
import { AdvancedDynamicTexture, Control, Slider, StackPanel, TextBlock } from "@babylonjs/gui"
import earcut from "earcut";

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

    //Ambient light
    const ambient = new HemisphericLight("ambientLight", new Vector3(0, 0, 0), scene);
    ambient.intensity = .1;

    //Sunlight
    const sun = new DirectionalLight("sun", new Vector3(0, -1, .5), scene);
    sun.position = new Vector3(0, 15, -30);
    sun.intensity = .2;
    const shadowGenerator = new ShadowGenerator(1024, sun);

    //Ground
    const ground = function () {
        const groundMat = new StandardMaterial("groundMat", scene);
        groundMat.diffuseColor = new Color3(0, .2, 0);

        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
        ground.material = groundMat;

        return ground;
    }();

    //Houses
    const Houses = function () {
        const house = function () {
            const roofMat = new StandardMaterial("roofMat", scene);
            roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
            const boxMat = new StandardMaterial("boxMat", scene);
            boxMat.diffuseTexture = new Texture("https://doc.babylonjs.com/_next/image?url=%2Fimg%2Fgetstarted%2Fsemihouse.png&w=1920&q=75", scene);

            const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.4, height: 2.4, tessellation: 3 }, scene);
            roof.position.y = 1.16;
            roof.scaling.x = .5;
            roof.rotation.z = Tools.ToRadians(90);
            roof.material = roofMat;

            const faceUV = [];
            faceUV[0] = new Vector4(0.01, 0, 0.4, 1.0); //rear face
            faceUV[1] = new Vector4(0.6, 0, 1, 1.0); //front face
            faceUV[2] = new Vector4(0.4, 0, .6, 1); //right side
            faceUV[3] = new Vector4(0.6, 0, .4, 1); //left side
            const box = MeshBuilder.CreateBox("box", { width: 2, faceUV: faceUV, wrap: true }, scene);
            box.position.y = .5;
            box.material = boxMat;

            const house = Mesh.MergeMeshes([box, roof], true, false, null, false, true)
            house.position.y = 1000;

            return house;
        }();

        const positions = [[3, 2, 67], [-2, 2, 23], [3, -2, 239], [-2, -3, 135]];

        for (const position of positions) {
            const instanceHouse = house.createInstance("instanceHouse")

            instanceHouse.position.x = position[0];
            instanceHouse.position.z = position[1];
            instanceHouse.position.y = 0;
            instanceHouse.rotation.y = Tools.ToRadians(position[2]);
        }

    }();

    //Car
    const car = function () {
        const body = function () {
            const outline = [
                new Vector3(-0.3, 0, -0.1),
                new Vector3(0.2, 0, -0.1),
            ]
            //curved front
            for (let i = 0; i < 20; i++) {
                outline.push(new Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
            }
            //top
            outline.push(new Vector3(0, 0, 0.1));
            outline.push(new Vector3(-0.3, 0, 0.1));

            //face UVs
            const faceUV = [];
            faceUV[0] = new Vector4(0, 0.5, 0.38, 1);
            faceUV[1] = new Vector4(0, 0, 1, 0.5);
            faceUV[2] = new Vector4(0.38, 1, 0, 0.5);

            const carMat = new StandardMaterial("carMat", scene);
            carMat.diffuseTexture = new Texture("https://doc.babylonjs.com/_next/image?url=%2Fimg%2Fgetstarted%2Fcar.png&w=1920&q=75", scene);

            const body = MeshBuilder.ExtrudePolygon("car", { shape: outline, depth: 0.2, faceUV: faceUV, wrap: true }, scene, earcut);
            body.material = carMat;
            body.rotation.x = Tools.ToRadians(-90);
            body.position.y = .15;

            //Animation
            const animBody = function () {
                const animCar = new Animation("carAnimation", "position.x", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

                const carKeys = [];

                carKeys.push({
                    frame: 0,
                    value: -4
                });

                carKeys.push({
                    frame: 150,
                    value: 4
                });

                carKeys.push({
                    frame: 210,
                    value: 4
                });

                animCar.setKeys(carKeys);

                return animCar;
            }();

            body.animations = [];
            body.animations.push(animBody);
            scene.beginAnimation(body, 0, 210, true);

            return body;
        }();

        //Wheels
        const wheelRB = function () {
            const wheelUV = [];
            wheelUV[0] = new Vector4(0, 0, 1, 1);
            wheelUV[1] = new Vector4(0, 0.5, 0, 0.5);
            wheelUV[2] = new Vector4(0, 0, 1, 1);

            const wheelMat = new StandardMaterial("wheelMat", scene);
            wheelMat.diffuseTexture = new Texture("https://doc.babylonjs.com/_next/image?url=%2Fimg%2Fgetstarted%2Fwheel.png&w=1920&q=75", scene);

            const wheelRB = MeshBuilder.CreateCylinder("wheelRB", { diameter: 0.125, height: 0.05, faceUV: wheelUV });
            wheelRB.material = wheelMat;
            wheelRB.parent = body;
            wheelRB.position.z = -0.1;
            wheelRB.position.x = -0.2;
            wheelRB.position.y = 0.035;

            return wheelRB;
        }();

        const animWheel = function () {
            const animWheel = new Animation("wheelAnimation", "rotation.y", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
            const wheelKeys = [];

            //At the animation key 0, the value of rotation.y is 0
            wheelKeys.push({
                frame: 0,
                value: 0
            });

            //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
            wheelKeys.push({
                frame: 30,
                value: 2 * Math.PI
            });
            //set the keys
            animWheel.setKeys(wheelKeys);

            //Link this animation to the right back wheel
            wheelRB.animations = [];
            wheelRB.animations.push(animWheel);
        }();

        const wheelRF = wheelRB.clone("wheelRF");
        wheelRF.position.x = 0.1;

        const wheelLB = wheelRB.clone("wheelLB");
        wheelLB.position.y = -0.2 - 0.035;

        const wheelLF = wheelRF.clone("wheelLF");
        wheelLF.position.y = -0.2 - 0.035;

        //Begin animation - object to animate, first frame, last frame and loop if true
        scene.beginAnimation(wheelRB, 0, 30, true);
        scene.beginAnimation(wheelRF, 0, 30, true);
        scene.beginAnimation(wheelLB, 0, 30, true);
        scene.beginAnimation(wheelLF, 0, 30, true);

        return { body, wheelRF, wheelLF, wheelRB, wheelLB }
    }();

    //Fountain
    const fountain = function () {
        const fountainProfile = [
            new Vector3(0, 0, 0),
            new Vector3(10, 0, 0),
            new Vector3(10, 4, 0),
            new Vector3(8, 4, 0),
            new Vector3(8, 1, 0),
            new Vector3(1, 2, 0),
            new Vector3(1, 15, 0),
            new Vector3(3, 17, 0)
        ];

        const fountain = MeshBuilder.CreateLathe("fountain", { shape: fountainProfile, sideOrientation: Mesh.DOUBLESIDE }, scene);
        fountain.scaling = new Vector3(1 / 20, 1 / 20, 1 / 20);
        fountain.position.z = 2;
        fountain.position.x = 1;

        const particleSystem = function () {
            const particleSystem = new ParticleSystem("particles", 5000, scene);
            particleSystem.particleTexture = new Texture("../content/cloud.png", scene);

            particleSystem.emitter = fountain.position.add(new Vector3(0, .8, 0)); // the point at the top of the fountain
            particleSystem.minEmitBox = new Vector3(-0.01, 0, -0.01); // minimum box dimensions
            particleSystem.maxEmitBox = new Vector3(0.01, 0, 0.01); // maximum box dimensions

            particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
            particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);

            particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

            particleSystem.minSize = 0.01;
            particleSystem.maxSize = 0.05;

            particleSystem.minLifeTime = 0.3;
            particleSystem.maxLifeTime = 1.5;

            particleSystem.emitRate = 1500;

            particleSystem.direction1 = new Vector3(-1, 8, 1);
            particleSystem.direction2 = new Vector3(1, 8, -1);

            particleSystem.minEmitPower = 0.2;
            particleSystem.maxEmitPower = 0.6;
            particleSystem.updateSpeed = 0.01;

            particleSystem.gravity = new Vector3(0, -9.81, 0);

            return particleSystem;
        }();

        let switched = false;  //on off flag

        scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERDOWN:
                    if (pointerInfo.pickInfo.hit) {
                        pointerDown(pointerInfo.pickInfo.pickedMesh)
                    }
                    break;
            }
        });

        const pointerDown = (mesh: AbstractMesh): void => {
            if (mesh === fountain) { //check that the picked mesh is the fountain
                switched = !switched;  //toggle switch
                if (switched) {
                    particleSystem.start();
                }
                else {
                    particleSystem.stop();
                }
            }
        }

        return fountain;
    }();

    //Lamps
    const lamps = function () {
        const lamp = function () {
            const lampShape = [];
            for (let i = 0; i < 20; i++) {
                lampShape.push(new Vector3(Math.cos(i * Math.PI / 10), Math.sin(i * Math.PI / 10), 0));
            }
            lampShape.push(lampShape[0]); //close shape

            const lampPath = [];
            lampPath.push(new Vector3(0, 0, 0));
            lampPath.push(new Vector3(0, 10, 0));
            for (let i = 0; i < 20; i++) {
                lampPath.push(new Vector3(1 + Math.cos(Math.PI - i * Math.PI / 40), 10 + Math.sin(Math.PI - i * Math.PI / 40), 0));
            }
            lampPath.push(new Vector3(3, 11, 0));

            const post = MeshBuilder.ExtrudeShape("lamp", { cap: Mesh.CAP_END, shape: lampShape, path: lampPath, scale: 0.5 });
            post.scaling = new Vector3(0.05, 0.05, 0.05);
            post.position.x = -1.5;
            post.position.z = 1;
            post.rotation.y = Tools.ToRadians(90);

            const lampLight = new SpotLight("name",
                new Vector3(.1 * 20, .5 * 20, 0),
                new Vector3(0, -1, 0),
                Tools.ToRadians(140),
                4,
                scene
            );
            lampLight.diffuse = Color3.Yellow();
            lampLight.parent = post;

            return { post, lampLight };
        }();

        const positions = [
            [-1.5, -1, -90],
            // [1.5, 1, 90],
            // [1.5, -1, -90],
        ];

        positions.forEach(function (position, i) {
            const instance = lamp.post.createInstance("instance");
            instance.position.x = position[0];
            instance.position.z = position[1];
            instance.position.y = 0;
            instance.rotation.y = Tools.ToRadians(position[2]);

            const lightInstance = lamp.lampLight.clone("light")
            lightInstance.parent = instance;
        });
    }();

    //UI
    const UI = function () {
        const adt = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        const panel = new StackPanel();
        panel.width = "220px";
        panel.top = "-50px";
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        adt.addControl(panel);

        const header = new TextBlock();
        header.text = "Night to Day";
        header.height = "30px";
        header.color = "white";
        panel.addControl(header);

        const slider = new Slider();
        slider.minimum = 0;
        slider.maximum = 1;
        slider.borderColor = "black";
        slider.color = "#AAAAAA";
        slider.background = "#white";
        slider.value = 1;
        slider.height = "20px";
        slider.width = "200px";
        panel.addControl(slider);

        slider.onValueChangedObservable.add((value) => {
            if (sun) {
                sun.intensity = value;
            }
        });

        return adt;
    }();

    //Camera
    const camera = new FollowCamera("camera", new Vector3(-6, 0, 0), scene)
    camera.heightOffset = 8;
    camera.radius = 1;
    camera.rotationOffset = 0;
    camera.cameraAcceleration = 0.005;
    camera.maxCameraSpeed = 10;
    // camera.attachControl(true);
    camera.lockedTarget = car.body;

    //Run before rendering the scene
    scene.onBeforeRenderObservable.add(() => {

    });

    return scene;
}