export class MotionManager {
    /**
     * How the device is turned.
     * Ranges from -30 to 30, being the amount the device is tilted right
     */
    rotation: number;

    /**
     * How much the device accelerated.
     * Ranges from 0 to 40, being the acceleration in m/s * 10
     */
    movement: number;

    /**
     * If the mouse is being used instead
     */
    usingMouse: boolean;

    setupMouse = () => {
        if (this.usingMouse) return;

        window.removeEventListener("deviceorientation", this.handleOrientation);
        window.removeEventListener("devicemotion", this.handleMotion);

        window.addEventListener("mousemove", this.handleMouse);

        this.usingMouse = true;
    }

    handleMouse = (event: MouseEvent) => {
        //Handle rotation
        const rotation =
            (event.clientX / window.innerWidth - .5) * 2
            * 60;
        const rangeRot = 30;
        this.rotation = Math.max(-rangeRot, Math.min(rangeRot, rotation));

        //Handle movement
        const movement = Math.abs(event.movementY) / window.innerHeight * 500;
        const range = 40;
        this.movement = Math.max(0, Math.min(range, movement));
    }

    handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.gamma === null) {
            this.setupMouse();
            return;
        }

        //Format rotation
        const range = 30;
        this.rotation = Math.max(-range, Math.min(range, getRotation(event.alpha, event.beta, event.gamma)));

    }

    handleMotion = (event: DeviceMotionEvent) => {
        if (event.acceleration.x === null) {
            this.setupMouse()
            return;
        }

        //Format movement
        const range = 40;
        this.movement = Math.min(range, getSpeed(event.acceleration.x, event.acceleration.y, event.acceleration.z));
    }

    constructor() {
        this.rotation = 0;
        this.movement = 0;
        this.usingMouse = false;

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
}

function getRotation(alpha: number, beta: number, gamma: number): number {

    //JS math works in radians
    const betaR = beta / 180 * Math.PI;
    const gammaR = gamma / 180 * Math.PI;
    const spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));

    //convert back to degrees
    return spinR * 180 / Math.PI;
}

function getSpeed(alpha: number, beta: number, gamma: number) {
    return Math.sqrt(alpha * alpha + beta * beta + gamma * gamma) * 10;
}