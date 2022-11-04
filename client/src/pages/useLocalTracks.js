import { useCallback, useEffect, useState } from "react";

import Video from "twilio-video";

export const useLocalTracks = () => {
  const [videoTrack, videoTrackSet] = useState(undefined);

  const getLocalVideoTrack = useCallback((id) => {
    console.log("usecallback start");
    return Video.createLocalVideoTrack({
      name: `video`
    }).then((newTrack) => {
      console.log("usecallback got track", newTrack);
      videoTrackSet(newTrack);
      return newTrack;
    });
  }, []);

  const removeLocalVideoTrack = useCallback(() => {
    console.log("remove", videoTrack);

    if (videoTrack) {
      videoTrack.stop();
      videoTrackSet(undefined);
    }
  }, [videoTrack]);

  const localTracks = [videoTrack].filter((track) => track !== undefined);

  return { localTracks, getLocalVideoTrack, removeLocalVideoTrack };
};
