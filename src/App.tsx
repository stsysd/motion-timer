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
  let workDuration = parseInt(workParamStr) * 60 * 1000;
  if (isNaN(workDuration)) {
    return <div>invalid query parameter "work"</div>;
  }

  const breakParamStr = urlParams.get("break") ?? "5";
  let breakDuration = parseInt(breakParamStr) * 60 * 1000;
  if (isNaN(breakDuration)) {
    return <div>invalid query parameter "break"</div>;
  }

  const debug = urlParams.get("debug") != null;
  if (debug) {
    workDuration /= 60;
    breakDuration /= 60;
  }

  return <>
    <IntervalTimer workDuration={workDuration} breakDuration={breakDuration} />
  </>;
}

export default App
