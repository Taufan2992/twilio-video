import React, { useState, useEffect } from "react";
import audio from "../assets/images/audio.png";
import video from "../assets/images/video.png";
import more from "../assets/images/more.png";
import camoff from "../assets/images/camoff.png"
import offvideo from "../assets/images/offvideo.png"
import offaudio from "../assets/images/offaudio.png"
import { Container, Row, Col, Button } from "react-bootstrap";
import { createLocalTracks } from 'twilio-video'
import { useContext } from "react";
import { Videocontext } from "../context/video-context";

function Buttonvid() {
  const [videoState] = useContext(Videocontext)
  const [roomName] = useState(videoState.roomName)
  const [state, setState] = useState(true);

  const buttonHandler = () => {
    setState((current) => !current);
    console.log(state);
  };

  const [isVideoActive, setIsVideoActive] = useState(true)

  const getVideo = async() => {
      setIsVideoActive(true);
      const tracks = await createLocalTracks({
        audio: true,
        video: { height: 720, frameRate: 24, width: 1280 }
     });
      const box = document.getElementById("box");
      const LocalVideoTrack = tracks.find(track => track.kind === 'video');
      box.innerHTML = ""
      box.appendChild(LocalVideoTrack.attach());
  }

  const stopVideo = async() => {
    console.log("tutup");
    setIsVideoActive(false);
    const box = document.getElementById("box");
    const tracks = await createLocalTracks({
      room : roomName
    });
    const LocalVideoTrack = tracks.find(track => track.kind === 'video');
    // LocalVideoTrack.stop()
      LocalVideoTrack.stop();
    // LocalVideoTrack.disable()
    // .then(_local => {local = _local
    // local.unpublish(LocalVideoTrack)})
    console.log(tracks);    
    box.innerHTML = '<img src="' + camoff + '" width="100%" />'
  }

  console.log(isVideoActive);

  useEffect(()=> {
    if(isVideoActive){
      getVideo()
    }
  }, [])

//   async function start() {
//     const startButton = document.getElementById("start")
//     if (startButton.value === "on") {
//         startButton.value = "off"
//         startButton.innerHTML = '<img src="' + video + '" width="23px"/>'
//         const tracks = await createLocalTracks({
//           name: 'my-room-name',
//           audio: true,
//           video: { height: 360, frameRate: 24, width: 1280 }
//        })
//         const box = document.getElementById("box");
//         const LocalVideoTrack = tracks.find(track => track.kind === 'video');
//         box.innerHTML = ""
//         box.appendChild(LocalVideoTrack.attach());
//     } else {
//         startButton.value = "on"
//         const tracks = await createLocalTracks();
//         const box = document.getElementById("box");
//         box.innerHTML = '<img src="' + camoff + '" width="100%" />'
//         startButton.innerHTML = '<img src="' + offvideo + '" width="23px"/>'
//         tracks.stop()
//     }
// }

  return (
    <Container style={{ position: "absolute", top: "75%", left: "37%" }}>
      {/* <Row> */}
        <div className="bg-white rounded-4 px-3 pt-3 d-inline" style={{paddingBottom:21}}>
        <Button
            className="btn me-2 border-0"
            onClick={buttonHandler}
            style={
              { backgroundColor: "#DDE7FF" }
            }
          >
            {state ? 
            <img
              src={audio}
              width={23}
              height={20}
              style={{ objectFit: "contain" }}
              alt=""
            /> :
            <img
              src={offaudio}
              width={23}
              height={20}
              style={{ objectFit: "contain" }}
              alt=""
            />}
          </Button>


          <Button
              className="btn me-2 border-0"
              onClick={ 
                isVideoActive ? stopVideo : getVideo
              }
              style={
                { backgroundColor: "#DDE7FF" }
              }
          >

          {isVideoActive ? 
            <img
              src={video}
              width={23}
              height={20}
              style={{ objectFit: "contain" }}
              alt=""
            /> :
            <img
              src={offvideo}
              width={23}
              height={20}
              style={{ objectFit: "contain" }}
              alt=""
            />}
          </Button>

          <Button
            className="btn border-0"
            style={{ backgroundColor: "#F1F5F9" }}
          >
            <img
              src={more}
              width={23}
              style={{ objectFit: "contain" }}
              alt=""
            />
          </Button>
        </div>
      {/* </Row> */}
    </Container>
  );
}

export default Buttonvid;
