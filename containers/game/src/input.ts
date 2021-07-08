export class MotionManager {
    alpha: number;
    beta: number;
    gamma: number;

    constructor() {
        this.alpha = 0;
        this.beta = 0;
        this.gamma = 0;

        // Request permission for iOS 13+ devices
        if (
            DeviceMotionEvent &&
            typeof DeviceMotionEvent.requestPermission === "function"
        ) {
            DeviceMotionEvent.requestPermission();
        }

        //   window.addEventListener("devicemotion", handleMotion);
        window.addEventListener("deviceorientation", this.handleOrientation);
    }
    
    handleOrientation(event: DeviceOrientationEvent) {
        this.alpha = event.alpha;
        this.beta = event.beta;
        this.gamma = event.gamma;

        document.getElementById("debugText").innerText = this.gamma.toString();
    }
}