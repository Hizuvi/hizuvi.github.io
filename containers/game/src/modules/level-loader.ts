//Take in a url to the file, return the level as an object
export interface ILevel {
    songUrl: string,
    bpm: number,
    creator: string,
    artist: string,
    /**Offset for the beats in ms */
    offset: number,

    /**For future use */
    styling: {},

    /**Track data 
     * Is filled with keys, which correspond to what beat the element should be on in 16ths
     * Each beat is an array of an element followed by any extra data that element needs
     * @example
     * track: { 12: [1, 2]}
    */
    track: {}
}

// export function ReadFile(url: string): ILevel{
//     const file = 

//     return JSON.parse()
// }