console.log("Ver: 6");
import { MotionManager } from "./input";

const demo_button = document.getElementById("startButton");
const textRot = document.getElementById("rot");
const textMov = document.getElementById("mov");
demo_button.addEventListener("click", (e: Event) => {
    const motionManager = new MotionManager();

    update(motionManager);
});

function update(motionManager: MotionManager) {
    textRot.innerText = motionManager.rotation.toString();
    textMov.innerText = motionManager.movement.toString();

    setTimeout(() => { update(motionManager); }, 16);
}
