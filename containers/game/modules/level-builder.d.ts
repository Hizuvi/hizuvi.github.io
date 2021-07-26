import { Mesh, Scene, Sound } from "@babylonjs/core";
import { ILevelFile } from "./level-loader";
export interface ILevel {
    song: Sound;
    track: Mesh;
    speed: number;
}
export declare function generateLevel(scene: Scene, levelFile: ILevelFile, doneCB: CallableFunction): Promise<void>;
