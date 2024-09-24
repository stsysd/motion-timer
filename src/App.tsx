import "./App.css";
import { IntervalTimer } from "./components/IntervalTimer";

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

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const workParamStr = urlParams.get("work") ?? "25";
  const workDuration = parseInt(workParamStr) * 60 * 1000;
  if (isNaN(workDuration)) {
    return <div>invalid query parameter "work"</div>;
  }

  const breakParamStr = urlParams.get("break") ?? "5";
  const breakDuration = parseInt(breakParamStr) * 60 * 1000;
  if (isNaN(breakDuration)) {
    return <div>invalid query parameter "break"</div>;
  }

  return <>
    <IntervalTimer workDuration={workDuration} breakDuration={breakDuration} />
  </>;
}

export default App
