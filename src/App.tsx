import "./App.css";
import { IntervalTimer } from "./components/IntervalTimer";
import { Overlay } from "./components/Overlay";

function App() {
  if (window.DeviceOrientationEvent == null) {
    return <div>not supported</div>;
  }
  if (window.DeviceMotionEvent == null) {
    return <div>not supported</div>;
  }
  if (window.WakeLock == null) {
    return <div>not supported</div>;
  }

  return <>
    <IntervalTimer workDuration={25 * 60 * 1000} breakDuration={5 * 60 * 1000} />
    <Overlay />
  </>;
}

export default App
