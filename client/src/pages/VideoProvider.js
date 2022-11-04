import React, { createContext, useContext } from "react";

import { useLocalTracks } from "./useLocalTracks";

export const VideoContext = createContext(null);

export const VideoProvider = ({ children }) => {
  const {
    localTracks,
    getLocalVideoTrack,
    removeLocalVideoTrack
  } = useLocalTracks();

  console.log("VideoProvider");

  const contextValue = React.useMemo(
    () => ({
      localTracks,
      getLocalVideoTrack,
      removeLocalVideoTrack
    }),
    [localTracks]
  );

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  return context;
};
