export declare class MotionManager {
    rotation: number;
    movement: number;
    constructor();
    handleOrientation(event: DeviceOrientationEvent): void;
    handleMotion(event: DeviceMotionEvent): void;
}
