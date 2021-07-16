console.log("Ver: 6");

import { MotionManager } from "./modules/input";


const demo_button = document.getElementById("startButton");
const textRot = document.getElementById("rot");
const textMov = document.getElementById("mov");
const textMovRaw = document.getElementById("raw");
demo_button.addEventListener("click", (e: Event) => {
    const motionManager = new MotionManager();

    update(motionManager);
});

let smoothed = 0;

function update(motionManager: MotionManager) {
    textRot.innerText = Math.round(motionManager.rotation).toString();
    textMovRaw.innerText = Math.round(motionManager.movement).toString();

    smoothed = lerp(smoothed, motionManager.movement, 0.2);

    textMov.innerText = Math.round(smoothed).toString();

    setTimeout(() => { update(motionManager); }, 16);
}

function lerp(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end
}