import React, { useState } from "react";

import { Chat } from "./Chat";
import { VideoProvider } from "./VideoProvider";

export default function VideoComponent() {
  const [visible, setVisible] = useState(false);
  console.log({ visible });

  const handleShow = () => {
    setVisible((prev) => !prev);
  };
  console.log("App");

  return (
    <>
      <h3>App</h3>
      <button onClick={handleShow}>Show</button>
      <VideoProvider>{visible ? <Chat /> : null}</VideoProvider>
    </>
  );
}
