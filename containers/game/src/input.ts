export class MotionManager {
    /**
     * How the device is turned.
     * Ranges from -30 to 30, being the amount the device is tilted right
     */
    rotation: number;

    /**
     * How much the device accelerated.
     * Ranges from -20 to 20, being the acceleration in m/s * 10
     */
    movement: number;

    constructor() {
        this.rotation = 0;
        this.movement = 0;

        //Check for support
        if (!DeviceMotionEvent) {
            throw Error("unsupported");
        }

        //Check if permission is needed
        if (typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission();
        }

        //   window.addEventListener("devicemotion", handleMotion);
        window.addEventListener("deviceorientation", this.handleOrientation);
        window.addEventListener("devicemotion", this.handleMotion);
    }

    handleOrientation(event: DeviceOrientationEvent) {
        if (event.gamma === null) {
            throw Error("Unsupported");
        }

        //Format rotation
        const range = 30;
        this.rotation = Math.max(-range, Math.min(range, getRotation(event.alpha, event.beta, event.gamma)));

    }

    handleMotion(event: DeviceMotionEvent) {
        if(event.acceleration.x === null) {
            throw Error("Unsupported");
        }

        //Format movement
        const range = 20;
        this.movement = Math.max(-range, Math.min(range, getSpeed(event.acceleration.x, event.acceleration.y, event.acceleration.z)));

        document.getElementById("debugText").innerText = "Motion: " + Math.round(this.movement).toString();
    }
}

function getRotation(alpha: number, beta: number, gamma: number): number {

    // JS math works in radians
    const betaR = beta / 180 * Math.PI;
    const gammaR = gamma / 180 * Math.PI;
    const spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));

    // convert back to degrees
    return spinR * 180 / Math.PI;
}

function getSpeed(alpha: number, beta: number, gamma: number) {
    return Math.sqrt(alpha * alpha + beta * beta + gamma * gamma) * 10;
}