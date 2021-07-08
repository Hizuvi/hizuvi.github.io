const debug_text = document.getElementById("debugText") as HTMLParagraphElement;
const demo_button = document.getElementById("startButton") as HTMLButtonElement;

let is_running = false;

function handleOrientation(event: DeviceOrientationEvent){
    debug_text.innerText = event.gamma.toString();
}

demo_button.onclick = function(e) {
    e.preventDefault();
    
    // Request permission for iOS 13+ devices
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission();
    }
    
    if (is_running){
    //   window.removeEventListener("devicemotion", handleMotion);
      window.removeEventListener("deviceorientation", handleOrientation);
      demo_button.innerHTML = "Start demo";
      demo_button.classList.add('btn-success');
      demo_button.classList.remove('btn-danger');
      is_running = false;
    }else{
    //   window.addEventListener("devicemotion", handleMotion);
      window.addEventListener("deviceorientation", handleOrientation);
      document.getElementById("start_demo").innerHTML = "Stop demo";
      demo_button.classList.remove('btn-success');
      demo_button.classList.add('btn-danger');
      is_running = true;
    }
  };