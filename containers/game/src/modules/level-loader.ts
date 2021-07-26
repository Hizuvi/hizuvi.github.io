//Take in a url to the file, return the level as an object
export interface ILevelFile {
    songUrl: string,
    bpm: number,
    /**The movement speed forwards in units per second*/
    speed: number,
    creator: string,
    artist: string,
    /**Offset in seconds for beat syncing*/
    offset: number,

    /**For future use */
    styling: {},

    /**Track data 
     * Is filled with keys, which correspond to what beat the element should be on in 16ths
     * Each beat is an array of an elements and the elements data
     * @example
     * track:[[0, [[1, [10, 10, 31], [10]], [4, 1]]]]
    */
    track: [number, TElement[]][]
}

type TElement = [number, unknown[]]

export enum EElement {
    line,
    jump
}

/**
 * [The beat the point is at(offset from the first beat), The lane the point is at, How smoothed the line is to next point]  
 */
type TLinePoint = [number, 0 | 1 | 2, number];

/**
 * A line
 */
export type TLine = TLinePoint[];

export async function ReadFile(url: string): Promise<ILevelFile> {
    const file = await fetch(url);
    const json = await file.json();
    return json;
}
