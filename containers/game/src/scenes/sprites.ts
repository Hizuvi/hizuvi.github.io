import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { FreeCamera } from "@babylonjs/core/Cameras";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights"
import { Sound, Sprite, SpriteManager } from "@babylonjs/core";
import { AdvancedDynamicTexture, Control, Slider, StackPanel, TextBlock } from "@babylonjs/gui";


export const createTestSprite = (engine: Engine, canvas: HTMLCanvasElement): Scene => {
    //Initialize
    const scene: Scene = new Scene(engine);

    //Ambient light
    const ambient = new HemisphericLight("ambientLight", new Vector3(0, 0, 0), scene);
    ambient.intensity = .1;

    //Sprite
    var sprited = false;

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

        var song: Sound;

        slider.onValueChangedObservable.add((value) => {
            if (!sprited) {
                // const spriteManager = new SpriteManager("spriteManager", "../content/uniform.svg", 1, { width: 1000, height: 1000 }, scene);
                // const cloud = new Sprite("cloud", spriteManager);
                // cloud.width = 4;
                // cloud.height = 4;
                // cloud.position = new Vector3(0, 0, 0);

                song = new Sound("song", "../content/laptok_9.mp3", scene, function () {
                    song.play();
                },
                    { loop: false, autoplay: false }
                );

                sprited = true;
            }

            if (song) {
                console.log(song.currentTime);
            }
        });

        return adt;
    }();

    //Camera
    const camera = new FreeCamera("camera", new Vector3(0, 0, -10), scene);

    return scene;
}