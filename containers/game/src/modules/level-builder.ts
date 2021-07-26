import { Color3, Mesh, MeshBuilder, Scene, Sound, StandardMaterial, Vector3 } from "@babylonjs/core";
import { ILevelFile, TLine } from "./level-loader";
import { EElement } from "./level-loader";

export interface ILevel {
    song: Sound;
    track: Mesh;
    speed: number;
}

function generateElements(levelFile: ILevelFile, scene: Scene) {

    //The track container
    const trackMat = new StandardMaterial("trackMat", scene);
    trackMat.alpha = 0;

    const track = MeshBuilder.CreateBox("track", { size: 1 }, scene);
    track.position.y = 0;
    track.material = trackMat;

    //Materials
    const linePointMat = new StandardMaterial("midLineMat", scene);
    linePointMat.diffuseColor = new Color3(0, .5, .5);

    //Generate the elements of the level
    var lastLane: number; //For ending lines
    for (const step of levelFile.track) {
        const beat = step[0];
        const offset = levelFile.offset * levelFile.speed;
        const position = beat * (60 / levelFile.bpm) * levelFile.speed + offset;

        for (const element of step[1]) {

            //Figure out which element to create
            switch (element[0]) {
                case EElement.line:
                    //Typechecking
                    const line = element[1] as TLine;

                    //Generate line
                    for (const point of line) {
                        const pointPosition = (beat + point[0]) * (60 / levelFile.bpm) * levelFile.speed + offset;
                        
                        const linePoint = MeshBuilder.CreateBox("line", { depth: 0.1 }, scene);
                        linePoint.position = new Vector3(-1 + point[1], 0, pointPosition);
                        linePoint.parent = track;
                        linePoint.material = linePointMat;
                    }

                    break;

                case EElement.jump:
                    throw Error("not implemented yet");
                    break;
            }
        }

        return track;
    }
}

/**
 * Creates a level
 * @param scene Scene
 * @param levelFile The file to to use, load one with level loader
 * @param doneCB The callback to call after done. (song, track, speed)
 */
export async function generateLevel(scene: Scene, levelFile: ILevelFile, doneCB: CallableFunction) {
    console.log("Generating level!");

    //Load song
    const song = new Sound("Song", levelFile.songUrl, scene, null, {
        autoplay: false
    });

    //Generate elements
    const track = generateElements(levelFile, scene);

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