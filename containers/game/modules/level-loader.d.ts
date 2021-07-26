export interface ILevelFile {
    songUrl: string;
    bpm: number;
    speed: number;
    creator: string;
    artist: string;
    offset: number;
    styling: {};
    track: [number, TElement[]][];
}
declare type TElement = [number, unknown[]];
export declare enum EElement {
    line = 0,
    jump = 1
}
declare type TLinePoint = [number, 0 | 1 | 2, number];
export declare type TLine = TLinePoint[];
export declare function ReadFile(url: string): Promise<ILevelFile>;
export {};
