import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function SocketTest() {

  useEffect(() => {

    const interval = setInterval(() => {

      socket.emit("driverLocationUpdate", {
        driverId: "69fb79e66c755ad11c81e231",
        latitude: 17.385,
        longitude: 78.4867
      });

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div style={{ color: "white", padding: "40px" }}>
      <h1>Sending Driver Location...</h1>
    </div>
  );
}

export default SocketTest;