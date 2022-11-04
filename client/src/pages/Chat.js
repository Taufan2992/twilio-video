import { useEffect, useRef } from "react";

import React from "react";
import { useVideoContext } from "./VideoProvider";

export const Chat = React.memo(() => {
  console.log("Chat");
  const {
    localTracks,
    getLocalVideoTrack,
    removeLocalVideoTrack
  } = useVideoContext();

  const videoTrack = localTracks.find((track) => track.kind === "video");

  useEffect(() => {
    getLocalVideoTrack();
  }, [getLocalVideoTrack]);

  useEffect(() => {
    return () => {
      removeLocalVideoTrack();
    };
  }, [removeLocalVideoTrack]);

  console.log(localTracks);

  return <div>{videoTrack ? <VideoTrack track={videoTrack} /> : null}</div>;
});

const VideoTrack = React.memo(({ track }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    track.attach(el);
    return () => {
      console.log("detach video track");
      track.detach(el);
    };
  }, [track]);

  return <video style={{ width: "300px", height: "200px" }} ref={ref} />;
});
