export interface ILevelFile {
    songUrl: string;
    bpm: number;
    speed: number;
    creator: string;
    artist: string;
    offset: number;
    styling: {};
    track: [number, number[][]][];
}
export declare enum Element {
    lineStart = 0,
    linePoint = 1,
    lineEnd = 2,
    jump = 3
}
export declare function ReadFile(url: string): Promise<ILevelFile>;
