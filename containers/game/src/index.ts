console.log("Ver: 1");

import { MotionManager } from "./input";

let motionManager;

const demo_button = document.getElementById("startButton");
demo_button.addEventListener("click", (e: Event) => {
    motionManager = new MotionManager();
});


