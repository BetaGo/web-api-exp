import { useCallback, useEffect, useState } from "react";

export default function CompassDemo() {
  const [rotate, setRotate] = useState(0);
  const [permitted, setPermitted] = useState(false);
  const [eventStr, setEventStr] = useState("");

  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    const { webkitCompassHeading } = e as any;
    console.log(e);
    setRotate(webkitCompassHeading);
    setEventStr(JSON.stringify(e));
  }, []);

  function requestDeviceOrientation() {
    if (permitted) {
      return;
    }

    // @ts-ignore 
    DeviceOrientationEvent.requestPermission()
      .then((permissionState: string) => {
        console.log("state", permissionState);
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
          setPermitted(true);
        }
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (
      !(
        typeof DeviceOrientationEvent !== "undefined" &&
        // @ts-ignore
        typeof DeviceOrientationEvent.requestPermission === "function"
      )
    ) {
      // handle regular non iOS 13+ devices
      setPermitted(true);
      window.addEventListener("deviceorientation", handleOrientation);
    }
  }, []);

  return (
    <div className="w-full h-full" onClick={requestDeviceOrientation}>
      {permitted ? null : <div>Click to request permission</div>}
      <div className="w-80 h-80 grid grid-cols-3 grid-rows-3 items-center">
        <div>nw</div>
        <div>N</div>
        <div>ne</div>
        <div>W</div>
        <div
          className="flex flex-col items-center justify-center"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          <div className="bg-red-500 w-2 h-8" />
          <div className="bg-blue-500 w-2 h-8" />
        </div>
        <div>E</div>
        <div>sw</div>
        <div>S</div>
        <div>se</div>
      </div>
      <div>
        <pre>{eventStr}</pre>
      </div>
    </div>
  );
}
