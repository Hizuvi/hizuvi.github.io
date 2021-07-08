export class MotionManager {
    /**
     * How the device is turned
     */
    rotation: number;

    /**
     * How the device is 
     */

    constructor() {
        this.rotation = 0;

        console.log(typeof DeviceMotionEvent)
        console.log(typeof DeviceMotionEvent.requestPermission)

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
    }

    handleOrientation(event: DeviceOrientationEvent) {
        if (event.gamma === null) {
            throw Error("Unsupported");
        }

        this.rotation = getRotation(event.alpha, event.beta, event.gamma)

        document.getElementById("debugText").innerText = "Rotation: " + Math.round(this.rotation).toString();
    }
}

function getRotation(alpha: number, beta: number, gamma: number): number {

    // JS math works in radians
    var betaR = beta / 180 * Math.PI;
    var gammaR = gamma / 180 * Math.PI;
    var spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));

    // convert back to degrees
    return spinR * 180 / Math.PI;
}