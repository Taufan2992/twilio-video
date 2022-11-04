import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import ss from "../assets/images/ss.png";
import maximize from "../assets/images/maximize.png";
import audio from "../assets/images/audio.png";
import video from "../assets/images/video.png";
import userdata from "../assets/images/user.png";
import chat from "../assets/images/chat.png";
import screen from "../assets/images/screen.png";
import cam from "../assets/images/cam.png";
import more from "../assets/images/more.png";
import phone from "../assets/images/phone.png";
import Chat from "../partial/Chat";
import Data from "../partial/Data";
import Screen from "../partial/Screen";
import "../style.css"
// import { Twilio, createLocalVideoTrack, TrackPublication, Participant, Track, connect, createLocalTracks } from 'twilio-video'
// import { useContext } from "react";
// import { Videocontext } from "../context/video-context";
// import { Usercontext } from "../context/user-context";

function Room({ roomName, room, handleLogout }) {
    // const [videoState] = useContext(Videocontext)
    // const [state] = useContext(Usercontext)
    // const token = localStorage.token
    // console.log("Access Token : ", token);
    // const [user] = useState(state.user)
    // const [roomName] = useState(videoState.roomName)
    // console.log(videoState.roomName);
    const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));


    const [menu, setMenu] = useState()

    const handleData =()=> setMenu(1)
    const handleChat =()=> setMenu(2)
    const handleScreen =()=> setMenu(3)

    function GetData() {
        if (menu === 1) {
            const btnData = document.getElementById("data")
            btnData.style.backgroundColor = "rgb(79	129	255)";
            const btnChat = document.getElementById("chat")
            btnChat.style.backgroundColor = "rgb(241 245 249)";
            const btnScreen = document.getElementById("screen")
            btnScreen.style.backgroundColor = "rgb(241 245 249)";
            return <Data/>
        } else if (menu === 2) {
            const btnChat = document.getElementById("chat")
            btnChat.style.backgroundColor = "rgb(79	129	255)";
            const btnScreen = document.getElementById("screen")
            btnScreen.style.backgroundColor = "rgb(241 245 249)";
            const btnData = document.getElementById("data")
            btnData.style.backgroundColor = "rgb(241 245 249)";
            return <Chat/>
        } else if (menu === 3) {
            const btnScreen = document.getElementById("screen")
            btnScreen.style.backgroundColor = "rgb(79	129	255)";
            const btnChat = document.getElementById("chat")
            btnChat.style.backgroundColor = "rgb(241 245 249)";
            const btnData = document.getElementById("data")
            btnData.style.backgroundColor = "rgb(241 245 249)";
            return <Screen/>
        }
    }

  //   async function room() {
  //   const tracks = await createLocalTracks({
  //       audio: true,
  //       video: {facingMode: 'user'}
  //   })
  //   const username = user
  //   const nameRoom = roomName
  //   const LocalVideoTrack = tracks.find(track => track.kind === 'video');
  //   const box = document.getElementById("box");
  //   const on = document.getElementById("on-btn");
  //   const name = document.getElementById("name")
  //   const rooms = document.getElementById("roomName")
  //   await connect(`${token}`, {
  //       name: `${roomName}`,
  //       tracks
  //   })
  //   box.appendChild(LocalVideoTrack.attach());
  //   // on.style.visibility = "hidden";
  //   console.log("Local Tracks : ", tracks);
  //   console.log("You are connect to room : ", nameRoom);
  //   console.log("User Name : ", username);
  //   // name.append(document.createTextNode(username))
  //   // rooms.append(document.createTextNode(`You are connected to room : ${nameRoom}`))
  // };
  return (
    <div style={{ backgroundColor: "#FAFAFA", height: "100vh" }}>
      <Container className="py-4">
        <Row>
          <Col sm={8}>
            <Card className="p-4 rounded-4">
              <h3 className="mb-3">Credit Application Surver</h3>
              <Row>
                <Col sm={8}>
                  {/* <Image
                    className="rounded-4"
                    style={{ objectFit: "cover", width: "100%" }}
                    src="https://img.freepik.com/free-photo/close-up-smiley-man-taking-selfie_23-2149155156.jpg?w=2300"
                  /> */}
                        <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </div>
                </Col>
                <Col sm={4} style={{ position: "relative" }}>
                  {/* <Image
                    className="rounded-4"
                    style={{ objectFit: "cover", width: "100%" }}
                    src="https://st.depositphotos.com/2413271/5050/i/950/depositphotos_50503825-stock-photo-handsome-man-taking-selfie.jpg"
                  /> */}
                  <div className="remote-participants">{remoteParticipants}</div>
                  <div
                    style={{ position: "absolute", right: 0, bottom: 0 }}
                    className="d-flex justify-content-end"
                  >
                    <span
                      className=" p-2 rounded-circle"
                      style={{ backgroundColor: "#F1F5F9" }}
                    >
                      <Image style={{ width: 30, height: 30 }} src={ss} />
                    </span>
                    <span
                      className="p-2 rounded-circle"
                      style={{ backgroundColor: "#F1F5F9" }}
                    >
                      <Image style={{ width: 30, height: 30 }} src={maximize} />
                    </span>
                  </div>
                  {/* <div className="d-inline text-end"><Image src={maximize}/></div> */}
                </Col>
              </Row>
            </Card>
            <Card className="rounded-4 d-flex flex-row justify-content-around p-2 mt-4">
              <Button 
              className="border-0"
                style={{ backgroundColor: "#DDE7FF", paddingLeft:20, paddingRight:20}}>
                <Image
                  width={23}
                  height={23}
                  style={{ objectFit: "contain" }}
                  src={audio}
                />
              </Button>
              <Button 
              className="border-0"
              style={{ backgroundColor: "#DDE7FF", paddingLeft:20, paddingRight:20 }}>
                <Image
                  width={23}
                  height={23}
                  style={{ objectFit: "contain" }}
                  src={video}
                />
              </Button>
              <Button
              className="border-0"
              style={{ backgroundColor: "#F1F5F9", paddingLeft:20, paddingRight:20 }}
              onClick={handleData}
              id="data"
              >
                <Image
                  width={23}
                  height={23}
                  style={{ objectFit: "contain" }}
                  src={userdata}
                />
              </Button>
              <Button
              className="border-0"
              style={{ backgroundColor: "#F1F5F9", paddingLeft:20, paddingRight:20 }}
              onClick={handleChat}
              id="chat"
              >
                <Image
                  width={23}
                  height={23}
                  style={{ objectFit: "contain" }}
                  src={chat}
                />
              </Button>
              <Button
              className="border-0"
              style={{ backgroundColor: "#F1F5F9", paddingLeft:20, paddingRight:20 }}
              onClick={handleScreen}
              id="screen"
              >
                <Image
                  width={23}
                  height={23}
                  style={{ objectFit: "contain" }}
                  src={screen}
                />
              </Button>
              <Button
              className="border-0"
              style={{ backgroundColor: "#F1F5F9", paddingLeft:20, paddingRight:20 }}
              >
                <Image
                  width={23}
                  height={23}
                  style={{ objectFit: "contain" }}
                  src={cam}
                />
              </Button>
              <Button
              className="border-0"
              style={{ backgroundColor: "#F1F5F9", paddingLeft:20, paddingRight:20 }}
              >
                <Image
                  width={23}
                  height={23}
                  style={{ objectFit: "contain" }}
                  src={more}
                />
              </Button>
              <Button
              className="border-0"
              style={{ backgroundColor: "#FC5E5A", paddingLeft:20, paddingRight:20 }}
              >
                <Image
                  width={23}
                  height={23}
                  style={{ objectFit: "contain" }}
                  src={phone}
                />
              </Button>
            </Card>
          </Col>
          <Col sm={4}>
            <Card className="p-4 rounded-4">
              <GetData />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Room;
