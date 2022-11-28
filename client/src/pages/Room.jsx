import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import TwilioVideo, {connect} from "twilio-video";
import { useContext } from "react";
import { Videocontext } from "../context/video-context";
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
import copy from "../assets/images/copy.png";
import signal from "../assets/images/signal.png";
import person from "../assets/images/person.png";
import roomicon from "../assets/images/roomicon.png";
import userdataon from "../assets/images/useron.png";
import "../style.css";

function Room() {
  const [menu, setMenu] = useState();
  const [connects, setConnects] = useState();

  const handleData = () => setMenu(1);
  const handleChat = () => setMenu(2);
  const handleScreen = () => setMenu(3);

  function GetData() {
    if (menu === 1) {
      const btnData = document.getElementById("data");
      btnData.style.backgroundColor = "rgb(79	129	255)";
      const btnChat = document.getElementById("chat");
      btnChat.style.backgroundColor = "rgb(241 245 249)";
      const btnScreen = document.getElementById("screen");
      btnScreen.style.backgroundColor = "rgb(241 245 249)";
      return <Data />;
    } else if (menu === 2) {
      const btnChat = document.getElementById("chat");
      btnChat.style.backgroundColor = "rgb(79	129	255)";
      const btnScreen = document.getElementById("screen");
      btnScreen.style.backgroundColor = "rgb(241 245 249)";
      const btnData = document.getElementById("data");
      btnData.style.backgroundColor = "rgb(241 245 249)";
      return <Chat />;
    } else if (menu === 3) {
      const btnScreen = document.getElementById("screen");
      btnScreen.style.backgroundColor = "rgb(79	129	255)";
      const btnChat = document.getElementById("chat");
      btnChat.style.backgroundColor = "rgb(241 245 249)";
      const btnData = document.getElementById("data");
      btnData.style.backgroundColor = "rgb(241 245 249)";
      return <Screen />;
    }
  }

  const [videoState] = useContext(Videocontext);
  const token = localStorage.token;
  console.log("Access Token : ", token);
  const [roomName] = useState(videoState.roomName);
  console.log(videoState.roomName);
  console.log(token);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  console.log(roomName);
  const [ids, setIds] = useState();
  console.log(ids);
  const Navigate = useNavigate();
  const [twilioPublication, setTwilioPublication] = useState();

  function appendNewParticipant(track, identity) {
    const chat = document.createElement("div");
    chat.setAttribute("id", identity);
    chat.appendChild(track.attach());
    remoteVideoRef.current.appendChild(chat);
    console.log("identity",identity);
    setIds(identity)
    
  }



  function removeParticipants(participant) {
    console.log(
      "Removing participant with identity",
      participant
    );
    console.log(twilioPublication);
    twilioPublication.stop()
    const elem = document.getElementById(ids);
    elem.parentNode.removeChild(elem);
    console.log(twilioPublication);
    // Navigate('/check')

  }


  useEffect(() => {
    // connect with twilio with token
    console.log("Trying to connect to Twilio with token", token);
    const twl = connect(token, {
      video: true,
      audio: true,
      name: roomName,
    })
      .then((roomName) => {
        // create local video with track, and append to localVideoRef
        console.log("connected to Twilio", twl);
        TwilioVideo.createLocalVideoTrack({
          audio: true,
          video: { height: 720, frameRate: 24, width: 1280 }
       }).then((track) => {
          localVideoRef.current.appendChild(track.attach());
          console.log("connected to Twilio", track);
          // track.stop();
          console.log("connected to Twilio", track);
        });
        setConnects(false)
        console.log(connects);
        function removeParticipant(participant) {
          console.log(
            "Removing participant with identity",
            participant
          );
          const elem = document.getElementById(participant.identity);
          elem.parentNode.removeChild(elem);

        }
        function addParticipant(participant) {
          console.log("Adding a new Participant", participant);
          participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
              const track = publication.track;
              console.log("Attached a track", publication);
              appendNewParticipant(track, participant.identity);
              
            }
            // publication.track.disable()
            setTwilioPublication(publication.track);
            console.log(twilioPublication);
            
          });
          participant.on("trackSubscribed", (track) => {
            appendNewParticipant(track, participant.identity);
            console.log(track);
          });
          setConnects(true);
          
        }
        // agar participant yg baru join on the room bisa saling terkoneksi (forEach)
        roomName.participants.forEach(addParticipant);
        roomName.on("participantConnected", addParticipant);
        roomName.on("participantDisconnected", removeParticipant);
        console.log(roomName.participants.size);
      })
      .catch((e) => {
        console.log("An error happened", e);
      });

    return () => {};
  }, []);

  return (
    <div style={{ backgroundColor: "#FAFAFA", height: "100vh" }}>
      <Container className="py-4">
        <Row>
          <Col sm={8}>
            <Card className="p-4 rounded-4">
              <div className="d-flex">
                <h3 className="mb-3 textBold fw-bold" style={{ fontSize: 24 }}>
                  Credit Application Surver
                </h3>
                <span
                  className="mb-3 ms-3 mt-2 rounded-4 px-2 "
                  style={{
                    backgroundColor: "#E9F7F0",
                    color: "#31BF7D",
                    fontSize: 12,
                  }}
                >
                  01 : 28 :05
                </span>
              </div>

              <Row>
                    <Col className={connects ? "col-sm-8" : "d-none"}>
                      <div ref={remoteVideoRef} id="remotevideo"></div>
                    </Col>

                    <Col className={connects ? "col-sm-4" : "col-sm-12"} style={{ position: "relative" }}>
                      <div
                        id="localvideo"
                        className="rounded-4"
                        style={{ width: "100%", position: "relative" }}
                        ref={localVideoRef}
                      ></div>
                    </Col>
              </Row>
            </Card>

            <Card className="rounded-4 mt-4 px-3">
              <div className="d-flex justify-content-between p-2">
                <div className="d-flex">
                  <div>
                    <img
                      className="me-1"
                      width={15}
                      height={15}
                      src={person}
                      alt=""
                    />{" "}
                    <span className="me-1" style={{ fontSize: 12 }}>
                      Participant
                    </span>{" "}
                    <span
                      className="px-1 rounded-4 me-2"
                      style={{
                        backgroundColor: "#E9F7F0",
                        color: "#31BF7D",
                        fontSize: 12,
                      }}
                      id="count"
                    ></span>
                  </div>
                  <div>
                    <img
                      className="me-1"
                      width={15}
                      height={15}
                      src={roomicon}
                      alt=""
                    />
                    <span className="me-1" style={{ fontSize: 12 }}>
                      Room Name
                    </span>{" "}
                    <span
                      className="px-1 rounded-4"
                      style={{
                        backgroundColor: "#E9F7F0",
                        color: "#31BF7D",
                        fontSize: 12,
                      }}
                    >
                      {roomName}
                    </span>
                  </div>
                </div>
                <div>
                  {" "}
                  <span
                    className="px-2 rounded-4"
                    style={{
                      backgroundColor: "#E9F7F0",
                      color: "#31BF7D",
                      fontSize: 12,
                    }}
                  >
                    <img
                      className="me-2"
                      width={10}
                      height={10}
                      src={copy}
                      alt=""
                    />
                    <span>Copy link meeting</span>
                  </span>{" "}
                </div>
              </div>

              <div className="container rounded-4 d-flex flex-row justify-content-between p-2">
                <div>
                  <Button
                    className="border-0"
                    style={{
                      backgroundColor: "#DDE7FF",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <Image
                      width={23}
                      height={23}
                      style={{ objectFit: "contain" }}
                      src={audio}
                    />
                  </Button>
                  <p className="text-center my-1" style={{ fontSize: 12 }}>
                    mute
                  </p>
                </div>
                <div>
                  <Button
                    className="border-0"
                    style={{
                      backgroundColor: "#DDE7FF",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <Image
                      width={23}
                      height={23}
                      style={{ objectFit: "contain" }}
                      src={video}
                    />
                  </Button>
                  <p className="text-center my-1" style={{ fontSize: 12 }}>
                    stop video
                  </p>
                </div>
                <div>
                  <Button
                    className="border-0 mx-2"
                    style={{
                      backgroundColor: "#F1F5F9",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                    onClick={handleData}
                    id="data"
                  >
                    <Image
                      width={23}
                      height={23}
                      style={{ objectFit: "contain" }}
                      src={userdataon}
                    />
                  </Button>
                  <p className="text-center my-1" style={{ fontSize: 12 }}>
                    data validation
                  </p>
                </div>

                <div>
                  <Button
                    className="border-0"
                    style={{
                      backgroundColor: "#F1F5F9",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
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
                  <p className="text-center my-1" style={{ fontSize: 12 }}>
                    chat
                  </p>
                </div>
                <div>
                  <Button
                    className="border-0 mx-2"
                    style={{
                      backgroundColor: "#F1F5F9",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
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
                  <p className="text-center my-1" style={{ fontSize: 12 }}>
                    share screen
                  </p>
                </div>
                <div>
                  <Button
                    className="border-0 mx-2"
                    style={{
                      backgroundColor: "#F1F5F9",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <Image
                      width={23}
                      height={23}
                      style={{ objectFit: "contain" }}
                      src={cam}
                    />
                  </Button>
                  <p className="text-center my-1" style={{ fontSize: 12 }}>
                    start recording
                  </p>
                </div>
                <div>
                  <Button
                    className="border-0"
                    style={{
                      backgroundColor: "#F1F5F9",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <Image
                      width={23}
                      height={23}
                      style={{ objectFit: "contain" }}
                      src={more}
                    />
                  </Button>
                  <p className="text-center my-1" style={{ fontSize: 12 }}>
                    more
                  </p>
                </div>
                <div>
                  <Button
                    className="border-0"
                    style={{
                      backgroundColor: "#FC5E5A",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                    onClick={removeParticipants}
                    // id={ids}
                  >
                    <Image
                      width={23}
                      height={23}
                      style={{ objectFit: "contain" }}
                      src={phone}
                    />
                  </Button>
                  <p className="text-center my-1" style={{ fontSize: 12 }}>
                    disconnect
                  </p>
                </div>
              </div>
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
