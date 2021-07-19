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
     * Each beat is an array of an element followed by any extra data that element needs
     * @example
     * track:[[0, [[1, 2], [4, 1]]]]
    */
    track: [number, number[][]][]
}

export enum Element {
    lineStart,
    linePoint,
    lineEnd,
    jump
}

export async function ReadFile(url: string): Promise<ILevelFile>{
    const file = await fetch(url);
    const json = await file.json();
    return json;
}