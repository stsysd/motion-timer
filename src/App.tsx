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
    <IntervalTimer workDuration={5 * 1000} breakDuration={3 * 1000} />
    <Overlay />
  </>;
}

export default App
