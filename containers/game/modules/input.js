export class MotionManager {
    rotation;
    movement;
    usingMouse;
    setupMouse = () => {
        if (this.usingMouse)
            return;
        window.removeEventListener("deviceorientation", this.handleOrientation);
        window.removeEventListener("devicemotion", this.handleMotion);
        window.addEventListener("mousemove", this.handleMouse);
        this.usingMouse = true;
    };
    handleMouse = (event) => {
        const rotation = (event.clientX / window.innerWidth - .5) * 2
            * 60;
        const rangeRot = 30;
        this.rotation = Math.max(-rangeRot, Math.min(rangeRot, rotation));
        const movement = Math.abs(event.movementY) / window.innerHeight * 500;
        const range = 40;
        this.movement = Math.max(0, Math.min(range, movement));
    };
    handleOrientation = (event) => {
        if (event.gamma === null) {
            this.setupMouse();
            return;
        }
        const range = 30;
        this.rotation = Math.max(-range, Math.min(range, getRotation(event.alpha, event.beta, event.gamma)));
    };
    handleMotion = (event) => {
        if (event.acceleration.x === null) {
            this.setupMouse();
            return;
        }
        const range = 40;
        this.movement = Math.min(range, getSpeed(event.acceleration.x, event.acceleration.y, event.acceleration.z));
    };
    constructor() {
        this.rotation = 0;
        this.movement = 0;
        this.usingMouse = false;
        if (!DeviceMotionEvent) {
            throw Error("unsupported");
        }
        if (typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission();
        }
        window.addEventListener("deviceorientation", this.handleOrientation);
        window.addEventListener("devicemotion", this.handleMotion);
    }
}
function getRotation(alpha, beta, gamma) {
    const betaR = beta / 180 * Math.PI;
    const gammaR = gamma / 180 * Math.PI;
    const spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
    return spinR * 180 / Math.PI;
}
function getSpeed(alpha, beta, gamma) {
    return Math.sqrt(alpha * alpha + beta * beta + gamma * gamma) * 10;
}
//# sourceMappingURL=input.js.map