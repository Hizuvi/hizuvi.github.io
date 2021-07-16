declare module "modules/input" {
    export class MotionManager {
        rotation: number;
        movement: number;
        usingMouse: boolean;
        setupMouse: () => void;
        handleMouse: (event: MouseEvent) => void;
        handleOrientation: (event: DeviceOrientationEvent) => void;
        handleMotion: (event: DeviceMotionEvent) => void;
        constructor();
    }
}
declare module "index" { }
